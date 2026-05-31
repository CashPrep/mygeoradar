import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase-server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { DownloadButton } from '@/components/account/DownloadButton'

export const metadata = {
  title: 'My Purchases | MyGeoRadar',
  description: 'Access your purchased downloads from MyGeoRadar.',
  robots: { index: false, follow: false },
}

export default async function AccountPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: purchases } = await supabase
    .from('playbook_purchases')
    .select('id, purchased_at, product, stripe_session_id')
    .eq('email', user.email!.toLowerCase())
    .order('purchased_at', { ascending: false })

  const hasPurchase = purchases && purchases.length > 0

  const files = [
    { label: 'The Complete AI Visibility Playbook', file: 'found-by-ai-playbook.html' },
    { label: 'The 27-Point AI Visibility Checklist',  file: 'ai-visibility-checklist.html' },
    { label: 'Prompt Pack - 10 Copy-Paste Prompts',   file: 'prompt-pack.html' },
    { label: '30-Day Action Plan Calendar',           file: '30-day-action-plan.html' },
  ]

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
                  {files.map(({ label, file }) => (
                    <DownloadButton key={file} file={file} label={label} />
                  ))}
                </div>
                <p className="text-xs text-muted mt-4">
                  Having trouble downloading? Email{' '}
                  <a href="mailto:hello@mygeoradar.com" className="underline">hello@mygeoradar.com</a>.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="font-semibold mb-2">No purchases yet</h2>
              <p className="text-muted text-sm mb-4">
                Pick up the Found by AI Playbook and get your business recognized by AI assistants today.
              </p>
              <Link
                href="/playbook"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90 transition-colors"
              >
                Get the Playbook - $27 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
