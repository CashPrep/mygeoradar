import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'Does My Business Need GEO?',
  description:
    'Not every business has the same urgency around AI visibility — but most do. Here is how to tell if Generative Engine Optimization should be a priority for you right now.',
  openGraph: {
    title: 'Does My Business Need GEO?',
    description:
      'Not every business has the same urgency around AI visibility — but most do. Here is how to tell if GEO should be a priority for you right now.',
    url: 'https://mygeoradar.com/blog/does-my-business-need-geo',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'Does My Business Need GEO? — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-21T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'Does My Business Need GEO?',
    description:
      'Not every business has the same urgency around AI visibility — but most do. Here is how to tell if GEO should be a priority for you right now.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function DoesMyBusinessNeedGeoPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="Does My Business Need GEO?"
        description="Not every business has the same urgency around AI visibility — but most do. Here is how to tell if Generative Engine Optimization should be a priority for you right now."
        url="https://mygeoradar.com/blog/does-my-business-need-geo"
        publishedTime="2026-05-21T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">GEO Basics</Badge>
            <span className="text-xs text-muted">May 21, 2026 &middot; 5 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            Does My Business Need GEO?
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Not every business has the same urgency around AI visibility — but most do. Here is a simple way to assess where you stand and whether GEO should be on your radar right now.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-muted leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">The honest answer: probably yes</h2>
          <p>If your customers make decisions by researching options before they buy — whether that is choosing a contractor, picking a software tool, or finding a local restaurant for a special occasion — then AI assistants are already part of that research process for a meaningful share of your potential customers. If you are not showing up in those conversations, someone else is.</p>
          <p>The businesses that need GEO most urgently are those where customers are likely to ask an AI for a recommendation rather than searching and clicking through multiple websites. Think: &ldquo;What is the best CRM for a 10-person team?&rdquo; or &ldquo;Recommend a reliable plumber in [city].&rdquo; Those queries are increasingly going to AI first.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">Signs you need it now</h2>
          {[
            'Your competitors are being recommended by ChatGPT or Perplexity and you are not',
            'Your business is in a category where trust and reputation drive decisions (services, health, finance, legal)',
            'You rely on local customers and operate in a market where AI local search is active',
            'You sell a product or service that people commonly ask AI to help them choose',
            'Your website traffic from Google has been declining while your paid costs rise',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}

          <BlogMidCta
            topic="How to Fix Your AI Visibility"
            hook="If you recognize any of those signs, the Found by AI Playbook gives you the exact system to fix them — a 27-point checklist, 10 audit prompts, and a 30-day plan."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">When it is less urgent</h2>
          <p>If your business runs entirely on referrals with no digital discovery component, or you operate in a highly regulated niche where AI assistants consistently disclaim expertise (some financial or medical subfields), GEO may not be your most pressing priority today. That said, AI search is expanding into nearly every category — what feels irrelevant today often becomes urgent within 12 to 18 months.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">The simplest test</h2>
          <p>Open ChatGPT or Perplexity and type: &ldquo;Who are the best [your business type] in [your city or category]?&rdquo; If you do not appear and a competitor does, that is your answer. You need GEO, and the sooner you start, the easier it is to establish presence before the window closes.</p>

        </div>
        <RelatedPosts
          posts={[
            { slug: 'what-is-geo',          title: "What is GEO? The Beginner's Guide to Generative Engine Optimization", tag: 'GEO Basics' },
            { slug: 'how-long-does-geo-take', title: 'How Long Does GEO Take to Work?',                                     tag: 'GEO Basics' },
            { slug: 'geo-score-benchmarks',  title: "What's a Good GEO Score? Industry Benchmarks for 2026",             tag: 'Strategy'   },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
