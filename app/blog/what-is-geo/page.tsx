import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'

export const metadata = {
  title: 'What is GEO? Generative Engine Optimization Explained',
  description: 'GEO is the practice of optimizing your business to appear in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude. Here\'s what it is, why it matters, and how to start.',
  openGraph: {
    title: 'What is GEO? Generative Engine Optimization Explained',
    description: 'GEO is the practice of optimizing your business to appear in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude.',
    url: 'https://mygeoradar.com/blog/what-is-geo',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'MyGeoRadar' }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'What is GEO? Generative Engine Optimization Explained',
    description: 'GEO is the practice of optimizing your business to appear in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function WhatIsGeoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Explainer</Badge>
            <span className="text-xs text-muted">May 10, 2026 &middot; 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            What is GEO? Generative Engine Optimization Explained
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            GEO is the practice of optimizing your business to appear in AI-generated answers. Here&apos;s what it is, why it matters, and how to start.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">The shift from search to answer</h2>
          <p>When someone types &ldquo;best personal injury lawyer in Austin&rdquo; into ChatGPT, they don&apos;t get a list of blue links. They get a direct answer. That answer names specific firms, explains why they&apos;re recommended, and cites sources. If your business isn&apos;t in that answer, you don&apos;t exist &mdash; not for that user, at that moment.</p>
          <p>This is the fundamental shift GEO addresses. Traditional SEO optimizes for Google&apos;s 10-blue-links format. GEO optimizes for AI-generated responses &mdash; a different surface, different signals, and a growing share of how people find businesses.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Why this matters now</h2>
          <p>AI search usage has grown from a curiosity to a primary research channel for a meaningful share of consumers &mdash; especially for high-consideration purchases. People are using ChatGPT to pick lawyers, dentists, contractors, and software tools. If you&apos;re not showing up, a competitor is.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">What GEO actually optimizes</h2>
          <p>Unlike traditional SEO, GEO is less about keywords and more about entity clarity &mdash; how clearly an AI can identify who you are, what you do, where you are, and why you&apos;re credible. The key signals:</p>
          {['Structured data (LocalBusiness, FAQPage, AggregateRating schema)', 'Google Business Profile completeness and review volume', 'Entity consistency across directories and citation sources', 'Topical authority — do you have content that answers the questions AI is being asked?', 'Editorial mentions in authoritative sources'].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm text-foreground-dim">{item}</p>
            </div>
          ))}
          <h2 className="text-xl font-bold text-foreground mt-4">How to measure it</h2>
          <p>You can&apos;t improve what you can&apos;t measure. A GEO score gives you a baseline: how often each AI engine mentions your business across relevant queries, how positive those mentions are, and how prominently you appear. That score becomes your north star for improvement work.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Where to start</h2>
          <p>Start with a scan. See your current score across ChatGPT, Perplexity, Gemini, and Claude. The report tells you exactly which signals are missing and what to fix first. Most businesses can move from invisible to occasionally cited within 30 to 60 days of focused effort.</p>
        </div>
        <BlogCta
          heading="See how your business shows up in AI answers"
          subheading="Free score in 5 seconds. Full paid report with action plan available instantly."
        />
      </article>
      <Footer />
    </main>
  )
}
