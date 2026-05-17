import type { Metadata } from 'next'
import Script from 'next/script'
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
      "See exactly how AI answers talk about your business. Get a free score in seconds, then fix what's broken.",
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://mygeoradar.com/#organization',
      name: 'MyGeoRadar',
      url: 'https://mygeoradar.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mygeoradar.com/og-image.png',
        width: 1200,
        height: 630,
      },
      sameAs: [
        'https://twitter.com/MyGEORadar',
      ],
      description:
        'MyGeoRadar helps businesses measure and improve their visibility in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://mygeoradar.com/#website',
      url: 'https://mygeoradar.com',
      name: 'MyGeoRadar',
      publisher: { '@id': 'https://mygeoradar.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://mygeoradar.com/#app',
      name: 'MyGeoRadar',
      url: 'https://mygeoradar.com',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '24.99',
        priceCurrency: 'USD',
        description: 'First AI visibility scan — 50% off introductory price.',
      },
      description:
        'AI search visibility scanner. See how ChatGPT, Perplexity, Gemini, and Claude answer questions about your business and get a prioritized fix plan.',
      publisher: { '@id': 'https://mygeoradar.com/#organization' },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://mygeoradar.com/#webpage',
      url: 'https://mygeoradar.com',
      name: 'MyGeoRadar — AI Search Visibility for Your Business',
      isPartOf: { '@id': 'https://mygeoradar.com/#website' },
      about: { '@id': 'https://mygeoradar.com/#app' },
      description:
        'See exactly how AI engines like ChatGPT, Perplexity, and Gemini answer questions about your business — and get a clear action plan to show up more.',
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}
