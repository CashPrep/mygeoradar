import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function POST(req: NextRequest) {
  try {
    const { businessName, website } = await req.json()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const successParams = new URLSearchParams({
      name: businessName || '',
      url:  website      || '',
      session_id: '{CHECKOUT_SESSION_ID}',
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency:    'usd',
          unit_amount: 499,
          product_data: {
            name:        'AI Invisibility Fix Guide',
            description: '10-step action plan to get your business seen by ChatGPT, Perplexity, Gemini & Claude',
          },
        },
        quantity: 1,
      }],
      mode:           'payment',
      success_url:    `${appUrl}/invisible/success?${successParams.toString()}`,
      cancel_url:     `${appUrl}/invisible?name=${encodeURIComponent(businessName || '')}&url=${encodeURIComponent(website || '')}`,
      metadata:       { businessName: businessName || '', website: website || '', product: 'invisible-guide' },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[invisible-guide checkout]', err)
    return NextResponse.json({ error: 'Failed to create checkout.' }, { status: 500 })
  }
}
