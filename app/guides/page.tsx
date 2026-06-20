import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ArrowRight, Radar, BookOpen, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GEO Fix Guides — How to Get Found by AI Search | MyGeoRadar',
  description:
    'Step-by-step guides to fix every AI visibility gap on your site — schema markup, llms.txt, robots.txt, and more. Tailored for Shopify, WordPress, Wix, Webflow, and Squarespace.',
  openGraph: {
    title: 'GEO Fix Guides — How to Get Found by AI Search | MyGeoRadar',
    description:
      'Fix every AI visibility gap with step-by-step guides for your platform. Free scan first, then pick the guide that matches your issues.',
  },
}

const platforms = [
  {
    slug: 'shopify',
    name: 'Shopify',
    description: 'Fix schema, AI bot access, and structured data on Shopify stores.',
    emoji: '🛍️',
  },
  {
    slug: 'wordpress',
    name: 'WordPress',
    description: 'Add schema markup, fix robots.txt, and create an llms.txt on WordPress.',
    emoji: '🔵',
  },
  {
    slug: 'wix',
    name: 'Wix',
    description: 'Get your Wix site visible to ChatGPT, Perplexity, and Gemini.',
    emoji: '⚡',
  },
  {
    slug: 'webflow',
    name: 'Webflow',
    description: 'Webflow-specific steps for schema, llms.txt, and AI crawler access.',
    emoji: '🌊',
  },
  {
    slug: 'squarespace',
    name: 'Squarespace',
    description: 'Fix AI visibility gaps on Squarespace — schema, structure, and more.',
    emoji: '⬛',
  },
]

const topIssues = [
  {
    id: 'schema',
    label: 'Missing or broken schema markup',
    impact: 'High',
    description: 'Schema markup is how AI systems understand what your business does. Without it, you are invisible to AI answers.',
  },
  {
    id: 'llms-txt',
    label: 'No llms.txt file',
    impact: 'High',
    description: 'llms.txt tells AI systems what your site is about and how to use your content. Most sites don\'t have one.',
  },
  {
    id: 'robots',
    label: 'AI bots blocked in robots.txt',
    impact: 'High',
    description: 'If GPTBot, PerplexityBot, or Googlebot are blocked, AI assistants simply cannot read your site.',
  },
  {
    id: 'gbp',
    label: 'Incomplete Google Business Profile',
    impact: 'High',
    description: 'An incomplete GBP is the #1 reason local businesses are missing from AI answers about local services.',
  },
  {
    id: 'nap',
    label: 'Inconsistent NAP across directories',
    impact: 'Medium',
    description: 'Mismatched Name, Address, Phone across Yelp, Apple Maps, and directories lowers your authority with AI.',
  },
]

export default function GuidesIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── BANNER ── */}
      <div className="bg-accent/8 border-b border-accent/15 px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <Radar className="w-4 h-4 text-accent flex-shrink-0" />
          <p className="text-sm text-foreground">
            <strong>Not sure which guides apply to your site?</strong>{' '}
            Start with a free scan to get a personalized pass/fail list.
          </p>
          <Link
            href="/#scan"
            className="flex-shrink-0 ml-auto px-4 py-1.5 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors"
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
            Step-by-step fix guides
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-balance">
            Fix your AI visibility gaps — one guide at a time
          </h1>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            Each guide covers one specific issue your site might have. Run a free scan first to see which ones apply to you — then follow the exact steps for your platform.
          </p>
        </div>

        {/* ── TOP ISSUES ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-accent" />
            Most common issues
          </h2>
          <div className="flex flex-col gap-3">
            {topIssues.map(({ id, label, impact, description }) => (
              <div
                key={id}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-border hover:border-accent/25 hover:shadow-card-lift transition-all duration-200"
              >
                <span className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mt-0.5 ${
                  impact === 'High' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {impact}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-1">{label}</p>
                  <p className="text-xs text-muted leading-relaxed">{description}</p>
                </div>
                <Link
                  href="/#scan"
                  className="flex-shrink-0 text-xs text-accent font-semibold hover:underline mt-0.5 whitespace-nowrap"
                >
                  Check my site →
                </Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-4 text-center">
            Run a free scan to see which of these your site has — with your exact pass/fail for each check.
          </p>
        </section>

        {/* ── PLATFORM GUIDES ── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6">Guides by platform</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platforms.map(({ slug, name, description, emoji }) => (
              <Link
                key={slug}
                href={`/guides/${slug}`}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-border hover:border-accent/25 hover:shadow-card-lift transition-all duration-200"
              >
                <span className="text-2xl flex-shrink-0">{emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-1">{name} Fix Guides</p>
                  <p className="text-xs text-muted leading-relaxed">{description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── BOTTOM SCAN CTA ── */}
        <div className="p-7 rounded-2xl border border-accent/25 bg-accent/4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
            Step 1: Find out which guides apply to you
          </p>
          <h3 className="text-xl font-bold mb-2">
            Run your free scan first
          </h3>
          <p className="text-sm text-muted mb-5 max-w-md mx-auto">
            The free scan tells you exactly which checks your site passes and fails — so you read only the guides that actually matter for your site.
          </p>
          <Link
            href="/#scan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors shadow-glow-xs"
          >
            Run my free scan <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted mt-3">Free · No signup · Results in 30 seconds</p>
        </div>

      </div>

      <Footer />
    </main>
  )
}
