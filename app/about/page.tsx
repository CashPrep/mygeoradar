import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, GraduationCap, Lightbulb, Radar } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

export const metadata = {
  title: 'About the Founder | MyGeoRadar',
  description: 'MyGeoRadar was built by Andrew Garber, an AI Scholar and entrepreneur obsessed with how AI is reshaping the way businesses get found online.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">About</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Built by someone who{' '}
              <span className="text-gradient">actually cares</span>
            </h1>
            <p className="mt-5 text-foreground-dim max-w-xl mx-auto leading-relaxed">
              MyGeoRadar isn&apos;t a faceless SaaS. It was built by one person who got frustrated that no tool existed to show how AI engines actually talk about businesses.
            </p>
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

                <p className="text-foreground-dim leading-relaxed text-sm">
                  I built MyGeoRadar because I kept asking the same question: <em>&ldquo;When someone asks ChatGPT or Perplexity to recommend a business like mine, do I even show up?&rdquo;</em> There was no good answer. So I built one.
                </p>

                <p className="text-foreground-dim leading-relaxed text-sm">
                  I&apos;m a self-taught developer and entrepreneur. I&apos;ll be attending Elon University as an incoming <strong className="text-foreground">Artificial Intelligence Scholar</strong> — one of a select group of students chosen for deep study at the intersection of AI, ethics, and real-world application.
                </p>

                <p className="text-foreground-dim leading-relaxed text-sm">
                  I believe small businesses deserve to understand how the next generation of search works. AI search is already here. MyGeoRadar helps you see where you stand.
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

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="text-foreground-dim text-sm mb-5">Ready to see how AI engines talk about your business?</p>
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors"
            >
              Run your AI radar scan
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
    </>
  )
}
