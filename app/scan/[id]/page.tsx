'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { ResultsView } from '@/components/scan/ResultsView'
import { ScanLoadingState } from '@/components/scan/ScanLoadingState'
import type { ScanReport } from '@/lib/types'

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>()
  const [report, setReport]   = useState<ScanReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    if (!id) return
    let attempts = 0
    const MAX = 20

    const poll = async () => {
      try {
        const res  = await fetch(`/api/scan/${id}`)
        const data = await res.json()

        if (data.report?.engines?.length) {
          setReport(data.report)
          setLoading(false)
        } else if (attempts < MAX) {
          attempts++
          setTimeout(poll, 3000)
        } else {
          setError('Scan is taking longer than expected. Please refresh.')
          setLoading(false)
        }
      } catch {
        setError('Failed to load report. Please refresh.')
        setLoading(false)
      }
    }

    poll()
  }, [id])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        {loading && <ScanLoadingState />}
        {error   && (
          <div className="max-w-xl mx-auto px-4 text-center">
            <p className="text-danger">{error}</p>
          </div>
        )}
        {report  && <ResultsView report={report} />}
      </div>
    </main>
  )
}
