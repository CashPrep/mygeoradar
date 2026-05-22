import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginInner from './LoginInner'

export const metadata: Metadata = {
  title: 'Sign In',
    description: 'Sign in to MyGeoRadar to access your purchased downloads.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginInner />
    </Suspense>
  )
}
