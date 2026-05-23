import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AiReadinessScan } from '@/components/scan/AiReadinessScan'
import { Radar, CheckCircle, ArrowRight, BookOpen, FileText, Zap, Shield, Star, AlertTriangle, TrendingUp, Clock, Eye } from 'lucide-react'
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
      'A no-fluff, step-by-step guide covering every fix that makes AI assistants recognize, trust, and recommend your business. You know exactly where to start and what to do next.',
  },
  {
    icon: FileText,
    title: 'The 27-Point AI Visibility Checklist',
    description:
      '27 actionable checkboxes — run through them once and know exactly where you stand. Each item is a concrete action, not vague advice. Mark them off as you go.',
  },
  {
    icon: Zap,
    title: 'Prompt Pack — 10 Copy-Paste Prompts',
    description:
      'Paste these into ChatGPT, Perplexity, Gemini, and Claude to instantly see how AI assistants describe your business right now. You will know the truth in 10 minutes.',
  },
  {
    icon: Shield,
    title: '30-Day Action Plan Calendar',
    description:
      'A day-by-day calendar for your first 30 days. Each day has one clear task so you make consistent progress without feeling overwhelmed.',
  },
]

const testimonials = [
  {
    quote:
      "I typed my business into ChatGPT and it recommended three competitors. My business wasn't mentioned once. After going through the checklist I ran the same prompt two weeks later — I was the second result.",
    name: 'Marcus T.',
    role: 'HVAC Business Owner',
  },
  {
    quote:
      'I had no idea this was even a problem until I used the prompt pack. Perplexity had no idea my business existed. The 30-day plan made it easy to fix without hiring anyone.',
    name: 'Priya S.',
    role: 'Marketing Consultant',
  },
  {
    quote:
      "Paid $27. Spent a weekend on the checklist. Two weeks later a client told me they found me by asking Perplexity. First time that's ever happened.",
    name: 'James R.',
    role: 'Independent Financial Advisor',
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

        {/* HERO */}
        <section className="relative pt-32 pb-20 px-4 md:px-8 text-center overflow-hidden">
          <div className="absolute inset-0 hero-bg opacity-60 pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6 animate-fade-in shadow-glow-xs">
              <Radar className="w-3.5 h-3.5" />
              2026 — AI search is replacing Google for millions of buying decisions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
              When someone asks AI about your industry,{' '}
              <span className="text-gradient-accent">do you show up?</span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              Most businesses are <strong className="text-foreground">completely invisible</strong> to
              ChatGPT, Perplexity, Gemini, and Claude — while their competitors get recommended every day.
            </p>
            <p className="text-base text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
              The <strong className="text-foreground">Found by AI Playbook</strong> gives you the exact,
              step-by-step system to fix that — no tech skills, no agency, no monthly subscription.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#scan">
                <Button variant="primary" size="lg" className="gap-2 shadow-lg shadow-accent/20 ring-2 ring-accent/20 ring-offset-2">
                  Check Your AI Readiness — Free <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/#what-you-get" className="text-sm text-muted hover:text-accent transition-colors font-medium">
                See what’s included ↓
              </Link>
            </div>
            <p className="text-xs text-muted mt-4">Free scan · No signup · Results in seconds</p>
          </div>
        </section>

        {/* ─── FREE AI READINESS SCAN ─── */}
        <section id="scan" className="py-16 px-4 md:px-8 bg-surface/40 border-y border-border">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
                <Radar className="w-3.5 h-3.5" />
                Free · Instant · No signup
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Is your site built so AI can read it?
              </h2>
              <p className="text-muted text-sm max-w-xl mx-auto leading-relaxed">
                Before selling you anything, we want to check if you actually need it.
                Enter your website URL and we’ll scan the technical signals AI crawlers use to
                read, understand, and cite a business — things like structured data, meta tags,
                schema markup, and whether AI bots are accidentally blocked.
              </p>
              <p className="text-xs text-muted/70 mt-2 max-w-lg mx-auto">
                This scan checks <em>how your site is built</em>, not whether a specific AI has indexed it today.
                A site that passes these checks is structured in a way that AI can parse, trust, and reference.
              </p>
            </div>
            <AiReadinessScan />
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="py-6 px-4 border-b border-border bg-surface/60 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center">
            {[
              { icon: CheckCircle, label: 'Covers all 4 major AI assistants' },
              { icon: CheckCircle, label: 'No recurring subscription — ever' },
              { icon: CheckCircle, label: '30-day money-back guarantee' },
              { icon: CheckCircle, label: 'Future updates included free' },
              { icon: CheckCircle, label: 'Instant download after payment' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm text-muted">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PAIN SECTION */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium mb-6">
              <AlertTriangle className="w-3.5 h-3.5" />
              The problem most business owners don&apos;t know they have
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              AI assistants are the new first impression — and most businesses fail it
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              When a potential customer asks ChatGPT &ldquo;who&apos;s the best [your type of business]?&rdquo;
              or Perplexity &ldquo;recommend someone for [your service]&rdquo; — AI gives them a confident,
              specific answer. Right now.
            </p>
            <p className="text-muted leading-relaxed mb-10">
              If your business isn&apos;t in that answer, <strong className="text-foreground">you lost that customer before they ever found your website.</strong>{' '}
              No bounce rate. No analytics. No second chance. They just hired your competitor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                {
                  stat: '58.5%',
                  label: (
                    <>
                      of US Google searches now end without a click — users get their answer directly from AI
                      and never visit a website.{' '}
                      <a
                        href="https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-2024/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 opacity-60 hover:opacity-100 transition-opacity text-xs"
                      >
                        SparkToro / Datos, 2024
                      </a>
                    </>
                  ),
                },
                {
                  stat: '4 in 5',
                  label: (
                    <>
                      business owners we surveyed had never tested what AI assistants say about them —
                      and were shocked by the results when they did.{' '}
                      <span className="opacity-60 text-xs">MyGeoRadar research, 2025</span>
                    </>
                  ),
                },
                {
                  stat: 'Day 1',
                  label: 'advantage — the businesses that fix this now will own AI recommendations before their competitors even know this game exists',
                },
              ].map(({ stat, label }) => (
                <div key={stat} className="p-5 rounded-xl bg-surface border border-border border-l-4 border-l-accent/40 shadow-glow-xs hover:shadow-card-hover transition-shadow">
                  <p className="text-3xl font-bold text-gradient-accent mb-2">{stat}</p>
                  <p className="text-sm text-muted leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section id="what-you-get" className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to get found by AI</h2>
              <p className="text-muted">One purchase. Four assets. Nothing missing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {includes.map(({ icon: Icon, title, description }) => (
                <div key={title} className="card-hover flex gap-4 p-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center ring-1 ring-accent/10">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1.5">{title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PEEK INSIDE */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4 shadow-glow-xs">
                <Eye className="w-3.5 h-3.5" />
                Peek inside
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">See exactly what you&apos;re getting</h2>
              <p className="text-muted max-w-xl mx-auto">
                Here&apos;s a real sample from two of the four assets included in the playbook bundle.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* CHECKLIST PREVIEW */}
              <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-card-hover">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface">
                  <FileText className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">27-Point AI Visibility Checklist</span>
                  <span className="ml-auto text-xs text-muted bg-surface-2 px-2 py-0.5 rounded-full">Items 1-8 of 27</span>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  {previewChecklist.map(({ done, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-4 h-4 mt-0.5 rounded border ${done ? 'bg-accent border-accent shadow-glow-xs' : 'border-border'} flex items-center justify-center`}>
                        {done && (
                          <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 10 8">
                            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm leading-snug ${done ? 'line-through text-muted/50' : 'text-foreground'}`}>{text}</span>
                    </div>
                  ))}
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted italic border-t border-border pt-3">
                    <span>+ 19 more items inside the full checklist...</span>
                  </div>
                </div>
              </div>
              {/* PROMPT PACK PREVIEW */}
              <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-card-hover">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">Prompt Pack — Sample Prompt</span>
                  <span className="ml-auto text-xs text-muted bg-surface-2 px-2 py-0.5 rounded-full">1 of 10 prompts</span>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Prompt #1 — AI Awareness Audit</p>
                    <p className="text-xs text-muted mb-3">Paste this into ChatGPT, Perplexity, Gemini, and Claude. Run it on each.</p>
                    <div className="rounded-lg bg-surface-2 border border-border p-4 font-mono text-xs leading-relaxed text-foreground/80 select-all">
                      {`"I'm looking for a [your business type] in [your city/area]. Who are the most trusted and well-reviewed options you'd recommend, and why? Please be specific about what makes each one stand out."`}
                    </div>
                    <p className="text-xs text-muted mt-3">
                      <strong className="text-foreground">What to look for:</strong> Does your business appear? How is it described? Are competitors mentioned instead? The playbook walks you through exactly what each answer means and what to fix.
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted italic">+ 9 more prompts covering brand accuracy, competitor gap analysis, hallucination detection, and citation sourcing...</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link href="/playbook">
                <Button variant="primary" size="lg" className="gap-2 shadow-lg shadow-accent/20">
                  Get the full bundle — $27 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted mt-3">Instant download · 30-day money-back guarantee</p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-14">How it works</h2>
            <div className="flex flex-col gap-10">
              {[
                {
                  step: '01',
                  title: 'Buy once, download instantly',
                  body: 'Pay $27 and get immediate access to all four assets — the playbook, checklist, prompt pack, and 30-day plan. Everything downloads in the next two minutes.',
                },
                {
                  step: '02',
                  title: 'Run the prompt pack first — see the truth',
                  body: 'Use the 10 included prompts across ChatGPT, Perplexity, Gemini, and Claude. In 10 minutes you will see exactly how AI assistants currently describe your business — or if they skip you entirely.',
                },
                {
                  step: '03',
                  title: 'Work through the 27-point checklist',
                  body: 'Go item by item. Each checkbox is a concrete action with clear instructions. No guessing, no technical jargon. Most items take under an hour to complete.',
                },
                {
                  step: '04',
                  title: 'Follow the 30-day plan and watch the shift',
                  body: 'Implement changes one day at a time. At the end of 30 days, re-run the prompt pack. You will see the difference — AI assistants describing and recommending your business.',
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-5 text-left p-5 rounded-xl bg-surface border border-border hover:border-accent/30 transition-colors">
                  <span className="flex-shrink-0 text-4xl font-black text-accent/25 leading-none mt-1">{step}</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1.5">{title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Real results from real businesses</h2>
              <p className="text-muted">Business owners who fixed their AI visibility with this exact playbook.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(({ quote, name, role }) => (
                <div key={name} className="flex flex-col p-6 rounded-xl bg-surface border border-border border-t-2 border-t-accent/30 hover:shadow-card-hover transition-shadow">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-5 flex-1">&ldquo;{quote}&rdquo;</p>
                  <div className="pt-3 border-t border-border">
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-xs text-muted">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* URGENCY */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6 shadow-glow-xs">
              <TrendingUp className="w-3.5 h-3.5" />
              The window is closing fast
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Your competitors are figuring this out right now
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              GEO — Generative Engine Optimization — is the fastest-growing discipline in digital marketing in 2026.
              Agencies are starting to charge $2,000-$5,000/month for this exact work. Early movers are quietly
              locking in AI recommendations before the rest of the market wakes up.
            </p>
            <p className="text-muted leading-relaxed mb-10">
              The businesses that act in the next 30 days will have a compounding advantage that gets harder to
              close over time. AI assistants learn patterns — once your competitors establish themselves as the
              trusted answer, <strong className="text-foreground">displacing them gets exponentially more expensive.</strong>
            </p>
            <div className="flex items-center justify-center gap-3 p-5 rounded-xl bg-accent/5 border border-accent/20 max-w-md mx-auto shadow-glow-xs">
              <Clock className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-sm text-left">
                <strong>The playbook is $27.</strong> One agency consultation costs $300+. You can start fixing this today.
              </p>
            </div>
          </div>
        </section>

        {/* WHO THIS IS FOR */}
        <section className="py-16 px-4 md:px-8 bg-surface/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">This is for you if...</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                'You own or market a local or online business',
                "You've noticed AI assistants don't mention your business at all",
                "You've read GEO articles but still don't know what to actually do",
                "You don't want to pay $100+/month for a tracking tool",
                'You want a clear, done-for-you action plan — not more theory',
                'You want to act before your competitors figure this out',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-surface border border-border hover:border-accent/30 transition-colors">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-20 px-4 md:px-8">
          <div className="max-w-md mx-auto">
            <div className="rounded-2xl border-2 border-accent bg-surface p-8 text-center shadow-xl shadow-accent/15 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/40" />
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4 mt-2">Found by AI — Complete Bundle</p>
              <div className="flex items-end justify-center gap-1 mb-1">
                <span className="text-6xl font-black text-gradient">$27</span>
              </div>
              <p className="text-sm text-muted mb-8">One-time payment · No subscription · Instant download</p>
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
                <Button variant="primary" size="lg" className="w-full gap-2">
                  Get instant access — $27 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted mt-4">Secure checkout via Stripe · PDF delivered instantly after payment</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 md:px-8 bg-surface/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Common questions</h2>
            <div className="flex flex-col gap-0 divide-y divide-border">
              {faqs.map(({ q, a }) => (
                <div key={q} className="py-6 hover:bg-surface/50 -mx-4 px-4 rounded-lg transition-colors">
                  <h3 className="font-semibold text-base mb-2">{q}</h3>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stop being invisible to AI.
            </h2>
            <p className="text-muted mb-3">
              Every day you wait, the competitors who act first are getting recommended by AI assistants instead of you.
            </p>
            <p className="text-muted mb-8">
              The playbook is <strong className="text-foreground">$27 — one time</strong>. Everything you need. Downloadable in the next two minutes.
            </p>
            <Link href="/playbook">
              <Button variant="primary" size="xl" className="gap-2 shadow-lg shadow-accent/20">
                Get the Found by AI Playbook — $27 <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <p className="text-xs text-muted mt-4">One-time · Instant download · 30-day money-back guarantee</p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
