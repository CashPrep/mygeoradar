import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'MyGeoRadar privacy policy — how we collect, use, and protect your data.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted mb-10">Last updated: May 26, 2026</p>

        <div className="flex flex-col gap-8 text-foreground-dim leading-relaxed text-sm">
          {[
            {
              title: '1. Information we collect',
              body: 'We collect information you provide when purchasing or accessing our digital products: your name, email address, and payment information. Payment details are processed securely by Stripe — we never store your card number or CVV. We may also collect basic usage data (pages visited, browser type) through analytics tools to improve the site.',
            },
            {
              title: '2. How we use your information',
              body: 'We use your email address to deliver your purchased digital products, send order confirmations, and provide customer support. We do not sell, share, or rent your personal information to third parties for marketing purposes.',
            },
            {
              title: '3. Purchase records and data storage',
              body: 'Purchase records are stored in Supabase (hosted on AWS us-east-2) to enable access to your downloads at any time. You may request deletion of your account and purchase records by emailing privacy@mygeoradar.com. Note that deletion will revoke access to purchased downloads.',
            },
            {
              title: '4. Cookies',
              body: 'We use two categories of cookies. (a) Functional cookies: session cookies that keep you logged in so you can access your purchases. These are required for the site to work and cannot be opted out of while using your account. (b) Analytics cookies: we use Google Analytics 4 (GA4) to collect anonymized data about how visitors use this site — pages viewed, time on site, and general traffic patterns. GA4 may set first-party and third-party cookies on your device. No personally identifiable information is sent to Google through this tool. If you wish to opt out of GA4 tracking, you may use the Google Analytics Opt-Out Browser Add-on (tools.google.com/dlpage/gaoptout) or a browser extension that blocks analytics scripts.',
            },
            {
              title: '5. Third-party services',
              body: 'We use the following third-party services, each operating under its own privacy policy: Stripe (payment processing), Resend (transactional email), Supabase (data storage, hosted on AWS us-east-2), Vercel (site hosting and edge delivery), and Google Analytics 4 (site analytics — data is processed by Google LLC and subject to Google\'s Privacy Policy at policies.google.com/privacy).',
            },
            {
              title: '6. Your rights',
              body: 'You may request a copy of your personal data, correction of inaccurate data, or deletion of your account at any time. To exercise these rights, email privacy@mygeoradar.com and we will respond within 5 business days.',
            },
            {
              title: '7. Contact',
              body: 'For privacy-related requests: privacy@mygeoradar.com',
            },
          ].map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-semibold text-foreground mb-2">{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
