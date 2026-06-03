export interface GuideSectionItem {
  label: string;
  detail: string;
}

export interface GuideApp {
  name: string;
  url: string;
  description: string;
  free: boolean;
}

export interface GuideSection {
  id: string;
  title: string;
  tier: 'green' | 'yellow' | 'red';
  items: GuideSectionItem[];
  codeSnippet?: string;
  codeLanguage?: string;
}

export interface MigrationRow {
  situation: string;
  verdict: string;
  reason: string;
}

export interface PlatformGuide {
  platform: string;
  slug: string;
  tagline: string;
  description: string;
  geoScore: number; // 1-10 how capable the platform is for GEO
  sections: GuideSection[];
  cannotDo: string[];
  recommendedApps: GuideApp[];
  migrationFramework: MigrationRow[];
}
