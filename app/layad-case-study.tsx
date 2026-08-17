'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, CheckCircle2, GitBranch, Database, Rocket, ClipboardCheck } from 'lucide-react'

type Lang = 'ko' | 'en' | 'ja' | 'zh'

const content = {
  ko: {
    eyebrow: 'MVP CASE STUDY',
    title: 'LAYAD BEAUTY CODE MVP',
    lead: 'AI 기반 뷰티 유형 진단과 상품 적합도 분석을 실제 서비스로 구현한 MVP 사례입니다.',
    challengeTitle: 'Challenge',
    challenge: '스타트업의 서비스 아이디어를 짧은 기간 안에 실제 사용 가능한 웹 서비스로 구현하고, 이후 다른 개발자가 이어받을 수 있도록 개발·배포·운영 이력을 함께 남겨야 했습니다.',
    solutionTitle: 'AIPOS Solution',
    solution: '요구사항을 AI가 실행 가능한 구조로 정리하고, 코드·데이터베이스·형상관리·배포를 하나의 흐름으로 연결했습니다. 세부 진단 로직과 서비스 고유 노하우는 공개하지 않고 운영 구조와 개발 프로세스 중심으로 관리했습니다.',
    resultTitle: 'Outcome',
    result: 'MVP 기능 구현뿐 아니라 GitHub, Supabase, Vercel, Daily PM, AIPOS 기준문서를 연결해 지속 개발과 인수인계가 가능한 운영 기반을 구축했습니다.',
    gateTitle: 'AIPOS MVP Release Gate',
    gate: 'Repository · Branch · Approved Commit · Vercel Project · Supabase Project를 배포 전에 확인하고, Production 화면과 운영 데이터까지 검증한 뒤 완료 처리합니다.',
    process: ['Requirement', 'AI Development', 'Supabase', 'GitHub', 'Vercel', 'Production Validation'],
    tags: ['AI-Native MVP', 'Next.js', 'Supabase', 'GitHub', 'Vercel', 'CI/CD', 'AIPOS'],
  },
  en: {
    eyebrow: 'MVP CASE STUDY',
    title: 'LAYAD BEAUTY CODE MVP',
    lead: 'A production MVP that turns an AI-assisted beauty-type experience and product-fit analysis into a working web service.',
    challengeTitle: 'Challenge',
    challenge: 'Turn a startup service concept into a usable web product quickly while preserving enough development, deployment, and operating context for future developers to continue the work.',
    solutionTitle: 'AIPOS Solution',
    solution: 'Requirements were structured into executable work and connected across code, database, source control, and deployment. Proprietary assessment logic and service know-how remain private; the public case focuses on the delivery and operating process.',
    resultTitle: 'Outcome',
    result: 'The MVP was delivered with a maintainable operating foundation connecting GitHub, Supabase, Vercel, Daily PM, and AIPOS project documentation for continuous development and handover.',
    gateTitle: 'AIPOS MVP Release Gate',
    gate: 'Repository, branch, approved commit, Vercel project, and Supabase project are verified before release, followed by production UI and operating-data validation.',
    process: ['Requirement', 'AI Development', 'Supabase', 'GitHub', 'Vercel', 'Production Validation'],
    tags: ['AI-Native MVP', 'Next.js', 'Supabase', 'GitHub', 'Vercel', 'CI/CD', 'AIPOS'],
  },
  ja: {
    eyebrow: 'MVP CASE STUDY',
    title: 'LAYAD BEAUTY CODE MVP',
    lead: 'AIを活用したビューティータイプ体験と商品適合分析を実サービスとして構築したMVP事例です。',
    challengeTitle: 'Challenge',
    challenge: 'スタートアップのサービスアイデアを短期間で利用可能なWebサービスにし、将来別の開発者が継続できるよう開発・デプロイ・運用の文脈も残す必要がありました。',
    solutionTitle: 'AIPOS Solution',
    solution: '要件をAIが実行可能な構造に整理し、コード、データベース、ソース管理、デプロイを一つの流れで接続しました。診断ロジックなど独自ノウハウは非公開とし、公開事例では開発・運用プロセスを中心に示します。',
    resultTitle: 'Outcome',
    result: 'MVP機能に加え、GitHub、Supabase、Vercel、Daily PM、AIPOS基準文書を連携し、継続開発と引き継ぎが可能な運用基盤を構築しました。',
    gateTitle: 'AIPOS MVP Release Gate',
    gate: 'Repository、Branch、Approved Commit、Vercel Project、Supabase Projectをリリース前に確認し、本番画面と運用データまで検証して完了とします。',
    process: ['Requirement', 'AI Development', 'Supabase', 'GitHub', 'Vercel', 'Production Validation'],
    tags: ['AI-Native MVP', 'Next.js', 'Supabase', 'GitHub', 'Vercel', 'CI/CD', 'AIPOS'],
  },
  zh: {
    eyebrow: 'MVP CASE STUDY',
    title: 'LAYAD BEAUTY CODE MVP',
    lead: '将AI辅助的美妆类型体验与产品适配分析落地为真实Web服务的MVP案例。',
    challengeTitle: 'Challenge',
    challenge: '在较短时间内将初创企业的服务构想转化为可使用的Web产品，同时保留开发、部署和运营背景，使后续开发者能够继续升级。',
    solutionTitle: 'AIPOS Solution',
    solution: '将需求整理为AI可执行结构，并把代码、数据库、版本管理和部署连接成一个流程。诊断逻辑等核心业务诀窍不公开，公开案例重点展示交付与运营方法。',
    resultTitle: 'Outcome',
    result: '除MVP功能外，还连接GitHub、Supabase、Vercel、Daily PM和AIPOS项目文档，形成可持续开发和交接的运营基础。',
    gateTitle: 'AIPOS MVP Release Gate',
    gate: '发布前核对Repository、Branch、Approved Commit、Vercel Project和Supabase Project，并验证生产界面与运营数据后才视为完成。',
    process: ['Requirement', 'AI Development', 'Supabase', 'GitHub', 'Vercel', 'Production Validation'],
    tags: ['AI-Native MVP', 'Next.js', 'Supabase', 'GitHub', 'Vercel', 'CI/CD', 'AIPOS'],
  },
} as const

function detectLang(): Lang {
  const text = document.body?.innerText || ''
  if (text.includes('AI戦略から実行まで')) return 'ja'
  if (text.includes('从AI战略到执行')) return 'zh'
  if (text.includes('From AI Strategy to Execution')) return 'en'
  return 'ko'
}

export default function LayadCaseStudy() {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [lang, setLang] = useState<Lang>('ko')

  useEffect(() => {
    const about = document.getElementById('about')
    if (!about?.parentElement) return

    let root = document.getElementById('layad-case-study-root')
    if (!root) {
      root = document.createElement('div')
      root.id = 'layad-case-study-root'
      about.parentElement.insertBefore(root, about)
    }
    setTarget(root)
    setLang(detectLang())

    const observer = new MutationObserver(() => {
      const next = detectLang()
      setLang((current) => current === next ? current : next)
    })
    observer.observe(document.body, { subtree: true, childList: true, characterData: true })

    return () => observer.disconnect()
  }, [])

  if (!target) return null
  const c = content[lang]
  const icons = [ClipboardCheck, Database, GitBranch, Rocket]
  const cards = [
    [c.challengeTitle, c.challenge],
    [c.solutionTitle, c.solution],
    [c.resultTitle, c.result],
    [c.gateTitle, c.gate],
  ] as const

  return createPortal(
    <section id="portfolio" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-bold tracking-[0.2em] text-teal">{c.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy md:text-5xl">{c.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted md:text-lg">{c.lead}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {c.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-surface px-3 py-2 text-xs font-bold text-navy">{tag}</span>)}
            </div>
          </div>

          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {cards.map(([title, description], index) => {
                const Icon = icons[index]
                return (
                  <article key={title} className="rounded-3xl border border-border bg-surface/50 p-6 shadow-sm md:p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white"><Icon size={21} /></div>
                    <h3 className="mt-5 text-lg font-bold text-navy md:text-xl">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
                  </article>
                )
              })}
            </div>

            <div className="mt-6 rounded-3xl border border-teal/30 bg-teal/[0.05] p-6 md:p-8">
              <div className="text-xs font-bold tracking-[0.16em] text-teal">AI-NATIVE DELIVERY FLOW</div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {c.process.map((step, index) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-navy shadow-sm ring-1 ring-border">{step}</span>
                    {index < c.process.length - 1 && <ArrowRight size={14} className="text-teal" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-start gap-3 border-t border-teal/20 pt-5 text-sm leading-6 text-navy/80">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal" />
                <span>{c.gate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>,
    target,
  )
}
