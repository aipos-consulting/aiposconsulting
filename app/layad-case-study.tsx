'use client'

import { ArrowRight, CheckCircle2, ClipboardCheck, Database, Gauge, GitBranch, Rocket } from 'lucide-react'

export type Lang = 'ko' | 'en' | 'ja' | 'zh'

const content = {
  ko: {
    eyebrow: 'MVP CASE STUDY', title: 'LAYAD BEAUTY CODE MVP',
    lead: 'AI 기반 뷰티 유형 진단과 상품 적합도 분석을 실제 서비스로 구현한 MVP 사례입니다.',
    challengeTitle: 'Challenge', challenge: '스타트업의 서비스 아이디어를 짧은 기간 안에 실제 사용 가능한 웹 서비스로 구현하고, 이후 다른 개발자가 이어받을 수 있도록 개발·배포·운영 이력을 함께 남겨야 했습니다.',
    solutionTitle: 'AIPOS Solution', solution: '요구사항을 AI가 실행 가능한 구조로 정리하고, 코드·데이터베이스·형상관리·배포를 하나의 흐름으로 연결했습니다. 세부 진단 로직과 서비스 고유 노하우는 공개하지 않고 운영 구조와 개발 프로세스 중심으로 관리했습니다.',
    resultTitle: 'Outcome', result: 'MVP 기능 구현뿐 아니라 GitHub, Supabase, Vercel, Daily PM, AIPOS 기준문서를 연결해 지속 개발과 인수인계가 가능한 운영 기반을 구축했습니다.',
    adminTitle: 'OpenAI Usage & Billing Admin', admin: 'OpenAI 연계 서비스는 Owner가 Admin에서 사용량과 과금 한도를 실시간으로 직접 확인·관리하고, 설정한 한도에 따라 운영 리스크를 통제할 수 있도록 설계합니다.',
    gate: 'Repository · Branch · Approved Commit · Vercel Project · Supabase Project를 배포 전에 확인하고, Production 화면과 운영 데이터까지 검증한 뒤 완료 처리합니다.',
    imageCaption: 'LAYAD 16 Codes UI 사례', question: '당신의 코드는 무엇인가요?', findCode: '내 Code 찾기', selectCode: '내 Code 직접 선택',
    process: ['Requirement', 'AI Development', 'Supabase', 'GitHub', 'Vercel', 'Production Validation'],
    tags: ['AI-Native MVP', 'Next.js', 'Supabase', 'GitHub', 'Vercel', 'CI/CD', 'AIPOS'],
  },
  en: {
    eyebrow: 'MVP CASE STUDY', title: 'LAYAD BEAUTY CODE MVP',
    lead: 'A production MVP that turns an AI-assisted beauty-type experience and product-fit analysis into a working web service.',
    challengeTitle: 'Challenge', challenge: 'Turn a startup service concept into a usable web product quickly while preserving enough development, deployment, and operating context for future developers to continue the work.',
    solutionTitle: 'AIPOS Solution', solution: 'Requirements were structured into executable work and connected across code, database, source control, and deployment. Proprietary assessment logic and service know-how remain private; the public case focuses on the delivery and operating process.',
    resultTitle: 'Outcome', result: 'The MVP was delivered with a maintainable operating foundation connecting GitHub, Supabase, Vercel, Daily PM, and AIPOS project documentation for continuous development and handover.',
    adminTitle: 'OpenAI Usage & Billing Admin', admin: 'For services connected to OpenAI, the Owner can monitor usage and billing limits directly in Admin in real time and control operating risk against configured spending thresholds.',
    gate: 'Repository, branch, approved commit, Vercel project, and Supabase project are verified before release, followed by production UI and operating-data validation.',
    imageCaption: 'LAYAD 16 Codes UI Case', question: 'What is your code?', findCode: 'Find My Code', selectCode: 'Select My Code',
    process: ['Requirement', 'AI Development', 'Supabase', 'GitHub', 'Vercel', 'Production Validation'],
    tags: ['AI-Native MVP', 'Next.js', 'Supabase', 'GitHub', 'Vercel', 'CI/CD', 'AIPOS'],
  },
  ja: {
    eyebrow: 'MVP CASE STUDY', title: 'LAYAD BEAUTY CODE MVP',
    lead: 'AIを活用したビューティータイプ体験と商品適合分析を実サービスとして構築したMVP事例です。',
    challengeTitle: 'Challenge', challenge: 'スタートアップのサービスアイデアを短期間で利用可能なWebサービスにし、将来別の開発者が継続できるよう開発・デプロイ・運用の文脈も残す必要がありました。',
    solutionTitle: 'AIPOS Solution', solution: '要件をAIが実行可能な構造に整理し、コード、データベース、ソース管理、デプロイを一つの流れで接続しました。診断ロジックなど独自ノウハウは非公開とし、公開事例では開発・運用プロセスを中心に示します。',
    resultTitle: 'Outcome', result: 'MVP機能に加え、GitHub、Supabase、Vercel、Daily PM、AIPOS基準文書を連携し、継続開発と引き継ぎが可能な運用基盤を構築しました。',
    adminTitle: 'OpenAI 利用量・課金 Admin', admin: 'OpenAI連携サービスでは、OwnerがAdmin画面から利用量と課金上限をリアルタイムで直接確認・管理し、設定した上限に基づいて運用リスクをコントロールできるよう設計します。',
    gate: 'Repository、Branch、Approved Commit、Vercel Project、Supabase Projectをリリース前に確認し、本番画面と運用データまで検証して完了とします。',
    imageCaption: 'LAYAD 16 Codes UI 事例', question: 'あなたのコードは何ですか？', findCode: 'Codeを探す', selectCode: 'Codeを直接選択',
    process: ['Requirement', 'AI Development', 'Supabase', 'GitHub', 'Vercel', 'Production Validation'],
    tags: ['AI-Native MVP', 'Next.js', 'Supabase', 'GitHub', 'Vercel', 'CI/CD', 'AIPOS'],
  },
  zh: {
    eyebrow: 'MVP CASE STUDY', title: 'LAYAD BEAUTY CODE MVP',
    lead: '将AI辅助的美妆类型体验与产品适配分析落地为真实Web服务的MVP案例。',
    challengeTitle: 'Challenge', challenge: '在较短时间内将初创企业的服务构想转化为可使用的Web产品，同时保留开发、部署和运营背景，使后续开发者能够继续升级。',
    solutionTitle: 'AIPOS Solution', solution: '将需求整理为AI可执行结构，并把代码、数据库、版本管理和部署连接成一个流程。诊断逻辑等核心业务诀窍不公开，公开案例重点展示交付与运营方法。',
    resultTitle: 'Outcome', result: '除MVP功能外，还连接GitHub、Supabase、Vercel、Daily PM和AIPOS项目文档，形成可持续开发和交接的运营基础。',
    adminTitle: 'OpenAI 用量与计费 Admin', admin: '对于连接OpenAI的服务，Owner可在Admin中实时直接查看并管理使用量和计费上限，并依据设定的费用阈值控制运营风险。',
    gate: '发布前核对Repository、Branch、Approved Commit、Vercel Project和Supabase Project，并验证生产界面与运营数据后才视为完成。',
    imageCaption: 'LAYAD 16 Codes UI 案例', question: '你的代码是什么？', findCode: '查找我的 Code', selectCode: '直接选择 Code',
    process: ['Requirement', 'AI Development', 'Supabase', 'GitHub', 'Vercel', 'Production Validation'],
    tags: ['AI-Native MVP', 'Next.js', 'Supabase', 'GitHub', 'Vercel', 'CI/CD', 'AIPOS'],
  },
} as const

export default function LayadCaseStudy({ lang }: { lang: Lang }) {
  const c = content[lang]
  const icons = [ClipboardCheck, Database, Rocket, Gauge]
  const cards = [[c.challengeTitle, c.challenge], [c.solutionTitle, c.solution], [c.resultTitle, c.result], [c.adminTitle, c.admin]] as const

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[1fr_1.08fr] lg:items-start">
          <div className="min-w-0">
            <p className="text-sm font-bold tracking-[0.2em] text-teal">{c.eyebrow}</p>
            <h2 className="mt-4 break-words text-3xl font-bold tracking-tight text-navy md:text-5xl">{c.title}</h2>
            <p className="mt-5 max-w-xl break-words text-base leading-8 text-muted md:text-lg">{c.lead}</p>
            <div className="mt-8 flex min-w-0 flex-wrap gap-2">{c.tags.map((tag) => <span key={tag} className="max-w-full break-words rounded-full border border-border bg-surface px-3 py-2 text-xs font-bold text-navy">{tag}</span>)}</div>

            <figure className="mx-auto mt-9 w-[85%] max-w-full overflow-hidden rounded-[24px] border border-[#d9cec2] bg-[#f5f1ed] shadow-[0_18px_45px_rgba(13,47,87,0.12)] lg:-translate-x-[2mm] lg:translate-y-[5mm]">
              <div className="relative flex min-h-[306px] min-w-0 flex-col items-center justify-center px-5 py-8 text-center sm:min-h-[349px] md:px-8">
                <div className="absolute right-4 top-4 max-w-[45%] break-words rounded-full border border-[#d9cec2] bg-white/70 px-2.5 py-1 text-[9px] font-semibold text-[#232323]">🌐 {lang === 'ko' ? '한국어' : lang === 'en' ? 'EN' : lang === 'ja' ? '日本語' : '中文'}</div>
                <div className="text-[36px] font-black leading-none tracking-[-0.05em] text-[#222] sm:text-[48px]">Layad</div>
                <div className="mt-1 text-[58px] font-black leading-[0.9] tracking-[-0.065em] text-[#222] sm:text-[73px]">16 Codes</div>
                <div className="mt-6 max-w-full break-words text-sm font-semibold text-[#222] sm:text-base">{c.question}</div>
                <div className="mt-8 w-[85%] max-w-[360px] space-y-2.5">
                  <div className="break-words rounded-full bg-[#232323] px-4 py-3.5 text-xs font-bold text-white shadow-sm sm:text-sm">{c.findCode}</div>
                  <div className="break-words rounded-full border border-[#b9aa9a] bg-[#e9e1d8] px-4 py-3.5 text-xs font-bold text-[#292929] sm:text-sm">{c.selectCode}</div>
                </div>
              </div>
              <figcaption className="break-words border-t border-[#d9cec2] bg-white/70 px-4 py-3 text-xs font-bold text-navy sm:text-sm">{c.imageCaption}</figcaption>
            </figure>
          </div>

          <div className="min-w-0">
            <div className="grid min-w-0 gap-5 sm:grid-cols-2">
              {cards.map(([title, description], index) => { const Icon = icons[index]; return (
                <article key={title} className="min-w-0 overflow-hidden rounded-3xl border border-border bg-surface/50 p-6 shadow-sm md:p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white"><Icon size={21} /></div>
                  <h3 className="mt-5 break-words text-lg font-bold text-navy md:text-xl">{title}</h3><p className="mt-3 break-words text-sm leading-7 text-muted">{description}</p>
                </article>
              )})}
            </div>
            <div className="mt-6 min-w-0 overflow-hidden rounded-3xl border border-teal/30 bg-teal/[0.05] p-6 md:p-8">
              <div className="break-words text-xs font-bold tracking-[0.16em] text-teal">AI-NATIVE DELIVERY FLOW</div>
              <div className="mt-5 flex min-w-0 flex-wrap items-center gap-2">{c.process.map((step, index) => <div key={step} className="flex min-w-0 max-w-full items-center gap-2"><span className="max-w-full break-words rounded-full bg-white px-3 py-2 text-xs font-bold text-navy shadow-sm ring-1 ring-border">{step}</span>{index < c.process.length - 1 && <ArrowRight size={14} className="shrink-0 text-teal" />}</div>)}</div>
              <div className="mt-6 flex min-w-0 items-start gap-3 border-t border-teal/20 pt-5 text-sm leading-6 text-navy/80"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal" /><span className="min-w-0 break-words">{c.gate}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
