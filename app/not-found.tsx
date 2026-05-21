import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Radar, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-md mx-auto px-4 pt-32 pb-20 flex flex-col items-center gap-6 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Radar className="w-8 h-8 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Page not found</h1>
          <p className="text-sm text-muted leading-relaxed">
            This page doesn&apos;t exist or may have moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            Back to home
          </Link>
          <Link
            href="/playbook"
            className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-border hover:bg-surface-2 font-semibold rounded-xl transition-colors text-sm"
          >
            Get the Playbook — $27 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
