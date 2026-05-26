import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'Launch Day GEO: How to Set Up AI Visibility Before Your Business Goes Live',
  description: "Most new businesses lose their first 90 days of AI visibility by doing nothing. Here's how to build your GEO foundation before you open.",
  openGraph: {
    title: 'Launch Day GEO: How to Set Up AI Visibility Before Your Business Goes Live',
    description: "Most new businesses lose their first 90 days of AI visibility by doing nothing. Here's how to build your GEO foundation before you open.",
    url: 'https://mygeoradar.com/blog/geo-before-launch',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630 }],
    type: 'article',
    publishedTime: '2026-05-09T00:00:00.000Z',
  },
  twitter: { card: 'summary_large_image', site: '@MyGEORadar', images: ['https://mygeoradar.com/og-image.png'] },
}

export default function GeoBeforeLaunchPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="Launch Day GEO: How to Set Up AI Visibility Before Your Business Goes Live"
        description="Most new businesses lose their first 90 days of AI visibility by doing nothing. Here's how to build your GEO foundation before you open — so you show up from day one."
        url="https://mygeoradar.com/blog/geo-before-launch"
        publishedTime="2026-05-09T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Strategy</Badge>
            <span className="text-xs text-muted">May 9, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            Launch Day GEO: How to Set Up AI Visibility Before Your Business Goes Live
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Most new businesses lose their first 90 days of AI visibility by doing nothing. Here&apos;s how to build your GEO foundation before you open — so you show up from day one.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">Why the first 90 days matter</h2>
          <p>AI models update their knowledge on a rolling basis. The signals you establish in your first months of operation form the foundation of how AI assistants will describe your business for years. Businesses that do nothing in this window get categorized as low-signal entities — and that categorization is sticky.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The pre-launch GEO checklist</h2>
          {[
            'Claim and fully complete your Google Business Profile before you open — not after',
            'Add LocalBusiness schema markup to your website on day one',
            'Submit to the top 10 directories simultaneously — NAP consistency from the start',
            'Write a detailed About page with every key fact an AI would need to describe you accurately',
            'Create a /facts or /about page that reads like a Wikipedia entry for your business',
            'Get at least one editorial mention before or at launch — local press, industry blog, or podcast',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}

          <BlogMidCta
            topic="Pre-Launch GEO Foundation"
            hook="The playbook includes the complete list of the 15 directories that matter most for AI citations, the exact schema markup to add on day one, and a 30-day launch calendar so your new business shows up in AI answers from the start."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">The compound effect</h2>
          <p>Every week you delay establishing these signals is a week your competitors who do have them are building a lead. AI recommendation systems favor businesses with longer, more consistent entity histories. Starting right is dramatically easier than fixing a bad foundation later.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'google-business-profile-geo', title: 'Why Google Business Profile Is Your Most Important GEO Asset',           tag: 'Local GEO'     },
            { slug: 'schema-markup-for-geo',       title: 'Schema Markup and GEO: Why Structured Data Is Critical for AI Visibility', tag: 'Technical GEO' },
            { slug: 'how-long-does-geo-take',      title: 'How Long Does GEO Take to Work?',                                           tag: 'GEO Basics'    },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
