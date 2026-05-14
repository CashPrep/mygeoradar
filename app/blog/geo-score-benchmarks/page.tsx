import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'What\'s a Good GEO Score? Industry Benchmarks for 2026',
  description: 'Most businesses score below 30 out of 100 on AI visibility. Here are real benchmark data points across industries — and what score you actually need to compete.',
}

export default function GeoScoreBenchmarksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Strategy</Badge>
            <span className="text-xs text-muted">May 13, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            What&apos;s a Good GEO Score? Industry Benchmarks for 2026
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            Most businesses score below 30 out of 100 on AI visibility. Here are real benchmark data points across industries &mdash; and what score you actually need to compete.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">Why benchmarks matter</h2>
          <p>
            A score without context is just a number. Knowing you scored 42/100 on AI visibility means nothing unless you know that the average competitor in your category scores 38. That gap &mdash; four points &mdash; might mean you&apos;re already winning. Or it might mean you&apos;re all equally invisible.
          </p>
          <p>
            GEO scores are still a young metric. Most businesses haven&apos;t even run their first AI visibility scan. That means the benchmarks are shifting fast &mdash; and the businesses that move now are locking in advantages while the baseline is still low.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">The overall baseline: where most businesses start</h2>
          <p>
            Across all industries and business types, the median GEO score for a business that has never actively optimized for AI visibility sits between 18 and 28 out of 100. The breakdown looks roughly like this:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface-2">
                  <th className="text-left p-3 text-foreground font-semibold border-b border-border">Score Range</th>
                  <th className="text-left p-3 text-foreground font-semibold border-b border-border">What It Means</th>
                  <th className="text-left p-3 text-accent font-semibold border-b border-border">Typical Profile</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['0 – 20', 'Effectively invisible in AI answers', 'No schema, thin site, few external citations'],
                  ['21 – 40', 'Occasionally mentioned, inconsistently', 'Some GBP presence, no structured data'],
                  ['41 – 60', 'Regularly cited in relevant queries', 'Good entity clarity, some schema, active reviews'],
                  ['61 – 80', 'Strong presence, cited unprompted', 'Full schema, high topical authority, press mentions'],
                  ['81 – 100', 'Category leader in AI answers', 'Wikipedia entry, Wikidata, massive citation volume'],
                ].map(([range, meaning, profile]) => (
                  <tr key={range} className="border-b border-border/50">
                    <td className="p-3 text-foreground font-medium">{range}</td>
                    <td className="p-3 text-foreground-dim">{meaning}</td>
                    <td className="p-3 text-foreground-dim">{profile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-4">Industry-by-industry benchmarks</h2>
          <p>
            AI visibility varies significantly by category. Some industries have well-established entities (law firms, hospitals, major restaurants) because they&apos;ve been discussed online for decades. Others are virtually unrepresented in AI training data.
          </p>

          {[
            { industry: 'Healthcare & Dentistry', median: '28–35', competitive: '55+', note: 'Regulated content limits what AI will say; entity clarity matters more than topical content here.' },
            { industry: 'Legal Services', median: '22–30', competitive: '50+', note: 'Highly competitive in major cities. Topical authority through educational content is the primary differentiator.' },
            { industry: 'Restaurants & Food', median: '30–40', competitive: '60+', note: 'Review volume is the dominant signal. Yelp and Google reviews are heavily weighted.' },
            { industry: 'Real Estate', median: '20–28', competitive: '48+', note: 'Most agents have weak entity signals. First-movers on structured data win quickly.' },
            { industry: 'Home Services', median: '18–25', competitive: '45+', note: 'Lowest baseline of any major category. Huge opportunity for early movers.' },
            { industry: 'SaaS & Tech', median: '35–45', competitive: '65+', note: 'Tech companies have more content by default. The bar to compete is higher.' },
            { industry: 'E-commerce / Retail', median: '25–33', competitive: '55+', note: 'Product schema and review aggregation are the core signals.' },
          ].map((row) => (
            <div key={row.industry} className="p-4 bg-surface-2 border border-border rounded-xl">
              <div className="flex items-start justify-between gap-4 mb-2">
                <p className="font-semibold text-foreground">{row.industry}</p>
                <div className="flex gap-3 text-xs shrink-0">
                  <span className="text-foreground-dim">Median: <span className="font-medium text-foreground">{row.median}</span></span>
                  <span className="text-foreground-dim">Competitive: <span className="font-medium text-accent">{row.competitive}</span></span>
                </div>
              </div>
              <p className="text-sm">{row.note}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">What score do you actually need?</h2>
          <p>
            The honest answer: you don&apos;t need a perfect score. You need to beat your direct competitors in your geography and category. A 45 in a market where competitors average 22 is more valuable than a 70 in a category where every player is already above 65.
          </p>
          <p>
            The practical threshold for consistent AI citation in most local and regional categories is <strong className="text-foreground">40–50/100</strong>. That&apos;s achievable within 60 to 90 days of focused optimization for most businesses starting from the average baseline.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">The fastest path from 20 to 50</h2>
          {[
            { action: 'Complete your Google Business Profile', impact: '+6 to +10 pts', effort: 'Low — 30 minutes' },
            { action: 'Add LocalBusiness JSON-LD schema', impact: '+8 to +12 pts', effort: 'Low-medium — 1 hour' },
            { action: 'Get listed on 10 top directories', impact: '+5 to +8 pts', effort: 'Medium — 2 to 4 hours' },
            { action: 'Publish 3 authoritative FAQ or guide pages', impact: '+4 to +7 pts', effort: 'Medium — ongoing' },
            { action: 'Generate 20+ recent Google reviews', impact: '+4 to +6 pts', effort: 'Medium — campaign required' },
          ].map((item) => (
            <div key={item.action} className="flex items-start gap-3">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <div>
                <p className="text-sm text-foreground font-medium">{item.action}</p>
                <p className="text-xs text-foreground-dim mt-0.5">Impact: {item.impact} &middot; Effort: {item.effort}</p>
              </div>
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">Track your score over time</h2>
          <p>
            GEO scores fluctuate as AI models update, competitors optimize, and your citation volume changes. A one-time scan gives you a baseline; monthly rescans show you whether your efforts are working and alert you to competitive movement.
          </p>
        </div>

        <div className="mt-10 p-6 bg-surface-2 border border-border rounded-xl flex flex-col gap-4">
          <p className="font-semibold text-foreground">See where your score stands</p>
          <p className="text-sm text-foreground-dim">Run a free scan and get your score against these benchmarks in under 60 seconds.</p>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors w-fit"
          >
            Run my free scan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </article>
      <Footer />
    </main>
  )
}
