import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Radar } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-md mx-auto px-4 pt-32 pb-20 flex flex-col items-center gap-6 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Radar className="w-8 h-8 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Page not found</h1>
          <p className="text-sm text-muted leading-relaxed">
            This page doesn&apos;t exist or may have moved.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors text-sm"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
