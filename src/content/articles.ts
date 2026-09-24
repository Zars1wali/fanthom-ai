import type { LearnArticle } from './types';

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: 'meeting-intelligence-playbook',
    title: 'The Modern Meeting Intelligence Playbook: Architecture of Truth',
    date: 'September 2026',
    author: 'Elena Rostova',
    readingTimeMinutes: 6,
    category: 'Architecture & Strategy',
    excerpt:
      'A comprehensive guide to why conversational receipts, speaker cadence timelines, and verified timecodes are replacing vague AI summaries across high-performance organizations.',
    sections: [
      {
        heading: '1. The Fundamental Trust Crisis in Enterprise AI Summaries',
        body: [
          'Over the past three years, generative AI has become ubiquitous in business meetings. Millions of calls every day are transcribed, summarized, and piped into internal messaging channels. Yet beneath this surge in adoption lies a persistent, unspoken friction: the trust crisis.',
          'When an automated summarizer asserts that "the client agreed to expand budget by $20,000," what actually occurred? Did the prospect explicitly confirm that number, or did they casually mention a hypothetical ceiling before noting that the CFO would have to evaluate it next quarter? Because conventional AI notetakers present flat, unlinked text, skeptical executives and diligent account managers end up doing the very thing AI was supposed to eliminate: re-watching the recording or scanning thousands of words of raw transcript to verify the claim.',
          'Trust cannot be asserted with marketing adjectives; it must be engineered into the interface. This is why the foundational architectural thesis of modern meeting intelligence is that every single AI bullet, extracted action item, and qualification metric must carry an immutable, clickable timecode receipt.',
        ],
        callout: 'Rule of Truth: If an AI makes a claim about a meeting, it must provide a one-click link to the exact spoken second where that claim originated.',
      },
      {
        heading: '2. The Score: Replacing Monolithic Text with Spatial Cadence',
        body: [
          'Human conversations are multi-dimensional, rhythmic exchanges. When eight people gather for an hour-long roadmap review, the distribution of voice reveals organizational dynamics: Who dominated the debate? Who raised quiet objections? When did the discussion transition from problem definition to architecture consensus?',
          'Traditional audio waveforms fail to convey this nuance because they collapse all participants into an undifferentiated jagged line. By contrast, a multi-track speaker Score allocates dedicated visual lanes to each participant, color-coded and synchronized with the audio clock. At a single glance, an executive can assess whether a sales discovery call was a genuine discovery session (where the prospect talks 65% of the time) or an ineffective lecture (where the rep spoke for 45 minutes uninterrupted).',
          'Furthermore, spatial visualization transforms timeline navigation. Instead of scrubbing blindly through a monolithic progress bar, users jump between topic boundaries, highlight pins, and speaker transitions with snapping precision.',
        ],
      },
      {
        heading: '3. Bot-Free Discretion vs Avatar Fatigue',
        body: [
          'In the early days of AI transcription, the bot avatar was a necessary compromise. An automated participant joined Zoom or Google Meet, declared its presence, and recorded audio from the room. However, as meetings proliferated, attendees began experiencing severe bot fatigue. In many executive calls, half the participant grid consisted of silent AI avatars from different vendors, creating awkwardness and triggering infosec alarms.',
          'The modern tier of meeting intelligence resolves this by decoupling audio capture from video room presence. By capturing system audio locally on the workstation through high-fidelity system audio APIs, individuals can record and transcribe calls with complete discretion. There is no avatar in the call, no awkward waiting room delay, and no friction with clients whose compliance policies prohibit third-party meeting bots.',
        ],
      },
      {
        heading: '4. The Bi-Directional Knowledge Loop',
        body: [
          'A meeting recording that lives in an isolated silo is of limited value. The true ROI of conversational intelligence is realized when verified takeaways flow automatically into the tools where teams work.',
          'When an AE finishes a call, their Salesforce or HubSpot records should update within 60 seconds: next steps mapped, MEDDIC qualification fields populated, and clickable audio receipts embedded directly in the CRM activity feed. When an engineering roadmap debate concludes, agreed technical specs should land in Linear and Notion with zero manual copying. By connecting conversational ground truth directly to the corporate system of record, organizations eliminate administrative debt while maintaining absolute alignment.',
        ],
      },
    ],
    seo: {
      title: 'The Modern Meeting Intelligence Playbook (2026)',
      description: 'A comprehensive 800-word field guide to asynchronous recaps, speaker accountability, and timecode receipts.',
    },
  },

  {
    slug: 'sales-pipeline-hygiene',
    title: 'Automating Sales Pipeline Hygiene Without Rep Friction',
    date: 'September 2026',
    author: 'Marcus Vance',
    readingTimeMinutes: 5,
    category: 'Sales & RevOps',
    excerpt:
      'How revenue leaders use structured meeting extraction to keep CRM data 100% current, accelerate deal velocity, and eliminate hours of manual rep data entry.',
    sections: [
      {
        heading: 'The Chronic Dilemma of CRM Data Entry',
        body: [
          'Ask any VP of Sales about their biggest operational frustration, and the answer is almost always CRM hygiene. Sales reps are hired for their charisma, consultative problem-solving, and closing ability — not for administrative data entry. Consequently, CRM records are perpetually outdated: next steps are blank, competitor mentions go untracked, and close dates reflect optimism rather than buyer reality.',
          'RevOps teams traditionally combat this with draconian validation rules, demanding that reps fill out dozens of required fields before moving an Opportunity from Stage 2 to Stage 3. The predictable result is resentment, rushed data entry, and fabricated placeholder values like "Pending" or "Follow up next week" just to bypass the system.',
        ],
      },
      {
        heading: 'Extracting Structured Schemas Directly from Dialogue',
        body: [
          'The breakthrough approach is automated extraction directly from the spoken conversation. During a standard 30-minute discovery call, an experienced AE and a prospect naturally discuss all the essential criteria: budget constraints, technical decision criteria, procurement timelines, and competing vendor evaluations.',
          'Instead of asking the rep to recall and type these details after the call, modern intelligence engines evaluate the transcript against structured schemas like MEDDIC or BANT. The engine identifies the economic buyer, extracts the specific metric ("reduce ticket latency to under 45 minutes"), and writes these values directly to Salesforce or HubSpot custom fields. Most importantly, each extracted field cites the exact timecode receipt, allowing sales managers to verify qualification in seconds during pipeline reviews.',
        ],
      },
      {
        heading: 'Accelerating Follow-Up Velocity',
        body: [
          'Speed is the single greatest competitive advantage in sales. Studies consistently demonstrate that follow-up emails sent within 30 minutes of a demo convert at more than triple the rate of emails sent 24 hours later. By delivering an instant recap draft with extracted next steps and audio soundbites to the rep within 60 seconds of call completion, reps can personalize and send their follow-up before the prospect has even moved on to their next meeting.',
        ],
      },
    ],
    seo: {
      title: 'Automating Sales Pipeline Hygiene Without Rep Friction',
      description: 'How engineering and RevOps leaders use structured meeting extraction to keep CRM data 100% current.',
    },
  },

  {
    slug: 'executive-recaps-guide',
    title: 'Crafting High-Signal Executive Recaps in 60 Seconds',
    date: 'September 2026',
    author: 'Priya Sharma',
    readingTimeMinutes: 5,
    category: 'Leadership & Productivity',
    excerpt:
      'How to structure meeting takeaways that C-level stakeholders actually read, digest, and act upon without getting bogged down in conversational noise.',
    sections: [
      {
        heading: 'The TL;DR Fallacy',
        body: [
          'Many AI meeting assistants claim to generate "concise summaries," but in practice, they produce bland, homogenous paragraphs that summarize everything and emphasize nothing. An executive skimming five meetings between board calls does not want a chronological play-by-play of the small talk; they need immediate clarity on three things: What was decided? What is blocked? Who owns what by when?',
          'High-signal executive recaps discard conversational fluff and organize information into distinct, actionable buckets. Leading with strategic decisions forces clarity, while separating open dependencies from closed agreements prevents costly misunderstandings.',
        ],
      },
      {
        heading: 'Structuring for Rapid Visual Scanning',
        body: [
          'Effective recaps employ strict typographical hierarchy: bold lead-ins for key points, bulleted constraints, and explicit owner tags (Assigned: Alex). Furthermore, incorporating exact numerical receipts eliminates ambiguity. Rather than stating "the team discussed pricing changes," the bullet states "Launch usage-based tier at $19/seat with 200 query cap (12:41 P)". If an executive questions the rationale, they click the receipt and hear the exact dialogue in context.',
        ],
      },
      {
        heading: 'The Rule of Three and Asynchronous Distribution',
        body: [
          'A summary that exceeds 10 bullets is no longer an executive summary — it is a secondary transcript. Limit high-level recaps to the top three decisions, top three blockers, and immediate next steps. Pushing these concise recaps directly into designated Slack channels or executive email digests ensures that leadership stays informed without being forced into every meeting.',
        ],
      },
    ],
    seo: {
      title: 'Crafting High-Signal Executive Recaps in 60 Seconds',
      description: 'How to structure bulleted takeaways that VP and C-level stakeholders actually read and act upon.',
    },
  },

  {
    slug: 'remote-team-synchronization',
    title: 'Asynchronous Synchronization for Cross-Timezone Teams',
    date: 'September 2026',
    author: 'Alex Morgan',
    readingTimeMinutes: 5,
    category: 'Remote Work & Culture',
    excerpt:
      'Replacing marathon daily standups and timezone-punishing syncs with 90-second chapter clips and verified action items.',
    sections: [
      {
        heading: 'The Timezone Penalty of Synchronous Standups',
        body: [
          'As software companies expanded globally, traditional agile rituals began to strain. A 9:00 AM Pacific standup requires Tokyo team members to attend at 2:00 AM, while London developers must break their afternoon coding flow. Attempting to keep distributed engineering teams synchronized through synchronous meetings invariably forces someone to sacrifice their sleep or focus time.',
          'The solution is not to eliminate alignment, but to shift alignment from synchronous presence to asynchronous verified artifacts.',
        ],
      },
      {
        heading: 'Curating 90-Second Chapter Reels',
        body: [
          'When an architecture sync or sprint planning session occurs, absent team members rarely have the time to watch the full 60-minute recording. However, by leveraging The Score and automated topic extraction, meeting organizers can generate a 90-second highlight reel of the core architectural decisions in two clicks.',
          'Team members waking up in another hemisphere review the 90-second reel alongside the bulleted decisions. If they need additional context on a specific trade-off, they click the timecode receipt and jump directly into that discussion. This preserves deep work while eliminating timezone friction.',
        ],
      },
      {
        heading: 'Decentralized Accountability with Spoken Receipts',
        body: [
          'Verbal handoffs are notoriously vulnerable to communication drift. By anchoring commitments to exact spoken timestamps and syncing them directly to Asana, Linear, and Notion, every team member shares identical clarity on project expectations regardless of where they sit in the world.',
        ],
      },
    ],
    seo: {
      title: 'Asynchronous Synchronization for Cross-Timezone Teams',
      description: 'Replacing marathon standup syncs with 90-second chapter clips and verified action items.',
    },
  },
];
