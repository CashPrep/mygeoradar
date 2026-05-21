import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'

export const metadata = {
  title: 'Multi-Location GEO: How Chains and Franchises Should Handle AI Visibility',
  description: 'Managing AI visibility across 10, 50, or 500 locations is a different challenge from single-location GEO. Here’s the right architecture.',
  openGraph: {
    title: 'Multi-Location GEO: How Chains and Franchises Should Handle AI Visibility',
    description: 'Managing AI visibility across 10, 50, or 500 locations is a different challenge. Here’s the right architecture.',
    url: 'https://mygeoradar.com/blog/multi-location-geo',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630 }],
    type: 'article',
    publishedTime: '2026-05-07T00:00:00.000Z',
  },
  twitter: { card: 'summary_large_image', site: '@MyGEORadar', images: ['https://mygeoradar.com/og-image.png'] },
}

export default function MultiLocationGeoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Local GEO</Badge>
            <span className="text-xs text-muted">May 7, 2026 &middot; 8 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            Multi-Location GEO: How Chains and Franchises Should Handle AI Visibility
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Single-location GEO is straightforward. Managing AI visibility across 10, 50, or 500 locations is a different challenge entirely.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">The brand vs. location problem</h2>
          <p>Multi-location businesses face a tension: AI models need to understand both the parent brand and each individual location. A query like &ldquo;best burger place near me&rdquo; needs to surface your specific location — not just acknowledge your brand exists. This requires a two-tier GEO strategy: brand-level signals and location-level signals.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Brand-level signals</h2>
          <p>At the brand level, you need a strong Wikipedia or Wikidata presence, consistent brand description across all locations’ structured data, editorial coverage that names the brand, and a brand-level Google Business Profile where applicable. These signals train AI models to understand what your brand is and why it’s credible.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Location-level signals</h2>
          <p>Each location needs its own complete GBP, its own LocalBusiness schema with unique address and phone, its own citation footprint on local directories, and ideally its own local press mention. Sharing a single GBP across locations is one of the most common multi-location GEO mistakes — and it significantly suppresses local AI mentions.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The priority order for scaling</h2>
          <p>If you have limited resources, prioritize your highest-revenue locations first. Get each one to a solid baseline (complete GBP, schema, 10 directory citations) before moving on. A fully optimized location delivers dramatically more value than ten half-optimized locations.</p>
        </div>
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
