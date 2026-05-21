import { MetadataRoute } from 'next'

const BASE = 'https://mygeoradar.com'

const BLOG_POSTS = [
  { slug: 'what-is-geo',            lastMod: '2026-05-10' },
  { slug: 'ai-search-guide',        lastMod: '2026-05-11' },
  { slug: 'ai-search-zero-click',   lastMod: '2026-05-12' },
  { slug: 'geo-score-benchmarks',   lastMod: '2026-05-13' },
  { slug: 'geo-before-launch',      lastMod: '2026-05-14' },
  { slug: 'ai-hallucination-fix',   lastMod: '2026-05-15' },
  { slug: 'multi-location-geo',     lastMod: '2026-05-16' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/playbook`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/invisible`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/privacy`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(({ slug, lastMod }) => ({
    url:             `${BASE}/blog/${slug}`,
    lastModified:    new Date(lastMod),
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  return [...corePages, ...blogPages]
}
