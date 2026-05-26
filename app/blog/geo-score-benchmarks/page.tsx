import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: "What's a Good GEO Score? Industry Benchmarks for 2026",
  description: 'Most businesses have taken little or no action on AI visibility. Here are estimated benchmark ranges across business types — and what score you need to compete.',
  openGraph: {
    title: "What's a Good GEO Score? Industry Benchmarks for 2026",
    description: 'Most businesses have taken little or no action on AI visibility. Here are estimated benchmark ranges across business types — and what score you need to compete.',
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
      <BlogArticleSchema
        title="What's a Good GEO Score? Industry Benchmarks for 2026"
        description="Most businesses have taken little or no action on AI visibility. Here are estimated benchmark ranges across business types — and what score you need to compete."
        url="https://mygeoradar.com/blog/geo-score-benchmarks"
        publishedTime="2026-05-13T00:00:00.000Z"
      />
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
            Most businesses have taken little or no deliberate action to improve their AI visibility. That makes the bar for standing out genuinely low right now — and the ranges below reflect what we observe across business types.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">The baseline is low — that&apos;s good news</h2>
          <p>The vast majority of small and medium businesses have never taken a single action to improve their AI visibility. That means businesses that implement even the foundational fixes — a complete GBP, schema markup, consistent directory listings — tend to outperform most of their local competitors in AI mentions almost immediately. The window to establish that edge early is still open.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Estimated ranges by business type</h2>
          <p className="text-sm">These ranges are based on observed patterns across the businesses we audit — not a statistically certified study, but a practical guide for knowing roughly where you likely stand.</p>
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

          <BlogMidCta
            topic="Score Improvement System"
            hook="The playbook’s 27-point checklist is built around the exact actions that move a business from sub-30 to above 45 fastest — the four highest-leverage items are covered in detail, with step-by-step instructions for each."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">What score do you actually need?</h2>
          <p>You don&apos;t need a perfect score — you need to score higher than your local competitors on the queries that matter to your category. In most local markets, a score in the 45–55 range is enough to become the default AI recommendation for your business type. That&apos;s achievable in 30–60 days with focused action on the right signals.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The fastest way to move your score</h2>
          <p>The highest-leverage actions in order: complete your Google Business Profile fully, add LocalBusiness schema to your website, get consistent NAP citations across 10+ directories, and build one authoritative editorial mention. These four steps alone can move most businesses from the sub-20 range to above 40.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'does-my-business-need-geo',  title: 'Does My Business Need GEO?',                             tag: 'GEO Basics'    },
            { slug: 'schema-markup-for-geo',       title: 'Schema Markup and GEO: Why Structured Data Is Critical', tag: 'Technical GEO' },
            { slug: 'how-long-does-geo-take',      title: 'How Long Does GEO Take to Work?',                       tag: 'GEO Basics'    },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
