import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'What is GEO? The Beginner\'s Guide to Generative Engine Optimization',
  description: 'Traditional SEO gets you on Google. GEO gets you cited in AI answers. Here\'s what it is, why it matters, and how to start.',
}

export default function WhatIsGeoPage() {
  return (
    <main className="min-h-screen bg-background">
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
          <p className="text-lg text-foreground-dim leading-relaxed">
            Traditional SEO gets you on Google. GEO gets you cited in AI answers. Here&apos;s what it is, why it matters, and how to start.
          </p>
        </div>

        <div className="prose prose-invert max-w-none flex flex-col gap-6 text-foreground-dim leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">The shift nobody prepared for</h2>
          <p>
            For 20 years, the game was simple: rank on Google, get traffic. Businesses spent billions optimizing title tags, building backlinks, and chasing algorithm updates. It worked.
          </p>
          <p>
            Then ChatGPT launched. Then Perplexity. Then Google’s AI Overviews. Suddenly, millions of people stopped clicking search results and started reading AI-generated answers instead. And those answers don’t always mention the businesses that rank #1 on Google.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">So what is GEO?</h2>
          <p>
            Generative Engine Optimization (GEO) is the practice of making your business more likely to be mentioned, cited, or recommended by AI-powered search engines like ChatGPT, Perplexity, Gemini, and Claude.
          </p>
          <p>
            Instead of optimizing for a ranking position, you’re optimizing to be part of the answer. When someone asks &ldquo;best personal injury lawyer in Boston&rdquo; or &ldquo;what’s a good yoga studio near me,&rdquo; you want your business to appear in what the AI says back.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">How is GEO different from SEO?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-surface-2">
                  <th className="text-left p-3 text-foreground font-semibold border-b border-border"></th>
                  <th className="text-left p-3 text-foreground font-semibold border-b border-border">SEO</th>
                  <th className="text-left p-3 text-accent font-semibold border-b border-border">GEO</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Goal',    'Rank in search results',       'Get cited in AI answers'],
                  ['Channel', 'Google, Bing',                 'ChatGPT, Perplexity, Gemini, Claude'],
                  ['Signal',  'Backlinks, keywords, clicks',  'Entity authority, structured data, E-E-A-T'],
                  ['Output',  'Blue links on a results page', 'Mentioned in a generated answer'],
                  ['Speed',   'Months to see results',        'Weeks with the right changes'],
                ].map(([aspect, seo, geo]) => (
                  <tr key={aspect} className="border-b border-border/50">
                    <td className="p-3 text-foreground font-medium">{aspect}</td>
                    <td className="p-3 text-foreground-dim">{seo}</td>
                    <td className="p-3 text-foreground-dim">{geo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-4">The 4 pillars of GEO</h2>
          {[
            { title: '1. Entity clarity', body: 'AI engines build a model of who you are. Your business name, location, services, and category need to be crystal clear and consistent across your website, Google Business Profile, and third-party directories.' },
            { title: '2. Structured data', body: 'Schema markup (JSON-LD) tells AI crawlers exactly what type of business you are, what services you offer, your hours, reviews, and more. Without it, AI engines have to guess — and they often guess wrong.' },
            { title: '3. Authoritative content', body: 'AI engines favor businesses that have published helpful, specific, original content about their industry. FAQs, how-to guides, case studies, and local content all signal that you’re a real expert.' },
            { title: '4. Third-party mentions', body: 'Just like backlinks for SEO, AI engines weight citations from review sites, news articles, local directories, and industry publications. The more credible sources mention you, the more trustworthy you appear to AI.' },
          ].map((p) => (
            <div key={p.title}>
              <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">How do I know where I stand?</h2>
          <p>
            The fastest way is to run a scan with MyGeoRadar. In under 60 seconds you’ll see exactly how ChatGPT, Perplexity, Gemini and Claude currently talk about your business — and get a prioritized list of fixes.
          </p>
        </div>

        <div className="mt-10 p-6 bg-surface-2 border border-border rounded-xl flex flex-col gap-4">
          <p className="font-semibold text-foreground">Ready to see your AI visibility score?</p>
          <p className="text-sm text-foreground-dim">Run a $1 scan and get your full report in under 60 seconds.</p>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors w-fit"
          >
            Run my scan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </article>
      <Footer />
    </main>
  )
}
