import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseServer } from '@/lib/supabase-server'

export const runtime = 'nodejs'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

// Polled by /report/pending to check if webhook has fired yet.
// Requires the caller to be authenticated — the session_id alone is not a
// sufficient secret (it is visible in the success URL query string).
export async function GET(req: NextRequest) {
  // Auth check: only the buyer can poll for their own token
  const supabaseServer = await createSupabaseServer()
  const { data: { user } } = await supabaseServer.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ error: 'session_id required' }, { status: 400 })

  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from('report_purchases')
    .select('token, email')
    .eq('stripe_session_id', sessionId)
    .not('paid_at', 'is', null)
    .maybeSingle()

  // Verify the purchase email matches the authenticated user
  if (data?.token) {
    const purchaseEmail = data.email?.toLowerCase() ?? ''
    const userEmail     = user.email?.toLowerCase() ?? ''
    if (purchaseEmail && purchaseEmail !== userEmail) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ token: data.token })
  }

  return NextResponse.json({ token: null })
}
