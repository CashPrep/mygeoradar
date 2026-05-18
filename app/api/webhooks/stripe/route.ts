import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const scanId  = session.metadata?.scanId
    if (!scanId) return NextResponse.json({ ok: true })

    const { data: scan } = await supabase
      .from('scan_reports')
      .select('id, paid, overall_score, scan_error, processing_started_at, email, user_id')
      .eq('id', scanId)
      .single()

    if (!scan) return NextResponse.json({ ok: true })

    if (scan.processing_started_at || scan.overall_score != null || scan.scan_error) {
      console.log(`Webhook retry skipped for scan ${scanId} — already processed or in progress`)
      return NextResponse.json({ ok: true })
    }

    await supabase
      .from('scan_reports')
      .update({ paid: true, processing_started_at: new Date().toISOString() })
      .eq('id', scanId)

    // Resolve user if not already linked
    if (!scan.user_id) {
      const customerEmail = scan.email || session.customer_details?.email
      if (customerEmail) {
        try {
          const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()
          const matched = users.find((u) => u.email === customerEmail)
          if (matched) {
            await supabase.from('scan_reports').update({ user_id: matched.id }).eq('id', scanId)
          }
        } catch (err) {
          console.error('User lookup error:', err)
        }
      }
    }

    const customerEmail = scan.email || session.customer_details?.email || null
    const appUrl        = process.env.NEXT_PUBLIC_APP_URL || 'https://mygeoradar.com'

    // Fire-and-forget: call the long-running /api/scan/process route
    // This returns immediately so the webhook responds in <3s
    fetch(`${appUrl}/api/scan/process`, {
      method:  'POST',
      headers: {
        'Content-Type':       'application/json',
        'x-internal-secret':  process.env.INTERNAL_API_SECRET ?? '',
      },
      body: JSON.stringify({ scanId, customerEmail }),
    }).catch((err) => console.error('Failed to trigger scan/process:', err))
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice    = event.data.object as Stripe.Invoice
    const customerId = invoice.customer as string
    if (!customerId) return NextResponse.json({ ok: true })
    try {
      await supabase.from('subscriptions').upsert(
        { stripe_customer_id: customerId, status: 'active', updated_at: new Date().toISOString() },
        { onConflict: 'stripe_customer_id' }
      )
    } catch (dbErr) {
      console.error('Subscription upsert error:', dbErr)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub        = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    try {
      await supabase.from('subscriptions')
        .update({ status: 'canceled', updated_at: new Date().toISOString() })
        .eq('stripe_customer_id', customerId)
    } catch (dbErr) {
      console.error('Subscription cancel error:', dbErr)
    }
  }

  return NextResponse.json({ ok: true })
}
