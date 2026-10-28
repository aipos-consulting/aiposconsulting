import { NextResponse } from 'next/server'
import { authConfig } from '../../auth'
export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
  const { url, key, admin } = authConfig()
  if (!url || !key || !admin) return NextResponse.json({error:'관리자 인증 환경설정이 필요합니다.'},{status:503})
  let body: {email?:string;password?:string}
  try { body = await request.json() } catch { return NextResponse.json({error:'요청이 올바르지 않습니다.'},{status:400}) }
  if (!body.email || !body.password || body.email.toLowerCase().trim() !== admin) {
    return NextResponse.json({error:'로그인 정보를 확인해 주세요.'},{status:401})
  }
  try {
    const result = await fetch(url + '/auth/v1/token?grant_type=password', {
      method:'POST', cache:'no-store',
      headers:{'Content-Type':'application/json',apikey:key},
      body:JSON.stringify({ email:body.email, password:body.password })
    })
    if (!result.ok) return NextResponse.json({error:'로그인 정보를 확인해 주세요.'},{status:401})
    const data = await result.json()
    if (data.user?.email?.toLowerCase() !== admin || !data.user?.email_confirmed_at || data.user?.is_anonymous) {
      return NextResponse.json({error:'관리자 권한이 없습니다.'},{status:403})
    }
    const response=NextResponse.json({ok:true})
    response.cookies.set('aipos_investment_access',data.access_token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/investment',maxAge:Math.min(data.expires_in || 3600,3600)})
    return response
  } catch { return NextResponse.json({error:'인증 서비스에 연결할 수 없습니다.'},{status:503}) }
}
