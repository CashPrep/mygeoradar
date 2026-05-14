import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Navbar }   from '@/components/layout/Navbar'
import { Footer }   from '@/components/layout/Footer'
import { ScanPageClient } from './ScanPageClient'

export const metadata: Metadata = {
  title: 'Scan Your Business',
  description: 'Run a full AI visibility scan across ChatGPT, Perplexity, Gemini & Claude. See exactly where your business stands in AI-generated answers.',
  openGraph: {
    title: 'Scan Your Business | MyGeoRadar',
    description: 'Run a full AI visibility scan across ChatGPT, Perplexity, Gemini & Claude.',
    url: 'https://mygeoradar.com/scan',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MyGeoRadar AI Scan' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'Scan Your Business | MyGeoRadar',
    description: 'Run a full AI visibility scan across ChatGPT, Perplexity, Gemini & Claude.',
    images: ['/og-image.png'],
  },
}

export default function ScanPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Scan your business</h1>
          <p className="mt-2 text-foreground-dim text-sm">
            Full AI visibility report across ChatGPT, Perplexity, Gemini &amp; Claude.
          </p>
        </div>
        <Suspense fallback={<div />}>
          <ScanPageClient />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
