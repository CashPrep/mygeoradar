import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { BlogCta } from '@/components/blog/BlogCta'
import { BlogMidCta } from '@/components/blog/BlogMidCta'
import { BlogArticleSchema } from '@/components/blog/BlogArticleSchema'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const metadata = {
  title: 'Why ChatGPT Doesn\'t Recommend My Business (And How to Fix It)',
  description: 'If your business never shows up when people ask ChatGPT for recommendations, here are the exact reasons why — and a step-by-step fix plan you can start today.',
  openGraph: {
    title: 'Why ChatGPT Doesn\'t Recommend My Business (And How to Fix It)',
    description: 'If your business never shows up when people ask ChatGPT for recommendations, here are the exact reasons why — and a step-by-step fix plan you can start today.',
    url: 'https://mygeoradar.com/blog/why-chatgpt-doesnt-recommend-my-business',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'Why ChatGPT Doesn\'t Recommend My Business — MyGeoRadar' }],
    type: 'article',
    publishedTime: '2026-06-01T00:00:00.000Z',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    title: 'Why ChatGPT Doesn\'t Recommend My Business (And How to Fix It)',
    description: 'If your business never shows up when people ask ChatGPT for recommendations, here are the exact reasons why.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function WhyChatGPTDoesntRecommendPage() {
  return (
    <main className="min-h-screen bg-background">
      <BlogArticleSchema
        title="Why ChatGPT Doesn't Recommend My Business (And How to Fix It)"
        description="If your business never shows up when people ask ChatGPT for recommendations, here are the exact reasons why — and a step-by-step fix plan you can start today."
        url="https://mygeoradar.com/blog/why-chatgpt-doesnt-recommend-my-business"
        publishedTime="2026-06-01T00:00:00.000Z"
      />
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">Fix Guide</Badge>
            <span className="text-xs text-muted">June 1, 2026 &middot; 8 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            Why ChatGPT Doesn&apos;t Recommend My Business (And How to Fix It)
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            You Googled your own business and it shows up. So why does ChatGPT act like you don&apos;t exist? Here are the five most common reasons — and exactly what to do about each one.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-muted leading-relaxed">

          <p>Millions of people now ask ChatGPT questions like &ldquo;What&apos;s the best HVAC company in Denver?&rdquo; or &ldquo;Which accounting software should a freelancer use?&rdquo; ChatGPT answers those questions by citing specific businesses and products. If your business never comes up, you&apos;re losing those leads to competitors who figured out AI visibility first.</p>

          <p>The good news: there are clear, fixable reasons why ChatGPT ignores most businesses. Here are the five most common ones, in order of impact.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">Reason 1: ChatGPT Can&apos;t Clearly Identify Your Entity</h2>
          <p>ChatGPT doesn&apos;t think in keywords — it thinks in entities. An entity is a clearly defined &ldquo;thing&rdquo; in the world: a business with a name, location, category, and verifiable identity. If your business&apos;s name, address, phone number, and description are inconsistent across the web, the AI can&apos;t confidently confirm you exist as a distinct entity.</p>
          <p>Check: Does your business name appear identically on your website, Google Business Profile, Yelp, Facebook, LinkedIn, and major directories? Even small variations (&ldquo;LLC&rdquo; in some places, missing in others) create ambiguity that AI models resolve by ignoring you.</p>
          <p><strong className="text-foreground">Fix:</strong> Audit your NAP (Name, Address, Phone) consistency across every directory listing. Use a tool like BrightLocal or manually check the top 20 citations. Make them identical, down to punctuation.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">Reason 2: You Have No Structured Data</h2>
          <p>Structured data (also called schema markup) is code on your website that explicitly tells search engines and AI crawlers what type of business you are, where you&apos;re located, what your hours are, and what your customers say about you. Without it, AI models have to guess — and they usually don&apos;t guess in your favor.</p>
          <p>The schema types that matter most for AI citations are: <code className="bg-surface text-foreground px-1 rounded text-sm">LocalBusiness</code>, <code className="bg-surface text-foreground px-1 rounded text-sm">Organization</code>, <code className="bg-surface text-foreground px-1 rounded text-sm">AggregateRating</code>, and <code className="bg-surface text-foreground px-1 rounded text-sm">FAQPage</code>. Most small business websites have none of these.</p>
          <p><strong className="text-foreground">Fix:</strong> Add a <code className="bg-surface text-foreground px-1 rounded text-sm">LocalBusiness</code> or <code className="bg-surface text-foreground px-1 rounded text-sm">Organization</code> JSON-LD block to your homepage. Include your business name, address, phone, URL, opening hours, and a description. This is one of the highest-impact, lowest-effort GEO improvements available.</p>

          <BlogMidCta
            topic="Complete ChatGPT Visibility Fix"
            hook="The Found by AI Playbook gives you the exact schema templates, directory checklist, and 30-day plan to get your business recommended by ChatGPT, Perplexity, and Gemini."
          />

          <h2 className="text-xl font-bold text-foreground mt-4">Reason 3: You Have Insufficient Editorial Mentions</h2>
          <p>ChatGPT&apos;s training data and retrieval systems weight businesses that are mentioned in third-party content — news articles, industry blogs, review roundups, and directories. A business with five Yelp reviews and no press mentions signals &ldquo;small, unverified&rdquo; to the model. A business mentioned in a Forbes article, a niche industry publication, and three respected directories signals &ldquo;real, credible, recommend-worthy.&rdquo;</p>
          <p>You don&apos;t need to be in the New York Times. Even getting mentioned in a local news outlet, a relevant niche blog, or a well-trafficked industry directory moves the needle significantly.</p>
          <p><strong className="text-foreground">Fix:</strong> Start with directories specific to your industry (lawyer directories, contractor platforms, software review sites like G2 or Capterra). Then pursue two or three editorial placements — a guest article, a quote in a journalist&apos;s story via HARO or Qwoted, or a feature in a niche newsletter.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">Reason 4: Your Website Doesn&apos;t Answer the Questions AI Gets Asked</h2>
          <p>AI assistants recommend businesses that answer questions. If someone asks ChatGPT &ldquo;what should I look for in a family dentist,&rdquo; it synthesizes content from dental websites and blogs that directly address that question. If your website is just a homepage, a services page, and a contact form — with no content that addresses real questions — AI has nothing to pull from when your category comes up.</p>
          <p>This is why content marketing matters for GEO even more than it does for traditional SEO. You need dedicated pages that answer the specific questions your ideal customers are asking AI about.</p>
          <p><strong className="text-foreground">Fix:</strong> Write five to ten FAQ-style pages or blog posts that directly answer the top questions someone would ask an AI before hiring a business in your category. Use natural language, be specific to your location and specialty, and structure answers clearly with headings.</p>

          <h2 className="text-xl font-bold text-foreground mt-4">Reason 5: GPTBot Is Blocked From Crawling Your Site</h2>
          <p>OpenAI&apos;s crawler, GPTBot, indexes content from websites to use in ChatGPT&apos;s responses. If your <code className="bg-surface text-foreground px-1 rounded text-sm">robots.txt</code> file disallows GPTBot — either intentionally or through a wildcard block — ChatGPT literally cannot read your site to learn about you.</p>
          <p>Many WordPress themes and website builders add overly broad <code className="bg-surface text-foreground px-1 rounded text-sm">robots.txt</code> rules by default. It&apos;s worth checking yours explicitly.</p>
          <p><strong className="text-foreground">Fix:</strong> Open your site&apos;s <code className="bg-surface text-foreground px-1 rounded text-sm">robots.txt</code> (at yourdomain.com/robots.txt) and make sure it contains either nothing blocking GPTBot, or an explicit allow:</p>
          <pre className="bg-surface border border-divider rounded-lg p-4 text-sm text-foreground overflow-x-auto"><code>{`User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /`}</code></pre>

          <h2 className="text-xl font-bold text-foreground mt-4">How to Check Your Current AI Visibility Score</h2>
          <p>The fastest way to diagnose which of these five problems applies to your business is to run a free AI visibility scan. MyGeoRadar checks your site for entity clarity, structured data, crawlability, citation signals, and authority markers — and gives you a 0–100 score with a prioritized fix list in under 60 seconds.</p>
          <p>Most businesses that run the scan for the first time score between 20 and 45 out of 100. The businesses ChatGPT regularly recommends tend to score above 75. The gap between where you are and where you need to be is almost always fixable within 30 to 60 days of focused effort.</p>

        </div>

        <RelatedPosts
          posts={[
            { slug: 'how-to-show-up-in-perplexity',  title: 'How to Get Your Business to Show Up in Perplexity AI', tag: 'Fix Guide'   },
            { slug: 'schema-markup-for-geo',         title: 'Schema Markup for GEO: Complete Guide',               tag: 'Technical'  },
            { slug: 'nap-consistency-geo',           title: 'NAP Consistency and GEO: Why It Matters',             tag: 'Technical'  },
          ]}
        />
        <BlogCta />
      </article>
      <Footer />
    </main>
  )
}
