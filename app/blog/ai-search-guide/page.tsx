import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'

export const metadata = {
  title: 'How AI Search Engines Decide Which Businesses to Mention',
  description: 'ChatGPT, Perplexity and Gemini don\'t rank websites — they generate answers. Here\'s exactly how they decide who gets cited.',
  openGraph: {
    title: 'How AI Search Engines Decide Which Businesses to Mention',
    description: 'ChatGPT, Perplexity and Gemini don\'t rank websites — they generate answers. Here\'s exactly how they decide who gets cited.',
    url: 'https://mygeoradar.com/blog/ai-search-guide',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/blog/ai-search-guide/opengraph-image', width: 1200, height: 630, alt: 'How AI Search Engines Decide Which Businesses to Mention — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-12T00:00:00.000Z',
    authors: ['https://mygeoradar.com'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'How AI Search Engines Decide Which Businesses to Mention',
    description: 'ChatGPT, Perplexity and Gemini don\'t rank websites — they generate answers. Here\'s exactly how they decide who gets cited.',
    images: ['https://mygeoradar.com/blog/ai-search-guide/opengraph-image'],
  },
}

export default function AiSearchGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Guide</Badge>
            <span className="text-xs text-muted">May 12, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            How AI Search Engines Decide Which Businesses to Mention
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            ChatGPT, Perplexity and Gemini don&apos;t rank websites &mdash; they generate answers. Here&apos;s exactly how they decide who gets cited.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">Why this matters for local businesses</h2>
          <p>Local businesses are disproportionately impacted by AI search. When someone asks ChatGPT for &ldquo;the best plumber in Denver&rdquo; or &ldquo;top-rated dentist near me,&rdquo; they&apos;re no longer scrolling through ten blue links &mdash; they&apos;re getting a direct recommendation. That recommendation comes from a business that has done the work to be visible in AI training data and real-time retrieval systems.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The five pillars of AI visibility</h2>
          {[
            { title: '1. Entity clarity', desc: 'AI models need to clearly understand who you are. Your business name, category, location, and contact details must be consistent and structured across your website and the web.' },
            { title: '2. Structured data', desc: 'JSON-LD schema markup (LocalBusiness, FAQPage, AggregateRating) tells AI engines exactly what type of entity you are and what you offer. Without it, they\'re guessing.' },
            { title: '3. Review signals', desc: 'AI engines weight review volume and recency heavily. Businesses with 50+ recent Google reviews are cited far more often than those with sparse or old reviews.' },
            { title: '4. Topical authority', desc: 'Publishing authoritative content that answers the questions AI is being asked about your category creates the information AI needs to cite you as a source.' },
            { title: '5. External citations', desc: 'Mentions in directories, local press, industry publications, and authoritative databases (BBB, Yelp, Chamber of Commerce) build the third-party trust AI models rely on.' },
          ].map((item) => (
            <div key={item.title} className="p-4 bg-surface-2 border border-border rounded-xl">
              <p className="font-semibold text-foreground mb-1">{item.title}</p>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
          <h2 className="text-xl font-bold text-foreground mt-4">Your 30-day action plan</h2>
          {[
            'Week 1: Add LocalBusiness JSON-LD schema to your homepage. Complete your Google Business Profile.',
            'Week 2: Audit your NAP consistency across top 20 directories. Fix any mismatches.',
            'Week 3: Publish one FAQ page answering the top 5 questions customers ask about your service.',
            'Week 4: Launch a review generation campaign. Email or text your last 50 customers.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-accent mt-1 shrink-0 font-bold text-sm">{i + 1}.</span>
              <p className="text-sm text-foreground-dim">{item}</p>
            </div>
          ))}
          <h2 className="text-xl font-bold text-foreground mt-4">How to measure your progress</h2>
          <p>Run a baseline scan before you start. Run another after 30 days. The score change tells you whether your work is translating into actual AI visibility &mdash; not just theoretical improvements. Look for movement in the engines where you scored lowest first, as those represent the biggest opportunity gaps.</p>
        </div>
        <BlogCta
          heading="Find out where you stand right now"
          subheading="Free score in 5 seconds. See which AI engines are citing you and which aren't."
        />
      </article>
      <Footer />
    </main>
  )
}
