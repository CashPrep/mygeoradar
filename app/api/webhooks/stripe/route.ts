import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { runGeoScan } from '@/lib/geo'
import { runEnrichments } from '@/lib/enrichments'
import { sendScanReport, sendWelcomeEmail } from '@/lib/email'
import type { ScanReport } from '@/lib/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

function scheduleFollowUp(email: string, scanId: string, businessName: string, topAction?: string) {
  const now = new Date()

  const day3 = new Date(now)
  day3.setDate(day3.getDate() + 3)

  const day7 = new Date(now)
  day7.setDate(day7.getDate() + 7)

  return Promise.resolve(
    supabase.from('scheduled_emails').insert([
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
  )
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

    // Link scan to user via service-role client (bypasses RLS, can read auth.users)
    if (!scan.user_id) {
      const customerEmail = scan.email || session.customer_details?.email
      if (customerEmail) {
        try {
          const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()
          const matched = users.find(u => u.email === customerEmail)
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
        await sendWelcomeEmail({
          email,
          businessName: scan.business_name,
          scanId,
          score: result.overallScore,
        }).catch(console.error)

        const topAction = result.topActions?.[0]?.description
        await scheduleFollowUp(email, scanId, scan.business_name, topAction).catch(console.error)
      }
    }).catch(console.error)
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
