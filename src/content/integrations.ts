import type { IntegrationItem } from './types';

export const INTEGRATIONS_LIST: IntegrationItem[] = [
  {
    slug: 'salesforce',
    name: 'Salesforce',
    category: 'CRM',
    planRequirement: 'Team',
    monogram: 'SF',
    monogramBg: '#00A1E0',
    tagline: 'Automatic call logging and field extraction for Salesforce CRM.',
    overview:
      'Eliminate manual data entry and sales pipeline hygiene debt forever. Fathom connects bi-directionally with Salesforce Sales Cloud to automatically log complete meeting summaries, clickable audio receipts, and extracted MEDDIC qualification parameters into standard and custom CRM objects. Whenever an Account Executive concludes a discovery call or demo, Fathom analyzes the conversation, creates an enriched Task record linked to the corresponding Opportunity and Contact, updates Next Steps, and flags deal risks without requiring reps to open Salesforce.',
    keyFeatures: [
      'Automatic Opportunity & Contact record association based on attendee email domains',
      'Custom field extraction for MEDDIC, BANT, or custom qualification frameworks',
      'Clickable timecode receipt links embedded directly in Salesforce activity records',
      'Bi-directional sync preventing duplicate task entries across multiple attendees',
      'Configurable governance controls allowing reps to review notes before syncing or auto-sync immediately',
    ],
    setupSteps: [
      { step: 1, title: 'Authenticate Salesforce', detail: 'Click Connect in Fathom Settings and log in via your Salesforce OAuth administrator credentials.' },
      { step: 2, title: 'Map Standard & Custom Fields', detail: 'Select which Opportunity, Account, and Task fields Fathom should populate (e.g. Next Steps, Pain Points, Budget).' },
      { step: 3, title: 'Enable Auto-Sync Rules', detail: 'Configure automatic logging rules for all external customer calls or enable manual review before publishing.' },
    ],
    samplePayload: {
      action: 'salesforce.task.create',
      who_id: '0035e000003ABC1',
      what_id: '0065e000002XYZ1',
      subject: 'Fathom Summary: Discovery & Architecture Review',
      activity_date: '2026-09-24',
      description: 'MEDDIC Criteria Extracted: Budget approved ($65k), Decision Criteria includes SOC2 and sub-50ms diarization. Next step: Security review packet by Thursday.',
      fathom_receipt_url: 'https://demo.fathom.ai/meetings/mtg-q3-roadmap?t=420',
      status: 'Completed',
    },
    permissions: ['Read & Write Opportunities', 'Read & Write Contacts & Accounts', 'Create Task & Activity Records'],
    faq: [
      { q: 'Does Fathom create duplicate records if multiple reps attend the call?', a: 'No. Fathom uses intelligent deduplication based on calendar event IDs and attendee domains, ensuring only one unified activity record is logged.' },
      { q: 'Can we sync into custom Salesforce objects?', a: 'Yes. Enterprise plans support arbitrary mapping to custom objects, custom fields, and validation rules.' },
      { q: 'Is Salesforce Sandbox environment supported?', a: 'Yes. Administrators can test syncing in a sandbox environment before switching to production.' },
    ],
    seo: {
      title: 'Salesforce Integration — Automated Call Logging | Fathom',
      description: 'Automatically populate Opportunity fields, Contact records, and Tasks directly from call dialogue.',
    },
  },

  {
    slug: 'hubspot',
    name: 'HubSpot',
    category: 'CRM',
    planRequirement: 'Team',
    monogram: 'HS',
    monogramBg: '#FF7A59',
    tagline: 'Sync call summaries, notes, and deal stages directly into HubSpot CRM.',
    overview:
      'Keep your HubSpot CRM spotless and up-to-date without requiring sales reps to transcribe call notes. Fathom integrates natively with HubSpot Sales Hub to match meeting attendees against existing Contacts and Companies, log enriched meeting timelines, and update Deal stages automatically. Key commitments, customer objections, and audio soundbites are preserved right on the customer timeline so marketing, sales, and customer success always share full context.',
    keyFeatures: [
      'Instant timeline logging on HubSpot Contact, Company, and Deal records',
      'Automatic deal stage advancement based on verbal procurement commitments',
      'Embedded audio player and clickable timecode receipts inside the HubSpot activity feed',
      'Tagging of competitor mentions and pricing feedback directly to HubSpot custom properties',
      'Granular exclusion filters to avoid logging internal team syncs',
    ],
    setupSteps: [
      { step: 1, title: 'Connect HubSpot App', detail: 'Authorize the Fathom app within your HubSpot App Marketplace settings.' },
      { step: 2, title: 'Configure Association Rules', detail: 'Choose whether notes attach to the primary Contact or automatically roll up to Deals.' },
      { step: 3, title: 'Verify First Call Sync', detail: 'Complete your next customer meeting and observe the enriched timeline event appear within 60 seconds.' },
    ],
    samplePayload: {
      event: 'hubspot.engagement.meeting',
      contact_email: 'sarah.jenkins@starlight.io',
      company_domain: 'starlight.io',
      deal_id: '984102941',
      meeting_title: 'Q3 Executive Check-In & Expansion',
      summary_html: '<p>Customer requested +45 seat expansion in November. Health status: Green.</p>',
      receipts_link: 'https://demo.fathom.ai/meetings/mtg-q3-roadmap?t=620',
    },
    permissions: ['Read & Write Contacts & Companies', 'Read & Write Deals', 'Create Engagements / Timeline Events'],
    faq: [
      { q: 'Does Fathom require HubSpot Professional or Enterprise?', a: 'Fathom integrates with HubSpot Starter, Professional, and Enterprise tiers.' },
      { q: 'Can Fathom create new Contacts automatically?', a: 'Yes. You can configure Fathom to create new Contact records for unrecognized external attendees.' },
    ],
    seo: {
      title: 'HubSpot Integration — Clean CRM Sync | Fathom',
      description: 'Sync customer deals, timeline events, and action items into HubSpot CRM without human effort.',
    },
  },

  {
    slug: 'slack',
    name: 'Slack',
    category: 'Collaboration',
    planRequirement: 'Free',
    monogram: 'SL',
    monogramBg: '#4A154B',
    tagline: 'Broadcast meeting summaries, action items, and clips into Slack channels.',
    overview:
      'Keep remote and hybrid teams in sync without forcing everyone into every meeting. With the Fathom Slack integration, formatted executive summaries, action item checklists, and trimmed video clips are delivered directly to designated public or private Slack channels the moment a call ends. Colleagues can skim key takeaways in under 30 seconds, click timecode receipts to verify details, and check off assigned action items directly within Slack.',
    keyFeatures: [
      'Automated channel routing based on meeting title or calendar keyword rules',
      'Interactive Slack message blocks with clickable audio receipt links',
      'One-click sharing of trimmed customer voice clips to celebrate customer wins',
      'Direct message delivery of personal action items and follow-up tasks',
      'Private channel support with full enterprise permission isolation',
    ],
    setupSteps: [
      { step: 1, title: 'Add to Slack Workspace', detail: 'Install the Fathom bot into your corporate Slack workspace.' },
      { step: 2, title: 'Select Target Channels', detail: 'Assign default channels for external sales calls, internal syncs, and executive reviews.' },
      { step: 3, title: 'Set Digest Preferences', detail: 'Choose between full bulleted recaps, action items only, or 30-second highlight reels.' },
    ],
    samplePayload: {
      channel: '#sales-announcements',
      text: '⚡ Call Summary: Acme Corp Architecture Review',
      blocks: [
        { type: 'header', text: { type: 'plain_text', text: 'Acme Corp — Architecture Review' } },
        { type: 'section', text: { type: 'mrkdwn', text: '*Outcome:* Budget confirmed at $65k. Next step: Security review packet by Thursday.' } },
        { type: 'context', elements: [{ type: 'mrkdwn', text: '<https://demo.fathom.ai/meetings/mtg-q3-roadmap?t=420|Listen to Spoken Receipt (12:41)>' }] },
      ],
    },
    permissions: ['Send messages to public & private channels', 'Add slash commands', 'Upload snippet previews'],
    faq: [
      { q: 'Can we send summaries to private channels?', a: 'Yes. Simply invite @Fathom to any private Slack channel and select it in your routing rules.' },
      { q: 'Are meeting transcripts exposed to unauthorized Slack members?', a: 'Summaries respect your Fathom visibility settings. You can restrict broadcasts to executive channels only.' },
    ],
    seo: {
      title: 'Slack Integration — Instant Meeting Digests | Fathom',
      description: 'Broadcast summary highlights and action items into dedicated Slack channels as soon as meetings finish.',
    },
  },

  {
    slug: 'notion',
    name: 'Notion',
    category: 'Productivity',
    planRequirement: 'Team',
    monogram: 'NO',
    monogramBg: '#000000',
    tagline: 'Centralize meeting notes, databases, and transcripts in Notion.',
    overview:
      'Transform conversational knowledge into a permanent, searchable company wiki. Fathom connects with Notion to automatically write structured meeting pages into your team databases. Each Notion page includes the meeting title, date, attendees, high-level summary, action item checkboxes, and the full transcript with clickable receipts. Build unified customer hubs, sprint logs, and research archives with zero manual copy-pasting.',
    keyFeatures: [
      'Automatic page creation within designated Notion databases with rich schema properties',
      'Nested toggle blocks containing full verbatim transcripts and speaker identification',
      'Interactive action item blocks that plug into your existing Notion project boards',
      'Custom property mapping for attendees, client domain, and meeting tags',
      'Real-time sync within 60 seconds of call completion',
    ],
    setupSteps: [
      { step: 1, title: 'Select Notion Workspace', detail: 'Authenticate your Notion account and grant access to your target team workspace.' },
      { step: 2, title: 'Pick Meeting Database', detail: 'Choose an existing Notion database or let Fathom create a pre-configured template database.' },
      { step: 3, title: 'Customize Layout Properties', detail: 'Map summary headings, action checklists, and full transcripts to your preferred Notion blocks.' },
    ],
    samplePayload: {
      parent: { database_id: 'notion_db_89104812' },
      properties: {
        Name: { title: [{ text: { content: 'Q3 Product Roadmap Review' } }] },
        Date: { date: { start: '2026-09-24T14:00:00Z' } },
        Attendees: { multi_select: [{ name: 'Alex' }, { name: 'Priya' }, { name: 'Marcus' }] },
      },
      children: [{ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'Decisions Reached' } }] } }],
    },
    permissions: ['Read & Write designated Notion pages and databases'],
    faq: [
      { q: 'Can Fathom update existing Notion pages?', a: 'Fathom can append notes to recurring 1:1 or project hub pages, or create a fresh row for every call.' },
      { q: 'Does Notion search index Fathom transcripts?', a: 'Yes. Once synced, Notions native search indexes the entire verbatim transcript and summary.' },
    ],
    seo: {
      title: 'Notion Integration — Centralize Meeting Knowledge | Fathom',
      description: 'Send structured meeting databases, action checklists, and transcripts into Notion team workspaces.',
    },
  },

  {
    slug: 'asana',
    name: 'Asana',
    category: 'Project Management',
    planRequirement: 'Team',
    monogram: 'AS',
    monogramBg: '#F06A6A',
    tagline: 'Turn verbal commitments into assigned Asana project tasks with timestamps.',
    overview:
      'Never lose track of a commitment made in a meeting again. Fathom listens to conversation dialogue, identifies actionable tasks assigned to specific individuals, and creates formatted Asana tasks directly in your projects. Each task includes the assignees name, context, due date if mentioned, and a direct clickable audio receipt link to the exact moment in the recording where the commitment was made.',
    keyFeatures: [
      'Intelligent detection of verbal commitments (e.g. "I will send that spec by Thursday")',
      'Automatic task assignment matching spoken names to Asana workspace members',
      'Due date parsing from conversational context (e.g. "next Tuesday", "end of week")',
      'Clickable timecode receipt embedded in the Asana task description for quick verification',
      'Configurable project routing based on meeting type or attendee department',
    ],
    setupSteps: [
      { step: 1, title: 'Authenticate Asana', detail: 'Connect your Asana organization account with OAuth permissions.' },
      { step: 2, title: 'Map Team Projects', detail: 'Assign default Asana projects for engineering, sales, and design meetings.' },
      { step: 3, title: 'Review Extracted Tasks', detail: 'Tasks are synced automatically or held for 1-click confirmation in Fathom recap.' },
    ],
    samplePayload: {
      data: {
        workspace: 'asana_ws_104921',
        projects: ['asana_proj_849120'],
        name: 'Deliver custom SOC2 compliance package and DPA (Assigned: Alex)',
        notes: 'Spoken commitment from Acme Corp call. Click to verify context: https://demo.fathom.ai/meetings/mtg-q3-roadmap?t=2680',
        due_on: '2026-09-28',
      },
    },
    permissions: ['Read & Write Tasks in selected projects', 'Access User Workspace Directory'],
    faq: [
      { q: 'What happens if a spoken name is ambiguous?', a: 'Fathom matches attendees on the calendar invite first; if ambiguous, it assigns to the meeting organizer.' },
    ],
    seo: {
      title: 'Asana Integration — Action Items to Tasks | Fathom',
      description: 'Turn verbal commitments from meetings directly into assigned Asana project tasks with timestamps.',
    },
  },

  {
    slug: 'zapier',
    name: 'Zapier',
    category: 'Workflow Automation',
    planRequirement: 'Free',
    monogram: 'ZP',
    monogramBg: '#FF4A00',
    tagline: 'Connect Fathom to 5,000+ business applications with automated triggers.',
    overview:
      'Build custom, no-code automations triggered by your meeting events. Fathoms Zapier integration exposes instantaneous triggers whenever a meeting finishes processing, a highlight is tagged, or an action item is created. Connect your meeting intelligence to Airtable, ClickUp, Linear, Google Sheets, Pipedrive, Discord, and thousands of other tools without writing a single line of backend code.',
    keyFeatures: [
      'Triggers: Meeting Completed, Highlight Pinned, Action Item Created, Ask AI Query Answered',
      'Comprehensive payload delivery including transcript, summary, timecodes, and attendee emails',
      'Filter Zaps by internal vs external meetings, duration, or meeting tags',
      'Actions: Search meeting knowledge base, trigger AI summary regeneration',
      'High-throughput webhook delivery with automated retry handling',
    ],
    setupSteps: [
      { step: 1, title: 'Accept Zapier Invite', detail: 'Add the Fathom app in your Zapier account dashboard.' },
      { step: 2, title: 'Build Your Trigger', detail: 'Choose "New Meeting Summary Created" as your trigger event.' },
      { step: 3, title: 'Map Output Fields', detail: 'Map summary bullets, attendee emails, and audio receipt links to your downstream app.' },
    ],
    samplePayload: {
      event: 'meeting.completed',
      id: 'mtg-q3-roadmap',
      title: 'Q3 Product Roadmap Review',
      duration_seconds: 3480,
      attendee_count: 8,
      action_items_count: 4,
      summary_text: 'Key decisions: Billing migration shifted to Oct 12. Approved 4-lane mobile timeline.',
      receipts_url: 'https://demo.fathom.ai/meetings/mtg-q3-roadmap',
    },
    permissions: ['Webhook event subscription', 'Read meeting summaries and metadata'],
    faq: [
      { q: 'Is the Zapier integration included on the Free plan?', a: 'Yes. Free users can connect personal Zaps for individual meeting workflows.' },
    ],
    seo: {
      title: 'Zapier Integration — Connect 5,000+ Apps | Fathom',
      description: 'Trigger automated workflows whenever a meeting finishes, a highlight is pinned, or action items are created.',
    },
  },

  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    category: 'Content Generation',
    planRequirement: 'Free',
    monogram: 'CG',
    monogramBg: '#10A37F',
    tagline: 'Prompt ChatGPT with full meeting transcripts, audio receipts, and structured chapters.',
    overview:
      'Seamlessly export meeting transcripts, chapter breakdowns, and speaker lanes directly into ChatGPT or OpenAI GPTs. Use custom prompts to draft executive press releases, write detailed engineering user stories, or analyze conversation tone and rhetorical structure with your favorite models.',
    keyFeatures: [
      'One-click "Prompt with Meeting" button formatting speaker dialogue cleanly for LLMs',
      'Token-efficient formatting preserving speaker initials and timecode references',
      'Direct integration with OpenAI Custom GPTs for organization-specific research',
      'Export options for Markdown, JSON, and structured XML',
    ],
    setupSteps: [
      { step: 1, title: 'Enable AI Export', detail: 'Turn on ChatGPT Export in Fathom Preferences.' },
      { step: 2, title: 'Select Prompt Preset', detail: 'Choose from pre-built prompts or create custom synthesis instructions.' },
      { step: 3, title: 'Launch in ChatGPT', detail: 'Click to open ChatGPT with the optimized meeting context pre-filled.' },
    ],
    samplePayload: {
      prompt_template: 'Analyze the following meeting transcript and identify 3 potential risks to the proposed timeline.',
      token_count: 8420,
      speakers: ['Alex', 'Priya', 'Marcus'],
    },
    permissions: ['Client-side clipboard export and optional OpenAI API key connector'],
    faq: [
      { q: 'Is my meeting data used to train OpenAI public models?', a: 'No. Fathom enterprise contracts ensure zero model training on customer meeting data.' },
    ],
    seo: {
      title: 'ChatGPT Meeting Intelligence Integration | Fathom',
      description: 'Export structured meeting transcripts and chapters into ChatGPT for advanced prompting and drafting.',
    },
  },

  {
    slug: 'claude',
    name: 'Claude',
    category: 'Content Generation',
    planRequirement: 'Free',
    monogram: 'CL',
    monogramBg: '#D97706',
    tagline: 'Leverage Anthropic Claude for massive 200k-token meeting analysis and synthesis.',
    overview:
      'Take advantage of Claudes industry-leading context window to synthesize hours of customer calls, multi-day strategy offsites, or comprehensive quarterly business reviews in a single prompt. Fathom formats speaker dialogue with semantic markers and audio receipts, making deep analysis effortless.',
    keyFeatures: [
      '200k-token optimized context formatting for multi-meeting cross-analysis',
      'Artifact generation: Turn meeting decisions directly into clean diagrams and specs',
      'Deep reasoning analysis of negotiation tactics and customer objections',
      'Strict adherence to factual context without hallucination',
    ],
    setupSteps: [
      { step: 1, title: 'Enable Claude Export', detail: 'Activate Anthropic Claude integration in Fathom Settings.' },
      { step: 2, title: 'Choose Analysis Scope', detail: 'Select a single 60-minute call or bundle an entire multi-call project.' },
      { step: 3, title: 'Synthesize in Claude', detail: 'Export clean XML-formatted conversation blocks into Claude Projects.' },
    ],
    samplePayload: {
      context_format: 'xml',
      total_segments: 142,
      model_target: 'claude-3-5-sonnet',
    },
    permissions: ['Export formatted transcript and metadata'],
    faq: [{ q: 'Can I connect Fathom directly to Claude via MCP?', a: 'Yes! Fathom provides a native Model Context Protocol (MCP) server for Claude Desktop.' }],
    seo: {
      title: 'Anthropic Claude Meeting Intelligence Integration | Fathom',
      description: 'Analyze multi-hour meetings and strategy offsites with Claudes 200k token context window.',
    },
  },

  {
    slug: 'google-meet',
    name: 'Google Meet',
    category: 'Video Conferencing',
    planRequirement: 'Free',
    monogram: 'GM',
    monogramBg: '#00897B',
    tagline: 'Record Google Meet calls with zero bot avatar or join with standard capture.',
    overview:
      'Fathom integrates seamlessly with Google Calendar and Google Meet to capture every meeting automatically. Choose between our lightweight bot that joins your meeting room or our revolutionary bot-free mode that captures system audio locally without any external avatar in the call.',
    keyFeatures: [
      'Bot and Bot-Free recording modes for complete discretion',
      'Automatic Google Calendar sync with smart internal vs external filters',
      'Native Google Workspace Single Sign-On (SSO)',
      'Immediate recap email delivered to your Gmail inbox within 60 seconds',
    ],
    setupSteps: [
      { step: 1, title: 'Connect Google Calendar', detail: 'Sign in with your Google account and grant calendar read permissions.' },
      { step: 2, title: 'Choose Recording Mode', detail: 'Select Bot-Free local capture or automated Bot join.' },
      { step: 3, title: 'Start Meeting', detail: 'Launch Google Meet as normal — Fathom handles recording automatically.' },
    ],
    samplePayload: {
      service: 'google_meet',
      calendar_event_id: 'gcal_894109284102',
      recording_mode: 'bot_free',
      status: 'active',
    },
    permissions: ['Read Google Calendar events', 'Read user email profile'],
    faq: [{ q: 'Does bot-free mode require installing software?', a: 'Bot-free mode uses our lightweight desktop client to capture audio directly from your audio device.' }],
    seo: {
      title: 'Google Meet Recording & AI Notetaker | Fathom',
      description: 'Capture Google Meet calls with zero bot avatar or automatic calendar joining.',
    },
  },

  {
    slug: 'zoom',
    name: 'Zoom',
    category: 'Video Conferencing',
    planRequirement: 'Free',
    monogram: 'ZM',
    monogramBg: '#2D8CFF',
    tagline: 'High-fidelity Zoom meeting capture, live transcription, and cloud sync.',
    overview:
      'The gold standard for Zoom meeting intelligence. Fathom joins scheduled Zoom meetings or ad-hoc calls, capturing pristine multi-channel audio for accurate speaker diarization. Access your live notes side-by-side or review the interactive Score after the call.',
    keyFeatures: [
      'Pristine multi-speaker separation with sub-50ms diarization',
      'Live in-meeting scratchpad and 1-click highlight flagging hotkey (H)',
      'Compatible with Zoom desktop client, web client, and Zoom Rooms',
      'Instant post-call catch-up link shared with all authorized attendees',
    ],
    setupSteps: [
      { step: 1, title: 'Connect Zoom Account', detail: 'Authorize Fathom through the Zoom App Marketplace.' },
      { step: 2, title: 'Set Auto-Join Rules', detail: 'Specify whether Fathom should record all calls or only external client meetings.' },
      { step: 3, title: 'Run First Call', detail: 'Start any Zoom meeting and observe the Fathom indicator.' },
    ],
    samplePayload: {
      service: 'zoom_video',
      meeting_id: '8491029412',
      recording_status: 'completed',
      audio_quality: 'studio_pcm',
    },
    permissions: ['Zoom Marketplace App permissions', 'Access user meeting list'],
    faq: [{ q: 'Do participants see a recording disclosure?', a: 'Yes. Zoom displays standard recording consent compliance prompts in accordance with regional regulations.' }],
    seo: {
      title: 'Zoom AI Meeting Assistant & Notetaker | Fathom',
      description: 'Capture Zoom video and audio with live transcription, instant summaries, and speaker timeline.',
    },
  },

  {
    slug: 'microsoft-teams',
    name: 'Microsoft Teams',
    category: 'Video Conferencing',
    planRequirement: 'Free',
    monogram: 'MS',
    monogramBg: '#6264A7',
    tagline: 'Enterprise-grade recording and notes for Microsoft Teams meetings.',
    overview:
      'Bring clarity to your Microsoft 365 enterprise environment. Fathom seamlessly integrates with Microsoft Teams and Outlook Calendar to record calls, transcribe multi-department discussions, and sync action items directly into Microsoft To Do and Planner.',
    keyFeatures: [
      'Seamless Microsoft 365 & Outlook calendar synchronization',
      'Support for large enterprise Teams meetings with up to 50 participants',
      'Azure Active Directory (AD) enterprise SSO support',
      'Automated summary sync into Teams team channels',
    ],
    setupSteps: [
      { step: 1, title: 'Connect Microsoft 365', detail: 'Sign in with your work Microsoft account.' },
      { step: 2, title: 'Authorize Calendar', detail: 'Grant read access to your Outlook meeting schedule.' },
      { step: 3, title: 'Join Teams Call', detail: 'Fathom records your Teams session and prepares receipt-backed notes.' },
    ],
    samplePayload: {
      service: 'ms_teams',
      tenant_id: 'azure_tenant_491029',
      meeting_subject: 'Enterprise Architecture Sync',
    },
    permissions: ['Read Microsoft Outlook calendar', 'Sign in and read user profile'],
    faq: [{ q: 'Can IT administrators deploy Fathom tenant-wide?', a: 'Yes. Azure AD tenant-wide deployment is available on Enterprise plans.' }],
    seo: {
      title: 'Microsoft Teams AI Notetaker & Summary | Fathom',
      description: 'Record Microsoft Teams calls with speaker separation and enterprise compliance.',
    },
  },

  {
    slug: 'make',
    name: 'Make (Integromat)',
    category: 'Workflow Automation',
    planRequirement: 'Team',
    monogram: 'MK',
    monogramBg: '#6E3FF3',
    tagline: 'Visual automation scenarios powered by Fathom meeting webhooks.',
    overview:
      'Design complex multi-step automated workflows with Makes visual builder. Route meeting summaries through conditional filters, trigger email updates, create tickets in Jira, and update custom databases with full webhook payloads and timecode receipts.',
    keyFeatures: [
      'Visual flow builder with instant webhook trigger support',
      'Dynamic JSON payload parsing for meeting summaries, chapters, and receipts',
      'Multi-branch scenarios based on meeting attendee domain or tags',
      'Zero-code error handling and automated scenario execution logs',
    ],
    setupSteps: [
      { step: 1, title: 'Create Scenario in Make', detail: 'Add the Fathom Custom Webhook module as the scenario trigger.' },
      { step: 2, title: 'Paste Webhook URL', detail: 'Copy your unique Make webhook endpoint into Fathom Developer Settings.' },
      { step: 3, title: 'Connect Actions', detail: 'Pipe parsed meeting data to Google Drive, Airtable, or CRM tools.' },
    ],
    samplePayload: {
      trigger: 'fathom.meeting.ready',
      duration: 3480,
      attendees: ['Alex', 'Priya'],
      summary_sections_count: 3,
    },
    permissions: ['Webhook POST delivery'],
    faq: [{ q: 'Does Make support instant execution?', a: 'Yes. Fathom webhooks trigger Make scenarios instantaneously upon meeting processing completion.' }],
    seo: {
      title: 'Make.com Workflow Automation Integration | Fathom',
      description: 'Connect Fathom to thousands of apps using visual drag-and-drop Make scenarios.',
    },
  },

  {
    slug: 'glean',
    name: 'Glean',
    category: 'Collaboration',
    planRequirement: 'Enterprise',
    monogram: 'GL',
    monogramBg: '#1A73E8',
    tagline: 'Index company meeting conversations into enterprise search.',
    overview:
      'Empower your workforce with unified knowledge search. Fathoms Glean integration continuously feeds verified meeting transcripts, speaker labels, and executive summaries into Glean, enabling employees to search across company conversations with exact timecode receipts.',
    keyFeatures: [
      'Deep enterprise search indexing across all company recorded meetings',
      'Role-based security enforcement mirroring Fathom workspace permissions',
      'Direct playback jump to exact spoken answers from Glean search results',
      'Continuous real-time ingestion via enterprise webhooks',
    ],
    setupSteps: [
      { step: 1, title: 'Configure Glean Connector', detail: 'Add the Fathom Content Connector in your Glean Admin console.' },
      { step: 2, title: 'Provide API Credentials', detail: 'Generate an Enterprise API token in Fathom and verify handshake.' },
      { step: 3, title: 'Sync Historical Archives', detail: 'Trigger historical indexation of past meeting transcripts.' },
    ],
    samplePayload: {
      datasource: 'fathom_meetings',
      document_type: 'meeting_transcript',
      indexed_segments: 142,
      security_acl: ['group:all_engineering', 'user:alex@company.com'],
    },
    permissions: ['Enterprise API Read Access', 'Access historical archives and metadata'],
    faq: [{ q: 'Are private 1:1 meetings excluded from Glean search?', a: 'Yes. Permissions match Fathom privacy rules strictly — private meetings are never surfaced to unauthorized users.' }],
    seo: {
      title: 'Glean Enterprise Search Integration | Fathom',
      description: 'Index all meeting transcripts and summaries into Glean enterprise search with audio receipts.',
    },
  },

  {
    slug: 'getaccept',
    name: 'GetAccept',
    category: 'Sales',
    planRequirement: 'Team',
    monogram: 'GA',
    monogramBg: '#E94E77',
    tagline: 'Embed customer call soundbites and summaries directly into sales proposals.',
    overview:
      'Accelerate deal signoff by reminding buyers of their own stated pain points. With GetAccept and Fathom, sales reps can insert video soundbite clips and agreed action item recaps directly into digital sales proposals and contracts.',
    keyFeatures: [
      '1-click insertion of customer video clips into GetAccept digital sales rooms',
      'Automated recap inclusion in proposal executive summaries',
      'Buyer engagement tracking when clients rewatch meeting soundbites',
    ],
    setupSteps: [
      { step: 1, title: 'Connect GetAccept', detail: 'Link your GetAccept account in Fathom Integrations.' },
      { step: 2, title: 'Select Proposal Template', detail: 'Choose where call clips and summaries appear in proposal rooms.' },
      { step: 3, title: 'Send to Prospect', detail: 'Deliver proposals backed by the buyers own spoken words.' },
    ],
    samplePayload: {
      proposal_id: 'ga_prop_94812',
      embedded_clip: 'https://demo.fathom.ai/s/demo-share-token?t=420',
      recipient: 'Marcus Vance',
    },
    permissions: ['Create and update sales room collateral'],
    faq: [{ q: 'Can prospects watch clips without logging in?', a: 'Yes. Shared clips play seamlessly in any browser without requiring an account.' }],
    seo: {
      title: 'GetAccept Digital Sales Room Integration | Fathom',
      description: 'Embed spoken customer quotes and recap clips directly into sales contracts and proposals.',
    },
  },

  {
    slug: 'twine',
    name: 'Twine',
    category: 'Collaboration',
    planRequirement: 'Team',
    monogram: 'TW',
    monogramBg: '#8B5CF6',
    tagline: 'Automate internal intranet updates and team announcements from leadership calls.',
    overview:
      'Keep your company intranet vibrant and informative. Fathoms Twine integration summarizes all-hands meetings, town halls, and leadership offsites into engaging company news posts with key takeaways and video highlights.',
    keyFeatures: [
      'Automated company news drafting from all-hands transcripts',
      'Highlight clip curation for employees who missed the live town hall',
      'Interactive comment threads linked back to timecode receipts',
    ],
    setupSteps: [
      { step: 1, title: 'Link Twine Intranet', detail: 'Connect your corporate Twine portal with admin approval.' },
      { step: 2, title: 'Designate All-Hands Tag', detail: 'Tag meetings as "All-Hands" to trigger automatic post drafting.' },
      { step: 3, title: 'Publish Update', detail: 'Review draft and publish to the company feed with one click.' },
    ],
    samplePayload: {
      post_type: 'company_announcement',
      title: 'Q3 All-Hands Recap & Product Direction',
      video_reel_url: 'https://demo.fathom.ai/s/demo-share-token',
    },
    permissions: ['Draft and publish intranet articles'],
    faq: [{ q: 'Can we edit the post before it goes live?', a: 'Yes. Posts are created in draft mode for internal comms review.' }],
    seo: {
      title: 'Twine Intranet & Internal Comms Integration | Fathom',
      description: 'Turn all-hands calls into engaging intranet articles with video highlights and receipts.',
    },
  },

  {
    slug: 'dust',
    name: 'Dust',
    category: 'Content Generation',
    planRequirement: 'Team',
    monogram: 'DU',
    monogramBg: '#3B82F6',
    tagline: 'Connect Fathom meeting knowledge directly into customized Dust AI assistants.',
    overview:
      'Supercharge your internal AI assistants with live conversational ground truth. Connect Fathom to Dust to let custom company AI bots answer questions about recent customer calls, product decisions, and operational roadblocks with precise citations.',
    keyFeatures: [
      'Live semantic data source connection between Fathom and Dust assistants',
      'Automatic citation generation linking answers directly to audio timestamps',
      'Multi-source synthesis combining meetings with Notion, Slack, and GitHub',
    ],
    setupSteps: [
      { step: 1, title: 'Add Fathom Connection in Dust', detail: 'Select Fathom as a custom data source in your Dust workspace.' },
      { step: 2, title: 'Enter API Token', detail: 'Provide your Fathom REST API key to authorize data synchronization.' },
      { step: 3, title: 'Assign to Assistants', detail: 'Select which Dust agents have access to your meeting knowledge base.' },
    ],
    samplePayload: {
      assistant: 'DealIntelBot',
      query: 'What pricing pushback did we get this week?',
      cites: ['mtg-q3-roadmap: timecode 420s (Priya)'],
    },
    permissions: ['API Read Access to transcripts and summaries'],
    faq: [{ q: 'Does Dust respect meeting privacy boundaries?', a: 'Yes. Only authorized members of the Dust workspace can query meeting data.' }],
    seo: {
      title: 'Dust AI Assistants Integration | Fathom',
      description: 'Connect meeting knowledge directly to custom Dust AI agents with cited timecodes.',
    },
  },

  {
    slug: 'composio',
    name: 'Composio',
    category: 'Workflow Automation',
    planRequirement: 'Team',
    monogram: 'CO',
    monogramBg: '#10B981',
    tagline: 'Plug Fathom meetings into autonomous AI agent toolkits and execution pipelines.',
    overview:
      'Enable AI agents to take action based on spoken meeting commitments. Composios integration provides agent frameworks (LangChain, AutoGen, CrewAI) with native toolkits to inspect meeting summaries, retrieve verbatim dialogue, and trigger follow-up actions across 100+ tools.',
    keyFeatures: [
      'Standardized tool bindings for LangChain, LlamaIndex, and OpenAI Assistants',
      'High-speed segment search and timecode retrieval for autonomous agents',
      'OAuth token management and secure credential handling',
    ],
    setupSteps: [
      { step: 1, title: 'Install Composio SDK', detail: 'npm install @composio/fathom or pip install composio-fathom.' },
      { step: 2, title: 'Authenticate Account', detail: 'Authenticate your Fathom API key through the Composio CLI.' },
      { step: 3, title: 'Bind Agent Tools', detail: 'Add FathomToolSet to your agent workflow.' },
    ],
    samplePayload: {
      tool: 'fathom_get_meeting_summary',
      meeting_id: 'mtg-q3-roadmap',
      status: 'success',
    },
    permissions: ['Agent toolkit invocation permissions'],
    faq: [{ q: 'Can agents write new summaries back into Fathom?', a: 'Yes, authorized agents can regenerate summaries using custom prompts.' }],
    seo: {
      title: 'Composio AI Agent Toolkit Integration | Fathom',
      description: 'Equip autonomous LLM agents with native Fathom meeting inspection and retrieval tools.',
    },
  },

  {
    slug: 'pickle',
    name: 'Pickle',
    category: 'Sales',
    planRequirement: 'Team',
    monogram: 'PI',
    monogramBg: '#059669',
    tagline: 'Advanced sales rep coaching and objection handling analysis.',
    overview:
      'Turn every sales call into a high-impact coaching opportunity. Pickle ingests Fathom transcripts to analyze rep talk-time ratios, question frequency, and objection handling techniques, delivering tailored feedback to improve close rates.',
    keyFeatures: [
      'Automated talk-to-listen ratio calculation for every sales representative',
      'Objection detection and scoring based on proven consultative frameworks',
      'Personalized weekly coaching cards sent to reps and sales managers',
    ],
    setupSteps: [
      { step: 1, title: 'Authorize Pickle App', detail: 'Connect Pickle to your Fathom sales workspace.' },
      { step: 2, title: 'Select Sales Roster', detail: 'Assign sales representatives to coaching cohorts.' },
      { step: 3, title: 'View Analytics', detail: 'Access coaching scorecards after every client call.' },
    ],
    samplePayload: {
      rep: 'Alex Morgan',
      talk_ratio: '42%',
      longest_monologue: '2m 14s',
      objections_handled: 3,
    },
    permissions: ['Read sales meeting transcripts and participant metrics'],
    faq: [{ q: 'Can reps see their own feedback privately?', a: 'Yes. Pickle provides private rep scorecards to encourage self-directed coaching.' }],
    seo: {
      title: 'Pickle Sales Coaching Integration | Fathom',
      description: 'Analyze talk-to-listen ratios and objection handling from Fathom meeting recordings.',
    },
  },

  {
    slug: 'slashy',
    name: 'Slashy',
    category: 'Productivity',
    planRequirement: 'Free',
    monogram: 'SL',
    monogramBg: '#F59E0B',
    tagline: 'Quickly insert meeting notes, receipts, and clips using slash commands in any editor.',
    overview:
      'Supercharge your everyday writing tools. Slashy lets you type /fathom in Notion, Google Docs, or Slack to instantly pull up your latest meeting summaries, search past conversations, and paste clickable audio receipts directly into your cursor position.',
    keyFeatures: [
      'Universal slash command widget working across major web text editors',
      'Instant search of recent meeting action items and takeaways',
      'One-tap formatting of rich receipt chips and timecodes',
    ],
    setupSteps: [
      { step: 1, title: 'Install Slashy Extension', detail: 'Add the Slashy browser extension to Chrome or Edge.' },
      { step: 2, title: 'Authenticate Fathom', detail: 'Link your Fathom account with one click.' },
      { step: 3, title: 'Type /fathom Anywhere', detail: 'Use the command in Notion, Google Docs, or Gmail.' },
    ],
    samplePayload: {
      command: '/fathom recap latest',
      inserted_text: '• Launch usage-based tier at $19/seat (12:41 P)',
    },
    permissions: ['Browser extension text replacement and API read access'],
    faq: [{ q: 'Does Slashy store my text entries?', a: 'No. Slashy runs locally in your browser and communicates directly with Fathom APIs.' }],
    seo: {
      title: 'Slashy Quick Insert Integration | Fathom',
      description: 'Insert meeting notes and audio receipts anywhere with universal slash commands.',
    },
  },

  {
    slug: 'maton',
    name: 'Maton',
    category: 'Sales',
    planRequirement: 'Team',
    monogram: 'MA',
    monogramBg: '#DC2626',
    tagline: 'Automate sales follow-up email generation with personalized receipts.',
    overview:
      'Draft winning post-meeting follow-up emails in seconds. Maton analyzes Fathom call transcripts, extracts the prospects explicit pain points and agreed next steps, and composes a tailored follow-up email complete with timestamped receipts ready to send from your inbox.',
    keyFeatures: [
      'AI draft generation matching your personal communication style',
      'Inclusion of clickable audio receipt links so prospects can re-verify commitments',
      'Direct integration with Gmail, Outlook, and sales engagement platforms',
    ],
    setupSteps: [
      { step: 1, title: 'Connect Email Client', detail: 'Authenticate your work Gmail or Outlook account.' },
      { step: 2, title: 'Link Fathom', detail: 'Authorize Maton to read completed call recaps.' },
      { step: 3, title: 'Review Follow-up Draft', detail: 'Receive email draft notification right as your meeting ends.' },
    ],
    samplePayload: {
      recipient: 'marcus@acme.com',
      subject: 'Great speaking today — Architecture Review Next Steps',
      body: 'Hi Marcus, thank you for walking through your team needs today. As discussed, I am preparing our SOC2 packet...',
    },
    permissions: ['Read meeting summaries and create email drafts'],
    faq: [{ q: 'Does Maton send emails automatically without my review?', a: 'No. Maton creates drafts in your email client for your final review and approval.' }],
    seo: {
      title: 'Maton Sales Follow-Up Automation | Fathom',
      description: 'Generate hyper-personalized sales follow-up emails with audio receipts in seconds.',
    },
  },

  {
    slug: 'superhuman-go',
    name: 'Superhuman Go',
    category: 'Collaboration',
    planRequirement: 'Team',
    monogram: 'SH',
    monogramBg: '#4F46E5',
    tagline: 'Blazing fast meeting recaps and action item processing inside Superhuman.',
    overview:
      'Experience lightning-fast meeting follow-ups directly in the fastest email client in the world. Superhuman Go integrates with Fathom to display meeting summaries and action items in your email sidebar, letting you execute follow-ups with keyboard shortcuts.',
    keyFeatures: [
      'Sidebar display of meeting summaries and action items alongside email threads',
      'Keyboard shortcuts to convert verbal meeting commitments into sent emails',
      'Instant playback of audio receipts right inside the Superhuman preview pane',
    ],
    setupSteps: [
      { step: 1, title: 'Enable Fathom in Superhuman', detail: 'Toggle Fathom integration under Superhuman Settings > Integrations.' },
      { step: 2, title: 'Authenticate Account', detail: 'Sign in with your Fathom account credentials.' },
      { step: 3, title: 'Press ⌘K to Action', detail: 'Use Superhuman command palette to review latest call notes.' },
    ],
    samplePayload: {
      integration: 'superhuman_sidebar',
      meeting_title: 'Acme Corp Architecture Review',
      action_items: ['Send SOC2 package to Marcus'],
    },
    permissions: ['Superhuman add-on API and meeting read access'],
    faq: [{ q: 'Is this available on Superhuman mobile?', a: 'Yes. Superhuman Go sidebar features are available on desktop and iOS.' }],
    seo: {
      title: 'Superhuman Go Meeting Intelligence | Fathom',
      description: 'Process meeting recaps and action items with keyboard shortcuts inside Superhuman.',
    },
  },
];
