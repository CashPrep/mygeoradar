import { Navbar } from '@/components/layout/Navbar'
import { ScanForm } from '@/components/scan/ScanForm'
import { Radar } from 'lucide-react'

export const metadata = {
  title: 'Run a Scan',
  description: 'Check your AI search visibility across ChatGPT, Perplexity, Gemini and Claude.',
}

export default function ScanPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
              <Radar className="w-7 h-7 text-accent" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Run your AI radar scan</h1>
            <p className="mt-3 text-foreground-dim">
              Fill in your business details and we&apos;ll check how visible you are across 4 AI engines.
            </p>
          </div>
          <ScanForm />
        </div>
      </div>
    </main>
  )
}
