import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const authConfig = () => ({
  url: process.env.INVESTMENT_SUPABASE_URL,
  key: process.env.INVESTMENT_SUPABASE_ANON_KEY,
  admin: process.env.INVESTMENT_ADMIN_EMAIL?.toLowerCase().trim()
})

export async function currentAdmin() {
  const { url, key, admin } = authConfig()
  if (!url || !key || !admin) return null
  const token = cookies().get('aipos_investment_access')?.value
  if (!token) return null
  try {
    const response = await fetch(url + '/auth/v1/user', {
      headers: { apikey: key, Authorization: 'Bearer ' + token },
      cache: 'no-store'
    })
    if (!response.ok) return null
    const user = await response.json()
    if (!user.email_confirmed_at || user.is_anonymous || user.email?.toLowerCase() !== admin) return null
    return { id: user.id as string, email: user.email as string }
  } catch { return null }
}
export async function requireAdmin() {
  const user = await currentAdmin()
  if (!user) redirect('/investment/login')
  return user
}
