import type { RolePageData } from './types';

export const ROLE_SOLUTIONS: Record<string, RolePageData> = {
  sales: {
    slug: 'sales',
    roleName: 'Sales & Account Executives',
    headline: 'Close deals faster. Never fill out CRM fields manually again.',
    subheadline:
      'Fathom extracts MEDDIC qualification criteria, customer objections, and verbal commitments directly from call audio, auto-syncing clean data into Salesforce and HubSpot.',
    templateName: 'Sales Discovery & Deal Qualification',
    sampleSummary: {
      title: 'Acme Corp — Initial Architecture & Budget Discovery',
      sections: [
        {
          heading: 'MEDDIC Qualification Signals',
          items: [
            { text: 'Metrics: Target is reducing ticket resolution latency from 4.2h to under 45m', timecode: 420, speaker: 'P' },
            { text: 'Economic Buyer: VP of Eng Marcus Vance holds final budget authority ($65k allocation)', timecode: 780, speaker: 'M' },
            { text: 'Decision Criteria: Sub-50ms diarization, SOC2 Type II, native Salesforce sync', timecode: 1140, speaker: 'P' },
            { text: 'Identified Pain: Reps spending 6.5 hours weekly transcribing notes into CRM manually', timecode: 1420, speaker: 'M' },
          ],
        },
        {
          heading: 'Customer Objections & Concerns',
          items: [
            { text: 'Security review timeline: Infosec needs subprocessor checklist before proof of concept', timecode: 1840, speaker: 'M' },
            { text: 'Legacy contract with Fireflies expires November 15th; migration support requested', timecode: 2190, speaker: 'M' },
          ],
        },
        {
          heading: 'Verbal Commitments & Next Steps',
          items: [
            { text: 'Send custom SOC2 compliance package and DPA by Thursday end of day (Assigned: Alex)', timecode: 2680, speaker: 'A' },
            { text: 'Schedule technical deep dive with security architect for Oct 4th at 2pm EST', timecode: 3100, speaker: 'P' },
          ],
        },
      ],
    },
    savedPrompts: [
      'What were the top 3 budget or pricing objections raised during this call?',
      'List every competitor mentioned and the prospect sentiment toward each.',
      'Draft a personalized follow-up email confirming our agreed timeline.',
    ],
    keyIntegration: {
      name: 'Salesforce Opportunity & Contact Sync',
      category: 'CRM',
      benefit: 'Updates Next Steps, Stage, and pain point fields automatically upon call conclusion.',
      samplePayload: {
        event: 'meeting.summary.created',
        deal_id: '0065e000002XYZ1',
        account: 'Acme Cloud Services',
        meddic: {
          metrics: 'Reduce ticket resolution latency from 4.2h to 45m',
          economic_buyer: 'Marcus Vance (VP Eng)',
          decision_criteria: 'SOC2, Sub-50ms diarization, Salesforce sync',
        },
        next_step: 'Deliver Infosec compliance package by Thursday EOD',
        stage: 'Qualification / Scoping',
        receipt_count: 8,
      },
    },
    metrics: [
      { label: 'Admin Time Saved', value: '5.8 hrs', detail: 'average saved per sales rep every week on CRM data entry (Sample metric)' },
      { label: 'Follow-up Velocity', value: '18 min', detail: 'average time from call ending to personalized recap sent to prospect' },
      { label: 'Pipeline Accuracy', value: '94%', detail: 'CRM field completeness across opportunities with automated logging' },
    ],
    seo: {
      title: 'Fathom for Sales Teams — Auto-fill CRM & Win Deals',
      description: 'Auto-sync call notes, MEDDIC criteria, and next steps into Salesforce and HubSpot with zero rep overhead.',
    },
  },

  'customer-success': {
    slug: 'customer-success',
    roleName: 'Customer Success & Account Management',
    headline: 'Zero surprises at renewal. Capture every customer signal.',
    subheadline:
      'Turn customer check-ins, onboarding kickoffs, and QBRs into structured action items, health sentiment scores, and seamless handoffs across your CS team.',
    templateName: 'Customer Health & QBR Check-In',
    sampleSummary: {
      title: 'Starlight Media — Q3 Executive Business Review',
      sections: [
        {
          heading: 'Executive Sentiment & Health Signals',
          items: [
            { text: 'Customer rated platform reliability 9/10 following recent multi-region failover patch', timecode: 310, speaker: 'S' },
            { text: 'Department expansion: Marketing team requesting 45 additional seats in November', timecode: 620, speaker: 'S' },
            { text: 'Key champion Sarah promoted to Director of Global Operations', timecode: 940, speaker: 'E' },
          ],
        },
        {
          heading: 'Product Feedback & Feature Requests',
          items: [
            { text: 'Requested webhook event for automated audio export to private S3 bucket', timecode: 1450, speaker: 'S' },
            { text: 'Desired deeper permission controls between European and US workspace domains', timecode: 1980, speaker: 'S' },
          ],
        },
        {
          heading: 'Agreed Action Items',
          items: [
            { text: 'Provide quote for 45 additional seats under current enterprise tier pricing (Elena)', timecode: 2450, speaker: 'E' },
            { text: 'Deliver engineering design doc for S3 automated webhook export by Friday', timecode: 2890, speaker: 'A' },
          ],
        },
      ],
    },
    savedPrompts: [
      'What are the primary customer risks or churn signals from this conversation?',
      'Extract every feature request with the specific business reason given.',
      'Summarize this customer QBR into a 4-bullet executive update for leadership.',
    ],
    keyIntegration: {
      name: 'HubSpot Timeline & Customer Health Sync',
      category: 'Customer Success',
      benefit: 'Logs call summaries to customer timeline and flags risk keywords automatically.',
      samplePayload: {
        event: 'cs.qbr.completed',
        customer: 'Starlight Media',
        health_status: 'Green (High Expansion Signal)',
        seat_expansion: '+45 seats requested Q4',
        champion: 'Sarah Jenkins (Promoted to Dir Global Ops)',
        open_items: ['S3 export design doc', 'Seat expansion quote'],
      },
    },
    metrics: [
      { label: 'Handoff Efficiency', value: '4.2x', detail: 'faster transition between sales closing and CS onboarding kickoff' },
      { label: 'Renewal Visibility', value: '100%', detail: 'customer commitments timestamped and backed by audio receipts' },
      { label: 'Executive Prep Time', value: '12 min', detail: 'average time needed to review 6 months of client meetings before a QBR' },
    ],
    seo: {
      title: 'Fathom for Customer Success — Retention & QBR Recaps',
      description: 'Capture renewals, feature requests, and customer sentiment automatically from every client touchpoint.',
    },
  },

  marketing: {
    slug: 'marketing',
    roleName: 'Product Marketing & Research',
    headline: 'Voice of customer delivered directly to your creative workflow.',
    subheadline:
      'Extract verbatim customer quotes, product friction points, and competitor perception without sitting through dozens of full recorded calls.',
    templateName: 'Customer Discovery & Messaging Research',
    sampleSummary: {
      title: 'User Research Cohort #4 — Onboarding Perception',
      sections: [
        {
          heading: 'Customer Language & Positioning Signals',
          items: [
            { text: 'Users repeatedly described competitor tools as "a creepy bot that interrupts meetings"', timecode: 380, speaker: 'U' },
            { text: 'Highlighted that clickable receipts gave legal confidence to rely on AI summaries', timecode: 810, speaker: 'U' },
          ],
        },
        {
          heading: 'Friction Points & Onboarding Barriers',
          items: [
            { text: 'Initial hesitation around Google Workspace admin calendar consent approval', timecode: 1320, speaker: 'U' },
            { text: 'Users wanted instant notification in Slack rather than checking email recaps', timecode: 1750, speaker: 'U' },
          ],
        },
      ],
    },
    savedPrompts: [
      'Extract the exact phrases customers used to describe their biggest daily frustration.',
      'Generate 5 customer testimonial quotes suitable for landing page social proof.',
      'What alternative products did the participant mention evaluating?',
    ],
    keyIntegration: {
      name: 'Notion Research Knowledge Repository',
      category: 'Product Research',
      benefit: 'Pushes verified user quotes, soundbites, and tagging directly into product research databases.',
      samplePayload: {
        event: 'research.quote.tagged',
        study: 'Q3 Onboarding Friction Study',
        quote: 'Clickable receipts gave our legal team the confidence to adopt AI summaries.',
        sentiment: 'Strongly Positive',
        tags: ['trust', 'receipts', 'legal-approval'],
      },
    },
    metrics: [
      { label: 'Quote Discovery', value: '8x faster', detail: 'locating exact verbatim quotes for case studies and campaigns' },
      { label: 'Research Reach', value: '100%', detail: 'qualitative user interviews transcribed and queryable across marketing' },
      { label: 'Clip Sharing', value: '<30s', detail: 'time to trim and share a customer voice clip to the marketing Slack channel' },
    ],
    seo: {
      title: 'Fathom for Marketing — Voice of Customer & Research',
      description: 'Turn customer discovery calls into product quotes, testimonial clips, and messaging insights.',
    },
  },

  teams: {
    slug: 'teams',
    roleName: 'Cross-Functional & Remote Teams',
    headline: 'Asynchronous clarity. Eliminate useless status update meetings.',
    subheadline:
      'Keep distributed teams in lockstep with searchable meeting knowledge, 60-second catch-up clips, and shared accountability across departments.',
    templateName: 'Cross-Functional Team Standup & Sync',
    sampleSummary: {
      title: 'Weekly Cross-Functional Operations & Sprint Sync',
      sections: [
        {
          heading: 'Decisions Reached',
          items: [
            { text: 'Approved shifting the billing migration date to Oct 12th to avoid sprint conflict', timecode: 290, speaker: 'R' },
            { text: 'Agreed on unified 4-lane mobile timeline layout for responsive redesign', timecode: 670, speaker: 'D' },
          ],
        },
        {
          heading: 'Blockers & Cross-Team Dependencies',
          items: [
            { text: 'Design awaiting final API schema for webhook payloads from backend team', timecode: 1120, speaker: 'D' },
            { text: 'Mobile test flight delayed pending Apple developer certificate renewal', timecode: 1540, speaker: 'E' },
          ],
        },
      ],
    },
    savedPrompts: [
      'What decisions were finalized during this meeting?',
      'Who is blocked, and what specifically are they waiting on?',
      'Draft a 3-bullet Slack update summarizing the outcomes of this sync.',
    ],
    keyIntegration: {
      name: 'Slack Automated Channel Digests',
      category: 'Collaboration',
      benefit: 'Automatically publishes formatted summaries and action items to relevant team channels.',
      samplePayload: {
        event: 'team.sync.digest',
        channel: '#product-engineering-sync',
        decisions: ['Billing migration date shifted to Oct 12', '4-lane mobile timeline approved'],
        blockers: ['Awaiting final webhook schema'],
      },
    },
    metrics: [
      { label: 'Meeting Hours Saved', value: '3.5 hrs', detail: 'fewer recurring sync meetings attended per week per employee' },
      { label: 'Async Catch-up', value: '92%', detail: 'of absent team members consume the 60-second summary instead of full recording' },
      { label: 'Action Follow-through', value: '88%', detail: 'verbal task completion rate when tracked with receipts' },
    ],
    seo: {
      title: 'Fathom for Cross-Functional Teams — Shared Intelligence',
      description: 'Eliminate update syncs with searchable knowledge, instant catch-up clips, and shared workspace visibility.',
    },
  },

  operations: {
    slug: 'operations',
    roleName: 'RevOps & Business Operations',
    headline: 'Operational consistency across every customer touchpoint.',
    subheadline:
      'Enforce standardized qualification schemas, eliminate CRM hygiene debt, and ensure accurate sales attribution across the enterprise.',
    templateName: 'RevOps Pipeline & Process Audit',
    sampleSummary: {
      title: 'Q4 RevOps Deal Inspection & Pipeline Integrity Call',
      sections: [
        {
          heading: 'Process Compliance Findings',
          items: [
            { text: 'Security review stage skipped on 3 enterprise deals currently in negotiation', timecode: 490, speaker: 'O' },
            { text: 'Discount governance: Maximum permitted discount is 18% without CFO signoff', timecode: 920, speaker: 'O' },
          ],
        },
        {
          heading: 'Actionable Pipeline Adjustments',
          items: [
            { text: 'Require economic buyer validation before deals progress beyond Stage 3', timecode: 1410, speaker: 'O' },
            { text: 'Automate HubSpot stage regression when close date pushes twice', timecode: 1950, speaker: 'R' },
          ],
        },
      ],
    },
    savedPrompts: [
      'Were standard discount thresholds or legal terms discussed during this call?',
      'Verify if the economic buyer attended and confirmed procurement authority.',
      'Check if target deployment dates were explicitly committed.',
    ],
    keyIntegration: {
      name: 'REST API & Webhooks Automation',
      category: 'Automation',
      benefit: 'Feed structured meeting data into your data warehouse or custom operational stack.',
      samplePayload: {
        event: 'revops.deal.audit',
        deal_compliance_score: 95,
        discount_discussed: '15% (Within 18% cap)',
        economic_buyer_verified: true,
      },
    },
    metrics: [
      { label: 'CRM Cleanliness', value: '98%', detail: 'standard fields populated correctly across all opportunities' },
      { label: 'Forecast Reliability', value: '+24%', detail: 'improvement in quarterly sales forecast accuracy' },
      { label: 'Audit Speed', value: '10x', detail: 'faster compliance audit on recorded sales calls' },
    ],
    seo: {
      title: 'Fathom for Operations & RevOps — Process Consistency',
      description: 'Enforce standard qualification fields and sync structured data cleanly into your operational tools.',
    },
  },

  engineering: {
    slug: 'engineering',
    roleName: 'Product & Engineering Teams',
    headline: 'From user bug reports directly to clean sprint tickets.',
    subheadline:
      'Clip exact reproduction steps from customer calls, transcribe technical edge cases verbatim, and feed clear specifications directly into Linear and Jira.',
    templateName: 'Technical Spec Review & Architecture Planning',
    sampleSummary: {
      title: 'Architecture Review: Sub-50ms Diarization Pipeline',
      sections: [
        {
          heading: 'Technical Architecture Decisions',
          items: [
            { text: 'Adopt binary search segment indexing for instantaneous playback sync', timecode: 340, speaker: 'A' },
            { text: 'Maintain ClockPlayer rAF loop to decouple audio timing from DOM paint cycles', timecode: 710, speaker: 'A' },
          ],
        },
        {
          heading: 'Identified Edge Cases & Mitigations',
          items: [
            { text: 'Handling overlapping speaker segments: assign primary lane by peak energy', timecode: 1250, speaker: 'P' },
            { text: 'Network jitter on live audio chunks: buffer up to 800ms before synthesis', timecode: 1680, speaker: 'A' },
          ],
        },
      ],
    },
    savedPrompts: [
      'Extract every technical requirement or constraint mentioned by the engineering team.',
      'List all API changes agreed upon and any backward compatibility concerns.',
      'Generate a markdown summary formatted as a GitHub pull request description.',
    ],
    keyIntegration: {
      name: 'Linear & Jira Automatic Issue Creation',
      category: 'Issue Tracking',
      benefit: 'Turn verbal bug reports and customer feature requests directly into Linear tickets with audio receipts.',
      samplePayload: {
        event: 'engineering.issue.created',
        issue_id: 'ENG-4092',
        title: 'Implement binary search for transcript segment synchronization',
        priority: 'High',
        cites: 'timecode: 340s (Alex)',
      },
    },
    metrics: [
      { label: 'Spec Clarity', value: 'Zero ambiguity', detail: 'engineers can click receipts to hear exact context from product managers' },
      { label: 'Bug Reproduction', value: '3x faster', detail: 'developers hear customer explain the exact sequence of clicks' },
      { label: 'Sprint Planning', value: '45 min saved', detail: 'per sprint planning session using structured meeting takeaways' },
    ],
    seo: {
      title: 'Fathom for Engineering & Product — Bug & Spec Sync',
      description: 'Bridge customer bug reports directly into Linear and Jira with exact spoken audio snippets.',
    },
  },
};
