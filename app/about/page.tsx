import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, GraduationCap, Lightbulb, Radar, Search, BarChart2, CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'About the Founder | MyGeoRadar',
  description:
    'MyGeoRadar was built by Andrew Garber, an AI Scholar and entrepreneur obsessed with how AI is reshaping the way businesses get found online.',
  openGraph: {
    title: 'About the Founder | MyGeoRadar',
    description:
      'MyGeoRadar was built by Andrew Garber, an AI Scholar and entrepreneur obsessed with how AI is reshaping the way businesses get found online.',
    url: 'https://mygeoradar.com/about',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'About MyGeoRadar' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'About the Founder | MyGeoRadar',
    description:
      'MyGeoRadar was built by Andrew Garber, an AI Scholar and entrepreneur obsessed with how AI is reshaping the way businesses get found online.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">About</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Built by someone who actually cares
            </h1>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              MyGeoRadar isn&apos;t a faceless SaaS. It was built by one person who got
              frustrated watching small businesses get left behind as AI replaced traditional search.
            </p>

            {/* Above-fold CTA */}
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/playbook"
                className="inline-flex items-center gap-2 bg-accent text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors"
              >
                Get the Found by AI Playbook <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-surface border border-border text-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:bg-surface-2 transition-colors"
              >
                Free AI visibility tips
              </Link>
            </div>
          </div>

          {/* Founder card */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row">

              {/* Photo */}
              <div className="md:w-64 flex-shrink-0 bg-surface-2">
                <div className="relative w-full h-72 md:h-full min-h-[18rem]">
                  <Image
                    src="/andrew.jpg"
                    alt="Andrew Garber, founder of MyGeoRadar"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 p-8 md:p-10 flex flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Andrew Garber</h2>
                  <p className="text-sm text-accent font-medium mt-1">Founder, MyGeoRadar</p>
                </div>

                <p className="text-muted leading-relaxed text-sm">
                  I built MyGeoRadar because I kept asking the same question:
                  <em> &ldquo;When someone asks ChatGPT or Perplexity to recommend a business like mine, do I even show up?&rdquo;</em>
                  {' '}Most business owners had no idea. So I built the tools and guides to answer it.
                </p>

                <p className="text-muted leading-relaxed text-sm">
                  I&apos;m a self-taught developer and entrepreneur. I attend Elon University as an{' '}
                  <strong className="text-foreground">Artificial Intelligence Scholar</strong> &mdash;
                  one of a select group of students chosen for deep study at the intersection of AI,
                  ethics, and real-world application.
                </p>

                <p className="text-muted leading-relaxed text-sm">
                  The <strong className="text-foreground">Found by AI Playbook</strong> is my answer
                  to the question every small business owner should be asking right now:
                  how do I get AI assistants to recognize, trust, and recommend my business?
                  I wrote the playbook I wish existed when I started studying this.
                </p>

                {/* Credential badges */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-medium text-accent">Elon University &mdash; AI Scholar</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-foreground-dim" />
                    <span className="text-xs font-medium text-foreground-dim">Self-taught developer &amp; entrepreneur</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5">
                    <Radar className="w-3.5 h-3.5 text-foreground-dim" />
                    <span className="text-xs font-medium text-foreground-dim">Builder of MyGeoRadar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── WHAT I DISCOVERED ─── */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold mb-2 text-center">What I found when I started testing</h2>
            <p className="text-sm text-muted text-center mb-8 max-w-xl mx-auto">
              Before writing a single word of the playbook, I ran every prompt in the pack
              on 50+ real local businesses across 8 industries. The results were worse than I expected.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl bg-surface border border-border text-center">
                <div className="flex justify-center mb-3">
                  <Search className="w-6 h-6 text-accent" />
                </div>
                <p className="text-3xl font-black text-accent mb-1">9 in 10</p>
                <p className="text-sm text-muted leading-relaxed">
                  businesses had zero presence in AI answers — not mentioned, not cited, not acknowledged
                  when asked directly about their category
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-surface border border-border text-center">
                <div className="flex justify-center mb-3">
                  <BarChart2 className="w-6 h-6 text-accent" />
                </div>
                <p className="text-3xl font-black text-accent mb-1">6 of 50</p>
                <p className="text-sm text-muted leading-relaxed">
                  had accurate AI descriptions — the rest had wrong hours, missing services,
                  outdated locations, or were described as competitors
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-surface border border-border text-center">
                <div className="flex justify-center mb-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <p className="text-3xl font-black text-accent mb-1">&lt; 30 days</p>
                <p className="text-sm text-muted leading-relaxed">
                  was the average time to go from invisible to appearing in AI answers
                  after applying the playbook&apos;s 27-point checklist
                </p>
              </div>
            </div>
            <p className="text-sm text-muted text-center mt-6 max-w-2xl mx-auto leading-relaxed">
              That&apos;s fixable. Every one of those businesses had the same gaps, in roughly the same order.
              That pattern is the playbook &mdash; the exact sequence of fixes, in the exact order that moves
              the needle fastest.
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted text-sm mb-5">
              Ready to get your business found and recommended by AI?
            </p>
            <Link
              href="/playbook"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors"
            >
              Get the Found by AI Playbook &mdash; $27
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
