import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'When AI Gets Your Business Wrong: How to Fix AI Hallucinations About Your Company',
  description: 'AI engines sometimes generate confidently wrong information about businesses — wrong hours, wrong address, wrong services. Here\'s how to find it and fix it before it costs you customers.',
  openGraph: {
    title: 'When AI Gets Your Business Wrong: How to Fix AI Hallucinations About Your Company',
    description: 'AI engines sometimes generate confidently wrong information about businesses — wrong hours, wrong address, wrong services. Here\'s how to find it and fix it.',
    url: 'https://mygeoradar.com/blog/ai-hallucination-fix',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-05T00:00:00.000Z',
    authors: ['https://mygeoradar.com'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'When AI Gets Your Business Wrong: How to Fix AI Hallucinations',
    description: 'AI engines sometimes generate confidently wrong info about businesses — wrong hours, wrong address. Here\'s how to find it and fix it.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function AiHallucinationFixPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Technical GEO</Badge>
            <span className="text-xs text-muted">May 5, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            When AI Gets Your Business Wrong: How to Fix AI Hallucinations About Your Company
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            AI engines sometimes generate confidently wrong information about businesses &mdash; wrong hours, wrong address, wrong services. Here&apos;s how to find it and fix it before it costs you customers.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">The problem with confident mistakes</h2>
          <p>
            A Google result that shows the wrong address for your business is visibly labeled as Google&apos;s data, and users can click through to verify. When an AI engine tells a user your business closes at 5pm and you actually close at 9pm, the user hears it in a confident, conversational voice with no caveat. They plan around it. They show up at 8pm and find you open &mdash; or worse, don&apos;t show up at all.
          </p>
          <p>
            AI hallucinations about businesses aren&apos;t rare edge cases. They&apos;re a predictable outcome of how AI engines work: they interpolate between data sources, fill gaps with plausible-sounding inferences, and generate answers even when their data is incomplete or outdated. Businesses that have moved, rebranded, changed hours, or expanded services are especially vulnerable.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">The most common AI errors about businesses</h2>
          {[
            { error: 'Wrong hours', cause: 'AI trained on old data, or different seasonal hours from a past year persist in training sets', impact: 'High &mdash; directly causes failed visits' },
            { error: 'Wrong address', cause: 'Old location data, especially after a move. The old address may be more cited than the new one', impact: 'Critical &mdash; sends customers to the wrong place' },
            { error: 'Services you don\'t offer', cause: 'AI confused you with a similar business, or you used to offer a service and removed it', impact: 'Medium &mdash; creates wrong expectations, damaged trust' },
            { error: 'Wrong ownership or staff', cause: 'Business sold or staff changed, but old bios persist in cited sources', impact: 'Medium &mdash; confusing for returning customers' },
            { error: 'Wrong price range or tier', cause: 'Pricing has changed, or AI is conflating you with a different business in the same category', impact: 'Medium-High &mdash; filters out the right customers, attracts wrong ones' },
            { error: 'Closed or permanently shut', cause: 'AI has encountered a news article or review mentioning you closed, possibly temporarily, and treats it as fact', impact: 'Critical &mdash; eliminates you from consideration entirely' },
          ].map((row) => (
            <div key={row.error} className="p-4 bg-surface-2 border border-border rounded-xl">
              <div className="flex items-start justify-between gap-4 mb-1">
                <p className="font-semibold text-foreground">{row.error}</p>
                <span className="text-xs text-foreground-dim shrink-0">Impact: <span className="text-foreground" dangerouslySetInnerHTML={{ __html: row.impact }} /></span>
              </div>
              <p className="text-sm">Cause: {row.cause}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">How to audit for AI errors right now</h2>
          <p>
            The first step is finding out what AI engines are actually saying. Don&apos;t assume the information is correct because you haven&apos;t heard a complaint. Most customers who get wrong information from an AI never tell you &mdash; they just don&apos;t come in.
          </p>
          <ul className="flex flex-col gap-2 list-none">
            {[
              'Run a MyGeoRadar scan to see the exact responses ChatGPT, Perplexity, Gemini, and Claude generate about your business',
              'Manually ask ChatGPT: &ldquo;What are the hours for [business name] in [city]?&rdquo; and &ldquo;Is [business name] still open?&rdquo;',
              'Ask Perplexity: &ldquo;Tell me about [business name] &mdash; what do they offer and where are they located?&rdquo;',
              'Check Gemini via Google Search by typing your business name and looking at the AI Overview',
              'Document every error with a screenshot and note which AI engine produced it',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-accent mt-1 shrink-0">&#8250;</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-4">Fixing AI errors: the source-of-truth strategy</h2>
          <p>
            You can&apos;t directly edit most AI engines&apos; knowledge about your business. What you can do is flood the zone with correct information from authoritative sources. AI engines that do real-time retrieval (like Perplexity) will update relatively quickly. AI engines that rely on training data (like the base version of ChatGPT) update more slowly, but they still get updated.
          </p>
          {[
            {
              title: '1. Correct the primary sources first',
              body: 'Google Business Profile and Bing Places are the highest-weight sources for most AI engines. If your information is wrong there, fix it immediately. Verify the listing is owned by you, and update every field including hours, address, categories, and website.',
            },
            {
              title: '2. Update all directory listings',
              body: 'Old directory data is a common source of AI errors. Audit your listings on Yelp, Apple Maps, Foursquare, and the top 20 industry directories. Use a citation management tool if you have more than 5 locations.',
            },
            {
              title: '3. Publish a correction page on your website',
              body: 'Create a clearly structured page (or update your About/Contact pages) with your correct information in plain text and in schema markup. Title it something specific like &ldquo;[Business Name] &mdash; Current Hours, Address, and Services.&rdquo; AI engines that scrape your site will encounter this.',
            },
            {
              title: '4. Add schema that overrides the error',
              body: 'If AI engines are getting your hours wrong, make sure BusinessHours is fully implemented in your JSON-LD. If they have the wrong address, ensure your PostalAddress schema is complete and matches your GBP exactly.',
            },
            {
              title: '5. Create fresh citations that mention the correct information',
              body: 'A recent press release, a blog post, a social media post that mentions your current address and hours all become new data points for AI retrieval. Recency helps &mdash; AI engines weight newer sources more heavily for factual details.',
            },
          ].map((p) => (
            <div key={p.title}>
              <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: p.body }} />
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">How long until the errors are corrected?</h2>
          <p>
            For AI engines with real-time retrieval (Perplexity, Gemini with live search, Bing-powered ChatGPT): 1 to 4 weeks after you update primary sources. For AI engines relying on training data: the next model update, which could be anywhere from a few weeks to several months. This is why ongoing monitoring matters &mdash; you need to verify the correction actually propagated.
          </p>
        </div>

        <div className="mt-10 p-6 bg-surface-2 border border-border rounded-xl flex flex-col gap-4">
          <p className="font-semibold text-foreground">See what AI engines are saying about your business right now</p>
          <p className="text-sm text-foreground-dim">Free scan in 60 seconds. We show you the exact AI-generated answers &mdash; errors and all.</p>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors w-fit"
          >
            Run my free scan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </article>
      <Footer />
    </main>
  )
}
