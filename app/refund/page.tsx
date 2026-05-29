import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'MyGeoRadar refund policy — 30-day money-back guarantee on the Found by AI Playbook.',
  robots: { index: false, follow: false },
}

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-2">Refund Policy</h1>
        <p className="text-sm text-muted mb-10">Last updated: May 29, 2026</p>

        <div className="flex flex-col gap-8 text-foreground-dim leading-relaxed text-sm">
          {[
            {
              title: '30-day money-back guarantee',
              body: 'We stand behind the Found by AI Playbook. If you purchase and are not satisfied for any reason, email hello@mygeoradar.com within 30 days of your purchase date and we will issue a full refund — no questions asked, no hassle.',
            },
            {
              title: 'How to request a refund',
              body: 'Send an email to hello@mygeoradar.com from the address you used at checkout. Include your order number if you have it (not required). We process all refunds within one business day.',
            },
            {
              title: 'After 30 days',
              body: 'After the 30-day window, sales are final. If you have an issue accessing your downloads after that period, we will still help — email us and we will resolve it.',
            },
            {
              title: 'Digital product note',
              body: 'Because this is a digital product with immediate download access, we ask only that you give it a genuine try. The guarantee exists because we are confident in the material, not as a loophole.',
            },
            {
              title: 'Contact',
              body: 'Questions? Email hello@mygeoradar.com — we typically respond within a few hours on business days.',
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
