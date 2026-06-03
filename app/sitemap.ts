import type { MetadataRoute } from 'next'
import { getAllPairs, INDUSTRIES, CITIES } from '@/lib/programmatic-data'

const BASE = 'https://mygeoradar.com'
const NOW = new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: NOW, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/pricing`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/playbook`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/refund`, lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Industry hub pages — use canonical /industries/[slug] path (not the root redirect)
  const industryHubs: MetadataRoute.Sitemap = INDUSTRIES.map((i) => ({
    url: `${BASE}/industries/${i.slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // City hub pages
  const cityHubs: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${BASE}/locations/${c.slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Programmatic pages — 34 industries × 100 cities = 3,400 pages
  const programmatic: MetadataRoute.Sitemap = getAllPairs().map(({ industry, city }) => ({
    url: `${BASE}/${industry}/${city}`,
    lastModified: NOW,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...industryHubs, ...cityHubs, ...programmatic]
}
