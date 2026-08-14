'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Lightbulb,
  Mail,
  MessageSquareText,
  Network,
  Rocket,
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
    stackLabel: 'AI-Native Full-Stack MVP',
    stackTitle: '요구사항에서 배포까지 하나의 AI 개발 흐름으로 연결합니다',
    stackDesc: '고객 요구사항을 ChatGPT로 구조화하고, Codex로 소스 코드를 구현하며, Supabase에 데이터베이스를 구성합니다. 이후 GitHub에서 형상과 변경 이력을 관리하고 Vercel을 통해 실제 사용 가능한 MVP로 배포합니다.',
    stackSteps: [
      ['요구사항 구조화', '고객 요구사항을 ChatGPT에 등록해 기능, 화면, 데이터, 우선순위를 실행 가능한 요구사항으로 정리합니다.'],
      ['소스 코드 생성', '정의된 요구사항을 바탕으로 Codex에서 프론트엔드·백엔드 코드를 생성하고 반복적으로 수정합니다.'],
      ['DB·API 구성', 'Supabase에 테이블, 관계, 인증, 저장소와 API 연계 구조를 구성해 서비스 데이터를 연결합니다.'],
      ['소스 형상관리', 'GitHub에 소스 코드를 등록하고 변경 이력, 버전, 협업 기준을 관리해 개발 자산을 체계화합니다.'],
      ['실서비스 배포', 'Vercel에 연결해 빌드·배포하고 도메인과 HTTPS를 적용하여 고객이 바로 테스트할 수 있는 MVP를 제공합니다.'],
    ],
    stackOutputs: ['요구사항 정의서 · 화면·기능 목록', '동작 가능한 Web/App 소스', 'DB Schema · Auth · API', 'Repository · Version History', 'Production URL · Domain · HTTPS'],
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
    stackLabel: 'AI-Native Full-Stack MVP',
    stackTitle: 'One AI development flow from requirements to production',
    stackDesc: 'We structure client requirements with ChatGPT, implement source code with Codex, build the data layer in Supabase, manage versions in GitHub, and deploy a working MVP through Vercel.',
    stackSteps: [
      ['Structure Requirements', 'Turn client needs into executable features, screens, data requirements, and priorities with ChatGPT.'],
      ['Generate Source Code', 'Use Codex to create and iteratively refine frontend and backend code from the defined requirements.'],
      ['Build DB & APIs', 'Configure Supabase tables, relations, authentication, storage, and API integrations for the service data layer.'],
      ['Manage Source', 'Register source code in GitHub and manage changes, versions, and collaboration standards as durable development assets.'],
      ['Deploy Production', 'Build and deploy with Vercel, connect domains and HTTPS, and provide an MVP that clients can immediately test.'],
    ],
    stackOutputs: ['Requirements · Screen & Feature List', 'Working Web/App Source', 'DB Schema · Auth · API', 'Repository · Version History', 'Production URL · Domain · HTTPS'],
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
    stackLabel: 'AI-Native Full-Stack MVP',
    stackTitle: '要件から本番公開までを一つのAI開発フローでつなぎます',
    stackDesc: '顧客要件をChatGPTで構造化し、Codexでソースコードを実装、Supabaseでデータベースを構築します。GitHubでバージョンを管理し、Vercelで実際に利用できるMVPを公開します。',
    stackSteps: [
      ['要件の構造化', '顧客要件をChatGPTで機能、画面、データ、優先順位に整理し、実行可能な要件に変換します。'],
      ['ソースコード生成', '定義した要件をもとにCodexでフロントエンド・バックエンドコードを生成し、反復改善します。'],
      ['DB・API構築', 'Supabaseにテーブル、リレーション、認証、ストレージ、API連携を構成します。'],
      ['ソース管理', 'GitHubでソースコード、変更履歴、バージョン、協業基準を管理します。'],
      ['本番デプロイ', 'Vercelでビルド・デプロイし、ドメインとHTTPSを適用してテスト可能なMVPを提供します。'],
    ],
    stackOutputs: ['要件定義 · 画面・機能一覧', '動作するWeb/Appソース', 'DB Schema · Auth · API', 'Repository · Version History', 'Production URL · Domain · HTTPS'],
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
    method: [['目標','目標設定'],['진断','現状診断'],['GAP','ギャップ分析'],['設計','戦略設計'],['優先順位','実行順序'],['MVP','最小実行製品'],['検証','成果検証'],['KPI','成果測定']],
  },
  zh: {
    nav: ['首页', '服务', '4周MVP', 'AIPOS', '关于'],
    heroTitle1: '从AI战略到执行，', heroTitle2: '实现真正的商业成果',
    heroDesc: 'AIPOS Consulting帮助初创企业和中小企业将AI战略转化为实际执行和商业成果。',
    email: '邮件咨询', cards: ['分析', '自动化', '数据洞察', '增长'],
    mvpBadge: '政府扶持项目MVP开发专家', mvpLead: '从商业计划书到可运行的MVP，4周完成。',
    mvpDesc: '从商业计划分析、需求定义、UX/UI、AI与Web开发，到测试和演示，围绕核心功能快速推进。',
    stackLabel: 'AI-Native Full-Stack MVP',
    stackTitle: '从需求到上线，以一条AI开发流程贯通',
    stackDesc: '使用ChatGPT结构化客户需求，通过Codex实现源代码，在Supabase构建数据库，在GitHub管理版本，并通过Vercel部署可实际使用的MVP。',
    stackSteps: [
      ['需求结构化', '使用ChatGPT将客户需求整理为可执行的功能、页面、数据和优先级。'],
      ['生成源代码', '根据定义好的需求，使用Codex生成并迭代优化前后端代码。'],
      ['构建DB与API', '在Supabase配置数据表、关系、认证、存储和API集成。'],
      ['源码版本管理', '在GitHub登记源代码并管理变更记录、版本和协作标准。'],
      ['生产部署', '通过Vercel构建部署，连接域名与HTTPS，交付可立即测试的MVP。'],
    ],
    stackOutputs: ['需求定义 · 页面与功能清单', '可运行Web/App源码', 'DB Schema · Auth · API', 'Repository · Version History', 'Production URL · Domain · HTTPS'],
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
const stackIcons = [MessageSquareText, Code2, Database, GitBranch, Rocket]
const stackBrands = ['ChatGPT', 'Codex', 'Supabase', 'GitHub', 'Vercel']

const aiHumanCopy = {
  ko: {
    label: 'AIPOS AI-HUMAN DEVELOPMENT METHOD',
    title: '개발이 끝나도 지식과 문서는 남습니다',
    desc: '모든 개발 과정은 AIPOS Consulting이 개발한 AIPOS AI-HUMAN 개발방법론에 따라 수행됩니다. 사람의 판단과 AI의 실행을 결합하고, 요구사항·설계·변경·테스트·배포 기록을 프로젝트 자산으로 지속 축적하여 향후 다른 개발자가 투입되어도 빠르게 맥락을 이해하고 업그레이드할 수 있도록 합니다.',
    docsTitle: '지속 가능한 인수인계 자산',
    docsDesc: '요구사항, 설계 의사결정, 데이터 구조, 변경 이력, 테스트 결과, 배포 정보를 AIPOS 기준으로 관리하여 개발 종료 이후에도 유지보수와 고도화의 기준자료로 활용합니다.',
    cicdTitle: 'CI/CD로 이어지는 지속 개발',
    cicdDesc: '소스 변경은 GitHub를 중심으로 검증과 배포 흐름에 연결되며, 운영 피드백은 다시 요구사항으로 환류됩니다. 이를 통해 MVP가 일회성 결과물이 아니라 지속적으로 개선 가능한 제품으로 발전합니다.',
    flow: ['요구사항 변경', 'Codex 개발', 'GitHub Push', 'CI 검증', 'Vercel 배포', '운영 피드백'],
    handover: 'AIPOS 문서 + Version History → Handover → Next Developer Upgrade',
  },
  en: {
    label: 'AIPOS AI-HUMAN DEVELOPMENT METHOD',
    title: 'The code ships, but the knowledge stays',
    desc: 'Every development activity follows the AIPOS AI-HUMAN development method created by AIPOS Consulting. Human judgment and AI execution work together while requirements, design decisions, changes, tests, and deployment records are continuously accumulated as project assets for future developers.',
    docsTitle: 'Sustainable handover assets',
    docsDesc: 'Requirements, architecture decisions, data structures, change history, test results, and deployment information are managed under AIPOS standards so maintenance and future upgrades can continue with context intact.',
    cicdTitle: 'Continuous development through CI/CD',
    cicdDesc: 'Source changes move from GitHub into validation and deployment, while production feedback returns to requirements. The MVP therefore evolves as a continuously improvable product rather than a one-time deliverable.',
    flow: ['Requirement Change', 'Codex Development', 'GitHub Push', 'CI Validation', 'Vercel Deployment', 'User Feedback'],
    handover: 'AIPOS Documents + Version History → Handover → Next Developer Upgrade',
  },
  ja: {
    label: 'AIPOS AI-HUMAN DEVELOPMENT METHOD',
    title: '開発が終わっても、知識と文書は残ります',
    desc: 'すべての開発工程は、AIPOS Consultingが開発したAIPOS AI-HUMAN開発方法論に基づいて進めます。人の判断とAIの実行を組み合わせ、要件・設計・変更・テスト・デプロイ記録をプロジェクト資産として蓄積し、将来別の開発者が参加しても迅速に引き継げる状態を保ちます。',
    docsTitle: '持続可能な引き継ぎ資産',
    docsDesc: '要件、設計判断、データ構造、変更履歴、テスト結果、デプロイ情報をAIPOS基準で管理し、保守と高度化の基準資料として活用します。',
    cicdTitle: 'CI/CDにつながる継続開発',
    cicdDesc: 'ソース変更はGitHubを中心に検証・デプロイへ連携され、運用フィードバックは再び要件に戻ります。MVPを一回限りの成果物ではなく、継続的に改善できる製品へ発展させます。',
    flow: ['要件変更', 'Codex開発', 'GitHub Push', 'CI検証', 'Vercelデプロイ', '運用フィードバック'],
    handover: 'AIPOS文書 + Version History → Handover → Next Developer Upgrade',
  },
  zh: {
    label: 'AIPOS AI-HUMAN DEVELOPMENT METHOD',
    title: '开发完成后，知识与文档仍然保留',
    desc: '所有开发过程均依据AIPOS Consulting研发的AIPOS AI-HUMAN开发方法论执行。通过结合人的判断与AI的执行，将需求、设计、变更、测试和部署记录持续沉淀为项目资产，使后续开发者能够快速理解背景并继续升级。',
    docsTitle: '可持续的交接资产',
    docsDesc: '按照AIPOS标准管理需求、设计决策、数据结构、变更记录、测试结果和部署信息，作为后续维护和升级的基础资料。',
    cicdTitle: '通过CI/CD持续开发',
    cicdDesc: '代码变更以GitHub为中心进入验证和部署流程，运营反馈再回流到需求。MVP不再是一次性交付，而是可以持续改进的产品。',
    flow: ['需求变更', 'Codex开发', 'GitHub Push', 'CI验证', 'Vercel部署', '运营反馈'],
    handover: 'AIPOS文档 + Version History → Handover → Next Developer Upgrade',
  },
} as const

export default function Home() {
  const [lang, setLang] = useState<Lang>('ko')
  const t = copy[lang]
  const a = aiHumanCopy[lang]

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

      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-teal/5 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold tracking-[0.2em] text-teal">{t.stackLabel}</p>
            <h2 className="mt-4 text-2xl font-bold leading-tight md:text-4xl">{t.stackTitle}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted md:text-lg">{t.stackDesc}</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {t.stackSteps.map(([title], index) => {
              const Icon = stackIcons[index]
              return (
                <div key={stackBrands[index]} className="relative">
                  <div className="flex h-full min-h-[190px] flex-col items-center justify-center rounded-2xl border border-border bg-white p-5 text-center shadow-card">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white"><Icon size={26} /></div>
                    <div className="mt-4 text-xs font-bold tracking-[0.12em] text-teal">STEP {index + 1}</div>
                    <div className="mt-1 text-lg font-bold">{stackBrands[index]}</div>
                    <div className="mt-2 text-sm font-semibold text-muted">{title}</div>
                  </div>
                  {index < t.stackSteps.length - 1 && <div className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-teal shadow-sm md:flex"><ArrowRight size={16} /></div>}
                </div>
              )
            })}
          </div>

          <div className="mt-14 space-y-5">
            {t.stackSteps.map(([title, description], index) => {
              const Icon = stackIcons[index]
              return (
                <article key={title} className="grid gap-6 rounded-3xl border border-border bg-surface/60 p-6 shadow-sm md:grid-cols-[180px_1fr_280px] md:items-center md:p-8">
                  <div className="flex items-center gap-4 md:block">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-white md:h-14 md:w-14"><Icon size={24} /></div>
                    <div className="md:mt-4"><div className="text-xs font-bold tracking-[0.14em] text-teal">STEP {index + 1}</div><h3 className="mt-1 text-xl font-bold">{stackBrands[index]}</h3></div>
                  </div>
                  <div><h4 className="text-lg font-bold md:text-xl">{title}</h4><p className="mt-3 leading-7 text-muted">{description}</p></div>
                  <div className="rounded-2xl border border-border bg-white p-5"><div className="text-xs font-bold tracking-[0.12em] text-teal">OUTPUT</div><div className="mt-2 text-sm font-semibold leading-6 text-navy">{t.stackOutputs[index]}</div></div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold tracking-[0.2em] text-teal">{a.label}</p>
            <h2 className="mt-4 text-2xl font-bold leading-tight md:text-4xl">{a.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/75 md:text-lg">{a.desc}</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 md:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal text-white"><ClipboardCheck size={24} /></div>
              <h3 className="mt-5 text-xl font-bold md:text-2xl">{a.docsTitle}</h3>
              <p className="mt-4 leading-7 text-white/70">{a.docsDesc}</p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-semibold leading-6 text-white/90">Requirements · Design Decision · Data Model · Change Log · Test Result · Deployment Record</div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 md:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal text-white"><GitBranch size={24} /></div>
              <h3 className="mt-5 text-xl font-bold md:text-2xl">{a.cicdTitle}</h3>
              <p className="mt-4 leading-7 text-white/70">{a.cicdDesc}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {a.flow.map((item, index) => <div key={item} className="flex items-center gap-2"><span className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-xs font-bold text-white/90">{item}</span>{index < a.flow.length - 1 && <ArrowRight size={14} className="text-teal" />}</div>)}
              </div>
            </article>
          </div>

          <div className="mt-8 rounded-3xl border border-teal/40 bg-teal/10 p-6 text-center md:p-8">
            <div className="text-xs font-bold tracking-[0.18em] text-teal">HANDOVER & CONTINUOUS UPGRADE</div>
            <div className="mt-3 text-lg font-bold leading-8 md:text-2xl">{a.handover}</div>
          </div>
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
