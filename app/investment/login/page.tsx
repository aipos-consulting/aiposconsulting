import LoginForm from './login-form'
import { currentAdmin } from '../auth'
import { redirect } from 'next/navigation'
export const dynamic = 'force-dynamic'
export const metadata = { title: '관리자 로그인 | AIPOS Investment', robots: { index: false, follow: false } }
export default async function LoginPage() {
  if (await currentAdmin()) redirect('/investment')
  return <main className="min-h-screen bg-[#F6F9FC] px-5 py-20 text-navy">
    <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-border bg-white shadow-card">
      <div className="bg-navy px-8 py-9 text-white">
        <div className="mb-2 text-sm tracking-[0.15em] text-[#7DD6DD]">AIPOS CONSULTING</div>
        <h1 className="text-2xl font-bold">Investment Intelligence</h1>
        <p className="mt-2 text-sm text-white/75">관리자 전용 투자분석 서비스</p>
      </div>
      <div className="p-8"><LoginForm /></div>
    </div>
  </main>
}
