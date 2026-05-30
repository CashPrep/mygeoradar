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
    default: 'MyGeoRadar — Get Found by AI',
    template: '%s | MyGeoRadar',
  },
  description:
    'Businesses invisible to ChatGPT, Perplexity & Gemini. The Found by AI Playbook fixes that — step-by-step, one time, $27.',
  keywords: [
    'AI visibility', 'get found by AI', 'ChatGPT business visibility',
    'Perplexity business listing', 'GEO optimization', 'generative engine optimization',
    'AI search guide', 'how to show up on ChatGPT', 'found by AI playbook',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.mygeoradar.com'),
  // No canonical here — Next.js generates correct per-page canonicals via metadataBase
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // NOTE: Do NOT set `url` here — it would be inherited by every page and
    // override each page's own OG url. Let child pages set their own url,
    // or Next.js will derive it from metadataBase + the current route.
    title: 'MyGeoRadar — Get Found by AI',
    description: 'Most businesses are invisible to AI assistants. The Found by AI Playbook shows you exactly how to fix that — step by step, one time, $27.',
    siteName: 'MyGeoRadar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyGeoRadar — Get Found by AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'MyGeoRadar — Get Found by AI',
    description: 'Most businesses are invisible to AI assistants. Fix it with the Found by AI Playbook — $27 one time.',
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
  url: 'https://www.mygeoradar.com',
  logo: 'https://www.mygeoradar.com/icon-512.png',
  description: 'MyGeoRadar helps businesses get found and recommended by AI assistants like ChatGPT, Perplexity, Gemini, and Claude.',
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
  url: 'https://www.mygeoradar.com',
  description: 'Get your business found and recommended by AI assistants — ChatGPT, Perplexity, Gemini, and Claude.',
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MyGeoRadar',
  url: 'https://www.mygeoradar.com',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Scan your website and get a free AI visibility score. See how ChatGPT, Perplexity, Gemini & Claude crawl your site — and get a step-by-step action plan to show up more.',
  offers: {
    '@type': 'Offer',
    price: '27',
    priceCurrency: 'USD',
    name: 'Found by AI Playbook',
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
            gtag('config', 'G-49BR1TEVM4');
          `}
        </Script>
      </body>
    </html>
  )
}
