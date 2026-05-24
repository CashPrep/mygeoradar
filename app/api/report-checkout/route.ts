import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' })
}

export async function POST(req: NextRequest) {
  try {
    const { scanId } = await req.json()
    if (!scanId) return NextResponse.json({ error: 'scanId required' }, { status: 400 })

    const supabase = getSupabase()
    const { data: scan, error } = await supabase
      .from('scans')
      .select('id, url, score')
      .eq('id', scanId)
      .single()

    if (error || !scan) {
      return NextResponse.json({ error: 'Scan not found' }, { status: 404 })
    }

    const { data: existing } = await supabase
      .from('report_purchases')
      .select('token, paid_at')
      .eq('scan_id', scanId)
      .not('paid_at', 'is', null)
      .maybeSingle()

    if (existing?.token) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mygeoradar.com'
      return NextResponse.json({ url: `${baseUrl}/report/${existing.token}` })
    }

    const stripe = getStripe()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mygeoradar.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 999,
            product_data: {
              name: 'AI Readiness Full Report',
              description: `Full breakdown + fix guides for ${scan.url} (AI Readiness Score: ${scan.score}/100)`,
              images: ['https://mygeoradar.com/og-image.png'],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        scanId: scan.id,
        scanUrl: scan.url.slice(0, 200),
      },
      success_url: `${baseUrl}/report/pending?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/#scan`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
