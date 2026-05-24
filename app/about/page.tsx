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
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">About</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient-subtle">
              Built by someone who actually cares
            </h1>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              MyGeoRadar isn&apos;t a faceless SaaS. It was built by one person who got
              frustrated watching small businesses get left behind as AI replaced traditional search.
            </p>

            {/* Above-fold CTAs */}
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/playbook"
                className="btn-primary text-sm px-6 py-3"
              >
                Get the Found by AI Playbook <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="btn-secondary text-sm px-6 py-3"
              >
                GEO Blog
              </Link>
            </div>
          </div>

          {/* Founder card */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-card-hover ring-1 ring-border/50">
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
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/20 to-transparent pointer-events-none" />
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
                  <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 hover:bg-accent/20 transition-colors">
                    <GraduationCap className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-medium text-accent">Elon University &mdash; AI Scholar</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5 hover:border-accent/40 transition-colors">
                    <Lightbulb className="w-3.5 h-3.5 text-foreground-dim" />
                    <span className="text-xs font-medium text-foreground-dim">Self-taught developer &amp; entrepreneur</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 py-1.5 hover:border-accent/40 transition-colors">
                    <Radar className="w-3.5 h-3.5 text-foreground-dim" />
                    <span className="text-xs font-medium text-foreground-dim">Builder of MyGeoRadar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── WHAT I DISCOVERED ─── */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-2 text-center">What I found when I started testing</h2>
            <p className="text-sm text-muted text-center mb-8 max-w-xl mx-auto">
              Before writing a single word of the playbook, I ran every prompt in the pack
              on 50+ real local businesses across 8 industries. The results were worse than I expected.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: Search,
                  stat: '9 in 10',
                  body: 'businesses had zero presence in AI answers — not mentioned, not cited, not acknowledged when asked directly about their category',
                },
                {
                  icon: BarChart2,
                  stat: '6 of 50',
                  body: 'had accurate AI descriptions — the rest had wrong hours, missing services, outdated locations, or were described as competitors',
                },
                {
                  icon: CheckCircle,
                  stat: '< 30 days',
                  body: 'was the average time to go from invisible to appearing in AI answers after applying the playbook\'s 27-point checklist',
                },
              ].map(({ icon: Icon, stat, body }) => (
                <div
                  key={stat}
                  className="p-6 rounded-2xl bg-surface border border-border border-l-4 border-l-accent/50 text-center hover:shadow-card-hover transition-all"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-accent mb-1">{stat}</p>
                  <p className="text-sm text-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted text-center mt-6 max-w-2xl mx-auto leading-relaxed">
              That&apos;s fixable. Every one of those businesses had the same gaps, in roughly the same order.
              That pattern is the playbook &mdash; the exact sequence of fixes, in the exact order that moves
              the needle fastest.
            </p>
          </div>

          {/* Divider */}
          <div className="divider my-12" />

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-muted text-sm mb-5">
              Ready to get your business found and recommended by AI?
            </p>
            <Link
              href="/playbook"
              className="btn-primary text-sm px-6 py-3"
            >
              Get the Found by AI Playbook &mdash; $27
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-muted mt-4">One-time &middot; Instant download &middot; 30-day money-back guarantee</p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
