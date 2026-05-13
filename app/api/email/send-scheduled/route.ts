import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendDay3TipEmail, sendDay7ReviewRequestEmail } from '@/lib/email'

// This route is called by Vercel Cron (or any cron) once per day.
// Add to vercel.json: { "crons": [{ "path": "/api/email/send-scheduled", "schedule": "0 10 * * *" }] }
// Secure it with a shared CRON_SECRET env var.

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret') || req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date().toISOString()

  const { data: pending, error } = await supabase
    .from('scheduled_emails')
    .select('*')
    .eq('sent', false)
    .lte('send_at', now)
    .limit(50)

  if (error) {
    console.error('scheduled_emails fetch error:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  let sent = 0
  let failed = 0

  for (const row of pending ?? []) {
    try {
      if (row.type === 'day3_tip') {
        await sendDay3TipEmail({
          email:        row.email,
          businessName: row.business_name,
          scanId:       row.scan_id,
          topAction:    row.top_action ?? undefined,
        })
      } else if (row.type === 'day7_review') {
        await sendDay7ReviewRequestEmail({
          email:        row.email,
          businessName: row.business_name,
          scanId:       row.scan_id,
        })
      }

      await supabase
        .from('scheduled_emails')
        .update({ sent: true, sent_at: new Date().toISOString() })
        .eq('id', row.id)

      sent++
    } catch (err) {
      console.error(`Failed to send scheduled email ${row.id}:`, err)
      failed++
    }
  }

  return NextResponse.json({ sent, failed, total: (pending ?? []).length })
}
