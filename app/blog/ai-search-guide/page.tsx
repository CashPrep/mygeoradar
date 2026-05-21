import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'

export const metadata = {
  title: 'How AI Search Engines Decide Which Businesses to Mention',
  description: "ChatGPT, Perplexity and Gemini don't rank websites — they generate answers. Here's exactly how they decide who gets cited.",
  openGraph: {
    title: 'How AI Search Engines Decide Which Businesses to Mention',
    description: "ChatGPT, Perplexity and Gemini don't rank websites — they generate answers. Here's exactly how they decide who gets cited.",
    url: 'https://mygeoradar.com/blog/ai-search-guide',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630 }],
    type: 'article',
    publishedTime: '2026-05-12T00:00:00.000Z',
  },
  twitter: { card: 'summary_large_image', site: '@MyGEORadar', images: ['https://mygeoradar.com/og-image.png'] },
}

export default function AiSearchGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">AI Search</Badge>
            <span className="text-xs text-muted">May 12, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            How AI Search Engines Decide Which Businesses to Mention
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            ChatGPT, Perplexity and Gemini don&apos;t rank websites — they generate answers. Here&apos;s exactly how they decide who gets cited.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">It&apos;s not a ranking algorithm</h2>
          <p>Traditional search engines rank pages. AI search engines generate responses. That distinction matters enormously for how you optimize. Google asks: &ldquo;Which page best matches this query?&rdquo; ChatGPT asks: &ldquo;What is the most accurate, helpful answer I can construct?&rdquo; Your business gets mentioned if the AI has enough reliable information to include you in that answer.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The three things AI looks for</h2>
          <p>Based on how large language models work, there are three core factors that determine whether your business gets mentioned:</p>
          {[
            { title: 'Entity recognition', body: 'The AI needs to know your business exists as a distinct entity — with a name, location, category, and clear description. Structured data and consistent directory listings are the primary signals here.' },
            { title: 'Credibility signals', body: 'AI models weight businesses that appear in authoritative sources — editorial mentions, review platforms, industry directories, and local news. Volume and source quality both matter.' },
            { title: 'Relevance to the query', body: 'The AI maps your business attributes to the query intent. A plumber who specializes in emergency services needs to have that specialty clearly stated and attributed — not just implied on a homepage.' },
          ].map(({ title, body }) => (
            <div key={title} className="pl-4 border-l-2 border-accent/30">
              <p className="font-semibold text-foreground text-sm">{title}</p>
              <p className="text-sm mt-1">{body}</p>
            </div>
          ))}
          <h2 className="text-xl font-bold text-foreground mt-4">Why Perplexity behaves differently from ChatGPT</h2>
          <p>Perplexity performs live web searches before generating its answer, which means fresher data and more weight on current web content. ChatGPT (without browsing) relies on its training data, making older but authoritative sources more valuable. Gemini blends both. The implication: you need both a solid training-data footprint (directories, schema, Wikipedia-like sources) and fresh web signals (content, press mentions, reviews).</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The practical takeaway</h2>
          <p>You cannot pay to appear in AI answers. You earn your way in by being a clearly defined, credible, well-documented entity across the web. The good news: most businesses can dramatically improve their AI visibility in 30 days with the right checklist of actions.</p>
        </div>
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
