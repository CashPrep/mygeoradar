import { shopifyGuide } from '@/lib/guides/shopify';
import GuidePageTemplate from '@/components/guides/GuidePageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopify GEO Guide — How to Optimize for AI Search | myGEOradar',
  description:
    'Step-by-step guide to optimizing your Shopify store for GEO and AI search visibility. Covers JSON-LD schema, meta tags, robots.txt, Open Graph, and what requires a developer.',
  openGraph: {
    title: 'Shopify GEO Guide — Optimize for AI Search',
    description:
      'Everything Shopify store owners can do to improve their AI search visibility — no developer required for most of it.',
    url: 'https://mygeoradar.com/guides/shopify',
  },
};

export default function ShopifyGuidePage() {
  return <GuidePageTemplate guide={shopifyGuide} />;
}
