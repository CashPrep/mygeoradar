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
          '/scan/',   // individual report pages /scan/[id] are private — /scan itself stays crawlable
        ],
      },
    ],
    sitemap: 'https://mygeoradar.com/sitemap.xml',
  }
}
