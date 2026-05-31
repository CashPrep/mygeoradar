import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CheckCircle } from 'lucide-react'
import { createSupabaseServer } from '@/lib/supabase-server'
import { SuccessClient } from '@/components/success/SuccessClient'

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

  // Server-side: check if the user is already signed in AND purchase confirmed.
  // If not confirmed yet, SuccessClient will poll /api/purchase-status every
  // 3 seconds (up to 15 s) and auto-redirect to /account once the webhook fires.
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

          <SuccessClient
            initialConfirmed={purchaseConfirmed}
            customerEmail={customerEmail}
            isSignedIn={!!user}
          />

        </div>
      </section>

      <Footer />
    </main>
  )
}
