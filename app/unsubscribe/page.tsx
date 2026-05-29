import { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CheckCircle, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Unsubscribe — MyGeoRadar',
  robots: { index: false, follow: false },
}

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const status = searchParams.status ?? 'pending'

  return (
    <>
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-24 px-4 flex items-center justify-center">
          <div className="max-w-md w-full text-center">
            {status === 'success' ? (
              <>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-3">You&apos;ve been unsubscribed.</h1>
                <p className="text-muted mb-8">
                  You won&apos;t receive any more emails from MyGeoRadar. If you unsubscribed by
                  mistake, you can always re-run the free scan to opt back in.
                </p>
              </>
            ) : status === 'invalid' ? (
              <>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-3">Invalid unsubscribe link.</h1>
                <p className="text-muted mb-8">
                  This link may have already been used or has expired. Email us at{' '}
                  <a href="mailto:mygeoradar@gmail.com" className="text-accent underline">
                    mygeoradar@gmail.com
                  </a>{' '}
                  and we&apos;ll remove you manually.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-3">Unsubscribe</h1>
                <p className="text-muted mb-8">
                  To unsubscribe, use the link at the bottom of any email we sent you.
                  If you need help, email{' '}
                  <a href="mailto:mygeoradar@gmail.com" className="text-accent underline">
                    mygeoradar@gmail.com
                  </a>.
                </p>
              </>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              ← Back to MyGeoRadar
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}
