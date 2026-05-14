import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Launch Day GEO: How to Set Up AI Visibility Before Your Business Goes Live',
  description: 'Most new businesses lose their first 90 days of AI visibility by doing nothing. Here\'s how to build your GEO foundation before you open — so you show up from day one.',
}

export default function GeoBeforeLaunchPage() {
  return (
    <main className="min-h-screen bg-background">
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
          <p className="text-lg text-foreground-dim leading-relaxed">
            Most new businesses lose their first 90 days of AI visibility by doing nothing. Here&apos;s how to build your GEO foundation before you open &mdash; so you show up from day one.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-foreground-dim leading-relaxed">

          <h2 className="text-xl font-bold text-foreground mt-4">The invisible opening</h2>
          <p>
            Every new business spends its first weeks focused on operations: signage, inventory, staff, systems. Digital presence is usually an afterthought. &ldquo;We&apos;ll get to the website later.&rdquo; Social media &ldquo;once we&apos;re settled.&rdquo; Google listing &ldquo;when we have time.&rdquo;
          </p>
          <p>
            In the AI era, this delay has a specific cost. AI engines build their entity models from aggregated web data. The earlier and more consistently your business appears across credible sources, the faster the AI&apos;s confidence in your entity grows. Every week you delay is a week you&apos;re not building that signal &mdash; and a week a competitor who launched earlier gets to compound their head start.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">The pre-launch GEO checklist</h2>
          <p>You can complete most of this before you open your doors. Some of it can be done even before your website is live.</p>

          {[
            {
              phase: 'Phase 1: Before launch (2&ndash;4 weeks out)',
              items: [
                'Claim and fully complete your Google Business Profile &mdash; you can add your opening date and set status to &lsquo;opening soon&rsquo;',
                'Register your business on Bing Places for Business (this directly feeds ChatGPT&apos;s local knowledge)',
                'Create profiles on Yelp, Apple Maps, and Facebook Business even before you have reviews',
                'Choose your business name, address, and phone number format and commit to it &mdash; never change this across platforms',
                'Set up Wikidata entry if your category warrants it (service businesses usually don&apos;t; notable brands do)',
              ],
            },
            {
              phase: 'Phase 2: At launch (launch week)',
              items: [
                'Add LocalBusiness JSON-LD schema to your homepage &mdash; include name, address, phone, hours, category, and geo coordinates',
                'Write and publish your About page with specific, entity-rich language: who you are, what you do, where you serve, and your founding story',
                'Publish one foundational FAQ page that answers the 10 most common questions about your category',
                'Ask your first 10 customers for Google reviews immediately &mdash; early review velocity signals a real, active business',
                'Submit a press release to local media about your opening &mdash; even a brief mention in a local outlet creates a credible citation',
              ],
            },
            {
              phase: 'Phase 3: First 30 days',
              items: [
                'Get listed on 5&ndash;10 industry-specific directories relevant to your business category',
                'Publish one educational blog post per week about topics your customers search for',
                'Run your first MyGeoRadar scan to establish a baseline AI visibility score',
                'Set a monthly reminder to check your score and scan for inaccurate AI-generated information about your business',
              ],
            },
          ].map((phase) => (
            <div key={phase.phase}>
              <h3 className="font-semibold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: phase.phase }} />
              <ul className="flex flex-col gap-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-1 shrink-0">&#8250;</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="text-xl font-bold text-foreground mt-4">Why early consistency compounds</h2>
          <p>
            AI engines don&apos;t just look at your data today. They build a longitudinal picture: how long has this entity existed, has it been consistent over time, does new data confirm old data or contradict it? A business that has had consistent NAP data across 15 directories for six months is more trustworthy to an AI engine than one that set everything up perfectly last Tuesday.
          </p>
          <p>
            Starting early means you&apos;re building that history from day one. By the time your competitors in the same market get serious about GEO, your entity will already have a track record they can&apos;t fast-track.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-4">The one thing most new businesses skip</h2>
          <p>
            Schema markup. It takes under an hour to implement, costs nothing, and sends one of the clearest possible signals to AI engines about exactly who and what your business is. The overwhelming majority of small businesses have no schema at all. Adding it puts you immediately ahead of competitors who have been operating for years but never got around to it.
          </p>
        </div>

        <div className="mt-10 p-6 bg-surface-2 border border-border rounded-xl flex flex-col gap-4">
          <p className="font-semibold text-foreground">Check your AI visibility from day one</p>
          <p className="text-sm text-foreground-dim">See how ChatGPT, Perplexity, Gemini, and Claude currently describe your business &mdash; free in 60 seconds.</p>
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
