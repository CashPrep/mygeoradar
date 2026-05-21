import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Radar, CheckCircle, ArrowRight, BookOpen, FileText, Zap, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'MyGeoRadar — Get Found by AI',
  description:
    'Most businesses are invisible to AI assistants like ChatGPT, Perplexity, and Gemini. The Found by AI Playbook gives you the exact step-by-step system to fix that — one time, $27.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://mygeoradar.com/#organization',
      name: 'MyGeoRadar',
      url: 'https://mygeoradar.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mygeoradar.com/og-image.png',
        width: 1200,
        height: 630,
      },
      sameAs: ['https://twitter.com/MyGEORadar'],
      description: 'MyGeoRadar helps businesses get found and recommended by AI assistants like ChatGPT, Perplexity, Gemini, and Claude.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://mygeoradar.com/#website',
      url: 'https://mygeoradar.com',
      name: 'MyGeoRadar',
      publisher: { '@id': 'https://mygeoradar.com/#organization' },
    },
    {
      '@type': 'Product',
      '@id': 'https://mygeoradar.com/#product',
      name: 'Found by AI — The AI Visibility Playbook',
      url: 'https://mygeoradar.com/playbook',
      description: 'A complete step-by-step playbook to get your business found and recommended by ChatGPT, Perplexity, Gemini, and Claude.',
      offers: {
        '@type': 'Offer',
        price: '27.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2027-12-31',
      },
      publisher: { '@id': 'https://mygeoradar.com/#organization' },
    },
  ],
}

const includes = [
  {
    icon: BookOpen,
    title: 'The Complete Playbook (PDF)',
    description: 'A no-fluff, step-by-step guide covering every fix that makes AI assistants recognize, trust, and recommend your business.',
  },
  {
    icon: FileText,
    title: 'The AI Visibility Checklist',
    description: '27 actionable checkboxes — run through them once and know exactly where you stand and what to fix first.',
  },
  {
    icon: Zap,
    title: 'Prompt Pack (Copy & Paste)',
    description: '10 ready-to-use prompts to test how AI assistants currently describe your business — no guesswork.',
  },
  {
    icon: Shield,
    title: '30-Day Action Plan',
    description: 'A day-by-day calendar laying out exactly what to do in your first 30 days for maximum AI visibility.',
  },
]

const faqs = [
  {
    q: 'Do I need to be technical to use this?',
    a: 'Not at all. The playbook is written for business owners, marketers, and founders — no coding or SEO background required.',
  },
  {
    q: 'How is this different from free blog posts about GEO?',
    a: 'Free articles tell you what to do. This playbook tells you exactly how, in what order, with templates and prompts so you do not waste time figuring it out yourself.',
  },
  {
    q: 'Which AI assistants does this cover?',
    a: 'ChatGPT, Perplexity, Gemini, and Claude — the four assistants that together handle the vast majority of AI search traffic today.',
  },
  {
    q: 'Is this a subscription?',
    a: 'No. You pay $27 once and get the full playbook, checklist, prompt pack, and 30-day plan. No recurring charges ever.',
  },
  {
    q: 'What if it does not work for my business?',
    a: 'If you follow the steps and are not satisfied within 30 days, email us for a full refund. No questions asked.',
  },
]

export default function HomePage() {
  return (
    <>
      <Script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        {/* ─── HERO ─── */}
        <section className="pt-32 pb-20 px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
              <Radar className="w-3.5 h-3.5" />
              New in 2026 — AI search is replacing Google for millions of searches
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              When someone asks AI about your industry,<br />
              <span className="text-accent">do you show up?</span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
              Most businesses are completely invisible to ChatGPT, Perplexity, Gemini, and Claude.
              The <strong className="text-foreground">Found by AI Playbook</strong> gives you the
              exact, step-by-step system to fix that — no tech skills required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/playbook">
                <Button variant="primary" size="lg" className="gap-2">
                  Get the Playbook — $27 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/#what-you-get" className="text-sm text-muted hover:text-foreground transition-colors">
                See what&apos;s included ↓
              </Link>
            </div>
            <p className="text-xs text-muted mt-4">One-time payment &middot; Instant download &middot; 30-day money-back guarantee</p>
          </div>
        </section>

        {/* ─── PAIN SECTION ─── */}
        <section className="py-16 px-4 md:px-8 bg-surface/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">AI assistants are the new first impression</h2>
            <p className="text-muted leading-relaxed mb-8">
              When a potential customer asks ChatGPT &ldquo;what&apos;s the best [your type of business] near me?&rdquo;
              or &ldquo;who should I hire for [your service]?&rdquo; — AI gives them a confident answer.
              If your business isn&apos;t part of that answer, you lost that customer before they ever found your website.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { stat: '40%+', label: 'of Google searches now end without a click — people get answers from AI instead' },
                { stat: '4 in 5', label: 'business owners have no idea how AI assistants describe them to customers' },
                { stat: '$27', label: 'is less than one hour of consulting — and gives you the complete fix, not just advice' },
              ].map(({ stat, label }) => (
                <div key={stat} className="p-5 rounded-xl bg-surface border border-border">
                  <p className="text-3xl font-bold text-accent mb-2">{stat}</p>
                  <p className="text-sm text-muted leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHAT YOU GET ─── */}
        <section id="what-you-get" className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to get found by AI</h2>
              <p className="text-muted">One purchase. Four assets. A complete system.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {includes.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4 p-6 rounded-xl bg-surface border border-border hover:border-accent/40 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-14">How it works</h2>
            <div className="flex flex-col gap-10">
              {[
                { step: '01', title: 'Buy once, download instantly', body: 'Pay $27 and get immediate access to the full playbook, checklist, prompt pack, and 30-day plan — all in one download.' },
                { step: '02', title: 'Run the prompt pack first', body: 'Use the included prompts to test how AI assistants currently describe your business. Takes 10 minutes and shows you exactly where you stand.' },
                { step: '03', title: 'Work through the checklist', body: 'Go through the 27-point checklist and mark off every fix. Each item has a clear action — no guessing, no ambiguity.' },
                { step: '04', title: 'Follow the 30-day plan', body: 'Implement the changes over 30 days following the day-by-day calendar. Re-run the prompts at the end to see the difference.' },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-5 text-left">
                  <span className="flex-shrink-0 text-4xl font-black text-accent/20">{step}</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="pricing" className="py-20 px-4 md:px-8">
          <div className="max-w-md mx-auto">
            <div className="rounded-2xl border border-accent/40 bg-surface p-8 text-center shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Found by AI Playbook</p>
              <div className="flex items-end justify-center gap-1 mb-2">
                <span className="text-5xl font-black">$27</span>
                <span className="text-muted mb-2">one time</span>
              </div>
              <p className="text-sm text-muted mb-8">No subscription. No upsells. Instant download.</p>
              <ul className="flex flex-col gap-3 text-left mb-8">
                {[
                  'The Complete AI Visibility Playbook (PDF)',
                  'The 27-Point AI Visibility Checklist',
                  'Prompt Pack — 10 copy-paste prompts',
                  '30-Day Action Plan calendar',
                  '30-day money-back guarantee',
                  'All future updates included',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/playbook">
                <Button variant="primary" size="lg" className="w-full gap-2">
                  Get instant access — $27 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted mt-4">Secure checkout via Stripe &middot; PDF delivered instantly</p>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Common questions</h2>
            <div className="flex flex-col gap-6">
              {faqs.map(({ q, a }) => (
                <div key={q} className="border-b border-border pb-6">
                  <h3 className="font-semibold mb-2">{q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stop being invisible to AI.
            </h2>
            <p className="text-muted mb-8">
              Every day you wait, competitors who act first are getting recommended by AI assistants instead of you.
              The playbook is $27 — less than one coffee meeting.
            </p>
            <Link href="/playbook">
              <Button variant="primary" size="lg" className="gap-2">
                Get the Found by AI Playbook — $27 <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted mt-4">One-time &middot; Instant download &middot; 30-day guarantee</p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
