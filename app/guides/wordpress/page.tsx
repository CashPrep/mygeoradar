import { wordpressGuide } from '@/lib/guides/wordpress';
import GuidePageTemplate from '@/components/guides/GuidePageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WordPress GEO Guide — AI Search Optimization with Yoast & Rank Math | myGEOradar',
  description:
    'The complete WordPress and WooCommerce GEO guide. Covers Yoast SEO schema, FAQ blocks, meta templates, robots.txt, Open Graph, and hosting impact on AI visibility.',
  openGraph: {
    title: 'WordPress GEO Guide — AI Search Optimization',
    description:
      'WordPress + Yoast is the gold standard for GEO-ready content sites. Here\'s the complete step-by-step setup guide.',
    url: 'https://mygeoradar.com/guides/wordpress',
  },
};

export default function WordPressGuidePage() {
  return <GuidePageTemplate guide={wordpressGuide} />;
}
