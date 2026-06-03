// ─────────────────────────────────────────────────────────────────────────────
// Platform definitions — single source of truth used across:
//   • ScanForm (platform selector)
//   • Scan API (feasibility annotation per check)
//   • Scan results UI (badge rendering)
//   • Playbook page (platform selector + deliverable copy)
//   • Checkout API (Stripe metadata)
//   • Downloads / account page (platform-specific guide)
// ─────────────────────────────────────────────────────────────────────────────

export type PlatformId =
  | 'shopify'
  | 'wix'
  | 'squarespace'
  | 'webflow'
  | 'wordpress'
  | 'other'

export type PlatformFeasibility = 'full' | 'partial' | 'requires-dev'

export interface Platform {
  id: PlatformId
  label: string
  emoji: string
  tagline: string
  // For each scan check ID, what level of change is possible natively?
  checkFeasibility: Record<string, PlatformFeasibility>
  // Short human-readable note shown next to restricted checks
  partialNote: Partial<Record<string, string>>
  requiresDevNote: Partial<Record<string, string>>
  // Whether a downloadable platform guide exists for this platform
  hasGuide: boolean
  guideFile?: string // filename in public/downloads/
}

export const PLATFORMS: Record<PlatformId, Platform> = {

  shopify: {
    id: 'shopify',
    label: 'Shopify',
    emoji: '🛍️',
    tagline: 'E-commerce platform',
    hasGuide: true,
    guideFile: 'geo-guide-shopify.html',
    checkFeasibility: {
      https:           'full',
      reachable:       'full',
      robots:          'requires-dev',
      'meta-title':    'full',
      'meta-desc':     'full',
      'og-tags':       'partial',
      schema:          'partial',
      h1:              'full',
      'business-name': 'full',
      viewport:        'full',
      canonical:       'partial',
    },
    partialNote: {
      'og-tags':   'OG tags require a free Shopify app (e.g. SEO Manager or Smart SEO).',
      schema:      'Basic schema is auto-added by Shopify. Custom JSON-LD requires a Shopify app or theme code edit.',
      canonical:   'Shopify handles canonicals automatically for product/collection pages.',
    },
    requiresDevNote: {
      robots: 'Shopify does not allow you to edit robots.txt without a custom app or Shopify Plus plan.',
    },
  },

  wix: {
    id: 'wix',
    label: 'Wix',
    emoji: '🌐',
    tagline: 'Website builder',
    hasGuide: true,
    guideFile: 'geo-guide-wix.html',
    checkFeasibility: {
      https:           'full',
      reachable:       'full',
      robots:          'partial',
      'meta-title':    'full',
      'meta-desc':     'full',
      'og-tags':       'full',
      schema:          'partial',
      h1:              'full',
      'business-name': 'full',
      viewport:        'full',
      canonical:       'full',
    },
    partialNote: {
      robots: 'Wix allows limited robots.txt editing via SEO Settings → Crawlers.',
      schema: 'Custom JSON-LD can be added via Wix SEO Settings → Structured Data Markup. Dynamic fields are supported.',
    },
    requiresDevNote: {},
  },

  squarespace: {
    id: 'squarespace',
    label: 'Squarespace',
    emoji: '⬛',
    tagline: 'Website builder',
    hasGuide: true,
    guideFile: 'geo-guide-squarespace.html',
    checkFeasibility: {
      https:           'full',
      reachable:       'full',
      robots:          'partial',
      'meta-title':    'full',
      'meta-desc':     'full',
      'og-tags':       'full',
      schema:          'partial',
      h1:              'full',
      'business-name': 'full',
      viewport:        'full',
      canonical:       'full',
    },
    partialNote: {
      robots:  'Squarespace provides a robots.txt editor under Settings → Advanced → External Services.',
      schema:  'JSON-LD can be injected via Settings → Advanced → Code Injection → Header. Paste the full <script> block.',
    },
    requiresDevNote: {},
  },

  webflow: {
    id: 'webflow',
    label: 'Webflow',
    emoji: '💠',
    tagline: 'Visual web builder',
    hasGuide: true,
    guideFile: 'geo-guide-webflow.html',
    checkFeasibility: {
      https:           'full',
      reachable:       'full',
      robots:          'full',
      'meta-title':    'full',
      'meta-desc':     'full',
      'og-tags':       'full',
      schema:          'full',
      h1:              'full',
      'business-name': 'full',
      viewport:        'full',
      canonical:       'full',
    },
    partialNote: {},
    requiresDevNote: {},
  },

  wordpress: {
    id: 'wordpress',
    label: 'WordPress',
    emoji: '🔵',
    tagline: 'CMS / website platform',
    hasGuide: true,
    guideFile: 'geo-guide-wordpress.html',
    checkFeasibility: {
      https:           'full',
      reachable:       'full',
      robots:          'full',
      'meta-title':    'full',
      'meta-desc':     'full',
      'og-tags':       'full',
      schema:          'full',
      h1:              'full',
      'business-name': 'full',
      viewport:        'full',
      canonical:       'full',
    },
    partialNote: {},
    requiresDevNote: {},
  },

  other: {
    id: 'other',
    label: 'Other / Custom',
    emoji: '💻',
    tagline: 'Custom or other platform',
    hasGuide: false,
    checkFeasibility: {
      https:           'full',
      reachable:       'full',
      robots:          'full',
      'meta-title':    'full',
      'meta-desc':     'full',
      'og-tags':       'full',
      schema:          'full',
      h1:              'full',
      'business-name': 'full',
      viewport:        'full',
      canonical:       'full',
    },
    partialNote: {},
    requiresDevNote: {},
  },
}

export const PLATFORM_LIST = Object.values(PLATFORMS)

// Utility: get feasibility for a specific check on a given platform.
// Returns 'full' when no platform is selected (default / non-builder behaviour).
export function getCheckFeasibility(
  checkId: string,
  platformId?: string | null,
): PlatformFeasibility {
  if (!platformId || platformId === '') return 'full'
  const platform = PLATFORMS[platformId as PlatformId]
  if (!platform) return 'full'
  return platform.checkFeasibility[checkId] ?? 'full'
}

export function getPlatformNote(
  checkId: string,
  platformId?: string | null,
): string | null {
  if (!platformId || platformId === '') return null
  const platform = PLATFORMS[platformId as PlatformId]
  if (!platform) return null
  const feasibility = platform.checkFeasibility[checkId] ?? 'full'
  if (feasibility === 'partial') return platform.partialNote[checkId] ?? null
  if (feasibility === 'requires-dev') return platform.requiresDevNote[checkId] ?? null
  return null
}
