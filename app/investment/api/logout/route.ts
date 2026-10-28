import { NextResponse } from 'next/server'
export async function POST() {
  const r=NextResponse.json({ok:true})
  r.cookies.set('aipos_investment_access','',{httpOnly:true,path:'/investment',maxAge:0})
  return r
}
