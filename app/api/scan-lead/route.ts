// ─────────────────────────────────────────────────────────────────────────────
// POST /api/scan-lead
// Called when a visitor submits their email after seeing scan results.
// 1. Saves lead to scan_leads table
// 2. Creates unsubscribe token
// 3. Sends Email 1 immediately
// ─────────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/emails/sender'
import { email1_scanResults } from '@/lib/emails/templates'

export const runtime = 'nodejs'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function POST(req: NextRequest) {
  try {
    const body          = await req.json()
    const email: string    = (body.email ?? '').trim().toLowerCase()
    const scanId: string   = body.scanId ?? ''
    const score: number    = body.score ?? 0
    const url: string      = body.url ?? ''
    const failCount: number = body.failCount ?? 0
    const warnCount: number = body.warnCount ?? 0
    const consent: boolean  = body.consent ?? false

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
    if (!consent) {
      return NextResponse.json({ error: 'Consent required' }, { status: 400 })
    }

    const supabase = getSupabase()
    const now      = new Date().toISOString()

    // Upsert lead — corrected column names to match actual DB schema
    const { data: lead, error: leadErr } = await supabase
      .from('scan_leads')
      .upsert(
        {
          email,
          scan_report_id:      scanId || null,  // was: scan_id (wrong)
          domain:              url,              // was: url (wrong column name)
          score,
          url,                                  // new column added in migration
          email_sequence_step: 1,
          email_1_sent_at:     now,
          last_email_sent_at:  now,
          subscribed:          true,
        },
        { onConflict: 'email,scan_report_id' }  // was: email,scan_id (wrong)
      )
      .select('id')
      .single()

    if (leadErr && !lead) {
      // Unique violation or other error — try to fetch existing lead
      console.error('Lead upsert error:', leadErr)
      const { data: existing } = await supabase
        .from('scan_leads')
        .select('id')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      if (!existing) {
        return NextResponse.json({ error: 'Could not save lead' }, { status: 500 })
      }
    }

    const leadId = lead?.id

    // Create unsubscribe token — corrected column name
    let unsubToken = ''
    if (leadId) {
      const { data: tokenRow } = await supabase
        .from('unsubscribe_tokens')
        .insert({ scan_lead_id: leadId })  // was: lead_id (wrong column name)
        .select('token')
        .single()
      unsubToken = tokenRow?.token ?? ''
    }

    const appUrl   = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.mygeoradar.com'
    const unsubUrl = unsubToken
      ? `${appUrl}/unsubscribe?token=${unsubToken}`
      : `${appUrl}/unsubscribe`

    // Send Email 1 immediately
    const { subject, html } = email1_scanResults({
      score,
      url,
      failCount,
      warnCount,
      unsubUrl,
    })

    await sendEmail({ to: email, subject, html })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('scan-lead error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
