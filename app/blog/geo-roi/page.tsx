import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'What Is the ROI of GEO? How to Measure AI Visibility Impact on Revenue',
  description: 'GEO is not just a vanity metric. Here is how to measure the real business impact of improving your AI visibility score — and what ROI looks like at different business sizes.',
  openGraph: {
    title: 'What Is the ROI of GEO? How to Measure AI Visibility Impact on Revenue',
    description: 'GEO is not just a vanity metric. Here is how to measure the real business impact of improving your AI visibility score.',
    url: 'https://mygeoradar.com/blog/geo-roi',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'ROI of GEO — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-26T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'What Is the ROI of GEO? How to Measure AI Visibility Impact on Revenue',
    description: 'GEO is not just a vanity metric. Here is how to measure the real business impact of improving your AI visibility score.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function GeoRoiPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="What Is the ROI of GEO? How to Measure AI Visibility Impact on Revenue"
        description="GEO is not just a vanity metric. Here is how to measure the real business impact of improving your AI visibility score — and what ROI looks like at different business sizes."
        url="https://mygeoradar.com/blog/geo-roi"
        publishedTime="2026-05-26T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Strategy</Badge>
            <span className="text-xs text-muted">May 26, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            What Is the ROI of GEO? How to Measure AI Visibility Impact on Revenue
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            GEO is not just a vanity metric. Here is how to measure the real business impact of improving your AI visibility score &mdash; and what ROI looks like at different business sizes.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">Why GEO ROI is hard to track directly</h2>
          <p>Unlike paid ads, GEO doesn&apos;t have a clean attribution model. A customer who found you via a Perplexity answer will typically arrive on your website through a direct search or branded click, making the original AI referral invisible to most analytics setups. This is a measurement problem, not a ROI problem &mdash; the value is real even when it&apos;s hard to attribute.</p>
          <p>The best approach is to track leading indicators alongside revenue: AI mention frequency, direct traffic growth, branded search volume, and inbound inquiry quality. When all of these trend up after a GEO push, the connection is clear even without perfect attribution.</p>

          <BlogMidCta
            topic="GEO ROI and Strategy"
            hook="The Found by AI Playbook includes a simple ROI tracking worksheet that ties your GEO signals to revenue metrics — even without perfect attribution data."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">The ROI math for service businesses</h2>
          <p>For local service businesses, AI visibility converts to revenue through a simple chain: AI mention &rarr; brand name search &rarr; website visit &rarr; call or form fill &rarr; booked job. The average local service job value sits between $300 and $2,000 depending on category. If improving your AI visibility generates 3 additional inbound leads per month and you close 2 of them, the monthly revenue impact is $600&ndash;$4,000 from a one-time setup effort that costs almost nothing.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The ROI math for SaaS and e-commerce</h2>
          <p>For SaaS and e-commerce, the chain is longer but the scale is larger: AI recommendation &rarr; branded search &rarr; trial signup or product page &rarr; purchase. The key metric here is share of category mentions &mdash; when someone asks ChatGPT to recommend tools in your space, how often is your product named? Each incremental mention percentage point represents a meaningful revenue delta at scale.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">How to measure your AI visibility baseline</h2>
          <p>The first step is knowing your current score. Run an audit to understand which AI platforms are mentioning you, how prominently, and with what accuracy. Then track that score monthly. A score improvement from 25 to 55 over 90 days, combined with rising branded search volume, is a strong signal that GEO investment is compounding.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'geo-score-benchmarks',    title: "What's a Good GEO Score? Industry Benchmarks for 2026", tag: 'Strategy'   },
            { slug: 'what-is-ai-visibility',   title: 'What Is AI Visibility and Why Does It Matter?',          tag: 'GEO Basics' },
            { slug: 'geo-competitive-analysis', title: 'GEO Competitive Analysis: See Where You Stand vs Competitors', tag: 'Strategy' },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
