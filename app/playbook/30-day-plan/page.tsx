import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free 30-Day AI Visibility Action Plan — GEO Calendar for ChatGPT & Perplexity | MyGeoRadar',
  description:
    'Free 30-day day-by-day action plan to improve your AI search visibility. Week-by-week calendar covering audit, citation fixes, schema, content, and review building.',
  openGraph: {
    title: 'Free 30-Day AI Visibility Action Plan',
    description: 'Day-by-day calendar to get your business found by AI assistants in 30 days. Free.',
    url: 'https://mygeoradar.com/playbook/30-day-plan',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Free 30-Day AI Visibility Action Plan — GEO Calendar',
  description: 'A free 30-day day-by-day action plan for improving AI search visibility (GEO). Covers audit, citation building, schema markup, content authority, and review signals.',
  url: 'https://mygeoradar.com/playbook/30-day-plan',
  author: { '@type': 'Organization', name: 'MyGeoRadar' },
  publisher: { '@type': 'Organization', name: 'MyGeoRadar', url: 'https://mygeoradar.com' },
}

const weeks = [
  {
    week: 'Week 1',
    theme: 'Audit — Establish Your Baseline',
    color: 'blue',
    days: [
      { day: 'Day 1', task: 'Run all 10 prompts in ChatGPT', detail: 'Copy every result into a doc. This is your before state.' },
      { day: 'Day 2', task: 'Run all 10 prompts in Perplexity', detail: 'Note differences from ChatGPT — each AI has different data.' },
      { day: 'Day 3', task: 'Run all 10 prompts in Gemini + Claude', detail: 'Complete your 4-platform baseline. Score each with A/B/C/D.' },
      { day: 'Day 4', task: 'Run the 27-point checklist', detail: 'Identify every unchecked item. Sort by High impact first.' },
      { day: 'Day 5', task: 'Audit all directory listings for NAP consistency', detail: 'Google, Yelp, Apple Maps, Bing Places, Facebook. Flag mismatches.' },
      { day: 'Day 6', task: 'Audit GBP completeness', detail: 'Every field, every photo, every attribute. Mark what\'s missing.' },
      { day: 'Day 7', task: 'Review and plan your Week 2 priority list', detail: 'Stack-rank your top 5 fixes by impact. You\'ll execute these next week.' },
    ],
  },
  {
    week: 'Week 2',
    theme: 'Foundation — Fix Profiles and Citations',
    color: 'emerald',
    days: [
      { day: 'Day 8', task: 'Fix NAP mismatches on all major directories', detail: 'Start with Google, Yelp, Apple Maps. Standardize to one exact format.' },
      { day: 'Day 9', task: 'Complete your Google Business Profile', detail: 'Fill every empty field. Add a keyword-rich 150+ word description.' },
      { day: 'Day 10', task: 'Upload 10+ photos to GBP', detail: 'Interior, exterior, team, products/services. Quality over quantity.' },
      { day: 'Day 11', task: 'Submit to 5 new AI-trusted directories', detail: 'Focus on directories that appeared in Prompt #6 results.' },
      { day: 'Day 12', task: 'Submit to 5 more AI-trusted directories', detail: 'Industry-specific platforms (Houzz, Healthgrades, Avvo, etc.) as applicable.' },
      { day: 'Day 13', task: 'Post a GBP update + respond to any unanswered reviews', detail: 'Fresh activity signals to Google and AI systems that you\'re active.' },
      { day: 'Day 14', task: 'Verify all Week 2 changes are live', detail: 'Check each directory. Flag anything still pending.' },
    ],
  },
  {
    week: 'Week 3',
    theme: 'Authority — Content, Schema, and Reviews',
    color: 'violet',
    days: [
      { day: 'Day 15', task: 'Write or rewrite your About page', detail: 'Answer: who you are, what you do, who you serve, why you\'re trusted. 300+ words.' },
      { day: 'Day 16', task: 'Add LocalBusiness or Organization schema to homepage', detail: 'Use Google\'s structured data guide. Validate with Rich Results Test.' },
      { day: 'Day 17', task: 'Publish Article #1 — core expertise topic', detail: '800+ words. Answer a question your customers ask AI assistants.' },
      { day: 'Day 18', task: 'Add FAQ schema to your About page and top service pages', detail: 'Use questions from your Prompt #1–4 results as FAQ source material.' },
      { day: 'Day 19', task: 'Create and publish llms.txt at your domain root', detail: 'Structured plain-text summary of your business for AI crawlers. Keep it under 500 words.' },
      { day: 'Day 20', task: 'Check robots.txt — ensure GPTBot and PerplexityBot are allowed', detail: 'Blocked bots = invisible business. Remove any Disallow rules for AI crawlers.' },
      { day: 'Day 21', task: 'Ask 5 recent customers for a Google review', detail: 'Send a direct link to your GBP review form. Personal outreach converts best.' },
    ],
  },
  {
    week: 'Week 4',
    theme: 'Validation — Measure and Set Your 90-Day Cadence',
    color: 'amber',
    days: [
      { day: 'Day 22', task: 'Publish Article #2 — service or category deep-dive', detail: '800+ words. Target a specific service or customer scenario.' },
      { day: 'Day 23', task: 'Add Product or Service schema to core offering pages', detail: 'Validate. Each page should describe exactly one product or service.' },
      { day: 'Day 24', task: 'Ask 5 more customers for a Google review', detail: 'Aim for at least 10 new reviews by end of Week 4.' },
      { day: 'Day 25', task: 'Audit Open Graph tags across key pages', detail: 'Title, description, and image should be set correctly on homepage, About, and top service pages.' },
      { day: 'Day 26', task: 'Publish Article #3 — answer a top AI search question in your category', detail: 'Use Prompt #3 results to identify what question is driving competitor recommendations.' },
      { day: 'Day 27', task: 'Re-run all 10 prompts across all 4 AI assistants', detail: 'This is your after state. Compare directly to Week 1 results.' },
      { day: 'Day 28–30', task: 'Review before/after, set 90-day maintenance schedule', detail: 'Monthly: new GBP post, 3+ new reviews, audit new directory listings. Quarterly: re-run prompts, refresh content.' },
    ],
  },
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-200',
  emerald: 'bg-emerald-50 border-emerald-200',
  violet: 'bg-violet-50 border-violet-200',
  amber: 'bg-amber-50 border-amber-200',
}

const dotMap: Record<string, string> = {
  blue: 'bg-blue-500',
  emerald: 'bg-emerald-500',
  violet: 'bg-violet-500',
  amber: 'bg-amber-500',
}

export default function ThirtyDayPlanPage() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="relative pt-20 pb-14 px-4 md:px-8 text-center overflow-hidden border-b border-border">
          <div className="absolute inset-0 hero-bg opacity-70 pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto">
            <Link href="/playbook" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Playbook
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-3 text-gradient text-balance">
              30-Day AI Visibility Action Plan
            </h1>
            <p className="text-base text-muted leading-relaxed mb-4 max-w-2xl mx-auto">
              One task per day. Each takes 30–90 minutes. By Day 30 you\'ll have a concrete
              before/after showing exactly how your AI visibility shifted.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium">
              Free · No signup required
            </span>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="flex flex-col gap-10">
            {weeks.map(({ week, theme, color, days }) => (
              <section key={week}>
                <div className={`rounded-2xl border p-5 mb-5 ${colorMap[color]}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${dotMap[color]}`} />
                    <h2 className="font-bold text-base">{week}: {theme}</h2>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {days.map(({ day, task, detail }) => (
                    <div key={day} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border">
                      <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-border mt-0.5" aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-xs font-bold text-accent uppercase tracking-wide">{day}</span>
                          <p className="font-semibold text-sm">{task}</p>
                        </div>
                        <p className="text-xs text-muted mt-1 leading-relaxed">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* After 30 days */}
          <div className="mt-12 p-6 rounded-2xl border border-border bg-white">
            <h2 className="font-bold text-base mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              After Day 30 — Your 90-Day Maintenance Cadence
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { freq: 'Monthly', task: 'Publish 1 new GBP post, collect 3+ new reviews, audit any new directory listings' },
                { freq: 'Quarterly', task: 'Re-run all 10 prompts across all 4 AI assistants, compare to previous baseline' },
                { freq: 'Quarterly', task: 'Publish 1 new article, refresh your About page, check for new AI-trusted directories' },
                { freq: 'Bi-annually', task: 'Full 27-point checklist re-audit, update schema markup, review robots.txt and llms.txt' },
              ].map(({ freq, task }) => (
                <div key={task} className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-xs font-bold text-accent w-24">{freq}</span>
                  <p className="text-sm text-muted leading-relaxed">{task}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Back to playbook */}
          <div className="mt-10 text-center">
            <Link
              href="/playbook"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-white text-sm font-medium hover:border-accent/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to full playbook
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}
