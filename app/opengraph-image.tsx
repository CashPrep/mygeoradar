import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MyGeoRadar — Get Found by AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)',
          }}
        />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'rgba(99,102,241,0.15)',
              border: '1.5px solid rgba(99,102,241,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            📡
          </div>
          <span style={{ color: '#a1a1aa', fontSize: 20, fontWeight: 600, letterSpacing: '0.02em' }}>
            my<span style={{ color: '#6366f1' }}>geo</span>radar
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 62,
            fontWeight: 800,
            color: '#f4f4f5',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: 820,
            marginBottom: 28,
          }}
        >
          Get Found by{' '}
          <span style={{ color: '#6366f1' }}>AI</span>
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: 26,
            color: '#71717a',
            maxWidth: 700,
            lineHeight: 1.45,
            marginBottom: 48,
          }}
        >
          90% of businesses are invisible to ChatGPT, Perplexity &amp; Gemini.
          The Found by AI Playbook fixes that — step by step, $27.
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#6366f1',
            borderRadius: 12,
            padding: '14px 28px',
            fontSize: 20,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.01em',
          }}
        >
          Get the Playbook — $27 →
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 80,
            fontSize: 16,
            color: '#3f3f46',
            fontWeight: 500,
          }}
        >
          mygeoradar.com
        </div>
      </div>
    ),
    { ...size },
  )
}
