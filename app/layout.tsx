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
    default: 'MyGeoRadar — AI Search Visibility for Your Business',
    template: '%s | MyGeoRadar',
  },
  description:
    'Find out how ChatGPT, Perplexity & Gemini talk about your business. Get your AI visibility score and a step-by-step action plan — free scan in 60 seconds.',
  keywords: [
    'GEO', 'generative engine optimization', 'AI search visibility',
    'ChatGPT visibility', 'AI citation tracking', 'GEO tool',
    'AI SEO', 'show up on ChatGPT',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mygeoradar.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mygeoradar.com',
    title: 'MyGeoRadar — AI Search Visibility for Your Business',
    description: 'Find out how ChatGPT, Perplexity & Gemini talk about your business. Get your AI visibility score and a step-by-step action plan — free scan in 60 seconds.',
    siteName: 'MyGeoRadar',
    images: [
      {
        url: '/og-image.png',
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
    title: 'MyGeoRadar — AI Search Visibility',
    description: 'Find out how ChatGPT, Perplexity & Gemini talk about your business. Get your AI visibility score and a step-by-step action plan — free scan in 60 seconds.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MyGeoRadar',
  url: 'https://mygeoradar.com',
  logo: 'https://mygeoradar.com/icon-512.png',
  description: 'AI search visibility platform that shows how ChatGPT, Perplexity, Gemini, and Claude talk about your business.',
  founder: {
    '@type': 'Person',
    name: 'Andrew Garber',
  },
  sameAs: [
    'https://twitter.com/MyGEORadar',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MyGeoRadar',
  url: 'https://mygeoradar.com',
  description: 'Find out how ChatGPT, Perplexity & Gemini talk about your business.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://mygeoradar.com/scan?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
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
            gtag('config', 'G-49BR1TEVM4');
          `}
        </Script>
      </body>
    </html>
  )
}
