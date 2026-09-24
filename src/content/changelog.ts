import type { ChangelogItem } from './types';

export const CHANGELOG_ITEMS: ChangelogItem[] = [
  {
    id: 'ch-2026-09-24',
    date: 'September 24, 2026',
    version: 'v2.8.0',
    category: 'Capture',
    title: 'Zero-Bot Audio Capture Engine for Desktop',
    summary:
      'Record meetings without any bot avatar entering your video conference room. Our new desktop capture engine intercepts system audio locally with studio-grade fidelity.',
    highlights: [
      'Complete participant privacy: No bot avatar visible in Zoom, Meet, or Teams',
      'Lossless PCM 48kHz audio sampling with zero bandwidth overhead on video calls',
      'Instantaneous post-call synchronization with automatic speaker separation',
    ],
    tryRoute: '/live',
    tryLabel: 'Simulate Live Capture',
  },
  {
    id: 'ch-2026-09-18',
    date: 'September 18, 2026',
    version: 'v2.7.2',
    category: 'AI',
    title: 'Binary Search Transcript Sync & 60fps Playhead',
    summary:
      'Re-engineered the audio playback synchronization loop. Binary search segment lookup ensures the active spoken transcript line highlights within 2ms of audio progress.',
    highlights: [
      'Sub-50ms diarization boundary snapping across 8 concurrent speaker lanes',
      'Smoother 60fps requestAnimationFrame playhead tracking without DOM layout thrashing',
      'Floating auto-follow jump pill when scrolling away from active playback',
    ],
    tryRoute: '/meetings/mtg-q3-roadmap',
    tryLabel: 'Open 8-Person Flagship Meeting',
  },
  {
    id: 'ch-2026-09-12',
    date: 'September 12, 2026',
    version: 'v2.7.0',
    category: 'AI',
    title: 'Model Context Protocol (MCP) Server for LLM Agents',
    summary:
      'Connect Claude Desktop, Antigravity, and autonomous agent frameworks directly to your meeting knowledge base using our native MCP server implementation.',
    highlights: [
      'Standardized tools: list_meetings, search_transcripts, get_receipts, ask_meeting_ai',
      'Local stdio and secure SSE transport modes supported out of the box',
      'Zero model training guarantee with full role-based access enforcement',
    ],
    tryRoute: '/developers/mcp',
    tryLabel: 'Inspect MCP Documentation',
  },
  {
    id: 'ch-2026-09-05',
    date: 'September 5, 2026',
    version: 'v2.6.4',
    category: 'Integrations',
    title: 'Bi-Directional Salesforce Opportunity & Contact Auto-Sync',
    summary:
      'Sales reps can now automatically populate custom MEDDIC qualification fields, deal pain points, and next steps into Salesforce without manual copy-pasting.',
    highlights: [
      'Intelligent attendee email matching to Contacts, Accounts, and open Opportunities',
      'Timecode receipt chips embedded into Salesforce activity timeline records',
      'Automated deduplication prevents multiple task entries when multiple reps attend',
    ],
    tryRoute: '/integrations/salesforce',
    tryLabel: 'View Salesforce Guide',
  },
  {
    id: 'ch-2026-08-28',
    date: 'August 28, 2026',
    version: 'v2.6.0',
    category: 'AI',
    title: 'Visual Summary Template Builder & 12 Specialized Presets',
    summary:
      'Tailor meeting notes to your exact organizational format. Create custom sections, select output formats (bullets, tables, checklists), and preview changes live on real fixtures.',
    highlights: [
      '12 pre-built templates: Sales Discovery, MEDDIC Review, CS QBR, 1:1, Team Standup',
      'Reorder, rename, and add custom AI instructions per section',
      'All summary bullets retain exact clickable timecode receipts across every custom template',
    ],
    tryRoute: '/app/templates',
    tryLabel: 'Launch Templates Builder',
  },
  {
    id: 'ch-2026-08-20',
    date: 'August 20, 2026',
    version: 'v2.5.2',
    category: 'Performance',
    title: 'Instant Command Palette (⌘K) Across Meetings & Moments',
    summary:
      'Search across your entire conversation library with zero latency. Search by speaker, keyword, or ask a natural language question with cited timecode receipts.',
    highlights: [
      'Global keyboard trigger (⌘K or /) accessible from any marketing or app route',
      'Pre-indexed segment vectors allow sub-100ms keyword retrieval',
      'Instant deep linking to exact spoken seconds with ?t= URL state parameters',
    ],
    tryRoute: '/meetings',
    tryLabel: 'Try Search in Library',
  },
  {
    id: 'ch-2026-08-14',
    date: 'August 14, 2026',
    version: 'v2.5.0',
    category: 'Capture',
    title: 'The Score: Multi-Track Timeline with Snapping Seek',
    summary:
      'Visualizing long, multi-person conversations is no longer a chore. The Score displays up to 8 dedicated speaker lanes with topic markers and 6px snapping seek.',
    highlights: [
      'Dedicated color-coded lane per participant with instant visual talk-time balance',
      'Snapping seek within 6px of moment glyphs (highlights, actions, decisions)',
      'Range drag on timeline to create instant shareable clips in under 3 seconds',
    ],
    tryRoute: '/meetings/mtg-q3-roadmap',
    tryLabel: 'Experience The Score',
  },
  {
    id: 'ch-2026-08-05',
    date: 'August 5, 2026',
    version: 'v2.4.1',
    category: 'Integrations',
    title: 'HubSpot Custom Deals & Meeting Engagement Logging',
    summary:
      'Bring meeting notes directly into HubSpot Sales Hub. Fathom logs rich HTML summaries, action items, and receipt links to Contact and Deal activity timelines.',
    highlights: [
      'Automatic deal stage progression based on verbal procurement commitments',
      'Customer risk keyword alerts push notifications to account managers',
      'Exclusion rules to prevent internal team syncs from cluttering CRM records',
    ],
    tryRoute: '/integrations/hubspot',
    tryLabel: 'View HubSpot Integration',
  },
  {
    id: 'ch-2026-07-29',
    date: 'July 29, 2026',
    version: 'v2.4.0',
    category: 'Performance',
    title: 'Public Recipient View with Zero Login Required',
    summary:
      'Sharing meeting notes with clients or external stakeholders should never force them through a signup barrier. Shared links now render instantly in any browser.',
    highlights: [
      'Frictionless public link access with read-only permission isolation',
      'Embedded responsive player, transcript search, and receipt-backed summary tabs',
      'Custom link expiration settings and one-click revocation for compliance',
    ],
    tryRoute: '/s/demo-share-token',
    tryLabel: 'Open Public Recipient View',
  },
  {
    id: 'ch-2026-07-21',
    date: 'July 21, 2026',
    version: 'v2.3.0',
    category: 'Integrations',
    title: 'Automated Slack Channel Digests & Personal Action Tasks',
    summary:
      'Deliver formatted meeting recaps and action item checklists straight to Slack channels and direct messages within 60 seconds of call completion.',
    highlights: [
      'Keyword-based channel routing (e.g. external calls to #sales, syncs to #dev)',
      'Interactive Slack action checklist with one-click task completion',
      'Share trimmed video soundbites directly into Slack team channels',
    ],
    tryRoute: '/integrations/slack',
    tryLabel: 'Explore Slack Features',
  },
  {
    id: 'ch-2026-07-12',
    date: 'July 12, 2026',
    version: 'v2.2.0',
    category: 'AI',
    title: 'Real-Time Streaming Dialogue in Live Simulation Mode',
    summary:
      'Watch transcription occur turn-by-turn with our live simulation engine. Flag important moments with hotkey H and watch action items auto-extract in real time.',
    highlights: [
      'Streaming speaker turns with visual tally indicators',
      'Auto-timestamped scratchpad for simultaneous personal notes',
      'One-tap highlight hotkey (H) records key moments with exact time tags',
    ],
    tryRoute: '/live',
    tryLabel: 'Simulate Live Call',
  },
  {
    id: 'ch-2026-07-02',
    date: 'July 2, 2026',
    version: 'v2.1.0',
    category: 'Performance',
    title: 'Natural Language Recording Rules & Settings',
    summary:
      'Define automated recording behaviors in plain English: "Record only external client calls, exclude personal calendar invites, and auto-share with attendees."',
    highlights: [
      'Plain text rule evaluation replaces complex boolean setting matrices',
      'Instant calendar integration for Google Workspace and Microsoft 365',
      'Voice signature calibration for accurate speaker assignment',
    ],
    tryRoute: '/settings',
    tryLabel: 'Configure Recording Rules',
  },
];
