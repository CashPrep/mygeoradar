import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase-server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { Download, ArrowRight, ShoppingBag } from 'lucide-react'

export const metadata = {
  title: 'My Purchases | MyGeoRadar',
  description: 'Access your purchased downloads from MyGeoRadar.',
  robots: { index: false, follow: false },
}

export default async function AccountPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Check if this user has a playbook purchase
  const { data: purchases } = await supabase
    .from('playbook_purchases')
    .select('id, purchased_at, product, stripe_session_id')
    .eq('email', user.email!.toLowerCase())
    .order('purchased_at', { ascending: false })

  const hasPurchase = purchases && purchases.length > 0

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">My Purchases</h1>
          <p className="text-muted mb-10">Signed in as <span className="text-foreground">{user.email}</span></p>

          {hasPurchase ? (
            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-accent/30 bg-surface p-6">
                <div className="flex items-center gap-3 mb-5">
                  <ShoppingBag className="w-5 h-5 text-accent" />
                  <h2 className="font-semibold">Found by AI — The AI Visibility Playbook</h2>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'The Complete AI Visibility Playbook', file: 'found-by-ai-playbook.html' },
                    { label: 'The 27-Point AI Visibility Checklist', file: 'ai-visibility-checklist.html' },
                    { label: 'Prompt Pack — 10 Copy-Paste Prompts',  file: 'prompt-pack.html' },
                    { label: '30-Day Action Plan Calendar',           file: '30-day-action-plan.html' },
                  ].map(({ label, file }) => (
                    <a
                      key={file}
                      href={`/downloads/${file}`}
                      download
                      className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors group"
                    >
                      <span className="text-sm font-medium">{label}</span>
                      <Download className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted">
                Having trouble downloading? Email{' '}
                <a href="mailto:hello@mygeoradar.com" className="text-accent hover:underline">hello@mygeoradar.com</a>.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface p-8 text-center">
              <ShoppingBag className="w-10 h-10 text-muted mx-auto mb-4" />
              <h2 className="font-semibold mb-2">No purchases yet</h2>
              <p className="text-sm text-muted mb-6">
                Pick up the Found by AI Playbook and get your business recognized by AI assistants today.
              </p>
              <Link
                href="/playbook"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Get the Playbook — $27 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
