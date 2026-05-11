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
    'See exactly how AI engines like ChatGPT, Perplexity, and Gemini answer questions about your business — and get a clear action plan to show up more.',
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
    description: 'See exactly how AI answers talk about your business and get a clear action plan to show up more.',
    siteName: 'MyGeoRadar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyGeoRadar — AI Search Visibility',
    description: 'See how AI answers see your business. Fix it in minutes.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
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
