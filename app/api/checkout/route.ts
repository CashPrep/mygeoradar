import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PLATFORMS } from '@/lib/platforms'
import type { PlatformId } from '@/lib/platforms'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

/** Validate that the incoming platform value is a known PlatformId or null. */
function parsePlatform(raw: unknown): PlatformId | null {
  if (typeof raw !== 'string') return null
  return raw in PLATFORMS ? (raw as PlatformId) : null
}

export async function POST(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mygeoradar.com'

  // Body may be empty (old callers) or JSON with { platform }
  let platform: PlatformId | null = null
  try {
    const contentType = req.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) {
      const body = await req.json()
      platform = parsePlatform(body?.platform)
    }
  } catch {
    // Malformed JSON — treat as no platform selected
    platform = null
  }

  try {
    const metadata: Record<string, string> = {
      product: 'found-by-ai-playbook',
    }

    // Only write platform to metadata when a valid, guide-eligible platform is selected
    if (platform && PLATFORMS[platform]?.hasGuide) {
      metadata.platform = platform
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1Tbyn0DqLWpsdFlMnHQTzkO9',
          quantity: 1,
        },
      ],
      metadata,
      customer_creation: 'always',
      billing_address_collection: 'auto',
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/playbook`,
      allow_promotion_codes: true,
    })

    // Keep both response shapes: redirect for browser nav, JSON { url } for fetch callers
    const acceptsJson = (req.headers.get('accept') ?? '').includes('application/json')
    if (acceptsJson) {
      return NextResponse.json({ url: session.url })
    }
    return NextResponse.redirect(session.url!, { status: 303 })
  } catch (err) {
    console.error('[checkout] Stripe session creation failed:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    )
  }
}
