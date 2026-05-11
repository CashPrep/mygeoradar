import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { nanoid } from 'nanoid'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function POST(req: NextRequest) {
  try {
    const { businessName, website, topics, location, industry } = await req.json()

    if (!businessName || !website || !topics?.length) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const scanId = nanoid(10)

    // Save scan stub to Supabase before payment
    const { error: dbError } = await supabase.from('scan_reports').insert([{
      id:            scanId,
      business_name: businessName,
      website,
      topics,
      location:      location || null,
      industry:      industry || null,
      paid:          false,
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
          currency:   'usd',
          unit_amount: 100,
          product:    'prod_UUkMvY3Fjwy4pM',
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${appUrl}/scan/${scanId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${appUrl}/scan`,
      metadata: { scanId, businessName, website },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
