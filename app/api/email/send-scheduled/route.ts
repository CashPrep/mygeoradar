// ─────────────────────────────────────────────────────────────────────────────
// GET /api/email/send-scheduled
// Called daily at 10:00 UTC by Vercel Cron (configured in vercel.json)
// Finds all leads who are due for emails 2–5 and sends them.
//
// Schedule:
//   Email 2 → 1 day  after email_1_sent_at
//   Email 3 → 2 days after email_1_sent_at
//   Email 4 → 4 days after email_1_sent_at
//   Email 5 → 7 days after email_1_sent_at
// ─────────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/emails/sender'
import {
  email2_problemAgitation,
  email3_solution,
  email4_socialProof,
  email5_lastChance,
} from '@/lib/emails/templates'

export const runtime  = 'nodejs'
export const maxDuration = 60

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

function daysAgo(days: number) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

// Validate cron secret so only Vercel (or you) can trigger this
function isAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) return true // no secret set → allow (dev mode)
  const auth = req.headers.get('authorization') ?? ''
  return auth === `Bearer ${secret}`
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()
  const appUrl   = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.mygeoradar.com'

  let sent    = 0
  let skipped = 0
  let errors  = 0

  // ── Fetch all active leads that have received Email 1 ────────────────────
  const { data: leads, error } = await supabase
    .from('scan_leads')
    .select('id, email, score, url, email_1_sent_at, email_2_sent_at, email_3_sent_at, email_4_sent_at, email_5_sent_at, unsubscribed_at, converted_at')
    .not('email_1_sent_at', 'is', null)
    .is('unsubscribed_at', null)  // skip unsubscribed
    .order('created_at', { ascending: true })
    .limit(500) // process up to 500 leads per cron run

  if (error || !leads) {
    console.error('Cron fetch error:', error)
    return NextResponse.json({ error: 'DB fetch failed' }, { status: 500 })
  }

  for (const lead of leads) {
    // Skip converted leads (they bought — no more sales emails)
    if (lead.converted_at) { skipped++; continue }

    const email1At = new Date(lead.email_1_sent_at).getTime()
    const now      = Date.now()
    const dayMs    = 24 * 60 * 60 * 1000

    // Fetch unsubscribe token for this lead
    const { data: tokenRow } = await supabase
      .from('unsubscribe_tokens')
      .select('token')
      .eq('lead_id', lead.id)
      .is('used_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    const unsubUrl = tokenRow?.token
      ? `${appUrl}/unsubscribe?token=${tokenRow.token}`
      : `${appUrl}/unsubscribe`

    // Determine which email to send next
    let emailNum: 2 | 3 | 4 | 5 | null = null

    if (!lead.email_2_sent_at && now >= email1At + 1 * dayMs) emailNum = 2
    else if (!lead.email_3_sent_at && lead.email_2_sent_at && now >= email1At + 2 * dayMs) emailNum = 3
    else if (!lead.email_4_sent_at && lead.email_3_sent_at && now >= email1At + 4 * dayMs) emailNum = 4
    else if (!lead.email_5_sent_at && lead.email_4_sent_at && now >= email1At + 7 * dayMs) emailNum = 5

    if (!emailNum) { skipped++; continue }

    try {
      let subject = ''
      let html    = ''

      if (emailNum === 2) {
        ;({ subject, html } = email2_problemAgitation({ score: lead.score ?? 0, url: lead.url ?? '', unsubUrl }))
      } else if (emailNum === 3) {
        ;({ subject, html } = email3_solution({ score: lead.score ?? 0, unsubUrl }))
      } else if (emailNum === 4) {
        ;({ subject, html } = email4_socialProof({ unsubUrl }))
      } else if (emailNum === 5) {
        ;({ subject, html } = email5_lastChance({ score: lead.score ?? 0, url: lead.url ?? '', unsubUrl }))
      }

      await sendEmail({ to: lead.email, subject, html })

      // Mark as sent
      const sentField = `email_${emailNum}_sent_at`
      await supabase
        .from('scan_leads')
        .update({ [sentField]: new Date().toISOString() })
        .eq('id', lead.id)

      sent++
    } catch (e) {
      console.error(`Email ${emailNum} failed for lead ${lead.id}:`, e)
      errors++
    }
  }

  console.log(`Cron complete: sent=${sent}, skipped=${skipped}, errors=${errors}`)
  return NextResponse.json({ ok: true, sent, skipped, errors })
}
