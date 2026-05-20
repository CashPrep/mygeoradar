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
          '/account/',
          '/scan/r/',
        ],
      },
    ],
    sitemap: 'https://mygeoradar.com/sitemap.xml',
  }
}
