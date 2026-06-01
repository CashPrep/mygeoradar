import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CITIES } from '@/lib/cities'
import { MapPin, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Visibility by City | MyGeoRadar',
  description: 'Find out how visible local businesses are to AI assistants like ChatGPT, Perplexity, and Gemini in your city. Browse AI visibility data for 100 US cities.',
  alternates: { canonical: 'https://www.mygeoradar.com/cities' },
}

export default function CitiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <section className="border-b border-border bg-surface/50 pt-24">
          <div className="max-w-3xl mx-auto px-4 py-12 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">Cities</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">AI Visibility by City</h1>
            <p className="text-muted leading-relaxed max-w-xl">
              How visible are local businesses to ChatGPT, Perplexity, Gemini, and Claude in your city? Browse AI discovery data for 100 major US markets.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CITIES.map(city => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="flex items-center justify-between gap-2 bg-surface border border-border rounded-xl px-4 py-3 hover:border-accent/50 hover:text-accent transition-colors group"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold">{city.name}</span>
                  <span className="text-xs text-muted">{city.state}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-accent shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
