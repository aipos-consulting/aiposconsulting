'use client'
import { FormEvent, useState } from 'react'
export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError('')
    try {
      const response = await fetch('/investment/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password}) })
      if (!response.ok) { const data=await response.json(); throw new Error(data.error || '로그인 실패') }
      window.location.assign('/investment')
    } catch(e) { setError(e instanceof Error ? e.message : '로그인 오류') }
    finally { setLoading(false) }
  }
  return <form onSubmit={submit} className="space-y-5">
    <label className="block text-sm font-semibold">관리자 이메일
      <input type="email" required autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-teal" />
    </label>
    <label className="block text-sm font-semibold">비밀번호
      <input type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-teal" />
    </label>
    {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <button disabled={loading} className="w-full rounded-lg bg-teal px-4 py-3 font-bold text-white hover:brightness-95 disabled:opacity-60">{loading?'확인 중…':'관리자 로그인'}</button>
    <p className="text-xs leading-6 text-muted">승인된 관리자 이메일만 접근할 수 있습니다. 공개 회원가입은 지원하지 않습니다.</p>
  </form>
}
