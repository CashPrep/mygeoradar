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
    'llms.txt',
    'GEO score',
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
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'WebSite'],
  name: 'MyGeoRadar',
  alternateName: 'My GEO Radar',
  url: 'https://www.mygeoradar.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.mygeoradar.com/icon-512.png',
    width: 512,
    height: 512,
  },
  description:
    'MyGeoRadar is a free AI visibility scanner that shows businesses exactly how ChatGPT, Perplexity, Gemini, and Claude respond when customers search for their services — and gives a prioritized fix plan to get cited more.',
  keywords: 'GEO, generative engine optimization, AI visibility, AI search, ChatGPT visibility, Perplexity ranking, AI SEO, llms.txt, business AI score',
  about: {
    '@type': 'Thing',
    name: 'Generative Engine Optimization',
    description: 'GEO is the practice of optimizing your online presence so AI language models can find, understand, and recommend your business in AI-generated answers.',
  },
  founder: {
    '@type': 'Person',
    name: 'Andrew Garber',
    sameAs: ['https://twitter.com/MyGEORadar'],
  },
  foundingDate: '2024',
  sameAs: [
    'https://twitter.com/MyGEORadar',
    'https://www.producthunt.com/products/mygeoradar',
    'https://launchboosts.com/project/my-geo-radar',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: 'https://www.mygeoradar.com',
    availableLanguage: 'English',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.mygeoradar.com/?url={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': ['SoftwareApplication', 'WebApplication'],
  name: 'MyGeoRadar AI Visibility Scanner',
  alternateName: 'GEO Scanner',
  url: 'https://www.mygeoradar.com',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'SEO Tool',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  description:
    'Scan your website and get a free AI visibility score in 60 seconds. See how ChatGPT, Perplexity, Gemini & Claude crawl your site — and get a step-by-step action plan to show up more in AI answers.',
  abstract:
    'MyGeoRadar analyzes 20+ technical and content signals to score how visible your business is to AI assistants. It checks schema markup, llms.txt, robots.txt, AI bot access, NAP consistency, authority signals, and citation gaps.',
  featureList: [
    'Free AI visibility score (0-100)',
    'ChatGPT visibility analysis',
    'Perplexity presence check',
    'Gemini local ranking analysis',
    'Claude citation probability',
    'GEO optimization recommendations',
    'Step-by-step fix playbook',
    'llms.txt checker',
    'Schema markup validator',
    'AI bot crawlability audit',
  ],
  screenshot: 'https://www.mygeoradar.com/og-image.png',
  isAccessibleForFree: true,
  offers: [
    {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      name: 'Free AI Visibility Scan',
      description: 'Free GEO score scan — no signup required.',
      url: 'https://www.mygeoradar.com',
    },
    {
      '@type': 'Offer',
      price: '27',
      priceCurrency: 'USD',
      name: 'Found by AI Playbook',
      description: '30-day step-by-step guide to get your business found by ChatGPT, Perplexity, Gemini, and Claude.',
      url: 'https://www.mygeoradar.com',
    },
  ],
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
  audience: {
    '@type': 'Audience',
    audienceType: 'Small business owners, digital marketers, SEO agencies, SaaS founders',
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
        text: "You can run a free AI visibility scan at MyGeoRadar.com. Enter your website URL and we'll test how ChatGPT, Perplexity, Gemini, and Claude respond to questions about your industry — showing you exactly whether your business appears and how prominently.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my business invisible to AI assistants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "AI assistants pull information from sources they trust — authoritative websites, structured data, brand mentions, and clear expertise signals. If your site lacks structured data (schema markup), has thin content, or isn't cited by other trusted sources, AI models simply won't know to recommend you. GEO optimization fixes these AI visibility gaps.",
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
    {
      '@type': 'Question',
      name: 'What is MyGeoRadar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MyGeoRadar is a free AI visibility scanner that checks how your business appears in ChatGPT, Perplexity, Gemini, and Claude responses. It gives you a scored report and prioritized fix plan in under 60 seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a GEO score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A GEO score (0-100) measures how visible and citable your business is to AI language models. It evaluates schema markup, AI bot access, content clarity, authority signals, and citation consistency.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the AI visibility scan really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The full AI visibility scan on MyGeoRadar is completely free with no account required. Enter your URL and get your GEO score in 60 seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I improve my GEO score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The top ways to improve your GEO score are: add an llms.txt file, fix schema markup (especially Organization and LocalBusiness types), ensure AI bots are allowed in robots.txt, build citations on authoritative directories, and create clear entity-defining content about your business.',
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
