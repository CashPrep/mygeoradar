import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AiReadinessScan } from '@/components/scan/AiReadinessScan'
import { HomepageReviews } from '@/components/reviews/HomepageReviews'
import {
  Radar,
  CheckCircle,
  ArrowRight,
  BookOpen,
  FileText,
  Zap,
  Shield,
  Clock,
  Quote,
  MapPin,
  Search,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'MyGeoRadar | Free Business Visibility Scanner — Local SEO, Citations & AI Search',
  description:
    'Run a free scan to find exactly why your business is not showing up on Google, in directories, or in AI answers. Get a specific action plan to fix every gap — starting at $27.',
  openGraph: {
    title: 'MyGeoRadar | Free Business Visibility Scanner — Local SEO, Citations & AI Search',
    description:
      'Find out why your business is invisible online. Free scan checks your local SEO, directory citations, and AI visibility — then shows you exactly what to fix.',
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
      description:
        'MyGeoRadar helps local businesses fix visibility gaps across Google, directories, and AI answers through a free scan and affordable fix guides.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://mygeoradar.com/#website',
      url: 'https://mygeoradar.com',
      name: 'MyGeoRadar',
      publisher: { '@id': 'https://mygeoradar.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://mygeoradar.com/#tool',
      name: 'MyGeoRadar Business Visibility Scanner',
      url: 'https://mygeoradar.com',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free business visibility scan',
      },
      publisher: { '@id': 'https://mygeoradar.com/#organization' },
    },
    {
      '@type': 'Product',
      '@id': 'https://mygeoradar.com/#product',
      name: 'Found by AI — The Business Visibility & GEO Optimization Playbook',
      url: 'https://mygeoradar.com/playbook',
      description:
        'Step-by-step system to fix every visibility gap across local SEO, directory citations, and AI search. Includes a 27-point checklist, prompt pack, and 30-day plan.',
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

const visibilityLayers = [
  {
    icon: MapPin,
    title: 'Local Search & Google Business Profile',
    description:
      'Is your listing complete, accurate, and ranking for local searches? Missing or inconsistent GBP data is the #1 reason local businesses go unfound.',
  },
  {
    icon: Search,
    title: 'Directory Citations & NAP Consistency',
    description:
      'Are your Name, Address, and Phone identical across Yelp, Apple Maps, and 100+ directories? Mismatches silently kill your local rankings.',
  },
  {
    icon: FileText,
    title: 'Schema Markup & Site Structure',
    description:
      'Can search engines and AI systems understand what your business does and where you operate? Schema errors make you invisible to automated discovery.',
  },
  {
    icon: TrendingUp,
    title: 'AI Search Visibility',
    description:
      'Does ChatGPT, Perplexity, or Gemini recommend your business when potential customers ask for your type of service? Most businesses are completely absent from AI answers.',
  },
]

const includes = [
  {
    icon: BookOpen,
    title: 'The Complete Business Visibility Playbook',
    description:
      'Step-by-step fixes for every visibility layer — local SEO, citations, schema, and AI search. No jargon. No agency required.',
  },
  {
    icon: FileText,
    title: 'The 27-Point Visibility Checklist',
    description:
      '27 concrete actions, each one checkable and completable in under an hour. Know exactly where you stand and what to do next.',
  },
  {
    icon: Zap,
    title: 'Prompt Pack — 10 AI Audit Prompts',
    description:
      'Paste into ChatGPT, Perplexity, Gemini, and Claude to see exactly how AI describes your business right now and where you need to improve.',
  },
  {
    icon: Shield,
    title: '30-Day Visibility Action Plan',
    description:
      'Day-by-day calendar for your first 30 days. One clear task per day. Consistent progress without overwhelm.',
  },
]

const faqs = [
  {
    q: 'What does the free scan actually check?',
    a: 'The scan analyzes your site structure, schema markup, page signals, and metadata — the technical factors that determine whether Google, directories, and AI systems can understand and surface your business. It is not a full audit but gives you a clear starting score and top issues.',
  },
  {
    q: 'Do I need to be technical or know SEO to use this?',
    a: 'Not at all. The playbook is written for business owners, marketers, and founders with no coding or deep SEO background. If you can edit your website or Google Business Profile, you can complete everything in this guide.',
  },
  {
    q: 'How is this different from other SEO tools?',
    a: 'Most SEO tools show you data without telling you what to do. MyGeoRadar gives you a free diagnosis and a step-by-step fix plan — including local citations, schema, and AI visibility — in one place, for a one-time cost, not a $99/month subscription.',
  },
  {
    q: 'What AI assistants does the playbook cover?',
    a: 'ChatGPT, Perplexity, Gemini, and Claude — the four assistants that handle the vast majority of AI search traffic today. The visibility principles also apply to future assistants as they grow.',
  },
  {
    q: 'Is this a subscription or recurring charge?',
    a: 'No. You pay $27 once and get the full playbook, checklist, prompt pack, and 30-day plan. No recurring charges. All future updates are included at no extra cost.',
  },
  {
    q: 'What if I am not satisfied?',
    a: 'If you follow the steps and are not satisfied within 30 days, email us at hello@mygeoradar.com for a full refund. No questions asked.',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Run your free visibility scan',
    body: 'Enter your URL. In seconds, see a scored breakdown of your site\'s visibility signals — what is working, what is broken, and where the biggest gaps are.',
  },
  {
    step: '02',
    title: 'Read your specific findings',
    body: 'Your results page shows exactly which visibility problems your site has — GBP issues, schema errors, citation gaps, and AI-readiness — not vague suggestions.',
  },
  {
    step: '03',
    title: 'Get the fix guide for your issues',
    body: 'Pick up the $27 complete playbook or a targeted fix guide for your specific problem. Each guide has step-by-step instructions, not just theory.',
  },
  {
    step: '04',
    title: 'Re-scan and track your improvement',
    body: 'After working through your fixes, run the scan again. See your score go up and confirm that AI systems and search engines can now find your business.',
  },
]

const previewChecklist = [
  { done: true,  text: 'Claim and fully complete your Google Business Profile' },
  { done: true,  text: 'Add a clear, keyword-rich business description everywhere' },
  { done: true,  text: 'Ensure NAP is identical across all major directories' },
  { done: false, text: 'Publish at least 3 authoritative articles that cite your expertise' },
  { done: false, text: 'Add schema markup for Organization, LocalBusiness, or Product' },
  { done: false, text: 'Build citations on the top 15 AI-trusted directories (list inside)' },
  { done: false, text: 'Create a dedicated About page written to be pulled by AI overviews' },
  { done: false, text: 'Run the 10-prompt audit to confirm your current AI visibility baseline' },
]

const problemStats = [
  {
    stat: '68%',
    label:
      'of local businesses have inconsistent NAP data across directories — silently lowering their local rankings.',
    source: null,
  },
  {
    stat: '58.5%',
    label:
      'of US Google searches now end without a click to the open web, driven by AI Overviews and featured snippets.',
    source: 'SparkToro / Datos, 2024',
    sourceUrl:
      'https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-2024/',
  },
  {
    stat: '<5%',
    label:
      'of small businesses have any structured schema markup — the language search engines and AI use to understand what you do.',
    source: null,
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

        {/* ── HERO ── */}
        <section className="relative pt-28 pb-0 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 hero-bg opacity-70 pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-6xl mx-auto">

            {/* Trust badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium animate-fade-in">
                <Radar className="w-3 h-3" />
                Free business visibility scanner — no signup required
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-6">

              {/* Left: headline + trust signals */}
              <div className="flex flex-col justify-center pt-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-3 text-balance">
                  Find out why your business isn&apos;t getting found
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-muted leading-snug mb-5 text-balance">
                  One free scan. Every visibility gap across{' '}
                  <span className="text-gradient-accent">Google, directories, and AI search.</span>
                </h2>
                <p className="text-base text-muted leading-relaxed mb-8 text-pretty">
                  Missing citations, broken schema, incomplete GBP, and AI invisibility are each costing
                  you customers right now. Run a free scan in 30 seconds and see exactly which problems
                  your business has — with a clear fix for each one.
                </p>

                {/* Quick trust bullets */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
                  {[
                    'Free — no signup needed',
                    'Results in 30 seconds',
                    'No credit card',
                  ].map((label) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="text-xs text-muted">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Social proof pull quote */}
                <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-accent/5 border border-accent/15">
                  <Quote className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold text-foreground">
                      Went from a 78 to a 100 visibility score in 30 days.
                    </span>{' '}
                    The checklist is the most actionable thing I&apos;ve found.
                    <span className="block text-xs text-muted mt-1">
                      — Johnathan Lightfoot, business owner
                    </span>
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href="/#what-you-get"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    See what&apos;s included in the fix guide ↓
                  </Link>
                </div>
              </div>

              {/* Right: scan widget */}
              <div
                id="scan"
                className="rounded-2xl border border-border bg-white shadow-card-accent p-6 md:p-8"
              >
                <div className="mb-5">
                  <p className="font-semibold text-[15px] mb-1">Check your business visibility — free</p>
                  <p className="text-sm text-muted leading-relaxed">
                    Enter your website URL. We&apos;ll scan your site structure, schema, and local
                    signals to show you exactly where your visibility is breaking down.
                  </p>
                  <p className="text-xs text-muted/60 mt-2">
                    Analyzes technical signals only — results reflect site structure, not guaranteed rankings.
                  </p>
                </div>
                <AiReadinessScan />
              </div>

            </div>
          </div>
        </section>

        {/* ── THE PROBLEM ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
                Most businesses are invisible online — and don&apos;t know why
              </h2>
              <p className="text-muted leading-relaxed max-w-2xl mx-auto text-pretty">
                It is rarely one big problem. It is four small ones compounding: an incomplete Google
                Business Profile, inconsistent citations, missing schema, and zero presence in AI answers.
                Each one alone costs you customers. Together they make you nearly unfindable.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {problemStats.map(({ stat, label, source, sourceUrl }) => (
                <div key={stat} className="p-6 rounded-2xl bg-surface border border-border">
                  <p className="text-4xl font-black text-gradient-accent mb-3 tracking-tight">{stat}</p>
                  <p className="text-sm text-muted leading-relaxed">
                    {label}{' '}
                    {source && sourceUrl && (
                      <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 opacity-50 hover:opacity-80 transition-opacity text-xs"
                      >
                        {source}
                      </a>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT WE CHECK ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                Every layer of your business visibility — in one scan
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                The free scan checks the four most common reasons local businesses fail to show up where customers are looking.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {visibilityLayers.map(({ icon: Icon, title, description }) => (
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
              <Link href="#scan">
                <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
                  Run my free visibility scan <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 tracking-tight">
              Scan. Diagnose. Fix.
            </h2>
            <div className="flex flex-col gap-4">
              {howItWorks.map(({ step, title, body }) => (
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

        {/* ── WHAT YOU GET ── */}
        <section id="what-you-get" className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                The scan is free. The fix is $27.
                <br />
                <span className="text-gradient-accent">Four assets. One complete system.</span>
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                No subscription. No monthly tool fee. One purchase gets you everything you need to fix
                your business visibility across local search, directories, and AI.
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
                  See everything in the visibility playbook <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CHECKLIST PREVIEW ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                A real look inside the visibility playbook
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                Sample from two of the four included assets — the checklist and the AI audit prompt pack.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Checklist preview */}
              <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card-lift">
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-surface">
                  <FileText className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">27-Point Visibility Checklist</span>
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
                            <path
                              d="M1 4l3 3 5-6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm leading-snug ${
                          done ? 'line-through text-muted/50' : 'text-foreground'
                        }`}
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                  <p className="text-xs text-muted italic border-t border-border pt-3 mt-1">
                    + 19 more items covering citations, schema, AI visibility, and content signals&hellip;
                  </p>
                </div>
              </div>

              {/* Prompt pack preview */}
              <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card-lift">
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-surface">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">AI Audit Prompt Pack — Sample</span>
                  <span className="ml-auto text-xs text-muted bg-surface-2 px-2 py-0.5 rounded-full">
                    1 of 10
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                      Prompt #1 — AI Visibility Baseline
                    </p>
                    <p className="text-xs text-muted mb-3">
                      Paste into ChatGPT, Perplexity, Gemini, and Claude. Run each separately.
                    </p>
                    <div className="rounded-lg bg-surface-2 border border-border p-4 font-mono text-xs leading-relaxed text-foreground/80 select-all">
                      &ldquo;I&apos;m looking for a [your business type] in [your city/area]. Who are
                      the most trusted and well-reviewed options you&apos;d recommend, and why?&rdquo;
                    </div>
                    <p className="text-xs text-muted mt-3">
                      <strong className="text-foreground">What to look for:</strong> Does your business
                      appear? How is it described? The playbook explains what each answer means and
                      exactly what to fix.
                    </p>
                  </div>
                  <p className="text-xs text-muted italic border-t border-border pt-3">
                    + 9 more prompts covering competitor gaps, hallucination detection, citation
                    sourcing, and brand accuracy&hellip;
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link href="/playbook">
                <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
                  Fix my business visibility — $27 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted mt-3">
                Instant download &middot; 30-day money-back guarantee
              </p>
            </div>
          </div>
        </section>

        {/* ── WHY NOW ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-balance">
              The businesses fixing this now will be the ones AI recommends in six months
            </h2>
            <p className="text-muted leading-relaxed mb-4 text-pretty">
              AI systems weight well-cited, established sources. Every day a competitor builds more
              citations, better schema, and more authoritative content, they get harder to displace in AI
              answers.{' '}
              <strong className="text-foreground">
                The best time to fix your visibility gaps was six months ago. The second-best time is today.
              </strong>
            </p>
            <p className="text-xs text-muted/55 italic mb-10 max-w-lg mx-auto">
              AI systems are regularly retrained and results vary by business, market, and effort. No
              specific outcome is guaranteed.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-4 rounded-xl bg-accent/5 border border-accent/15 text-left max-w-sm mx-auto">
              <Clock className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-sm">
                <strong>The full fix guide is $27 — one time.</strong> One SEO agency
                consultation costs $300+. Start fixing today.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight">
              This is for you if&hellip;
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              {[
                'You own or run a local or online business',
                'Customers tell you they "couldn\'t find you online"',
                'Your Google Business Profile is incomplete or inconsistent',
                'You don\'t want to pay $99/month for a tool you barely use',
                'AI assistants don\'t mention you when you test them',
                'You want a specific, done-for-you action plan — not more theory',
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

        {/* ── SOCIAL PROOF ── */}
        <section className="py-16 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-accent/20 bg-accent/4 p-7 flex flex-col md:flex-row gap-6 items-start">
              <Quote className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-foreground font-medium leading-relaxed mb-3">
                  &ldquo;I went from a 78 to a 100 visibility score in 30 days. I followed the
                  checklist exactly — most items took less than an hour each. The prompt pack alone was
                  worth it just to see how ChatGPT was describing my business before I fixed
                  things.&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center text-xs font-bold text-accent">
                    JL
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground block">
                      Johnathan Lightfoot
                    </span>
                    <span className="text-xs text-muted">
                      Business owner &middot; 78 → 100 visibility score in 30 days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-md mx-auto">
            <div className="relative rounded-2xl border border-accent/40 bg-white p-8 text-center shadow-card-accent overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent mb-5 mt-1">
                Complete Business Visibility Bundle
              </p>
              <div className="mb-1">
                <span className="text-6xl font-black text-gradient tracking-tight">$27</span>
              </div>
              <p className="text-sm text-muted mb-8">
                One-time &middot; No subscription &middot; Instant download
              </p>
              <ul className="flex flex-col gap-3 text-left mb-8">
                {[
                  'The Complete Business Visibility Playbook',
                  'The 27-Point Visibility Checklist',
                  'Prompt Pack — 10 copy-paste AI audit prompts',
                  '30-Day Visibility Action Plan calendar',
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
                  Fix my business visibility — $27 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted/70 mt-3 italic">
                Join the business owners who ran their free scan this week.
              </p>
              <p className="text-xs text-muted mt-1">
                Secure checkout via Stripe &middot; PDF delivered instantly
              </p>
            </div>
          </div>
        </section>

        {/* ── FOUNDER TRUST BLOCK ── */}
        <section className="py-20 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-2xl font-black text-accent select-none">
                AG
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Built by</p>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Andrew Garber — AI Scholar, Elon University
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  MyGeoRadar was built after noticing that almost every local business was invisible
                  online — including businesses with strong Google rankings and loyal customer bases.
                  The scan and playbook are built from research into the exact signals that Google,
                  directories, and AI systems use to decide which businesses to surface and recommend.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline font-medium mt-3"
                >
                  Read the full story <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
              Common questions
            </h2>
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

        {/* ── CUSTOMER REVIEWS ── */}
        <HomepageReviews />

        {/* ── FINAL CTA ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-balance">
              Your customers are searching. Make sure they can find you.
            </h2>
            <p className="text-muted mb-8 text-pretty">
              The free scan takes 30 seconds. The fix guide is{' '}
              <strong className="text-foreground">$27 — one time</strong>. Every day you wait is
              another day a competitor shows up where you don&apos;t.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="#scan">
                <Button variant="secondary" size="xl" className="gap-2">
                  Run my free scan first
                </Button>
              </Link>
              <Link href="/playbook">
                <Button variant="primary" size="xl" className="gap-2 shadow-glow-sm">
                  Get the fix guide — $27 <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted mt-4">
              One-time &middot; Instant download &middot; 30-day money-back guarantee
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
