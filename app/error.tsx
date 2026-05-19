'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-md mx-auto px-4 pt-32 pb-20 flex flex-col items-center gap-6 text-center">
        <div className="w-16 h-16 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-danger" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-sm text-muted leading-relaxed">
            An unexpected error occurred. Try refreshing — if the problem persists,{' '}
            <a href="mailto:andrew@mygeoradar.com" className="text-accent underline">contact support</a>.
          </p>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" /> Try again
        </button>
      </div>
    </main>
  )
}
