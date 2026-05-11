import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { runGeoScan } from '@/lib/geo'
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

    // Mark paid immediately
    await supabase.from('scan_reports').update({ paid: true }).eq('id', scanId)

    // Run GEO scan then save + email
    runGeoScan(scan).then(async (result) => {
      await supabase.from('scan_reports').update({
        overall_score: result.overallScore,
        level:         result.level,
        engines:       result.engines,
        top_actions:   result.topActions,
        quick_wins:    result.quickWins,
      }).eq('id', scanId)

      // Send email if provided
      const email = scan.email || session.customer_details?.email
      if (email) {
        const fullReport: ScanReport = {
          id:           scanId,
          createdAt:    scan.created_at,
          businessName: scan.business_name,
          website:      scan.website,
          topics:       scan.topics,
          location:     scan.location,
          industry:     scan.industry,
          paid:         true,
          ...result,
        }
        await sendScanReport(email, fullReport).catch(console.error)
      }
    }).catch(console.error)
  }

  return NextResponse.json({ ok: true })
}
