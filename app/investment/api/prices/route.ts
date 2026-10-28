import { NextRequest, NextResponse } from 'next/server'
import { currentAdmin } from '../../auth'
export const dynamic = 'force-dynamic'
const allowed = new Set(['084370','005930','009150','006400'])
export async function GET(req:NextRequest){
 if(!await currentAdmin())return NextResponse.json({error:'로그인 필요'}, {status:401})
 const code = req.nextUrl.searchParams.get('code')||''
 if(!allowed.has(code))return NextResponse.json({error:'지원하지 않는 종목'}, {status:400})
 try{
  const url='https://aikstockdata.com/data/public/s/'+code+'_history.json'
  const upstream=await fetch(url,{next:{revalidate:1800},headers:{Accept:'application/json'}})
  if(!upstream.ok)throw new Error('upstream '+upstream.status)
  const json=await upstream.json()
  if(json.code && json.code!==code)throw new Error('code mismatch')
  const today=new Date(Date.now()+9*3600000).toISOString().slice(0,10)
  const rows=(Array.isArray(json.rows)?json.rows:[]).map((row:unknown)=>{
   if(!Array.isArray(row))return null
   const raw=String(row[0])
   const date=/^\d{8}$/.test(raw)?raw.slice(0,4)+'-'+raw.slice(4,6)+'-'+raw.slice(6,8):raw
   const close=Number(row[1])
   if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||date>today||!Number.isFinite(close)||close<=0)return null
   return {date,close}
  }).filter(Boolean).sort((a:{date:string},b:{date:string})=>a.date.localeCompare(b.date)).slice(-650)
  if(rows.length<2)throw new Error('No valid prices')

  const fetchedAt=new Date().toISOString()
  // KST 18:30 이전에는 당일 종가가 아직 배포되지 않았을 수 있습니다.
  const kst=new Date(Date.now()+9*3600000)
  const afterClose=kst.getUTCHours()>18||(kst.getUTCHours()===18&&kst.getUTCMinutes()>=30)
  const expected=new Date(Date.UTC(kst.getUTCFullYear(),kst.getUTCMonth(),kst.getUTCDate()))
  if(!afterClose)expected.setUTCDate(expected.getUTCDate()-1)
  while(expected.getUTCDay()===0||expected.getUTCDay()===6)expected.setUTCDate(expected.getUTCDate()-1)
  const expectedDate=expected.toISOString().slice(0,10)
  const asOf=rows[rows.length-1].date
  const stale=asOf<expectedDate
  return NextResponse.json({code,rows,source:'한국주식데이터(aikstockdata.com) / 금융위원회 공공데이터포털',asOf,expectedDate,stale,fetchedAt,cacheSeconds:1800,delayed:true},{headers:{'Cache-Control':'private, no-store'}})
 }catch{return NextResponse.json({error:'시세 공급원 조회 실패. 잠시 후 다시 시도해 주세요.'},{status:502})}
}
