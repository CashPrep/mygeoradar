import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { createSupabaseServer } from '@/lib/supabase-server'
import { nanoid } from 'nanoid'
import { SCAN_PRICE_CENTS, PROMO_PRICE_CENTS, PROMO_LABEL } from '@/lib/constants'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  try {
    const {
      businessName, website, topics, location,
      industry, email, competitorUrl, usePromo,
    } = await req.json()

    if (!businessName || !website || !topics?.length) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Get logged-in user if present
    const serverSupabase = await createSupabaseServer()
    const { data: { user } } = await serverSupabase.auth.getUser()

    const ip     = getClientIp(req)
    const scanId = nanoid(10)

    let promoAllowed = false
    if (usePromo && ip !== 'unknown') {
      const { data: prior } = await supabase
        .from('scan_reports')
        .select('id')
        .eq('ip_address', ip)
        .eq('paid', true)
        .limit(1)
      promoAllowed = !prior || prior.length === 0
    }

    const chargeAmount = promoAllowed ? PROMO_PRICE_CENTS : SCAN_PRICE_CENTS
    const priceLabel   = promoAllowed
      ? `AI Visibility Scan — ${PROMO_LABEL}`
      : 'AI Visibility Scan'

    const { error: dbError } = await supabase.from('scan_reports').insert([{
      id:             scanId,
      business_name:  businessName,
      website,
      topics,
      location:       location      || null,
      industry:       industry      || null,
      email:          email         || null,
      competitor_url: competitorUrl || null,
      ip_address:     ip,
      paid:           false,
      user_id:        user?.id      || null,
    }])

    if (dbError) {
      console.error('DB insert error:', dbError)
      return NextResponse.json({ error: 'Failed to create scan.' }, { status: 500 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency:     'usd',
          unit_amount:  chargeAmount,
          product_data: {
            name:        priceLabel,
            description: 'One-time GEO scan across ChatGPT, Perplexity, Gemini & Claude',
          },
        },
        quantity: 1,
      }],
      mode: 'payment',
      customer_email: user?.email || email || undefined,
      success_url: `${appUrl}/scan/${scanId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${appUrl}/scan`,
      metadata: { scanId, businessName, website, promoUsed: promoAllowed ? 'true' : 'false' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
