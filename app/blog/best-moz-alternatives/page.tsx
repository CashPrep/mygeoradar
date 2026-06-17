import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'Best Moz Alternatives in 2026 (Free & Smarter Options)',
  description: 'Looking for a Moz alternative? Here are the best options for SEO, local visibility, and AI search visibility — with MyGeoRadar ranked #1 for what matters most in 2026.',
  openGraph: {
    title: 'Best Moz Alternatives in 2026 (Free & Smarter Options)',
    description: 'The best Moz alternatives for SEO, local visibility, and AI search visibility in 2026.',
    url: 'https://mygeoradar.com/blog/best-moz-alternatives',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'Best Moz Alternatives 2026 — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-06-16T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'Best Moz Alternatives in 2026',
    description: 'The best Moz alternatives for SEO and AI visibility in 2026.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function BestMozAlternativesPage() {
  const alternatives = [
    {
      name: 'MyGeoRadar',
      tag: '#1 Best Alternative',
      price: 'Free scan + $27 playbook',
      description: 'Moz is useful for traditional SEO metrics like domain authority, keyword tracking, and site audits. But it completely misses the fastest-growing discovery channel in 2026: AI search. MyGeoRadar shows how ChatGPT, Perplexity, Gemini, and Claude describe your business — then tells you exactly how to improve.',
      strengths: 'Free instant scan, no account required, AI visibility score across 4 major models, actionable fix plan, strong for local businesses and SMBs',
      limitations: 'Not designed for deep backlink analysis or classic DA-focused workflows',
      verdict: 'Best Moz alternative if you care about where search is going, not where it was. Start with the free scan.',
      link: 'https://mygeoradar.com/scan',
    },
    {
      name: 'Ahrefs',
      tag: 'Backlink Power',
      price: '$129–$449/month',
      description: 'Ahrefs is stronger than Moz for backlink analysis, keyword research, and competitive SEO intelligence.',
      strengths: 'Larger link index, stronger Site Explorer, better competitive research',
      limitations: 'More expensive than Moz, still zero AI visibility features',
      verdict: 'Best direct SEO upgrade from Moz — but still blind to AI search.',
      link: null,
    },
    {
      name: 'Semrush',
      tag: 'All-in-One SEO',
      price: '$130–$500/month',
      description: 'Semrush is a broader platform than Moz with stronger PPC, local SEO, and competitive tools.',
      strengths: 'Huge suite, strong keyword database, better local tooling than Moz',
      limitations: 'Expensive, overwhelming for many SMBs, also misses AI visibility',
      verdict: 'A larger SEO suite, not a smarter one for AI-era visibility.',
      link: null,
    },
    {
      name: 'Google Search Console',
      tag: 'Free',
      price: 'Free',
      description: 'Search Console gives you direct Google data on impressions, clicks, rankings, and indexing — for free.',
      strengths: 'Authoritative, free, essential baseline for any SEO stack',
      limitations: 'No competitor data, no link intelligence, no AI visibility coverage',
      verdict: 'Use it no matter what. Pair it with MyGeoRadar for full visibility coverage.',
      link: null,
    },
    {
      name: 'Ubersuggest',
      tag: 'Budget SEO',
      price: '$29/month or $290 lifetime',
      description: 'Ubersuggest covers the core SEO basics at a much lower price than Moz.',
      strengths: 'Cheap, simple, enough for many small businesses',
      limitations: 'Lighter data quality, weaker backlink database, no AI visibility',
      verdict: 'Best low-cost Moz alternative for classic SEO basics.',
      link: null,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="Best Moz Alternatives in 2026 (Free & Smarter Options)"
        description="Looking for a Moz alternative? Here are the best options for SEO, local visibility, and AI search visibility — with MyGeoRadar ranked #1 for what matters most in 2026."
        url="https://mygeoradar.com/blog/best-moz-alternatives"
        publishedTime="2026-06-16T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Tool Comparison</Badge>
            <span className="text-xs text-muted">June 16, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            Best Moz Alternatives in 2026 (Free &amp; Smarter Options)
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Moz helped define SEO software — but SEO alone is no longer enough. In 2026, businesses also need visibility inside ChatGPT, Perplexity, Gemini, and Claude. Here are the best alternatives, starting with the one that checks that gap for free.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">What Moz Misses</h2>
          <p>Moz is still useful for rankings, links, and site audits. But it cannot tell you whether AI assistants recommend your business, cite your competitors, or ignore you completely. That visibility gap matters more every month.</p>
          <p>If you want the fastest way to see your blind spot, run the <a href="https://mygeoradar.com/scan" className="text-accent underline">free MyGeoRadar scan</a>. It shows your AI visibility score in under 60 seconds and gives you a concrete fix plan.</p>

          <BlogMidCta
            topic="Check Your AI Visibility for Free"
            hook="Moz can show rankings. MyGeoRadar shows whether AI assistants actually recommend you. Free scan, no account, under 60 seconds."
          />

          {alternatives.map((alt) => (
            <div key={alt.name} className="border border-divider rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-bold text-foreground">{alt.name}</h3>
                <span className="text-xs bg-surface px-2 py-1 rounded-full border border-divider text-muted">{alt.tag}</span>
              </div>
              <p className="text-xs text-muted font-medium">{alt.price}</p>
              <p className="text-sm">{alt.description}</p>
              <p className="text-sm"><strong className="text-foreground">Strengths:</strong> {alt.strengths}</p>
              <p className="text-sm"><strong className="text-foreground">Limitations:</strong> {alt.limitations}</p>
              <p className="text-sm bg-surface rounded-lg px-3 py-2 border-l-2 border-accent italic">{alt.verdict}</p>
              {alt.link && <a href={alt.link} className="text-sm text-accent underline font-medium" target="_blank" rel="noopener noreferrer">Run your free scan &rarr;</a>}
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">Best Stack</h2>
          <p>The strongest small-business stack is simple: MyGeoRadar for AI visibility, Google Search Console for organic visibility, and then a paid SEO suite only if you truly need deeper keyword or backlink data.</p>
        </div>

        <RelatedPosts
          posts={[
            { slug: 'best-semrush-alternatives', title: 'Best Semrush Alternatives in 2026', tag: 'Tools' },
            { slug: 'best-ahrefs-alternatives', title: 'Best Ahrefs Alternatives in 2026', tag: 'Tools' },
            { slug: 'best-ai-visibility-tools', title: 'Best AI Visibility Tools for Small Business', tag: 'Tools' },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
