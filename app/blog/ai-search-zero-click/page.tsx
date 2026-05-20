import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'

export const metadata = {
  title: 'The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer',
  description: 'Zero-click AI answers are pulling users away from websites entirely. Here\'s how to adapt your strategy to get cited instead of bypassed.',
  openGraph: {
    title: 'The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer',
    description: 'Zero-click AI answers are pulling users away from websites entirely. Here\'s how to adapt your strategy to get cited instead of bypassed.',
    url: 'https://mygeoradar.com/blog/ai-search-zero-click',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/blog/ai-search-zero-click/opengraph-image', width: 1200, height: 630, alt: 'The Zero-Click AI Era — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-11T00:00:00.000Z',
    authors: ['https://mygeoradar.com'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer',
    description: 'Zero-click AI answers are pulling users away from websites. Here\'s how to adapt.',
    images: ['https://mygeoradar.com/blog/ai-search-zero-click/opengraph-image'],
  },
}

export default function AiSearchZeroClickPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Strategy</Badge>
            <span className="text-xs text-muted">May 12, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            AI Search Is Killing Website Traffic &mdash; Here&apos;s What to Do Instead
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            Zero-click AI answers are pulling users away from websites entirely. Here&apos;s how to adapt your strategy to get cited instead of bypassed.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">The zero-click shift</h2>
          <p>Search engines have been moving toward zero-click results for years. AI chat interfaces accelerate it dramatically. When someone asks Perplexity &ldquo;who is the best roofing contractor in Phoenix,&rdquo; they get a direct answer with three cited businesses &mdash; and they may never click through to any website. The traffic goes to whoever gets cited, not whoever ranks.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">What this means for local businesses</h2>
          <p>Your website traffic metric is becoming a lagging indicator. A business can be losing ground in AI search while their Google Analytics looks fine &mdash; because the users who would have found them are now getting their answer directly from an AI, never visiting a search results page at all.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The new goal: citation, not ranking</h2>
          <p>In AI search, the equivalent of ranking #1 is being cited in the answer. You don&apos;t need to be the only mention &mdash; you need to be one of the three or four businesses the AI names when answering a relevant query. That&apos;s a different optimization target than traditional SEO, and it requires different signals.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Strategies that drive AI citation</h2>
          {[
            { title: 'Be the best answer, not just the best website', desc: 'Create content that directly answers the questions AI engines receive. FAQs, how-to guides, and comparison pages that address real customer questions get cited at higher rates.' },
            { title: 'Become a named entity', desc: 'AI models cite businesses they can clearly identify. Structured schema, consistent NAP data, and directory presence all help AI models recognize you as a specific, verifiable entity.' },
            { title: 'Build citations in AI training sources', desc: 'Local news mentions, industry publications, and authoritative directories (BBB, Chamber, professional associations) are disproportionately represented in AI training data.' },
            { title: 'Optimize for conversational queries', desc: 'AI search uses natural language. Optimize your content for how people actually ask questions, not just keyword variants.' },
          ].map((item) => (
            <div key={item.title} className="p-4 bg-surface-2 border border-border rounded-xl">
              <p className="font-semibold text-foreground mb-1">{item.title}</p>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
          <h2 className="text-xl font-bold text-foreground mt-4">Measure citation share, not just traffic</h2>
          <p>Start tracking how often AI engines cite your business across your key queries. That metric &mdash; citation share &mdash; is the leading indicator that traditional analytics can&apos;t show you. The businesses that start measuring and optimizing for it now will have a compounding advantage as AI search continues to grow.</p>
        </div>
        <BlogCta
          heading="Find out if AI engines are citing your competitors instead of you"
          subheading="Free score in 5 seconds. See your citation share across ChatGPT, Perplexity, Gemini, and Claude."
        />
      </article>
      <Footer />
    </main>
  )
}
