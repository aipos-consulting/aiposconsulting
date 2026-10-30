'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, Activity, BarChart3, Building2, CalendarDays, ChevronDown, ChevronUp, CircleAlert, Cpu, Database, Factory, Info, ShieldCheck, Zap } from 'lucide-react'

type Sector = 'all' | 'semiconductor' | 'power' | 'ess'
type Scenario = 'expansion' | 'strain' | 'slowdown'

const firms = [
  {name:'NVIDIA',ticker:'NVDA',group:'AI 가속기 공급',position:'투자 수혜',signal:'고객사 AI CAPEX와 GPU 주문의 지속성',risk:'하이퍼스케일러 투자 축소·자체 칩 확대'},
  {name:'Microsoft',ticker:'MSFT',group:'AI 인프라 수요',position:'현금 회수',signal:'Azure 성장률과 CFO 대비 CAPEX',risk:'투자 비용과 수익화 시차'},
  {name:'Alphabet',ticker:'GOOGL',group:'AI 인프라 수요',position:'현금 회수',signal:'Cloud 수익성·CAPEX 대비 FCF',risk:'대규모 투자와 감가상각 부담'},
  {name:'Amazon',ticker:'AMZN',group:'AI 인프라 수요',position:'투자 부담',signal:'AWS 성장·CFO·현금 CAPEX',risk:'FCF 약화 및 투자 자금 수요'},
  {name:'Meta',ticker:'META',group:'AI 인프라 수요',position:'투자 부담',signal:'AI 광고효율과 투자 회수',risk:'추론·설비 비용 지속 상승'},
  {name:'Apple',ticker:'AAPL',group:'AI 단말·서비스',position:'현금 창출',signal:'서비스 수익과 현금창출력',risk:'AI 수익화 미흡'},
  {name:'Tesla',ticker:'TSLA',group:'로봇·자율주행',position:'상업화 검증',signal:'Optimus·자율주행 실매출과 현금흐름',risk:'사업화 일정과 투자 확대'}
]
const korean = [
  {sector:'semiconductor',category:'AI 반도체',icon:'chip',names:'SK하이닉스 · 삼성전자',impact:'가장 직접적인 AI 투자 수혜',logic:'GPU 공급 확대 → HBM·서버 DRAM 수요 → 출하량·ASP 변화',watch:'HBM 실공급 계약, ASP, 가동률, 재고, 반도체 부문 CFO',risk:'M7 CAPEX 축소 시 수요 및 밸류에이션 동반 조정'},
  {sector:'power',category:'전력기기',icon:'power',names:'HD현대일렉트릭 · 효성중공업 · LS ELECTRIC',impact:'데이터센터 구축과 송배전 인프라 투자 수혜',logic:'AI 데이터센터 전력 수요 → 변압기·배전기기 발주 → 장기 수주잔고',watch:'북미 신규 수주, 수주잔고, 수주 마진, 납품 일정',risk:'프로젝트 지연·전력망 인허가·수주 현금화 시차'},
  {sector:'ess',category:'ESS·배터리',icon:'ess',names:'삼성SDI · LG에너지솔루션',impact:'전력 안정화·피크관리·계통 ESS 확장 기회',logic:'데이터센터 및 계통 부하 증가 → 저장·출력관리 필요 → ESS 발주',watch:'북미 ESS GWh 수주, 생산 전환, 영업이익, 현금 CAPEX',risk:'가격 경쟁·프로젝트 지연·설치와 인도 간 시차'}
] as const
const scenarios: Record<Scenario,{title:string,tag:string,lead:string,implications:string[],tone:string}> = {
  expansion:{title:'투자 확장 + CFO 동반 증가',tag:'성장 지속',lead:'M7이 자체 영업현금으로 AI 설비투자를 충분히 감당하는 국면',implications:['HBM·서버 메모리의 직접 수요 유지 가능','전력기기 신규 수주 확대 및 장기 수주잔고 개선 가능','ESS는 계통 인프라 및 데이터센터 프로젝트 상용화 확인 필요'],tone:'text-emerald-300'},
  strain:{title:'투자 확장 + FCF 악화',tag:'과열 점검',lead:'AI 매출보다 설비투자 지출이 빠르게 증가하는 국면',implications:['한국 공급망은 단기 수주 증가와 미래 발주 둔화 위험이 공존','공급기업의 매출보다 주문 취소·매출채권 회수·재고를 중점 확인','성장률만이 아닌 예상 FCF Yield와 밸류에이션 검증'],tone:'text-amber-300'},
  slowdown:{title:'투자 둔화 + CFO 둔화',tag:'방어 강화',lead:'미국 AI 설비투자와 최종 수요가 함께 약해지는 국면',implications:['반도체·AI 서버 관련 종목은 실적 추정 하향 위험','전력기기는 비AI 전력망 교체 수주 및 납기 확인','ESS는 확정 계약·가동률·현금흐름을 기준으로 선별'],tone:'text-rose-300'}
}
const formatDate = '2026.10.30'
const CardIcon = ({kind}:{kind:string}) => kind==='chip'?<Cpu size={21}/>:kind==='power'?<Zap size={21}/>:<Factory size={21}/>
export default function InvestmentPage() {
  const [sector,setSector] = useState<Sector>('all')
  const [scenario,setScenario] = useState<Scenario>('strain')
  const [open,setOpen] = useState<string | null>(null)
  const visible = korean.filter(x=>sector==='all'||x.sector===sector)
  return <main className="min-h-screen bg-[#f5f7fb] text-[#102b4f]">
    <header className="bg-[#061f40] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
        <a href="/" className="flex items-center gap-2 font-bold tracking-wide"><span className="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-2 py-1 text-cyan-200">AIPOS</span><span className="hidden sm:inline">Consulting</span></a>
        <a className="flex items-center gap-2 text-sm text-slate-200 hover:text-white" href="/"><ArrowLeft size={16}/> 메인으로</a>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-7 sm:px-8 sm:pb-16">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-600/50 bg-cyan-900/30 px-3 py-1 text-xs font-semibold text-cyan-200"><Activity size={14}/> AIPOS INVESTMENT INTELLIGENCE</div>
        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl">M7의 AI 투자, <span className="text-cyan-300">한국시장에는 어떤 영향을 주는가?</span></h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">미국 빅테크 7개 기업의 영업현금흐름(CFO)·설비투자(CAPEX)·잉여현금흐름(FCF)을 선행지표로 국내 반도체, 전력기기, ESS 산업의 수요와 위험을 해석합니다.</p>
        <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-slate-200">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2"><CalendarDays size={14}/> 분석 기준 {formatDate}</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2"><ShieldCheck size={14}/> 공시 기반 분석 · 시나리오 전망</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2"><CircleAlert size={14}/> 실시간 시세 아님</span>
        </div>
      </div>
    </header>
    <div className="mx-auto max-w-7xl space-y-9 px-5 py-9 sm:px-8">
      <section className="grid gap-4 lg:grid-cols-3" aria-label="핵심 투자 판단">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2"><div className="mb-3 flex items-center gap-2 text-sm font-bold text-cyan-700"><BarChart3 size={18}/> 핵심 결론 · 한국시장</div><h2 className="text-xl font-extrabold leading-8 sm:text-2xl">M7 CAPEX 확대는 한국 기업의 <span className="text-cyan-700">미래 매출</span>이고, M7 FCF 악화는 <span className="text-rose-700">발주 둔화의 선행 위험</span>입니다.</h2><p className="mt-3 leading-7 text-slate-600">수혜 업종을 추종하는 것만으로는 부족합니다. 미국 빅테크의 투자 지속 능력 → 국내 기업 실수주 → 매출과 현금 회수 → 주가 밸류에이션을 순서대로 확인합니다.</p></article>
        <article className="rounded-2xl bg-[#10345d] p-6 text-white"><div className="flex items-center gap-2 text-sm font-bold text-cyan-200"><Info size={17}/> 판단 프레임</div><div className="mt-5 space-y-3 text-sm">{['M7 현금창출 및 CAPEX 추세','국내 기업 신규 수주·계약 확인','한국기업 실적·FCF 변화','PER·FCF Yield와 투자 시점'].map((x,i)=><div className="flex items-start gap-3" key={x}><span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-cyan-500/20 font-bold text-cyan-200">{i+1}</span><span className="pt-0.5">{x}</span></div>)}</div></article>
      </section>
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-700">Market transmission</p><h2 className="mt-1 text-2xl font-extrabold">미국 투자에서 한국 기업의 현금흐름까지</h2></div><p className="text-xs text-slate-500">기업별 발주·인도 시차는 다를 수 있습니다</p></div>
        <div className="mt-6 grid gap-2 md:grid-cols-4">{[{t:'01 · 미국 M7',d:'CAPEX · CFO · FCF'},{t:'02 · 한국 공급망',d:'HBM · 전력설비 · ESS'},{t:'03 · 기업 실적',d:'신규수주 · 매출 · 마진'},{t:'04 · 투자 판단',d:'국내 FCF · 밸류에이션'}].map((x,i)=><div key={x.t} className="relative rounded-xl bg-[#eef4fa] p-4"><p className="text-xs font-bold text-cyan-700">{x.t}</p><p className="mt-2 text-sm font-semibold">{x.d}</p>{i<3&&<ArrowUpRight className="absolute right-2 top-2 text-slate-400" size={17}/>}</div>)}</div>
      </section>
      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-700">Korea sector outlook</p><h2 className="mt-1 text-2xl font-extrabold">한국시장 산업별 영향 전망</h2></div><div className="flex flex-wrap gap-2" aria-label="업종 필터">{([{k:'all',label:'전체'},{k:'semiconductor',label:'반도체'},{k:'power',label:'전력기기'},{k:'ess',label:'ESS'}] as const).map(x=><button type="button" key={x.k} onClick={()=>setSector(x.k)} aria-pressed={sector===x.k} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${sector===x.k?'bg-[#082d58] text-white':'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'}`}>{x.label}</button>)}</div></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map(x=><article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200" key={x.sector}><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><CardIcon kind={x.icon}/></div><h3 className="text-xl font-extrabold">{x.category}</h3><p className="mt-1 text-sm font-medium text-slate-500">{x.names}</p><p className="mt-4 border-l-4 border-cyan-500 pl-3 font-bold leading-6">{x.impact}</p><div className="mt-5 space-y-4 text-sm leading-6"><div><p className="font-bold text-slate-800">수요 전달 구조</p><p className="mt-1 text-slate-600">{x.logic}</p></div><div><p className="font-bold text-slate-800">관찰 지표</p><p className="mt-1 text-slate-600">{x.watch}</p></div><div><p className="font-bold text-rose-700">위험 조건</p><p className="mt-1 text-slate-600">{x.risk}</p></div></div></article>)}</div>
      </section>
      <section className="rounded-2xl bg-[#082d58] p-6 text-white sm:p-8"><div className="mb-5"><p className="text-xs font-bold uppercase tracking-widest text-cyan-300">2027 Scenario Analysis</p><h2 className="mt-1 text-2xl font-extrabold">M7 CAPEX와 FCF 변화별 한국시장 시나리오</h2></div><div className="grid gap-2 md:grid-cols-3">{(Object.entries(scenarios) as [Scenario,typeof scenarios[Scenario]][]).map(([k,v])=><button type="button" key={k} onClick={()=>setScenario(k)} aria-pressed={scenario===k} className={`rounded-xl border p-4 text-left transition ${scenario===k?'border-cyan-300 bg-white/15':'border-white/20 bg-white/5 hover:bg-white/10'}`}><span className={`text-xs font-bold ${v.tone}`}>{v.tag}</span><p className="mt-2 font-bold leading-6">{v.title}</p></button>)}</div><div className="mt-5 rounded-xl border border-white/10 bg-[#061f40] p-5"><p className="text-lg font-bold">{scenarios[scenario].lead}</p><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">{scenarios[scenario].implications.map(x=><li className="flex gap-2" key={x}><span className="text-cyan-300">•</span><span>{x}</span></li>)}</ul></div></section>
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-700">M7 Monitor</p><h2 className="mt-1 text-2xl font-extrabold">미국 빅테크 7개 기업 관찰표</h2><p className="mt-2 text-sm text-slate-600">정량 수치는 공시 시점과 산정 방식이 달라 현재 화면에서 임의로 혼합하지 않습니다. CFO·CAPEX·FCF 동일 기준 비교표는 다음 데이터 갱신 단계에서 제공합니다.</p></div><Database className="hidden text-cyan-700 sm:block" size={28}/></div><div className="mt-5 divide-y divide-slate-100">{firms.map(x=><div key={x.ticker}><button type="button" className="flex w-full items-center justify-between gap-3 py-4 text-left" onClick={()=>setOpen(open===x.ticker?null:x.ticker)} aria-expanded={open===x.ticker}><div className="flex min-w-0 items-center gap-3"><span className="min-w-14 rounded-md bg-slate-100 px-2 py-1 text-center text-xs font-bold text-slate-700">{x.ticker}</span><div><span className="font-bold">{x.name}</span><p className="text-xs text-slate-500">{x.group}</p></div></div><div className="flex items-center gap-2"><span className="hidden rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800 sm:block">{x.position}</span>{open===x.ticker?<ChevronUp size={18}/>:<ChevronDown size={18}/>}</div></button>{open===x.ticker&&<div className="grid gap-3 pb-5 text-sm md:grid-cols-2"><p className="rounded-lg bg-slate-50 p-3"><strong className="block text-cyan-800">선행 지표</strong>{x.signal}</p><p className="rounded-lg bg-rose-50 p-3"><strong className="block text-rose-800">위험 지표</strong>{x.risk}</p></div>}</div>)}</div></section>
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><div className="flex items-center gap-2"><Building2 className="text-cyan-700" size={21}/><h2 className="text-xl font-extrabold">판단에 사용하는 데이터와 원칙</h2></div><p className="mt-3 text-sm leading-7 text-slate-600">공시 수치와 전망·시나리오는 구분합니다. FCF = CFO − 현금 CAPEX이며, 금융리스·미인식 계약 약정 및 기간 차이는 별도로 평가해야 합니다. 실시간 시세 연결은 현재 제공되지 않습니다.</p><div className="mt-4 flex flex-wrap gap-3 text-sm"><a className="font-semibold text-cyan-700 underline underline-offset-4 hover:text-cyan-900" href="https://www.sec.gov/edgar/search/" target="_blank" rel="noreferrer">SEC 기업공시 ↗</a><a className="font-semibold text-cyan-700 underline underline-offset-4 hover:text-cyan-900" href="https://kind.krx.co.kr/" target="_blank" rel="noreferrer">KRX 기업공시 ↗</a><a className="font-semibold text-cyan-700 underline underline-offset-4 hover:text-cyan-900" href="https://dart.fss.or.kr/" target="_blank" rel="noreferrer">DART 기업공시 ↗</a></div></section>
      <footer className="pb-6 text-xs leading-6 text-slate-500">© AIPOS Consulting · 투자분석 연구화면 · 본 내용은 정보 제공 및 조건부 분석이며 특정 종목의 매수·매도를 보장하거나 권유하지 않습니다. 실적 및 주가는 거래·공시 시점에 따라 달라집니다.</footer>
    </div>
  </main>
}
