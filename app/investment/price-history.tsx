'use client'
import { useEffect, useRef, useState } from 'react'
type Point={date:string;close:number;volume?:number}
type Range='1M'|'3M'|'6M'|'1Y'|'2Y'
const ranges:Record<Range,number>={'1M':31,'3M':93,'6M':186,'1Y':365,'2Y':730}
const symbols=[{name:'유진테크',ticker:'084370'},{name:'삼성전자',ticker:'005930'},{name:'삼성전기',ticker:'009150'},{name:'삼성SDI',ticker:'006400'}]
function parseCSV(raw:string):Point[]{
 const lines=raw.replace(/^\uFEFF/,'').trim().split(/\r?\n/).filter(Boolean)
 if(lines.length<2)throw new Error('헤더와 데이터 행이 필요합니다.')
 const header=lines[0].split(',').map(x=>x.trim().toLowerCase().replace(/^["']|["']$/g,''))
 const di=header.findIndex(x=>['date','날짜','일자','거래일'].includes(x))
 const ci=header.findIndex(x=>['close','종가','closing price','adjusted close','adj close'].includes(x))
 const vi=header.findIndex(x=>['volume','거래량'].includes(x))
 if(di<0||ci<0)throw new Error('CSV 헤더에 date,close 또는 날짜,종가가 있어야 합니다.')
 const map=new Map<string,Point>()
 for(const line of lines.slice(1)){
  const fields=line.split(',').map(x=>x.trim().replace(/^["']|["']$/g,''))
  const date=fields[di]?.replace(/\./g,'-').replace(/\//g,'-')
  const v=Number(fields[ci]?.replace(/,/g,''))
  if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(date||'')||!Number.isFinite(v)||v<=0)continue
  const iso=date.split('-').map((x,i)=>i===0?x:x.padStart(2,'0')).join('-')
  if(Number.isNaN(Date.parse(iso)))continue
  const volume=vi>=0?Number(fields[vi]):undefined
  map.set(iso,{date:iso,close:v,volume:Number.isFinite(volume)?volume:undefined})
 }
 return Array.from(map.values()).sort((a,b)=>a.date.localeCompare(b.date)).slice(-600)
}
export default function PriceHistory(){
 const [series,setSeries]=useState<Record<string,Point[]>>({})
 const [active,setActive]=useState('084370')
 const [range,setRange]=useState<Range>('6M')
 const [msg,setMsg]=useState('')
 const input=useRef<HTMLInputElement>(null)
 useEffect(()=>{try{const stored=localStorage.getItem('aipos_prices_v1');if(stored)setSeries(JSON.parse(stored))}catch{}},[])
 const save=(data:Record<string,Point[]>)=>{setSeries(data);localStorage.setItem('aipos_prices_v1',JSON.stringify(data))}
 async function upload(file:File){try{if(file.size>2_000_000)throw new Error('CSV 파일은 2MB 이하로 제한됩니다.')
 const p=parseCSV(await file.text());if(!p.length)throw new Error('유효한 일별 종가가 없습니다.')
 save({...series,[active]:p});setMsg(p.length+'개 거래일 데이터를 불러왔습니다. 브라우저에만 보관됩니다.')
 }catch(e){setMsg(e instanceof Error?e.message:'파일 읽기 실패')}}
 const points=series[active]||[],last=points.length ? points[points.length-1] : undefined
 const cutoff=new Date();if(last)cutoff.setTime(new Date(last.date+'T00:00:00').getTime()-ranges[range]*86400000)
 const shown=last?points.filter(p=>p.date>=cutoff.toISOString().slice(0,10)):[]
 const min=Math.min(...shown.map(p=>p.close)),max=Math.max(...shown.map(p=>p.close))
 const coords=shown.map((p,i)=>[(i/Math.max(1,shown.length-1))*720, 185-(p.close-min)/Math.max(1,max-min)*170])
 const path=coords.map(([x,y],i)=>(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)).join(' ')
 const previous=points.length>1 ? points[points.length-2] : undefined,change=previous&&last?(last.close/previous.close-1)*100:null
 return <section className="rounded-xl border border-border bg-white p-5 shadow-card md:p-7">
 <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold tracking-wider text-teal">PRICE HISTORY</p><h3 className="mt-1 text-xl font-bold">종목별 주가 추이</h3><p className="mt-1 text-xs text-muted">검증된 데이터만 표시 · 실시간 시세 아님</p></div>
 <label className="cursor-pointer rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white">일봉 CSV 가져오기<input ref={input} type="file" accept=".csv,text/csv" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)upload(f);e.target.value=''}}/></label></div>
 <div className="mt-5 flex flex-wrap gap-2">{symbols.map(s=><button key={s.ticker} onClick={()=>{setActive(s.ticker);setMsg('')}} className={'rounded-lg px-4 py-2 text-sm '+(active===s.ticker?'bg-navy font-bold text-white':'border border-border bg-surface text-navy')}>{s.name}</button>)}</div>
 <div className="mt-5 flex flex-wrap items-end justify-between gap-2"><div><p className="text-xs text-muted">{symbols.find(x=>x.ticker===active)?.name} · {active} · 최신 종가</p><p className="mt-1 text-3xl font-bold">{last?last.close.toLocaleString('ko-KR')+'원':'데이터 없음'}</p>{last&&<p className="mt-1 text-xs text-muted">{last.date} 기준 · CSV 사용자 입력 {change!==null?'· 전 거래일 대비 '+change.toFixed(2)+'%':''}</p>}</div><div className="flex gap-1">{(['1M','3M','6M','1Y','2Y'] as Range[]).map(x=><button key={x} onClick={()=>setRange(x)} className={'rounded-md px-3 py-2 text-xs '+(range===x?'bg-teal font-bold text-white':'bg-surface text-muted')}>{x}</button>)}</div></div>
 {shown.length>1?<div className="mt-4"><svg viewBox="0 0 720 200" role="img" aria-label="일별 종가 추이" className="w-full rounded-lg bg-surface"><path d={path} fill="none" stroke="#0797A5" strokeWidth="2.8" strokeLinejoin="round"/><text x="8" y="20" fontSize="12" fill="#526173">최고 {Math.round(max).toLocaleString('ko-KR')}</text><text x="8" y="193" fontSize="12" fill="#526173">최저 {Math.round(min).toLocaleString('ko-KR')}</text></svg><p className="mt-2 text-xs text-muted">{shown[0].date} ~ {last?.date} · {shown.length} 거래일</p></div>:<div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-5 py-10 text-center text-sm text-muted">선택 종목의 날짜·종가 CSV를 가져오시면 차트가 나타납니다.</div>}
 <div className="mt-4 rounded-lg bg-[#EAF6F8] p-3 text-xs leading-6 text-[#236470]">CSV 예: date,close,volume / 2026-10-27,108400,120000. 출처와 수정주가 여부를 직접 확인해 주세요. 서버와 Supabase에는 전송하지 않습니다.</div>
 {msg&&<p role="status" className="mt-3 text-sm text-teal">{msg}</p>}
 </section>
}
