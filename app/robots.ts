import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const privateRoutes = [
    '/api/',
    '/dashboard/',
    '/account/',
    '/success/',
    '/login/',
    '/admin/',
    '/scan/r/',
  ]

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: privateRoutes },
      { userAgent: 'GPTBot', allow: '/', disallow: privateRoutes },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: privateRoutes },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: privateRoutes },
      { userAgent: 'PerplexityBot', allow: '/', disallow: privateRoutes },
      { userAgent: 'ClaudeBot', allow: '/', disallow: privateRoutes },
      { userAgent: 'Claude-Web', allow: '/', disallow: privateRoutes },
      { userAgent: 'anthropic-ai', allow: '/', disallow: privateRoutes },
      { userAgent: 'Google-Extended', allow: '/', disallow: privateRoutes },
      { userAgent: 'Googlebot', allow: '/', disallow: privateRoutes },
      { userAgent: 'CCBot', allow: '/', disallow: privateRoutes },
      { userAgent: 'cohere-ai', allow: '/', disallow: privateRoutes },
      { userAgent: 'meta-externalagent', allow: '/', disallow: privateRoutes },
      { userAgent: 'Bytespider', allow: '/', disallow: privateRoutes },
      { userAgent: 'ia_archiver', allow: '/', disallow: privateRoutes },
    ],
    sitemap: [
      'https://www.mygeoradar.com/sitemap.xml',
      'https://www.mygeoradar.com/llms.txt',
    ],
    host: 'https://www.mygeoradar.com',
  }
}
