import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'MyGeoRadar terms of service — conditions for using our AI visibility scanning platform.',
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted mb-10">Last updated: May 10, 2026</p>

        <div className="flex flex-col gap-8 text-foreground-dim leading-relaxed text-sm">
          {[
            { title: '1. Service', body: 'MyGeoRadar provides AI visibility scan reports for businesses. Each scan is a one-time purchase of $1.00 USD. Reports simulate how AI engines may respond to queries about your business and are provided for informational purposes.' },
            { title: '2. Payment', body: 'All payments are processed securely by Stripe. By completing a purchase you agree to Stripe\'s terms of service. All sales are final. Due to the digital and immediate nature of the service, refunds are not provided once a scan has been generated.' },
            { title: '3. Accuracy', body: 'Scan reports are generated using GPT-4o and simulate AI engine behavior. Results are approximations and may not perfectly reflect how any specific AI engine actually responds at any given moment. We make no guarantees about specific business outcomes from implementing our recommendations.' },
            { title: '4. Acceptable use', body: 'You may not use MyGeoRadar to scan businesses you do not own or represent, to generate competitive intelligence at scale, or for any illegal purpose.' },
            { title: '5. Intellectual property', body: 'Scan reports generated for your business are yours to use. The MyGeoRadar platform, design, and underlying technology remain our intellectual property.' },
            { title: '6. Limitation of liability', body: 'MyGeoRadar is provided "as is." We are not liable for any business decisions made based on scan reports. Our total liability for any claim is limited to the amount paid for the scan in question ($1.00).' },
            { title: '7. Contact', body: 'For questions: hello@mygeoradar.com' },
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
