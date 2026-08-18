'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, ClipboardCheck, Code2,
  Database, Gauge, GitBranch, Lightbulb, Mail, MessageSquareText, Network, Rocket,
  Search, Settings2, Target,
} from 'lucide-react'
import LayadCaseStudy, { type Lang } from './layad-case-study'

type Tab = 'home' | 'services' | 'mvp' | 'portfolio' | 'aipos' | 'about'

const principleCopy = {
  ko: {
    eyebrow: 'AIPOS Principle No.1',
    headline: 'AI는 뛰어남보다 지속가능해야 합니다.',
    body: 'AIPOS Consulting은 고객에게 필요한 수준의 AI를 가장 낮고 예측 가능한 비용으로 지속 제공하는 것을 제1원칙으로 삼습니다.',
    quote: '“가장 뛰어난 AI를 만드는 것이 아니라, 고객에게 필요한 수준의 AI를 가장 낮고 예측 가능한 비용으로 지속 제공한다.”',
  },
  en: {
    eyebrow: 'AIPOS Principle No.1',
    headline: 'AI must be sustainable, not just advanced.',
    body: 'AIPOS Consulting makes it our No.1 principle to continuously provide the level of AI customers need at the lowest and most predictable cost.',
    quote: '“We do not aim to build the most advanced AI. We continuously provide the AI our customers need at the lowest, most predictable cost.”',
  },
  ja: {
    eyebrow: 'AIPOS Principle No.1',
    headline: 'AIは「最も優れていること」よりも、持続可能であるべきです。',
    body: 'AIPOS Consultingは、お客様に必要なレベルのAIを、最も低く予測可能なコストで継続的に提供することを第一原則とします。',
    quote: '「最も優れたAIを作るのではなく、お客様に必要なレベルのAIを、最も低く予測可能なコストで継続的に提供する。」',
  },
  zh: {
    eyebrow: 'AIPOS Principle No.1',
    headline: 'AI不应只追求卓越，更必须具备可持续性。',
    body: 'AIPOS Consulting 将以最低且可预测的成本，持续提供客户真正需要的AI能力，作为第一原则。',
    quote: '“不是打造最卓越的AI，而是以最低且可预测的成本，持续提供客户所需要的AI能力。”',
  },
} as const

const copy = {
  ko: {
    tabs: [['home','홈'],['services','서비스'],['mvp','4주 MVP'],['portfolio','Case Study'],['aipos','AIPOS'],['about','소개']] as const,
    heroTitle1: 'AI 전략에서 실행까지,', heroTitle2: '실질적인 비즈니스 성과', heroDesc: 'AIPOS Consulting은 스타트업과 중소기업이 AI 전략을 실제 실행과 성과로 전환할 수 있도록 지원합니다.',
    email: '이메일 문의', cards: ['분석', '자동화', '데이터 인사이트', '성장'],
    servicesLabel: '핵심 서비스', servicesTitle: '전략에서 실행까지 연결합니다',
    serviceItems: [['AI·AX 전략 수립','비즈니스 목표에 맞는 AI 전략과 실행 로드맵을 설계합니다.'],['AI 프로젝트 자문','기획, 요구사항, 아키텍처, 개발사 선정과 리스크 관리를 지원합니다.'],['정부지원사업 MVP 개발','사업계획서를 실제 작동하는 검증 가능한 MVP로 구현합니다.'],['업무 자동화','반복 업무를 자동화하고 프로세스를 최적화합니다.'],['AI 사업기획','사업계획서, 제안서, 수행계획서와 경영진 보고자료를 구조화합니다.']],
    mvpBadge: '정부지원사업 MVP 개발 전문', mvpLead: '사업계획서에서 실제 작동하는 MVP까지, 4주.', mvpDesc: '사업계획서 분석부터 요구사항 정의, UX/UI, AI·Web 개발, 테스트와 Demo까지 핵심 기능 중심으로 빠르게 연결합니다.',
    stackTitle: '요구사항에서 배포까지 하나의 AI 개발 흐름으로 연결합니다', stackDesc: 'ChatGPT로 요구사항을 구조화하고 Codex로 구현하며, Supabase·GitHub·Vercel을 연결해 실제 사용 가능한 MVP로 배포합니다.',
    stackSteps: [['ChatGPT','요구사항 구조화','기능·화면·데이터·우선순위를 실행 가능한 요구사항으로 정리합니다.'],['Codex','소스 코드 생성','프론트엔드와 백엔드 코드를 구현하고 반복 개선합니다.'],['Supabase','DB·API 구성','서비스 데이터 구조와 API 연계를 구성합니다.'],['GitHub','형상관리','변경 이력과 버전을 관리합니다.'],['Vercel','실서비스 배포','검증된 코드를 Production으로 배포합니다.']] as const,
    methodLabel: 'AIPOS 방법론', methodTitle: 'AI Process Operating Standard',
    methodDesc: '사람의 판단과 AI의 실행을 결합하고, 요구사항·설계·변경·테스트·배포 기록을 프로젝트 자산으로 남깁니다.',
    method: [['목표','목표 설정'],['진단','현황 진단'],['GAP','갭 분석'],['설계','전략 설계'],['우선순위','실행 순서'],['MVP','최소 실행 제품'],['검증','성과 검증'],['KPI','성과 측정']] as const,
    docsTitle: '지속 가능한 인수인계 자산', docsDesc: 'Requirements · Design Decision · Data Model · Change Log · Test Result · Deployment Record를 AIPOS 기준으로 관리합니다.',
    cicdTitle: 'CI/CD로 이어지는 지속 개발', cicdDesc: '요구사항 변경 → Codex 개발 → GitHub → CI 검증 → Vercel 배포 → 운영 피드백으로 이어집니다.',
    consultant: '대표컨설턴트', achievements: '주요 실적', achievementItems: ['에잇투서울 LAYAD Beauty Code MVP 개발','KDN AI Data Center Platform 마스터플랜 설계 참여'], differentiator: 'AIPOS Consulting의 차별점',
    diffItems: [['비즈니스 우선','기술보다 비즈니스 목표와 성과에서 출발합니다.'],['전략에서 실행까지','전략 수립에서 실제 실행까지 연결합니다.'],['실행 가능한 접근','현실적으로 실행 가능한 해법을 설계합니다.'],['AI 활용 컨설팅','AI로 조사·분석·설계의 생산성을 높입니다.']],
  },
  en: {
    tabs: [['home','Home'],['services','Services'],['mvp','4-Week MVP'],['portfolio','Case Study'],['aipos','AIPOS'],['about','About']] as const,
    heroTitle1: 'From AI Strategy to Execution,', heroTitle2: 'Real Business Results', heroDesc: 'AIPOS Consulting helps startups and SMEs turn AI strategy into practical execution and measurable business outcomes.',
    email: 'Email Inquiry', cards: ['Analysis','Automation','Data Insight','Growth'],
    servicesLabel: 'Core Services', servicesTitle: 'Connecting Strategy to Execution',
    serviceItems: [['AI·AX Strategy','We design AI strategy and execution roadmaps aligned with business goals.'],['AI Project Advisory','We support planning, requirements, architecture, vendor selection, and risk management.'],['Government Program MVP Development','We turn business plans into working, testable MVPs.'],['Business Automation','We automate repetitive work and optimize processes.'],['AI Business Planning','We structure business plans, proposals, execution plans, and executive reports.']],
    mvpBadge: 'Government Support Program MVP Specialist', mvpLead: 'From business plan to working MVP in 4 weeks.', mvpDesc: 'We connect business-plan analysis, requirements, UX/UI, AI and web development, testing, and demo around the most critical functions.',
    stackTitle: 'One AI development flow from requirements to production', stackDesc: 'We structure requirements with ChatGPT, implement with Codex, connect Supabase, GitHub, and Vercel, and deploy a working MVP.',
    stackSteps: [['ChatGPT','Structure Requirements','Turn needs into executable features, screens, data, and priorities.'],['Codex','Generate Source Code','Implement and iteratively improve frontend and backend code.'],['Supabase','Build DB & APIs','Configure the service data layer and API connections.'],['GitHub','Manage Source','Manage changes and version history.'],['Vercel','Deploy Production','Deploy validated code to production.']] as const,
    methodLabel: 'AIPOS Methodology', methodTitle: 'AI Process Operating Standard', methodDesc: 'Human judgment and AI execution work together while requirements, design decisions, changes, tests, and deployment records remain as project assets.',
    method: [['Goal','Set goals'],['Diagnose','Assess current state'],['GAP','Analyze gaps'],['Design','Design strategy'],['Priority','Set execution order'],['MVP','Minimum viable product'],['Validate','Validate results'],['KPI','Measure performance']] as const,
    docsTitle: 'Sustainable handover assets', docsDesc: 'Requirements · Design Decision · Data Model · Change Log · Test Result · Deployment Record are maintained under AIPOS standards.',
    cicdTitle: 'Continuous development through CI/CD', cicdDesc: 'Requirement Change → Codex → GitHub → CI Validation → Vercel → User Feedback.',
    consultant: 'Principal Consultant', achievements: 'Key Experience', achievementItems: ['Eight to Seoul LAYAD Beauty Code MVP Development','KDN AI Data Center Platform Master Plan Design'], differentiator: 'Why AIPOS Consulting',
    diffItems: [['Business First','We start from business goals and outcomes, not technology.'],['Strategy to Execution','We connect strategic planning to real implementation.'],['Practical Approach','We design solutions that can realistically be executed.'],['AI-Powered Consulting','We use AI to improve research, analysis, and design productivity.']],
  },
  ja: {
    tabs: [['home','ホーム'],['services','サービス'],['mvp','4週間MVP'],['portfolio','Case Study'],['aipos','AIPOS'],['about','会社紹介']] as const,
    heroTitle1: 'AI戦略から実行まで、', heroTitle2: '実質的なビジネス成果', heroDesc: 'AIPOS Consultingは、スタートアップと中小企業がAI戦略を実際の実行と成果につなげられるよう支援します。',
    email: 'メール問い合わせ', cards: ['分析','自動化','データインサイト','成長'], servicesLabel: '主要サービス', servicesTitle: '戦略から実行までつなぎます',
    serviceItems: [['AI・AX戦略策定','ビジネス目標に合ったAI戦略と実行ロードマップを設計します。'],['AIプロジェクトアドバイザリー','企画、要件、アーキテクチャ、開発会社選定、リスク管理を支援します。'],['政府支援事業MVP開発','事業計画を実際に動作する検証可能なMVPにします。'],['業務自動化','反復業務を自動化し、プロセスを最適化します。'],['AI事業企画','事業計画書、提案書、遂行計画書、経営報告資料を構造化します。']],
    mvpBadge: '政府支援事業MVP開発専門', mvpLead: '事業計画書から実際に動くMVPまで、4週間。', mvpDesc: '事業計画書分析、要件定義、UX/UI、AI・Web開発、テスト、デモまで、重要機能を中心に迅速につなげます。',
    stackTitle: '要件から本番公開までを一つのAI開発フローでつなぎます', stackDesc: 'ChatGPT、Codex、Supabase、GitHub、Vercelを接続し、実際に利用できるMVPとして公開します。',
    stackSteps: [['ChatGPT','要件の構造化','機能、画面、データ、優先順位を整理します。'],['Codex','ソースコード生成','フロントエンド・バックエンドを実装します。'],['Supabase','DB・API構築','サービスデータとAPIを構成します。'],['GitHub','ソース管理','変更履歴とバージョンを管理します。'],['Vercel','本番デプロイ','検証済みコードを本番公開します。']] as const,
    methodLabel: 'AIPOS方法論', methodTitle: 'AI Process Operating Standard', methodDesc: '人の判断とAIの実行を組み合わせ、要件・設計・変更・テスト・デプロイ記録をプロジェクト資産として残します。',
    method: [['目標','目標設定'],['診断','現状診断'],['GAP','ギャップ分析'],['設計','戦略設計'],['優先順位','実行順序'],['MVP','最小実行製品'],['検証','成果検証'],['KPI','成果測定']] as const,
    docsTitle: '持続可能な引き継ぎ資産', docsDesc: '要件、設計判断、データ構造、変更履歴、テスト結果、デプロイ情報をAIPOS基準で管理します。', cicdTitle: 'CI/CDにつながる継続開発', cicdDesc: '要件変更 → Codex → GitHub → CI検証 → Vercel → 運用フィードバック。',
    consultant: '代表コンサルタント', achievements: '主な実績', achievementItems: ['Eight to Seoul LAYAD Beauty Code MVP開発','KDN AI Data Center Platform マスタープラン設計'], differentiator: 'AIPOS Consultingの強み', diffItems: [['ビジネス優先','技術よりビジネス目標と成果から出発します。'],['戦略から実行まで','戦略策定から実行まで一貫してつなぎます。'],['実行可能なアプローチ','現実的に実行可能な解決策を設計します。'],['AI活用コンサルティング','AIで調査・分析・設計の生産性を高めます。']],
  },
  zh: {
    tabs: [['home','首页'],['services','服务'],['mvp','4周MVP'],['portfolio','Case Study'],['aipos','AIPOS'],['about','关于']] as const,
    heroTitle1: '从AI战略到执行，', heroTitle2: '实现真正的商业成果', heroDesc: 'AIPOS Consulting帮助初创企业和中小企业将AI战略转化为实际执行和商业成果。', email: '邮件咨询', cards: ['分析','自动化','数据洞察','增长'],
    servicesLabel: '核心服务', servicesTitle: '连接战略与执行', serviceItems: [['AI·AX战略制定','根据业务目标设计AI战略和执行路线图。'],['AI项目顾问','支持项目策划、需求、架构、开发商选择和风险管理。'],['政府扶持项目MVP开发','将商业计划转化为可运行、可验证的MVP。'],['业务自动化','自动化重复工作并优化流程。'],['AI商业策划','结构化商业计划书、提案书、执行计划和管理层报告。']],
    mvpBadge: '政府扶持项目MVP开发专家', mvpLead: '从商业计划书到可运行的MVP，4周完成。', mvpDesc: '从商业计划分析、需求定义、UX/UI、AI与Web开发，到测试和演示，围绕核心功能快速推进。',
    stackTitle: '从需求到上线，以一条AI开发流程贯通', stackDesc: '连接ChatGPT、Codex、Supabase、GitHub和Vercel，将需求转化为可实际使用的MVP。', stackSteps: [['ChatGPT','需求结构化','整理功能、页面、数据和优先级。'],['Codex','生成源代码','实现并持续优化前后端代码。'],['Supabase','构建DB与API','配置服务数据层和API。'],['GitHub','源码版本管理','管理变更记录和版本。'],['Vercel','生产部署','将验证后的代码部署到生产环境。']] as const,
    methodLabel: 'AIPOS方法论', methodTitle: 'AI Process Operating Standard', methodDesc: '结合人的判断与AI执行，并将需求、设计、变更、测试和部署记录沉淀为项目资产。', method: [['目标','目标设定'],['诊断','现状诊断'],['GAP','差距分析'],['设计','战略设计'],['优先级','执行顺序'],['MVP','最小可行产品'],['验证','成果验证'],['KPI','绩效衡量']] as const,
    docsTitle: '可持续的交接资产', docsDesc: '按照AIPOS标准管理需求、设计决策、数据结构、变更记录、测试结果和部署信息。', cicdTitle: '通过CI/CD持续开发', cicdDesc: '需求变更 → Codex → GitHub → CI验证 → Vercel → 运营反馈。',
    consultant: '首席顾问', achievements: '主要业绩', achievementItems: ['Eight to Seoul LAYAD Beauty Code MVP开发','KDN AI Data Center Platform总体规划设计'], differentiator: 'AIPOS Consulting的差异化优势', diffItems: [['业务优先','从业务目标和成果出发，而不是从技术出发。'],['从战略到执行','连接战略制定与实际实施。'],['可执行的方法','设计现实可执行的解决方案。'],['AI赋能咨询','利用AI提高调研、分析和设计效率。']],
  },
} as const

const serviceIcons = [BarChart3, BriefcaseBusiness, Code2, Settings2, ClipboardCheck]
const methodIcons = [Target, Search, Gauge, Lightbulb, ClipboardCheck, Code2, CheckCircle2, BarChart3]
const diffIcons = [Target, Network, Settings2, BarChart3]
const stackIcons = [MessageSquareText, Code2, Database, GitBranch, Rocket]

export default function Home() {
  const [lang, setLang] = useState<Lang>('ko')
  const [active, setActive] = useState<Tab>('home')
  const t = copy[lang]
  const principle = principleCopy[lang]

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [active])

  const TabButton = ({ id, label }: { id: Tab; label: string }) => (
    <button onClick={() => setActive(id)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${active === id ? 'bg-navy text-white shadow-sm' : 'text-navy hover:bg-surface'}`}>{label}</button>
  )

  return (
    <main className="min-h-screen bg-white text-navy [word-break:keep-all]">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-8">
          <button onClick={() => setActive('home')} className="flex items-center"><img src="/aipos-logo-official.png" alt="AIPOS Consulting" className="h-10 w-auto object-contain md:h-14" /></button>
          <div className="hidden items-center gap-1 lg:flex">{t.tabs.map(([id,label]) => <TabButton key={id} id={id as Tab} label={label} />)}</div>
          <div className="flex items-center gap-1" aria-label="Language selector">{(['ko','en','ja','zh'] as Lang[]).map((code) => <button key={code} onClick={() => setLang(code)} className={`rounded-md px-2 py-1 text-xs font-bold ${lang === code ? 'bg-teal text-white' : 'text-navy'}`}>{code === 'ko' ? '한' : code === 'en' ? 'EN' : code === 'ja' ? '日' : '中'}</button>)}</div>
        </div>
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3 lg:hidden">{t.tabs.map(([id,label]) => <TabButton key={id} id={id as Tab} label={label} />)}</div>
      </header>

      {active === 'home' && <>
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div>
              <p className="mb-5 text-sm font-bold tracking-[0.18em] text-teal">AIPOS CONSULTING</p>
              <h1 className="max-w-3xl text-3xl font-bold leading-[1.25] tracking-tight sm:text-4xl md:text-6xl">{t.heroTitle1}<br />{t.heroTitle2}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{t.heroDesc}</p>
              <div className="mt-8 max-w-3xl rounded-3xl border border-teal/25 bg-white/85 p-5 shadow-sm sm:p-6">
                <p className="text-xs font-extrabold tracking-[0.18em] text-teal">{principle.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{principle.headline}</h2>
                <p className="mt-3 text-sm leading-6 text-muted sm:text-base sm:leading-7">{principle.body}</p>
                <blockquote className="mt-5 border-l-4 border-teal pl-4 text-base font-semibold leading-7 text-navy sm:text-lg">{principle.quote}</blockquote>
              </div>
              <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setActive('mvp')} className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 font-semibold text-white">4-Week MVP <ArrowRight size={18} /></button><a href="mailto:herriskim@gmail.com" className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3.5 font-semibold text-navy">{t.email}</a></div>
            </div>
            <div className="grid grid-cols-2 gap-4 rounded-[28px] border border-border bg-white/80 p-6 shadow-card">{t.cards.map((label,i) => { const I = [BarChart3,Settings2,Network,Gauge][i]; return <div key={label} className="flex min-h-[125px] flex-col justify-between rounded-2xl border border-border bg-white p-5 shadow-sm"><I className="text-teal" /><span className="text-sm font-bold">{label}</span></div> })}</div>
          </div>
        </section>
        <section className="border-t border-border bg-white py-10"><div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-3 lg:px-8"><button onClick={() => setActive('mvp')} className="rounded-2xl border border-border p-5 text-left hover:border-teal"><div className="text-xs font-bold text-teal">01</div><div className="mt-2 font-bold">4-Week MVP</div></button><button onClick={() => setActive('portfolio')} className="rounded-2xl border border-border p-5 text-left hover:border-teal"><div className="text-xs font-bold text-teal">02</div><div className="mt-2 font-bold">LAYAD Case Study</div></button><button onClick={() => setActive('aipos')} className="rounded-2xl border border-border p-5 text-left hover:border-teal"><div className="text-xs font-bold text-teal">03</div><div className="mt-2 font-bold">AIPOS Method</div></button></div></section>
      </>}

      {active === 'services' && <section className="py-14 md:py-20"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="text-center"><p className="text-sm font-bold tracking-[0.2em] text-teal">{t.servicesLabel}</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.servicesTitle}</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">{t.serviceItems.map(([title,description],i) => { const Icon = serviceIcons[i]; return <article key={title} className={`rounded-2xl border p-6 shadow-card ${i===2 ? 'border-teal bg-teal/[0.04]' : 'border-border bg-white'}`}><Icon className="text-teal" /><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{description}</p></article> })}</div></div></section>}

      {active === 'mvp' && <section className="py-12 md:py-16"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="rounded-3xl bg-navy p-7 text-white md:p-10"><span className="inline-flex rounded-full bg-teal px-4 py-2 text-sm font-bold">{t.mvpBadge}</span><h2 className="mt-5 text-3xl font-bold md:text-4xl">4-Week MVP</h2><p className="mt-3 text-xl font-semibold text-white/90">{t.mvpLead}</p><p className="mt-4 max-w-3xl leading-7 text-white/75">{t.mvpDesc}</p></div><div className="mx-auto mt-12 max-w-4xl text-center"><h3 className="text-2xl font-bold md:text-3xl">{t.stackTitle}</h3><p className="mt-4 leading-7 text-muted">{t.stackDesc}</p></div><div className="mt-10 grid gap-4 md:grid-cols-5">{t.stackSteps.map(([brand,title],index) => { const Icon = stackIcons[index]; return <div key={brand} className="rounded-2xl border border-border bg-white p-5 text-center shadow-card"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white"><Icon size={22}/></div><div className="mt-4 text-xs font-bold text-teal">STEP {index+1}</div><div className="mt-1 text-lg font-bold">{brand}</div><div className="mt-2 text-sm text-muted">{title}</div></div> })}</div><div className="mt-8 space-y-3">{t.stackSteps.map(([brand,title,desc],index) => <article key={brand} className="grid gap-4 rounded-2xl border border-border bg-surface/50 p-5 md:grid-cols-[140px_200px_1fr] md:items-center"><div className="text-xs font-bold text-teal">STEP {index+1} · {brand}</div><div className="font-bold">{title}</div><div className="text-sm leading-6 text-muted">{desc}</div></article>)}</div></div></section>}

      {active === 'portfolio' && <LayadCaseStudy lang={lang} />}

      {active === 'aipos' && <section className="py-12 md:py-16"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="text-center"><p className="text-sm font-bold tracking-[0.2em] text-teal">{t.methodLabel}</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.methodTitle}</h2><p className="mx-auto mt-4 max-w-3xl leading-7 text-muted">{t.methodDesc}</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-8">{t.method.map(([title,sub],index) => { const Icon = methodIcons[index]; return <div key={title} className="rounded-2xl border border-border bg-white p-5 text-center shadow-card"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-surface text-teal"><Icon size={20}/></div><div className="mt-3 font-bold">{title}</div><div className="mt-1 text-xs text-muted">{sub}</div></div> })}</div><div className="mt-10 grid gap-6 lg:grid-cols-2"><article className="rounded-3xl bg-navy p-7 text-white"><ClipboardCheck className="text-teal"/><h3 className="mt-4 text-xl font-bold">{t.docsTitle}</h3><p className="mt-3 leading-7 text-white/70">{t.docsDesc}</p></article><article className="rounded-3xl bg-navy p-7 text-white"><GitBranch className="text-teal"/><h3 className="mt-4 text-xl font-bold">{t.cicdTitle}</h3><p className="mt-3 leading-7 text-white/70">{t.cicdDesc}</p></article></div></div></section>}

      {active === 'about' && <section className="bg-surface py-14 md:py-20"><div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8"><article className="rounded-2xl border border-border bg-white p-8 shadow-card"><p className="text-sm font-bold tracking-[0.18em] text-teal">{t.consultant}</p><h2 className="mt-3 text-2xl font-bold md:text-3xl">김흥식</h2><p className="mt-1 text-xl font-semibold">Harris Kim</p><p className="mt-3 font-semibold text-teal">Principal Consultant</p><p className="mt-1 font-semibold text-teal">MBA</p><div className="my-6 h-px bg-border"/><h3 className="font-bold">{t.achievements}</h3><ul className="mt-4 space-y-3 text-muted">{t.achievementItems.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={18}/>{item}</li>)}</ul></article><article className="rounded-2xl border border-border bg-white p-8 shadow-card"><p className="text-sm font-bold tracking-[0.18em] text-teal">{t.differentiator}</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{t.diffItems.map(([title,desc],i) => { const I = diffIcons[i]; return <div key={title} className="rounded-xl bg-surface p-5"><I className="text-teal"/><h3 className="mt-3 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{desc}</p></div> })}</div></article></div></section>}

      <section className="border-t border-border bg-navy py-12 text-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><div className="text-xl font-bold">AIPOS Consulting · AI Strategy to Execution</div><div className="mt-2 text-sm text-white/65">Government Program MVP · AI/AX Strategy · AIPOS</div></div><a href="mailto:herriskim@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-navy">{t.email} <ArrowRight size={18}/></a></div></section>
      <footer className="bg-[#041d3d] text-white"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 text-sm lg:flex-row lg:items-center lg:justify-between lg:px-8"><div className="flex flex-wrap gap-x-6 gap-y-2 text-white/75"><span className="flex items-center gap-2"><Mail size={15}/> herriskim@gmail.com</span><span>010-3277-5408</span><span>www.aiposconsulting.com</span></div><div className="text-white/55">© 2026 AIPOS Consulting · Website created on August 18, 2026</div></div></footer>
    </main>
  )
}
