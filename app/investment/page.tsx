import { requireAdmin } from './auth'
import InvestmentWorkbench from './workbench'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Investment Intelligence | AIPOS', robots:{index:false,follow:false} }
export default async function InvestmentPage() {
  const user=await requireAdmin()
  return <InvestmentWorkbench adminEmail={user.email}/>
}
