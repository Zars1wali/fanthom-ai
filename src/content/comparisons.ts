import type { ComparisonItem } from './types';

export const COMPARISONS_LIST: ComparisonItem[] = [
  {
    slug: 'fireflies',
    competitorName: 'Fireflies.ai',
    asOfDate: 'September 2026',
    tagline: 'Comparing verified timecode receipts, lane-per-speaker timelines, and CRM automation.',
    summary:
      'While Fireflies offers automated bot recording and broad language support, Fathom emphasizes conversational truth: every summary bullet, action item, and scorecard metric carries a clickable timecode receipt that jumps directly to the spoken moment. Fathoms unique 8-lane Score visualizes the entire conversation rhythm, and bot-free recording eliminates meeting room disruption.',
    keyTakeaway:
      'Choose Fathom if your team re-reads transcripts to verify AI claims and needs bulletproof CRM sync with audio receipts.',
    featureMatrix: [
      { category: 'Verification & Trust', feature: 'Clickable audio timecode receipts on every summary bullet', fathomValue: 'Standard on all plans', competitorValue: 'Manual timestamp lookup', isAdvantage: true },
      { category: 'Visualization', feature: 'The Score (lane-per-speaker multi-track timeline)', fathomValue: '8 dedicated speaker tracks with snapping seek', competitorValue: 'Linear text waveform', isAdvantage: true },
      { category: 'Capture Experience', feature: 'Bot-free local desktop capture option', fathomValue: '✓ Included (No avatar in call)', competitorValue: 'Requires bot participant in call', isAdvantage: true },
      { category: 'CRM Sync', feature: 'Bi-directional Salesforce & HubSpot field extraction', fathomValue: '✓ Auto-populates standard & custom objects', competitorValue: 'Basic activity note logging', isAdvantage: true },
      { category: 'Audio Latency', feature: 'Playback audio clock loop', fathomValue: '60fps rAF audio clock with sub-10ms seek', competitorValue: 'Standard HTML5 audio player', isAdvantage: true },
      { category: 'Language Count', feature: 'Supported transcription languages', fathomValue: '40+ languages with auto-detection', competitorValue: '60+ languages', isAdvantage: false },
    ],
    migrationGuide: [
      { step: 1, title: 'Export Past Notes or Audio', detail: 'Export existing recording archives or MP4 files from your Fireflies dashboard.' },
      { step: 2, title: 'Connect Your Calendar to Fathom', detail: 'Sign in to Fathom with Google Workspace or Microsoft 365 in 30 seconds.' },
      { step: 3, title: 'Select Bot or Bot-Free Mode', detail: 'Choose your recording presence preference and start your next scheduled call.' },
    ],
    faq: [
      { q: 'Is this comparison verified?', a: 'Feature comparison is based on public documentation as of September 2026. Verify before publishing. All third-party marks belong to their respective owners.' },
      { q: 'Can I run both tools side-by-side during an evaluation?', a: 'Yes. You can test Fathom on specific calls without disconnecting other tools.' },
    ],
    seo: {
      title: 'Fathom vs Fireflies.ai — Honest Comparison (2026)',
      description: 'See how Fathom compares on receipt verification, speaker lanes, bot-free capture, and CRM accuracy.',
    },
  },

  {
    slug: 'granola',
    competitorName: 'Granola',
    asOfDate: 'September 2026',
    tagline: 'Scratchpad-first vs full multi-speaker playback, timeline score, and team sync.',
    summary:
      'Granola focuses on an intimate personal notepad where users type rough notes and an AI polishes them. Fathom, by contrast, delivers full multi-speaker conversation intelligence: verbatim transcription with speaker lanes, 60fps audio scrubbing, clickable receipts, and automated team-wide CRM distribution.',
    keyTakeaway:
      'Granola excels as a solo scratchpad; Fathom excels as a team-wide system of record with verified receipts and CRM automation.',
    featureMatrix: [
      { category: 'Audio & Playback', feature: 'Synchronized audio playback with scrubbing', fathomValue: 'Full audio playback with 0.75x - 2.0x & snapping seek', competitorValue: 'Limited or text-only focus', isAdvantage: true },
      { category: 'Speaker Separation', feature: 'Multi-speaker diarization and color lanes', fathomValue: 'Up to 8 distinct speaker lanes on The Score', competitorValue: 'Single scratchpad stream', isAdvantage: true },
      { category: 'Team Collaboration', feature: 'Team workspace sharing & shared clips', fathomValue: 'Team library, playlists, and shared rules', competitorValue: 'Primarily individual notepad', isAdvantage: true },
      { category: 'CRM Automation', feature: 'Automatic Salesforce & HubSpot sync', fathomValue: 'Native automated field mapping', competitorValue: 'Manual copy or basic export', isAdvantage: true },
      { category: 'Personal Scratchpad', feature: 'Live user typing during call', fathomValue: 'Live column with auto-timestamped scratchpad', competitorValue: 'Core notepad interface', isAdvantage: false },
    ],
    migrationGuide: [
      { step: 1, title: 'Sign up for Fathom Free', detail: 'Create your account and link your Google or Outlook calendar.' },
      { step: 2, title: 'Experience The Score', detail: 'Record your next meeting and observe the 8-lane speaker timeline.' },
      { step: 3, title: 'Try the Live Scratchpad', detail: 'Use Fathoms live scratchpad during calls for note-taking backed by exact audio.' },
    ],
    faq: [
      { q: 'Can I type my own notes while Fathom records?', a: 'Yes! Fathoms live simulation and live capture feature an integrated scratchpad that auto-timestamps your manual notes to the exact spoken audio.' },
    ],
    seo: {
      title: 'Fathom vs Granola — Meeting Intelligence Comparison',
      description: 'Evaluating notepad-first workflows versus full multi-speaker playback, receipts, and CRM automation.',
    },
  },

  {
    slug: 'gong',
    competitorName: 'Gong.io',
    asOfDate: 'September 2026',
    tagline: 'High-speed team capture & receipts vs heavyweight enterprise revenue intelligence.',
    summary:
      'Gong is an enterprise-wide revenue intelligence platform with complex setup, lengthy sales cycles, and steep per-seat pricing. Fathom provides a lightweight, instant-start meeting notetaker with transparent pricing, zero onboarding lag, and superior player ergonomics.',
    keyTakeaway:
      'Choose Gong if you need full enterprise revenue pipeline forecasting; choose Fathom if you want immediate, lovable meeting notes with receipts at a fraction of the cost.',
    featureMatrix: [
      { category: 'Time to Value', feature: 'Setup and deployment timeline', fathomValue: '< 60 seconds self-serve setup', competitorValue: 'Weeks of enterprise onboarding & config', isAdvantage: true },
      { category: 'Pricing Model', feature: 'Price transparency', fathomValue: 'Free tier + transparent $19/seat Team plan', competitorValue: 'High annual contract minimums + platform fees', isAdvantage: true },
      { category: 'Receipt Verification', feature: 'Clickable audio timecode receipts', fathomValue: 'Direct link to spoken second on every bullet', competitorValue: 'Call snippet playback', isAdvantage: true },
      { category: 'Revenue Forecasting', feature: 'Deal pipeline forecasting & math modeling', fathomValue: 'Deal view & call timeline', competitorValue: 'Deep proprietary revenue forecasting models', isAdvantage: false },
    ],
    migrationGuide: [
      { step: 1, title: 'Pilot with a Sales Pod', detail: 'Invite 3-5 Account Executives to test Fathom alongside existing tools.' },
      { step: 2, title: 'Connect CRM in 2 Clicks', detail: 'Authenticate Salesforce or HubSpot to evaluate automated deal logging.' },
      { step: 3, title: 'Compare Rep Feedback', detail: 'Gather feedback on player speed, receipt accuracy, and admin time saved.' },
    ],
    faq: [
      { q: 'Is Fathom suitable for enterprise sales teams?', a: 'Yes. Fathom includes SOC2 Type II compliance, Okta SSO, custom CRM mapping, and deal intelligence.' },
    ],
    seo: {
      title: 'Fathom vs Gong — Revenue Intelligence Comparison',
      description: 'High-speed team capture vs heavyweight enterprise revenue intelligence suite.',
    },
  },

  {
    slug: 'otter',
    competitorName: 'Otter.ai',
    asOfDate: 'September 2026',
    tagline: 'Comparing transcript precision, speaker timelines, and enterprise privacy.',
    summary:
      'Otter was an early pioneer in speech-to-text, but modern teams require more than a raw text transcript. Fathom delivers structured executive summaries, verified action item receipts, multi-speaker color timelines, and strict privacy guarantees with zero model training on customer calls.',
    keyTakeaway:
      'Fathom provides superior summary formatting, zero-friction sharing without recipient sign-up, and pristine speaker separation.',
    featureMatrix: [
      { category: 'Recipient Experience', feature: 'Public share view without requiring recipient login', fathomValue: 'Zero login required for recipients', competitorValue: 'Forces recipients to create an account', isAdvantage: true },
      { category: 'Data Privacy', feature: 'Customer audio used for public model training', fathomValue: 'Never trained on customer data', competitorValue: 'Subject to public AI training policies', isAdvantage: true },
      { category: 'Timeline Scrub', feature: 'Multi-track speaker visualization', fathomValue: 'The Score 8-track visual timeline', competitorValue: 'Generic text-based waveform', isAdvantage: true },
      { category: 'Audio Export', feature: 'Live audio recording quality', fathomValue: 'Lossless studio PCM streaming', competitorValue: 'Compressed speech stream', isAdvantage: true },
    ],
    migrationGuide: [
      { step: 1, title: 'Review Privacy Terms', detail: 'Confirm Fathoms zero-model-training policy for your enterprise.' },
      { step: 2, title: 'Connect Calendar', detail: 'Sync your Google or Outlook calendar to start automated recordings.' },
      { step: 3, title: 'Share Links Seamlessly', detail: 'Send meeting links to clients without forcing them to create an account.' },
    ],
    faq: [
      { q: 'Do external clients need a Fathom account to view shared meetings?', a: 'No! Shared meeting links open in any modern browser with full video playback and transcript search without any sign-up required.' },
    ],
    seo: {
      title: 'Fathom vs Otter.ai — Meeting Assistant Comparison',
      description: 'Comparison of transcript speed, speaker lane timelines, privacy standards, and team sharing models.',
    },
  },

  {
    slug: 'read-ai',
    competitorName: 'Read.ai',
    asOfDate: 'September 2026',
    tagline: 'Comparing participant experience, bot presence, and actionable summaries.',
    summary:
      'Read.ai focuses heavily on conversational metrics like sentiment scores and engagement ratings, which some meeting attendees find intrusive. Fathom prioritizes actionable outcomes: verbatim accuracy, timecode receipts, clean CRM synchronization, and optional bot-free capture.',
    keyTakeaway:
      'Fathom focuses on practical follow-through and honest audio verification rather than subjective engagement scoring.',
    featureMatrix: [
      { category: 'Capture Discretion', feature: 'Bot-free recording mode', fathomValue: '✓ Included (Local desktop capture)', competitorValue: 'Requires bot in every meeting', isAdvantage: true },
      { category: 'Verification', feature: 'Clickable receipts jumping to spoken second', fathomValue: '✓ On every summary bullet and action item', competitorValue: 'High-level metric overview', isAdvantage: true },
      { category: 'CRM Integration', feature: 'Direct Salesforce & HubSpot field writing', fathomValue: 'Full bi-directional sync', competitorValue: 'Email summaries and basic export', isAdvantage: true },
      { category: 'Subjective Metrics', feature: 'Participant sentiment & engagement scoring', fathomValue: 'Objective talk-time & speaker segments', competitorValue: 'Subjective sentiment and attention scores', isAdvantage: false },
    ],
    migrationGuide: [
      { step: 1, title: 'Toggle Bot-Free Capture', detail: 'Enable bot-free recording in Fathom settings to eliminate meeting avatar fatigue.' },
      { step: 2, title: 'Set Up Summary Templates', detail: 'Choose from 12 tailored templates suited to your team workflows.' },
    ],
    faq: [
      { q: 'Why does Fathom prefer objective data over sentiment scores?', a: 'Sentiment algorithms frequently misinterpret sarcasm, technical debates, or cultural speaking patterns. Fathom provides verbatim receipts so humans can verify actual meaning.' },
    ],
    seo: {
      title: 'Fathom vs Read.ai — Feature & Privacy Comparison',
      description: 'Compare participant experience, bot presence, executive summaries, and action item reliability.',
    },
  },

  {
    slug: 'zoom',
    competitorName: 'Zoom AI Companion',
    asOfDate: 'September 2026',
    tagline: 'Comparing dedicated meeting intelligence vs basic platform-bundled summaries.',
    summary:
      'While Zoom AI Companion is bundled into paid Zoom plans, it is locked strictly to Zoom. Teams that also use Google Meet or Microsoft Teams face fragmented records. Fathoms dedicated intelligence operates across all video platforms with unified CRM sync, custom templates, and clickable receipts.',
    keyTakeaway:
      'Fathom provides cross-platform consistency, timecode receipts, and advanced CRM automation across Zoom, Meet, and Teams.',
    featureMatrix: [
      { category: 'Platform Flexibility', feature: 'Cross-platform recording (Zoom, Meet, Teams)', fathomValue: '✓ Unified library across all platforms', competitorValue: 'Locked exclusively to Zoom meetings', isAdvantage: true },
      { category: 'Receipt Verification', feature: 'Clickable audio timecode receipts', fathomValue: '✓ Every bullet jumps to exact timestamp', competitorValue: 'Static text summary without audio link', isAdvantage: true },
      { category: 'CRM Automation', feature: 'Direct Salesforce & HubSpot integration', fathomValue: '✓ Native bi-directional sync', competitorValue: 'Requires complex custom webhook work', isAdvantage: true },
      { category: 'Cost', feature: 'Included with Zoom paid licenses', fathomValue: 'Free tier + $19/seat Team plan', competitorValue: 'Included in Zoom One Pro/Business bundles', isAdvantage: false },
    ],
    migrationGuide: [
      { step: 1, title: 'Connect Google / Outlook Calendar', detail: 'Fathom automatically detects whether upcoming meetings are on Zoom, Meet, or Teams.' },
      { step: 2, title: 'Enjoy One Unified Library', detail: 'All your conversations live in one searchable workspace regardless of meeting tool.' },
    ],
    faq: [
      { q: 'Why pay for Fathom if Zoom includes AI summaries?', a: 'Zoom summaries lack clickable receipts, cannot record external Google Meet calls, and do not auto-populate custom Salesforce or HubSpot fields.' },
    ],
    seo: {
      title: 'Fathom vs Zoom AI Companion — Dedicated Notetaking',
      description: 'Why multi-platform teams use Fathom across Zoom, Meet, and Teams with unified CRM workflows.',
    },
  },

  {
    slug: 'google-meet',
    competitorName: 'Google Meet Gemini Notes',
    asOfDate: 'September 2026',
    tagline: 'Comparing ecosystem-locked AI notes with cross-platform CRM sync and clickable receipts.',
    summary:
      'Google Meet Gemini Notes provides basic text summaries for Google Workspace users. However, it cannot record Zoom or Teams calls, lacks bi-directional CRM field mapping, and offers no audio timeline or receipt verification.',
    keyTakeaway:
      'Fathom is cross-platform, integrates with your revenue stack, and ensures every summary claim is backed by spoken proof.',
    featureMatrix: [
      { category: 'Ecosystem Independence', feature: 'Works on Zoom, Teams, and Google Meet', fathomValue: '✓ Supported across all platforms', competitorValue: 'Google Meet only', isAdvantage: true },
      { category: 'Spoken Proof', feature: 'Clickable audio receipts on every takeaway', fathomValue: '✓ Click to hear spoken context', competitorValue: 'Text document in Google Drive only', isAdvantage: true },
      { category: 'CRM Sync', feature: 'Salesforce & HubSpot automatic logging', fathomValue: '✓ Standard and custom objects', competitorValue: 'No native CRM integration', isAdvantage: true },
      { category: 'Google Docs Export', feature: 'Native Google Docs saving', fathomValue: '✓ Via Zapier or 1-click clipboard', competitorValue: 'Automatic Doc generation in Drive', isAdvantage: false },
    ],
    migrationGuide: [
      { step: 1, title: 'Install Fathom Desktop or Bot', detail: 'Configure your Google Calendar in Fathom.' },
      { step: 2, title: 'Retain Google Drive Workflows', detail: 'Push Fathom summaries into Google Docs automatically via Zapier if desired.' },
    ],
    faq: [
      { q: 'Does Fathom support Google Workspace SSO?', a: 'Yes. You can sign in with your corporate Google Workspace account.' },
    ],
    seo: {
      title: 'Fathom vs Google Meet Gemini Notes',
      description: 'Comparing ecosystem-locked AI notes with cross-platform CRM sync and clickable receipts.',
    },
  },

  {
    slug: 'built-in',
    competitorName: 'Built-in Conference Recording Tools',
    asOfDate: 'September 2026',
    tagline: 'Why native video recordings fall short on search, action accountability, and intelligence.',
    summary:
      'Native recording buttons in video conferencing tools simply create massive, unwieldy video files that nobody has time to rewatch. Fathom transforms hours of video into instant 60-second executive recaps, searchable transcripts, and actionable checklists backed by timecode receipts.',
    keyTakeaway:
      'Stop hoarding video files that nobody watches. Fathom turns spoken conversations into searchable, actionable knowledge.',
    featureMatrix: [
      { category: 'Time Efficiency', feature: 'Executive catch-up time', fathomValue: '60 seconds to review recaps and receipts', competitorValue: 'Must re-watch full 60-minute MP4 file', isAdvantage: true },
      { category: 'Searchability', feature: 'Cross-meeting keyword & Ask AI search', fathomValue: 'Instant semantic search across all calls', competitorValue: 'Video files stored in disparate folders', isAdvantage: true },
      { category: 'Accountability', feature: 'Action items extracted and assigned', fathomValue: 'Automatic task detection with due dates', competitorValue: 'Manual note-taking required', isAdvantage: true },
      { category: 'Storage Management', feature: 'Cloud hosting & instant playback', fathomValue: 'Included cloud streaming with sub-10ms seek', competitorValue: 'Consumes local disk space or cloud recording quotas', isAdvantage: true },
    ],
    migrationGuide: [
      { step: 1, title: 'Stop Clicking Record Manually', detail: 'Let Fathoms calendar integration handle joining and recording automatically.' },
      { step: 2, title: 'Share Highlights Instead of Files', detail: 'Send 30-second trimmed video clips instead of 500MB MP4 attachments.' },
    ],
    faq: [
      { q: 'Can I download the raw video or audio if needed?', a: 'Yes! Full resolution video and studio-quality audio stems can be exported anytime.' },
    ],
    seo: {
      title: 'Fathom vs Built-in Conference Recording Tools',
      description: 'A breakdown of why native video recordings fall short on search, action accountability, and intelligence.',
    },
  },
];
