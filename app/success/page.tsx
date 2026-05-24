import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Stripe from 'stripe'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CheckCircle, Lock, ArrowRight, Mail } from 'lucide-react'
import { createSupabaseServer } from '@/lib/supabase-server'

export const metadata: Metadata = {
  title: 'Purchase Complete — Found by AI Playbook | MyGeoRadar',
  description: 'Your purchase is confirmed. Sign in to download the Found by AI Playbook.',
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

  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  let hasPurchase = false
  if (user) {
    const { data } = await supabase
      .from('playbook_purchases')
      .select('id')
      .eq('email', user.email!.toLowerCase())
      .limit(1)
    hasPurchase = !!(data && data.length > 0)
  }

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

          {user && hasPurchase ? (
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
                Go to My Downloads <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-accent/40 bg-surface p-8 text-left">
              <div className="flex items-start gap-3 mb-6">
                <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-semibold mb-1">One step to unlock your downloads</h2>
                  <p className="text-sm text-muted leading-relaxed">
                    Sign in with{' '}
                    {customerEmail ? (
                      <strong className="text-foreground">{customerEmail}</strong>
                    ) : (
                      <>the email you used at checkout</>
                    )}{' '}
                    to access your files. We&apos;ll send you a magic link — no password needed.
                  </p>
                </div>
              </div>

              <Link
                href={`/login?next=/account&hint=${encodeURIComponent(customerEmail ?? '')}`}
                className="inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-4 rounded-xl text-base transition-colors mb-4"
              >
                <Mail className="w-4 h-4" /> Sign in to get your downloads
              </Link>

              <p className="text-xs text-muted text-center">
                Your purchase is saved. You can sign in any time at{' '}
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
