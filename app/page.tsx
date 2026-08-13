'use client'

import { useState } from 'react'
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
  Network,
  Search,
  Settings2,
  Target,
} from 'lucide-react'

type Lang = 'ko' | 'en' | 'ja' | 'zh'

const copy = {
  ko: {
    nav: ['홈', '서비스', '4주 MVP', 'AIPOS', '소개'],
    heroTitle1: 'AI 전략에서 실행까지,', heroTitle2: '실질적인 비즈니스 성과',
    heroDesc: 'AIPOS Consulting은 스타트업과 중소기업이 AI 전략을 실제 실행과 성과로 전환할 수 있도록 지원합니다.',
    email: '이메일 문의', cards: ['분석', '자동화', '데이터 인사이트', '성장'],
    mvpBadge: '정부지원사업 MVP 개발 전문', mvpLead: '사업계획서에서 실제 작동하는 MVP까지, 4주.',
    mvpDesc: '사업계획서 분석부터 요구사항 정의, UX/UI, AI·Web 개발, 테스트와 Demo까지 핵심 기능 중심으로 빠르게 연결합니다.',
    methodLabel: 'AIPOS 방법론', servicesLabel: '핵심 서비스', servicesTitle: '전략에서 실행까지 연결합니다',
    consultant: '대표컨설턴트', achievements: '주요 실적', differentiator: 'AIPOS Consulting의 차별점',
    ctaTitle: 'AI 전략을 실행으로 연결할 준비가 되셨나요?', ctaDesc: 'AI 전략부터 4-Week MVP 실행까지 AIPOS Consulting이 함께합니다.',
    serviceItems: [
      ['AI·AX 전략 수립', '비즈니스 목표에 맞는 AI 전략과 실행 로드맵을 함께 설계합니다.'],
      ['AI 프로젝트 자문', '프로젝트 기획, 요구사항, 아키텍처, 개발사 선정과 리스크 관리를 지원합니다.'],
      ['정부지원사업 MVP 개발', '사업계획서를 실제 작동하는 검증 가능한 MVP로 구현합니다.'],
      ['업무 자동화', '반복 업무를 자동화하고 프로세스를 최적화해 효율을 높입니다.'],
      ['AI 사업기획', '사업계획서, 제안서, 수행계획서와 경영진 보고자료를 구조화합니다.'],
    ],
    diffItems: [
      ['비즈니스 우선', '기술보다 비즈니스 목표와 성과에서 출발합니다.'],
      ['전략에서 실행까지', '전략 수립에서 실제 실행까지 연결합니다.'],
      ['실행 가능한 접근', '현실적으로 실행 가능한 해법을 설계합니다.'],
      ['AI 활용 컨설팅', 'AI로 조사·분석·설계의 생산성을 높입니다.'],
    ],
    method: [['목표','목표 설정'],['진단','현황 진단'],['GAP','갭 분석'],['설계','전략 설계'],['우선순위','실행 순서'],['MVP','최소 실행 제품'],['검증','성과 검증'],['KPI','성과 측정']],
  },
  en: {
    nav: ['Home', 'Services', '4-Week MVP', 'AIPOS', 'About'],
    heroTitle1: 'From AI Strategy to Execution,', heroTitle2: 'Real Business Results',
    heroDesc: 'AIPOS Consulting helps startups and SMEs turn AI strategy into practical execution and measurable business outcomes.',
    email: 'Email Inquiry', cards: ['Analysis', 'Automation', 'Data Insight', 'Growth'],
    mvpBadge: 'Government Support Program MVP Specialist', mvpLead: 'From business plan to working MVP in 4 weeks.',
    mvpDesc: 'We connect business-plan analysis, requirements, UX/UI, AI and web development, testing, and demo around the most critical functions.',
    methodLabel: 'AIPOS Methodology', servicesLabel: 'Core Services', servicesTitle: 'Connecting Strategy to Execution',
    consultant: 'Principal Consultant', achievements: 'Key Experience', differentiator: 'Why AIPOS Consulting',
    ctaTitle: 'Ready to turn AI strategy into execution?', ctaDesc: 'AIPOS Consulting supports you from AI strategy through 4-Week MVP execution.',
    serviceItems: [
      ['AI·AX Strategy', 'We design AI strategy and execution roadmaps aligned with business goals.'],
      ['AI Project Advisory', 'We support planning, requirements, architecture, vendor selection, and risk management.'],
      ['Government Program MVP Development', 'We turn business plans into working, testable MVPs.'],
      ['Business Automation', 'We automate repetitive work and optimize processes for greater efficiency.'],
      ['AI Business Planning', 'We structure business plans, proposals, execution plans, and executive reports.'],
    ],
    diffItems: [
      ['Business First', 'We start from business goals and outcomes, not technology.'],
      ['Strategy to Execution', 'We connect strategic planning to real implementation.'],
      ['Practical Approach', 'We design solutions that can realistically be executed.'],
      ['AI-Powered Consulting', 'We use AI to improve research, analysis, and design productivity.'],
    ],
    method: [['Goal','Set goals'],['Diagnose','Assess current state'],['GAP','Analyze gaps'],['Design','Design strategy'],['Priority','Set execution order'],['MVP','Minimum viable product'],['Validate','Validate results'],['KPI','Measure performance']],
  },
  ja: {
    nav: ['ホーム', 'サービス', '4週間MVP', 'AIPOS', '会社紹介'],
    heroTitle1: 'AI戦略から実行まで、', heroTitle2: '実質的なビジネス成果',
    heroDesc: 'AIPOS Consultingは、スタートアップと中小企業がAI戦略を実際の実行と成果につなげられるよう支援します。',
    email: 'メール問い合わせ', cards: ['分析', '自動化', 'データインサイト', '成長'],
    mvpBadge: '政府支援事業MVP開発専門', mvpLead: '事業計画書から実際に動くMVPまで、4週間。',
    mvpDesc: '事業計画書分析、要件定義、UX/UI、AI・Web開発、テスト、デモまで、重要機能を中心に迅速につなげます。',
    methodLabel: 'AIPOS方法論', servicesLabel: '主要サービス', servicesTitle: '戦略から実行までつなぎます',
    consultant: '代表コンサルタント', achievements: '主な実績', differentiator: 'AIPOS Consultingの強み',
    ctaTitle: 'AI戦略を実行につなげる準備はできていますか？', ctaDesc: 'AI戦略から4-Week MVPの実行までAIPOS Consultingが支援します。',
    serviceItems: [
      ['AI・AX戦略策定', 'ビジネス目標に合ったAI戦略と実行ロードマップを設計します。'],
      ['AIプロジェクトアドバイザリー', '企画、要件、アーキテクチャ、開発会社選定、リスク管理を支援します。'],
      ['政府支援事業MVP開発', '事業計画を実際に動作する検証可能なMVPにします。'],
      ['業務自動化', '反復業務を自動化し、プロセスを最適化します。'],
      ['AI事業企画', '事業計画書、提案書、遂行計画書、経営報告資料を構造化します。'],
    ],
    diffItems: [
      ['ビジネス優先', '技術よりビジネス目標と成果から出発します。'],
      ['戦略から実行まで', '戦略策定から実行まで一貫してつなぎます。'],
      ['実行可能なアプローチ', '現実的に実行可能な解決策を設計します。'],
      ['AI活用コンサルティング', 'AIで調査・分析・設計の生産性を高めます。'],
    ],
    method: [['目標','目標設定'],['診断','現状診断'],['GAP','ギャップ分析'],['設計','戦略設計'],['優先順位','実行順序'],['MVP','最小実行製品'],['検証','成果検証'],['KPI','成果測定']],
  },
  zh: {
    nav: ['首页', '服务', '4周MVP', 'AIPOS', '关于'],
    heroTitle1: '从AI战略到执行，', heroTitle2: '实现真正的商业成果',
    heroDesc: 'AIPOS Consulting帮助初创企业和中小企业将AI战略转化为实际执行和商业成果。',
    email: '邮件咨询', cards: ['分析', '自动化', '数据洞察', '增长'],
    mvpBadge: '政府扶持项目MVP开发专家', mvpLead: '从商业计划书到可运行的MVP，4周完成。',
    mvpDesc: '从商业计划分析、需求定义、UX/UI、AI与Web开发，到测试和演示，围绕核心功能快速推进。',
    methodLabel: 'AIPOS方法论', servicesLabel: '核心服务', servicesTitle: '连接战略与执行',
    consultant: '首席顾问', achievements: '主要业绩', differentiator: 'AIPOS Consulting的差异化优势',
    ctaTitle: '准备好把AI战略转化为执行了吗？', ctaDesc: 'AIPOS Consulting从AI战略到4-Week MVP执行全程支持。',
    serviceItems: [
      ['AI·AX战略制定', '根据业务目标设计AI战略和执行路线图。'],
      ['AI项目顾问', '支持项目策划、需求、架构、开发商选择和风险管理。'],
      ['政府扶持项目MVP开发', '将商业计划转化为可运行、可验证的MVP。'],
      ['业务自动化', '自动化重复工作并优化流程，提高效率。'],
      ['AI商业策划', '结构化商业计划书、提案书、执行计划和管理层报告。'],
    ],
    diffItems: [
      ['业务优先', '从业务目标和成果出发，而不是从技术出发。'],
      ['从战略到执行', '连接战略制定与实际实施。'],
      ['可执行的方法', '设计现实可执行的解决方案。'],
      ['AI赋能咨询', '利用AI提高调研、分析和设计效率。'],
    ],
    method: [['目标','目标设定'],['诊断','现状诊断'],['GAP','差距分析'],['设计','战略设计'],['优先级','执行顺序'],['MVP','最小可行产品'],['验证','成果验证'],['KPI','绩效衡量']],
  },
} as const

const serviceIcons = [BarChart3, BriefcaseBusiness, Code2, Settings2, ClipboardCheck]
const methodIcons = [Target, Search, Gauge, Lightbulb, ClipboardCheck, Code2, CheckCircle2, BarChart3]
const diffIcons = [Target, Network, Settings2, BarChart3]

export default function Home() {
  const [lang, setLang] = useState<Lang>('ko')
  const t = copy[lang]

  return (
    <main className="min-h-screen bg-white text-navy [word-break:keep-all]">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <a href="#home" className="flex items-center">
            <img src="/aipos-logo-official.png" alt="AIPOS Consulting" className="h-10 w-auto object-contain md:h-14" />
          </a>

          <div className="flex items-center gap-1 md:hidden" aria-label="Language selector">
            {(['ko','en','ja','zh'] as Lang[]).map((code) => (
              <button key={code} onClick={() => setLang(code)} className={`rounded-md px-2 py-1 text-xs font-bold ${lang === code ? 'bg-navy text-white' : 'text-navy'}`}>
                {code === 'ko' ? '한' : code === 'en' ? 'EN' : code === 'ja' ? '日' : '中'}
              </button>
            ))}
          </div>

          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#home">{t.nav[0]}</a>
            <a href="#services">{t.nav[1]}</a>
            <a href="#mvp" className="text-teal">{t.nav[2]}</a>
            <a href="#aipos">{t.nav[3]}</a>
            <a href="#about">{t.nav[4]}</a>
          </nav>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-white via-white to-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-10 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="relative z-10">
            <p className="mb-5 text-sm font-bold tracking-[0.18em] text-teal">AIPOS CONSULTING</p>
            <h1 className="max-w-3xl text-3xl font-bold leading-[1.25] tracking-tight sm:text-4xl md:text-6xl">{t.heroTitle1}<br />{t.heroTitle2}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{t.heroDesc}</p>
            <div className="mt-8 flex flex-wrap gap-4"><a href="mailto:herriskim@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-3.5 font-semibold text-white">{t.email} <ArrowRight size={18} /></a></div>
          </div>
          <div className="relative min-h-[360px] rounded-[28px] border border-border bg-white/80 p-8 shadow-card">
            <div className="grid h-full grid-cols-2 gap-4">
              {t.cards.map((label, i) => { const I = [BarChart3, Settings2, Network, Gauge][i]; return <div key={label} className="flex min-h-[130px] flex-col justify-between rounded-2xl border border-border bg-white p-5 shadow-sm"><I className="text-teal" /><span className="text-sm font-bold">{label}</span></div> })}
            </div>
          </div>
        </div>
      </section>

      <section id="mvp" className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div><span className="inline-flex rounded-full bg-teal px-4 py-2 text-sm font-bold">{t.mvpBadge}</span><h2 className="mt-5 text-3xl font-bold md:text-4xl">4-Week MVP</h2><p className="mt-3 text-xl font-semibold text-white/90 md:text-2xl">{t.mvpLead}</p><p className="mt-4 max-w-3xl leading-7 text-white/75">{t.mvpDesc}</p></div>
          <a href="mailto:herriskim@gmail.com?subject=4-Week MVP" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-navy">{t.email} <ArrowRight size={18} /></a>
        </div>
      </section>

      <section id="aipos" className="bg-surface py-20"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="text-center"><p className="text-sm font-bold tracking-[0.2em] text-teal">{t.methodLabel}</p><h2 className="mt-3 text-2xl font-bold md:text-3xl">AI Process Operating Standard</h2></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-8">{t.method.map(([title, sub], index) => { const Icon = methodIcons[index]; return <div key={title} className="relative rounded-2xl border border-border bg-white p-5 text-center shadow-card"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface text-teal"><Icon size={22} /></div><div className="mt-4 font-bold">{title}</div><div className="mt-1 text-xs text-muted">{sub}</div>{index < t.method.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-teal lg:block" size={16} />}</div> })}</div></div></section>

      <section id="services" className="py-20"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="text-center"><p className="text-sm font-bold tracking-[0.2em] text-teal">{t.servicesLabel}</p><h2 className="mt-3 text-2xl font-bold md:text-3xl">{t.servicesTitle}</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">{t.serviceItems.map(([title, description], i) => { const Icon = serviceIcons[i]; const featured = i === 2; return <article key={title} className={`relative rounded-2xl border p-6 shadow-card ${featured ? 'border-teal bg-teal/[0.04]' : 'border-border bg-white'}`}>{featured ? <><span className="absolute left-6 top-6 inline-flex rounded-full bg-teal px-3 py-1 text-xs font-bold text-white">4-WEEK MVP</span><div className="h-6" aria-hidden="true" /></> : <Icon className="text-teal" />}<h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{description}</p></article> })}</div></div></section>

      <section id="about" className="bg-surface py-20"><div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8"><article className="rounded-2xl border border-border bg-white p-8 shadow-card"><p className="text-sm font-bold tracking-[0.18em] text-teal">{t.consultant}</p><h2 className="mt-3 text-2xl font-bold md:text-3xl">김흥식</h2><p className="mt-1 text-xl font-semibold text-navy">Harris Kim</p><p className="mt-3 font-semibold text-teal">Principal Consultant</p><p className="mt-1 font-semibold text-teal">MBA</p><div className="my-6 h-px bg-border" /><h3 className="font-bold">{t.achievements}</h3><ul className="mt-4 space-y-3 text-muted"><li className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={18} />에잇투서울 Layad Beauty Code MVP 개발</li><li className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={18} />KDN AI Data Center Platform 마스터플랜 설계 참여</li></ul></article><article className="rounded-2xl border border-border bg-white p-8 shadow-card"><p className="text-sm font-bold tracking-[0.18em] text-teal">{t.differentiator}</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{t.diffItems.map(([title, desc], i) => { const I = diffIcons[i]; return <div key={title} className="rounded-xl bg-surface p-5"><I className="text-teal" /><h3 className="mt-3 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{desc}</p></div> })}</div></article></div></section>

      <section className="relative overflow-hidden bg-navy py-16 text-white"><div className="brand-wave" /><div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><h2 className="text-2xl font-bold md:text-3xl">{t.ctaTitle}</h2><p className="mt-3 text-white/75">{t.ctaDesc}</p></div><a href="mailto:herriskim@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-navy">{t.email} <ArrowRight size={18} /></a></div></section>

      <footer className="border-t border-white/10 bg-[#041d3d] text-white"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm lg:flex-row lg:items-center lg:justify-between lg:px-8"><div className="font-bold">AIPOS Consulting · AI Strategy to Execution</div><div className="flex flex-wrap gap-x-6 gap-y-2 text-white/75"><span className="flex items-center gap-2"><Mail size={15} /> herriskim@gmail.com</span><span>010-3277-5408</span><span>www.aiposconsulting.com</span></div><div className="text-white/55"><div>© 2026 AIPOS Consulting</div><div className="mt-1">Website created on August 18, 2026</div></div></div></footer>
    </main>
  )
}
