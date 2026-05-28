import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AiReadinessScan } from '@/components/scan/AiReadinessScan'
import { HomepageReviews } from '@/components/reviews/HomepageReviews'
import { Radar, CheckCircle, ArrowRight, BookOpen, FileText, Zap, Shield, AlertTriangle, Clock, Eye } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'MyGeoRadar — Get Found by AI Assistants',
  description:
    'Most businesses are invisible to ChatGPT, Perplexity, Gemini, and Claude. The Found by AI Playbook gives you the complete, step-by-step system to fix that — one time, $27.',
  openGraph: {
    title: 'MyGeoRadar — Get Found by AI Assistants',
    description: 'Stop being invisible to AI assistants. Get the complete system to fix it — one time, $27.',
    url: 'https://mygeoradar.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
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
      description:
        'A complete step-by-step playbook to get your business found and recommended by ChatGPT, Perplexity, Gemini, and Claude.',
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
    title: 'The Complete AI Visibility Playbook',
    description:
      'A no-fluff, step-by-step guide covering every fix that makes AI assistants recognize, trust, and recommend your business.',
  },
  {
    icon: FileText,
    title: 'The 27-Point AI Visibility Checklist',
    description:
      '27 actionable checkboxes — run through them once and know exactly where you stand. Each item is a concrete action, not vague advice.',
  },
  {
    icon: Zap,
    title: 'Prompt Pack — 10 Copy-Paste Prompts',
    description:
      'Paste these into ChatGPT, Perplexity, Gemini, and Claude to instantly see how AI assistants describe your business right now.',
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
    q: 'How is this different from free blog posts about GEO?',
    a: 'Free articles tell you what to do in general terms. This playbook tells you exactly how, in what order, with copy-paste prompts and a 30-day calendar so you never waste time piecing it together yourself.',
  },
  {
    q: 'Is this a subscription or recurring charge?',
    a: 'No. You pay $27 once and get the full playbook, checklist, prompt pack, and 30-day plan. No recurring charges. Ever. All future updates are included at no extra cost.',
  },
  {
    q: 'How do I receive the playbook after purchase?',
    a: 'After checkout you will be redirected to a download page and receive a confirmation email. Everything is yours to keep forever.',
  },
  {
    q: 'What if I am not satisfied?',
    a: 'If you follow the steps and are not satisfied within 30 days, email us at hello@mygeoradar.com for a full refund. No questions asked, no hassle.',
  },
]

const previewChecklist = [
  { done: true,  text: 'Claim and fully complete your Google Business Profile' },
  { done: true,  text: 'Add a clear, keyword-rich business description everywhere' },
  { done: true,  text: 'Ensure NAP (Name, Address, Phone) is identical across all directories' },
  { done: false, text: 'Publish at least 3 authoritative articles that cite your expertise' },
  { done: false, text: 'Add structured data (schema) for Organization, LocalBusiness, or Product' },
  { done: false, text: 'Build citations on the top 15 AI-trusted directories (list inside)' },
  { done: false, text: 'Create a dedicated "About" page written to be pulled by AI overviews' },
  { done: false, text: 'Run the 10-prompt audit to confirm your current AI visibility baseline' },
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

        {/* ── HERO + SCAN (above the fold, scan is the centerpiece) ── */}
        <section className="relative pt-28 pb-0 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 hero-bg opacity-70 pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-6xl mx-auto">

            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium animate-fade-in">
                <Radar className="w-3 h-3" />
                AI search is replacing Google for buying decisions — 2026
              </div>
            </div>

            {/* 2-col layout: headline left, scan right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-16">

              {/* Left — headline + context */}
              <div className="flex flex-col justify-center pt-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-5 text-balance">
                  When someone asks AI about your industry,{' '}
                  <span className="text-gradient-accent">do you show up?</span>
                </h1>
                <p className="text-base text-muted leading-relaxed mb-8 text-pretty">
                  Most businesses are{' '}
                  <strong className="text-foreground font-semibold">completely invisible</strong> to
                  ChatGPT, Perplexity, Gemini, and Claude — while their competitors get recommended
                  every day. Run the free scan and find out where you stand in 30 seconds.
                </p>

                {/* Trust signals — inline under headline */}
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {[
                    'Free — no signup',
                    'Results in seconds',
                    'No credit card',
                  ].map((label) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="text-xs text-muted">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Scroll link for those who want more context first */}
                <div className="mt-8">
                  <Link
                    href="/#what-you-get"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    See what the full playbook includes ↓
                  </Link>
                </div>
              </div>

              {/* Right — scan input, visually elevated */}
              <div id="scan" className="rounded-2xl border border-border bg-white shadow-card-accent p-6 md:p-8">
                <div className="mb-5">
                  <p className="font-semibold text-[15px] mb-1">Check your AI readiness — free</p>
                  <p className="text-sm text-muted leading-relaxed">
                    Enter your website URL. We'll analyze the technical signals that influence
                    whether AI systems can read, understand, and cite your business.
                  </p>
                  <p className="text-xs text-muted/60 mt-2">
                    Checks site structure only — does not guarantee AI recommendation.
                  </p>
                </div>
                <AiReadinessScan />
              </div>
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM ───────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-balance">
              AI assistants are the new first impression —{' '}
              <span className="text-muted font-medium">and most businesses fail it</span>
            </h2>
            <p className="text-muted leading-relaxed mb-4 text-pretty">
              When a potential customer asks ChatGPT &ldquo;who&apos;s the best [your type of
              business]?&rdquo; — AI gives them a confident, specific answer. Right now. If your
              business isn't in that answer,{' '}
              <strong className="text-foreground">
                you lost that customer before they ever found your website.
              </strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left mt-10">
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <p className="text-4xl font-black text-gradient-accent mb-3 tracking-tight">58.5%</p>
                <p className="text-sm text-muted leading-relaxed">
                  of US Google searches end without a click to the open web — driven by featured
                  snippets and AI Overviews.{' '}
                  <a
                    href="https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-2024/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 opacity-50 hover:opacity-80 transition-opacity text-xs"
                  >
                    SparkToro / Datos, 2024
                  </a>
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <p className="text-4xl font-black text-gradient-accent mb-3 tracking-tight">Day 1</p>
                <p className="text-sm text-muted leading-relaxed">
                  advantage — the businesses that establish AI visibility now will build a compounding
                  lead before their competitors even know this game exists.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU GET ──────────────────────────────────────────── */}
        <section id="what-you-get" className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                The free scan shows you the gaps.
                <br />
                <span className="text-gradient-accent">The playbook closes them.</span>
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                One purchase. Four assets. The complete system to go from invisible to recommended.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {includes.map(({ icon: Icon, title, description }) => (
                <div key={title} className="card-hover flex gap-4 p-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1.5 text-[15px]">{title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/playbook">
                <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
                  See everything that's included <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── PEEK INSIDE ───────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                See exactly what you&apos;re getting
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                A real sample from two of the four assets — the checklist and the prompt pack.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Checklist preview */}
              <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card-lift">
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-surface">
                  <FileText className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">27-Point AI Visibility Checklist</span>
                  <span className="ml-auto text-xs text-muted bg-surface-2 px-2 py-0.5 rounded-full">
                    1–8 of 27
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  {previewChecklist.map(({ done, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded border flex items-center justify-center ${
                          done ? 'bg-accent border-accent' : 'border-border'
                        }`}
                      >
                        {done && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm leading-snug ${done ? 'line-through text-muted/50' : 'text-foreground'}`}>
                        {text}
                      </span>
                    </div>
                  ))}
                  <p className="text-xs text-muted italic border-t border-border pt-3 mt-1">
                    + 19 more items inside the full checklist…
                  </p>
                </div>
              </div>

              {/* Prompt pack preview */}
              <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card-lift">
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-surface">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">Prompt Pack — Sample Prompt</span>
                  <span className="ml-auto text-xs text-muted bg-surface-2 px-2 py-0.5 rounded-full">
                    1 of 10
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                      Prompt #1 — AI Awareness Audit
                    </p>
                    <p className="text-xs text-muted mb-3">
                      Paste into ChatGPT, Perplexity, Gemini, and Claude. Run each separately.
                    </p>
                    <div className="rounded-lg bg-surface-2 border border-border p-4 font-mono text-xs leading-relaxed text-foreground/80 select-all">
                      {`"I'm looking for a [your business type] in [your city/area]. Who are the most trusted and well-reviewed options you'd recommend, and why?"`}
                    </div>
                    <p className="text-xs text-muted mt-3">
                      <strong className="text-foreground">What to look for:</strong> Does your
                      business appear? How is it described? The playbook walks you through exactly
                      what each answer means and what to fix.
                    </p>
                  </div>
                  <p className="text-xs text-muted italic border-t border-border pt-3">
                    + 9 more prompts covering competitor gaps, hallucination detection, citation
                    sourcing, and brand accuracy…
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link href="/playbook">
                <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
                  Get the full bundle — $27 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted mt-3">Instant download · 30-day money-back guarantee</p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 tracking-tight">
              How it works
            </h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  step: '01',
                  title: 'Run the free scan — see where you stand',
                  body: 'Enter your URL above. In seconds you'll see how your site is structured for AI systems — what's working, what's broken, and where the biggest gaps are.',
                },
                {
                  step: '02',
                  title: 'Get the playbook — $27, one time',
                  body: 'The playbook gives you the complete system to fix every gap the scan surfaces — a 27-point checklist, 10 copy-paste audit prompts, and a 30-day action plan.',
                },
                {
                  step: '03',
                  title: 'Work through the checklist',
                  body: 'Go item by item. Each checkbox is a concrete action with clear instructions. No guessing, no jargon. Most items take under an hour.',
                },
                {
                  step: '04',
                  title: 'Re-run the scan and measure your shift',
                  body: 'After 30 days, run the scan again and compare your score. You'll have a concrete before/after showing exactly how your AI visibility changed.',
                },
              ].map(({ step, title, body }) => (
                <div
                  key={step}
                  className="flex gap-5 text-left p-5 rounded-xl bg-white border border-border hover:border-accent/25 hover:shadow-card-lift transition-all duration-200"
                >
                  <span className="step-num flex-shrink-0 mt-0.5">{step}</span>
                  <div>
                    <h3 className="font-semibold text-[15px] mb-1.5">{title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY NOW ───────────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-balance">
              Your competitors are figuring this out right now
            </h2>
            <p className="text-muted leading-relaxed mb-4 text-pretty">
              GEO — Generative Engine Optimization — is the fastest-growing discipline in digital
              marketing in 2026. Based on publicly available agency pricing, specialist firms charge
              $2,000–$5,000/month for this exact work. Early movers are quietly building AI
              visibility before the rest of the market wakes up.
            </p>
            <p className="text-muted leading-relaxed mb-3 text-pretty">
              AI systems weight well-cited, established sources. Once your competitors build that
              authority,{' '}
              <strong className="text-foreground">
                displacing them gets exponentially more expensive.
              </strong>
            </p>
            <p className="text-xs text-muted/55 italic mb-10 max-w-lg mx-auto">
              AI systems are regularly retrained and results vary by business, market, and effort. No
              specific outcome is guaranteed.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-4 rounded-xl bg-accent/5 border border-accent/15 text-left max-w-sm mx-auto">
              <Clock className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-sm">
                <strong>The playbook is $27.</strong> One agency consultation costs $300+. You can
                start fixing this today.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ──────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight">
              This is for you if…
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              {[
                'You own or market a local or online business',
                "AI assistants don't mention your business when you test them",
                "You've read GEO articles but still don't know what to actually do",
                "You don't want to pay $100+/month for a tracking tool",
                'You want a clear, done-for-you action plan — not more theory',
                'You want to act before your competitors figure this out',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 px-4 py-3.5 rounded-lg bg-white border border-border hover:border-accent/25 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ───────────────────────────────────────────────── */}
        <section id="pricing" className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-md mx-auto">
            <div className="relative rounded-2xl border border-accent/40 bg-white p-8 text-center shadow-card-accent overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent mb-5 mt-1">
                Found by AI — Complete Bundle
              </p>
              <div className="mb-1">
                <span className="text-6xl font-black text-gradient tracking-tight">$27</span>
              </div>
              <p className="text-sm text-muted mb-8">One-time · No subscription · Instant download</p>
              <ul className="flex flex-col gap-3 text-left mb-8">
                {[
                  'The Complete AI Visibility Playbook',
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
              <Link href="/playbook">
                <Button variant="primary" size="lg" className="w-full gap-2 shadow-glow-sm">
                  Get instant access — $27 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted mt-4">
                Secure checkout via Stripe · PDF delivered instantly
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">Common questions</h2>
            <div className="divide-y divide-border">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <h3 className="font-semibold text-[15px] mb-2">{q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CUSTOMER REVIEWS ──────────────────────────────────────── */}
        <HomepageReviews />

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-balance">
              Stop being invisible to AI.
            </h2>
            <p className="text-muted mb-8 text-pretty">
              Every day you wait, the competitors who act first get recommended instead of you. The
              playbook is{' '}
              <strong className="text-foreground">$27 — one time</strong>. Everything you need,
              downloadable in the next two minutes.
            </p>
            <Link href="/playbook">
              <Button variant="primary" size="xl" className="gap-2 shadow-glow-sm">
                Get the Found by AI Playbook — $27 <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <p className="text-xs text-muted mt-4">
              One-time · Instant download · 30-day money-back guarantee
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
