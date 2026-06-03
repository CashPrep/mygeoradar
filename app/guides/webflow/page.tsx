import { webflowGuide } from '@/lib/guides/webflow';
import GuidePageTemplate from '@/components/guides/GuidePageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webflow GEO Guide — The Most Capable No-Code Platform for AI Search | myGEOradar',
  description:
    'How to get maximum GEO and AI search visibility from Webflow. Covers dynamic CMS schema, meta bindings, robots.txt, Open Graph, and code injection.',
  openGraph: {
    title: 'Webflow GEO Guide — Maximum AI Search Visibility',
    description:
      'Webflow is the most GEO-capable no-code platform. Here\'s how to use every feature for AI search visibility.',
    url: 'https://mygeoradar.com/guides/webflow',
  },
};

export default function WebflowGuidePage() {
  return <GuidePageTemplate guide={webflowGuide} />;
}
