import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'What Is AI Visibility and Why Does It Matter for Your Business?',
  description: 'AI visibility is how often and how prominently your business appears when AI tools like ChatGPT, Perplexity, and Gemini answer questions in your category.',
  openGraph: {
    title: 'What Is AI Visibility and Why Does It Matter for Your Business?',
    description: 'AI visibility is how often and how prominently your business appears when AI tools answer questions in your category.',
    url: 'https://mygeoradar.com/blog/what-is-ai-visibility',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'What Is AI Visibility — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-29T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'What Is AI Visibility and Why Does It Matter for Your Business?',
    description: 'AI visibility is how often and how prominently your business appears when AI tools answer questions in your category.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function WhatIsAiVisibilityPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="What Is AI Visibility and Why Does It Matter for Your Business?"
        description="AI visibility is how often and how prominently your business appears when AI tools like ChatGPT, Perplexity, and Gemini answer questions in your category."
        url="https://mygeoradar.com/blog/what-is-ai-visibility"
        publishedTime="2026-05-29T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">GEO Basics</Badge>
            <span className="text-xs text-muted">May 29, 2026 &middot; 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            What Is AI Visibility and Why Does It Matter for Your Business?
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            AI visibility is how often and how prominently your business appears when AI tools like ChatGPT, Perplexity, and Gemini answer questions in your category. Here is why it is becoming a critical business metric.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">A new surface, a new metric</h2>
          <p>Five years ago, visibility meant your Google ranking. Three years ago it expanded to include review platforms, social profiles, and local packs. Today there is a new surface that most businesses are not measuring at all: AI-generated answers.</p>
          <p>When someone asks Perplexity &ldquo;what&apos;s the best accountant near me&rdquo; or asks ChatGPT &ldquo;which roofing companies should I call in Phoenix,&rdquo; those AI tools generate a direct answer &mdash; and that answer either includes your business or it doesn&apos;t. AI visibility measures how consistently you appear in those answers.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">How it&apos;s measured</h2>
          <p>AI visibility is typically expressed as a score based on how many signals AI models use to evaluate and cite businesses. These signals include your Google Business Profile completeness, schema markup, citation consistency, review volume and recency, and the presence of content that directly answers category-level questions.</p>

          <BlogMidCta
            topic="AI Visibility Score"
            hook="Your AI visibility score tells you exactly where you stand across the 5 AI models that matter most. Run your free scan to see how you&apos;re showing up — or not."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">Why it matters now</h2>
          <p>AI search usage is growing fastest among high-intent buyers &mdash; people researching services, comparing options, and making purchase decisions. These are exactly the users you most want to reach. A business with low AI visibility is invisible to a growing segment of its most valuable prospects.</p>
          <p>Unlike Google rankings, which take months to shift, AI visibility can improve meaningfully in weeks once you address the right signals. That asymmetry makes it one of the highest-ROI investments in your marketing stack right now.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">How to improve it</h2>
          <p>The fastest wins come from GBP optimization, schema markup, citation cleanup, and review velocity. Content strategy builds authority over time. The key is measuring your baseline first, so you know which signals are weakest and where to focus.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'what-is-geo',              title: "What is GEO? The Beginner's Guide",                         tag: 'GEO Basics' },
            { slug: 'geo-score-benchmarks',      title: "What's a Good GEO Score? Industry Benchmarks for 2026",    tag: 'Strategy'   },
            { slug: 'geo-for-beginners-checklist', title: 'GEO Checklist for Beginners: 10 Things in Your First 30 Days', tag: 'GEO Basics' },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
