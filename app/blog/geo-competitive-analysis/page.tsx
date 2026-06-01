import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'GEO Competitive Analysis: How to See Where You Stand vs. Your Competitors on AI',
  description: 'Your competitors are either ahead or behind you on AI visibility — and most businesses have no idea where they stand. Here is how to run a proper GEO competitive analysis.',
  openGraph: {
    title: 'GEO Competitive Analysis: How to See Where You Stand vs. Your Competitors on AI',
    description: 'Your competitors are either ahead or behind you on AI visibility — and most businesses have no idea where they stand.',
    url: 'https://mygeoradar.com/blog/geo-competitive-analysis',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'GEO Competitive Analysis — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-30T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'GEO Competitive Analysis: How to See Where You Stand vs. Your Competitors on AI',
    description: 'Your competitors are either ahead or behind you on AI visibility — and most businesses have no idea where they stand.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function GeoCompetitiveAnalysisPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="GEO Competitive Analysis: How to See Where You Stand vs. Your Competitors on AI"
        description="Your competitors are either ahead or behind you on AI visibility — and most businesses have no idea where they stand. Here is how to run a proper GEO competitive analysis."
        url="https://mygeoradar.com/blog/geo-competitive-analysis"
        publishedTime="2026-05-30T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Strategy</Badge>
            <span className="text-xs text-muted">May 30, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            GEO Competitive Analysis: How to See Where You Stand vs. Your Competitors on AI
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Your competitors are either ahead or behind you on AI visibility &mdash; and most businesses have no idea where they stand. Here is how to run a proper GEO competitive analysis.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">Why competitive GEO matters</h2>
          <p>AI models don&apos;t just generate an answer &mdash; they generate a ranked answer. When ChatGPT names &ldquo;the best HVAC companies in Denver,&rdquo; it names 2 to 4 businesses. There are real winners and real losers in that answer. Understanding where you sit relative to competitors isn&apos;t optional: it determines whether you capture that referral or your competitor does.</p>
          <p>The good news is that most businesses haven&apos;t started on GEO at all. The bar is low in almost every market. A competitive analysis usually reveals that you&apos;re closer to the front than you think &mdash; and that a few targeted moves will put you ahead.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Step 1: Manual spot checks</h2>
          <p>Start by testing actual AI queries in your category. Open ChatGPT, Perplexity, and Gemini. Ask them the questions your customers ask: &ldquo;best [your service] in [your city],&rdquo; &ldquo;who should I call for [your service] near me,&rdquo; &ldquo;top rated [your category] in [your area].&rdquo; Note who gets named and who doesn&apos;t. This is your competitive landscape as AI currently sees it.</p>

          <BlogMidCta
            topic="GEO Competitive Analysis"
            hook="The Found by AI Playbook includes a competitive analysis worksheet and AI query template library — so you can systematically check your standing across every major AI platform."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">Step 2: Audit the signals of who&apos;s winning</h2>
          <p>When a competitor is consistently named and you aren&apos;t, the gap usually comes from one of three places: their Google Business Profile is more complete and better reviewed, they have more structured data on their website, or they have more editorial mentions from authoritative local sources. Audit each of these for the top 3 businesses appearing in AI answers for your category.</p>
          {[
            'How many Google reviews do they have, and when were the most recent ones posted?',
            'Is their Google Business Profile fully populated — services, photos, Q&A, description?',
            'Do they have LocalBusiness and Service schema on their website?',
            'Are they mentioned in local news or industry publications?',
            'How many citation directories list them with consistent NAP data?',
          ].map((q) => (
            <div key={q} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm">{q}</p>
            </div>
          ))}
          <h2 className="text-xl font-bold text-foreground mt-4">Step 3: Score and prioritize</h2>
          <p>Once you know where each competitor is stronger, prioritize the gaps with the highest leverage. Review volume gaps are usually the fastest to close. Schema gaps take a few hours to fix. Editorial gaps take longer but pay off for months. Build a simple spreadsheet with you and your top 3 competitors across each signal and work through the gaps in order of effort vs. impact.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'geo-score-benchmarks', title: "What's a Good GEO Score? Industry Benchmarks for 2026", tag: 'Strategy'   },
            { slug: 'geo-roi',              title: 'What Is the ROI of GEO?',                               tag: 'Strategy'   },
            { slug: 'reviews-and-geo',      title: 'How Online Reviews Directly Impact Your AI Visibility',  tag: 'Reviews & Citations' },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
