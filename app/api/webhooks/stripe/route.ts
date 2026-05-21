import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase-admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  // ─── Found by AI Playbook purchase ──────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.metadata?.product === 'found-by-ai-playbook') {
      const customerEmail = session.customer_details?.email
      const customerId    = session.customer as string | null
      const sessionId     = session.id

      if (!customerEmail) {
        console.error('[playbook webhook] No customer email in session:', sessionId)
        return NextResponse.json({ ok: true })
      }

      try {
        // Record purchase in Supabase for account access
        await supabaseAdmin
          .from('playbook_purchases')
          .upsert(
            {
              stripe_session_id:  sessionId,
              stripe_customer_id: customerId,
              email:              customerEmail.toLowerCase(),
              product:            'found-by-ai-playbook',
              purchased_at:       new Date().toISOString(),
            },
            { onConflict: 'stripe_session_id' }
          )
      } catch (dbErr) {
        // Log but do not fail — Stripe has already confirmed payment
        console.error('[playbook webhook] DB upsert failed:', dbErr)
      }

      return NextResponse.json({ ok: true })
    }
  }

  return NextResponse.json({ ok: true })
}
