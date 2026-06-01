import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'Citation Building for GEO: Which Directories Actually Matter for AI Visibility',
  description: "Not all directory listings are equal. Here's which citation sources carry the most weight with AI models in 2026 — and which ones you can safely skip.",
  openGraph: {
    title: 'Citation Building for GEO: Which Directories Actually Matter for AI Visibility',
    description: "Not all directory listings are equal. Here's which citation sources carry the most weight with AI models in 2026.",
    url: 'https://mygeoradar.com/blog/citation-building-for-geo',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'Citation Building for GEO — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-17T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'Citation Building for GEO: Which Directories Actually Matter for AI Visibility',
    description: "Not all directory listings are equal. Here's which citation sources carry the most weight with AI models in 2026.",
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

const universalDirectories = [
  { name: 'Google Business Profile', why: 'The most important citation in existence for GEO. Feeds Gemini, ChatGPT (via Bing indexing), and virtually every AI tool.' },
  { name: 'Bing Places for Business', why: 'Directly powers ChatGPT web search and Microsoft Copilot results. Most local businesses have never claimed this.' },
  { name: 'Apple Maps', why: 'Powers Apple Intelligence and Siri. Critical for capturing iPhone users.' },
  { name: 'Yelp', why: 'One of the most-indexed review sources by AI crawlers. Especially important for restaurants, home services, and retail.' },
  { name: 'Facebook Business Page', why: 'High domain authority, frequently indexed, and read by Perplexity and other AI research tools.' },
  { name: 'Better Business Bureau', why: 'Trust signal that AI models use as a credibility marker, especially for service businesses.' },
  { name: 'LinkedIn Company Page', why: 'Critical for B2B and professional services categories. Often the first result AI uses for company descriptions.' },
  { name: 'Foursquare / Factual', why: 'Feeds data to several downstream AI and mapping systems as a data aggregator.' },
]

export default function CitationBuildingPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="Citation Building for GEO: Which Directories Actually Matter for AI Visibility"
        description="Not all directory listings are equal. Here is which citation sources carry the most weight with AI models in 2026 — and which ones you can safely skip."
        url="https://mygeoradar.com/blog/citation-building-for-geo"
        publishedTime="2026-05-17T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Reviews &amp; Citations</Badge>
            <span className="text-xs text-muted">May 17, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            Citation Building for GEO: Which Directories Actually Matter for AI Visibility
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Not all directory listings are equal. Here is which citation sources carry the most weight with AI models in 2026 &mdash; and which ones you can safely skip.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">Quality over quantity</h2>
          <p>The old local SEO approach was to list your business in as many directories as possible. GEO is different. AI models index a much smaller set of trusted sources deeply rather than skimming hundreds of low-authority directories. A complete, well-reviewed listing on 10 high-authority platforms beats incomplete listings on 150 generic ones. Focus on quality and consistency, not volume.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">Universal citations every business needs</h2>
          <div className="flex flex-col gap-3">
            {universalDirectories.map(({ name, why }) => (
              <div key={name} className="p-4 rounded-xl bg-surface border border-border">
                <p className="font-semibold text-foreground text-sm">{name}</p>
                <p className="text-xs text-muted mt-1">{why}</p>
              </div>
            ))}
          </div>

          <BlogMidCta
            topic="Citation Building Strategy"
            hook="The Found by AI Playbook includes the complete 30-directory citation list for 12 major business categories — with direct links to each listing page and a submission checklist."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">Industry-specific directories that matter</h2>
          <p>Beyond the universal list, AI models give extra weight to vertical-specific directories because they signal category expertise. Healthcare businesses should prioritize Healthgrades, WebMD listings, Zocdoc, and Vitals. Legal businesses should be on Avvo, Justia, FindLaw, and Super Lawyers. Home services businesses need Angi, HomeAdvisor, Thumbtack, and Houzz. SaaS products need G2, Capterra, and GetApp. List your category-specific directories as a second tier after the universal set.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">What to skip</h2>
          <p>Generic local directories with domain authority below 30, niche aggregators built on scraped data, and paid listing services that promise &ldquo;hundreds of directories&rdquo; for a monthly fee are almost entirely irrelevant for GEO. AI models don&apos;t crawl these sources, and your time is better spent deepening your presence on the directories that matter.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'nap-consistency-geo',         title: 'NAP Consistency and GEO: Why Name, Address, Phone Matter',    tag: 'Local GEO'          },
            { slug: 'reviews-and-geo',             title: 'How Online Reviews Directly Impact Your AI Visibility Score',  tag: 'Reviews & Citations' },
            { slug: 'google-business-profile-geo', title: 'Why Google Business Profile Is Your Most Important GEO Asset', tag: 'Local GEO'           },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
