import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Purchase Complete — Found by AI Playbook | MyGeoRadar',
  description: 'Your purchase is confirmed. Download the Found by AI Playbook and get started.',
  robots: { index: false, follow: false },
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">

          {/* Success icon */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">You&apos;re in. Welcome.</h1>
          <p className="text-lg text-muted leading-relaxed mb-10">
            Your purchase is confirmed. The <strong className="text-foreground">Found by AI Playbook</strong> is ready for you right now.
          </p>

          {/* Download CTA */}
          <div className="rounded-2xl border border-accent/40 bg-surface p-8 mb-8 text-left">
            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <Download className="w-5 h-5 text-accent" /> Get your downloads
            </h2>
            <div className="flex flex-col gap-4">
              <a
                href="/downloads/found-by-ai-playbook.pdf"
                download
                className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm">The Complete AI Visibility Playbook</p>
                  <p className="text-xs text-muted mt-0.5">PDF &middot; Full guide with all sections</p>
                </div>
                <Download className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="/downloads/ai-visibility-checklist.pdf"
                download
                className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm">The 27-Point AI Visibility Checklist</p>
                  <p className="text-xs text-muted mt-0.5">PDF &middot; Print or fill digitally</p>
                </div>
                <Download className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="/downloads/prompt-pack.pdf"
                download
                className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm">Prompt Pack — 10 Copy-Paste Prompts</p>
                  <p className="text-xs text-muted mt-0.5">PDF &middot; Use with any AI assistant</p>
                </div>
                <Download className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="/downloads/30-day-action-plan.pdf"
                download
                className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors group"
              >
                <div>
                  <p className="font-medium text-sm">30-Day Action Plan Calendar</p>
                  <p className="text-xs text-muted mt-0.5">PDF &middot; Day-by-day implementation calendar</p>
                </div>
                <Download className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Email note */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border text-left mb-10">
            <Mail className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted leading-relaxed">
              A receipt and download links have also been sent to your email. Check your inbox (and spam folder just in case).
              If you have any issues, email us at{' '}
              <a href="mailto:hello@mygeoradar.com" className="text-accent hover:underline">hello@mygeoradar.com</a>.
            </p>
          </div>

          {/* Next step prompt */}
          <div className="text-center">
            <p className="text-sm text-muted mb-4">Not sure where to start?</p>
            <p className="font-medium mb-2">Start with the Prompt Pack.</p>
            <p className="text-sm text-muted mb-6">
              Open the Prompt Pack PDF, paste the first prompt into ChatGPT, and see exactly how AI currently describes your business.
              That&apos;s your baseline — everything in the playbook improves from there.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              Read free AI visibility tips on the blog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
