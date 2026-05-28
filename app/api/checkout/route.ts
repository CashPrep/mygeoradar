import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mygeoradar.com'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1Tbyn0DqLWpsdFlMnHQTzkO9',
          quantity: 1,
        },
      ],
      metadata: {
        product: 'found-by-ai-playbook',
      },
      customer_creation: 'always',
      billing_address_collection: 'auto',
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/playbook`,
      allow_promotion_codes: true,
    })

    return NextResponse.redirect(session.url!, { status: 303 })
  } catch (err) {
    console.error('[checkout] Stripe session creation failed:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    )
  }
}
