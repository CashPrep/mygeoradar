import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase-server'

/**
 * GET /api/purchase-status
 * Returns { confirmed: boolean } for the currently authenticated user.
 * Used by the /success page to poll until the Stripe webhook has written
 * the purchase to the DB, then auto-redirect to /account.
 */
export async function GET() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ confirmed: false }, { status: 200 })
  }

  const { data } = await supabase
    .from('playbook_purchases')
    .select('id')
    .eq('email', user.email!.toLowerCase())
    .limit(1)

  return NextResponse.json(
    { confirmed: !!(data && data.length > 0) },
    {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    }
  )
}
