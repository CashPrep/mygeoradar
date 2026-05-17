import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { runGeoScan } from '@/lib/geo'
import { runEnrichments } from '@/lib/enrichments'
import { sendScanReport, sendWelcomeEmail, sendScanErrorEmail } from '@/lib/email'
import type { ScanReport } from '@/lib/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

async function scheduleFollowUp(email: string, scanId: string, businessName: string, topAction?: string) {
  const now  = new Date()
  const day3 = new Date(now)
  day3.setDate(day3.getDate() + 3)
  const day7 = new Date(now)
  day7.setDate(day7.getDate() + 7)

  await supabase.from('scheduled_emails').insert([
    {
      email,
      type:          'day3_tip',
      scan_id:       scanId,
      business_name: businessName,
      top_action:    topAction || null,
      send_at:       day3.toISOString(),
      sent:          false,
    },
    {
      email,
      type:          'day7_review',
      scan_id:       scanId,
      business_name: businessName,
      top_action:    null,
      send_at:       day7.toISOString(),
      sent:          false,
    },
  ])
}

async function processScan(scan: Record<string, unknown>, customerEmail: string | null) {
  const scanId = scan.id as string

  try {
    const result = await runGeoScan({
      id:            scanId,
      business_name: scan.business_name as string,
      website:       scan.website       as string,
      topics:        scan.topics        as string[],
      location:      (scan.location     as string | null) ?? null,
      industry:      (scan.industry     as string | null) ?? null,
    })

    await supabase.from('scan_reports').update({
      overall_score: result.overallScore,
      level:         result.level,
      engines:       result.engines,
      top_actions:   result.topActions,
      quick_wins:    result.quickWins,
      scan_error:    null,
    }).eq('id', scanId)

    const enrichments = await runEnrichments({
      id:            scanId,
      business_name: scan.business_name as string,
      website:       scan.website       as string,
      topics:        scan.topics        as string[],
      location:      (scan.location     as string | null) ?? null,
      industry:      (scan.industry     as string | null) ?? null,
      overall_score: result.overallScore,
    } as unknown as Parameters<typeof runEnrichments>[0])

    await supabase.from('scan_reports').update({
      schema_check:   enrichments.schemaCheck,
      content_gaps:   enrichments.contentGaps,
      gbp_signal:     enrichments.gbpSignal,
      competitor_gap: enrichments.competitorGap,
    }).eq('id', scanId)

    if (customerEmail) {
      const fullReport: ScanReport = {
        id:            scanId,
        createdAt:     scan.created_at    as string,
        businessName:  scan.business_name as string,
        website:       scan.website       as string,
        topics:        scan.topics        as string[],
        location:      (scan.location     as string) ?? null,
        industry:      (scan.industry     as string) ?? null,
        competitorUrl: (scan.competitor_url as string) ?? null,
        paid:          true,
        schemaCheck:   enrichments.schemaCheck,
        contentGaps:   enrichments.contentGaps,
        gbpSignal:     enrichments.gbpSignal,
        competitorGap: enrichments.competitorGap,
        ...result,
      }

      await sendScanReport(customerEmail, fullReport).catch(console.error)
      await sendWelcomeEmail({
        email:        customerEmail,
        businessName: scan.business_name as string,
        scanId,
        score:        result.overallScore,
      }).catch(console.error)

      const topAction = result.topActions?.[0]?.description
      try {
        await scheduleFollowUp(customerEmail, scanId, scan.business_name as string, topAction)
      } catch (scheduleErr) {
        console.error('scheduleFollowUp failed:', scheduleErr)
      }
    }
  } catch (err) {
    console.error('processScan failed for', scanId, err)

    await supabase.from('scan_reports').update({
      scan_error: err instanceof Error ? err.message : 'Unknown error',
    }).eq('id', scanId)

    if (customerEmail) {
      await sendScanErrorEmail({
        email:        customerEmail,
        businessName: scan.business_name as string,
        scanId,
      }).catch(console.error)
    }

    const adminEmail = process.env.ADMIN_ALERT_EMAIL
    if (adminEmail) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from:    'MyGeoRadar Alerts <reports@mygeoradar.com>',
        to:      adminEmail,
        subject: `[ALERT] Scan failed: ${scan.business_name} (${scanId})`,
        text:    `Scan ${scanId} for ${scan.business_name} failed.\n\nError: ${err instanceof Error ? err.message : String(err)}\n\nCustomer email: ${customerEmail ?? 'unknown'}`,
      }).catch(console.error)
    }
  }
}

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const scanId  = session.metadata?.scanId
    if (!scanId) return NextResponse.json({ ok: true })

    const { data: scan } = await supabase
      .from('scan_reports')
      .select('*')
      .eq('id', scanId)
      .single()

    if (!scan) return NextResponse.json({ ok: true })

    if (scan.processing_started_at || scan.overall_score != null || scan.scan_error) {
      console.log(`Webhook retry skipped for scan ${scanId} — already processed or in progress`)
      return NextResponse.json({ ok: true })
    }

    await supabase
      .from('scan_reports')
      .update({ paid: true, processing_started_at: new Date().toISOString() })
      .eq('id', scanId)

    if (!scan.user_id) {
      const customerEmail = scan.email || session.customer_details?.email
      if (customerEmail) {
        try {
          const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()
          const matched = users.find((u) => u.email === customerEmail)
          if (matched) {
            await supabase
              .from('scan_reports')
              .update({ user_id: matched.id })
              .eq('id', scanId)
          }
        } catch (err) {
          console.error('User lookup error:', err)
        }
      }
    }

    const customerEmail = scan.email || session.customer_details?.email || null

    const ctx = (req as unknown as { waitUntil?: (p: Promise<unknown>) => void }).waitUntil
    if (typeof ctx === 'function') {
      ctx(processScan(scan, customerEmail))
    } else {
      processScan(scan, customerEmail).catch(console.error)
    }
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice    = event.data.object as Stripe.Invoice
    const customerId = invoice.customer as string
    if (!customerId) return NextResponse.json({ ok: true })
    try {
      await supabase
        .from('subscriptions')
        .upsert(
          { stripe_customer_id: customerId, status: 'active', updated_at: new Date().toISOString() },
          { onConflict: 'stripe_customer_id' }
        )
    } catch (dbErr) {
      console.error('Subscription upsert error:', dbErr)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub        = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    try {
      await supabase
        .from('subscriptions')
        .update({ status: 'canceled', updated_at: new Date().toISOString() })
        .eq('stripe_customer_id', customerId)
    } catch (dbErr) {
      console.error('Subscription cancel error:', dbErr)
    }
  }

  return NextResponse.json({ ok: true })
}
