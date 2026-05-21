import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { CheckCircle, BookOpen, FileText, Zap, Shield, ArrowRight, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Found by AI — The AI Visibility Playbook',
  description:
    'The complete step-by-step playbook, 27-point checklist, prompt pack, and 30-day action plan to get your business found and recommended by ChatGPT, Perplexity, Gemini, and Claude. One time, $27.',
  openGraph: {
    title: 'Found by AI — The AI Visibility Playbook',
    description: 'Stop being invisible to AI assistants. Get the complete system to fix it — one time, $27.',
    url: 'https://mygeoradar.com/playbook',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Found by AI — The AI Visibility Playbook',
  description:
    'A complete step-by-step playbook, 27-point checklist, prompt pack, and 30-day action plan to get your business found and recommended by ChatGPT, Perplexity, Gemini, and Claude.',
  url: 'https://mygeoradar.com/playbook',
  brand: { '@type': 'Brand', name: 'MyGeoRadar' },
  offers: {
    '@type': 'Offer',
    price: '27.00',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    priceValidUntil: '2027-12-31',
    seller: { '@type': 'Organization', name: 'MyGeoRadar' },
  },
}

const includes = [
  {
    icon: BookOpen,
    title: 'The Complete Playbook (PDF)',
    description:
      'A no-fluff, step-by-step guide covering every fix that makes AI assistants recognize, trust, and recommend your business. Organized into clear sections so you know exactly where to start and what to do next.',
  },
  {
    icon: FileText,
    title: 'The 27-Point AI Visibility Checklist',
    description:
      'Run through all 27 checkboxes once and know exactly where you stand. Each item is a concrete action, not vague advice. Mark them off as you go.',
  },
  {
    icon: Zap,
    title: 'Prompt Pack — 10 Copy-Paste Prompts',
    description:
      'Paste these into ChatGPT, Perplexity, Gemini, and Claude to instantly see how AI assistants currently describe your business. No guessing — you’ll know the truth in 10 minutes.',
  },
  {
    icon: Shield,
    title: '30-Day Action Plan Calendar',
    description:
      'A day-by-day calendar for your first 30 days. Each day has one clear task so you make consistent progress without feeling overwhelmed.',
  },
]

const faqs = [
  {
    q: 'Do I need to be technical or know SEO to use this?',
    a: 'Not at all. The playbook is written for business owners, marketers, and founders with no coding or deep SEO background. If you can edit your website or Google Business Profile, you can do everything in this guide.',
  },
  {
    q: 'What AI assistants does this cover?',
    a: 'ChatGPT, Perplexity, Gemini, and Claude — the four assistants that handle the vast majority of AI search traffic today. The principles also apply to future assistants as they grow.',
  },
  {
    q: 'How is this different from free blog posts about GEO or AI SEO?',
    a: 'Free articles tell you what to do in general terms. This playbook tells you exactly how, in what order, with copy-paste prompts and a 30-day calendar so you do not waste time piecing it together yourself.',
  },
  {
    q: 'Is this a subscription or recurring charge?',
    a: 'No. You pay $27 once and get the full playbook, checklist, prompt pack, and 30-day plan. No recurring charges. Ever. All future updates are included at no extra cost.',
  },
  {
    q: 'How do I receive the playbook after purchase?',
    a: 'After checkout you will be redirected to a download page and receive an email with your download link. The PDF is yours to keep forever.',
  },
  {
    q: 'What if I am not satisfied?',
    a: 'If you follow the steps and are not satisfied within 30 days, email us at hello@mygeoradar.com for a full refund. No questions asked, no hassle.',
  },
]

export default function PlaybookPage() {
  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        {/* ─── HERO ─── */}
        <section className="pt-32 pb-16 px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
              <Star className="w-3 h-3" /> Digital product — instant download
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
              Found by AI
            </h1>
            <p className="text-xl text-muted mb-3 font-medium">The AI Visibility Playbook</p>
            <p className="text-base text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
              The complete, step-by-step system to get your business recognized and recommended
              by ChatGPT, Perplexity, Gemini, and Claude — no tech skills required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <form action="/api/checkout" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-accent/20"
                >
                  Get instant access — $27 <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
            <p className="text-xs text-muted">One-time payment &middot; Instant PDF download &middot; 30-day money-back guarantee</p>
          </div>
        </section>

        {/* ─── SOCIAL PROOF BAR ─── */}
        <section className="py-8 px-4 border-y border-border bg-surface/40">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            {[
              { label: 'Covers all 4 major AI assistants' },
              { label: 'No recurring subscription ever' },
              { label: '30-day money-back guarantee' },
              { label: 'Future updates included free' },
            ].map(({ label }) => (
              <div key={label} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm text-muted">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── WHAT’S INSIDE ─── */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">What’s inside</h2>
              <p className="text-muted">Four assets. One complete system. Nothing missing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {includes.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 p-6 rounded-xl bg-surface border border-border hover:border-accent/40 transition-colors"
                >
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

        {/* ─── WHO THIS IS FOR ─── */}
        <section className="py-16 px-4 md:px-8 bg-surface/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">This is for you if…</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                'You own or market a local or online business',
                'You’ve noticed AI assistants don’t mention your business at all',
                'You’ve tried reading GEO articles but still don’t know what to actually do',
                'You don’t want to pay $100+/month for a tracking tool',
                'You want a clear, done-for-you action plan, not more theory',
                'You want to act before your competitors figure this out',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-md mx-auto">
            <div className="rounded-2xl border-2 border-accent bg-surface p-8 text-center shadow-xl shadow-accent/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Found by AI — Complete Bundle</p>
              <div className="flex items-end justify-center gap-1 mb-1">
                <span className="text-6xl font-black">$27</span>
              </div>
              <p className="text-sm text-muted mb-8">One-time payment &middot; No subscription &middot; Instant download</p>
              <ul className="flex flex-col gap-3 text-left mb-8">
                {[
                  'The Complete AI Visibility Playbook (PDF)',
                  'The 27-Point AI Visibility Checklist',
                  'Prompt Pack — 10 copy-paste prompts',
                  '30-Day Action Plan calendar',
                  '30-day money-back guarantee',
                  'All future updates included free',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <form action="/api/checkout" method="POST">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-4 rounded-xl text-base transition-colors"
                >
                  Get instant access — $27 <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-xs text-muted mt-4">Secure checkout via Stripe &middot; PDF delivered instantly after payment</p>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Questions answered</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get found by AI today.</h2>
            <p className="text-muted mb-8">
              $27. One time. Everything you need. Downloadable in the next two minutes.
            </p>
            <form action="/api/checkout" method="POST">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-accent/20"
              >
                Get the Found by AI Playbook — $27 <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-muted mt-4">30-day money-back guarantee &middot; Instant download &middot; No subscription</p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
