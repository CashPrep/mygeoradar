import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'How AI Search Engines Decide Which Businesses to Mention',
  description: 'ChatGPT, Perplexity and Gemini don\'t rank websites — they generate answers. Here\'s exactly how they decide who gets cited.',
}

export default function AiSearchGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">AI Search</Badge>
            <span className="text-xs text-muted">May 10, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            How AI Search Engines Decide Which Businesses to Mention
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            ChatGPT, Perplexity and Gemini don&apos;t rank websites &mdash; they generate answers. Here&apos;s exactly how they decide who gets cited.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">AI search is fundamentally different</h2>
          <p>
            When you type a query into Google, it returns a ranked list of links. You click, you read, you decide. The business that ranks #1 wins the click.
          </p>
          <p>
            When you ask ChatGPT or Perplexity the same question, something completely different happens. The AI generates a prose answer &mdash; synthesizing information from dozens of sources &mdash; and either mentions specific businesses or it doesn&apos;t. There&apos;s no position #1. You&apos;re either in the answer or you&apos;re invisible.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">The 5 signals AI engines use</h2>
          {[
            { title: '1. Entity recognition', body: 'AI models are trained on massive datasets. If your business has been mentioned across enough credible sources &mdash; your website, Google Business Profile, Yelp, news articles, local directories &mdash; the AI builds a confident entity for you. Businesses with weak entity signals get ignored.' },
            { title: '2. Structured data (schema)', body: 'JSON-LD schema markup is one of the clearest signals you can send to AI engines. It explicitly tells crawlers: this is a LocalBusiness, this is what it does, these are its hours, these are its reviews. AI systems that index the web weight structured data heavily.' },
            { title: '3. Topical authority', body: 'Does your website actually answer questions about your industry? AI engines favor businesses whose content demonstrates deep expertise. A roofing company that has published a detailed guide on when to replace vs repair a roof is far more likely to be cited than one with a 5-page brochure site.' },
            { title: '4. Review signals', body: 'Reviews on Google, Yelp, and industry-specific platforms feed directly into AI training data and real-time retrieval. Volume, recency, and sentiment all matter. A business with 200 detailed 5-star reviews will almost always outperform one with 12.' },
            { title: '5. Citation velocity', body: 'How recently have credible sources mentioned your business? AI engines that do real-time retrieval (like Perplexity) weight recency heavily. Press mentions, new directory listings, recent blog posts, and fresh reviews all boost your citation velocity.' },
          ].map((p) => (
            <div key={p.title}>
              <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">What you can actually do about it</h2>
          <p>The good news: most businesses are starting from the same low baseline. The ones that move fast in the next 12 months will own their category in AI answers for years.</p>
          <ul className="flex flex-col gap-2 list-none">
            {[
              'Audit and clean up your Google Business Profile completely',
              'Add LocalBusiness + Service schema to every page of your site',
              'Publish one authoritative FAQ or guide per month',
              'Get listed on the top 10 directories in your industry',
              'Actively respond to and generate reviews on Google and Yelp',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-accent mt-1">&#8250;</span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-4">Start with a baseline scan</h2>
          <p>
            Before you change anything, you need to know where you stand. MyGeoRadar simulates how each AI engine responds to queries about your business and gives you a score plus a specific action plan.
          </p>
        </div>

        <div className="mt-10 p-6 bg-surface-2 border border-border rounded-xl flex flex-col gap-4">
          <p className="font-semibold text-foreground">Get your free AI visibility score</p>
          <p className="text-sm text-foreground-dim">Free score in 5 seconds. Full report $24.99 (50% off your first scan).</p>
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
