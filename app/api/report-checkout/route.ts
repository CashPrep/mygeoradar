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

function safeHostname(url: string): string {
  try { return new URL(url).hostname } catch { return url.slice(0, 50) }
}

export async function POST(req: NextRequest) {
  try {
    const { scanId } = await req.json()
    if (!scanId) return NextResponse.json({ error: 'scanId required' }, { status: 400 })

    const supabase = getSupabase()
    const { data: scan, error } = await supabase
      .from('scans')
      .select('id, url, score, checks')
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

    const stripe  = getStripe()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://mygeoradar.com'
    const hostname = safeHostname(scan.url)

    const checks = (scan.checks ?? []) as Array<{ status: string }>
    const issueCount = checks.filter(c => c.status === 'fail' || c.status === 'warn').length
    const issueLabel = issueCount > 0
      ? `${issueCount} issue${issueCount > 1 ? 's' : ''} found`
      : 'full breakdown'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: 1000,
            product_data: {
              name: `AI Visibility Fix Guides — ${issueLabel} for ${hostname}`,
              description: `Step-by-step fix guide for each of the ${issueLabel} on your site. Score: ${scan.score}/100.`,
              images: ['https://mygeoradar.com/og-image.png'],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        scanId: scan.id,
      },
      customer_creation: 'always',
      billing_address_collection: 'auto',
      success_url: `${baseUrl}/report/pending?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/report/preview/${scanId}`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[report-checkout] Stripe session creation failed:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    )
  }
}
