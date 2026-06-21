import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BookOpen, FileText, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Found by AI — The Free AI Visibility Playbook | MyGeoRadar',
  description:
    'The complete free AI visibility playbook — 27-point checklist, 10 copy-paste prompts, 30-day action plan, and step-by-step guide to get your business found by ChatGPT, Perplexity, Gemini, and Claude.',
  openGraph: {
    title: 'Found by AI — The Free AI Visibility Playbook',
    description: 'Stop being invisible to AI assistants. Get the complete free system to fix it.',
    url: 'https://mygeoradar.com/playbook',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Found by AI — The AI Visibility Playbook',
  description:
    'A complete free step-by-step playbook, 27-point checklist, prompt pack, and 30-day action plan to get your business found and recommended by ChatGPT, Perplexity, Gemini, and Claude.',
  url: 'https://mygeoradar.com/playbook',
  author: { '@type': 'Organization', name: 'MyGeoRadar' },
  publisher: { '@type': 'Organization', name: 'MyGeoRadar', url: 'https://mygeoradar.com' },
}

const sections = [
  {
    icon: BookOpen,
    title: 'The Complete AI Visibility Guide',
    tagline: 'How AI assistants decide who to recommend — and how to fix it.',
    href: '/playbook/guide',
    bullets: [
      'How ChatGPT, Perplexity, Gemini & Claude decide which businesses to cite',
      'The 6 core trust signals AI systems look for before recommending you',
      'Every category of fix: citations, schema, content authority, brand consistency',
      'Real before/after examples of AI descriptions after each fix',
    ],
  },
  {
    icon: FileText,
    title: 'The 27-Point AI Visibility Checklist',
    tagline: 'Run it once. Know exactly where you stand.',
    href: '/playbook/checklist',
    bullets: [
      '27 concrete, checkbox-style action items — every one actionable today',
      'Organized into 5 categories: Profile, Citations, Content, Schema, Reviews',
      'Each item rated by impact level so you prioritize the biggest wins first',
      'Designed to be re-run every 90 days as an ongoing audit',
    ],
  },
  {
    icon: Zap,
    title: 'Prompt Pack — 10 Copy-Paste Prompts',
    tagline: 'Know your AI visibility baseline in 10 minutes.',
    href: '/playbook/prompts',
    bullets: [
      '10 prompts: brand awareness, competitor gaps, hallucination detection, citation sourcing',
      'Run across all 4 AI assistants to get a complete picture',
      'Includes a scoring framework to track improvement over time',
      'Re-run after the 30-day plan to measure your exact shift',
    ],
  },
  {
    icon: Shield,
    title: '30-Day Action Plan',
    tagline: 'One task per day. No overwhelm.',
    href: '/playbook/30-day-plan',
    bullets: [
      'A structured day-by-day calendar for your first 30 days',
      'Week 1: Audit — run prompts, score baseline, identify gaps',
      'Week 2: Foundation — fix profiles, citations, NAP consistency',
      'Week 3: Authority — publish content, build schema, strengthen reviews',
      'Week 4: Validation — re-run prompts, compare to baseline',
    ],
  },
]

export default function PlaybookPage() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        {/* ── HERO ── */}
        <section className="relative pt-20 pb-16 px-4 md:px-8 text-center overflow-hidden">
          <div className="absolute inset-0 hero-bg opacity-70 pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium mb-8">
              <BookOpen className="w-3 h-3" />
              Free resource — no signup required
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-3 text-gradient text-balance">
              Found by AI
            </h1>
            <p className="text-xl text-muted mb-5 font-medium">The AI Visibility Playbook — Free</p>
            <p className="text-base text-muted leading-relaxed mb-10 max-w-2xl mx-auto text-pretty">
              Most businesses are completely invisible to ChatGPT, Perplexity, Gemini, and Claude.
              This is the complete free system to fix that — a step-by-step guide, 27-point checklist,
              10 copy-paste prompts, and a 30-day action plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/playbook/guide"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors shadow-glow-xs"
              >
                Start with the Guide <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/playbook/checklist"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-border text-sm font-medium hover:border-accent/30 transition-colors"
              >
                Jump to the Checklist
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOUR SECTIONS ── */}
        <section className="py-20 px-4 md:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 tracking-tight">Everything in the playbook — all free</h2>
            <div className="flex flex-col gap-5">
              {sections.map(({ icon: Icon, title, tagline, href, bullets }) => (
                <div
                  key={href}
                  className="rounded-2xl border border-border bg-white p-7 hover:border-accent/30 hover:shadow-card-lift transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[15px] leading-tight">{title}</h3>
                        <p className="text-sm text-accent font-medium mt-0.5">{tagline}</p>
                      </div>
                    </div>
                    <Link
                      href={href}
                      className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/8 border border-accent/20 text-accent text-xs font-semibold hover:bg-accent hover:text-white transition-all whitespace-nowrap"
                    >
                      Read free <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GUIDES CTA ── */}
        <section className="py-16 px-4 md:px-8 border-t border-border bg-surface/40">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-3">Also free: Platform-specific GEO guides</h2>
            <p className="text-sm text-muted mb-6 max-w-xl mx-auto">
              Step-by-step fix guides for WordPress, Shopify, Webflow, Wix, and Squarespace.
            </p>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-border text-sm font-medium hover:border-accent/30 transition-colors"
            >
              Browse platform guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
