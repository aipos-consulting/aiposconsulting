import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Gauge,
  Lightbulb,
  Mail,
  Menu,
  Network,
  Search,
  Settings2,
  Target,
} from 'lucide-react'

const services = [
  {
    title: 'AI·AX Strategy Consulting',
    description: '비즈니스 목표에 맞는 AI·AX 전략과 실행 로드맵을 설계합니다.',
    icon: BarChart3,
  },
  {
    title: 'AI Project Advisory',
    description: '프로젝트 기획, 요구사항, 아키텍처, 개발사 선정과 리스크 관리를 지원합니다.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'MVP Development',
    description: '정부지원사업·창업지원사업의 사업계획을 실제 작동하는 MVP로 구현합니다.',
    icon: Code2,
    featured: true,
  },
  {
    title: 'AI Process Innovation',
    description: '업무 프로세스를 AI Automation과 AI Agent 중심으로 혁신합니다.',
    icon: Settings2,
  },
  {
    title: 'AI Business Planning',
    description: '사업계획서, 제안서, 수행계획서와 경영진 보고자료를 구조화합니다.',
    icon: ClipboardCheck,
  },
]

const methodology = [
  ['Goal', '목표 설정', Target],
  ['Diagnose', '현황 진단', Search],
  ['GAP', '갭 분석', Gauge],
  ['Design', '전략 설계', Lightbulb],
  ['Prioritize', '우선순위', ClipboardCheck],
  ['MVP', '최소 실행 제품', Code2],
  ['Validate', '검증', CheckCircle2],
  ['KPI', '성과 측정', BarChart3],
] as const

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-navy">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3 font-semibold tracking-tight">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-lg font-bold text-white">
              AI
            </div>
            <div>
              <div className="text-lg leading-none">AIPOS</div>
              <div className="mt-1 text-xs tracking-[0.22em] text-muted">CONSULTING</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#mvp" className="text-teal">4-Week MVP</a>
            <a href="#aipos">AIPOS</a>
            <a href="#about">About</a>
          </nav>
          <a href="mailto:herriskim@gmail.com" className="hidden rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white md:inline-flex">
            Consulting Request
          </a>
          <button className="md:hidden" aria-label="메뉴 열기"><Menu /></button>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div className="relative z-10">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-teal">AIPOS Consulting</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              AI Strategy to Execution
            </h1>
            <p className="mt-6 text-2xl font-bold text-teal md:text-3xl">AI 전략을 실제 비즈니스 성과로 연결합니다.</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              스타트업과 중소기업이 AI 전략을 실제 실행과 성과로 전환하도록 지원합니다. 전략, 프로세스, MVP, 실행 지원을 하나의 흐름으로 연결합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:herriskim@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 font-semibold text-white">
                AI Consulting Request <ArrowRight size={18} />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-xl border border-navy px-6 py-3.5 font-semibold">
                Our Services <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="relative min-h-[360px] rounded-[28px] border border-border bg-surface p-8 shadow-card">
            <div className="absolute inset-8 grid grid-cols-2 gap-4">
              {[
                ['STRATEGY', Target],
                ['DATA', BarChart3],
                ['PROCESS', Settings2],
                ['RESULTS', Gauge],
              ].map(([label, Icon]) => {
                const I = Icon as typeof Target
                return (
                  <div key={label as string} className="flex flex-col justify-between rounded-2xl border border-border bg-white p-5">
                    <I className="text-teal" />
                    <span className="text-sm font-bold tracking-[0.16em]">{label as string}</span>
                  </div>
                )
              })}
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-navy text-4xl font-black text-white shadow-card">
              AI
            </div>
          </div>
        </div>
      </section>

      <section id="mvp" className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-teal px-4 py-2 text-sm font-bold">정부지원사업 MVP 개발 전문</span>
            <h2 className="mt-5 text-4xl font-bold">4-Week MVP</h2>
            <p className="mt-3 text-2xl font-semibold text-white/90">사업계획서에서 실제 작동하는 MVP까지, 4주.</p>
            <p className="mt-4 max-w-3xl leading-7 text-white/75">
              사업계획서 분석부터 요구사항 정의, UX/UI, AI·Web 개발, 테스트와 Demo까지 핵심 기능 중심으로 빠르게 연결합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-white/85">
              {['사업계획서', '요구사항', 'UX/UI', 'AI·Web 개발', 'MVP', 'Demo'].map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  {i > 0 && <ArrowRight size={15} className="text-teal" />}{item}
                </span>
              ))}
            </div>
          </div>
          <a href="mailto:herriskim@gmail.com?subject=4-Week MVP 상담" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-navy">
            4-Week MVP 상담 <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section id="aipos" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal">AIPOS Methodology</p>
            <h2 className="mt-3 text-3xl font-bold">AI Process Operating Standard</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-8">
            {methodology.map(([title, sub, Icon], index) => (
              <div key={title} className="relative rounded-2xl border border-border bg-white p-5 text-center shadow-card">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface text-teal"><Icon size={22} /></div>
                <div className="mt-4 font-bold">{title}</div>
                <div className="mt-1 text-xs text-muted">{sub}</div>
                {index < methodology.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-teal lg:block" size={16} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal">Core Services</p>
            <h2 className="mt-3 text-3xl font-bold">Strategy, Advisory, MVP, Process, Planning</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {services.map(({ title, description, icon: Icon, featured }) => (
              <article key={title} className={`rounded-2xl border p-6 shadow-card ${featured ? 'border-teal bg-teal/[0.04]' : 'border-border bg-white'}`}>
                {featured && <span className="mb-5 inline-flex rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">4-WEEK MVP</span>}
                <Icon className="text-teal" />
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                {featured && <p className="mt-2 text-sm font-bold text-teal">정부지원사업 MVP 개발 전문</p>}
                <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-surface py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-border bg-white p-8 shadow-card">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Principal Consultant</p>
            <h2 className="mt-3 text-3xl font-bold">Harris Kim</h2>
            <p className="mt-1 font-semibold text-teal">Principal Consultant · MBA</p>
            <div className="my-6 h-px bg-border" />
            <h3 className="font-bold">주요 실적</h3>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={18} />에잇투서울 Layad Beauty Code MVP 개발</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={18} />KDN AI Data Center Platform 마스터플랜 설계 참여</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-border bg-white p-8 shadow-card">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Why AIPOS Consulting</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['Business First', '기술보다 비즈니스 목표와 성과에서 출발합니다.', Target],
                ['Strategy to Execution', '전략 수립에서 실제 실행까지 연결합니다.', Network],
                ['Practical Approach', '현실적으로 실행 가능한 해법을 설계합니다.', Settings2],
                ['AI Powered Consulting', 'AI로 조사·분석·설계의 생산성을 높입니다.', Bot],
              ].map(([title, desc, Icon]) => {
                const I = Icon as typeof Target
                return <div key={title as string} className="rounded-xl bg-surface p-5"><I className="text-teal" /><h3 className="mt-3 font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted">{desc as string}</p></div>
              })}
            </div>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-white">
        <div className="brand-wave" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Ready to Start Your AI Transformation?</h2>
            <p className="mt-3 text-white/75">AI 전략부터 4-Week MVP 실행까지 AIPOS Consulting과 시작하세요.</p>
          </div>
          <a href="mailto:herriskim@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-navy">AI Consulting Request <ArrowRight size={18} /></a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#041d3d] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="font-bold">AIPOS Consulting · AI Strategy to Execution</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/75">
            <span className="flex items-center gap-2"><Mail size={15} /> herriskim@gmail.com</span>
            <span>010-3277-5408</span>
            <span>www.aiposconsulting.com</span>
          </div>
          <div className="text-white/55">© 2026 AIPOS Consulting</div>
        </div>
      </footer>
    </main>
  )
}
