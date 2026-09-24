import type { CaseStudyItem } from './types';

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    slug: 'blackthorn',
    companyName: 'Blackthorn Events & Payments',
    industry: 'Enterprise Fintech & Event Management',
    teamSize: '120 employees',
    headline: 'How an agile operations team saved 12 hours per rep per week with automated CRM sync.',
    challenge:
      'Account executives and solutions engineers were spending over an hour after every technical demo manually entering custom field data, attendee notes, and deal risks into Salesforce. High note variance between reps created pipeline forecasting blindspots for sales leadership.',
    solution:
      'Blackthorn deployed Fathom across 45 sales reps with automatic Salesforce integration and custom MEDDIC templates. Spoken commitments were extracted and mapped to custom Opportunity fields within 60 seconds of call completion.',
    outcomeStats: [
      { metric: '12 hrs', label: 'Saved per sales representative weekly (Sample metric)' },
      { metric: '98%', label: 'Salesforce opportunity field completeness' },
      { metric: '25 min', label: 'Average acceleration in post-demo follow-up velocity' },
    ],
    quote: {
      text: 'Clickable receipts completely changed the game for our deal reviews. When an AE says a prospect committed budget, leadership can click the exact second on The Score and hear the client confirm it. Sample quote.',
      author: 'David Chen',
      role: 'VP of Global Revenue Operations',
    },
    workflowDetails: [
      'Configured bi-directional Salesforce task sync mapped to standard Opportunity schemas',
      'Implemented MEDDIC discovery template across all initial qualification calls',
      'Automated Slack alerts in #sales-wins whenever positive procurement sentiment was flagged',
    ],
    seo: {
      title: 'Sample Case Study: Blackthorn — RevOps Automation | Fathom',
      description: 'How an agile operations team saved 12 hours per rep per week with automated CRM sync. Sample story.',
    },
  },

  {
    slug: 'bluleadz',
    companyName: 'Bluleadz Inbound Agency',
    industry: 'Digital Marketing & HubSpot Solutions Partner',
    teamSize: '65 consultants',
    headline: 'Accelerating client onboarding clarity and reducing recap churn by 65%.',
    challenge:
      'As a premier HubSpot agency handling dozens of concurrent client campaigns, client account managers struggled to keep meeting notes synchronized across strategy consultants, copywriters, and HubSpot technical specialists.',
    solution:
      'Bluleadz integrated Fathom into their Google Meet client cadence. Meeting summaries with action items and Notion documentation were pushed automatically to client portals, giving clients immediate transparency.',
    outcomeStats: [
      { metric: '65%', label: 'Reduction in client recap follow-up emails (Sample metric)' },
      { metric: '100%', label: 'Of client commitments backed by audio receipts' },
      { metric: '4.8/5', label: 'Client satisfaction score across onboarding cohorts' },
    ],
    quote: {
      text: 'Our clients love that they do not need to log into a complicated portal to review their strategy calls. The shared links just work, and the timecode receipts ensure complete alignment. Sample quote.',
      author: 'Jessica Rivera',
      role: 'Director of Client Services',
    },
    workflowDetails: [
      'Automatic Notion client workspace synchronization after every sprint review',
      'Client highlight playlists assembled and shared for milestone reviews',
      'HubSpot deal timeline event creation on agency account records',
    ],
    seo: {
      title: 'Sample Case Study: Bluleadz — Agency Client Hand-offs | Fathom',
      description: 'Accelerating client onboarding clarity and reducing recap churn by 65%. Sample story.',
    },
  },

  {
    slug: 'ncsi',
    companyName: 'NCSI Enterprise Consulting',
    industry: 'Global Management Consulting',
    teamSize: '500+ consultants',
    headline: 'Deploying secure, bot-free meeting intelligence across 500+ consultants.',
    challenge:
      'Consulting for Fortune 500 financial institutions meant strict security policies: client infosec prohibited any bot avatars from joining confidential strategy calls. NCSI needed meeting transcription and AI summaries without violating client confidentiality mandates.',
    solution:
      'NCSI adopted Fathoms bot-free desktop capture engine. Consultants recorded sensitive interview sessions locally on their managed laptops, maintaining complete discretion while benefiting from 8-lane speaker diarization and SOC2 Type II compliance.',
    outcomeStats: [
      { metric: '500+', label: 'Consultants onboarded with zero security incidents (Sample)' },
      { metric: '100%', label: 'Compliance with financial institution recording policies' },
      { metric: '3.5x', label: 'Faster synthesis of cross-interview research themes' },
    ],
    quote: {
      text: 'Bot-free capture solved an impossible dilemma for our firm. We gained cutting-edge conversational AI without ever triggering our clients infosec alarms. Sample quote.',
      author: 'Michael Sterling',
      role: 'Senior Managing Partner',
    },
    workflowDetails: [
      'Deployed bot-free desktop audio capture across enterprise-managed macOS and Windows devices',
      'Enforced Okta SAML 2.0 Single Sign-On and strict 30-day retention policies',
      'Utilized Ask AI to cross-synthesize findings across 40+ client stakeholder interviews',
    ],
    seo: {
      title: 'Sample Case Study: NCSI — Enterprise Diarization at Scale | Fathom',
      description: 'Deploying secure, bot-free meeting intelligence across 500+ consultants. Sample story.',
    },
  },
];
