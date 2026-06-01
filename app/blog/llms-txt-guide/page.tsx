import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'What Is llms.txt and Does Your Business Website Need One?',
  description: 'llms.txt is an emerging standard that tells AI crawlers what to read on your website. Here is what it is, how it works, and whether you need to add one to your site.',
  openGraph: {
    title: 'What Is llms.txt and Does Your Business Website Need One?',
    description: 'llms.txt is an emerging standard that tells AI crawlers what to read on your website. Here is what it is and whether you need one.',
    url: 'https://mygeoradar.com/blog/llms-txt-guide',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'What Is llms.txt — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-24T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'What Is llms.txt and Does Your Business Website Need One?',
    description: 'llms.txt is an emerging standard that tells AI crawlers what to read on your website. Here is what it is and whether you need one.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function LlmsTxtGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="What Is llms.txt and Does Your Business Website Need One?"
        description="llms.txt is an emerging standard that tells AI crawlers what to read on your website. Here is what it is, how it works, and whether you need to add one to your site."
        url="https://mygeoradar.com/blog/llms-txt-guide"
        publishedTime="2026-05-24T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Technical GEO</Badge>
            <span className="text-xs text-muted">May 24, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            What Is llms.txt and Does Your Business Website Need One?
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            llms.txt is an emerging standard that tells AI crawlers what to read on your website. Here is what it is, how it works, and whether you need to add one to your site.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">What is llms.txt?</h2>
          <p>llms.txt is a plain-text file placed at the root of your website (e.g., <code className="bg-surface px-1 rounded text-sm">yoursite.com/llms.txt</code>) that tells AI models and LLM-based crawlers which pages are most important, which to skip, and what your site is about. It is conceptually similar to <code className="bg-surface px-1 rounded text-sm">robots.txt</code> for traditional crawlers, but designed specifically for large language models.</p>
          <p>The format was proposed in late 2024 and has been adopted by a growing number of AI-forward tools and documentation sites. It is not a Google standard &mdash; Google ignores it &mdash; but it is increasingly respected by Perplexity, Claude, and custom LLM crawlers built on top of open models.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">What goes in an llms.txt file?</h2>
          <p>A basic llms.txt file includes a short description of your site, a list of your most important pages (in order of priority), and optional instructions about what the AI should and should not use. Here is a simple example for a local service business:</p>
          <pre className="bg-surface border border-border rounded-xl p-4 text-xs overflow-x-auto"><code>{`# MyBusiness

> A licensed roofing contractor serving the greater Atlanta metro area.

## Key Pages

- [Homepage](https://mybusiness.com): Overview of services and contact.
- [Services](https://mybusiness.com/services): Full list of roofing services.
- [About](https://mybusiness.com/about): Company history and team.
- [Reviews](https://mybusiness.com/reviews): Customer testimonials.

## Optional

- [Blog](https://mybusiness.com/blog): Industry guides and tips.`}</code></pre>

          <BlogMidCta
            topic="Technical GEO Implementation"
            hook="The Found by AI Playbook includes a ready-to-use llms.txt template you can customize and deploy in under 10 minutes, plus the 6 other technical GEO files that matter most."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">Does your business need one?</h2>
          <p>For most small local businesses, llms.txt is a low-priority nice-to-have today. The AI platforms that matter most for local visibility &mdash; Gemini, ChatGPT with Bing, and Apple Intelligence &mdash; don&apos;t currently use llms.txt as a primary signal. Your time is better spent on GBP, schema, and reviews first.</p>
          <p>However, if you run a content-heavy site, a SaaS product, or a business that is actively trying to be indexed as an authoritative source by AI research tools like Perplexity, adding an llms.txt file is a 15-minute task that signals technical credibility and could help AI crawlers prioritize your best content. Think of it as planting a flag for the 2027 AI web, not a 2026 growth lever.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'schema-markup-for-geo',  title: 'Schema Markup and GEO: Why Structured Data Is Critical',      tag: 'Technical GEO' },
            { slug: 'ai-hallucination-fix',   title: 'When AI Gets Your Business Wrong: How to Fix Hallucinations',  tag: 'Technical GEO' },
            { slug: 'ai-search-guide',        title: 'How AI Search Engines Decide Which Businesses to Mention',      tag: 'AI Search'     },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
