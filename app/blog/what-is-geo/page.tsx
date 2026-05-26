import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'What is GEO? Generative Engine Optimization Explained',
  description: "GEO is the practice of optimizing your business to appear in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude. Here's what it is, why it matters, and how to start.",
  openGraph: {
    title: 'What is GEO? Generative Engine Optimization Explained',
    description: "GEO is the practice of optimizing your business to appear in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude.",
    url: 'https://mygeoradar.com/blog/what-is-geo',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'What is GEO? — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-10T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'What is GEO? Generative Engine Optimization Explained',
    description: "GEO is the practice of optimizing your business to appear in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude.",
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function WhatIsGeoPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="What is GEO? Generative Engine Optimization Explained"
        description="GEO is the practice of optimizing your business to appear in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude. Here's what it is, why it matters, and how to start."
        url="https://mygeoradar.com/blog/what-is-geo"
        publishedTime="2026-05-10T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">GEO Basics</Badge>
            <span className="text-xs text-muted">May 10, 2026 &middot; 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            What is GEO? The Beginner&apos;s Guide to Generative Engine Optimization
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Traditional SEO gets you on Google. GEO gets you cited in AI answers. Here&apos;s what it is, why it matters, and how to start.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">The shift from search to answer</h2>
          <p>When someone types &ldquo;best personal injury lawyer in Austin&rdquo; into ChatGPT, they don&apos;t get a list of blue links. They get a direct answer. That answer names specific firms, explains why they&apos;re recommended, and cites sources. If your business isn&apos;t in that answer, you don&apos;t exist &mdash; not for that user, at that moment.</p>
          <p>This is the fundamental shift GEO addresses. Traditional SEO optimizes for Google&apos;s ten-blue-links format. GEO optimizes for AI-generated responses &mdash; a different surface, different signals, and a growing share of how people find businesses.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Why this matters now</h2>
          <p>AI search usage has grown from a curiosity to a primary research channel for a meaningful share of consumers &mdash; especially for high-consideration purchases. People are using ChatGPT to pick lawyers, dentists, contractors, and software tools. If you&apos;re not showing up, a competitor is.</p>

          <BlogMidCta
            topic="Complete GEO Implementation System"
            hook="Reading about GEO is step one. The playbook gives you the exact checklist, prompts, and 30-day plan to actually implement it — no guesswork, no piecing together blog posts."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">What GEO actually optimizes</h2>
          <p>Unlike traditional SEO, GEO is less about keywords and more about entity clarity — how clearly an AI can identify who you are, what you do, where you are, and why you&apos;re credible. The key signals:</p>
          {['Structured data (LocalBusiness, FAQPage, AggregateRating schema)', 'Google Business Profile completeness and review volume', 'Entity consistency across directories and citation sources', 'Topical authority — do you have content that answers the questions AI is being asked?', 'Editorial mentions in authoritative sources'].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}
          <h2 className="text-xl font-bold text-foreground mt-4">Where to start</h2>
          <p>The fastest path is a structured, step-by-step checklist that walks you through every signal in priority order. Most businesses can move from invisible to occasionally cited within 30 to 60 days of focused effort on the right things.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'geo-vs-seo',               title: 'GEO vs SEO: What Is the Difference?',                      tag: 'GEO Basics'    },
            { slug: 'ai-search-guide',           title: 'How AI Search Engines Decide Which Businesses to Mention', tag: 'AI Search'     },
            { slug: 'does-my-business-need-geo', title: 'Does My Business Need GEO?',                              tag: 'GEO Basics'    },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
