export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  priceMonthly: number;
  priceAnnual: number;
  periodLabel: string;
  summary: string;
  ctaText: string;
  ctaLink: string;
  highlighted?: boolean;
  features: string[];
  limits: {
    recordings: string;
    askAi: string;
    templates: string;
    integrations: string;
    retention: string;
    seats: string;
  };
}

export interface PlanFinderQuestion {
  id: string;
  prompt: string;
  options: {
    label: string;
    description: string;
    recommendedPlanId: string;
  }[];
}

export interface RolePageData {
  slug: string;
  roleName: string;
  headline: string;
  subheadline: string;
  templateName: string;
  sampleSummary: {
    title: string;
    sections: {
      heading: string;
      items: { text: string; timecode: number; speaker: string }[];
    }[];
  };
  savedPrompts: string[];
  keyIntegration: {
    name: string;
    category: string;
    benefit: string;
    samplePayload: Record<string, any>;
  };
  metrics: { label: string; value: string; detail: string }[];
  seo: SeoMeta;
}

export interface IntegrationItem {
  slug: string;
  name: string;
  category:
    | 'CRM'
    | 'Project Management'
    | 'Workflow Automation'
    | 'Video Conferencing'
    | 'Collaboration'
    | 'Content Generation'
    | 'Sales'
    | 'Product'
    | 'Productivity';
  planRequirement: 'Free' | 'Pro' | 'Team' | 'Business' | 'Enterprise';
  monogram: string;
  monogramBg: string;
  tagline: string;
  overview: string;
  keyFeatures: string[];
  setupSteps: { step: number; title: string; detail: string }[];
  samplePayload: Record<string, any>;
  permissions: string[];
  faq: { q: string; a: string }[];
  seo: SeoMeta;
}

export interface ComparisonFeatureRow {
  category: string;
  feature: string;
  fathomValue: string;
  competitorValue: string;
  isAdvantage: boolean;
}

export interface ComparisonItem {
  slug: string;
  competitorName: string;
  asOfDate: string;
  tagline: string;
  summary: string;
  keyTakeaway: string;
  featureMatrix: ComparisonFeatureRow[];
  migrationGuide: { step: number; title: string; detail: string; instruction?: string }[];
  faq: { q: string; a: string }[];
  seo: SeoMeta;
}

export interface ChangelogItem {
  id: string;
  date: string;
  version: string;
  category: 'Capture' | 'AI' | 'Integrations' | 'Performance';
  title: string;
  summary: string;
  highlights: string[];
  tryRoute?: string;
  tryLabel?: string;
}

export interface DocEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  summary: string;
  description: string;
  auth: string;
  params?: { name: string; type: string; required: boolean; description: string }[];
  requestBody?: string;
  responseBody: string;
  curlSnippet: string;
  tsSnippet: string;
  pySnippet: string;
}

export interface HelpArticle {
  slug: string;
  categorySlug: string;
  title: string;
  lastUpdated: string;
  readingTimeMinutes: number;
  summary: string;
  content: string[];
  steps?: { title: string; detail: string }[];
  relatedArticles?: { slug: string; title: string }[];
}

export interface HelpCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
  articleCount: number;
}

export interface CaseStudyItem {
  slug: string;
  companyName: string;
  industry: string;
  teamSize: string;
  headline: string;
  challenge: string;
  solution: string;
  outcomeStats: { metric: string; label: string }[];
  quote: { text: string; author: string; role: string };
  workflowDetails: string[];
  seo: SeoMeta;
}

export interface LearnArticle {
  slug: string;
  title: string;
  date: string;
  author: string;
  readingTimeMinutes: number;
  category: string;
  excerpt: string;
  sections: {
    heading: string;
    body: string[];
    callout?: string;
  }[];
  seo: SeoMeta;
}

export interface SummaryTemplateItem {
  id: string;
  name: string;
  audience: string;
  tone: string;
  description: string;
  sections: {
    heading: string;
    instruction: string;
    format: 'bullets' | 'table' | 'checklist' | 'prose';
  }[];
}
