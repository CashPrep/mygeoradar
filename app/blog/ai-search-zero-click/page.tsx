import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer',
  description: 'AI search doesn\'t send clicks — it gives answers. If your business isn\'t mentioned in those answers, you\'re invisible. Here\'s what zero-click AI means for your growth strategy.',
}

export default function AiSearchZeroClickPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="max-w-2xl mx-auto px-4 pt-28 pb-20">

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="accent">AI Search</Badge>
            <span className="text-xs text-muted">May 13, 2026 &middot; 7 min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
            The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer
          </h1>
          <p className="text-lg text-foreground-dim leading-relaxed">
            AI search doesn&apos;t send clicks &mdash; it gives answers. If your business isn&apos;t mentioned in those answers, you&apos;re invisible. Here&apos;s what zero-click AI means for your growth strategy.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">We&apos;ve been here before — but this time it&apos;s different</h2>
          <p>
            In 2018, Google introduced featured snippets and started answering questions directly in search results. SEOs called it the &ldquo;zero-click apocalypse.&rdquo; Traffic to many information sites dropped. But businesses that sold local services largely survived, because Google still needed to point users somewhere.
          </p>
          <p>
            The AI era is categorically different. When someone asks ChatGPT &ldquo;what&apos;s the best accountant in Austin for small businesses,&rdquo; the AI doesn&apos;t return a list of links. It returns a synthesized answer &mdash; and sometimes a specific recommendation. The user closes the conversation and either calls that business or keeps chatting. There&apos;s no click. There&apos;s no search results page. There&apos;s just the answer.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">The new math of discovery</h2>
          <p>
            In the old model, visibility meant ranking. Being on page 1 guaranteed some percentage of users would see your listing. The conversion chain was: search → see listing → click → land on site → convert.
          </p>
          <p>
            In the AI model, visibility means being mentioned. The conversion chain compresses to: ask AI → get recommendation → contact business directly. The website visit may never happen &mdash; and yet the lead is real. This means your website traffic is no longer a reliable proxy for your actual visibility. A business could be getting recommended by AI hundreds of times per week and see no uptick in analytics.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">What zero-click AI means for your metrics</h2>
          {[
            {
              title: 'Organic traffic is undercounting your actual exposure',
              body: 'AI-driven recommendations that result in direct calls, direct navigation, or voice-to-action never appear in Google Analytics. If you\'re evaluating marketing ROI purely on web traffic, you\'re flying blind on an increasingly large portion of your inbound interest.',
            },
            {
              title: 'Brand recall matters more than it has in years',
              body: 'When AI mentions your business by name, users remember that name. They may search for it directly later, ask a follow-up question, or recommend it to someone else. AI recommendation is the new word-of-mouth — and it scales in a way human referrals never could.',
            },
            {
              title: 'Your competitors\' websites aren\'t necessarily winning',
              body: 'In traditional SEO, a competitor\'s better-ranking site is a clear, measurable threat. In AI search, a competitor could be getting far more AI recommendations than you while ranking identically on Google. You need to measure the AI channel separately.',
            },
            {
              title: 'First mention advantage is real',
              body: 'When an AI engine mentions a business first in an answer, users are disproportionately likely to choose that option. Position matters in AI answers just as it did in search — but the signals that determine position are completely different.',
            },
          ].map((p) => (
            <div key={p.title}>
              <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">How to win in a zero-click world</h2>
          <p>
            The businesses that will win the zero-click AI era are those that make themselves impossible to ignore in AI training data and real-time retrieval. That means three things:
          </p>
          <ul className="flex flex-col gap-3 list-none">
            {[
              { item: 'Entity dominance', detail: 'Your business name, category, location, and key attributes must be consistent and authoritative across every online touchpoint. AI engines build a confidence model — the more consistent the data, the higher the confidence.' },
              { item: 'Citation breadth', detail: 'Get mentioned in as many credible, relevant sources as possible. Review platforms, local directories, press coverage, industry publications — each one adds a data point to your entity.' },
              { item: 'Topical depth', detail: 'Create content that directly answers the questions your customers are asking AI engines. When the AI needs to answer a question about your category, your content should be the natural source.' },
            ].map(({ item, detail }) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-accent mt-1 shrink-0">&#8250;</span>
                <div>
                  <span className="font-semibold text-foreground">{item}: </span>
                  <span>{detail}</span>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-4">Measuring what you can&apos;t track directly</h2>
          <p>
            Since AI-driven discovery often bypasses your website entirely, you need leading indicators. Monthly branded search volume on Google is one proxy — if more people are searching your business name directly, something is driving awareness. Direct traffic spikes, call volume, and &ldquo;how did you hear about us&rdquo; responses that mention AI are others.
          </p>
          <p>
            The most direct measurement is running regular AI visibility scans. If AI engines are mentioning you more consistently and more prominently over time, the downstream business impact will follow &mdash; even if traditional analytics can&apos;t capture it directly.
          </p>
        </div>

        <div className="mt-10 p-6 bg-surface-2 border border-border rounded-xl flex flex-col gap-4">
          <p className="font-semibold text-foreground">Find out if AI engines are mentioning you</p>
          <p className="text-sm text-foreground-dim">Get your free AI visibility score across ChatGPT, Perplexity, Gemini, and Claude.</p>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors w-fit"
          >
            Run my free scan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </article>
      <Footer />
    </main>
  )
}
