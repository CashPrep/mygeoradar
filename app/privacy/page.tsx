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
        <p className="text-sm text-muted mb-10">Last updated: May 10, 2026</p>

        <div className="flex flex-col gap-8 text-foreground-dim leading-relaxed text-sm">
          {[
            { title: '1. Information we collect', body: 'We collect information you provide when running a scan: your business name, website URL, and search topics. If you choose to provide your email address, we use it solely to send your scan report. We also collect payment information processed securely by Stripe — we never store your card details.' },
            { title: '2. How we use your information', body: 'We use your business information to run AI visibility scans and generate your report. We use your email address (if provided) to send your report. We do not sell, share, or rent your personal information to third parties.' },
            { title: '3. Data storage', body: 'Scan reports are stored in Supabase (hosted on AWS us-east-2). Reports are retained for 90 days. You may request deletion of your data by emailing us.' },
            { title: '4. Cookies', body: 'We use minimal, functional cookies only. We do not use advertising or tracking cookies.' },
            { title: '5. Third-party services', body: 'We use Stripe for payment processing, Resend for transactional email, Supabase for data storage, and OpenAI for generating scan reports. Each of these services has its own privacy policy.' },
            { title: '6. Contact', body: 'For privacy-related requests, email: privacy@mygeoradar.com' },
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
