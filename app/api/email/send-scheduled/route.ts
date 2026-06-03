// ─────────────────────────────────────────────────────────────────────────────
// GET /api/email/send-scheduled
// Called daily at 10:00 UTC by Vercel Cron (configured in vercel.json)
// Finds all leads who are due for emails 2–5 and sends them.
//
// Schedule (Issue #11 — front-load the upsell into the first 48h):
//   Email 2 → 2 hours after email_1_sent_at  ← was 24h; now fires same day
//   Email 3 → 1 day   after email_1_sent_at
//   Email 4 → 3 days  after email_1_sent_at
//   Email 5 → 6 days  after email_1_sent_at
//
// Rationale: SaaS purchase intent peaks within 2–48h of first touch.
// Email 2 (problem agitation + playbook CTA) must land while the scan
// result is still top of mind. The cron still runs daily; the 2h window
// means Email 2 will fire on the *next* cron run after sign-up for most
// users (worst case: 14h delay if they scan just after 10:00 UTC).
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

// Timing constants — all in milliseconds
const HOUR_MS = 60 * 60 * 1000
const DAY_MS  = 24 * HOUR_MS

const EMAIL_DELAYS = {
  2: 2  * HOUR_MS,  // 2 hours  — problem agitation + playbook CTA
  3: 1  * DAY_MS,   // 1 day    — solution overview
  4: 3  * DAY_MS,   // 3 days   — social proof
  5: 6  * DAY_MS,   // 6 days   — last chance
} as const

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

    // Determine which email to send next (sequential — only one per run)
    let emailNum: 2 | 3 | 4 | 5 | null = null

    if (!lead.email_2_sent_at && now >= email1At + EMAIL_DELAYS[2]) {
      emailNum = 2
    } else if (!lead.email_3_sent_at && lead.email_2_sent_at && now >= email1At + EMAIL_DELAYS[3]) {
      emailNum = 3
    } else if (!lead.email_4_sent_at && lead.email_3_sent_at && now >= email1At + EMAIL_DELAYS[4]) {
      emailNum = 4
    } else if (!lead.email_5_sent_at && lead.email_4_sent_at && now >= email1At + EMAIL_DELAYS[5]) {
      emailNum = 5
    }

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
