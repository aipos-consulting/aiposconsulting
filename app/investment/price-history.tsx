'use client'
import { useEffect, useState } from 'react'
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
 const [refresh,setRefresh]=useState(0)
 const [msg,setMsg]=useState('')
 const [pending,setPending]=useState(false)
 const [asOf,setAsOf]=useState('')
 useEffect(()=>{
   let cancelled=false
   setPending(true);setMsg('')
   fetch('/investment/api/prices?code='+active,{credentials:'same-origin',cache:'no-store'})
    .then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error||'조회 실패');return d})
    .then(d=>{if(!cancelled){setSeries(old=>({...old,[active]:d.rows}));setAsOf(d.asOf)}})
    .catch(e=>{if(!cancelled)setMsg(e instanceof Error?e.message:'조회 실패')})
    .finally(()=>{if(!cancelled)setPending(false)})
   return ()=>{cancelled=true}
 },[active,refresh])
 const points=series[active]||[],last=points.length ? points[points.length-1] : undefined
 const cutoff=new Date();if(last)cutoff.setTime(new Date(last.date+'T00:00:00').getTime()-ranges[range]*86400000)
 const shown=last?points.filter(p=>p.date>=cutoff.toISOString().slice(0,10)):[]
 const min=Math.min(...shown.map(p=>p.close)),max=Math.max(...shown.map(p=>p.close))
 const coords=shown.map((p,i)=>[(i/Math.max(1,shown.length-1))*720, 185-(p.close-min)/Math.max(1,max-min)*170])
 const path=coords.map(([x,y],i)=>(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)).join(' ')
 const previous=points.length>1 ? points[points.length-2] : undefined,change=previous&&last?(last.close/previous.close-1)*100:null
 return <section className="rounded-xl border border-border bg-white p-5 shadow-card md:p-7">
 <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold tracking-wider text-teal">PRICE HISTORY</p><h3 className="mt-1 text-xl font-bold">종목별 주가 추이</h3><p className="mt-1 text-xs text-muted">자동 조회 · 거래일 확정 종가 · 실시간 시세 아님</p></div><button type="button" onClick={()=>{setSeries(old=>({...old,[active]:[]}));setRefresh(x=>x+1)}} className="rounded-lg border border-border bg-white px-4 py-2 text-sm text-muted" disabled={pending}>{pending?'조회 중…':'자동 갱신'}</button></div>
 <div className="mt-5 flex flex-wrap gap-2">{symbols.map(s=><button key={s.ticker} onClick={()=>{setActive(s.ticker);setMsg('')}} className={'rounded-lg px-4 py-2 text-sm '+(active===s.ticker?'bg-navy font-bold text-white':'border border-border bg-surface text-navy')}>{s.name}</button>)}</div>
 <div className="mt-5 flex flex-wrap items-end justify-between gap-2"><div><p className="text-xs text-muted">{symbols.find(x=>x.ticker===active)?.name} · {active} · 최신 종가</p><p className="mt-1 text-3xl font-bold">{last?last.close.toLocaleString('ko-KR')+'원':'데이터 없음'}</p>{last&&<p className="mt-1 text-xs text-muted">{last.date} 기준 · 확정 종가 · 지연 제공 {change!==null?'· 전 거래일 대비 '+change.toFixed(2)+'%':''}</p>}</div><div className="flex gap-1">{(['1M','3M','6M','1Y','2Y'] as Range[]).map(x=><button key={x} onClick={()=>setRange(x)} className={'rounded-md px-3 py-2 text-xs '+(range===x?'bg-teal font-bold text-white':'bg-surface text-muted')}>{x}</button>)}</div></div>
 {shown.length>1?<div className="mt-4"><svg viewBox="0 0 720 200" role="img" aria-label="일별 종가 추이" className="w-full rounded-lg bg-surface"><path d={path} fill="none" stroke="#0797A5" strokeWidth="2.8" strokeLinejoin="round"/><text x="8" y="20" fontSize="12" fill="#526173">최고 {Math.round(max).toLocaleString('ko-KR')}</text><text x="8" y="193" fontSize="12" fill="#526173">최저 {Math.round(min).toLocaleString('ko-KR')}</text></svg><p className="mt-2 text-xs text-muted">{shown[0].date} ~ {last?.date} · {shown.length} 거래일</p></div>:<div className="mt-4 rounded-xl border border-dashed border-border bg-surface px-5 py-10 text-center text-sm text-muted">자동으로 과거 주가를 불러옵니다. 데이터가 제공되지 않으면 오류 메시지를 확인해 주세요.</div>}
 <div className="mt-4 rounded-lg bg-[#EAF6F8] p-3 text-xs leading-6 text-[#236470]">출처: 한국주식데이터(aikstockdata.com) · 원천: 금융위원회 공공데이터포털. 확정 종가(T+1), 상업적 재배포 금지 조건을 따르는 관리자 개인 분석용 Preview입니다. 시세 기준일: {asOf||'확인 중'} · Supabase 사용량 0.</div>
 {msg&&<p role="status" className="mt-3 text-sm text-teal">{msg}</p>}
 </section>
}
