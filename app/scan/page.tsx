import { Suspense } from 'react'
import { Navbar }   from '@/components/layout/Navbar'
import { Footer }   from '@/components/layout/Footer'
import { ScanPageClient } from './ScanPageClient'

export const metadata = {
  title:       'Scan Your Business | MyGeoRadar',
  description: 'Run a full AI visibility scan across ChatGPT, Perplexity, Gemini & Claude.',
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
