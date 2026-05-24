import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'

export const metadata = {
  title: 'AI Search vs. Google Search: What Is Actually Changing?',
  description:
    'AI search and Google search feel similar but work completely differently. Here is an honest breakdown of what is actually changing, what is staying the same, and what it means for your business.',
  openGraph: {
    title: 'AI Search vs. Google Search: What Is Actually Changing?',
    description:
      'AI search and Google search feel similar but work completely differently. Here is what is actually changing and what it means for your business.',
    url: 'https://mygeoradar.com/blog/ai-search-vs-google-search',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'AI Search vs Google Search — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-05-23T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'AI Search vs. Google Search: What Is Actually Changing?',
    description: 'AI search and Google search work completely differently. Here is what is actually changing and what it means for your business.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function AiSearchVsGooglePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">AI Search</Badge>
            <span className="text-xs text-muted">May 23, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            AI Search vs. Google Search: What Is Actually Changing?
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            There is a lot of noise about AI replacing Google. The reality is more nuanced — and more important to understand if you want to make smart decisions about where to put your marketing energy.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-muted leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">The fundamental difference in how they work</h2>
          <p>Google Search is an index and ranking engine. It crawls billions of pages, indexes their content, and returns a ranked list of links based on relevance signals. The user then clicks a link and goes to a website. Google’s job ends when the user leaves.</p>
          <p>AI search is a synthesis engine. It does not return links — it generates an answer. ChatGPT, Perplexity, and Gemini pull from multiple sources, reconcile conflicting information, and produce a single confident response. The user often never visits a website at all. This is the zero-click shift that is changing the economics of online visibility for businesses.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">What has not changed</h2>
          <p>Google Search is still processing billions of queries per day and sending enormous traffic to websites. It is not going away. The change is that AI search is handling a growing share of the “research and recommendation” queries — the kind where someone wants a trusted answer rather than a list of options to sort through. These tend to be higher-intent queries, which is exactly why losing them to AI invisibility is so costly.</p>

          <BlogMidCta
            topic="How to Show Up in AI-Generated Answers"
            hook="Understanding the shift is one thing. The Found by AI Playbook gives you the complete system to act on it — covering every signal that drives AI recommendations, with a 30-day action plan."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">Different ranking signals</h2>
          {[
            'Google weights backlinks, page authority, and keyword relevance heavily',
            'AI weights entity clarity, citation consistency, review authority, and structured data',
            'Google rewards fresh, frequently-updated content',
            'AI rewards consistent, accurate, well-attributed information across multiple sources',
            'Google can rank a new page within weeks if it earns links',
            'AI visibility builds more slowly but compounds as more sources reference you',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">&#8250;</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">The practical takeaway for businesses</h2>
          <p>You do not need to choose between Google and AI search. The businesses winning in 2026 treat them as two separate surfaces with overlapping but distinct optimization requirements. SEO handles Google. GEO handles AI. Some work — like structured data, authoritative content, and strong citation profiles — improves both simultaneously. The worst outcome is focusing exclusively on one while ignoring the other as it grows.</p>

        </div>
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
