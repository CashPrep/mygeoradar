'use client'

import { useSearchParams } from 'next/navigation'
import { ScanForm } from '@/components/scan/ScanForm'

export function ScanPageClient() {
  const params      = useSearchParams()
  const initialName = params.get('name') ?? ''
  const initialUrl  = params.get('url')  ?? ''

  return <ScanForm initialName={initialName} initialUrl={initialUrl} />
}
