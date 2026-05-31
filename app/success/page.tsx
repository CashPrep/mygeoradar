import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Stripe from 'stripe'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CheckCircle, ArrowRight, Mail, Download } from 'lucide-react'
import { createSupabaseServer } from '@/lib/supabase-server'

export const metadata: Metadata = {
  title: 'Purchase Complete — Found by AI Playbook | MyGeoRadar',
  description: 'Your purchase is confirmed. Download the Found by AI Playbook.',
  robots: { index: false, follow: false },
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) redirect('/playbook')

  let customerEmail: string | null = null
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session.payment_status !== 'paid') redirect('/playbook')
    customerEmail = session.customer_details?.email ?? null
  } catch {
    redirect('/playbook')
  }

  // Check if this user is already signed in AND their purchase is already confirmed.
  // We do NOT block on this — the webhook may not have fired yet (race condition).
  // If the purchase isn't in the DB yet, we still show the success state and send
  // the user to sign in; the download will work once the webhook completes (typically
  // within a few seconds of Stripe firing it).
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  let purchaseConfirmed = false
  if (user) {
    const { data } = await supabase
      .from('playbook_purchases')
      .select('id')
      .eq('email', user.email!.toLowerCase())
      .limit(1)
    purchaseConfirmed = !!(data && data.length > 0)
  }

  const alreadySignedInWithPurchase = !!user && purchaseConfirmed

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-xl mx-auto text-center">

          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment confirmed!</h1>
          <p className="text-lg text-muted leading-relaxed mb-10">
            Your <strong className="text-foreground">Found by AI Playbook</strong> is ready.
          </p>

          {alreadySignedInWithPurchase ? (
            /* Already signed in and purchase confirmed — direct download */
            <div className="rounded-2xl border border-accent/40 bg-surface p-8 text-left">
              <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" /> You&apos;re all set
              </h2>
              <p className="text-sm text-muted mb-6">
                Your purchase is saved to your account. Download your files now and
                re-access them any time from your account page.
              </p>
              <Link
                href="/account"
                className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-4 rounded-xl text-base transition-colors"
              >
                <Download className="w-4 h-4" /> Go to My Downloads <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Default path: send to sign-in.
               Works for:
               (a) not signed in — needs magic link
               (b) signed in but webhook hasn’t written to DB yet — by the time
                   they check their email and click the magic link the purchase
                   will be confirmed. If already signed in, /account will show
                   downloads as soon as the webhook fires (usually <5 seconds). */
            <div className="rounded-2xl border border-accent/40 bg-surface p-8 text-left flex flex-col gap-5">
              <div>
                <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-accent" /> One step to unlock your downloads
                </h2>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  Sign in with{' '}
                  {customerEmail
                    ? <strong className="text-foreground">{customerEmail}</strong>
                    : <>the email you used at checkout</>}{' '}
                  to access your files. We&apos;ll send a magic link — no password needed.
                </p>
                <p className="text-xs text-muted mb-4">
                  A confirmation email with your download link is also on its way to you now.
                </p>
                <Link
                  href={`/login?next=/account&hint=${encodeURIComponent(customerEmail ?? '')}`}
                  className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-4 rounded-xl text-base transition-colors"
                >
                  <ArrowRight className="w-4 h-4" /> Sign in &amp; download now
                </Link>
              </div>

              <p className="text-xs text-muted text-center">
                Your purchase is saved permanently. Sign in any time at{' '}
                <Link href="/account" className="text-accent hover:underline">mygeoradar.com/account</Link>.
              </p>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}
