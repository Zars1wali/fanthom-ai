import type { PricingPlan, PlanFinderQuestion } from './types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Forever',
    badge: 'Sample Individual Tier',
    priceMonthly: 0,
    priceAnnual: 0,
    periodLabel: 'forever free',
    summary: 'Essential notetaking, verbatim transcript, and clickable audio receipts for individuals.',
    ctaText: 'Start Free — No Credit Card',
    ctaLink: '/onboarding',
    features: [
      'Unlimited video & audio meeting recordings',
      'Verbatim transcripts with 8-speaker color lane separation',
      'The Score interactive timeline scrub',
      '50 Ask AI queries per month across your meetings',
      'Standard 60-second recap email with action items',
      'Zoom, Google Meet, and Microsoft Teams capture (bot & bot-free)',
      '14-day history storage and public share links',
    ],
    limits: {
      recordings: 'Unlimited duration & count',
      askAi: '50 queries / user / month',
      templates: 'Standard meeting template only',
      integrations: 'Email, Zapier personal, Public link',
      retention: '14 calendar days archive',
      seats: '1 user per workspace',
    },
  },
  {
    id: 'team',
    name: 'Team Edition',
    badge: 'Most Popular',
    priceMonthly: 24,
    priceAnnual: 19,
    periodLabel: 'per user / month (billed annually)',
    summary: 'Collaborative workspaces, custom summary templates, and bi-directional CRM sync for growing teams.',
    ctaText: 'Start 14-Day Free Team Trial',
    ctaLink: '/signup?plan=team',
    highlighted: true,
    features: [
      'Everything in Free, plus unlimited workspace members',
      'Unlimited Ask AI queries across entire team library',
      '12 built-in summary templates + custom visual template builder',
      'Bi-directional Salesforce & HubSpot automatic deal logging',
      'Slack channel automatic digests with clickable moment clips',
      'Notion & Asana auto-task generation from verbal commitments',
      'Unlimited cloud recording archive and retention',
      'Shared team snippet highlights & playlists',
    ],
    limits: {
      recordings: 'Unlimited duration & count',
      askAi: 'Unlimited queries',
      templates: 'Unlimited custom + 12 library templates',
      integrations: 'Salesforce, HubSpot, Slack, Notion, Asana',
      retention: 'Unlimited retention forever',
      seats: '2 to 250 seats',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise / Scale',
    badge: 'Custom Governance',
    priceMonthly: 39,
    priceAnnual: 32,
    periodLabel: 'per user / month (billed annually)',
    summary: 'Advanced security governance, single sign-on, dedicated account concierge, and custom LLM residency.',
    ctaText: 'Talk to Solution Engineering',
    ctaLink: '/book-demo',
    features: [
      'Everything in Team Edition, plus SOC2 Type II compliance pack',
      'SAML 2.0 / Okta / Azure AD Single Sign-On (SSO)',
      'Custom data residency (US, EU, or hybrid cloud regions)',
      'Role-based granular access control (RBAC) and audit log exports',
      'Dedicated Customer Success Manager & custom CRM field mapping',
      'Custom webhook event triggers with 99.99% SLA guarantee',
      'Centralized invoicing, PO billing, and priority concierge support',
    ],
    limits: {
      recordings: 'Unlimited with dedicated tenant ingestion',
      askAi: 'Unlimited priority inference queue',
      templates: 'Enterprise-wide governed templates',
      integrations: 'All 21+ integrations + custom private webhooks',
      retention: 'Configurable policy (30d to indefinite)',
      seats: '25+ seats (custom enterprise agreement)',
    },
  },
];

export const PRICING_COMPARISON_CATEGORIES = [
  {
    category: 'Recording & Core Playback',
    rows: [
      { feature: 'Recording length limit', free: 'Unlimited', team: 'Unlimited', enterprise: 'Unlimited' },
      { feature: 'Audio clock playback (0.75x - 2.0x)', free: '✓ Included', team: '✓ Included', enterprise: '✓ Included' },
      { feature: 'The Score (lane-per-speaker timeline)', free: '✓ Included', team: '✓ Included', enterprise: '✓ Included' },
      { feature: 'Clickable timecode receipts', free: '✓ Included', team: '✓ Included', enterprise: '✓ Included' },
      { feature: 'Bot-free recording mode', free: '✓ Included', team: '✓ Included', enterprise: '✓ Included' },
      { feature: 'Recording history retention', free: '14 days', team: 'Unlimited', enterprise: 'Custom governance' },
    ],
  },
  {
    category: 'AI Summaries & Cross-Meeting Intelligence',
    rows: [
      { feature: 'Automated executive recaps', free: 'Standard only', team: '12 tailored templates', enterprise: 'Custom governed templates' },
      { feature: 'Ask AI queries', free: '50 / month', team: 'Unlimited', enterprise: 'Unlimited (Priority queue)' },
      { feature: 'Cross-meeting search & synthesis', free: 'Last 10 calls', team: 'Entire team workspace', enterprise: 'Entire organization' },
      { feature: 'Custom summary builder', free: '—', team: '✓ Included', enterprise: '✓ Included' },
      { feature: 'Action item auto-detection', free: '✓ Included', team: '✓ Included with sync', enterprise: '✓ Included with sync' },
    ],
  },
  {
    category: 'Integrations & Automations',
    rows: [
      { feature: 'Slack automated channel digest', free: '—', team: '✓ Included', enterprise: '✓ Included' },
      { feature: 'Salesforce Opportunity & Contact sync', free: '—', team: '✓ Included', enterprise: '✓ Custom field mapping' },
      { feature: 'HubSpot Deal & Timeline sync', free: '—', team: '✓ Included', enterprise: '✓ Custom field mapping' },
      { feature: 'Notion & Asana task generation', free: '—', team: '✓ Included', enterprise: '✓ Included' },
      { feature: 'Webhooks & REST API access', free: 'Read-only', team: 'Full access', enterprise: 'Full access + 99.99% SLA' },
      { feature: 'Model Context Protocol (MCP) server', free: '✓ Included', team: '✓ Included', enterprise: '✓ Included' },
    ],
  },
  {
    category: 'Security, Admin & Governance',
    rows: [
      { feature: 'SAML SSO (Okta, Azure AD, Google)', free: '—', team: 'Optional add-on', enterprise: '✓ Included' },
      { feature: 'Role-based access control (RBAC)', free: '—', team: 'Admin & Member', enterprise: 'Granular permissions' },
      { feature: 'Audit log exports', free: '—', team: '—', enterprise: '✓ Included' },
      { feature: 'Data retention policy enforcement', free: '—', team: '—', enterprise: '✓ Included' },
      { feature: 'SOC 2 Type II compliance report', free: 'Sample summary', team: 'Sample summary', enterprise: 'Full signed report' },
      { feature: 'Dedicated support & onboarding', free: 'Community', team: 'Email & Live chat', enterprise: 'Dedicated CSM & SLA' },
    ],
  },
];

export const PLAN_FINDER_QUESTIONS: PlanFinderQuestion[] = [
  {
    id: 'team_size',
    prompt: 'How many people on your team regularly attend or review meetings?',
    options: [
      { label: 'Just me (1 person)', description: 'I want personal focus, fast notes, and audio receipts.', recommendedPlanId: 'free' },
      { label: 'Small team (2 to 20 people)', description: 'We need shared meeting notes, Slack digests, and CRM sync.', recommendedPlanId: 'team' },
      { label: 'Large organization (20+ people)', description: 'We require centralized SSO, custom CRM mapping, and compliance.', recommendedPlanId: 'enterprise' },
    ],
  },
  {
    id: 'crm_requirement',
    prompt: 'Do you need meeting notes automatically synced to a CRM or project tracker?',
    options: [
      { label: 'No CRM needed', description: 'I just need my notes emailed to me or copied manually.', recommendedPlanId: 'free' },
      { label: 'Yes — Salesforce, HubSpot, or Notion', description: 'We want automatic deal logging and task extraction.', recommendedPlanId: 'team' },
      { label: 'Yes, with custom schemas and compliance audits', description: 'We need complex field mapping and SOC2 data isolation.', recommendedPlanId: 'enterprise' },
    ],
  },
  {
    id: 'ai_frequency',
    prompt: 'How frequently do you plan to use Ask AI to query across past conversations?',
    options: [
      { label: 'Occasionally (1-2 times a week)', description: '50 queries per month is plenty for me.', recommendedPlanId: 'free' },
      { label: 'Daily across all customer calls', description: 'Unlimited queries across the entire team library.', recommendedPlanId: 'team' },
      { label: 'Continuous automated analysis via API/MCP', description: 'High-throughput access for LLM agents and workflows.', recommendedPlanId: 'enterprise' },
    ],
  },
];

export const PRICING_FAQS = [
  {
    q: 'Are the prices listed here real?',
    a: 'All prices and plan limits shown on this demo site are Sample demonstration figures created for the rebuild evaluation. No real payment processing takes place.',
  },
  {
    q: 'Is the Free Forever plan actually unlimited in recording time?',
    a: 'Yes! In our demonstration model, Free includes unlimited meeting recording duration and count, with verbatim transcripts and The Score visual timeline.',
  },
  {
    q: 'Can I switch between monthly and annual billing?',
    a: 'Yes. Annual billing offers a 20% discount across Team and Enterprise plans with a single invoice.',
  },
  {
    q: 'How does bot-free recording work?',
    a: 'Bot-free mode captures audio through your local desktop audio capture without injecting a third-party bot avatar into your Zoom, Meet, or Teams conference room.',
  },
  {
    q: 'Do you offer non-profit or educational discounts?',
    a: 'Yes, verified 501(c)(3) non-profits and accredited academic institutions receive a 50% discount on Team plans upon application.',
  },
];
