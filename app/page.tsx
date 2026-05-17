import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { EngineBar } from '@/components/home/EngineBar'
import { FeaturesGrid } from '@/components/home/FeaturesGrid'
import { HowItWorks } from '@/components/home/HowItWorks'
import { SampleResult } from '@/components/home/SampleResult'
import { PricingSection } from '@/components/home/PricingSection'
import { FaqSection } from '@/components/home/FaqSection'
import { CtaBanner } from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: 'MyGeoRadar — AI Search Visibility for Your Business',
  description:
    'See exactly how AI engines like ChatGPT, Perplexity, and Gemini answer questions about your business — and get a clear action plan to show up more.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mygeoradar.com',
    title: 'MyGeoRadar — AI Search Visibility for Your Business',
    description:
      'See exactly how AI answers talk about your business. Get a free score in seconds, then fix what\u2019s broken.',
    siteName: 'MyGeoRadar',
    images: [
      {
        url: 'https://mygeoradar.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyGeoRadar — AI Search Visibility for Your Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'MyGeoRadar — AI Search Visibility for Your Business',
    description: 'See how AI engines see your business. Fix it in minutes.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <EngineBar />
      <FeaturesGrid />
      <HowItWorks />
      <SampleResult />
      <PricingSection />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </main>
  )
}
