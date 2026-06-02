import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'How to Get Your Business to Show Up in Perplexity AI (2026 Guide)',
  description: 'Perplexity AI is now a major source of business recommendations. Here is the exact strategy to get your business cited in Perplexity answers — with specific technical steps.',
  openGraph: {
    title: 'How to Get Your Business to Show Up in Perplexity AI (2026 Guide)',
    description: 'Perplexity AI is now a major source of business recommendations. Here is the exact strategy to get your business cited in Perplexity answers.',
    url: 'https://mygeoradar.com/blog/how-to-show-up-in-perplexity',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'How to Show Up in Perplexity AI — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-06-01T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'How to Get Your Business to Show Up in Perplexity AI (2026 Guide)',
    description: 'Perplexity AI is now a major source of business recommendations. Here is the exact strategy.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function HowToShowUpInPerplexityPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="How to Get Your Business to Show Up in Perplexity AI (2026 Guide)"
        description="Perplexity AI is now a major source of business recommendations. Here is the exact strategy to get your business cited in Perplexity answers — with specific technical steps."
        url="https://mygeoradar.com/blog/how-to-show-up-in-perplexity"
        publishedTime="2026-06-01T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Fix Guide</Badge>
            <span className="text-xs text-muted">June 1, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            How to Get Your Business to Show Up in Perplexity AI (2026 Guide)
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Perplexity now handles hundreds of millions of searches per month — and it recommends specific businesses. Here&apos;s a precise, technical guide to getting cited in Perplexity answers.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-muted leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">Why Perplexity Is Different from ChatGPT for Business Visibility</h2>
          <p>Unlike ChatGPT, which primarily draws from training data, Perplexity uses real-time web search as its primary source. This means Perplexity is essentially citing live web pages when it recommends businesses — which makes traditional SEO signals more relevant here than they are for ChatGPT, but with an AI-specific twist.</p>
          <p>Perplexity gives citations (the numbered sources at the top of every answer). Getting your business into a Perplexity answer means one of two things: either a page on your site is cited directly, or a third-party page that mentions your business is cited. Both are achievable with the right approach.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">Step 1: Allow PerplexityBot in Your robots.txt</h2>
          <p>Perplexity&apos;s web crawler is called <strong className="text-foreground">PerplexityBot</strong>. If it can&apos;t crawl your site, you cannot appear in Perplexity answers — period. Check your <code className="bg-surface text-foreground px-1 rounded text-sm">robots.txt</code> at yourdomain.com/robots.txt and confirm PerplexityBot is allowed:</p>
          <pre className="bg-surface border border-divider rounded-lg p-4 text-sm text-foreground overflow-x-auto"><code>{`User-agent: PerplexityBot
Allow: /`}</code></pre>
          <p>If you use a CDN or security layer like Cloudflare, make sure bot protection rules aren&apos;t blocking PerplexityBot either. Some security settings rate-limit or challenge unknown crawlers, which prevents Perplexity from indexing your content.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">Step 2: Create Highly Citable Content Pages</h2>
          <p>Perplexity cites pages that directly and completely answer a specific question. The structure of a highly citable page looks like this:</p>
          {[
            'A specific, question-framed H1 (e.g., "What Is the Average Cost of a Roof Replacement in Phoenix?")',
            'A direct, concise answer in the first paragraph — no preamble, no fluff',
            'Supporting data points, lists, or statistics that give the AI quotable specifics',
            'A clear byline, publication date, and author bio (signals freshness and authority)',
            'Schema markup (Article or FAQPage) that makes the content machine-readable',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}
          <p>Perplexity is particularly likely to cite pages that answer questions people are actively searching. Think about what questions your ideal customer asks before hiring someone in your category — and build a dedicated, comprehensive page for each one.</p>

          <BlogMidCta
            topic="Perplexity Visibility Strategy"
            hook="The Found by AI Playbook includes a complete Perplexity-specific optimization checklist, citable content templates, and a 30-day implementation plan tailored for your business type."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">Step 3: Get Cited on Pages Perplexity Already Trusts</h2>
          <p>Perplexity heavily favors sources it already trusts — established review sites, news publications, industry directories, and authoritative blogs. Getting your business mentioned on those pages is often faster than trying to rank your own site.</p>
          <p>Target these high-Perplexity-citation sources for your industry:</p>
          {[
            'Local service businesses: Yelp, Angi, HomeAdvisor, Thumbtack, Houzz',
            'Professional services: Avvo (lawyers), Healthgrades (doctors), Clutch (agencies)',
            'SaaS/software: G2, Capterra, Product Hunt, TechCrunch, TrustRadius',
            'Restaurants/retail: Yelp, TripAdvisor, Google Maps (descriptions indexed)',
            'All categories: local news mentions, industry association member directories',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">Step 4: Add an llms.txt File</h2>
          <p>The <code className="bg-surface text-foreground px-1 rounded text-sm">llms.txt</code> standard (proposed by Answer.AI and widely adopted in 2025–2026) is a plain-text file at the root of your website that tells AI crawlers exactly who you are, what you do, and what content is most important to index. Perplexity and other AI search engines use this file to prioritize and contextualize your content.</p>
          <p>Create a file at <code className="bg-surface text-foreground px-1 rounded text-sm">yourdomain.com/llms.txt</code> that includes your business description, key services, geographic areas served, and links to your most important pages. Think of it as a sitemap designed specifically for AI — it helps Perplexity understand your business at the entity level, not just the keyword level.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">Step 5: Optimize for the Specific Queries Perplexity Gets Asked</h2>
          <p>The queries that drive business recommendations in Perplexity follow predictable patterns. Focus your content on these formats first:</p>
          {[
            '"Best [service] in [city]" — local service discovery',
            '"What is the best [software/tool] for [use case]" — SaaS/product recommendations',
            '"How much does [service] cost" — pricing research before purchase',
            '"Who are the top [professionals] in [city/industry]" — expert discovery',
            '"[Competitor] alternatives" — comparison shopping',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}
          <p>Each of these query types warrants its own dedicated page or blog post on your site. A roofing company in Denver, for example, should have pages optimized for &ldquo;best roofers Denver,&rdquo; &ldquo;roof replacement cost Denver,&rdquo; and &ldquo;emergency roofing Denver&rdquo; — not just a single homepage with a contact form.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">How Fast Can You Appear in Perplexity?</h2>
          <p>Because Perplexity uses live web search (not just training data), you can see results faster than with ChatGPT — sometimes within days of publishing a well-optimized page or getting a citation on a trusted third-party site. The bottleneck is usually content creation and citation acquisition, not crawl delay.</p>
          <p>Run a free AI visibility scan on MyGeoRadar to see your current Perplexity readiness score and get a prioritized action plan specific to your site.</p>

        </div>

        <RelatedPosts
          posts={[
            { slug: 'why-chatgpt-doesnt-recommend-my-business', title: 'Why ChatGPT Doesn\'t Recommend My Business',             tag: 'Fix Guide'  },
            { slug: 'llms-txt-guide',                          title: 'llms.txt: The Complete Guide for Business Owners',      tag: 'Technical' },
            { slug: 'citation-building-for-geo',               title: 'Citation Building for GEO',                             tag: 'Technical' },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
