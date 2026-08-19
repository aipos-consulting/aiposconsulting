import Link from 'next/link'

const principles = [
  ['01', 'Cost Sustainability First', '아무리 우수한 AI라도 고객이 지속적으로 감당할 수 없는 비용 구조라면 좋은 시스템이 아닙니다. 필요한 수준의 AI를 가장 낮고 예측 가능한 비용으로 지속 제공합니다.'],
  ['02', 'Production Baseline First', '기능을 수정하기 전에 Domain → Deployment → GitHub → Branch/SHA → Environment → Database → AI Project의 실제 운영 기준선을 먼저 확인합니다.'],
  ['03', 'One Production Source', '운영 서비스는 하나의 GitHub Repository, Production Branch, Deployment Project, Domain, Database를 기준으로 관리합니다.'],
  ['04', 'Self-Test Before Human Test', '사용자가 반복적으로 눌러 장애를 찾지 않도록 DB, API, 환경변수, AI 연결, Cost Guard를 먼저 자동 점검합니다.'],
  ['05', 'Release Gate', 'Production Baseline → Runtime Configuration → Infrastructure → Application Flow → End-to-End 순서로 검증하며, 상위 Gate가 실패하면 하위 코드를 먼저 수정하지 않습니다.'],
  ['06', 'AI Change Scope Control', 'AI에게 변경 대상과 변경 금지 대상을 동시에 정의해 승인된 UI, 로고, 운영 기준선이 과거 코드로 되돌아가는 것을 방지합니다.'],
  ['07', 'Secret & Environment Management', 'Secret은 저장소와 화면에 노출하지 않고, 노출 시 즉시 Rotate합니다. 환경변수 변경 후에는 반드시 Production Redeploy와 검증을 수행합니다.'],
  ['08', 'Production Verified = Complete', 'Code Complete는 완료가 아닙니다. 실제 Production 배포, Domain, DB, API, Self-Test, 비용, End-to-End까지 검증되어야 완료입니다.'],
] as const

const gates = [
  ['Gate 1', 'Production Baseline', 'Domain · Deployment Project · GitHub Repository · Branch · Commit SHA'],
  ['Gate 2', 'Runtime Configuration', 'Environment Variables · Secret/Public Key · Production Scope · Redeploy'],
  ['Gate 3', 'Infrastructure', 'Database · RLS/권한 · External API · AI API · Cost API · Budget'],
  ['Gate 4', 'Application Flow', 'UI Request · Backend API · Business Logic · DB 저장 · 결과 조회'],
  ['Gate 5', 'End-to-End', '대표 사용자 시나리오를 처음부터 끝까지 실제 Production에서 검증'],
] as const

export default function AiposStandardPage() {
  return (
    <main className="min-h-screen bg-white text-navy [word-break:keep-all]">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img src="/aipos-logo-official.png" alt="AIPOS Consulting" className="h-10 w-auto object-contain md:h-12" />
          </Link>
          <Link href="/" className="rounded-full border border-border px-4 py-2 text-sm font-bold text-navy hover:border-teal">홈으로</Link>
        </div>
      </header>

      <section className="bg-gradient-to-br from-white via-white to-surface">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-sm font-extrabold tracking-[0.2em] text-teal">AIPOS MASTER STANDARD · v1.1</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">AI Process Operating Standard</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">AIPOS는 AI를 이용한 요구사항 정의, 설계, 개발, 데이터, 배포, 검증, 운영, 비용관리, 변경관리, 인수인계를 하나의 운영표준으로 연결합니다.</p>
          <div className="mt-8 max-w-4xl rounded-3xl border border-teal/25 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-extrabold tracking-[0.18em] text-teal">PRINCIPLE NO.1</p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">AI는 뛰어남보다 지속가능해야 합니다.</h2>
            <blockquote className="mt-5 border-l-4 border-teal pl-5 text-lg font-semibold leading-8">“가장 뛰어난 AI를 만드는 것이 아니라, 고객에게 필요한 수준의 AI를 가장 낮고 예측 가능한 비용으로 지속 제공한다.”</blockquote>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.18em] text-teal">CORE OPERATING PRINCIPLES</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Production을 끝까지 책임지는 AI-Human 운영원칙</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {principles.map(([no, title, desc]) => (
              <article key={no} className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <div className="text-xs font-extrabold tracking-[0.18em] text-teal">{no}</div>
                <h3 className="mt-3 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-bold tracking-[0.18em] text-teal">AI DEVOPS RELEASE GATE</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">장애진단과 Release 순서를 고정합니다</h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted">상위 Gate가 통과하지 않았으면 하위 Gate의 코드를 먼저 수정하지 않습니다. 이 원칙으로 반복 수정과 잘못된 원인 추적을 줄입니다.</p>
          <div className="mt-10 space-y-4">
            {gates.map(([gate, title, detail]) => (
              <article key={gate} className="grid gap-3 rounded-2xl border border-border bg-white p-5 md:grid-cols-[120px_220px_1fr] md:items-center">
                <div className="text-sm font-extrabold text-teal">{gate}</div>
                <div className="font-bold">{title}</div>
                <div className="text-sm leading-6 text-muted">{detail}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-3xl bg-navy p-7 text-white md:p-8">
            <p className="text-xs font-extrabold tracking-[0.18em] text-teal">AI ROLE</p>
            <h3 className="mt-3 text-2xl font-bold">AI가 잘하는 영역</h3>
            <p className="mt-4 leading-7 text-white/70">코드 생성과 수정, Front/Back/DB/API 연결, 로그 비교, 반복 테스트, 요구사항 구조화, 문서화와 체크리스트 생성.</p>
          </article>
          <article className="rounded-3xl bg-navy p-7 text-white md:p-8">
            <p className="text-xs font-extrabold tracking-[0.18em] text-teal">HUMAN CONTROL</p>
            <h3 className="mt-3 text-2xl font-bold">사람이 반드시 통제할 영역</h3>
            <p className="mt-4 leading-7 text-white/70">목표, 우선순위, Production Baseline, 변경 승인, 비용, Release, 품질 판단, 최종 사용자 경험.</p>
          </article>
        </div>
      </section>

      <section className="border-y border-border bg-white py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="rounded-3xl border border-teal/30 bg-teal/[0.04] p-7 md:p-9">
            <p className="text-xs font-extrabold tracking-[0.18em] text-teal">DEFINITION OF DONE</p>
            <h2 className="mt-3 text-3xl font-bold">Code Complete ≠ Project Complete</h2>
            <p className="mt-4 text-xl font-bold text-teal">Production Verified = Complete</p>
            <p className="mt-4 max-w-4xl leading-7 text-muted">Build, Production 배포, Domain, Environment Variables, Database, API, Self-Test, 비용통제, 대표 End-to-End 시나리오, 사용자 최종 확인, 변경이력 저장까지 완료되어야 Release 완료로 인정합니다.</p>
          </div>
        </div>
      </section>

      <section className="bg-navy py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-xl font-bold">AIPOS Consulting · AI Strategy to Execution</div>
            <div className="mt-2 text-sm text-white/65">AIPOS는 AI가 코드를 잘 만드는 방법을 넘어 실제 Production 시스템을 안전하고 경제적으로 운영하기 위한 표준입니다.</div>
          </div>
          <a href="mailto:herriskim@gmail.com" className="rounded-xl bg-white px-6 py-3 text-center font-bold text-navy">이메일 문의</a>
        </div>
      </section>
    </main>
  )
}
