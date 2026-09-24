import type { HelpCategory, HelpArticle } from './types';

export const HELP_CATEGORIES: HelpCategory[] = [
  { slug: 'product-updates', name: 'Product Updates', description: 'Recent releases, model improvements, and new capabilities.', icon: '⚡', articleCount: 2 },
  { slug: 'getting-started', name: 'Getting Started', description: 'Account setup, calendar connection, and your first recorded call.', icon: '🚀', articleCount: 2 },
  { slug: 'settings', name: 'Settings & Workspace', description: 'Managing team members, audio preferences, and recording rules.', icon: '⚙️', articleCount: 2 },
  { slug: 'call-recording', name: 'Using Fathom on a Call', description: 'Bot vs bot-free mode, highlight hotkeys, and participant consent.', icon: '🎙️', articleCount: 2 },
  { slug: 'after-call', name: 'Using Fathom After a Call', description: 'Reviewing transcripts, clickable receipts, and generating clips.', icon: '📋', articleCount: 2 },
  { slug: 'integrations', name: 'Integrations & CRM', description: 'Connecting Salesforce, HubSpot, Slack, Notion, and Zapier.', icon: '🔗', articleCount: 2 },
  { slug: 'teams-pricing', name: 'Teams & Pricing Plans', description: 'Billing tiers, seat management, and enterprise upgrades.', icon: '💳', articleCount: 2 },
  { slug: 'faqs', name: 'Frequently Asked Questions', description: 'Common inquiries regarding privacy, retention, and permissions.', icon: '❓', articleCount: 2 },
  { slug: 'troubleshooting', name: 'Troubleshooting & Audio', description: 'Resolving calendar connection drops, mic permissions, and bot delays.', icon: '🛠️', articleCount: 2 },
];

export const HELP_ARTICLES: HelpArticle[] = [
  // Product Updates
  {
    slug: 'bot-free-recording-release',
    categorySlug: 'product-updates',
    title: 'Introducing Bot-Free Desktop Recording',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 3,
    summary: 'Learn how to capture meeting audio locally on your workstation without injecting a third-party bot avatar into the meeting.',
    content: [
      'Bot-free recording gives you the full power of Fathoms transcription and receipt-backed summaries with total discretion.',
      'Instead of inviting a bot into your Zoom, Meet, or Teams room, Fathoms desktop engine captures system audio directly from your audio interface.',
      'Transcripts are uploaded securely and diarized using the same 8-track speaker engine.',
    ],
    steps: [
      { title: 'Download Desktop Companion', detail: 'Open Settings > Recording Mode and enable "Local Desktop Capture".' },
      { title: 'Select Audio Input/Output', detail: 'Verify your microphone and system playback device in audio preferences.' },
      { title: 'Start Meeting', detail: 'Launch any meeting — Fathom records locally without any bot joining.' },
    ],
  },
  {
    slug: 'mcp-server-support',
    categorySlug: 'product-updates',
    title: 'Model Context Protocol (MCP) Integration Guide',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 4,
    summary: 'How to connect Claude Desktop and LLM agents to your Fathom workspace via MCP.',
    content: [
      'The Model Context Protocol (MCP) allows AI clients to securely query your meeting transcripts and retrieve verified audio receipts.',
      'Configure our official MCP server in your claude_desktop_config.json file to ask questions across your meeting archives directly in Claude.',
    ],
    steps: [
      { title: 'Generate API Key', detail: 'Navigate to Developer Settings and create a new Secret API Key.' },
      { title: 'Add Config Block', detail: 'Insert the Fathom MCP config snippet into your Claude Desktop configuration.' },
      { title: 'Test in Claude', detail: 'Ask Claude "Summarize key commitments from my last 3 customer calls" and observe cited timecode receipts.' },
    ],
  },

  // Getting Started
  {
    slug: 'connecting-google-or-outlook-calendar',
    categorySlug: 'getting-started',
    title: 'Connecting Google Calendar or Microsoft Outlook',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 3,
    summary: 'Step-by-step instructions to link your calendar so Fathom knows which meetings to record.',
    content: [
      'Fathom synchronizes with Google Calendar and Microsoft Outlook 365 to inspect upcoming calendar invites.',
      'You maintain complete control over which calls are recorded: external meetings only, all calls, or only meetings you manually designate.',
    ],
    steps: [
      { title: 'Open Settings', detail: 'Click Settings in the left navigation rail.' },
      { title: 'Click Connect Calendar', detail: 'Authenticate with your Google Workspace or Microsoft account.' },
      { title: 'Define Default Behavior', detail: 'Select whether Fathom should default to Auto-Record or Manual Join.' },
    ],
  },
  {
    slug: 'first-meeting-walkthrough',
    categorySlug: 'getting-started',
    title: 'Your First Recorded Meeting: What to Expect',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 4,
    summary: 'A complete walkthrough of the participant experience during and immediately following your first call.',
    content: [
      'During your call, Fathom listens quietly. You can press hotkey "H" anytime to bookmark a critical highlight.',
      'Within 60 seconds of hanging up, you receive an email containing a crisp executive summary with clickable timecode receipts.',
    ],
  },

  // Settings & Workspace
  {
    slug: 'configuring-recording-rules',
    categorySlug: 'settings',
    title: 'Configuring Natural Language Recording Rules',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 3,
    summary: 'Use conversational rules like "Only record external clients and auto-share with team" to automate behavior.',
    content: [
      'Fathom features a sentence-style natural language rule builder in Settings.',
      'Rules allow you to filter meetings by keywords (e.g. "Internal Sync", "Interview", "Demo") or attendee email domains.',
    ],
  },
  {
    slug: 'managing-team-seats-and-roles',
    categorySlug: 'settings',
    title: 'Managing Team Seats & Workspace Permissions',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 3,
    summary: 'How workspace administrators invite colleagues, assign roles, and manage shared meeting access.',
    content: [
      'Workspace admins can invite team members via corporate email domains.',
      'Role-based permissions separate Admins (billing, integrations, settings) from Members (recording, library access).',
    ],
  },

  // Using Fathom on a Call
  {
    slug: 'bot-vs-bot-free-comparison',
    categorySlug: 'call-recording',
    title: 'Choosing Between Bot and Bot-Free Recording Mode',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 4,
    summary: 'Understand the technical and practical differences between our two recording modes.',
    content: [
      'Bot Mode: A friendly "Fathom Notetaker" avatar joins the meeting room. Ideal when you want clear participant disclosure and cloud-based recording without installing desktop software.',
      'Bot-Free Mode: Captures your system audio locally. Ideal for sensitive client calls, executive interviews, or strict organizational policies prohibiting bot attendees.',
    ],
  },
  {
    slug: 'using-the-highlight-hotkey',
    categorySlug: 'call-recording',
    title: 'Flagging Highlights Live with the "H" Hotkey',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 2,
    summary: 'How to bookmark crucial moments during a call without shifting your focus away from the conversation.',
    content: [
      'Whenever an important decision, pricing objection, or agreement is spoken, simply press "H" on your keyboard.',
      'Fathom bookmarks that exact timestamp and highlights the passage in your post-meeting recap.',
    ],
  },

  // Using Fathom After a Call
  {
    slug: 'how-timecode-receipts-work',
    categorySlug: 'after-call',
    title: 'Understanding Spoken Receipts: How to Verify AI Claims',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 3,
    summary: 'Never blindly trust an AI summary again. Learn how clickable receipts guarantee factual accuracy.',
    content: [
      'Every bullet in a Fathom summary includes a small badge indicating the speaker and exact timecode (e.g. 12:41 P).',
      'Clicking that badge immediately seeks the audio player to that exact second, allowing you to hear the nuance in context.',
    ],
  },
  {
    slug: 'trimming-and-sharing-clips',
    categorySlug: 'after-call',
    title: 'Trimming Video Clips and Sharing Recipient Links',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 3,
    summary: 'How to create 30-second video clips to share in Slack or send to clients with zero login required.',
    content: [
      'Drag any range along The Score timeline to select a segment.',
      'Click "Create Clip" to generate a public link that external recipients can view without signing in.',
    ],
  },

  // Integrations & CRM
  {
    slug: 'salesforce-setup-and-field-mapping',
    categorySlug: 'integrations',
    title: 'Salesforce Field Mapping & Auto-Logging Setup',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 5,
    summary: 'Complete guide to mapping Fathom MEDDIC summaries to Salesforce Opportunity and Contact records.',
    content: [
      'Navigate to Integrations > Salesforce and authenticate with your Salesforce credentials.',
      'Map Fathom summary sections to standard fields (Description, Next Steps) or custom fields on your Opportunity schema.',
    ],
  },
  {
    slug: 'slack-channel-routing-rules',
    categorySlug: 'integrations',
    title: 'Routing Call Summaries to Dedicated Slack Channels',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 3,
    summary: 'Automatically route external customer recaps to #sales and sprint discussions to #engineering.',
    content: [
      'Install the Fathom Slack App and authorize your workspace.',
      'Create routing rules pairing calendar keywords or attendee tags with specific target channels.',
    ],
  },

  // Teams & Pricing Plans
  {
    slug: 'free-vs-team-feature-breakdown',
    categorySlug: 'teams-pricing',
    title: 'Free Forever vs Team Edition: Which is Right for You?',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 4,
    summary: 'Compare features, limits, and team collaboration capabilities across our subscription tiers.',
    content: [
      'Free Forever includes unlimited recording, transcripts, and The Score timeline for individual users.',
      'Team Edition adds bi-directional CRM sync, custom summary templates, unlimited Ask AI, and shared workspace libraries.',
    ],
  },
  {
    slug: 'updating-payment-and-invoicing',
    categorySlug: 'teams-pricing',
    title: 'Managing Billing, Invoices, and Seat Counts',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 2,
    summary: 'How to download VAT/tax invoices, update credit cards, and adjust seat counts.',
    content: [
      'Workspace admins can adjust seat licenses anytime under Settings > Billing.',
      'Prorated charges or credits apply automatically when adding or removing team seats.',
    ],
  },

  // FAQs
  {
    slug: 'are-meeting-recordings-private',
    categorySlug: 'faqs',
    title: 'Are My Meeting Recordings and Transcripts Kept Private?',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 3,
    summary: 'Fathoms strict privacy guarantees, enterprise data encryption, and zero model training commitments.',
    content: [
      'Your recordings are encrypted at rest using AES-256 and in transit using TLS 1.3.',
      'We never use your customer meeting audio or transcripts to train public AI models.',
    ],
  },
  {
    slug: 'what-languages-are-supported',
    categorySlug: 'faqs',
    title: 'Supported Transcription and Summary Languages',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 2,
    summary: 'Fathom supports automatic transcription and summary translation across 40+ languages.',
    content: [
      'Our acoustic model automatically detects the language spoken during the call.',
      'Supported languages include English, Spanish, French, German, Japanese, Portuguese, and dozens more.',
    ],
  },

  // Troubleshooting & Audio
  {
    slug: 'microphone-permission-issues',
    categorySlug: 'troubleshooting',
    title: 'Resolving Microphone & System Audio Permissions',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 3,
    summary: 'Troubleshooting audio capture errors in macOS, Windows, and Google Chrome.',
    content: [
      'Ensure Chrome or your browser has operating system permission to access your microphone.',
      'On macOS, check System Settings > Privacy & Security > Screen & System Audio Recording.',
    ],
  },
  {
    slug: 'bot-did-not-join-meeting',
    categorySlug: 'troubleshooting',
    title: 'What to Do if the Bot Did Not Join Your Call',
    lastUpdated: 'September 2026',
    readingTimeMinutes: 3,
    summary: 'Quick fixes for calendar sync delays, waiting room locks, and meeting password mismatches.',
    content: [
      'Confirm the meeting link is in the calendar invite location or description field.',
      'If your meeting uses a Waiting Room, ensure the host admits the "Fathom Notetaker" participant.',
    ],
  },
];
