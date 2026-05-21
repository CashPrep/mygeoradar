import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'

export const metadata = {
  title: 'The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer',
  description: "AI search doesn't send clicks — it gives answers. If your business isn't mentioned in those answers, you're invisible.",
  openGraph: {
    title: 'The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer',
    description: "AI search doesn't send clicks — it gives answers. Here's what zero-click AI means for your growth strategy.",
    url: 'https://mygeoradar.com/blog/ai-search-zero-click',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630 }],
    type: 'article',
    publishedTime: '2026-05-11T00:00:00.000Z',
  },
  twitter: { card: 'summary_large_image', site: '@MyGEORadar', images: ['https://mygeoradar.com/og-image.png'] },
}

export default function ZeroClickPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">AI Search</Badge>
            <span className="text-xs text-muted">May 11, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            AI search doesn&apos;t send clicks — it gives answers. If your business isn&apos;t mentioned in those answers, you&apos;re invisible to an entire generation of searchers.
          </p>
        </div>
        <div className="flex flex-col gap-6 text-muted leading-relaxed">
          <h2 className="text-xl font-bold text-foreground mt-4">The death of the click</h2>
          <p>For decades, getting found online meant ranking on page one of Google and hoping someone clicked your link. The AI era has broken that model. When a user asks ChatGPT for a recommendation, they get an answer — not a list of links. They act on that answer. Your website never gets visited. Your SEO ranking never gets rewarded. You were simply not mentioned.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">What zero-click means for local businesses</h2>
          <p>Local businesses are hit hardest. &ldquo;Best dentist near me,&rdquo; &ldquo;top-rated plumber in [city],&rdquo; &ldquo;who should I hire for kitchen renovation&rdquo; — these are exactly the high-intent queries that used to drive calls and bookings through Google. Now they increasingly go to AI assistants, which give confident, specific answers. If you’re not in those answers, you’re losing customers you never knew you were losing.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The new success metric: mentions, not clicks</h2>
          <p>In the AI era, the metric that matters is how often AI assistants mention your business when asked relevant questions. Not your Google ranking. Not your organic traffic. Your AI mention rate. This is what GEO (Generative Engine Optimization) measures and improves.</p>
          <h2 className="text-xl font-bold text-foreground mt-4">The window of opportunity</h2>
          <p>Most businesses haven’t figured this out yet. The ones that act now — building the entity signals, structured data, and content that AI models use — will own the AI recommendation landscape for their category before competitors realize what happened. This window will not stay open forever.</p>
        </div>
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
