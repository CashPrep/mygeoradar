import { wixGuide } from '@/lib/guides/wix';
import GuidePageTemplate from '@/components/guides/GuidePageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wix GEO Guide — How to Optimize for AI Search | myGEOradar',
  description:
    'Complete guide to improving your Wix site\'s visibility in AI answers. Covers structured data, meta tags, robots.txt editing, and platform limitations.',
  openGraph: {
    title: 'Wix GEO Guide — Optimize for AI Search',
    description:
      'What Wix users can actually do for GEO — and where the platform ceiling is. Honest, step-by-step guide.',
    url: 'https://mygeoradar.com/guides/wix',
  },
};

export default function WixGuidePage() {
  return <GuidePageTemplate guide={wixGuide} />;
}
