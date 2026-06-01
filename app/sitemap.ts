import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { INDUSTRIES } from '@/lib/industries'
import { CITIES } from '@/lib/cities'
import { QUESTIONS } from '@/lib/questions'
import { COMPARISONS } from '@/lib/comparisons'

const BASE = 'https://www.mygeoradar.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/playbook`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/invisible`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/industries`,   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/cities`,       lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/questions`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/comparisons`,  lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/privacy`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(({ slug, lastMod }) => ({
    url:             `${BASE}/blog/${slug}`,
    lastModified:    new Date(lastMod),
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  const industryPages: MetadataRoute.Sitemap = INDUSTRIES.map(({ slug }) => ({
    url:             `${BASE}/industries/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.75,
  }))

  const cityPages: MetadataRoute.Sitemap = CITIES.map(({ slug }) => ({
    url:             `${BASE}/cities/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.75,
  }))

  const questionPages: MetadataRoute.Sitemap = QUESTIONS.map(({ slug }) => ({
    url:             `${BASE}/questions/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  const comparisonPages: MetadataRoute.Sitemap = COMPARISONS.map(({ slug }) => ({
    url:             `${BASE}/comparisons/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.75,
  }))

  return [
    ...corePages,
    ...blogPages,
    ...industryPages,
    ...cityPages,
    ...questionPages,
    ...comparisonPages,
  ]
}
