'use client'

import { useEffect, useState } from 'react'
import { getScoreColor, getScoreHex, formatScore } from '@/lib/utils'

export function ScoreRing({ score, size = 140 }: { score: number; size?: number }) {
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(score), 200)
    return () => clearTimeout(timeout)
  }, [score])

  const radius      = (size - 16) / 2
  const circumference = 2 * Math.PI * radius
  const offset      = circumference - (animated / 100) * circumference
  const hex         = getScoreHex(score)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#1e1e3a" strokeWidth={10} />
          <circle
            cx={size/2} cy={size/2} r={radius}
            fill="none"
            stroke={hex}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.2s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
          <span className="text-xs text-muted">/100</span>
        </div>
      </div>
      <span className={`text-sm font-semibold ${getScoreColor(score)}`}>{formatScore(score)}</span>
    </div>
  )
}
