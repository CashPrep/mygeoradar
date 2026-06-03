import { squarespaceGuide } from '@/lib/guides/squarespace';
import GuidePageTemplate from '@/components/guides/GuidePageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Squarespace GEO Guide — How to Optimize for AI Search | myGEOradar',
  description:
    'How to improve your Squarespace site\'s GEO and AI search visibility. Covers meta tags, JSON-LD injection, Open Graph, and honest platform limitations.',
  openGraph: {
    title: 'Squarespace GEO Guide — Optimize for AI Search',
    description:
      'What Squarespace users can and cannot do for GEO optimization. Step-by-step instructions with honest platform limitations.',
    url: 'https://mygeoradar.com/guides/squarespace',
  },
};

export default function SquarespaceGuidePage() {
  return <GuidePageTemplate guide={squarespaceGuide} />;
}
