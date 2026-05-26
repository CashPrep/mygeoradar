import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'Why Google Business Profile Is Your Most Important GEO Asset',
  description:
    'AI assistants like ChatGPT and Perplexity rely heavily on Google Business Profile data when answering local business queries. Here is why it matters and what it needs to say.',
  openGraph: {
    title: 'Why Google Business Profile Is Your Most Important GEO Asset',
    description:
      'AI assistants rely heavily on Google Business Profile when answering local queries. Here is why it matters for GEO and what yours needs to say.',
    url: 'https://mygeoradar.com/blog/google-business-profile-geo',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'Google Business Profile & GEO — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-23T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'Why Google Business Profile Is Your Most Important GEO Asset',
    description: 'AI assistants rely heavily on Google Business Profile when answering local queries.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function GoogleBusinessProfileGeoPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="Why Google Business Profile Is Your Most Important GEO Asset"
        description="AI assistants like ChatGPT and Perplexity rely heavily on Google Business Profile data when answering local business queries. Here is why it matters and what it needs to say."
        url="https://mygeoradar.com/blog/google-business-profile-geo"
        publishedTime="2026-05-23T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Local GEO</Badge>
            <span className="text-xs text-muted">May 23, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            Why Google Business Profile Is Your Most Important GEO Asset
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            If you only fix one thing for AI visibility, your Google Business Profile should be it. Here is why AI assistants weight it so heavily and what your profile needs to include.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-muted leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">The connection between GBP and AI answers</h2>
          <p>When someone asks Perplexity or ChatGPT to recommend a local business — a dentist, a plumber, a coffee shop — the AI is not crawling the open web in real time and ranking results. It is drawing on structured data sources it has been trained on or can retrieve reliably. Google Business Profile is one of the most authoritative of those sources. A complete, accurate, actively-managed GBP signals to AI that your business is real, established, and trustworthy.</p>
          <p>Think of it this way: your GBP is the most structured, Google-verified summary of your business that exists online. It has your name, category, location, hours, services, reviews, and photos — all in a machine-readable format. AI assistants are very good at reading exactly that kind of structured, authoritative data.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">What AI actually looks for in your profile</h2>
          {[
            'Business name — exactly consistent with how it appears everywhere else online',
            'Primary and secondary categories — these define what queries you are eligible to appear in',
            'Complete and accurate hours, including special hours for holidays',
            'A keyword-rich business description that clearly states what you do and who you serve',
            'Service and product listings with descriptions — not just names',
            'A high volume of recent, detailed reviews with owner responses',
            'Active posting history — regular updates signal an operating business',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}

          <BlogMidCta
            topic="The Complete Local GEO System"
            hook="Google Business Profile is one piece of the puzzle. The Found by AI Playbook walks through all 27 signals — including exactly how to write your GBP description for AI readability."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">The review problem most businesses ignore</h2>
          <p>Review volume and recency are among the strongest trust signals AI uses when deciding which businesses to recommend. A business with 12 reviews from three years ago looks dormant to an AI. A business with 80 reviews spread across the last 18 months looks active, trusted, and worth recommending. The content of reviews matters too — reviews that naturally mention your services, location, and business type reinforce what you do in a way AI can extract and cite.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">One profile, multiple AI surfaces</h2>
          <p>Optimizing your GBP is one of the highest-leverage GEO actions because it improves your visibility across multiple AI surfaces simultaneously. ChatGPT with Browse, Perplexity, Google&apos;s own AI Overviews, and Apple Intelligence all draw from the same underlying data ecosystem that GBP feeds into. Fix it once, benefit across all of them.</p>

        </div>
        <RelatedPosts
          posts={[
            { slug: 'schema-markup-for-geo',  title: 'Schema Markup and GEO: Why Structured Data Is Critical for AI Visibility', tag: 'Technical GEO' },
            { slug: 'multi-location-geo',     title: 'Multi-Location GEO: How Chains and Franchises Should Handle AI Visibility', tag: 'Local GEO'     },
            { slug: 'geo-score-benchmarks',   title: "What's a Good GEO Score? Industry Benchmarks for 2026",                   tag: 'Strategy'     },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
