import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MyGeoRadar Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const POST_META: Record<string, { title: string; tag: string }> = {
  'what-is-geo':                    { title: 'What is GEO? Generative Engine Optimization Explained',                              tag: 'GEO Basics'    },
  'geo-vs-seo':                     { title: 'GEO vs SEO: What Is the Difference?',                                               tag: 'GEO Basics'    },
  'does-my-business-need-geo':      { title: 'Does My Business Need GEO?',                                                        tag: 'GEO Basics'    },
  'how-long-does-geo-take':         { title: 'How Long Does GEO Take to Work?',                                                   tag: 'GEO Basics'    },
  'ai-search-guide':                { title: 'How AI Search Engines Decide Which Businesses to Mention',                          tag: 'AI Search'     },
  'ai-search-vs-google-search':     { title: 'AI Search vs. Google Search: What Is Actually Changing?',                          tag: 'AI Search'     },
  'perplexity-vs-chatgpt-visibility':{ title: 'Perplexity vs. ChatGPT: Do You Show Up Differently on Each?',                    tag: 'AI Search'     },
  'ai-search-zero-click':           { title: 'The Zero-Click AI Era: Why Getting Traffic Now Requires Being the Answer',          tag: 'AI Search'     },
  'geo-score-benchmarks':           { title: "What's a Good GEO Score? Industry Benchmarks for 2026",                            tag: 'Strategy'      },
  'geo-for-saas':                   { title: 'GEO for SaaS: How Software Companies Should Think About AI Visibility',            tag: 'Strategy'      },
  'geo-before-launch':              { title: 'Launch Day GEO: How to Set Up AI Visibility Before Your Business Goes Live',       tag: 'Strategy'      },
  'google-business-profile-geo':    { title: 'Why Google Business Profile Is Your Most Important GEO Asset',                    tag: 'Local GEO'     },
  'multi-location-geo':             { title: 'Multi-Location GEO: How Chains and Franchises Should Handle AI Visibility',        tag: 'Local GEO'     },
  'schema-markup-for-geo':          { title: 'Schema Markup and GEO: Why Structured Data Is Critical for AI Visibility',         tag: 'Technical GEO' },
  'ai-hallucination-fix':           { title: 'When AI Gets Your Business Wrong: How to Fix AI Hallucinations About Your Company', tag: 'Technical GEO' },
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = POST_META[params.slug] ?? {
    title: 'MyGeoRadar Blog',
    tag: 'GEO',
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: logo + tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ color: 'white', fontSize: 18, fontWeight: 700 }}>⬡</div>
            </div>
            <span style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
              MyGeoRadar
            </span>
          </div>
          <div
            style={{
              marginLeft: 12,
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: 100,
              padding: '4px 14px',
              color: '#818cf8',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {post.tag}
          </div>
        </div>

        {/* Middle: post title */}
        <div
          style={{
            color: '#f8fafc',
            fontSize: post.title.length > 60 ? 46 : 54,
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            maxWidth: 960,
          }}
        >
          {post.title}
        </div>

        {/* Bottom: domain */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#6366f1',
            }}
          />
          <span style={{ color: '#64748b', fontSize: 18, fontWeight: 500 }}>mygeoradar.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
