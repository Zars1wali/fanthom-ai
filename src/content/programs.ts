export interface PartnerProgram {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  overview: string;
  benefits: string[];
  requirements: string[];
  ctaLabel: string;
  applyRoute: string;
}

export const PARTNER_PROGRAMS: PartnerProgram[] = [
  {
    slug: 'solution-partners',
    name: 'Solution & Consulting Partners',
    badge: 'Agencies & RevOps Advisors',
    tagline: 'Deliver cutting-edge meeting intelligence and CRM automation to your clients.',
    overview:
      'The Fathom Solution Partner Program is tailored for sales consultancy firms, RevOps agencies, and HubSpot/Salesforce implementation specialists. Equip your clients with automated meeting notes, customized qualification templates, and bi-directional CRM pipelines while earning recurring revenue share.',
    benefits: [
      '20% recurring revenue share on all referred client subscriptions for their first 2 years',
      'Free internal Fathom Team Edition workspace for your agency staff (up to 10 seats)',
      'Dedicated partner manager, technical onboarding support, and co-selling collateral',
      'Listing in the Fathom Certified Partner Directory viewed by thousands of businesses',
    ],
    requirements: [
      'Active consultancy or agency advising on CRM, sales workflows, or digital transformation',
      'Minimum of 3 referred client deployments per calendar year',
      'Completion of Fathom Administrator & Workflow Certification (free 45-min online track)',
    ],
    ctaLabel: 'Apply as Solution Partner',
    applyRoute: '/program/solution-partners/apply',
  },
  {
    slug: 'integration-partners',
    name: 'Technology & Integration Partners',
    badge: 'ISVs & SaaS Platforms',
    tagline: 'Build deep conversational integrations on Fathoms REST API, Webhooks, and MCP.',
    overview:
      'Connect your SaaS product to Fathoms high-accuracy meeting data. Whether you build CRM platforms, project trackers, AI analytics, or document suites, our open developer platform, rich webhooks, and Model Context Protocol (MCP) server make integration fast and seamless.',
    benefits: [
      'Featured placement in the Fathom Integrations Directory with 21+ partner categories',
      'Direct developer support from our core engineering team in a private Slack channel',
      'Early preview access to new API versions, webhook events, and acoustic model releases',
      'Joint marketing opportunities, co-authored case studies, and webinar spotlights',
    ],
    requirements: [
      'Commercially available SaaS application with public user base',
      'Implementation of bi-directional data flow or webhook event consumption',
      'Adherence to Fathom data security, encryption, and zero-model-training privacy guidelines',
    ],
    ctaLabel: 'Apply as Tech Partner',
    applyRoute: '/program/integration-partners/apply',
  },
  {
    slug: 'points-program',
    name: 'Fathom Points & Community Rewards',
    badge: 'Referrals & Power Users',
    tagline: 'Earn points for inviting colleagues and clients. Redeem for subscription credits and perks.',
    overview:
      'We believe our best advocates are the people who use Fathom every day to reclaim their focus. Every time a colleague or client signs up through your personal referral link, you earn Fathom Points that can be redeemed for subscription fee credits, custom template designs, and exclusive swag.',
    benefits: [
      '500 Points earned for every referred colleague who completes their first recorded meeting',
      'Redeem 1,000 Points for $20 in subscription billing credits',
      'Unlock exclusive power-user badges, early beta access, and custom template consultations',
      'Live balance dashboard tracking pending invites, earned rewards, and redemption history',
    ],
    requirements: [
      'Any active Fathom user on Free, Team, or Enterprise plans',
      'Share your unique referral link via email, Slack, or social channels',
      'Referrals must verify their work email address and record at least one meeting',
    ],
    ctaLabel: 'View Your Points Balance',
    applyRoute: '/app/points',
  },
  {
    slug: 'portfolio-partners',
    name: 'Venture & Accelerator Portfolio Program',
    badge: 'Startups & Incubators',
    tagline: 'Exclusive meeting intelligence credits for early-stage portfolio startups.',
    overview:
      'Accelerate your portfolio companies from day one. Top-tier venture capital firms, startup accelerators, and incubator networks partner with Fathom to grant their founders up to 12 months of free Team Edition access, ensuring early hires spend their time talking to customers rather than typing notes.',
    benefits: [
      '$2,500 in Fathom subscription credits per portfolio company (equivalent to 1 year for 10 seats)',
      'Founder onboarding sessions covering user research synthesis and investor update drafting',
      'Dedicated priority concierge support during key funding and product launch milestones',
      'Seamless transition to scaled enterprise governance when entering growth rounds',
    ],
    requirements: [
      'Accredited venture capital fund, startup accelerator, or university entrepreneurship lab',
      'Portfolio companies must be newly founded or raising Pre-Seed through Series A',
      'Valid corporate email domain and startup website',
    ],
    ctaLabel: 'Apply for Portfolio Credits',
    applyRoute: '/program/portfolio-partners/apply',
  },
];
