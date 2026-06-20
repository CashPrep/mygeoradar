import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ArrowRight, Radar, BookOpen, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GEO Fix Guides by Platform — Get Found by ChatGPT, Perplexity & Gemini | MyGeoRadar',
  description:
    'Step-by-step GEO fix guides for WordPress, Shopify, Webflow, Wix, and Squarespace. Find out which issues affect your site with a free scan, then follow the exact fix for your platform.',
  openGraph: {
    title: 'GEO Fix Guides — Fix Your AI Visibility by Platform | MyGeoRadar',
    description:
      'Fix every AI visibility gap with step-by-step guides for your CMS. Free scan first — see your pass/fail, then pick the guide that matches your issues.',
  },
}

const platforms = [
  {
    slug: 'wordpress',
    name: 'WordPress',
    emoji: '🔵',
    fixes: 'Schema markup via Yoast/Rank Math, robots.txt AI bot access, llms.txt, and Open Graph for AI crawlers.',
    geoScore: 9,
  },
  {
    slug: 'shopify',
    name: 'Shopify',
    emoji: '🛒',
    fixes: 'Product & Organization schema gaps, AI bot access rules, missing llms.txt, and meta signals.',
    geoScore: 7,
  },
  {
    slug: 'webflow',
    name: 'Webflow',
    emoji: '🌊',
    fixes: 'Custom JSON-LD schema injection, robots.txt configuration, llms.txt creation, and canonical signals.',
    geoScore: 8,
  },
  {
    slug: 'wix',
    name: 'Wix',
    emoji: '⚡',
    fixes: 'Schema workarounds via Wix SEO tools, AI crawler permissions, NAP consistency, and GBP signals.',
    geoScore: 5,
  },
  {
    slug: 'squarespace',
    name: 'Squarespace',
    emoji: '⬛',
    fixes: 'Schema injection via code blocks, robots.txt editing, llms.txt setup, and structured content signals.',
    geoScore: 5,
  },
]

const topIssues = [
  {
    id: 'schema',
    label: 'Missing or broken schema markup',
    impact: 'High',
    description: 'Schema is how AI systems understand what your business does. Without it, you are invisible to AI answers.',
    fixNote: 'Fixed in every platform guide under “Schema Markup” steps.',
  },
  {
    id: 'llms-txt',
    label: 'No llms.txt file',
    impact: 'High',
    description: 'llms.txt tells AI systems what your site is about and how to use your content. Most sites don’t have one.',
    fixNote: 'Each platform guide includes an llms.txt template and exact setup steps.',
  },
  {
    id: 'robots',
    label: 'AI bots blocked in robots.txt',
    impact: 'High',
    description: 'If GPTBot, PerplexityBot, or Googlebot are blocked, AI assistants simply cannot read your site.',
    fixNote: 'Every platform guide covers the exact robots.txt lines to add or remove.',
  },
  {
    id: 'gbp',
    label: 'Incomplete Google Business Profile',
    impact: 'High',
    description: 'An incomplete GBP is the #1 reason local businesses are missing from AI answers about local services.',
    fixNote: 'GBP setup is covered in the WordPress and Shopify guides under “Local Signals”.',
  },
  {
    id: 'nap',
    label: 'Inconsistent NAP across directories',
    impact: 'Medium',
    description: 'Mismatched Name, Address, Phone across Yelp, Apple Maps, and directories lowers your authority with AI.',
    fixNote: 'NAP audit checklist included in every Full GEO Report.',
  },
]

export default function GuidesIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── TOP BANNER ── */}
      <div className="bg-blue-600 text-white px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <Radar className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm font-medium flex-1">
            <strong>Not sure which guides apply to your site?</strong>{' '}
            Start with a free scan — get a personalized pass/fail list in 30 seconds.
          </p>
          <Link
            href="/scan"
            className="flex-shrink-0 px-4 py-1.5 rounded-lg bg-white text-blue-700 text-xs font-bold hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            Run free scan →
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">

        {/* ── HERO ── */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/8 border border-accent/15 text-accent text-xs font-medium mb-5">
            <BookOpen className="w-3.5 h-3.5" />
            Step-by-step GEO fix guides
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-balance">
            Fix your AI visibility gaps — by platform
          </h1>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            Each guide targets the exact GEO issues found on that platform.
            Run a free scan first to see which ones apply to your site — then follow the
            step-by-step fix for your CMS.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors shadow-glow-xs"
            >
              Run my free scan first <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#platform-guides"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-border text-sm font-medium hover:border-accent/30 transition-colors"
            >
              Browse guides by platform ↓
            </a>
          </div>
        </div>

        {/* ── TOP ISSUES ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-accent" />
            Most common GEO issues
          </h2>
          <p className="text-sm text-muted mb-6">
            These are the issues the GEO scanner checks for. Run a scan to see which ones your site has.
          </p>
          <div className="flex flex-col gap-3">
            {topIssues.map(({ id, label, impact, description, fixNote }) => (
              <div
                key={id}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-border hover:border-accent/25 hover:shadow-card-lift transition-all duration-200"
              >
                <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mt-0.5 ${
                  impact === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {impact}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm mb-1">{label}</p>
                  <p className="text-xs text-muted leading-relaxed mb-1.5">{description}</p>
                  <p className="text-xs text-accent/80 font-medium">🔧 {fixNote}</p>
                </div>
                <Link
                  href="/scan"
                  className="flex-shrink-0 text-xs text-accent font-semibold hover:underline mt-0.5 whitespace-nowrap"
                >
                  Does my site have this? →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── PLATFORM GUIDES ── */}
        <section id="platform-guides" className="mb-16">
          <h2 className="text-xl font-bold mb-2">Guides by platform</h2>
          <p className="text-sm text-muted mb-6">
            Each guide covers every GEO fix for that CMS — schema, llms.txt, robots.txt, and more.
          </p>
          <div className="flex flex-col gap-4">
            {platforms.map(({ slug, name, emoji, fixes, geoScore }) => (
              <div
                key={slug}
                className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 rounded-xl bg-white border border-border hover:border-accent/25 hover:shadow-card-lift transition-all duration-200"
              >
                {/* Left: platform info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-[15px]">{name}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        geoScore >= 8
                          ? 'bg-emerald-100 text-emerald-700'
                          : geoScore >= 6
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {geoScore}/10 GEO
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed mb-2">
                      <strong className="text-foreground/80">Fixes: </strong>{fixes}
                    </p>
                    <Link
                      href="/scan"
                      className="text-xs text-muted hover:text-accent transition-colors font-medium"
                    >
                      Run a scan to see if these affect your site →
                    </Link>
                  </div>
                </div>

                {/* Right: guide link */}
                <Link
                  href={`/guides/${slug}`}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/8 border border-accent/20 text-accent text-xs font-semibold hover:bg-accent hover:text-white transition-all whitespace-nowrap"
                >
                  Read {name} guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM SCAN CTA ── */}
        <div className="p-7 rounded-2xl border-2 border-accent/25 bg-accent/4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
            Step 1: Find out which guides apply to you
          </p>
          <h3 className="text-xl font-bold mb-2">
            Run your free scan first
          </h3>
          <p className="text-sm text-muted mb-5 max-w-md mx-auto">
            The free scan gives you a personalized pass/fail on every GEO check — so you only
            read the guides that actually matter for your site.
          </p>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors shadow-glow-xs"
          >
            Run my free scan <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted mt-3">Free · No signup · Results in 30 seconds</p>
          <p className="text-xs text-muted/70 mt-1">
            Want everything? <Link href="/checkout" className="text-accent font-semibold hover:underline">Unlock the Full GEO Report — $29.99 →</Link>
          </p>
        </div>

      </div>

      <Footer />
    </main>
  )
}
