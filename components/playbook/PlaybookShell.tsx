'use client'

import { useState } from 'react'
import { CheckoutButton } from '@/components/playbook/CheckoutButton'
import { PlatformSelector } from '@/components/playbook/PlatformSelector'
import { PLATFORMS } from '@/lib/platforms'
import type { PlatformId } from '@/lib/platforms'
import { Gift } from 'lucide-react'

interface Props {
  /** Override the checkout button label. Defaults to the standard hero label. */
  label?: string
}

export function PlaybookShell({ label }: Props) {
  const [platform, setPlatform] = useState<PlatformId | null>(null)

  const selectedPlatform = platform ? PLATFORMS[platform] : null

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto">

      {/* Platform selector — sits above the checkout button */}
      <PlatformSelector value={platform} onChange={setPlatform} />

      {/* Dynamic deliverables bonus line — shown only when a guide-eligible platform is selected */}
      {selectedPlatform?.hasGuide && (
        <div
          className="flex items-start gap-2.5 w-full px-4 py-3 rounded-xl bg-accent/5 border border-accent/25 text-left"
          role="status"
          aria-live="polite"
        >
          <Gift className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-accent leading-snug">
            <strong>+&nbsp;{selectedPlatform.label}-Specific GEO Guide</strong>{' '}
            <span className="font-normal text-accent/80">
              (because you&apos;re on {selectedPlatform.label}) — step-by-step GEO instructions
              for your exact platform, delivered alongside the playbook.
            </span>
          </p>
        </div>
      )}

      {/* Checkout button receives the platform so it can be forwarded to /api/checkout */}
      <CheckoutButton label={label} platform={platform} />

    </div>
  )
}
