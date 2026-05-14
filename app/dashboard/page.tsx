import type { Metadata } from 'next'
import { Suspense } from 'react'
import DashboardInner from './DashboardInner'
import { Radar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'MyGeoRadar admin dashboard.',
  robots: { index: false, follow: false },
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Radar className="w-8 h-8 text-accent animate-pulse" />
      </div>
    }>
      <DashboardInner />
    </Suspense>
  )
}
