'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Lock, Zap, AlertTriangle, CheckCircle2, ArrowRight, Loader2, Eye, EyeOff, Radio } from 'lucide-react'

const FREE_STEPS = [
  {
    number: 1,
    title: 'Claim & complete your Google Business Profile',
    body: 'AI engines like ChatGPT and Perplexity pull heavily from Google\'s knowledge graph. A fully filled GBP — with categories, description, photos, and hours — is the single fastest signal you can send. Go to business.google.com, claim your listing, and fill every field. Businesses with complete GBPs are 2.7× more likely to be cited by AI assistants.',
  },
  {
    number: 2,
    title: 'Add structured data (schema markup) to your website',
    body: 'Schema markup is invisible HTML code that tells AI crawlers exactly what your business does, where it is, and who it serves. Add LocalBusiness, Organization, and Service schemas to your homepage and key pages. You can generate the JSON-LD for free at schema.org or use Google\'s Structured Data Markup Helper. Without this, AI engines are guessing — with it, they know.',
  },
  {
    number: 3,
    title: 'Get mentioned on at least 3 authoritative third-party sites',
    body: 'AI models learn about businesses from the web, not from your own site. You need external mentions: a Yelp listing, a local Chamber of Commerce directory, an industry association page, a press mention, or a guest article. Each mention with your business name + website + location is a trust signal. Start with Yelp, Bing Places, Apple Maps, and one industry-specific directory.',
  },
]

const LOCKED_STEPS = [
  { number: 4,  title: 'Write an "About" page that AI can actually quote' },
  { number: 5,  title: 'Build a Wikipedia-style facts page for your business' },
  { number: 6,  title: 'Get cited in local news (even one article changes everything)' },
  { number: 7,  title: 'Optimize for question-based queries AI engines answer' },
  { number: 8,  title: 'Set up and verify your Bing Webmaster Tools profile' },
  { number: 9,  title: 'Create a branded knowledge panel with Wikidata' },
  { number: 10, title: 'The 30-day momentum plan: timeline + weekly checklist' },
]

function InvisibleGuideInner() {
  const params       = useSearchParams()
  const businessName = params.get('name') || 'Your Business'
  const website      = params.get('url')  || ''
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function handleCheckout() {
    setLoading(true)
    setError('')
    try {
      const res  = await fetch('/api/invisible-guide', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ businessName, website }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) { setError(data.error || 'Something went wrong.'); return }
      window.location.href = data.url
    } catch {
      setError('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-bg text-foreground">
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-6">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger/10 border border-danger/30 text-danger text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3 h-3" /> AI Invisible
            </span>
          </div>

          <h1 className="text-3xl font-bold text-foreground leading-tight">
            <span className="text-danger">{businessName}</span> is completely invisible to AI assistants
          </h1>

          <p className="text-foreground-dim text-base leading-relaxed">
            ChatGPT, Perplexity, Gemini, and Claude have zero knowledge of your business.
            That means when anyone asks an AI for a recommendation in your category,
            your name never comes up — ever. The good news: this is fixable, and faster than you think.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: '62%', label: 'of consumers now ask AI before Google' },
              { val: '0',   label: 'times AI has recommended your business' },
              { val: '30d', label: 'to see results with the right steps' },
            ].map(s => (
              <div key={s.val} className="bg-surface-2 border border-border rounded-xl p-4 text-center flex flex-col gap-1">
                <span className="text-2xl font-bold text-foreground">{s.val}</span>
                <span className="text-xs text-muted leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free steps */}
      <section className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Your AI Visibility Fix Plan</h2>
          <span className="text-xs text-success font-semibold bg-success/10 border border-success/20 px-2 py-1 rounded-full">3 steps free</span>
        </div>

        <div className="flex flex-col gap-4">
          {FREE_STEPS.map(step => (
            <div key={step.number} className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-success/15 border border-success/30 text-success text-xs font-bold flex items-center justify-center shrink-0">
                  {step.number}
                </span>
                <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-foreground-dim leading-relaxed pl-10">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Paywall */}
        <div className="relative flex flex-col gap-3">
          {/* Blur overlay */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent to-bg z-10 pointer-events-none" />

          {/* Locked step previews */}
          <div className="flex flex-col gap-3 blur-[3px] select-none pointer-events-none" aria-hidden>
            {LOCKED_STEPS.slice(0, 2).map(step => (
              <div key={step.number} className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-muted/20 border border-border text-muted text-xs font-bold flex items-center justify-center shrink-0">
                    {step.number}
                  </span>
                  <h3 className="text-sm font-bold text-foreground-dim">{step.title}</h3>
                </div>
                <div className="h-3 bg-surface-offset rounded-full w-3/4 ml-10" />
                <div className="h-3 bg-surface-offset rounded-full w-2/4 ml-10" />
              </div>
            ))}
          </div>

          {/* Unlock card */}
          <div className="relative z-20 bg-surface border-2 border-accent/40 rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-foreground">Steps 4–10 are locked</p>
                <p className="text-sm text-foreground-dim">
                  The remaining 7 steps cover the highest-impact tactics: building a knowledge panel,
                  getting press mentions, optimizing for AI question formats, and your full 30-day weekly checklist.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              {LOCKED_STEPS.map(step => (
                <div key={step.number} className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-muted shrink-0" />
                  <span className="text-xs text-muted">{step.title}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 flex flex-col gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">$4.99</span>
                <span className="text-sm text-muted">one-time · instant access</span>
              </div>
              {error && (
                <p className="text-xs text-danger flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />{error}
                </p>
              )}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-bold transition-all shadow-glow-sm hover:shadow-glow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting to checkout&hellip;</>
                  : <><Zap className="w-4 h-4" /> Unlock all 10 steps — $4.99 <ArrowRight className="w-4 h-4" /></>
                }
              </button>
              <p className="text-xs text-muted text-center">Secure checkout via Stripe &middot; Instant access after payment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer nudge to full scan */}
      <section className="border-t border-border bg-surface">
        <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-3">
          <p className="text-sm text-muted text-center">
            Already got visibility elsewhere and want a full AI audit across ChatGPT, Perplexity, Gemini & Claude?
          </p>
          <a
            href="/scan"
            className="mx-auto inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover font-semibold transition-colors"
          >
            Run a full AI visibility scan — $29.99 <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  )
}

export function InvisibleGuideClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-accent animate-spin" />
      </div>
    }>
      <InvisibleGuideInner />
    </Suspense>
  )
}
