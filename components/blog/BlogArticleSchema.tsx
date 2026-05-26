interface BlogArticleSchemaProps {
  title: string
  description: string
  url: string
  publishedTime: string
  /** ISO 8601 date — defaults to publishedTime if not provided */
  modifiedTime?: string
}

/**
 * Injects a BlogPosting JSON-LD script tag so AI crawlers and search engines
 * can unambiguously identify, trust, and cite the article.
 */
export function BlogArticleSchema({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
}: BlogArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished: publishedTime,
    dateModified: modifiedTime ?? publishedTime,
    author: {
      '@type': 'Organization',
      name: 'MyGeoRadar',
      url: 'https://mygeoradar.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyGeoRadar',
      url: 'https://mygeoradar.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mygeoradar.com/og-image.png',
      },
    },
    image: 'https://mygeoradar.com/og-image.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isPartOf: {
      '@type': 'Blog',
      name: 'MyGeoRadar Blog',
      url: 'https://mygeoradar.com/blog',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
