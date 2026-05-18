import { MetadataRoute } from 'next'

const BASE_URL = 'https://mygeoradar.com'

const BLOG_SLUGS = [
  'what-is-geo',
  'ai-search-guide',
  'ai-hallucination-fix',
  'ai-search-zero-click',
  'geo-before-launch',
  'geo-score-benchmarks',
  'multi-location-geo',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:             `${BASE_URL}`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        1.0,
    },
    {
      url:             `${BASE_URL}/scan`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        0.9,
    },
    {
      url:             `${BASE_URL}/invisible`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/blog`,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/about`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.6,
    },
    {
      url:             `${BASE_URL}/privacy`,
      lastModified:    now,
      changeFrequency: 'yearly',
      priority:        0.3,
    },
    {
      url:             `${BASE_URL}/terms`,
      lastModified:    now,
      changeFrequency: 'yearly',
      priority:        0.3,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = BLOG_SLUGS.map(slug => ({
    url:             `${BASE_URL}/blog/${slug}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
