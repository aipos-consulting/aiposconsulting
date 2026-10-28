'use client'
import { useEffect, useMemo, useState } from 'react'
import PriceHistory from './price-history'
import { ArrowLeft, BarChart3, LockKeyhole, LogOut, RotateCcw, Save, SlidersHorizontal } from 'lucide-react'

type Factor={name:string;score:number;weight:number}
type Company={name:string;exposure:number[];actual:(number|null)[]}
type State={factors:Factor[];companies:Company[];weights:number[]}
const initial: State={
  factors:[
    {name:'AI 서버·HBM 수요',score:80,weight:20},
    {name:'DRAM·장비 CAPEX',score:75,weight:18},
    {name:'첨단 패키징·부품',score:78,weight:14},
    {name:'전력망 ESS',score:75,weight:18},
    {name:'EV 배터리',score:58,weight:12},
    {name:'로봇 배터리',score:55,weight:5},
    {name:'반도체 고객사 투자',score:70,weight:8},
    {name:'정책·보조금 실현성',score:60,weight:5}
  ],
  companies:[
    {name:'유진테크',exposure:[4,5,1,0,0,0,5,1],actual:[null,null,null,null]},
    {name:'삼성전자',exposure:[5,4,4,0,0,0,4,2],actual:[null,null,null,null]},
    {name:'삼성전기',exposure:[4,1,5,0,1,2,2,1],actual:[null,null,null,null]},
    {name:'삼성SDI',exposure:[0,0,1,5,5,3,0,4],actual:[null,null,null,null]}
  ],
  weights:[40,15,20,15,10]
}
const metrics=['과거 실적','EPS·수주 수정','밸류에이션','재무 위험']
const categories=['산업 전망',...metrics]
export default function InvestmentWorkbench({adminEmail}:{adminEmail:string}){
  const [data,setData]=useState<State>(initial)
  const [selected,setSelected]=useState(0)
  const [tab,setTab]=useState<'factors'|'exposure'|'evaluation'>('factors')
  const [message,setMessage]=useState('')
  useEffect(()=>{ try {const raw=localStorage.getItem('aipos-investment-preview-v1'); if(raw){const obj=JSON.parse(raw); if(obj?.factors?.length===8&&obj?.companies?.length===4&&obj?.weights?.length===5) setData(obj)}}catch{} },[])
  function save(){localStorage.setItem('aipos-investment-preview-v1',JSON.stringify(data));setMessage('이 브라우저에 임시 저장했습니다. 운영 DB에는 저장하지 않습니다.')}
  function updateFactor(index:number,key:'score'|'weight',value:number){setData(d=>({...d,factors:d.factors.map((f,i)=>i===index?{...f,[key]:value}:f)}))}
  function updateExposure(fi:number,value:number){setData(d=>({...d,companies:d.companies.map((c,i)=>i===selected?{...c,exposure:c.exposure.map((v,j)=>j===fi?value:v)}:c)}))}
  function updateActual(mi:number,value:number|null){setData(d=>({...d,companies:d.companies.map((c,i)=>i===selected?{...c,actual:c.actual.map((v,j)=>j===mi?value:v)}:c)}))}
  const ranked=useMemo(()=>data.companies.map(c=>{
    const weighted=data.factors.reduce((s,f,i)=>s+f.score*f.weight*c.exposure[i],0)
    const divisor=data.factors.reduce((s,f,i)=>s+f.weight*c.exposure[i],0)
    const industry=divisor?weighted/divisor:0
    const complete=c.actual.every(x=>x!==null)
    const totalWeight=data.weights.reduce((a,b)=>a+b,0)
    const total=complete&&totalWeight===100?(industry*data.weights[0]+c.actual.reduce<number>((s,v,i)=>s+(v||0)*data.weights[i+1],0))/100:null
    return {name:c.name,industry,total}
  }),[data])
  async function logout(){await fetch('/investment/api/logout',{method:'POST'});window.location.replace('/investment/login')}
  return <main className="min-h-screen bg-surface text-navy">
    <header className="bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5">
        <div><div className="text-xs tracking-[0.18em] text-[#8bd5dc]">AIPOS CONSULTING</div><h1 className="mt-1 text-xl font-bold">Investment Intelligence</h1></div>
        <div className="flex items-center gap-4 text-xs text-white/80"><span className="hidden sm:inline"><LockKeyhole size={13} className="mr-1 inline"/>관리자 · {adminEmail}</span><button onClick={logout} className="rounded-lg border border-white/30 px-3 py-2 hover:bg-white/10"><LogOut size={14} className="mr-1 inline"/>로그아웃</button></div>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-6 px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-wider text-teal">PRIVATE INVESTMENT LAB</p><h2 className="mt-1 text-2xl font-bold">산업전망 · 기업평가 모델</h2><p className="mt-2 text-sm text-muted">2026.10~2028.10 산업 가설을 기준으로 변수와 노출도를 직접 조정합니다.</p></div>
        <div className="flex gap-2"><button onClick={()=>{setData(initial);setMessage('초기 설정으로 되돌렸습니다. 저장 시 반영됩니다.')}} className="rounded-lg border border-border bg-white px-4 py-2 text-sm"><RotateCcw size={14} className="mr-1 inline"/>초기화</button><button onClick={save} className="rounded-lg bg-teal px-4 py-2 text-sm font-bold text-white"><Save size={14} className="mr-1 inline"/>임시 저장</button></div>
      </div>
      <div className="rounded-xl border border-[#CDE8EE] bg-[#EAF6F8] px-5 py-3 text-sm text-[#236470]">미리보기 모델입니다. 산업 점수와 노출도는 초기 가정이며, 공시로 검증되지 않은 재무점수는 비워두었습니다. {message}</div>
      <div className="grid gap-4 md:grid-cols-4">{ranked.map((r,i)=><button key={r.name} onClick={()=>{setSelected(i);setTab('evaluation')}} className="rounded-xl border border-border bg-white p-5 text-left shadow-card transition hover:border-teal"><div className="text-sm font-bold">{r.name}</div><div className="mt-3 text-xs text-muted">가정 기반 산업전망 점수</div><div className="mt-1 text-3xl font-bold">{r.industry.toFixed(1)}<span className="ml-1 text-sm text-muted">/100</span></div><div className="mt-3 border-t pt-3 text-sm text-muted">종합점수: <span className="font-semibold text-navy">{r.total===null?'검증 전':r.total.toFixed(1)}</span></div></button>)}</div>
      <PriceHistory />
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-card">
        <div className="flex flex-wrap gap-1 border-b border-border bg-[#F9FBFD] p-3">{([['factors','산업전망 가중치'],['exposure','기업별 노출도'],['evaluation','기업 평가·점수']] as const).map(([key,label])=><button key={key} onClick={()=>setTab(key)} className={'rounded-lg px-4 py-2 text-sm font-semibold '+(tab===key?'bg-navy text-white':'text-muted hover:bg-white')}>{label}</button>)}</div>
        <div className="p-5 md:p-7">
          {tab==='factors'&&<div className="space-y-5"><p className="text-sm text-muted">산업 전망강도(0~100)와 중요도(0~40)를 직접 조정합니다. 중요도는 회사별 노출도로 보정됩니다.</p>{data.factors.map((f,i)=><div key={f.name} className="grid items-center gap-3 border-b border-border pb-4 md:grid-cols-[1.5fr_1fr_1fr]"><strong className="text-sm">{f.name}</strong><label className="text-xs text-muted">전망강도 {f.score}<input className="mt-2 block w-full accent-[#0797A5]" type="range" min="0" max="100" value={f.score} onChange={e=>updateFactor(i,'score',+e.target.value)}/></label><label className="text-xs text-muted">중요도 {f.weight}<input className="mt-2 block w-full accent-[#0797A5]" type="range" min="0" max="40" value={f.weight} onChange={e=>updateFactor(i,'weight',+e.target.value)}/></label></div>)}</div>}
          {tab==='exposure'&&<div><p className="mb-4 text-sm text-muted">0: 관계 없음 · 5: 해당 사업과 매우 밀접함. 초기 값은 분석 가정입니다.</p><select value={selected} onChange={e=>setSelected(+e.target.value)} className="mb-5 rounded-lg border border-border bg-white px-4 py-2 text-sm">{data.companies.map((c,i)=><option value={i} key={c.name}>{c.name}</option>)}</select><div className="grid gap-3 sm:grid-cols-2">{data.factors.map((f,i)=><label key={f.name} className="rounded-lg bg-surface p-4 text-sm"><div className="mb-2 flex justify-between"><span>{f.name}</span><b>{data.companies[selected].exposure[i]} / 5</b></div><input type="range" min="0" max="5" step="1" className="w-full accent-[#0797A5]" value={data.companies[selected].exposure[i]} onChange={e=>updateExposure(i,+e.target.value)}/></label>)}</div></div>}
          {tab==='evaluation'&&<div className="space-y-5"><p className="text-sm text-muted">4개 항목은 검증된 공시·전망 자료를 확인한 뒤 입력하십시오. 미입력 값이 있으면 종합점수를 출력하지 않습니다.</p><select value={selected} onChange={e=>setSelected(+e.target.value)} className="rounded-lg border border-border bg-white px-4 py-2 text-sm">{data.companies.map((c,i)=><option value={i} key={c.name}>{c.name}</option>)}</select><div className="grid gap-4 sm:grid-cols-2">{metrics.map((label,i)=><label key={label} className="block text-sm font-semibold">{label} (0~100)<input type="number" min="0" max="100" value={data.companies[selected].actual[i]??''} onChange={e=>updateActual(i,e.target.value===''?null:Math.max(0,Math.min(100,Number(e.target.value))))} placeholder="검증 전" className="mt-2 block w-full rounded-lg border border-border p-3 outline-none focus:border-teal"/></label>)}</div><div className="border-t border-border pt-5"><h3 className="mb-3 font-bold">평가영역 배점</h3><div className="grid gap-3 sm:grid-cols-5">{categories.map((name,i)=><label key={name} className="text-xs text-muted">{name}<input type="number" min="0" max="100" className="mt-1 w-full rounded-lg border border-border p-2 text-navy" value={data.weights[i]} onChange={e=>setData(d=>({...d,weights:d.weights.map((w,j)=>i===j?Math.max(0,Math.min(100,+e.target.value)):w)}))}/></label>)}</div><p className={'mt-2 text-xs '+(data.weights.reduce((a,b)=>a+b,0)===100?'text-muted':'text-red-600')}>배점 합계: {data.weights.reduce((a,b)=>a+b,0)} / 100</p></div></div>}
        </div>
      </div>
      <footer className="pb-6 text-xs text-muted">AIPOS Investment Intelligence · 기업 실적 자동 수집 및 클라우드 영구 저장은 후속 단계입니다. 투자 판단은 사용자 책임하에 수행합니다.</footer>
    </div>
  </main>
}
