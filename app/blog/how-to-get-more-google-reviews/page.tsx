import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'How to Get More Google Reviews (That Actually Improve Your AI Visibility)',
  description: 'Volume and recency of Google reviews are two of the strongest GEO signals. Here is a practical playbook for getting more reviews without violating Google policy.',
  openGraph: {
    title: 'How to Get More Google Reviews (That Actually Improve Your AI Visibility)',
    description: 'Volume and recency of Google reviews are two of the strongest GEO signals. Here is a practical playbook for getting more reviews.',
    url: 'https://mygeoradar.com/blog/how-to-get-more-google-reviews',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'How to Get More Google Reviews — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-16T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'How to Get More Google Reviews (That Actually Improve Your AI Visibility)',
    description: 'Volume and recency of Google reviews are two of the strongest GEO signals. Here is a practical playbook for getting more reviews.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function HowToGetMoreReviewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="How to Get More Google Reviews (That Actually Improve Your AI Visibility)"
        description="Volume and recency of Google reviews are two of the strongest GEO signals. Here is a practical playbook for getting more reviews without violating Google policy."
        url="https://mygeoradar.com/blog/how-to-get-more-google-reviews"
        publishedTime="2026-05-16T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Reviews &amp; Citations</Badge>
            <span className="text-xs text-muted">May 16, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            How to Get More Google Reviews (That Actually Improve Your AI Visibility)
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Volume and recency of Google reviews are two of the strongest GEO signals. Here is a practical playbook for getting more reviews without violating Google policy.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">Why most businesses have too few reviews</h2>
          <p>The average local business gets a review from about 5% of its customers without actively asking. With a simple ask, that rate jumps to 20&ndash;40%. The gap between a business with 15 reviews and one with 200 reviews is almost entirely explained by whether or not someone asked. The good news: this is the easiest GEO signal to improve because it costs nothing and scales with every job you close.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The review request playbook</h2>
          {[
            { step: '1. Get your review link', detail: 'Go to your Google Business Profile dashboard → click "Ask for reviews" → copy the short link. This is the direct link to your review form — no searching required for the customer.' },
            { step: '2. Ask at peak satisfaction', detail: 'The best moment to ask is immediately after a successful job completion, before the customer has left or the conversation has ended. Ask verbally first: "We really appreciate your business — would you mind leaving us a quick Google review?"' },
            { step: '3. Send a one-tap text follow-up', detail: 'Within 30 minutes of the job, send a simple text: "Hi [Name], thanks so much for choosing us today! If you have 30 seconds, a Google review would mean a lot: [link]. Thanks!"' },
            { step: '4. Follow up once via email', detail: 'For clients with email on file, send one follow-up 24 hours later if they haven\'t left a review. Keep it short and personal. One follow-up only — never more.' },
            { step: '5. Add the link to receipts and invoices', detail: 'A QR code linking to your review page on every invoice or receipt generates passive review velocity with zero extra effort.' },
          ].map(({ step, detail }) => (
            <div key={step} className="p-4 rounded-xl bg-surface border border-border">
              <p className="font-semibold text-foreground text-sm">{step}</p>
              <p className="text-xs text-muted mt-1">{detail}</p>
            </div>
          ))}

          <BlogMidCta
            topic="Review Velocity Strategy"
            hook="The Found by AI Playbook includes a plug-and-play SMS and email review request template, plus a 30-day review campaign calendar you can hand to any team member."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">What not to do</h2>
          <p>Google&apos;s review policy prohibits incentivized reviews (offering discounts, gifts, or cash for reviews), review gating (only asking happy customers and filtering out unhappy ones), and bulk review acquisition through third-party services. Violating these policies risks having your reviews removed or your GBP penalized. The organic playbook above is both safer and more sustainable.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">How to make reviews work harder for GEO</h2>
          <p>When customers ask what to write, you can say: &ldquo;Anything honest is great &mdash; if you want to mention the specific service or what stood out, that&apos;s always helpful for other customers.&rdquo; This naturally encourages more detailed, keyword-rich reviews without coaching, which is exactly what AI models reward when generating recommendations.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'reviews-and-geo',             title: 'How Online Reviews Directly Impact Your AI Visibility Score',   tag: 'Reviews & Citations' },
            { slug: 'citation-building-for-geo',    title: 'Citation Building for GEO: Which Directories Actually Matter', tag: 'Reviews & Citations' },
            { slug: 'google-business-profile-geo',  title: 'Why Google Business Profile Is Your Most Important GEO Asset',  tag: 'Local GEO' },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
