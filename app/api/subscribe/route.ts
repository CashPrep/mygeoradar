import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function POST(req: NextRequest) {
  try {
    const { email, website, scanId } = await req.json()

    if (!email || !website) {
      return NextResponse.json({ error: 'Email and website are required.' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Get or create Stripe price for $5/month tracking
    // We use a lookup_key so we only create once and reuse across calls
    const prices = await stripe.prices.list({ lookup_keys: ['monthly_tracking'], expand: ['data.product'] })
    let priceId = prices.data[0]?.id

    if (!priceId) {
      const product = await stripe.products.create({
        name: 'Monthly AI Visibility Tracking',
        description: 'Automatic monthly scan + email report for your business\'s AI visibility score.',
      })
      const price = await stripe.prices.create({
        product:     product.id,
        unit_amount: 500,
        currency:    'usd',
        recurring:   { interval: 'month' },
        lookup_key:  'monthly_tracking',
      })
      priceId = price.id
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/scan/${scanId}?subscribed=1`,
      cancel_url:  `${appUrl}/scan/${scanId}`,
      metadata: { scanId, website, email },
    })

    // Pre-insert a pending subscription row so we can track it
    await supabase.from('subscriptions').upsert({
      email,
      website,
      scan_id:           scanId || null,
      status:            'pending',
      stripe_session_id: session.id,
      created_at:        new Date().toISOString(),
      updated_at:        new Date().toISOString(),
    }, { onConflict: 'email' }).catch(console.error)

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Failed to create subscription session.' }, { status: 500 })
  }
}
