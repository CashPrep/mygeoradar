import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'

export const metadata = {
  title: 'Multi-Location GEO: How to Get Each Branch Cited by AI',
  description: 'Managing AI visibility across multiple locations requires a different strategy than single-location GEO. Here\'s how to structure your entity signals for multi-location businesses.',
  openGraph: {
    title: 'Multi-Location GEO: How to Get Each Branch Cited by AI',
    description: 'Managing AI visibility across multiple locations requires a different strategy. Here\'s how.',
    url: 'https://mygeoradar.com/blog/multi-location-geo',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'MyGeoRadar' }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'Multi-Location GEO: How to Get Each Branch Cited by AI',
    description: 'Managing AI visibility across multiple locations requires a different strategy. Here\'s how.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function MultiLocationGeoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Strategy</Badge>
            <span className="text-xs text-muted">May 16, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            Multi-Location GEO: How to Get Each Branch Cited by AI
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            Managing AI visibility across multiple locations requires a different strategy than single-location GEO. Here&apos;s how to structure your entity signals so each branch gets cited independently.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">The multi-location problem</h2>
          <p>AI engines treat each location as a separate entity. If your Austin branch has a strong GBP and 200 reviews but your Dallas branch has a thin listing and 12 reviews, they will cite Austin and ignore Dallas &mdash; even for users in Dallas. Multi-location GEO means building independent entity signals for each branch, not just the brand as a whole.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Location pages are not optional</h2>
          <p>Each location needs its own page on your website with its own LocalBusiness JSON-LD schema. That schema should include the specific address, phone number, service area, and hours for that location. A generic &ldquo;Locations&rdquo; page with a list of addresses does not create independent entity signals &mdash; it creates one weak signal for the brand.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Per-location GBP setup</h2>
          {[
            'Create a separate Google Business Profile for each physical location',
            'Use the exact same business name format across all profiles (consistency matters more than branding here)',
            'Add location-specific photos, hours, and service areas to each profile individually',
            'Respond to reviews on each profile — activity signals matter for retrieval-based engines like Perplexity',
            'Link each GBP profile to its specific location page, not the homepage',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm text-foreground-dim">{item}</p>
            </div>
          ))}
          <h2 className="text-xl font-bold text-foreground mt-4">Review strategy by location</h2>
          <p>Review volume needs to be distributed, not concentrated. If 90% of your reviews are on the brand-level GBP and each location profile has under 20 reviews, AI engines will cite your brand but not your specific branches. Run location-specific review generation campaigns, routing customers to the GBP for the branch they visited.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Scanning each location separately</h2>
          <p>Run a separate GEO scan for each location using location-specific topics (e.g., &ldquo;best roofer in Austin&rdquo; vs &ldquo;best roofer in Dallas&rdquo;). The scores will differ &mdash; sometimes significantly. That gap tells you which locations need the most work and where your competitors are beating you geographically.</p>
        </div>
        <BlogCta
          heading="Scan your locations and see where you stand"
          subheading="Free score in 5 seconds. Full per-engine breakdown available with your paid report."
        />
      </article>
      <Footer />
    </main>
  )
}
