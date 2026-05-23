import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

// Polled by /report/pending to check if webhook has fired yet
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ error: 'session_id required' }, { status: 400 })

  const supabase = getSupabase()
  const { data } = await supabase
    .from('report_purchases')
    .select('token')
    .eq('stripe_session_id', sessionId)
    .not('paid_at', 'is', null)
    .maybeSingle()

  if (data?.token) return NextResponse.json({ token: data.token })
  return NextResponse.json({ token: null })
}
