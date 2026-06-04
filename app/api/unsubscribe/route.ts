// ─────────────────────────────────────────────────────────────────────────────
// GET /api/unsubscribe?token=xxx
// Validates token and marks lead as unsubscribed
// ─────────────────────────────────────────────────────────────────────────────
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

export async function GET(req: NextRequest) {
  const token  = req.nextUrl.searchParams.get('token') ?? ''
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.mygeoradar.com'

  if (!token) {
    return NextResponse.redirect(`${appUrl}/unsubscribe?status=invalid`)
  }

  const supabase = getSupabase()

  // Look up token — column is `scan_lead_id` (matches scan-lead/route.ts insert)
  const { data: tokenRow, error } = await supabase
    .from('unsubscribe_tokens')
    .select('id, scan_lead_id, used_at')
    .eq('token', token)
    .single()

  if (error || !tokenRow) {
    return NextResponse.redirect(`${appUrl}/unsubscribe?status=invalid`)
  }

  // Mark token as used
  await supabase
    .from('unsubscribe_tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('id', tokenRow.id)

  // Mark lead as unsubscribed using correct FK column
  await supabase
    .from('scan_leads')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('id', tokenRow.scan_lead_id)

  return NextResponse.redirect(`${appUrl}/unsubscribe?status=success`)
}
