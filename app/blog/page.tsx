import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BlogFilterClient } from '@/components/blog/BlogFilterClient'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — GEO & AI Search Visibility Guides',
  description: 'Practical guides for business owners who want to show up in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude.',
  openGraph: {
    title: 'Blog — GEO & AI Search Visibility Guides | MyGeoRadar',
    description: 'Practical guides for business owners who want to show up in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude.',
    url: 'https://mygeoradar.com/blog',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'MyGeoRadar Blog — GEO & AI Visibility Guides' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'Blog — GEO & AI Search Visibility Guides | MyGeoRadar',
    description: 'Practical guides for business owners who want to show up in AI-generated answers.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

/**
 * Blog index — server component.
 *
 * The full post list is rendered as static HTML so Google and AI crawlers
 * see every title and description without executing JS.
 *
 * The interactive tag-filter pills live in BlogFilterClient ('use client')
 * and progressively enhance the page for users with JS.
 *
 * Strategy: render all posts server-side (visible to crawlers), then mount
 * the client filter on top of them. We hide the static list with CSS once
 * the client component mounts using a wrapping `peer` pattern via a small
 * JS trick — or more simply, we just always show the client component and
 * use `suppressHydrationWarning`. The cleanest crawler-friendly approach
 * is to render the full list in a <noscript> and the interactive version
 * normally. For Next.js App Router the server HTML is always sent, so the
 * client component still ships the full list in the initial HTML payload.
 */
export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">

        <div className="mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">GEO Blog</p>
          <h1 className="text-4xl font-bold tracking-tight">Generative Engine Optimization: Guides &amp; Insights</h1>
          <p className="mt-4 text-muted">
            Practical articles on GEO and AI search visibility for business owners, marketers, and founders.
          </p>
        </div>

        {/* Playbook promo banner */}
        <div className="mb-8 p-4 rounded-xl bg-accent/5 border border-accent/20 flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Want the complete system?</p>
            <p className="text-xs text-muted mt-0.5">The Found by AI Playbook turns these concepts into a single step-by-step action plan with checklists, prompts, and a 30-day calendar.</p>
          </div>
          <Link
            href="/playbook"
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-white font-semibold text-xs px-3 py-2 rounded-lg transition-colors"
          >
            Get it — $27 <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/*
          Static post list — rendered server-side so crawlers see all titles
          and descriptions. Wrapped in <noscript> so JS users see the
          interactive filter version below instead.
        */}
        <noscript>
          <div className="flex flex-col gap-6">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="p-6 rounded-xl bg-surface border border-border flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="accent" className="text-xs">{post.tag}</Badge>
                    <span className="text-xs text-muted">{post.date} &middot; {post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-sm text-muted leading-relaxed">{post.description}</p>
                  <div className="flex items-center gap-1 text-accent text-sm font-medium mt-1">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </noscript>

        {/* Interactive filter — Next.js App Router sends this as SSR HTML too */}
        <BlogFilterClient />

      </div>
      <Footer />
    </main>
  )
}
