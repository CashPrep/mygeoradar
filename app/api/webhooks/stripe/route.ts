import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { runGeoScan } from '@/lib/geo'

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

    // Fetch scan stub
    const { data: scan } = await supabase
      .from('scan_reports')
      .select('*')
      .eq('id', scanId)
      .single()

    if (!scan) return NextResponse.json({ ok: true })

    // Mark as paid immediately so results page knows payment succeeded
    await supabase.from('scan_reports').update({ paid: true }).eq('id', scanId)

    // Run the actual GEO scan (async — webhook responds fast, scan runs in background)
    runGeoScan(scan).then(async (result) => {
      await supabase.from('scan_reports').update({
        overall_score: result.overallScore,
        level:         result.level,
        engines:       result.engines,
        top_actions:   result.topActions,
        quick_wins:    result.quickWins,
      }).eq('id', scanId)
    }).catch(console.error)
  }

  return NextResponse.json({ ok: true })
}
