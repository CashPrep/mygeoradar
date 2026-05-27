import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { sendPlaybookPurchaseEmail } from '@/lib/email'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

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

    // ── Handler A: Found by AI Playbook ──────────────────────────────────────
    if (session.metadata?.product === 'found-by-ai-playbook') {
      const customerEmail = session.customer_details?.email
      const customerId    = session.customer as string | null
      const sessionId     = session.id

      if (!customerEmail) {
        console.error('[playbook webhook] No customer email in session:', sessionId)
        return NextResponse.json({ ok: true })
      }

      try {
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
        console.error('[playbook webhook] DB upsert failed:', dbErr)
      }

      // Fire-and-forget confirmation email with download link
      sendPlaybookPurchaseEmail(customerEmail).catch(err =>
        console.error('[playbook webhook] Resend email failed:', err)
      )

      return NextResponse.json({ ok: true })
    }

    // ── Handler B: AI Readiness Report Unlock ────────────────────────────────
    if (session.metadata?.scanId && session.payment_status === 'paid') {
      const scanId        = session.metadata.scanId
      const sessionId     = session.id
      const customerEmail = session.customer_details?.email ?? null
      const supabase      = getSupabase()

      const { data: existing } = await supabase
        .from('report_purchases')
        .select('id, token')
        .eq('stripe_session_id', sessionId)
        .maybeSingle()

      if (!existing) {
        const token = randomUUID()

        const { error } = await supabase
          .from('report_purchases')
          .insert({
            scan_id:           scanId,
            stripe_session_id: sessionId,
            email:             customerEmail,
            token,
            paid_at:           new Date().toISOString(),
          })

        if (error) {
          console.error('[report webhook] DB insert failed:', error)
          return NextResponse.json({ error: 'DB insert failed' }, { status: 500 })
        }
      }

      return NextResponse.json({ ok: true })
    }
  }

  return NextResponse.json({ ok: true })
}
