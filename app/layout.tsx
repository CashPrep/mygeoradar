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
    default: 'MyGeoRadar | Free AI Visibility Scanner — Get Found by ChatGPT, Perplexity & AI Search',
    template: '%s | MyGeoRadar',
  },
  description:
    'Run a free AI visibility scan in 30 seconds. See if ChatGPT, Perplexity & Gemini recommend your business — then fix every gap with our $27 GEO optimization (Generative Engine Optimization) playbook.',
  keywords: [
    'AI visibility',
    'AI visibility scanner',
    'AI search visibility',
    'get found by AI',
    'rank in AI search',
    'rank in ChatGPT',
    'rank in Perplexity',
    'ChatGPT business visibility',
    'Perplexity business listing',
    'AI search optimization',
    'how to show up on ChatGPT',
    'AI SEO',
    'LLM visibility',
    'AI search ranking',
    'GEO optimization',
    'generative engine optimization',
    'found by AI playbook',
  ],
  metadataBase: new URL('https://www.mygeoradar.com'),
  alternates: {
    canonical: 'https://www.mygeoradar.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.mygeoradar.com',
    title: 'MyGeoRadar | Free AI Visibility Scanner — Get Found by ChatGPT, Perplexity & AI Search',
    description:
      'Most businesses are invisible to AI assistants. Run a free AI visibility scan to see your score — then fix it with the Found by AI Playbook.',
    siteName: 'MyGeoRadar',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyGeoRadar — Free AI Visibility Scanner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MyGEORadar',
    creator: '@MyGEORadar',
    title: 'MyGeoRadar | Free AI Visibility Scanner — Get Found by ChatGPT & AI Search',
    description:
      'Most businesses are invisible to AI assistants. Run a free AI visibility scan, see your score, fix it. $27 one-time playbook.',
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
    'MyGeoRadar helps businesses improve their AI visibility and get recommended by AI assistants like ChatGPT, Perplexity, Gemini, and Claude through GEO optimization (Generative Engine Optimization).',
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
    'Free AI visibility scanner — see if ChatGPT, Perplexity, Gemini, and Claude recommend your business, then fix every gap with our GEO optimization playbook.',
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
    'Scan your website and get a free AI visibility score. See how ChatGPT, Perplexity, Gemini & Claude crawl your site — and get a step-by-step action plan to rank in AI search. Powered by GEO optimization (Generative Engine Optimization).',
  featureList: [
    'Free AI visibility score',
    'AI search visibility analysis',
    'GEO optimization analysis',
    'ChatGPT visibility check',
    'Perplexity presence check',
    'Step-by-step AI visibility fix playbook',
  ],
  screenshot: 'https://www.mygeoradar.com/og-image.png',
  offers: {
    '@type': 'Offer',
    price: '27',
    priceCurrency: 'USD',
    name: 'Found by AI Playbook',
    description: 'Step-by-step AI visibility and GEO optimization guide to get your business found by ChatGPT, Perplexity, Gemini, and Claude.',
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is AI visibility and how do I improve it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI visibility is how prominently your business appears when AI assistants like ChatGPT, Perplexity, Gemini, and Claude answer questions in your industry. Improving it is called GEO optimization (Generative Engine Optimization) — the practice of structuring your content so AI systems recognize, trust, and recommend your business.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check if my business shows up in ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can run a free AI visibility scan at MyGeoRadar.com. Enter your website URL and we\'ll test how ChatGPT, Perplexity, Gemini, and Claude respond to questions about your industry — showing you exactly whether your business appears and how prominently.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my business invisible to AI assistants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI assistants pull information from sources they trust — authoritative websites, structured data, brand mentions, and clear expertise signals. If your site lacks structured data (schema markup), has thin content, or isn\'t cited by other trusted sources, AI models simply won\'t know to recommend you. GEO optimization fixes these AI visibility gaps.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Found by AI Playbook?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Found by AI Playbook is a $27 step-by-step guide that walks you through every fix needed to improve your AI visibility and get your business recommended by AI assistants. It covers schema markup, content strategy, brand authority building, and the exact technical changes that make AI models recognize and recommend your business.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to improve AI visibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most businesses start seeing improvement in AI visibility within 2–6 weeks of implementing GEO optimization fixes. Results depend on your current authority level, content quality, and how competitive your industry is. The MyGeoRadar scan gives you a prioritized action plan so you focus on the highest-impact changes first.',
      },
    },
  ],
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
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
