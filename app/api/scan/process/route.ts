import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { runGeoScan } from '@/lib/geo'
import { runEnrichments } from '@/lib/enrichments'
import { sendScanReport, sendWelcomeEmail, sendScanErrorEmail } from '@/lib/email'
import type { ScanReport } from '@/lib/types'

// 300s on Vercel Pro, 60s on Hobby — set to 60 as safe default.
// If you are on Vercel Pro you can raise this to 300.
export const maxDuration = 60
export const dynamic = 'force-dynamic'

/** Safely parse topics — Supabase may return a JSON string instead of an array */
function parseTopics(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw as string[]
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) } catch { return [] }
  }
  return []
}

async function scheduleFollowUp(email: string, scanId: string, businessName: string, topAction?: string) {
  const now  = new Date()
  const day3 = new Date(now)
  day3.setDate(day3.getDate() + 3)
  const day7 = new Date(now)
  day7.setDate(day7.getDate() + 7)
  await supabase.from('scheduled_emails').insert([
    { email, type: 'day3_tip',    scan_id: scanId, business_name: businessName, top_action: topAction || null, send_at: day3.toISOString(), sent: false },
    { email, type: 'day7_review', scan_id: scanId, business_name: businessName, top_action: null,             send_at: day7.toISOString(), sent: false },
  ])
}

export async function POST(req: NextRequest) {
  // Verify internal secret so only our webhook can call this
  const secret = req.headers.get('x-internal-secret')
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { scanId, customerEmail } = await req.json()
  if (!scanId) return NextResponse.json({ error: 'Missing scanId' }, { status: 400 })

  const { data: scan } = await supabase
    .from('scan_reports')
    .select('*')
    .eq('id', scanId)
    .single()

  if (!scan) return NextResponse.json({ error: 'Scan not found' }, { status: 404 })

  const topics = parseTopics(scan.topics)
  if (!topics.length) {
    await supabase.from('scan_reports').update({ scan_error: 'No topics found — cannot run scan' }).eq('id', scanId)
    return NextResponse.json({ error: 'No topics' }, { status: 400 })
  }

  try {
    // Run geo scan and enrichments IN PARALLEL for maximum speed
    const [result, enrichments] = await Promise.all([
      runGeoScan({
        id:            scanId,
        business_name: scan.business_name,
        website:       scan.website,
        topics,
        location:      scan.location  ?? null,
        industry:      scan.industry  ?? null,
      }),
      runEnrichments({
        business_name: scan.business_name,
        website:       scan.website,
        topics,
        location:      scan.location  ?? null,
        industry:      scan.industry  ?? null,
        overall_score: 50, // placeholder — enrichments don't need the final score
      }),
    ])

    await supabase.from('scan_reports').update({
      overall_score:  result.overallScore,
      level:          result.level,
      engines:        result.engines,
      top_actions:    result.topActions,
      quick_wins:     result.quickWins,
      schema_check:   enrichments.schemaCheck,
      content_gaps:   enrichments.contentGaps,
      gbp_signal:     enrichments.gbpSignal,
      competitor_gap: enrichments.competitorGap,
      scan_error:     null,
    }).eq('id', scanId)

    if (customerEmail) {
      const fullReport: ScanReport = {
        id:            scanId,
        createdAt:     scan.created_at,
        businessName:  scan.business_name,
        website:       scan.website,
        topics,
        location:      scan.location      ?? null,
        industry:      scan.industry      ?? null,
        competitorUrl: scan.competitor_url ?? null,
        paid:          true,
        schemaCheck:   enrichments.schemaCheck,
        contentGaps:   enrichments.contentGaps,
        gbpSignal:     enrichments.gbpSignal,
        competitorGap: enrichments.competitorGap,
        ...result,
      }

      await Promise.allSettled([
        sendScanReport(customerEmail, fullReport),
        sendWelcomeEmail({ email: customerEmail, businessName: scan.business_name, scanId, score: result.overallScore }),
        scheduleFollowUp(customerEmail, scanId, scan.business_name, result.topActions?.[0]?.description),
      ])
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('processScan failed for', scanId, err)

    await supabase.from('scan_reports').update({ scan_error: msg }).eq('id', scanId)

    if (customerEmail) {
      await sendScanErrorEmail({ email: customerEmail, businessName: scan.business_name, scanId }).catch(console.error)
    }

    const adminEmail = process.env.ADMIN_ALERT_EMAIL
    if (adminEmail) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from:    'MyGeoRadar Alerts <reports@mygeoradar.com>',
          to:      adminEmail,
          subject: `[ALERT] Scan failed: ${scan.business_name} (${scanId})`,
          text:    `Scan ${scanId} failed.\n\nError: ${msg}\n\nCustomer: ${customerEmail ?? 'unknown'}`,
        })
      } catch { /* silent */ }
    }

    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
