import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/scan/',   // individual report pages are private/user-specific
        ],
      },
    ],
    sitemap: 'https://mygeoradar.com/sitemap.xml',
  }
}
