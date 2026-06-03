'use client'

import { PLATFORMS } from '@/lib/platforms'
import type { PlatformId } from '@/lib/platforms'
import { AlertCircle, CheckCircle2, Wrench } from 'lucide-react'

interface PlatformBannerProps {
  platformId: PlatformId
}

export function PlatformBanner({ platformId }: PlatformBannerProps) {
  const platform = PLATFORMS[platformId]
  if (!platform) return null

  const checks = Object.values(platform.checkFeasibility)
  const fullCount    = checks.filter(f => f === 'full').length
  const partialCount = checks.filter(f => f === 'partial').length
  const devCount     = checks.filter(f => f === 'requires-dev').length

  // Don't show banner for fully-capable platforms
  if (partialCount === 0 && devCount === 0) return null

  return (
    <div className="card p-4 border border-warning/30 bg-warning/5">
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5" aria-hidden="true">{platform.emoji}</span>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm font-semibold text-foreground">
            You&apos;re on {platform.label} — some recommendations have platform limits
          </p>
          <p className="text-xs text-foreground-dim leading-relaxed">
            Actions are tagged so you know exactly what you can do yourself vs. what needs a developer or app.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-success">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {fullCount} do-it-yourself
            </span>
            {partialCount > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-warning">
                <AlertCircle className="w-3.5 h-3.5" />
                {partialCount} need an app or plugin
              </span>
            )}
            {devCount > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-danger">
                <Wrench className="w-3.5 h-3.5" />
                {devCount} require a developer
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
