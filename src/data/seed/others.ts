/**
 * Seed data: remaining meetings to fill the list.
 * Covers every UI state: processing, transcript-only, unnamed speakers,
 * shared-with-me, upcoming, short standup, 1:1, sales call, customer QBR.
 */
import type { Meeting } from '../types';

export const otherMeetings: Meeting[] = [
  // ── Processing meeting ────────────────────────────────
  {
    id: 'mtg-weekly-standup',
    title: 'Weekly standup',
    startedAt: '2026-10-14T16:30:00Z',
    duration: 400,
    capture: 'bot-video',
    status: 'processing',
    stage: 'transcribing',
    speakers: [
      { id: 'sp-you-2', name: 'You', initials: 'Y', colorIndex: 1, talkPct: 40, named: true, isYou: true },
      { id: 'sp-jake', name: 'Jake Moss', initials: 'JM', colorIndex: 2, talkPct: 35, named: true },
      { id: 'sp-kim', name: 'Kim Tran', initials: 'KT', colorIndex: 3, talkPct: 25, named: true },
    ],
    segments: [],
    topics: [],
    moments: [],
    actions: [],
    isSample: true,
  },

  // ── Transcript-only (no video) ────────────────────────
  {
    id: 'mtg-phone-sync',
    title: 'Quick phone sync with vendor',
    startedAt: '2026-10-13T11:00:00Z',
    duration: 720,
    capture: 'transcript',
    status: 'ready',
    speakers: [
      { id: 'sp-you-3', name: 'You', initials: 'Y', colorIndex: 1, talkPct: 55, named: true, isYou: true },
      { id: 'sp-vendor', name: 'Alex Rivera', initials: 'AR', colorIndex: 2, talkPct: 45, named: true },
    ],
    segments: [
      { id: 'ts-001', speakerId: 'sp-you-3', start: 0, end: 30, text: "Hey Alex, thanks for hopping on quickly. I wanted to check on the integration timeline." },
      { id: 'ts-002', speakerId: 'sp-vendor', start: 32, end: 65, text: "Sure thing. We're on track for the API v2 endpoint by end of month. The webhook support might slip a week though." },
      { id: 'ts-003', speakerId: 'sp-you-3', start: 67, end: 100, text: "That's fine as long as the core auth flow is solid. Our team is building on top of that first." },
      { id: 'ts-004', speakerId: 'sp-vendor', start: 102, end: 140, text: "Auth is done and deployed to staging. I'll send you the sandbox credentials after this call." },
      { id: 'ts-005', speakerId: 'sp-you-3', start: 142, end: 170, text: "Perfect. One more thing — any updates on rate limits? We're expecting bursts during meeting end times." },
      { id: 'ts-006', speakerId: 'sp-vendor', start: 172, end: 210, text: "We've bumped it to 500 requests per minute per tenant. Should be more than enough for your use case." },
    ],
    topics: [
      { id: 'tt-1', title: 'Integration timeline', start: 0, end: 100, gist: 'API v2 on track, webhooks may slip a week.' },
      { id: 'tt-2', title: 'Auth and rate limits', start: 100, end: 210, gist: 'Auth done on staging, rate limit bumped to 500/min.' },
    ],
    moments: [
      { id: 'tm-1', at: 65, kind: 'decision', note: 'Webhook slip acceptable' },
    ],
    summary: {
      template: 'Standard',
      catchUp: [
        { id: 'tc-1', text: 'API v2 endpoint on track for end of month. Webhook support may slip one week.', receipts: [{ segmentIds: ['ts-002'], at: 32 }] },
        { id: 'tc-2', text: 'Auth flow done and deployed to staging. Sandbox credentials to follow.', receipts: [{ segmentIds: ['ts-004'], at: 102 }] },
      ],
      sections: [
        {
          heading: 'Integration',
          bullets: [
            { id: 'tb-1', text: 'API v2 endpoint delivery: end of October.', receipts: [{ segmentIds: ['ts-002'], at: 32 }] },
            { id: 'tb-2', text: 'Rate limits bumped to 500 requests per minute per tenant.', receipts: [{ segmentIds: ['ts-006'], at: 172 }] },
          ],
        },
      ],
    },
    actions: [
      { id: 'ta-1', text: 'Alex: send sandbox credentials', ownerId: 'sp-vendor', done: false, receipts: [{ segmentIds: ['ts-004'], at: 102 }] },
    ],
    isSample: true,
  },

  // ── 1:1 meeting ───────────────────────────────────────
  {
    id: 'mtg-1on1-priya',
    title: '1:1 with Priya',
    startedAt: '2026-10-12T10:00:00Z',
    duration: 1800,
    capture: 'bot-video',
    status: 'ready',
    speakers: [
      { id: 'sp-you-4', name: 'You', initials: 'Y', colorIndex: 1, talkPct: 45, named: true, isYou: true },
      { id: 'sp-priya-2', name: 'Priya Sharma', initials: 'PS', colorIndex: 2, talkPct: 55, named: true },
    ],
    segments: [
      { id: 'os-001', speakerId: 'sp-you-4', start: 0, end: 25, text: "How's the pricing research going? I know it's been a heavy lift." },
      { id: 'os-002', speakerId: 'sp-priya-2', start: 27, end: 70, text: "It's going well. I interviewed eight customers last week. The biggest takeaway is that they don't mind paying, they just want to understand exactly what they're getting. The 'limited use' language on competitor sites drives them crazy." },
      { id: 'os-003', speakerId: 'sp-you-4', start: 72, end: 100, text: "That's great validation for the explicit-limits approach. Anything blocking you?" },
      { id: 'os-004', speakerId: 'sp-priya-2', start: 102, end: 140, text: "Just bandwidth. I'm also covering the Q3 retrospective deck and the partner onboarding for next week. If I could hand off the retro deck to someone else, I'd have the pricing doc finalized two days earlier." },
    ],
    topics: [
      { id: 'ot-1', title: 'Pricing research', start: 0, end: 100, gist: 'Customer interviews show people want explicit, plain-language limits.' },
      { id: 'ot-2', title: 'Bandwidth', start: 100, end: 140, gist: 'Handing off the retro deck would free Priya to finalize pricing faster.' },
    ],
    moments: [],
    summary: {
      template: '1:1',
      catchUp: [
        { id: 'oc-1', text: 'Pricing research: 8 customer interviews completed. Key finding: explicit limits beat vague language.', receipts: [{ segmentIds: ['os-002'], at: 27 }] },
      ],
      sections: [
        {
          heading: 'Updates',
          bullets: [
            { id: 'ob-1', text: 'Customers interviewed want to see exact query counts and feature access, not "limited use."', receipts: [{ segmentIds: ['os-002'], at: 27 }] },
            { id: 'ob-2', text: 'Priya juggling pricing doc, Q3 retro deck and partner onboarding.', receipts: [{ segmentIds: ['os-004'], at: 102 }] },
          ],
        },
      ],
    },
    actions: [
      { id: 'oa-1', text: 'Reassign Q3 retro deck so Priya can focus on pricing', ownerId: 'sp-you-4', done: false, receipts: [{ segmentIds: ['os-004'], at: 102 }] },
    ],
    isSample: true,
  },

  // ── Sales discovery call ──────────────────────────────
  {
    id: 'mtg-sales-discovery',
    title: 'Discovery call — Meridian Health',
    startedAt: '2026-10-11T15:00:00Z',
    duration: 2400,
    capture: 'bot-video',
    status: 'ready',
    speakers: [
      { id: 'sp-you-5', name: 'You', initials: 'Y', colorIndex: 1, talkPct: 35, named: true, isYou: true },
      { id: 'sp-sarah', name: 'Sarah Kim', initials: 'SK', colorIndex: 2, talkPct: 30, named: true },
      { id: 'sp-buyer1', name: 'Dr. Raj Patel', initials: 'RP', colorIndex: 3, talkPct: 25, named: true },
      { id: 'sp-buyer2', name: 'Lisa Wong', initials: 'LW', colorIndex: 4, talkPct: 10, named: true },
    ],
    segments: [
      { id: 'ss-001', speakerId: 'sp-you-5', start: 0, end: 30, text: "Thanks for making time, Raj and Lisa. Sarah and I wanted to understand how your team currently handles meeting follow-ups, especially for the clinical review boards." },
      { id: 'ss-002', speakerId: 'sp-buyer1', start: 32, end: 80, text: "Right now it's manual. Someone takes notes during the board meeting — usually a resident — and then types them up afterward. It takes about two hours per meeting, and we have three a week." },
      { id: 'ss-003', speakerId: 'sp-buyer2', start: 82, end: 115, text: "The bigger problem is accuracy. When we review the notes a week later, there are always disagreements about what was actually decided. It creates friction in the team." },
    ],
    topics: [
      { id: 'st-1', title: 'Current workflow', start: 0, end: 115, gist: 'Manual note-taking by residents, two hours per meeting, three meetings weekly.' },
    ],
    moments: [
      { id: 'sm-1', at: 80, kind: 'question', note: 'Pain point: 6+ hours/week on manual notes' },
    ],
    summary: {
      template: 'Sales',
      catchUp: [
        { id: 'sc-1', text: 'Meridian Health runs three clinical review boards per week. Notes are manual, taking ~2 hours each, with accuracy disputes a recurring problem.', receipts: [{ segmentIds: ['ss-002'], at: 32 }, { segmentIds: ['ss-003'], at: 82 }] },
      ],
      sections: [
        {
          heading: 'Pain points',
          bullets: [
            { id: 'sb-1', text: '6+ hours per week spent on manual meeting notes by residents.', receipts: [{ segmentIds: ['ss-002'], at: 32 }] },
            { id: 'sb-2', text: 'Disagreements about decisions arise when notes are reviewed a week later.', receipts: [{ segmentIds: ['ss-003'], at: 82 }] },
          ],
        },
      ],
    },
    actions: [],
    isSample: true,
  },

  // ── Customer QBR ──────────────────────────────────────
  {
    id: 'mtg-customer-qbr',
    title: 'QBR — Nexus Financial',
    startedAt: '2026-10-10T13:00:00Z',
    duration: 3000,
    capture: 'bot-video',
    status: 'ready',
    speakers: [
      { id: 'sp-you-6', name: 'You', initials: 'Y', colorIndex: 1, talkPct: 30, named: true, isYou: true },
      { id: 'sp-aisha-2', name: 'Aisha Okonkwo', initials: 'AO', colorIndex: 2, talkPct: 25, named: true },
      { id: 'sp-client1', name: 'David Park', initials: 'DP', colorIndex: 3, talkPct: 25, named: true },
      { id: 'sp-client2', name: 'Maria Torres', initials: 'MT', colorIndex: 4, talkPct: 15, named: true },
      { id: 'sp-client3', name: 'Speaker 5', initials: 'S5', colorIndex: 5, talkPct: 5, named: false },
    ],
    segments: [
      { id: 'qs-001', speakerId: 'sp-you-6', start: 0, end: 25, text: "David, Maria, thanks for joining us for the quarterly review. Aisha and I will walk through your usage data and then we want to hear what's working and what's not." },
      { id: 'qs-002', speakerId: 'sp-client1', start: 27, end: 60, text: "Before you start, I want to flag one thing. The transcript quality on our all-hands has been noticeably worse since we moved to 20-person meetings. That's been a real pain point for our compliance team." },
    ],
    topics: [
      { id: 'qt-1', title: 'Usage review', start: 0, end: 60, gist: 'Opening and customer pain point flagged.' },
    ],
    moments: [],
    summary: {
      template: 'Customer Success',
      catchUp: [
        { id: 'qc-1', text: 'Nexus flagged transcript quality issues on 20-person all-hands meetings as a blocker for their compliance team.', receipts: [{ segmentIds: ['qs-002'], at: 27 }] },
      ],
      sections: [{ heading: 'Issues', bullets: [
        { id: 'qb-1', text: 'Transcript accuracy degrades on 20+ person calls. Compliance team affected.', receipts: [{ segmentIds: ['qs-002'], at: 27 }] },
      ] }],
    },
    actions: [],
    isSample: true,
  },

  // ── Shared with me ────────────────────────────────────
  {
    id: 'mtg-shared-design-review',
    title: 'Design review — clips flow',
    startedAt: '2026-10-09T09:00:00Z',
    duration: 2100,
    capture: 'bot-video',
    status: 'ready',
    speakers: [
      { id: 'sp-ella', name: 'Ella Chen', initials: 'EC', colorIndex: 1, talkPct: 45, named: true },
      { id: 'sp-noah', name: 'Noah Williams', initials: 'NW', colorIndex: 2, talkPct: 35, named: true },
      { id: 'sp-maya', name: 'Maya Singh', initials: 'MS', colorIndex: 3, talkPct: 20, named: true },
    ],
    segments: [
      { id: 'ds-001', speakerId: 'sp-ella', start: 0, end: 35, text: "I've been working on the clips flow redesign. The main change is that creating a clip starts from the Score — you drag a range, and the trim editor appears inline instead of opening a separate page." },
      { id: 'ds-002', speakerId: 'sp-noah', start: 37, end: 70, text: "I like the inline approach. One concern: what happens on mobile? The drag gesture conflicts with scrolling on the Score." },
    ],
    topics: [
      { id: 'dt-1', title: 'Clips flow redesign', start: 0, end: 70, gist: 'Inline clip creation from Score; mobile gesture conflict flagged.' },
    ],
    moments: [],
    summary: {
      template: 'Product Discovery',
      catchUp: [
        { id: 'dc-1', text: 'Clips creation redesigned as inline range-drag on the Score. Mobile gesture conflict needs resolution.', receipts: [{ segmentIds: ['ds-001'], at: 0 }, { segmentIds: ['ds-002'], at: 37 }] },
      ],
      sections: [{ heading: 'Design decisions', bullets: [
        { id: 'db-1', text: 'Clip creation starts from Score range selection instead of a separate page.', receipts: [{ segmentIds: ['ds-001'], at: 0 }] },
      ] }],
    },
    actions: [],
    sharedBy: 'Ella Chen',
    isSample: true,
  },

  // ── Upcoming meeting ──────────────────────────────────
  {
    id: 'mtg-upcoming-design',
    title: 'Design review',
    startedAt: '2026-10-15T10:30:00Z',
    duration: 0,
    capture: 'bot-video',
    status: 'upcoming',
    speakers: [],
    segments: [],
    topics: [],
    moments: [],
    actions: [],
    isSample: true,
  },

  // ── Another short meeting ─────────────────────────────
  {
    id: 'mtg-retro',
    title: 'Sprint retrospective',
    startedAt: '2026-10-08T16:00:00Z',
    duration: 1500,
    capture: 'audio',
    status: 'ready',
    speakers: [
      { id: 'sp-you-7', name: 'You', initials: 'Y', colorIndex: 1, talkPct: 30, named: true, isYou: true },
      { id: 'sp-jake-2', name: 'Jake Moss', initials: 'JM', colorIndex: 2, talkPct: 25, named: true },
      { id: 'sp-kim-2', name: 'Kim Tran', initials: 'KT', colorIndex: 3, talkPct: 20, named: true },
      { id: 'sp-noah-2', name: 'Noah Williams', initials: 'NW', colorIndex: 4, talkPct: 15, named: true },
      { id: 'sp-r5', name: 'Speaker 5', initials: 'S5', colorIndex: 5, talkPct: 10, named: false },
    ],
    segments: [
      { id: 'rs-001', speakerId: 'sp-you-7', start: 0, end: 20, text: "Let's do a quick retro. What went well this sprint?" },
      { id: 'rs-002', speakerId: 'sp-jake-2', start: 22, end: 50, text: "The new pipeline for processing large meetings is solid. We cut processing time by 40% on calls over 30 minutes." },
      { id: 'rs-003', speakerId: 'sp-kim-2', start: 52, end: 80, text: "The design system documentation is finally in a good place. Components are documented and engineers can self-serve." },
    ],
    topics: [
      { id: 'rt-1', title: 'What went well', start: 0, end: 80, gist: 'Pipeline improvements and design system docs.' },
    ],
    moments: [],
    summary: {
      template: 'Standard',
      catchUp: [
        { id: 'rc-1', text: 'Processing time reduced 40% on calls over 30 minutes. Design system docs completed.', receipts: [{ segmentIds: ['rs-002'], at: 22 }, { segmentIds: ['rs-003'], at: 52 }] },
      ],
      sections: [{ heading: 'Went well', bullets: [
        { id: 'rb-1', text: 'Large meeting processing pipeline: 40% faster.', receipts: [{ segmentIds: ['rs-002'], at: 22 }] },
        { id: 'rb-2', text: 'Design system fully documented. Engineers can self-serve.', receipts: [{ segmentIds: ['rs-003'], at: 52 }] },
      ] }],
    },
    actions: [],
    isSample: true,
  },

  // ── Another processing meeting ────────────────────────
  {
    id: 'mtg-onboarding-call',
    title: 'Partner onboarding — Stratos',
    startedAt: '2026-10-14T09:00:00Z',
    duration: 1200,
    capture: 'bot-video',
    status: 'processing',
    stage: 'summarizing',
    speakers: [
      { id: 'sp-you-8', name: 'You', initials: 'Y', colorIndex: 1, talkPct: 50, named: true, isYou: true },
      { id: 'sp-partner', name: 'Chris Laurent', initials: 'CL', colorIndex: 2, talkPct: 50, named: true },
    ],
    segments: [],
    topics: [],
    moments: [],
    actions: [],
    isSample: true,
  },

  // ── Past meetings for search depth ────────────────────
  {
    id: 'mtg-pricing-deep-dive',
    title: 'Pricing deep dive',
    startedAt: '2026-10-07T14:00:00Z',
    duration: 2700,
    capture: 'bot-video',
    status: 'ready',
    speakers: [
      { id: 'sp-you-9', name: 'You', initials: 'Y', colorIndex: 1, talkPct: 35, named: true, isYou: true },
      { id: 'sp-priya-3', name: 'Priya Sharma', initials: 'PS', colorIndex: 2, talkPct: 40, named: true },
      { id: 'sp-tom-2', name: 'Tom Eriksen', initials: 'TE', colorIndex: 3, talkPct: 25, named: true },
    ],
    segments: [
      { id: 'ps-001', speakerId: 'sp-priya-3', start: 0, end: 40, text: "I've modeled three pricing scenarios. Scenario A is a flat $19 per seat. Scenario B is usage-based with a $12 base plus $0.10 per Ask query. Scenario C is the freemium gate I mentioned last week — free stays unlimited for core features, and we gate Ask and export." },
      { id: 'ps-002', speakerId: 'sp-you-9', start: 42, end: 80, text: "Walk me through the revenue projections for each. I need to know which one gets us to break-even on the AI compute cost." },
      { id: 'ps-003', speakerId: 'sp-priya-3', start: 82, end: 130, text: "At current usage levels, Scenario A generates about $380K annually. B is more unpredictable — could be $280K to $450K depending on adoption curves. C is the most conservative at $310K but has the lowest churn risk because free users never feel a bait-and-switch." },
      { id: 'ps-004', speakerId: 'sp-tom-2', start: 132, end: 170, text: "From a marketing perspective, C is the easiest to sell. 'Free forever' with a clear upgrade path. B requires explaining metering, which is a harder conversation in the first sales call." },
    ],
    topics: [
      { id: 'pt-1', title: 'Pricing scenarios', start: 0, end: 170, gist: 'Three pricing models compared: flat, usage-based, freemium gate.' },
    ],
    moments: [
      { id: 'pm-1', at: 130, kind: 'decision', note: 'Scenario C (freemium gate) preferred for lowest churn risk' },
    ],
    summary: {
      template: 'Standard',
      catchUp: [
        { id: 'pc-1', text: 'Three pricing scenarios compared. Freemium gate (Scenario C) preferred for lowest churn risk at ~$310K ARR.', receipts: [{ segmentIds: ['ps-003'], at: 82 }] },
      ],
      sections: [{ heading: 'Analysis', bullets: [
        { id: 'pb-1', text: 'Flat $19/seat: ~$380K ARR but risks free-user churn.', receipts: [{ segmentIds: ['ps-001'], at: 0 }] },
        { id: 'pb-2', text: 'Usage-based: $280K–$450K range, unpredictable and harder to sell.', receipts: [{ segmentIds: ['ps-003'], at: 82 }] },
        { id: 'pb-3', text: 'Freemium gate: ~$310K, easiest to market, lowest churn.', receipts: [{ segmentIds: ['ps-003'], at: 82 }, { segmentIds: ['ps-004'], at: 132 }] },
      ] }],
    },
    actions: [],
    isSample: true,
  },

  {
    id: 'mtg-eng-planning',
    title: 'Engineering planning',
    startedAt: '2026-10-06T11:00:00Z',
    duration: 2400,
    capture: 'bot-video',
    status: 'ready',
    speakers: [
      { id: 'sp-marcus-2', name: 'Marcus Chen', initials: 'MC', colorIndex: 1, talkPct: 40, named: true },
      { id: 'sp-you-10', name: 'You', initials: 'Y', colorIndex: 2, talkPct: 30, named: true, isYou: true },
      { id: 'sp-jake-3', name: 'Jake Moss', initials: 'JM', colorIndex: 3, talkPct: 20, named: true },
      { id: 'sp-kim-3', name: 'Kim Tran', initials: 'KT', colorIndex: 4, talkPct: 10, named: true },
    ],
    segments: [
      { id: 'es-001', speakerId: 'sp-marcus-2', start: 0, end: 30, text: "I've broken down the diarization improvement into three phases. Phase one is the speaker embedding model upgrade — that's the biggest lift but also the highest impact." },
      { id: 'es-002', speakerId: 'sp-jake-3', start: 32, end: 60, text: "I've been prototyping with the new model. On our test set of 20 eight-person calls, we're seeing a 34% reduction in speaker confusion errors." },
    ],
    topics: [
      { id: 'et-1', title: 'Diarization phases', start: 0, end: 60, gist: 'Three-phase plan; prototype shows 34% error reduction.' },
    ],
    moments: [],
    summary: {
      template: 'Standard',
      catchUp: [
        { id: 'ec-1', text: 'Diarization improvement in three phases. Prototype of new speaker embedding shows 34% reduction in confusion errors on 8-person calls.', receipts: [{ segmentIds: ['es-001'], at: 0 }, { segmentIds: ['es-002'], at: 32 }] },
      ],
      sections: [{ heading: 'Technical plan', bullets: [
        { id: 'eb-1', text: 'Phase 1: speaker embedding model upgrade (highest impact).', receipts: [{ segmentIds: ['es-001'], at: 0 }] },
        { id: 'eb-2', text: 'Prototype results: 34% reduction in speaker confusion on 8-person test set.', receipts: [{ segmentIds: ['es-002'], at: 32 }] },
      ] }],
    },
    actions: [],
    isSample: true,
  },
];
