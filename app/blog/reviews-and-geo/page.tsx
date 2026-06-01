import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'How Online Reviews Directly Impact Your AI Visibility Score',
  description: 'AI tools read and summarize your reviews to decide how authoritative your business is. Here is the direct link between review quantity, recency, and your GEO score.',
  openGraph: {
    title: 'How Online Reviews Directly Impact Your AI Visibility Score',
    description: 'AI tools read and summarize your reviews to decide how authoritative your business is. Here is the direct link between reviews and your GEO score.',
    url: 'https://mygeoradar.com/blog/reviews-and-geo',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'Reviews and GEO — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-15T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'How Online Reviews Directly Impact Your AI Visibility Score',
    description: 'AI tools read and summarize your reviews to decide how authoritative your business is.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function ReviewsAndGeoPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="How Online Reviews Directly Impact Your AI Visibility Score"
        description="AI tools read and summarize your reviews to decide how authoritative your business is. Here is the direct link between review quantity, recency, and your GEO score."
        url="https://mygeoradar.com/blog/reviews-and-geo"
        publishedTime="2026-05-15T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Reviews &amp; Citations</Badge>
            <span className="text-xs text-muted">May 15, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            How Online Reviews Directly Impact Your AI Visibility Score
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            AI tools read and summarize your reviews to decide how authoritative your business is. Here is the direct link between review quantity, recency, and your GEO score.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">Reviews as a trust signal for AI</h2>
          <p>Traditional SEO uses reviews primarily as a ranking signal in the local pack. AI models use them differently &mdash; they actually read them. When Gemini or Perplexity generates an answer about which plumber to call in your city, it has read hundreds of reviews across the top businesses in that category and is summarizing what customers collectively say about each one.</p>
          <p>This means reviews are a content source for AI, not just a credibility badge. The words your customers use in reviews become part of how AI describes your business. A business with 150 recent reviews mentioning &ldquo;fast response time&rdquo; and &ldquo;transparent pricing&rdquo; will be described with those exact attributes when AI generates a recommendation. A business with 12 old reviews provides almost no signal.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The three review signals that matter most</h2>
          {[
            ['Volume', 'The more reviews you have, the more data AI has to work with. Businesses with fewer than 30 reviews are often skipped entirely in favor of better-documented competitors.'],
            ['Recency', 'AI platforms weight recent reviews more heavily because they reflect the current state of the business. A review from last month matters more than one from 2022.'],
            ['Content depth', 'Reviews that mention specific services, staff names, or outcomes give AI more to work with than generic "great service" reviews. Longer, detailed reviews carry more signal weight.'],
          ].map(([label, desc]) => (
            <div key={label} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm"><strong className="text-foreground">{label}:</strong> {desc}</p>
            </div>
          ))}

          <BlogMidCta
            topic="Review Strategy for GEO"
            hook="The Found by AI Playbook includes a done-for-you review request script, a 30-day review velocity plan, and a guide to responding to reviews in a way that adds GEO signal."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">Where AI reads reviews from</h2>
          <p>Google Reviews is the dominant source for most AI platforms, but it is not the only one. Yelp is heavily weighted for restaurant, home services, and retail categories. Healthgrades and Zocdoc matter for healthcare. G2 and Capterra matter for SaaS. The platforms you need to prioritize for review building depend on your industry &mdash; but Google is almost always the first priority.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The fastest way to improve your review signal</h2>
          <p>Ask every satisfied customer for a review immediately after the service is delivered, while the experience is fresh. The most effective method is a direct text message with a one-tap link to your Google review page. A simple, non-incentivized ask (&ldquo;Would you mind leaving us a quick Google review? It really helps.&rdquo;) converts at 20&ndash;40% with warm customers. Do this consistently and your review velocity compounds fast.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'how-to-get-more-google-reviews', title: 'How to Get More Google Reviews That Actually Improve AI Visibility', tag: 'Reviews & Citations' },
            { slug: 'citation-building-for-geo',       title: 'Citation Building for GEO: Which Directories Actually Matter',      tag: 'Reviews & Citations' },
            { slug: 'google-business-profile-geo',     title: 'Why Google Business Profile Is Your Most Important GEO Asset',      tag: 'Local GEO' },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
