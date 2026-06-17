import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'Best Yoast Alternatives in 2026 (For SEO + AI Visibility)',
  description: 'Looking for a Yoast alternative? Here are the best options for WordPress SEO and AI visibility — including the best free way to see whether AI recommends your business.',
  openGraph: {
    title: 'Best Yoast Alternatives in 2026 (For SEO + AI Visibility)',
    description: 'The best Yoast alternatives for WordPress SEO and AI visibility in 2026.',
    url: 'https://mygeoradar.com/blog/best-yoast-alternatives',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'Best Yoast Alternatives 2026 — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-06-16T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'Best Yoast Alternatives in 2026',
    description: 'The best Yoast alternatives for WordPress SEO and AI visibility.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function BestYoastAlternativesPage() {
  const alternatives = [
    {
      name: 'MyGeoRadar',
      tag: '#1 Best Alternative',
      price: 'Free scan + $27 playbook',
      description: 'Yoast helps optimize on-page SEO inside WordPress. But Yoast cannot tell you whether ChatGPT, Perplexity, Gemini, or Claude actually mention your business. MyGeoRadar fills that exact gap with a free AI visibility scan and fix plan.',
      strengths: 'Free scan, instant AI visibility score, no account required, focuses on the fastest-growing search channel, actionable GEO recommendations',
      limitations: 'Not a WordPress plugin and not a meta-tag editor',
      verdict: 'Best Yoast alternative if your goal is being found by AI, not just getting a green dot in WordPress.',
      link: 'https://mygeoradar.com/scan',
    },
    {
      name: 'Rank Math',
      tag: 'WordPress Plugin',
      price: 'Free + paid plans',
      description: 'Rank Math is the most popular direct Yoast alternative for WordPress SEO. It includes schema support, redirects, rich snippets, and more advanced controls in the free version.',
      strengths: 'More features than Yoast, strong schema support, good free version',
      limitations: 'Still focused on traditional SEO only, no AI visibility insights',
      verdict: 'Best direct WordPress replacement for Yoast.',
      link: null,
    },
    {
      name: 'SEOPress',
      tag: 'Clean & Cheap',
      price: 'Free + low-cost pro',
      description: 'SEOPress is a lighter, cleaner WordPress SEO plugin with strong core features and less upsell friction than Yoast.',
      strengths: 'Affordable, streamlined, good white-label options',
      limitations: 'Smaller ecosystem, no AI visibility coverage',
      verdict: 'Good alternative if you want a cleaner WordPress SEO experience.',
      link: null,
    },
    {
      name: 'All in One SEO',
      tag: 'Established',
      price: 'Free + paid plans',
      description: 'AIOSEO is another major WordPress SEO plugin with meta control, schema, sitemaps, and WooCommerce support.',
      strengths: 'Mature plugin, broad feature set, easy setup',
      limitations: 'Traditional SEO only, no insight into AI answers',
      verdict: 'Solid Yoast replacement for WordPress-only workflows.',
      link: null,
    },
    {
      name: 'Manual Technical SEO + MyGeoRadar',
      tag: 'Best Combo',
      price: 'Mostly free',
      description: 'If your site is on Next.js, Webflow, Shopify, or another non-WordPress stack, you may not need a plugin at all. Handle metadata and schema manually, then use MyGeoRadar to check the AI visibility result.',
      strengths: 'Flexible, cheap, works outside WordPress, focuses on actual outcomes',
      limitations: 'Requires more technical comfort than using a plugin',
      verdict: 'Often the smartest path for modern sites that don’t need plugin bloat.',
      link: null,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="Best Yoast Alternatives in 2026 (For SEO + AI Visibility)"
        description="Looking for a Yoast alternative? Here are the best options for WordPress SEO and AI visibility — including the best free way to see whether AI recommends your business."
        url="https://mygeoradar.com/blog/best-yoast-alternatives"
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
            Best Yoast Alternatives in 2026 (For SEO + AI Visibility)
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Yoast is still one of the best-known WordPress SEO plugins. But plugins don’t solve the new visibility problem: whether AI assistants actually mention your business. Here are the best alternatives, starting with the one that shows that for free.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">What Yoast Can’t Do</h2>
          <p>Yoast helps with titles, descriptions, XML sitemaps, and on-page SEO hygiene. It does not measure your presence in AI-generated answers or explain why AI assistants recommend your competitors instead of you.</p>
          <p>That is exactly where <a href="https://mygeoradar.com/scan" className="text-accent underline">MyGeoRadar</a> fits. It gives you a free AI visibility scan and shows what to fix first.</p>

          <BlogMidCta
            topic="See if AI Recommends You"
            hook="Yoast can optimize your page. MyGeoRadar can show whether AI assistants actually surface your business. Free scan, instant results."
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

          <h2 className="text-xl font-bold text-foreground mt-4">Best Move</h2>
          <p>If you still need a WordPress plugin, use Rank Math or SEOPress. But if your goal is actual discoverability in 2026, pair your on-page SEO with MyGeoRadar so you can measure the AI layer too.</p>
        </div>

        <RelatedPosts
          posts={[
            { slug: 'best-seo-alternatives', title: 'Best Alternatives to SEO in 2026', tag: 'Strategy' },
            { slug: 'geo-vs-seo', title: 'GEO vs SEO: What Is the Difference?', tag: 'GEO Basics' },
            { slug: 'best-ai-visibility-tools', title: 'Best AI Visibility Tools for Small Business', tag: 'Tools' },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
