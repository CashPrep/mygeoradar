import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all major search engine crawlers
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/account/',
          '/success/',
          '/login/',
          '/admin/',
          '/scan/r/',
        ],
      },
      {
        // Explicitly allow AI crawlers that may not follow wildcard rules
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/account/',
          '/success/',
          '/login/',
          '/admin/',
          '/scan/r/',
        ],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/account/',
          '/success/',
          '/login/',
          '/admin/',
          '/scan/r/',
        ],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/account/',
          '/success/',
          '/login/',
          '/admin/',
          '/scan/r/',
        ],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/account/',
          '/success/',
          '/login/',
          '/admin/',
          '/scan/r/',
        ],
      },
    ],
    sitemap: 'https://www.mygeoradar.com/sitemap.xml',
    host: 'https://www.mygeoradar.com',
  }
}
