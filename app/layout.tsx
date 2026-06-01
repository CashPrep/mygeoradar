import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MyGeoRadar — Get Found by AI Assistants',
    template: '%s | MyGeoRadar',
  },
  description:
    'Find out if your business shows up when people ask ChatGPT, Perplexity, Gemini, or Claude. Free AI visibility scan — get your score and a step-by-step fix plan.',
  keywords: [
    'AI visibility',
    'get found by AI',
    'ChatGPT business visibility',
    'Perplexity business listing',
    'GEO optimization',
    'generative engine optimization',
    'AI search optimization',
    'how to show up on ChatGPT',
    'found by AI playbook',
    'AI SEO',
    'LLM visibility',
    'AI search ranking',
  ],
  metadataBase: new URL('https://www.mygeoradar.com'),
  alternates: {
    canonical: 'https://www.mygeoradar.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.mygeoradar.com',
    title: 'MyGeoRadar — Get Found by AI Assistants',
    description:
      'Most businesses are invisible to AI assistants. Run a free scan to see your AI visibility score — then fix it with the Found by AI Playbook.',
    siteName: 'MyGeoRadar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyGeoRadar — Get Found by AI Assistants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'MyGeoRadar — Get Found by AI Assistants',
    description:
      'Most businesses are invisible to AI assistants. Run a free scan, see your score, fix it. $27 one-time playbook.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
  verification: {
    // Add Google Search Console verification token here if not already in HTML
    // google: 'YOUR_TOKEN',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MyGeoRadar',
  url: 'https://www.mygeoradar.com',
  logo: 'https://www.mygeoradar.com/icon-512.png',
  description:
    'MyGeoRadar helps businesses get found and recommended by AI assistants like ChatGPT, Perplexity, Gemini, and Claude.',
  founder: {
    '@type': 'Person',
    name: 'Andrew Garber',
  },
  sameAs: ['https://twitter.com/MyGEORadar'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://www.mygeoradar.com',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MyGeoRadar',
  url: 'https://www.mygeoradar.com',
  description:
    'Get your business found and recommended by AI assistants — ChatGPT, Perplexity, Gemini, and Claude.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.mygeoradar.com/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MyGeoRadar AI Visibility Scanner',
  url: 'https://www.mygeoradar.com',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'Scan your website and get a free AI visibility score. See how ChatGPT, Perplexity, Gemini & Claude crawl your site — and get a step-by-step action plan to show up more.',
  featureList: [
    'Free AI visibility score',
    'ChatGPT visibility analysis',
    'Perplexity presence check',
    'GEO optimization recommendations',
    'Step-by-step fix playbook',
  ],
  screenshot: 'https://www.mygeoradar.com/og-image.png',
  offers: {
    '@type': 'Offer',
    price: '27',
    priceCurrency: 'USD',
    name: 'Found by AI Playbook',
    description: 'Step-by-step guide to get your business found by ChatGPT, Perplexity, Gemini, and Claude.',
    url: 'https://www.mygeoradar.com',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
    bestRating: '5',
    worstRating: '1',
  },
  provider: {
    '@type': 'Organization',
    name: 'MyGeoRadar',
    url: 'https://www.mygeoradar.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-software"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-49BR1TEVM4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-49BR1TEVM4', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  )
}
