import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { runGeoScan } from '@/lib/geo'
import { runEnrichments } from '@/lib/enrichments'
import { sendScanReport } from '@/lib/email'
import type { ScanReport } from '@/lib/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

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

    // Mark paid immediately so report page stops polling
    await supabase.from('scan_reports').update({ paid: true }).eq('id', scanId)

    runGeoScan(scan).then(async (result) => {
      await supabase.from('scan_reports').update({
        overall_score: result.overallScore,
        level:         result.level,
        engines:       result.engines,
        top_actions:   result.topActions,
        quick_wins:    result.quickWins,
      }).eq('id', scanId)

      const enrichments = await runEnrichments({
        ...scan,
        overall_score:  result.overallScore,
        competitor_url: scan.competitor_url ?? null,
      })

      await supabase.from('scan_reports').update({
        schema_check:   enrichments.schemaCheck,
        content_gaps:   enrichments.contentGaps,
        gbp_signal:     enrichments.gbpSignal,
        competitor_gap: enrichments.competitorGap,
      }).eq('id', scanId)

      // Send email — prefer user-supplied email, fallback to Stripe customer email
      const email = scan.email || session.customer_details?.email
      if (email) {
        const fullReport: ScanReport = {
          id:            scanId,
          createdAt:     scan.created_at,
          businessName:  scan.business_name,
          website:       scan.website,
          topics:        scan.topics,
          location:      scan.location,
          industry:      scan.industry,
          competitorUrl: scan.competitor_url ?? null,
          paid:          true,
          schemaCheck:   enrichments.schemaCheck,
          contentGaps:   enrichments.contentGaps,
          gbpSignal:     enrichments.gbpSignal,
          competitorGap: enrichments.competitorGap,
          ...result,
        }
        await sendScanReport(email, fullReport).catch(console.error)
      }
    }).catch(console.error)
  }

  // Handle subscription payments (monthly tracking)
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
