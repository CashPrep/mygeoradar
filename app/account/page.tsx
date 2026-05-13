import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase-server'
import { AccountClient } from '@/components/account/AccountClient'

export const metadata = {
  title: 'My Dashboard | MyGeoRadar',
  description: 'View your AI visibility scan history and track your progress.',
}

export default async function AccountPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: scans } = await supabase
    .from('scan_reports')
    .select('id, created_at, business_name, website, overall_score, level, paid')
    .eq('user_id', user.id)
    .eq('paid', true)
    .order('created_at', { ascending: false })
    .limit(50)

  // email_confirmed_at is null when unverified
  const emailVerified = !!user.email_confirmed_at

  return (
    <AccountClient
      user={user}
      scans={scans ?? []}
      emailVerified={emailVerified}
    />
  )
}
