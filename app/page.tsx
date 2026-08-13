import {
  ArrowRight,
  BarChart3,
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
    title: 'AI·AX 전략 수립',
    description: '비즈니스 목표에 맞는 AI 전략과 실행 로드맵을 함께 설계합니다.',
    icon: BarChart3,
  },
  {
    title: 'AI 프로젝트 자문',
    description: '프로젝트 기획, 요구사항, 아키텍처, 개발사 선정과 리스크 관리를 지원합니다.',
    icon: BriefcaseBusiness,
  },
  {
    title: '정부지원사업 MVP 개발',
    description: '사업계획서를 실제 작동하는 검증 가능한 MVP로 구현합니다.',
    icon: Code2,
    featured: true,
  },
  {
    title: '업무 자동화',
    description: '반복 업무를 자동화하고 프로세스를 최적화해 효율을 높입니다.',
    icon: Settings2,
  },
  {
    title: 'AI 사업기획',
    description: '사업계획서, 제안서, 수행계획서와 경영진 보고자료를 구조화합니다.',
    icon: ClipboardCheck,
  },
]

const methodology = [
  ['목표', '목표 설정', Target],
  ['진단', '현황 진단', Search],
  ['GAP', '갭 분석', Gauge],
  ['설계', '전략 설계', Lightbulb],
  ['우선순위', '실행 순서', ClipboardCheck],
  ['MVP', '최소 실행 제품', Code2],
  ['검증', '성과 검증', CheckCircle2],
  ['KPI', '성과 측정', BarChart3],
] as const

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-navy">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <a href="#home" className="flex items-center">
            <img
              src="/aipos-logo-official.png"
              alt="AIPOS Consulting"
              className="h-14 w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#home">홈</a>
            <a href="#services">서비스</a>
            <a href="#mvp" className="text-teal">4주 MVP</a>
            <a href="#aipos">AIPOS</a>
            <a href="#about">소개</a>
            <a href="mailto:herriskim@gmail.com">문의</a>
          </nav>

          <button className="md:hidden" aria-label="메뉴 열기"><Menu /></button>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="relative z-10">
            <p className="mb-5 text-sm font-bold tracking-[0.18em] text-teal">AIPOS CONSULTING</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              AI 전략에서 실행까지,<br />실질적인 비즈니스 성과
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              AIPOS Consulting은 스타트업과 중소기업이 AI 전략을 실제 실행과 성과로 전환할 수 있도록 지원합니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:herriskim@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 font-semibold text-white">
                이메일 문의 <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="relative min-h-[360px] rounded-[28px] border border-border bg-white/80 p-8 shadow-card">
            <div className="grid h-full grid-cols-2 gap-4">
              {[
                ['분석', BarChart3],
                ['자동화', Settings2],
                ['데이터 인사이트', Network],
                ['성장', Gauge],
              ].map(([label, Icon]) => {
                const I = Icon as typeof Target
                return (
                  <div key={label as string} className="flex min-h-[130px] flex-col justify-between rounded-2xl border border-border bg-white p-5 shadow-sm">
                    <I className="text-teal" />
                    <span className="text-sm font-bold">{label as string}</span>
                  </div>
                )
              })}
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
          </div>
          <a href="mailto:herriskim@gmail.com?subject=4-Week MVP 문의" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-navy">
            이메일 문의 <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section id="aipos" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold tracking-[0.2em] text-teal">AIPOS 방법론</p>
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
            <p className="text-sm font-bold tracking-[0.2em] text-teal">핵심 서비스</p>
            <h2 className="mt-3 text-3xl font-bold">전략에서 실행까지 연결합니다</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {services.map(({ title, description, icon: Icon, featured }) => (
              <article key={title} className={`rounded-2xl border p-6 shadow-card ${featured ? 'border-teal bg-teal/[0.04]' : 'border-border bg-white'}`}>
                {featured && <span className="inline-flex rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">4-WEEK MVP</span>}
                {!featured && <Icon className="text-teal" />}
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-surface py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-border bg-white p-8 shadow-card">
            <p className="text-sm font-bold tracking-[0.18em] text-teal">대표컨설턴트</p>
            <h2 className="mt-3 text-3xl font-bold">김흥식(Harris Kim)</h2>
            <p className="mt-1 font-semibold text-teal">Principal Consultant · MBA</p>
            <div className="my-6 h-px bg-border" />
            <h3 className="font-bold">주요 실적</h3>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={18} />에잇투서울 Layad Beauty Code MVP 개발</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={18} />KDN AI Data Center Platform 마스터플랜 설계 참여</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-border bg-white p-8 shadow-card">
            <p className="text-sm font-bold tracking-[0.18em] text-teal">AIPOS Consulting의 차별점</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ['비즈니스 우선', '기술보다 비즈니스 목표와 성과에서 출발합니다.', Target],
                ['전략에서 실행까지', '전략 수립에서 실제 실행까지 연결합니다.', Network],
                ['실행 가능한 접근', '현실적으로 실행 가능한 해법을 설계합니다.', Settings2],
                ['AI 활용 컨설팅', 'AI로 조사·분석·설계의 생산성을 높입니다.', BarChart3],
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
            <h2 className="text-3xl font-bold">AI 전략을 실행으로 연결할 준비가 되셨나요?</h2>
            <p className="mt-3 text-white/75">AI 전략부터 4-Week MVP 실행까지 AIPOS Consulting이 함께합니다.</p>
          </div>
          <a href="mailto:herriskim@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-navy">이메일 문의 <ArrowRight size={18} /></a>
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
          <div className="text-white/55">
            <div>© 2026 AIPOS Consulting</div>
            <div className="mt-1">Website created on August 18, 2026</div>
          </div>
        </div>
      </footer>
    </main>
  )
}
