import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'

export const metadata = {
  title: 'GEO Before Launch: Why AI Visibility Should Be Day-One Infrastructure',
  description: 'Most businesses treat AI visibility as an afterthought. Here\'s why you should build GEO infrastructure before you launch — and what that looks like in practice.',
  openGraph: {
    title: 'GEO Before Launch: Why AI Visibility Should Be Day-One Infrastructure',
    description: 'Most businesses treat AI visibility as an afterthought. Here\'s why you should build GEO infrastructure before you launch.',
    url: 'https://mygeoradar.com/blog/geo-before-launch',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'MyGeoRadar' }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'GEO Before Launch: Why AI Visibility Should Be Day-One Infrastructure',
    description: 'Most businesses treat AI visibility as an afterthought. Here\'s why you should build GEO before you launch.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function GeoBeforeLaunchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Strategy</Badge>
            <span className="text-xs text-muted">May 14, 2026 &middot; 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            GEO Before Launch: Why AI Visibility Should Be Day-One Infrastructure
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            Most businesses treat AI visibility as an afterthought. Here&apos;s why you should build GEO infrastructure before you launch &mdash; and what that looks like in practice.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">The compounding advantage of early signals</h2>
          <p>AI models learn from the web over time. The earlier your business has clean entity signals, structured data, and directory presence, the earlier that data enters training pipelines and retrieval indexes. A business that launches with complete GEO infrastructure on day one has a compounding head start over a competitor that adds it six months later.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">What to build before launch</h2>
          {[
            { title: 'LocalBusiness JSON-LD schema', desc: 'Add this to your homepage on day one. Name, address, phone, URL, opening hours, service area. This is the single highest-leverage technical action for AI visibility.' },
            { title: 'Google Business Profile', desc: 'Claim and fully complete your GBP before you open. Add photos, hours, services, and your exact business description. The data feeds directly into Gemini and Google AI Overviews.' },
            { title: 'Core directory listings', desc: 'Submit to Yelp, BBB, Apple Maps, Bing Places, and the top 5 industry-specific directories before launch. NAP consistency from day one avoids the cleanup work most businesses eventually face.' },
            { title: 'An About page with entity signals', desc: 'Write a clear, factual About page that states who you are, what you do, where you operate, how long you\'ve been in business, and any credentials. This is what AI cites when it describes you.' },
            { title: 'An FAQ page', desc: 'Publish answers to the 5-10 most common questions customers ask about your category. AI engines are specifically trained to surface FAQ content in answer to conversational queries.' },
          ].map((item) => (
            <div key={item.title} className="p-4 bg-surface-2 border border-border rounded-xl">
              <p className="font-semibold text-foreground mb-1">{item.title}</p>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
          <h2 className="text-xl font-bold text-foreground mt-4">The cost of not doing this at launch</h2>
          <p>Every month you operate without clean GEO signals is a month where AI models are building an impression of your business from incomplete or inconsistent data. That impression is hard to correct. Schema and directory listings that go in after launch don&apos;t retroactively fix the gap &mdash; they just start the clock on improvement from wherever you are now.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">How to verify your day-one baseline</h2>
          <p>Run a scan within the first week of launch. Your score will be low &mdash; that&apos;s expected for a new business. What you&apos;re looking for is a clean baseline with structured data in place and no hallucination errors. That&apos;s the foundation everything else builds on.</p>
        </div>
        <BlogCta
          heading="Check your launch-day AI visibility baseline"
          subheading="Free score in 5 seconds. See what AI engines already know about your business."
        />
      </article>
      <Footer />
    </main>
  )
}
