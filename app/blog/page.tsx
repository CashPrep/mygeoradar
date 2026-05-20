import type { Metadata } from 'next'
import { BlogPageClient } from '@/components/blog/BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog — GEO & AI Search Visibility Guides',
  description: 'Practical guides for business owners who want to show up in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude.',
  openGraph: {
    title: 'Blog — GEO & AI Search Visibility Guides | MyGeoRadar',
    description: 'Practical guides for business owners who want to show up in AI-generated answers from ChatGPT, Perplexity, Gemini, and Claude.',
    url: 'https://mygeoradar.com/blog',
    siteName: 'MyGeoRadar',
    images: [{ url: 'https://mygeoradar.com/og-image.png', width: 1200, height: 630, alt: 'MyGeoRadar Blog — GEO & AI Visibility Guides' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'Blog — GEO & AI Search Visibility Guides | MyGeoRadar',
    description: 'Practical guides for business owners who want to show up in AI-generated answers.',
    images: ['https://mygeoradar.com/og-image.png'],
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
