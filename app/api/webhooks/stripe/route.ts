import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase-admin'
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

async function sendPurchaseConfirmationEmail(email: string) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.warn('[webhook] RESEND_API_KEY not set — skipping confirmation email')
    return
  }

  const loginUrl = `https://mygeoradar.com/login?next=/account&hint=${encodeURIComponent(email)}`

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'MyGeoRadar <hello@mygeoradar.com>',
      to: [email],
      subject: "You're in — your Found by AI Playbook is ready",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
          <h2 style="font-size:22px;font-weight:700;margin-bottom:8px">Payment confirmed ✓</h2>
          <p style="color:#555;margin-bottom:20px">
            Your <strong>Found by AI Playbook</strong> (+ checklist, prompt pack, and 30-day plan)
            is ready to download.
          </p>

          <a href="${loginUrl}"
             style="display:inline-block;background:#01696f;color:#fff;text-decoration:none;
                    font-weight:600;padding:14px 28px;border-radius:10px;font-size:15px">
            Sign in &amp; download your files →
          </a>

          <p style="color:#888;font-size:13px;margin-top:24px">
            Click the button above (or paste this link into your browser):<br/>
            <a href="${loginUrl}" style="color:#01696f">${loginUrl}</a>
          </p>

          <p style="color:#888;font-size:13px;margin-top:16px">
            Your files are saved permanently to your account.
            You can sign in any time at
            <a href="https://mygeoradar.com/account" style="color:#01696f">mygeoradar.com/account</a>.
          </p>

          <hr style="border:none;border-top:1px solid #e5e5e5;margin:28px 0"/>
          <p style="color:#aaa;font-size:12px">
            Questions? Reply to this email or write to
            <a href="mailto:hello@mygeoradar.com" style="color:#01696f">hello@mygeoradar.com</a>.
            30-day money-back guarantee — no questions asked.
          </p>
        </div>
      `,
    }),
  })
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
        const { data: existing } = await supabaseAdmin
          .from('playbook_purchases')
          .select('id')
          .eq('stripe_session_id', sessionId)
          .maybeSingle()

        if (!existing) {
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

          // Send confirmation email only on first write (idempotency guard)
          try {
            await sendPurchaseConfirmationEmail(customerEmail)
          } catch (emailErr) {
            console.error('[playbook webhook] Confirmation email failed:', emailErr)
            // Non-fatal — purchase is already recorded
          }
        }
      } catch (dbErr) {
        console.error('[playbook webhook] DB upsert failed:', dbErr)
      }

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
