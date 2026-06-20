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
  title: 'MyGeoRadar | Free GEO Scanner — See If AI Recommends Your Business',
  description:
    'Run a free scan to find exactly why your business is not showing up in ChatGPT, Perplexity, or Google AI answers. Get a personalized pass/fail list — then unlock the Full GEO Report for $29.99.',
  openGraph: {
    title: 'MyGeoRadar | Free GEO Scanner — See If AI Recommends Your Business',
    description:
      'Find out why your business is invisible to AI. Free scan checks your GEO signals across ChatGPT, Perplexity, Gemini & Claude — then shows you exactly what to fix.',
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
        'MyGeoRadar helps businesses fix GEO visibility gaps across ChatGPT, Perplexity, Gemini, and Claude through a free scan and a $29.99 Full GEO Report.',
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
      name: 'MyGeoRadar GEO Scanner',
      url: 'https://mygeoradar.com',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free GEO visibility scan',
      },
      publisher: { '@id': 'https://mygeoradar.com/#organization' },
    },
    {
      '@type': 'Product',
      '@id': 'https://mygeoradar.com/#product',
      name: 'Full GEO Report — myGEOradar',
      url: 'https://mygeoradar.com/checkout',
      description:
        'Complete GEO audit report with every signal scored, every gap flagged, and a prioritized fix list for AI search visibility across ChatGPT, Perplexity, Gemini & Claude.',
      offers: {
        '@type': 'Offer',
        price: '29.99',
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
    title: 'Complete GEO Audit — Every Signal Scored',
    description:
      'Your site checked against every factor AI systems use to decide who to recommend. Pass/fail for each one.',
  },
  {
    icon: FileText,
    title: 'Prioritized Fix List',
    description:
      'Every gap ranked by impact. Know exactly what to fix first — no guessing, no wasted effort.',
  },
  {
    icon: Zap,
    title: 'Platform-Specific Fix Guides',
    description:
      'Step-by-step instructions for your CMS — WordPress, Shopify, Webflow, Wix, or Squarespace.',
  },
  {
    icon: Shield,
    title: '30-Day Rescan Included',
    description:
      'Fix your issues, then rescan at 30 days to confirm your GEO score improved. Included free.',
  },
]

const faqs = [
  {
    q: 'What does the free scan actually check?',
    a: 'The scan analyzes your site structure, schema markup, page signals, and metadata — the technical factors that determine whether Google, directories, and AI systems can understand and surface your business. You get a scored breakdown and top issues instantly.',
  },
  {
    q: 'What is the Full GEO Report?',
    a: 'The Full GEO Report ($29.99) is a complete audit of every GEO signal on your site — every factor scored, every gap flagged, with a prioritized fix list. The free scan shows you the top issues; the Full Report shows you everything.',
  },
  {
    q: 'Do I need to be technical to use this?',
    a: 'Not at all. The fix guides are written for business owners, marketers, and founders with no coding background. If you can edit your website or Google Business Profile, you can complete everything.',
  },
  {
    q: 'How is this different from other SEO tools?',
    a: 'Most SEO tools show you data without telling you what to do. MyGeoRadar gives you a free GEO diagnosis + platform-specific fix guides in one place — for a one-time cost, not a $99/month subscription.',
  },
  {
    q: 'What AI assistants does this cover?',
    a: 'ChatGPT, Perplexity, Gemini, and Claude — the four assistants handling the vast majority of AI search traffic today.',
  },
  {
    q: 'Is this a subscription or a one-time charge?',
    a: 'One-time. The Full GEO Report is $29.99. No recurring charges. The 30-day rescan is included.',
  },
  {
    q: 'What if I am not satisfied?',
    a: 'Email us at hello@mygeoradar.com within 30 days for a full refund. No questions asked.',
  },
]

const howItWorks = [
  {
    step: '01',
    title: 'Scan your site — free',
    body: 'Enter your URL. In 30 seconds, get a scored breakdown of your GEO signals — what AI systems see, what they miss, and where your biggest gaps are. No signup required.',
  },
  {
    step: '02',
    title: 'Read the guides for your issues',
    body: 'Your results link directly to platform-specific fix guides — WordPress, Shopify, Webflow, Wix, or Squarespace. Each guide has step-by-step instructions for the exact issues found on your site.',
  },
  {
    step: '03',
    title: 'Unlock your Full GEO Report — $29.99',
    body: 'The free scan shows your top issues. The Full GEO Report shows everything — every signal scored, every gap flagged, with a prioritized fix list and a 30-day rescan to confirm your improvements.',
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

const guidesTeaser = [
  {
    platform: 'WordPress',
    slug: 'wordpress',
    score: 9,
    tagline: 'The gold standard for GEO. Full schema control, Yoast/Rank Math, and custom headers.',
  },
  {
    platform: 'Shopify',
    slug: 'shopify',
    score: 7,
    tagline: 'Good out of the box but schema gaps for AI search. Know what to add.',
  },
  {
    platform: 'Webflow',
    slug: 'webflow',
    score: 8,
    tagline: 'Strong technical foundation. Custom JSON-LD is manual but fully possible.',
  },
  {
    platform: 'Wix',
    slug: 'wix',
    score: 5,
    tagline: 'Schema tools are improving but still limited. Several GEO signals need workarounds.',
  },
  {
    platform: 'Squarespace',
    slug: 'squarespace',
    score: 5,
    tagline: 'Clean design, tight GEO control. Custom schema requires code injection.',
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
                Free GEO scanner — no signup required
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-6">

              {/* Left: headline + trust signals */}
              <div className="flex flex-col justify-center pt-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-3 text-balance">
                  Is your business showing up in AI answers?
                </h1>
                <h2 className="text-xl md:text-2xl font-medium text-muted leading-snug mb-5 text-balance">
                  Scan free in 30 seconds.{' '}
                  <span className="text-gradient-accent">See your pass/fail across ChatGPT, Perplexity, Gemini & Claude.</span>
                </h2>
                <p className="text-base text-muted leading-relaxed mb-8 text-pretty">
                  Most businesses are invisible to AI — missing schema, broken citations, and gaps
                  that no one told them about. The free scan shows exactly what’s wrong.
                  The{' '}
                  <strong className="text-foreground">Full GEO Report ($29.99)</strong>{' '}
                  shows everything and tells you exactly what to fix first.
                </p>

                {/* Quick trust bullets */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
                  {[
                    'Free — no signup needed',
                    'Results in 30 seconds',
                    'Full Report — $29.99 one-time',
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
                      Went from a 78 to a 100 GEO score in 30 days.
                    </span>{' '}
                    The fix list is the most actionable thing I&apos;ve found.
                    <span className="block text-xs text-muted mt-1">
                      — Johnathan Lightfoot, business owner
                    </span>
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href="/#how-it-works"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    See how it works ↓
                  </Link>
                </div>
              </div>

              {/* Right: scan widget — PRIMARY hero action */}
              <div
                id="scan"
                className="rounded-2xl border-2 border-accent/40 bg-white shadow-card-accent p-6 md:p-8"
              >
                <div className="mb-5">
                  <p className="font-bold text-[17px] mb-1">Run your free GEO scan</p>
                  <p className="text-sm text-muted leading-relaxed">
                    Enter your website URL. Get an instant pass/fail on every GEO signal AI systems
                    use to decide who to recommend.
                  </p>
                  <p className="text-xs text-muted/60 mt-2">
                    Analyzes technical signals only — results reflect site structure, not guaranteed rankings.
                  </p>
                </div>
                <AiReadinessScan />
                <p className="text-center text-xs text-muted mt-4">
                  Want everything?{' '}
                  <Link href="/checkout" className="text-accent font-semibold hover:underline">
                    Unlock the Full GEO Report — $29.99 →
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── THE PROBLEM ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
                Most businesses are invisible to AI — and don&apos;t know why
              </h2>
              <p className="text-muted leading-relaxed max-w-2xl mx-auto text-pretty">
                It is rarely one big problem. It is four small ones compounding: missing schema, inconsistent
                citations, no GBP signals, and zero presence in AI answers.
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
                Every GEO signal — in one scan
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                The free scan checks the four most common reasons businesses fail to appear in AI answers.
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
                  Run my free GEO scan <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 tracking-tight">
              How it works
            </h2>
            <p className="text-center text-muted mb-14 max-w-lg mx-auto">
              Three steps from invisible to showing up in AI answers.
            </p>
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
            <div className="text-center mt-10">
              <Link href="#scan">
                <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
                  Start with the free scan <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted mt-3">
                Full GEO Report unlocks after your scan &middot; <strong>$29.99 one-time</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ── GUIDES TEASER ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                Fix guides for every platform
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                After your scan, go straight to the guide for your CMS. Step-by-step GEO fixes —
                no developer required.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guidesTeaser.map(({ platform, slug, score, tagline }) => (
                <Link
                  key={slug}
                  href={`/guides/${slug}`}
                  className="group block p-5 rounded-2xl bg-white border border-border hover:border-accent/30 hover:shadow-card-lift transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-[15px] text-foreground">{platform}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        score >= 8
                          ? 'bg-emerald-100 text-emerald-700'
                          : score >= 6
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {score}/10 GEO
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-3">{tagline}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
              {/* All guides link */}
              <Link
                href="/guides"
                className="group flex flex-col items-center justify-center p-5 rounded-2xl border border-dashed border-border hover:border-accent/30 hover:bg-accent/4 transition-all duration-200 text-center min-h-[120px]"
              >
                <BookOpen className="w-6 h-6 text-muted mb-2 group-hover:text-accent transition-colors" />
                <span className="text-sm font-semibold text-muted group-hover:text-accent transition-colors">
                  View all platform guides
                </span>
                <span className="text-xs text-muted/60 mt-1">WordPress, Shopify, Webflow & more</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU GET ── */}
        <section id="what-you-get" className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                The scan is free. The full picture is{' '}
                <span className="text-gradient-accent">$29.99.</span>
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                The Full GEO Report gives you every signal scored, every gap flagged, and a
                prioritized fix list — plus a 30-day rescan to confirm your improvements.
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
              <Link href="/checkout">
                <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
                  Unlock Full GEO Report — $29.99 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted mt-3">One-time &middot; 30-day rescan included &middot; 30-day money-back guarantee</p>
            </div>
          </div>
        </section>

        {/* ── CHECKLIST PREVIEW ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                A real look at what the full report covers
              </h2>
              <p className="text-muted max-w-xl mx-auto">
                The free scan shows your top issues. The Full GEO Report goes deeper — every signal, scored.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Checklist preview */}
              <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-card-lift">
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-surface">
                  <FileText className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">GEO Signal Checklist</span>
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
                    + 19 more signals checked in the Full GEO Report&hellip;
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
                      appear? How is it described? The Full GEO Report explains what each answer means and
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
              <Link href="/checkout">
                <Button variant="primary" size="lg" className="gap-2 shadow-glow-sm">
                  Get the Full GEO Report — $29.99 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted mt-3">
                One-time &middot; 30-day rescan included &middot; 30-day money-back guarantee
              </p>
            </div>
          </div>
        </section>

        {/* ── WHY NOW ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-balance">
              The businesses fixing this now will be the ones AI recommends in six months
            </h2>
            <p className="text-muted leading-relaxed mb-4 text-pretty">
              AI systems weight well-cited, established sources. Every day a competitor builds more
              citations, better schema, and more authoritative content, they get harder to displace in AI
              answers.{' '}
              <strong className="text-foreground">
                The best time to fix your GEO gaps was six months ago. The second-best time is today.
              </strong>
            </p>
            <p className="text-xs text-muted/55 italic mb-10 max-w-lg mx-auto">
              AI systems are regularly retrained and results vary by business, market, and effort. No
              specific outcome is guaranteed.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-4 rounded-xl bg-accent/5 border border-accent/15 text-left max-w-sm mx-auto">
              <Clock className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-sm">
                <strong>The Full GEO Report is $29.99 — one time.</strong> One SEO agency
                consultation costs $300+. Start fixing today.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight">
              This is for you if&hellip;
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              {[
                'You own or run a local or online business',
                'Customers tell you they "couldn\'t find you online"',
                'You tested AI assistants and your business didn\'t appear',
                'You don\'t want to pay $99/month for a tool you barely use',
                'You want a personalized pass/fail — not vague generic advice',
                'You want a specific, prioritized action plan — not more theory',
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
        <section className="py-16 px-4 md:px-8 border-t border-border">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-accent/20 bg-accent/4 p-7 flex flex-col md:flex-row gap-6 items-start">
              <Quote className="w-7 h-7 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-foreground font-medium leading-relaxed mb-3">
                  &ldquo;I went from a 78 to a 100 GEO score in 30 days. I followed the
                  fix list exactly — most items took less than an hour each. The prompt pack alone was
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
                      Business owner &middot; 78 → 100 GEO score in 30 days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-md mx-auto">
            <div className="relative rounded-2xl border border-accent/40 bg-white p-8 text-center shadow-card-accent overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent mb-5 mt-1">
                Full GEO Report
              </p>
              <div className="mb-1">
                <span className="text-6xl font-black text-gradient tracking-tight">$29.99</span>
              </div>
              <p className="text-sm text-muted mb-8">
                One-time &middot; No subscription &middot; 30-day rescan included
              </p>
              <ul className="flex flex-col gap-3 text-left mb-8">
                {[
                  'Every GEO signal scored — pass/fail for each',
                  'Prioritized fix list ranked by impact',
                  'Platform-specific fix guides (WordPress, Shopify, Webflow, Wix, Squarespace)',
                  '30-day rescan to confirm your improvements',
                  '30-day money-back guarantee',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/checkout">
                <Button variant="primary" size="lg" className="w-full gap-2 shadow-glow-sm">
                  Get the Full GEO Report — $29.99 <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted/70 mt-3 italic">
                Run the free scan first — unlock the full report from your results page.
              </p>
              <p className="text-xs text-muted mt-1">
                Secure checkout via Stripe
              </p>
            </div>
          </div>
        </section>

        {/* ── FOUNDER TRUST BLOCK ── */}
        <section className="py-20 px-4 md:px-8 border-t border-border">
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
                  to AI — including businesses with strong Google rankings and loyal customer bases.
                  The scanner and Full GEO Report are built from research into the exact signals that
                  ChatGPT, Perplexity, Gemini, and Claude use to decide which businesses to surface and recommend.
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
        <section className="py-24 px-4 md:px-8 border-t border-border bg-surface/40">
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
              Your customers are searching AI. Make sure they find you.
            </h2>
            <p className="text-muted mb-8 text-pretty">
              The free scan takes 30 seconds. The{' '}
              <strong className="text-foreground">Full GEO Report is $29.99 — one time</strong>.
              Every day you wait is another day a competitor shows up in AI answers where you don&apos;t.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="#scan">
                <Button variant="secondary" size="xl" className="gap-2">
                  Run my free scan first
                </Button>
              </Link>
              <Link href="/checkout">
                <Button variant="primary" size="xl" className="gap-2 shadow-glow-sm">
                  Get Full GEO Report — $29.99 <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted mt-4">
              One-time &middot; 30-day rescan included &middot; 30-day money-back guarantee
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
