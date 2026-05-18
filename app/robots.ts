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
          // Block individual private report pages but keep /scan itself crawlable
          '/scan/r/',
        ],
      },
    ],
    sitemap: 'https://mygeoradar.com/sitemap.xml',
  }
}
