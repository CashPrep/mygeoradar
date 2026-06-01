import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'GEO Checklist for Beginners: 10 Things to Do in Your First 30 Days',
  description: 'New to GEO? Here is a practical, prioritized checklist of the 10 highest-impact actions you can take in your first month to start building AI visibility.',
  openGraph: {
    title: 'GEO Checklist for Beginners: 10 Things to Do in Your First 30 Days',
    description: 'New to GEO? Here is a practical, prioritized checklist of the 10 highest-impact actions you can take in your first month.',
    url: 'https://mygeoradar.com/blog/geo-for-beginners-checklist',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'GEO Checklist for Beginners — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-28T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'GEO Checklist for Beginners: 10 Things to Do in Your First 30 Days',
    description: 'New to GEO? Here is a practical, prioritized checklist of the 10 highest-impact actions you can take in your first month.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function GeoBeginnerChecklistPage() {
  const checklist = [
    { step: 1, action: 'Claim and fully complete your Google Business Profile', why: 'GBP is the single most-read source by AI tools for local business data. Every field matters.' },
    { step: 2, action: 'Add LocalBusiness schema to your homepage', why: 'Schema gives AI crawlers machine-readable facts: name, address, phone, hours, category.' },
    { step: 3, action: 'Audit your NAP consistency across the top 10 directories', why: 'Conflicting addresses or phone numbers confuse AI models and suppress your visibility.' },
    { step: 4, action: 'Get 5 new Google reviews this month', why: 'Review recency and volume are direct GEO signals — AI surfaces businesses customers actively trust.' },
    { step: 5, action: 'Add an FAQ section to your website using FAQPage schema', why: 'AI models extract FAQ content verbatim when answering questions. This is a direct citation path.' },
    { step: 6, action: 'Write one 800-word page answering the most common question in your category', why: 'Topical authority matters. One strong answer page beats ten thin pages.' },
    { step: 7, action: 'Submit your site to Bing Webmaster Tools and force-index your key pages', why: 'Bing powers ChatGPT and Copilot search. Most businesses ignore it and leave citations on the table.' },
    { step: 8, action: 'Add an AggregateRating schema pulling your real review score', why: 'AI models use rating signals to assess credibility. Structured data surfaces it reliably.' },
    { step: 9, action: 'List your business in the top 5 vertical directories for your industry', why: 'Directories like Healthgrades, Avvo, or Houzz are trusted sources for specific categories.' },
    { step: 10, action: 'Run your first AI visibility audit with MyGeoRadar', why: 'You need a baseline score before you can track progress. What gets measured gets improved.' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="GEO Checklist for Beginners: 10 Things to Do in Your First 30 Days"
        description="New to GEO? Here is a practical, prioritized checklist of the 10 highest-impact actions you can take in your first month to start building AI visibility."
        url="https://mygeoradar.com/blog/geo-for-beginners-checklist"
        publishedTime="2026-05-28T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">GEO Basics</Badge>
            <span className="text-xs text-muted">May 28, 2026 &middot; 6 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            GEO Checklist for Beginners: 10 Things to Do in Your First 30 Days
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            New to GEO? Here&apos;s a practical, prioritized checklist of the 10 highest-impact actions you can take in your first month to start building AI visibility.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">Why a checklist beats a strategy doc</h2>
          <p>Most GEO advice is conceptual. You read about signals, frameworks, and best practices — and then you sit at your desk wondering where to actually start. This checklist skips the theory. Every item is actionable, ordered by impact, and completable within your first 30 days.</p>
          <p>You don&apos;t need to finish all 10 in week one. Work through them in order. Each one compounds on the last. By day 30, you&apos;ll have a meaningful GEO foundation that most of your competitors haven&apos;t bothered to build.</p>

          <BlogMidCta
            topic="Complete GEO Implementation System"
            hook="This checklist gets you started. The Found by AI Playbook gives you the full system — every step, every template, and a 30-day calendar so you know exactly what to do each day."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">Your first 30 days</h2>
          <div className="flex flex-col gap-5">
            {checklist.map(({ step, action, why }) => (
              <div key={step} className="flex gap-4 p-4 rounded-xl bg-surface border border-border">
                <div className="w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-bold flex items-center justify-center shrink-0">{step}</div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{action}</p>
                  <p className="text-xs text-muted mt-1">{why}</p>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold text-foreground mt-4">What to do after the checklist</h2>
          <p>These 10 steps are your foundation, not your ceiling. Once they&apos;re done, focus on content depth — more authoritative pages answering questions AI is regularly being asked about your industry. Then track your score monthly and iterate on whatever is lowest.</p>
        </div>
        <RelatedPosts
          posts={[
            { slug: 'what-is-geo',           title: "What is GEO? The Beginner's Guide",                 tag: 'GEO Basics' },
            { slug: 'how-long-does-geo-take', title: 'How Long Does GEO Take to Work?',                   tag: 'GEO Basics' },
            { slug: 'schema-markup-for-geo',  title: 'Schema Markup and GEO: Why Structured Data Matters', tag: 'Technical GEO' },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
