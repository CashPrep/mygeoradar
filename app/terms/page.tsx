import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'MyGeoRadar terms of service — conditions for purchasing and using our digital products.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.mygeoradar.com/terms' },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted mb-10">Last updated: May 22, 2026</p>

        <div className="flex flex-col gap-8 text-foreground-dim leading-relaxed text-sm">
          {[
            {
              title: '1. What you are purchasing',
              body: 'MyGeoRadar sells digital information products. The primary product is the Found by AI Playbook — a bundle of downloadable guides, checklists, and prompt resources priced at $27 USD (one-time). Upon purchase you receive immediate access to download all included files through your account at mygeoradar.com.',
            },
            {
              title: '2. Payment',
              body: 'All payments are processed securely by Stripe. By completing a purchase you agree to Stripe\'s terms of service. Prices are in USD. You will receive an order confirmation email at the address provided at checkout.',
            },
            {
              title: '3. Refund policy',
              body: 'We offer a 30-day money-back guarantee. If you purchase the Found by AI Playbook and are not satisfied for any reason, email hello@mygeoradar.com within 30 days of purchase and we will issue a full refund — no questions asked. After 30 days, sales are final.',
            },
            {
              title: '4. Digital delivery and access',
              body: 'Your downloads are available immediately after purchase through your account page. You may download each file as many times as needed. We recommend saving copies locally. If you experience any issue accessing your downloads, email hello@mygeoradar.com and we will resolve it within one business day.',
            },
            {
              title: '5. Accuracy and results',
              body: 'The Found by AI Playbook provides strategies, checklists, and prompts based on current understanding of how AI systems surface business information. Results vary by business, market, and implementation effort. We make no guarantee of specific business outcomes — AI systems change, and individual results depend on factors outside our control.',
            },
            {
              title: '6. Acceptable use',
              body: 'Your purchase is licensed for personal or single-business use. You may not redistribute, resell, or share the digital files publicly. You may not use the materials to create a competing product or service without written permission.',
            },
            {
              title: '7. Intellectual property',
              body: 'All content, design, and materials included in the Found by AI Playbook bundle are the intellectual property of MyGeoRadar. Your purchase grants you a personal, non-transferable license to use the materials for your own business.',
            },
            {
              title: '8. Limitation of liability',
              body: 'MyGeoRadar digital products are provided for informational purposes. We are not liable for any business decisions made based on the materials. Our total liability for any claim is limited to the amount paid for the product ($27).',
            },
            {
              title: '9. Contact',
              body: 'For questions or support: hello@mygeoradar.com',
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
