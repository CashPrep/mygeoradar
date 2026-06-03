export { shopifyGuide } from './shopify';
export { wixGuide } from './wix';
export { squarespaceGuide } from './squarespace';
export { webflowGuide } from './webflow';
export { wordpressGuide } from './wordpress';
export type { PlatformGuide, GuideSection, GuideApp, MigrationRow } from './types';

import { shopifyGuide } from './shopify';
import { wixGuide } from './wix';
import { squarespaceGuide } from './squarespace';
import { webflowGuide } from './webflow';
import { wordpressGuide } from './wordpress';
import type { PlatformGuide } from './types';

export const allGuides: PlatformGuide[] = [
  shopifyGuide,
  wixGuide,
  squarespaceGuide,
  webflowGuide,
  wordpressGuide,
];

export const guidesBySlug: Record<string, PlatformGuide> = Object.fromEntries(
  allGuides.map((g) => [g.slug, g])
);
