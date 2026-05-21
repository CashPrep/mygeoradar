import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'

export const metadata = {
  title: "What's a Good GEO Score? Industry Benchmarks for 2026",
  description: 'Most businesses score below 30 out of 100 on AI visibility. Here are real benchmark data points across industries.',
  openGraph: {
    title: "What's a Good GEO Score? Industry Benchmarks for 2026",
    description: 'Most businesses score below 30 out of 100 on AI visibility. Here are real benchmark data points across industries.',
    url: 'https://mygeoradar.com/blog/geo-score-benchmarks',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630 }],
    type: 'article',
    publishedTime: '2026-05-13T00:00:00.000Z',
  },
  twitter: { card: 'summary_large_image', site: '@MyGEORadar', images: ['https://mygeoradar.com/og-image.png'] },
}

export default function GeoBenchmarksPage() {
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
          <p className="text-lg text-muted leading-relaxed">
            Most businesses score below 30 out of 100 on AI visibility. Here are real benchmark data points across industries — and what score you actually need to compete.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">The baseline is low — that’s good news</h2>
          <p>The overwhelming majority of small and medium businesses have never taken a single action to improve their AI visibility. That means the bar for standing out is genuinely low right now. Businesses that implement even the foundational fixes — complete GBP, schema markup, consistent directory listings — immediately outperform 80%+ of their local competitors in AI mentions.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Rough benchmarks by category</h2>
          {[
            { category: 'National brands / chains',       score: '60–80', note: 'High editorial coverage, structured data, Wikipedia presence' },
            { category: 'Established local professionals', score: '30–55', note: 'GBP complete, some reviews, occasional press mentions' },
            { category: 'Average SMB',                    score: '10–30', note: 'Basic web presence, incomplete GBP, few citations' },
            { category: 'New or invisible businesses',    score: '0–10',  note: 'No schema, unclaimed GBP, no directory presence' },
          ].map(({ category, score, note }) => (
            <div key={category} className="flex gap-4 p-4 rounded-lg bg-surface border border-border">
              <div className="flex-shrink-0 text-center">
                <span className="text-lg font-bold text-accent">{score}</span>
                <p className="text-xs text-muted">/100</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{category}</p>
                <p className="text-xs text-muted mt-0.5">{note}</p>
              </div>
            </div>
          ))}
          <h2 className="text-xl font-bold text-foreground mt-4">What score do you actually need?</h2>
          <p>You don’t need a perfect score — you need to score higher than your local competitors on the queries that matter to your category. In most local markets, a score of 45–55 is enough to become the default AI recommendation for your business type. That’s achievable in 30–60 days with focused action.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The fastest way to move your score</h2>
          <p>The highest-leverage actions in order: complete your Google Business Profile fully, add LocalBusiness schema to your website, get consistent NAP citations across 10+ directories, and build one authoritative editorial mention. These four steps alone can move most businesses from below 20 to above 40.</p>
        </div>
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
