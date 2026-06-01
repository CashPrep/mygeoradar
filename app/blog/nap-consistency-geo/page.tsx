import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'NAP Consistency and GEO: Why Your Name, Address, and Phone Number Matter More Than Ever',
  description: 'AI models cross-reference your business information across dozens of sources. A single inconsistency in your NAP can suppress your visibility. Here is how to fix it.',
  openGraph: {
    title: 'NAP Consistency and GEO: Why Your Name, Address, and Phone Number Matter More Than Ever',
    description: 'AI models cross-reference your business information across dozens of sources. Inconsistencies suppress your visibility.',
    url: 'https://mygeoradar.com/blog/nap-consistency-geo',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'NAP Consistency and GEO — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-25T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'NAP Consistency and GEO: Why Your Name, Address, and Phone Number Matter More Than Ever',
    description: 'AI models cross-reference your business information across dozens of sources. Inconsistencies suppress your visibility.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function NapConsistencyPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="NAP Consistency and GEO: Why Your Name, Address, and Phone Number Matter More Than Ever"
        description="AI models cross-reference your business information across dozens of sources. A single inconsistency in your name, address, or phone number can suppress your visibility. Here is how to fix it."
        url="https://mygeoradar.com/blog/nap-consistency-geo"
        publishedTime="2026-05-25T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Local GEO</Badge>
            <span className="text-xs text-muted">May 25, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            NAP Consistency and GEO: Why Your Name, Address, and Phone Number Matter More Than Ever
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            AI models cross-reference your business information across dozens of sources. A single inconsistency in your name, address, or phone number can suppress your visibility. Here is how to find and fix it.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">How AI models use NAP data</h2>
          <p>When an AI like ChatGPT or Perplexity generates a local business answer, it draws from multiple data sources simultaneously &mdash; Google Business Profile, Yelp, Apple Maps, Facebook, industry directories, and your own website. It then attempts to reconcile those sources into a confident answer. If the name, address, or phone number differs across sources, the AI loses confidence in the entity and is less likely to cite you.</p>
          <p>This is different from the old SEO rationale for NAP consistency (Google&apos;s local algorithm). AI models are more literal: they are trying to determine whether two listings are the same business or different businesses. &ldquo;Smith Plumbing LLC&rdquo; and &ldquo;Smith Plumbing&rdquo; at slightly different addresses can register as ambiguous, causing the AI to skip the citation rather than risk a hallucination.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The most common NAP inconsistencies</h2>
          {[
            ['Business name variations', 'Using "LLC", "Inc.", "& Co" on some listings but not others; abbreviating "Street" as "St" inconsistently; adding or removing a DBA name.'],
            ['Address formatting', 'Suite vs Ste vs #; Road vs Rd; missing or inconsistent zip code; old address still live on inactive directories.'],
            ['Phone number format', 'Dashes vs dots vs spaces; local number vs toll-free; old numbers still showing on outdated listings.'],
            ['Duplicate listings', 'Multiple GBP or Yelp entries for the same location — common after a move, rebrand, or ownership change.'],
          ].map(([label, desc]) => (
            <div key={label} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm"><strong className="text-foreground">{label}:</strong> {desc}</p>
            </div>
          ))}

          <BlogMidCta
            topic="NAP Consistency Audit"
            hook="The Found by AI Playbook includes a NAP audit worksheet and a prioritized list of the 20 directories that matter most for AI visibility — with instructions for fixing each one."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">How to audit and fix your NAP</h2>
          <p>Start with your canonical source of truth: Google Business Profile. Whatever name, address, and phone format is on GBP should be exactly replicated everywhere else. Then audit the top 15&ndash;20 directories where your business appears: Yelp, Apple Maps, Bing Places, Facebook, Better Business Bureau, and the vertical directories for your industry. Correct any discrepancies to match your GBP exactly &mdash; character for character on the address, including suite numbers and abbreviation style.</p>
          <p>Use a free tool like Moz Local or BrightLocal&apos;s free listing checker for a fast overview of where you&apos;re listed and where inconsistencies exist. Fix the highest-traffic directories first, then work your way down.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'citation-building-for-geo',    title: 'Citation Building for GEO: Which Directories Actually Matter', tag: 'Reviews & Citations' },
            { slug: 'google-business-profile-geo',   title: 'Why Google Business Profile Is Your Most Important GEO Asset',  tag: 'Local GEO'          },
            { slug: 'multi-location-geo',            title: 'Multi-Location GEO: How Chains and Franchises Handle AI',        tag: 'Local GEO'          },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
