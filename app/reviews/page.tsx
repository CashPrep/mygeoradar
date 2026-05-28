import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ReviewForm } from '@/components/reviews/ReviewForm'
import { ReviewsDisplay } from '@/components/reviews/ReviewsDisplay'
import { Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Customer Reviews — MyGeoRadar',
  description: 'See what business owners and marketers say about the Found by AI Playbook from MyGeoRadar.',
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 text-accent text-xs font-medium mb-5">
              <Star className="w-3 h-3 fill-current" />
              Real customers, real results
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              What people are saying
            </h1>
            <p className="text-muted max-w-xl mx-auto">
              Business owners and marketers who have used the Found by AI Playbook to improve their AI search visibility.
            </p>
          </div>

          {/* Published (4-5 star) reviews shown publicly */}
          <ReviewsDisplay />

          {/* Divider */}
          <div className="border-t border-border my-16" />

          {/* Review submission form */}
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 tracking-tight">Leave a review</h2>
            <p className="text-sm text-muted mb-6">
              Bought the playbook? We&apos;d love to hear how it went.
            </p>
            <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-card-lift">
              <ReviewForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
