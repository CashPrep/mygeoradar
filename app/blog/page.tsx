import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog — GEO & AI Search Visibility',
  description: 'Learn how to show up in ChatGPT, Perplexity, Gemini and Claude answers. Guides on GEO, AI search, and visibility for local businesses.',
}

const posts = [
  {
    slug:        'ai-search-guide',
    title:       'How AI Search Engines Decide Which Businesses to Mention',
    description: 'ChatGPT, Perplexity and Gemini don\'t rank websites — they generate answers. Here\'s exactly how they decide who gets cited.',
    date:        'May 12, 2026',
    readTime:    '7 min read',
    tag:         'AI Search',
  },
  {
    slug:        'geo-score-benchmarks',
    title:       'What\'s a Good GEO Score? Industry Benchmarks for 2026',
    description: 'Most businesses score below 30 out of 100 on AI visibility. Here are real benchmark data points across industries — and what score you actually need to compete.',
    date:        'May 13, 2026',
    readTime:    '6 min read',
    tag:         'Strategy',
  },
  {
    slug:        'ai-search-zero-click',
    title:       'The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer',
    description: 'AI search doesn\'t send clicks — it gives answers. If your business isn\'t mentioned in those answers, you\'re invisible. Here\'s what zero-click AI means for your growth strategy.',
    date:        'May 11, 2026',
    readTime:    '7 min read',
    tag:         'AI Search',
  },
  {
    slug:        'geo-before-launch',
    title:       'Launch Day GEO: How to Set Up AI Visibility Before Your Business Goes Live',
    description: 'Most new businesses lose their first 90 days of AI visibility by doing nothing. Here\'s how to build your GEO foundation before you open — so you show up from day one.',
    date:        'May 9, 2026',
    readTime:    '6 min read',
    tag:         'Strategy',
  },
  {
    slug:        'what-is-geo',
    title:       'What is GEO? The Beginner\'s Guide to Generative Engine Optimization',
    description: 'Traditional SEO gets you on Google. GEO gets you cited in AI answers. Here\'s what it is, why it matters, and how to start.',
    date:        'May 10, 2026',
    readTime:    '5 min read',
    tag:         'GEO Basics',
  },
  {
    slug:        'multi-location-geo',
    title:       'Multi-Location GEO: How Chains and Franchises Should Handle AI Visibility',
    description: 'Single-location GEO is straightforward. Managing AI visibility across 10, 50, or 500 locations is a different challenge entirely. Here\'s the right architecture.',
    date:        'May 7, 2026',
    readTime:    '8 min read',
    tag:         'Local GEO',
  },
  {
    slug:        'ai-hallucination-fix',
    title:       'When AI Gets Your Business Wrong: How to Fix AI Hallucinations About Your Company',
    description: 'AI engines sometimes generate confidently wrong information about businesses — wrong hours, wrong address, wrong services. Here\'s how to find it and fix it before it costs you customers.',
    date:        'May 5, 2026',
    readTime:    '7 min read',
    tag:         'Technical GEO',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Blog</p>
          <h1 className="text-4xl font-bold tracking-tight">GEO & AI Search Guides</h1>
          <p className="mt-4 text-foreground-dim">
            Practical guides for business owners who want to show up in AI answers.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="card-hover p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="accent" className="text-xs">{post.tag}</Badge>
                  <span className="text-xs text-muted">{post.date} &middot; {post.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{post.title}</h2>
                <p className="text-sm text-foreground-dim leading-relaxed">{post.description}</p>
                <div className="flex items-center gap-1 text-accent text-sm font-medium mt-1">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
