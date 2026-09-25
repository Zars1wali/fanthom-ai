// server/app.ts
import express from "express";
import cors from "cors";

// server/routes/api.ts
import { Router } from "express";

// src/data/seed/showpiece.ts
var speakers = [
  { id: "sp-priya", name: "Priya Sharma", initials: "PS", colorIndex: 1, talkPct: 28, named: true },
  { id: "sp-marcus", name: "Marcus Chen", initials: "MC", colorIndex: 2, talkPct: 22, named: true },
  { id: "sp-you", name: "You", initials: "Y", colorIndex: 3, talkPct: 18, named: true, isYou: true },
  { id: "sp-aisha", name: "Aisha Okonkwo", initials: "AO", colorIndex: 4, talkPct: 12, named: true },
  { id: "sp-tom", name: "Tom Eriksen", initials: "TE", colorIndex: 5, talkPct: 8, named: true },
  { id: "sp-6", name: "Speaker 6", initials: "S6", colorIndex: 6, talkPct: 5, named: false },
  { id: "sp-7", name: "Speaker 7", initials: "S7", colorIndex: 7, talkPct: 4, named: false },
  { id: "sp-8", name: "Speaker 8", initials: "S8", colorIndex: 8, talkPct: 3, named: false }
];
var topics = [
  { id: "top-1", title: "Intro and context", start: 0, end: 360, gist: "Setting up the quarter: what shipped, what slipped, and the new constraint (hiring freeze)." },
  { id: "top-2", title: "Pricing model", start: 360, end: 1080, gist: "Whether to ship the usage-based tier in Q1 or wait until the enterprise contract cycle ends." },
  { id: "top-3", title: "Roadmap trade-offs", start: 1080, end: 2400, gist: "Which two of the four proposed features make the cut given the freeze." },
  { id: "top-4", title: "Hiring and next steps", start: 2400, end: 3480, gist: "When the freeze lifts, what roles to open first, and who owns the tier doc." }
];
function makeSegments() {
  const dialogue = [
    // ─── Intro (0:00 – 6:00) ───
    { speaker: "sp-you", text: "All right, let's get started. Everyone's here, so I'll jump straight in. The goal today is to sort out what we're actually building next quarter given the hiring freeze.", duration: 12 },
    { speaker: "sp-priya", text: "Before we start \u2014 quick context. Q2 closed at 94% of target. We shipped the calendar sync and the inline editor, but the usage-based tier slipped.", duration: 14 },
    { speaker: "sp-marcus", text: "Right, and the freeze means we can't backfill the two engineers who left. So we're down to a core team of six on product.", duration: 10 },
    { speaker: "sp-aisha", text: "I want to flag that customer success is getting more escalations about the transcript accuracy on long calls. Eight-plus person meetings are the worst.", duration: 11 },
    { speaker: "sp-you", text: "Noted. We'll come back to that when we talk about the roadmap trade-offs. Priya, can you walk through the pricing proposal first?", duration: 9 },
    { speaker: "sp-tom", text: "One thing \u2014 can we timebox the pricing discussion? Last time it ate the whole meeting.", duration: 7 },
    { speaker: "sp-you", text: "Good call. Let's aim for twenty minutes on pricing, then thirty on the roadmap, then wrap with next steps.", duration: 8 },
    { speaker: "sp-6", text: "Works for me.", duration: 3 },
    { speaker: "sp-7", text: "Same.", duration: 2 },
    { speaker: "sp-priya", text: "Perfect. Let me share my screen.", duration: 4 },
    // ─── Pricing (6:00 – 18:00) ───
    { speaker: "sp-priya", text: "So the proposal is three tiers. Free stays as is \u2014 unlimited recordings, AI summaries, basic search. The new piece is a usage-based middle tier at 19 dollars per seat per month with metered Ask queries and priority processing.", duration: 18 },
    { speaker: "sp-priya", text: "Enterprise stays custom-quoted but we add an SSO requirement and a 50-seat minimum, which is what our top 12 accounts already exceed.", duration: 12 },
    { speaker: "sp-marcus", text: "I have a concern about metering Ask queries. Our power users run 15 to 20 a day. If we cap at 50 a month they'll feel it immediately and we risk churn.", duration: 14 },
    { speaker: "sp-priya", text: "That's why I set the cap at 200 per month, not 50. The 95th percentile of free-tier usage is 180. So it's a soft gate, not a wall.", duration: 11 },
    { speaker: "sp-aisha", text: "From the CS side, the number-one question we'll get is 'what counts as a query?' If someone asks a follow-up, is that one or two?", duration: 10 },
    { speaker: "sp-priya", text: "One. Each submission to the Ask box is one query. Follow-ups are new queries. We should show the count in the UI so nobody is surprised.", duration: 12 },
    { speaker: "sp-tom", text: "Can we grandfather existing free users for 90 days? A hard cutover will hurt our G2 rating.", duration: 8 },
    { speaker: "sp-you", text: "I think 90 days is too long. 30 is standard. But I agree we need a grace period.", duration: 7 },
    { speaker: "sp-marcus", text: "What about the enterprise contracts that renew in Q1? If we launch usage-based in January and they're mid-contract, legal will push back.", overlap: "sp-priya", duration: 11 },
    { speaker: "sp-priya", text: "We exempt enterprise from the metering until their renewal. That's already in the proposal, slide seven.", duration: 9, overlap: "sp-marcus" },
    { speaker: "sp-6", text: "I just want to double-check \u2014 the free tier still includes unlimited recordings, right? Because if we touch that we lose the entire bottom of funnel.", duration: 12 },
    { speaker: "sp-priya", text: "Correct. Free stays unlimited for recording, transcription and standard summaries. The gate is on Ask, priority processing and advanced export.", duration: 13 },
    { speaker: "sp-8", text: "What's advanced export?", duration: 3 },
    { speaker: "sp-priya", text: "Markdown with speaker timecodes, WebVTT and the API endpoint. Plain text stays free.", duration: 8 },
    { speaker: "sp-you", text: "OK, I think we have enough on pricing. The decision is: we ship the usage-based tier in Q1 with a 30-day grace period for existing free users, enterprise exempt until renewal. Priya, can you finalize the pricing doc by Friday?", duration: 16 },
    { speaker: "sp-priya", text: "Done. I'll send a draft for async comments by Thursday.", duration: 6 },
    // ─── Roadmap trade-offs (18:00 – 40:00) ───
    { speaker: "sp-you", text: "Next up \u2014 the roadmap. We have four proposed features and resources for two. Marcus, can you lay them out?", duration: 10 },
    { speaker: "sp-marcus", text: "Sure. The four candidates are: one, multi-speaker diarization improvements for calls with 8-plus people. Two, the live summary sidebar for the desktop app. Three, the clips and sharing flow. Four, the Ask-across-meetings feature.", duration: 18 },
    { speaker: "sp-marcus", text: "Engineering estimates: diarization is about six weeks, live summary is four weeks, clips is five weeks and cross-meeting Ask is eight weeks.", duration: 14 },
    { speaker: "sp-aisha", text: "I'd push hard for diarization. The transcript accuracy complaints are all from large-meeting users, and those are our best conversion signal \u2014 they upgrade because the free tier already wowed them on a big call.", duration: 16 },
    { speaker: "sp-tom", text: "Counterpoint: clips and sharing is the most visible feature for growth. Every shared clip is a viral loop. We saw that when we tested the prototype \u2014 40% of recipients signed up within a week.", duration: 14 },
    { speaker: "sp-7", text: "Can we do a lighter version of clips? Like, just timestamp-based sharing without the trim editor? That might save two weeks.", duration: 10 },
    { speaker: "sp-marcus", text: "We could, but the trim editor is what makes clips feel like a product feature and not a hack. Without it, you're sharing a raw timestamp link.", duration: 12 },
    { speaker: "sp-priya", text: "I agree with Marcus. If we ship clips, ship the full version. A half-baked clip feature reflects poorly on the pricing narrative \u2014 we're asking people to pay and then giving them an unfinished tool.", duration: 14 },
    { speaker: "sp-you", text: "What about live summary? Where does that sit in terms of impact?", duration: 6 },
    { speaker: "sp-marcus", text: "It's a differentiator but it's Mac-only until we build the Windows version. So the addressable audience is maybe 35% of our user base right now.", duration: 12 },
    { speaker: "sp-aisha", text: "And the users asking for it most are power users who already pay. So it's a retention play, not an acquisition play.", duration: 9 },
    { speaker: "sp-you", text: "OK so I'm hearing diarization and clips as the top two. Cross-meeting Ask is the most ambitious but also the most engineering-heavy. And live summary is important but narrower in audience.", duration: 14 },
    { speaker: "sp-6", text: "Can I ask \u2014 if we do diarization and clips, what happens to Ask? Does it just sit in the backlog?", duration: 8 },
    { speaker: "sp-you", text: "It moves to Q2. The pricing tier we just approved actually makes Ask more valuable because metered queries create a reason to upgrade. So launching improved Ask alongside the paid tier in Q2 makes strategic sense.", duration: 16 },
    { speaker: "sp-priya", text: "That's a good framing. Ship the tier, gate Ask, then make Ask better in Q2 \u2014 the upgrade path writes itself.", overlap: "sp-marcus", duration: 10 },
    { speaker: "sp-marcus", text: "We can't ship both without cutting scope somewhere. My proposal is: diarization first because it directly improves the core product for the hardest case, then clips as a fast follow.", overlap: "sp-priya", duration: 14 },
    { speaker: "sp-tom", text: "I want to push back slightly. Clips has a measurable growth loop. Diarization is quality improvement \u2014 important but harder to attribute revenue to.", duration: 12 },
    { speaker: "sp-aisha", text: "The attribution data we do have suggests that users who experienced a bad transcript on a large call have a 60% lower chance of converting. So fixing diarization is revenue-positive, just upstream.", duration: 15 },
    { speaker: "sp-you", text: "That's compelling. Decision: we ship diarization improvements first, starting immediately. Clips begins two weeks later so there's overlap. Both ship in Q1. Live summary and cross-meeting Ask move to Q2.", duration: 15 },
    { speaker: "sp-marcus", text: "Works for me. I'll restructure the sprint plan by Monday.", duration: 7 },
    // ─── Hiring and next steps (40:00 – 58:00) ───
    { speaker: "sp-you", text: "Last section: hiring. The freeze is supposed to lift in November. If it does, what roles do we open first?", duration: 10 },
    { speaker: "sp-marcus", text: "We need a senior backend engineer, full stop. The diarization work is going to stress the pipeline and I'd rather have someone who's done real-time audio before.", duration: 13 },
    { speaker: "sp-priya", text: "I'd add a product designer. We're redesigning the meeting page and the clips flow, and right now the engineers are designing as they go, which slows everything down.", duration: 14 },
    { speaker: "sp-tom", text: "From growth's perspective, a content marketer. We have no one writing about the product publicly. Every competitor has a blog, a newsletter, a LinkedIn presence. We're invisible.", duration: 13 },
    { speaker: "sp-aisha", text: "Can I put in for a CS ops person? I'm doing support, onboarding and analytics all by myself and it's becoming a bottleneck.", duration: 11 },
    { speaker: "sp-you", text: "OK, so four asks but probably two slots. Let's prioritize. Marcus, if you had to pick one?", duration: 8 },
    { speaker: "sp-marcus", text: "Senior backend. Without it the Q1 roadmap is at risk.", duration: 6 },
    { speaker: "sp-priya", text: "I'd say designer second. The faster we design, the faster engineering ships.", duration: 7 },
    { speaker: "sp-you", text: "Agreed. Backend engineer and product designer as the first two hires when the freeze lifts. Tom, can you draft the job specs?", duration: 9 },
    { speaker: "sp-tom", text: "On it. I'll have drafts in the shared doc by end of this week.", duration: 7 },
    { speaker: "sp-8", text: "Do we know when the freeze actually lifts? Last I heard it was 'November' but no specific date.", duration: 8 },
    { speaker: "sp-you", text: "I'm meeting with the board on the 15th. I'll push for a firm date and share it immediately. For planning purposes, assume November 15th.", duration: 12 },
    { speaker: "sp-priya", text: "One more thing \u2014 who owns the pricing tier doc? I wrote the proposal but the implementation spec needs to come from engineering.", duration: 11 },
    { speaker: "sp-marcus", text: "I'll own the technical spec. Priya does the business side, I'll do the engineering side. We sync Friday.", duration: 9 },
    { speaker: "sp-you", text: "Great. So action items: Priya sends the pricing draft by Thursday. Marcus drafts the tier spec and restructures sprints by Monday. Tom has job specs by Friday. I push for a freeze lift date at the board meeting.", duration: 17 },
    { speaker: "sp-you", text: "Aisha, for now, flag the worst diarization cases in the bug tracker so Marcus's team can use them as test cases.", duration: 10 },
    { speaker: "sp-aisha", text: "Already started. I have about 15 tagged. I'll add the meeting IDs and timestamps.", duration: 8 },
    { speaker: "sp-7", text: "Quick question \u2014 should we tell customers that diarization improvements are coming? Some of them are threatening to leave.", duration: 9 },
    { speaker: "sp-aisha", text: "I'd wait until we have a rough timeline. Promising and missing is worse than silence.", duration: 8 },
    { speaker: "sp-you", text: "Agreed. Let's wait until Marcus has the sprint plan. Then Aisha can share a general 'improvements coming in Q1' message without a specific date.", duration: 12 },
    { speaker: "sp-you", text: "All right, that's everything. Good meeting. Let's execute.", duration: 5 },
    { speaker: "sp-priya", text: "Thanks everyone.", duration: 3 },
    { speaker: "sp-marcus", text: "Later.", duration: 2 }
  ];
  const segs = [];
  let t = 0;
  for (let i = 0; i < dialogue.length; i++) {
    const d = dialogue[i];
    const start = t;
    const end = t + d.duration;
    segs.push({
      id: `seg-${String(i + 1).padStart(3, "0")}`,
      speakerId: d.speaker,
      start,
      end,
      text: d.text,
      overlapsWith: d.overlap ? [d.overlap] : void 0
    });
    t = end + (d.overlap ? 0 : Math.floor(Math.random() * 3) + 1);
  }
  return segs;
}
var segments = makeSegments();
var moments = [
  { id: "mom-1", at: 200, kind: "decision", note: "Ship usage-based tier in Q1" },
  { id: "mom-2", at: 310, kind: "highlight", note: "Grace period debate", byId: "sp-you" },
  { id: "mom-3", at: 520, kind: "question", note: "What counts as a query?" },
  { id: "mom-4", at: 760, kind: "decision", note: "Enterprise exempt until renewal" },
  { id: "mom-5", at: 1140, kind: "objection", note: "Clips vs diarization priority" },
  { id: "mom-6", at: 1380, kind: "highlight", note: "40% recipient signup rate", byId: "sp-you" },
  { id: "mom-7", at: 1620, kind: "decision", note: "Diarization first, clips as fast follow" },
  { id: "mom-8", at: 1850, kind: "question", note: "Does Ask just sit in the backlog?" },
  { id: "mom-9", at: 2100, kind: "decision", note: "Ask moves to Q2 with the paid tier" },
  { id: "mom-10", at: 2460, kind: "highlight", note: "Hiring: backend engineer first", byId: "sp-you" },
  { id: "mom-11", at: 2800, kind: "action", note: "Marcus: draft tier tech spec by Monday" },
  { id: "mom-12", at: 3100, kind: "objection", note: "Should we tell customers about diarization?" }
];
var summary = {
  template: "Standard",
  catchUp: [
    { id: "cu-1", text: "Usage-based pricing tier approved for Q1 launch with a 30-day grace period for existing free users.", receipts: [{ segmentIds: ["seg-025"], at: 761 }] },
    { id: "cu-2", text: "Diarization improvements and clips are the two features shipping in Q1; live summary and cross-meeting Ask move to Q2.", receipts: [{ segmentIds: ["seg-040"], at: 1850 }] },
    { id: "cu-3", text: "Hiring freeze expected to lift November 15th; first hires will be a senior backend engineer and a product designer.", receipts: [{ segmentIds: ["seg-050"], at: 2610 }] },
    { id: "cu-4", text: "Enterprise customers are exempt from metering until their contract renewal.", receipts: [{ segmentIds: ["seg-020"], at: 602 }] },
    { id: "cu-5", text: "No customer-facing announcements about diarization until the sprint plan is ready.", receipts: [{ segmentIds: ["seg-060"], at: 3300 }] }
  ],
  sections: [
    {
      heading: "Pricing",
      bullets: [
        {
          id: "b-1",
          text: "Three-tier model: Free (unlimited recording, AI summaries, basic search), Pro at $19/seat/month (metered Ask at 200 queries/month, priority processing, advanced export), Enterprise (custom, SSO, 50-seat minimum).",
          receipts: [{ segmentIds: ["seg-011"], at: 380 }, { segmentIds: ["seg-012"], at: 410 }]
        },
        {
          id: "b-2",
          text: "Each Ask submission counts as one query. Follow-ups are separate. The count will be shown in the UI.",
          receipts: [{ segmentIds: ["seg-016"], at: 520 }]
        },
        {
          id: "b-3",
          text: "30-day grace period for existing free users (not 90 \u2014 shorter is standard).",
          receipts: [{ segmentIds: ["seg-017"], at: 558 }, { segmentIds: ["seg-018"], at: 572 }]
        },
        {
          id: "b-4",
          text: "Enterprise exempt from metering until renewal. Already in the proposal.",
          receipts: [{ segmentIds: ["seg-020"], at: 602 }]
        },
        {
          id: "b-5",
          text: "Free tier still includes unlimited recordings, transcription and standard summaries. Gate is on Ask, priority processing and advanced export.",
          receipts: [{ segmentIds: ["seg-022"], at: 660 }]
        }
      ]
    },
    {
      heading: "Roadmap",
      bullets: [
        {
          id: "b-6",
          text: "Four candidates: diarization improvements (6 weeks), live summary sidebar (4 weeks), clips and sharing (5 weeks), cross-meeting Ask (8 weeks).",
          receipts: [{ segmentIds: ["seg-028"], at: 1100 }, { segmentIds: ["seg-029"], at: 1130 }]
        },
        {
          id: "b-7",
          text: "Diarization is the top priority: transcript accuracy complaints correlate with a 60% lower conversion rate on large-meeting users.",
          receipts: [{ segmentIds: ["seg-030"], at: 1160 }, { segmentIds: ["seg-039"], at: 1810 }]
        },
        {
          id: "b-8",
          text: "Clips ships as a full product feature (with trim editor), not a minimal timestamp link. Half-baked reflects poorly on the pricing narrative.",
          receipts: [{ segmentIds: ["seg-034"], at: 1480 }, { segmentIds: ["seg-035"], at: 1520 }]
        },
        {
          id: "b-9",
          text: "Live summary deferred to Q2: Mac-only (35% addressable audience) and primarily a retention play.",
          receipts: [{ segmentIds: ["seg-036"], at: 1580 }, { segmentIds: ["seg-037"], at: 1610 }]
        },
        {
          id: "b-10",
          text: "Cross-meeting Ask moves to Q2, strategically paired with the paid tier launch to create an upgrade path.",
          receipts: [{ segmentIds: ["seg-038"], at: 1680 }]
        }
      ]
    },
    {
      heading: "Hiring",
      bullets: [
        {
          id: "b-11",
          text: "When the freeze lifts: senior backend engineer first (Q1 roadmap depends on it), product designer second.",
          receipts: [{ segmentIds: ["seg-047"], at: 2540 }, { segmentIds: ["seg-048"], at: 2580 }]
        },
        {
          id: "b-12",
          text: "Board meeting on the 15th to push for a firm freeze-lift date. Plan on November 15th.",
          receipts: [{ segmentIds: ["seg-052"], at: 2760 }]
        }
      ]
    },
    {
      heading: "Customer communication",
      bullets: [
        {
          id: "b-13",
          text: 'No promises about diarization improvements until the sprint plan is ready. Then share a general "Q1 improvements" message without a specific date.',
          receipts: [{ segmentIds: ["seg-060"], at: 3300 }, { segmentIds: ["seg-061"], at: 3350 }]
        }
      ]
    }
  ]
};
var actions = [
  { id: "act-1", text: "Priya: send pricing draft for async comments by Thursday", ownerId: "sp-priya", done: false, receipts: [{ segmentIds: ["seg-026"], at: 790 }] },
  { id: "act-2", text: "Marcus: draft the tier technical spec and restructure sprint plan by Monday", ownerId: "sp-marcus", done: false, receipts: [{ segmentIds: ["seg-054"], at: 2860 }, { segmentIds: ["seg-041"], at: 1880 }] },
  { id: "act-3", text: "Tom: draft job specs for backend engineer and product designer by Friday", ownerId: "sp-tom", done: false, receipts: [{ segmentIds: ["seg-050"], at: 2610 }] },
  { id: "act-4", text: "Push for a firm freeze-lift date at the board meeting on the 15th", ownerId: "sp-you", done: false, receipts: [{ segmentIds: ["seg-052"], at: 2760 }] },
  { id: "act-5", text: "Aisha: add meeting IDs and timestamps to the 15 tagged diarization bug cases", ownerId: "sp-aisha", done: true, receipts: [{ segmentIds: ["seg-057"], at: 3140 }] }
];
var showpieceMeeting = {
  id: "mtg-q3-roadmap",
  title: "Q3 roadmap sync",
  startedAt: "2026-10-14T14:00:00Z",
  duration: 3480,
  capture: "bot-video",
  status: "ready",
  speakers,
  segments,
  topics,
  moments,
  summary,
  actions,
  isSample: true
};

// src/data/seed/others.ts
var otherMeetings = [
  // ── Processing meeting ────────────────────────────────
  {
    id: "mtg-weekly-standup",
    title: "Weekly standup",
    startedAt: "2026-10-14T16:30:00Z",
    duration: 400,
    capture: "bot-video",
    status: "processing",
    stage: "transcribing",
    speakers: [
      { id: "sp-you-2", name: "You", initials: "Y", colorIndex: 1, talkPct: 40, named: true, isYou: true },
      { id: "sp-jake", name: "Jake Moss", initials: "JM", colorIndex: 2, talkPct: 35, named: true },
      { id: "sp-kim", name: "Kim Tran", initials: "KT", colorIndex: 3, talkPct: 25, named: true }
    ],
    segments: [],
    topics: [],
    moments: [],
    actions: [],
    isSample: true
  },
  // ── Transcript-only (no video) ────────────────────────
  {
    id: "mtg-phone-sync",
    title: "Quick phone sync with vendor",
    startedAt: "2026-10-13T11:00:00Z",
    duration: 720,
    capture: "transcript",
    status: "ready",
    speakers: [
      { id: "sp-you-3", name: "You", initials: "Y", colorIndex: 1, talkPct: 55, named: true, isYou: true },
      { id: "sp-vendor", name: "Alex Rivera", initials: "AR", colorIndex: 2, talkPct: 45, named: true }
    ],
    segments: [
      { id: "ts-001", speakerId: "sp-you-3", start: 0, end: 30, text: "Hey Alex, thanks for hopping on quickly. I wanted to check on the integration timeline." },
      { id: "ts-002", speakerId: "sp-vendor", start: 32, end: 65, text: "Sure thing. We're on track for the API v2 endpoint by end of month. The webhook support might slip a week though." },
      { id: "ts-003", speakerId: "sp-you-3", start: 67, end: 100, text: "That's fine as long as the core auth flow is solid. Our team is building on top of that first." },
      { id: "ts-004", speakerId: "sp-vendor", start: 102, end: 140, text: "Auth is done and deployed to staging. I'll send you the sandbox credentials after this call." },
      { id: "ts-005", speakerId: "sp-you-3", start: 142, end: 170, text: "Perfect. One more thing \u2014 any updates on rate limits? We're expecting bursts during meeting end times." },
      { id: "ts-006", speakerId: "sp-vendor", start: 172, end: 210, text: "We've bumped it to 500 requests per minute per tenant. Should be more than enough for your use case." }
    ],
    topics: [
      { id: "tt-1", title: "Integration timeline", start: 0, end: 100, gist: "API v2 on track, webhooks may slip a week." },
      { id: "tt-2", title: "Auth and rate limits", start: 100, end: 210, gist: "Auth done on staging, rate limit bumped to 500/min." }
    ],
    moments: [
      { id: "tm-1", at: 65, kind: "decision", note: "Webhook slip acceptable" }
    ],
    summary: {
      template: "Standard",
      catchUp: [
        { id: "tc-1", text: "API v2 endpoint on track for end of month. Webhook support may slip one week.", receipts: [{ segmentIds: ["ts-002"], at: 32 }] },
        { id: "tc-2", text: "Auth flow done and deployed to staging. Sandbox credentials to follow.", receipts: [{ segmentIds: ["ts-004"], at: 102 }] }
      ],
      sections: [
        {
          heading: "Integration",
          bullets: [
            { id: "tb-1", text: "API v2 endpoint delivery: end of October.", receipts: [{ segmentIds: ["ts-002"], at: 32 }] },
            { id: "tb-2", text: "Rate limits bumped to 500 requests per minute per tenant.", receipts: [{ segmentIds: ["ts-006"], at: 172 }] }
          ]
        }
      ]
    },
    actions: [
      { id: "ta-1", text: "Alex: send sandbox credentials", ownerId: "sp-vendor", done: false, receipts: [{ segmentIds: ["ts-004"], at: 102 }] }
    ],
    isSample: true
  },
  // ── 1:1 meeting ───────────────────────────────────────
  {
    id: "mtg-1on1-priya",
    title: "1:1 with Priya",
    startedAt: "2026-10-12T10:00:00Z",
    duration: 1800,
    capture: "bot-video",
    status: "ready",
    speakers: [
      { id: "sp-you-4", name: "You", initials: "Y", colorIndex: 1, talkPct: 45, named: true, isYou: true },
      { id: "sp-priya-2", name: "Priya Sharma", initials: "PS", colorIndex: 2, talkPct: 55, named: true }
    ],
    segments: [
      { id: "os-001", speakerId: "sp-you-4", start: 0, end: 25, text: "How's the pricing research going? I know it's been a heavy lift." },
      { id: "os-002", speakerId: "sp-priya-2", start: 27, end: 70, text: "It's going well. I interviewed eight customers last week. The biggest takeaway is that they don't mind paying, they just want to understand exactly what they're getting. The 'limited use' language on competitor sites drives them crazy." },
      { id: "os-003", speakerId: "sp-you-4", start: 72, end: 100, text: "That's great validation for the explicit-limits approach. Anything blocking you?" },
      { id: "os-004", speakerId: "sp-priya-2", start: 102, end: 140, text: "Just bandwidth. I'm also covering the Q3 retrospective deck and the partner onboarding for next week. If I could hand off the retro deck to someone else, I'd have the pricing doc finalized two days earlier." }
    ],
    topics: [
      { id: "ot-1", title: "Pricing research", start: 0, end: 100, gist: "Customer interviews show people want explicit, plain-language limits." },
      { id: "ot-2", title: "Bandwidth", start: 100, end: 140, gist: "Handing off the retro deck would free Priya to finalize pricing faster." }
    ],
    moments: [],
    summary: {
      template: "1:1",
      catchUp: [
        { id: "oc-1", text: "Pricing research: 8 customer interviews completed. Key finding: explicit limits beat vague language.", receipts: [{ segmentIds: ["os-002"], at: 27 }] }
      ],
      sections: [
        {
          heading: "Updates",
          bullets: [
            { id: "ob-1", text: 'Customers interviewed want to see exact query counts and feature access, not "limited use."', receipts: [{ segmentIds: ["os-002"], at: 27 }] },
            { id: "ob-2", text: "Priya juggling pricing doc, Q3 retro deck and partner onboarding.", receipts: [{ segmentIds: ["os-004"], at: 102 }] }
          ]
        }
      ]
    },
    actions: [
      { id: "oa-1", text: "Reassign Q3 retro deck so Priya can focus on pricing", ownerId: "sp-you-4", done: false, receipts: [{ segmentIds: ["os-004"], at: 102 }] }
    ],
    isSample: true
  },
  // ── Sales discovery call ──────────────────────────────
  {
    id: "mtg-sales-discovery",
    title: "Discovery call \u2014 Meridian Health",
    startedAt: "2026-10-11T15:00:00Z",
    duration: 2400,
    capture: "bot-video",
    status: "ready",
    speakers: [
      { id: "sp-you-5", name: "You", initials: "Y", colorIndex: 1, talkPct: 35, named: true, isYou: true },
      { id: "sp-sarah", name: "Sarah Kim", initials: "SK", colorIndex: 2, talkPct: 30, named: true },
      { id: "sp-buyer1", name: "Dr. Raj Patel", initials: "RP", colorIndex: 3, talkPct: 25, named: true },
      { id: "sp-buyer2", name: "Lisa Wong", initials: "LW", colorIndex: 4, talkPct: 10, named: true }
    ],
    segments: [
      { id: "ss-001", speakerId: "sp-you-5", start: 0, end: 30, text: "Thanks for making time, Raj and Lisa. Sarah and I wanted to understand how your team currently handles meeting follow-ups, especially for the clinical review boards." },
      { id: "ss-002", speakerId: "sp-buyer1", start: 32, end: 80, text: "Right now it's manual. Someone takes notes during the board meeting \u2014 usually a resident \u2014 and then types them up afterward. It takes about two hours per meeting, and we have three a week." },
      { id: "ss-003", speakerId: "sp-buyer2", start: 82, end: 115, text: "The bigger problem is accuracy. When we review the notes a week later, there are always disagreements about what was actually decided. It creates friction in the team." }
    ],
    topics: [
      { id: "st-1", title: "Current workflow", start: 0, end: 115, gist: "Manual note-taking by residents, two hours per meeting, three meetings weekly." }
    ],
    moments: [
      { id: "sm-1", at: 80, kind: "question", note: "Pain point: 6+ hours/week on manual notes" }
    ],
    summary: {
      template: "Sales",
      catchUp: [
        { id: "sc-1", text: "Meridian Health runs three clinical review boards per week. Notes are manual, taking ~2 hours each, with accuracy disputes a recurring problem.", receipts: [{ segmentIds: ["ss-002"], at: 32 }, { segmentIds: ["ss-003"], at: 82 }] }
      ],
      sections: [
        {
          heading: "Pain points",
          bullets: [
            { id: "sb-1", text: "6+ hours per week spent on manual meeting notes by residents.", receipts: [{ segmentIds: ["ss-002"], at: 32 }] },
            { id: "sb-2", text: "Disagreements about decisions arise when notes are reviewed a week later.", receipts: [{ segmentIds: ["ss-003"], at: 82 }] }
          ]
        }
      ]
    },
    actions: [],
    isSample: true
  },
  // ── Customer QBR ──────────────────────────────────────
  {
    id: "mtg-customer-qbr",
    title: "QBR \u2014 Nexus Financial",
    startedAt: "2026-10-10T13:00:00Z",
    duration: 3e3,
    capture: "bot-video",
    status: "ready",
    speakers: [
      { id: "sp-you-6", name: "You", initials: "Y", colorIndex: 1, talkPct: 30, named: true, isYou: true },
      { id: "sp-aisha-2", name: "Aisha Okonkwo", initials: "AO", colorIndex: 2, talkPct: 25, named: true },
      { id: "sp-client1", name: "David Park", initials: "DP", colorIndex: 3, talkPct: 25, named: true },
      { id: "sp-client2", name: "Maria Torres", initials: "MT", colorIndex: 4, talkPct: 15, named: true },
      { id: "sp-client3", name: "Speaker 5", initials: "S5", colorIndex: 5, talkPct: 5, named: false }
    ],
    segments: [
      { id: "qs-001", speakerId: "sp-you-6", start: 0, end: 25, text: "David, Maria, thanks for joining us for the quarterly review. Aisha and I will walk through your usage data and then we want to hear what's working and what's not." },
      { id: "qs-002", speakerId: "sp-client1", start: 27, end: 60, text: "Before you start, I want to flag one thing. The transcript quality on our all-hands has been noticeably worse since we moved to 20-person meetings. That's been a real pain point for our compliance team." }
    ],
    topics: [
      { id: "qt-1", title: "Usage review", start: 0, end: 60, gist: "Opening and customer pain point flagged." }
    ],
    moments: [],
    summary: {
      template: "Customer Success",
      catchUp: [
        { id: "qc-1", text: "Nexus flagged transcript quality issues on 20-person all-hands meetings as a blocker for their compliance team.", receipts: [{ segmentIds: ["qs-002"], at: 27 }] }
      ],
      sections: [{ heading: "Issues", bullets: [
        { id: "qb-1", text: "Transcript accuracy degrades on 20+ person calls. Compliance team affected.", receipts: [{ segmentIds: ["qs-002"], at: 27 }] }
      ] }]
    },
    actions: [],
    isSample: true
  },
  // ── Shared with me ────────────────────────────────────
  {
    id: "mtg-shared-design-review",
    title: "Design review \u2014 clips flow",
    startedAt: "2026-10-09T09:00:00Z",
    duration: 2100,
    capture: "bot-video",
    status: "ready",
    speakers: [
      { id: "sp-ella", name: "Ella Chen", initials: "EC", colorIndex: 1, talkPct: 45, named: true },
      { id: "sp-noah", name: "Noah Williams", initials: "NW", colorIndex: 2, talkPct: 35, named: true },
      { id: "sp-maya", name: "Maya Singh", initials: "MS", colorIndex: 3, talkPct: 20, named: true }
    ],
    segments: [
      { id: "ds-001", speakerId: "sp-ella", start: 0, end: 35, text: "I've been working on the clips flow redesign. The main change is that creating a clip starts from the Score \u2014 you drag a range, and the trim editor appears inline instead of opening a separate page." },
      { id: "ds-002", speakerId: "sp-noah", start: 37, end: 70, text: "I like the inline approach. One concern: what happens on mobile? The drag gesture conflicts with scrolling on the Score." }
    ],
    topics: [
      { id: "dt-1", title: "Clips flow redesign", start: 0, end: 70, gist: "Inline clip creation from Score; mobile gesture conflict flagged." }
    ],
    moments: [],
    summary: {
      template: "Product Discovery",
      catchUp: [
        { id: "dc-1", text: "Clips creation redesigned as inline range-drag on the Score. Mobile gesture conflict needs resolution.", receipts: [{ segmentIds: ["ds-001"], at: 0 }, { segmentIds: ["ds-002"], at: 37 }] }
      ],
      sections: [{ heading: "Design decisions", bullets: [
        { id: "db-1", text: "Clip creation starts from Score range selection instead of a separate page.", receipts: [{ segmentIds: ["ds-001"], at: 0 }] }
      ] }]
    },
    actions: [],
    sharedBy: "Ella Chen",
    isSample: true
  },
  // ── Upcoming meeting ──────────────────────────────────
  {
    id: "mtg-upcoming-design",
    title: "Design review",
    startedAt: "2026-10-15T10:30:00Z",
    duration: 0,
    capture: "bot-video",
    status: "upcoming",
    speakers: [],
    segments: [],
    topics: [],
    moments: [],
    actions: [],
    isSample: true
  },
  // ── Another short meeting ─────────────────────────────
  {
    id: "mtg-retro",
    title: "Sprint retrospective",
    startedAt: "2026-10-08T16:00:00Z",
    duration: 1500,
    capture: "audio",
    status: "ready",
    speakers: [
      { id: "sp-you-7", name: "You", initials: "Y", colorIndex: 1, talkPct: 30, named: true, isYou: true },
      { id: "sp-jake-2", name: "Jake Moss", initials: "JM", colorIndex: 2, talkPct: 25, named: true },
      { id: "sp-kim-2", name: "Kim Tran", initials: "KT", colorIndex: 3, talkPct: 20, named: true },
      { id: "sp-noah-2", name: "Noah Williams", initials: "NW", colorIndex: 4, talkPct: 15, named: true },
      { id: "sp-r5", name: "Speaker 5", initials: "S5", colorIndex: 5, talkPct: 10, named: false }
    ],
    segments: [
      { id: "rs-001", speakerId: "sp-you-7", start: 0, end: 20, text: "Let's do a quick retro. What went well this sprint?" },
      { id: "rs-002", speakerId: "sp-jake-2", start: 22, end: 50, text: "The new pipeline for processing large meetings is solid. We cut processing time by 40% on calls over 30 minutes." },
      { id: "rs-003", speakerId: "sp-kim-2", start: 52, end: 80, text: "The design system documentation is finally in a good place. Components are documented and engineers can self-serve." }
    ],
    topics: [
      { id: "rt-1", title: "What went well", start: 0, end: 80, gist: "Pipeline improvements and design system docs." }
    ],
    moments: [],
    summary: {
      template: "Standard",
      catchUp: [
        { id: "rc-1", text: "Processing time reduced 40% on calls over 30 minutes. Design system docs completed.", receipts: [{ segmentIds: ["rs-002"], at: 22 }, { segmentIds: ["rs-003"], at: 52 }] }
      ],
      sections: [{ heading: "Went well", bullets: [
        { id: "rb-1", text: "Large meeting processing pipeline: 40% faster.", receipts: [{ segmentIds: ["rs-002"], at: 22 }] },
        { id: "rb-2", text: "Design system fully documented. Engineers can self-serve.", receipts: [{ segmentIds: ["rs-003"], at: 52 }] }
      ] }]
    },
    actions: [],
    isSample: true
  },
  // ── Another processing meeting ────────────────────────
  {
    id: "mtg-onboarding-call",
    title: "Partner onboarding \u2014 Stratos",
    startedAt: "2026-10-14T09:00:00Z",
    duration: 1200,
    capture: "bot-video",
    status: "processing",
    stage: "summarizing",
    speakers: [
      { id: "sp-you-8", name: "You", initials: "Y", colorIndex: 1, talkPct: 50, named: true, isYou: true },
      { id: "sp-partner", name: "Chris Laurent", initials: "CL", colorIndex: 2, talkPct: 50, named: true }
    ],
    segments: [],
    topics: [],
    moments: [],
    actions: [],
    isSample: true
  },
  // ── Past meetings for search depth ────────────────────
  {
    id: "mtg-pricing-deep-dive",
    title: "Pricing deep dive",
    startedAt: "2026-10-07T14:00:00Z",
    duration: 2700,
    capture: "bot-video",
    status: "ready",
    speakers: [
      { id: "sp-you-9", name: "You", initials: "Y", colorIndex: 1, talkPct: 35, named: true, isYou: true },
      { id: "sp-priya-3", name: "Priya Sharma", initials: "PS", colorIndex: 2, talkPct: 40, named: true },
      { id: "sp-tom-2", name: "Tom Eriksen", initials: "TE", colorIndex: 3, talkPct: 25, named: true }
    ],
    segments: [
      { id: "ps-001", speakerId: "sp-priya-3", start: 0, end: 40, text: "I've modeled three pricing scenarios. Scenario A is a flat $19 per seat. Scenario B is usage-based with a $12 base plus $0.10 per Ask query. Scenario C is the freemium gate I mentioned last week \u2014 free stays unlimited for core features, and we gate Ask and export." },
      { id: "ps-002", speakerId: "sp-you-9", start: 42, end: 80, text: "Walk me through the revenue projections for each. I need to know which one gets us to break-even on the AI compute cost." },
      { id: "ps-003", speakerId: "sp-priya-3", start: 82, end: 130, text: "At current usage levels, Scenario A generates about $380K annually. B is more unpredictable \u2014 could be $280K to $450K depending on adoption curves. C is the most conservative at $310K but has the lowest churn risk because free users never feel a bait-and-switch." },
      { id: "ps-004", speakerId: "sp-tom-2", start: 132, end: 170, text: "From a marketing perspective, C is the easiest to sell. 'Free forever' with a clear upgrade path. B requires explaining metering, which is a harder conversation in the first sales call." }
    ],
    topics: [
      { id: "pt-1", title: "Pricing scenarios", start: 0, end: 170, gist: "Three pricing models compared: flat, usage-based, freemium gate." }
    ],
    moments: [
      { id: "pm-1", at: 130, kind: "decision", note: "Scenario C (freemium gate) preferred for lowest churn risk" }
    ],
    summary: {
      template: "Standard",
      catchUp: [
        { id: "pc-1", text: "Three pricing scenarios compared. Freemium gate (Scenario C) preferred for lowest churn risk at ~$310K ARR.", receipts: [{ segmentIds: ["ps-003"], at: 82 }] }
      ],
      sections: [{ heading: "Analysis", bullets: [
        { id: "pb-1", text: "Flat $19/seat: ~$380K ARR but risks free-user churn.", receipts: [{ segmentIds: ["ps-001"], at: 0 }] },
        { id: "pb-2", text: "Usage-based: $280K\u2013$450K range, unpredictable and harder to sell.", receipts: [{ segmentIds: ["ps-003"], at: 82 }] },
        { id: "pb-3", text: "Freemium gate: ~$310K, easiest to market, lowest churn.", receipts: [{ segmentIds: ["ps-003"], at: 82 }, { segmentIds: ["ps-004"], at: 132 }] }
      ] }]
    },
    actions: [],
    isSample: true
  },
  {
    id: "mtg-eng-planning",
    title: "Engineering planning",
    startedAt: "2026-10-06T11:00:00Z",
    duration: 2400,
    capture: "bot-video",
    status: "ready",
    speakers: [
      { id: "sp-marcus-2", name: "Marcus Chen", initials: "MC", colorIndex: 1, talkPct: 40, named: true },
      { id: "sp-you-10", name: "You", initials: "Y", colorIndex: 2, talkPct: 30, named: true, isYou: true },
      { id: "sp-jake-3", name: "Jake Moss", initials: "JM", colorIndex: 3, talkPct: 20, named: true },
      { id: "sp-kim-3", name: "Kim Tran", initials: "KT", colorIndex: 4, talkPct: 10, named: true }
    ],
    segments: [
      { id: "es-001", speakerId: "sp-marcus-2", start: 0, end: 30, text: "I've broken down the diarization improvement into three phases. Phase one is the speaker embedding model upgrade \u2014 that's the biggest lift but also the highest impact." },
      { id: "es-002", speakerId: "sp-jake-3", start: 32, end: 60, text: "I've been prototyping with the new model. On our test set of 20 eight-person calls, we're seeing a 34% reduction in speaker confusion errors." }
    ],
    topics: [
      { id: "et-1", title: "Diarization phases", start: 0, end: 60, gist: "Three-phase plan; prototype shows 34% error reduction." }
    ],
    moments: [],
    summary: {
      template: "Standard",
      catchUp: [
        { id: "ec-1", text: "Diarization improvement in three phases. Prototype of new speaker embedding shows 34% reduction in confusion errors on 8-person calls.", receipts: [{ segmentIds: ["es-001"], at: 0 }, { segmentIds: ["es-002"], at: 32 }] }
      ],
      sections: [{ heading: "Technical plan", bullets: [
        { id: "eb-1", text: "Phase 1: speaker embedding model upgrade (highest impact).", receipts: [{ segmentIds: ["es-001"], at: 0 }] },
        { id: "eb-2", text: "Prototype results: 34% reduction in speaker confusion on 8-person test set.", receipts: [{ segmentIds: ["es-002"], at: 32 }] }
      ] }]
    },
    actions: [],
    isSample: true
  }
];

// src/content/summaryTemplates.ts
var SUMMARY_TEMPLATES = [
  {
    id: "standard",
    name: "Standard Meeting Recap",
    audience: "General Teams & All-Hands",
    tone: "Crisp, objective, and executive-level",
    description: "High-signal 60-second summary separating key decisions from active follow-up items.",
    sections: [
      { heading: "Key Decisions & Outcomes", instruction: "List major decisions confirmed by attendees with exact timecode receipts.", format: "bullets" },
      { heading: "Action Items & Owners", instruction: "Extract explicit verbal commitments including assigned owner and mentioned deadlines.", format: "checklist" },
      { heading: "Notable Discussion Points", instruction: "Summarize core themes debated, trade-offs evaluated, and context.", format: "bullets" }
    ]
  },
  {
    id: "sales-discovery",
    name: "Sales Discovery & Qualification",
    audience: "Account Executives & Sales Management",
    tone: "Commercial, direct, and outcome-oriented",
    description: "Extracts prospect pain points, current workflow friction, budget parameters, and decision criteria.",
    sections: [
      { heading: "Prospect Pain & Current Stack", instruction: "Identify the exact workflow problems and tools currently used by the prospect.", format: "bullets" },
      { heading: "Budget & Commercial Authority", instruction: "Extract confirmed budget figures, economic buyer identity, and fiscal constraints.", format: "table" },
      { heading: "Agreed Next Steps & Demo Scope", instruction: "Document commitments made for technical evaluation or proposal presentation.", format: "checklist" }
    ]
  },
  {
    id: "sales-meddic",
    name: "Sales Deal Review (MEDDIC)",
    audience: "Revenue Operations & Sales Leadership",
    tone: "Analytical and rigorous",
    description: "Structured enterprise qualification across Metrics, Economic Buyer, Decision Criteria, Decision Process, Identified Pain, and Champion.",
    sections: [
      { heading: "Metrics & Economic Impact", instruction: "Quantifiable business targets (e.g. latency reduction, cost savings, revenue targets).", format: "table" },
      { heading: "Economic Buyer & Decision Process", instruction: "Who controls the budget and what legal/procurement steps are required for sign-off.", format: "bullets" },
      { heading: "Decision Criteria & Competitors", instruction: "Technical and business benchmarks, plus competitor vendors mentioned.", format: "bullets" },
      { heading: "Identified Pain & Champion", instruction: "Specific operational roadblocks and who inside the account is advocating for Fathom.", format: "bullets" }
    ]
  },
  {
    id: "cs-checkin",
    name: "Customer Success Check-In",
    audience: "CSMs & Account Managers",
    tone: "Empathetic and relationship-focused",
    description: "Tracks customer health, platform adoption, open support tickets, and expansion opportunities.",
    sections: [
      { heading: "Account Health & Sentiment", instruction: "Assess overall satisfaction, team sentiment, and recent adoption hurdles.", format: "bullets" },
      { heading: "Feature Feedback & Escalations", instruction: "List specific product feedback, bug reports, or feature requests made by the client.", format: "bullets" },
      { heading: "Renewal & Expansion Signals", instruction: "Identify seat growth requests, upcoming renewal timelines, or contraction risks.", format: "table" },
      { heading: "Agreed Action Items", instruction: "Customer and CSM commitments with direct audio receipts.", format: "checklist" }
    ]
  },
  {
    id: "qbr",
    name: "Quarterly Business Review (QBR)",
    audience: "Executive Sponsors & Business Leaders",
    tone: "Strategic, metric-driven, and forward-looking",
    description: "High-level executive review of past quarter ROI, joint accomplishments, and strategic goals for next quarter.",
    sections: [
      { heading: "Executive Summary & ROI Delivered", instruction: "Summarize total hours saved, adoption velocity, and key milestones accomplished.", format: "prose" },
      { heading: "Strategic Priorities for Next Quarter", instruction: "Document joint goals, new integration rollouts, and organizational expansion plans.", format: "bullets" },
      { heading: "Contract & Governance Review", instruction: "Review licensing terms, data residency compliance, and procurement timelines.", format: "table" }
    ]
  },
  {
    id: "product-discovery",
    name: "Product Discovery & User Research",
    audience: "Product Managers, UX Researchers, Designers",
    tone: "Observational and verbatim-focused",
    description: "Captures user workflows, usability friction, emotional reactions, and direct customer quotes with receipts.",
    sections: [
      { heading: "Observed Workflow & Core Jobs-to-be-Done", instruction: "What was the user attempting to accomplish and how did they navigate the interface?", format: "bullets" },
      { heading: "Verbatim Quotes & Sentiment", instruction: "Extract powerful, unaltered user quotes accompanied by speaker and timecode receipts.", format: "bullets" },
      { heading: "Usability Friction & Blockers", instruction: "Specific UI stumbling blocks, confusing terminology, or missing affordances.", format: "bullets" },
      { heading: "Feature Suggestions & Desired Behavior", instruction: "Explicit ideas and workarounds suggested by the research participant.", format: "bullets" }
    ]
  },
  {
    id: "one-to-one",
    name: "One-to-One (1:1) Sync",
    audience: "Managers and Direct Reports",
    tone: "Supportive, transparent, and growth-oriented",
    description: "Structured manager-report check-in balancing immediate blockers with career development.",
    sections: [
      { heading: "Priorities & Immediate Blockers", instruction: "Current sprint deliverables, cross-functional dependencies, and urgent roadblocks.", format: "bullets" },
      { heading: "Feedback & Career Development", instruction: "Discussion regarding performance, personal growth, learning goals, and wellness.", format: "bullets" },
      { heading: "Mutual Commitments", instruction: "Tasks promised by both the manager and direct report before next sync.", format: "checklist" }
    ]
  },
  {
    id: "candidate-interview",
    name: "Candidate Interview & Assessment",
    audience: "Hiring Managers & Recruiting Teams",
    tone: "Objective, evidence-based, and structured",
    description: "Standardized candidate debrief evaluating technical depth, culture contribution, and role competencies.",
    sections: [
      { heading: "Competency & Technical Evidence", instruction: "Extract candidates specific answers to technical or architectural challenges with receipts.", format: "bullets" },
      { heading: "Leadership & Collaboration Style", instruction: "Candidate responses to conflict resolution, cross-team communication, and ownership.", format: "bullets" },
      { heading: "Candidate Questions & Motivation", instruction: "What questions did the candidate ask about team culture, strategy, and tech stack?", format: "bullets" },
      { heading: "Hiring Recommendation Scorecard", instruction: "Overall impression against rubric criteria with direct spoken evidence.", format: "table" }
    ]
  },
  {
    id: "team-standup",
    name: "Team Standup & Daily Sync",
    audience: "Engineering & Agile Teams",
    tone: "Fast, concise, and focused on momentum",
    description: "Captures yesterday completed deliverables, today focus, and immediate cross-team blockers.",
    sections: [
      { heading: "Completed Yesterday", instruction: "Shipped PRs, completed designs, and resolved tickets.", format: "checklist" },
      { heading: "In Progress Today", instruction: "Active tasks and focal points for each individual speaker.", format: "checklist" },
      { heading: "Blockers & Help Needed", instruction: "Dependencies requiring peer pairing or managerial unblocking.", format: "bullets" }
    ]
  },
  {
    id: "marketing-brainstorm",
    name: "Marketing Brainstorm & Creative Sync",
    audience: "Creative Directors, Copywriters, Growth Leads",
    tone: "Generative, expansive, and high-energy",
    description: "Catalogs campaign concepts, messaging angles, audience hooks, and experimental tactics.",
    sections: [
      { heading: "Top Campaign Angles & Hooks", instruction: "Creative ideas and framing proposed during the brainstorming session.", format: "bullets" },
      { heading: "Content & Channel Experiments", instruction: "Specific distribution channels, formats, and creative deliverables considered.", format: "bullets" },
      { heading: "Actionable Next Steps & Assignments", instruction: "Who will draft creative briefs or build landing page experiments.", format: "checklist" }
    ]
  },
  {
    id: "project-kickoff",
    name: "Project Kickoff & Alignment",
    audience: "Cross-Department Project Leads & Stakeholders",
    tone: "Clear, foundational, and milestone-driven",
    description: "Establishes project scope, key milestones, RACI ownership, and communication cadence.",
    sections: [
      { heading: "Project Scope & Non-Goals", instruction: "Document agreed scope boundaries and explicitly what is out of scope for v1.", format: "bullets" },
      { heading: "Target Milestones & Schedule", instruction: "Agreed delivery dates, beta launch windows, and review checkpoints.", format: "table" },
      { heading: "RACI Ownership Matrix", instruction: "Who is Responsible, Accountable, Consulted, and Informed for each deliverable.", format: "table" }
    ]
  },
  {
    id: "retrospective",
    name: "Sprint Retrospective & Post-Mortem",
    audience: "Sprint Teams & Agile Coaches",
    tone: "Constructive, blameless, and iterative",
    description: "Evaluates what went well, what could be improved, and actionable experiments for the next sprint.",
    sections: [
      { heading: "What Went Well (Celebrate Wins)", instruction: "Highlight successful launches, good collaboration, and velocity improvements.", format: "bullets" },
      { heading: "What Could Be Improved (Friction Points)", instruction: "Document bottlenecks, technical debt, or communication breakdowns observed.", format: "bullets" },
      { heading: "Sprint Action Items & Process Experiments", instruction: "Specific operational changes the team commits to testing in the upcoming cycle.", format: "checklist" }
    ]
  }
];

// server/db/index.ts
var Database = class {
  workspaces = /* @__PURE__ */ new Map();
  users = /* @__PURE__ */ new Map();
  meetings = /* @__PURE__ */ new Map();
  clips = /* @__PURE__ */ new Map();
  shares = /* @__PURE__ */ new Map();
  calendarEvents = /* @__PURE__ */ new Map();
  jobs = /* @__PURE__ */ new Map();
  templates = /* @__PURE__ */ new Map();
  constructor() {
    this.seed();
  }
  seed() {
    const defaultWorkspace = {
      id: "ws-main",
      name: "Acme Product & Growth",
      createdAt: "2026-08-01T09:00:00Z"
    };
    this.workspaces.set(defaultWorkspace.id, defaultWorkspace);
    const defaultUsers = [
      { id: "usr-1", workspaceId: "ws-main", name: "Alex Rivera", email: "alex@acme.corp", avatarColor: "#2563EB" },
      { id: "usr-2", workspaceId: "ws-main", name: "Sarah Chen", email: "sarah@acme.corp", avatarColor: "#059669" },
      { id: "usr-3", workspaceId: "ws-main", name: "Marcus Vance", email: "marcus@acme.corp", avatarColor: "#D97706" },
      { id: "usr-4", workspaceId: "ws-main", name: "Elena Rostova", email: "elena@acme.corp", avatarColor: "#7C3AED" }
    ];
    for (const u of defaultUsers) {
      this.users.set(u.id, u);
    }
    const all = [showpieceMeeting, ...otherMeetings];
    for (const m of all) {
      this.meetings.set(m.id, JSON.parse(JSON.stringify(m)));
    }
    const sampleClip = {
      id: "clip-roadmap-pricing",
      meetingId: "mtg-q3-roadmap",
      start: 360,
      end: 480,
      title: "Usage-based pricing discussion and query limits",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.clips.set(sampleClip.id, sampleClip);
    const sampleShareClip = {
      id: "sh-1",
      token: "demo-clip-1",
      meetingId: "mtg-q3-roadmap",
      clipId: sampleClip.id,
      sharedBy: "Alex Rivera",
      opts: { access: "anyone", includeTranscript: true, includeSummary: true },
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      viewCount: 14
    };
    this.shares.set(sampleShareClip.token, sampleShareClip);
    const sampleShareMeeting = {
      id: "sh-2",
      token: "demo-meeting-1",
      meetingId: "mtg-q3-roadmap",
      sharedBy: "Alex Rivera",
      opts: { access: "anyone", includeTranscript: true, includeSummary: true },
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      viewCount: 28
    };
    this.shares.set(sampleShareMeeting.token, sampleShareMeeting);
    const events = [
      {
        id: "cal-1",
        workspaceId: "ws-main",
        title: "Weekly Leadership Standup",
        startsAt: new Date(Date.now() + 36e5).toISOString(),
        endsAt: new Date(Date.now() + 54e5).toISOString(),
        link: "https://meet.google.com/abc-defg-hij",
        platform: "meet",
        record: true,
        attendees: [
          { name: "Alex Rivera", email: "alex@acme.corp" },
          { name: "Sarah Chen", email: "sarah@acme.corp" }
        ]
      },
      {
        id: "cal-2",
        workspaceId: "ws-main",
        title: "Enterprise Pipeline Review (Q3)",
        startsAt: new Date(Date.now() + 864e5).toISOString(),
        endsAt: new Date(Date.now() + 9e7).toISOString(),
        link: "https://zoom.us/j/9876543210",
        platform: "zoom",
        record: true,
        attendees: [
          { name: "Marcus Vance", email: "marcus@acme.corp" },
          { name: "Elena Rostova", email: "elena@acme.corp" }
        ]
      },
      {
        id: "cal-3",
        workspaceId: "ws-main",
        title: "Customer Onboarding: FinScale AI",
        startsAt: new Date(Date.now() + 1728e5).toISOString(),
        endsAt: new Date(Date.now() + 1764e5).toISOString(),
        link: "https://teams.microsoft.com/l/meetup-join/12345",
        platform: "teams",
        record: false,
        attendees: [
          { name: "Sarah Chen", email: "sarah@acme.corp" },
          { name: "David K.", email: "david@finscale.ai" }
        ]
      }
    ];
    for (const ev of events) {
      this.calendarEvents.set(ev.id, ev);
    }
    for (const t of SUMMARY_TEMPLATES) {
      this.templates.set(t.id, {
        id: t.id,
        name: t.name,
        description: t.description,
        sections: t.sections.map((s) => ({
          key: s.heading.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          title: s.heading,
          instruction: s.instruction
        }))
      });
    }
    this.jobs.set("job-initial-1", {
      id: "job-initial-1",
      type: "ingest",
      meetingId: "mtg-q3-roadmap",
      status: "completed",
      attempts: 1,
      payload: { source: "calendar-bot", format: "pcm_16000" },
      createdAt: "2026-09-24T18:00:00Z",
      completedAt: "2026-09-24T18:02:15Z"
    });
  }
  // --- Meetings CRUD ---
  listMeetings(filter) {
    const list = Array.from(this.meetings.values());
    if (!filter || filter === "all") return list;
    if (filter === "needs-actions") {
      return list.filter(
        (m) => m.actions.some(
          (a) => !a.done && (a.ownerId === "sp-you" || a.ownerId?.includes("you") || !a.ownerId)
        )
      );
    }
    if (filter === "shared-with-me") return list.filter((m) => Boolean(m.sharedBy));
    if (filter === "many-speakers") return list.filter((m) => m.speakers.length >= 5);
    if (filter === "long") return list.filter((m) => m.duration >= 2e3);
    return list;
  }
  getMeeting(id) {
    const m = this.meetings.get(id);
    return m ? JSON.parse(JSON.stringify(m)) : void 0;
  }
  saveMeeting(meeting) {
    this.meetings.set(meeting.id, JSON.parse(JSON.stringify(meeting)));
  }
  renameMeeting(id, title) {
    const m = this.meetings.get(id);
    if (!m) return false;
    m.title = title.trim();
    return true;
  }
  assignSpeaker(meetingId, speakerId, attendeeName) {
    const m = this.meetings.get(meetingId);
    if (!m) return false;
    const sp = m.speakers.find((s) => s.id === speakerId);
    if (!sp) return false;
    sp.name = attendeeName.trim();
    sp.named = true;
    const parts = sp.name.split(" ").filter(Boolean);
    sp.initials = (parts[0]?.[0] || "S") + (parts[1]?.[0] || "");
    return true;
  }
  addHighlight(meetingId, at, note) {
    const m = this.meetings.get(meetingId);
    if (!m) return null;
    const moment = {
      id: `hl-${Date.now()}-${Math.floor(Math.random() * 1e3)}`,
      at: Math.round(at),
      kind: "highlight",
      note: note?.trim(),
      byId: "sp-you"
    };
    m.moments.push(moment);
    m.moments.sort((a, b) => a.at - b.at);
    return moment;
  }
  removeHighlight(meetingId, momentId) {
    const m = this.meetings.get(meetingId);
    if (!m) return false;
    const idx = m.moments.findIndex((x) => x.id === momentId);
    if (idx === -1) return false;
    m.moments.splice(idx, 1);
    return true;
  }
  editBullet(meetingId, bulletId, text) {
    const m = this.meetings.get(meetingId);
    if (!m || !m.summary) return false;
    for (const b of m.summary.catchUp) {
      if (b.id === bulletId) {
        b.text = text;
        b.edited = true;
        return true;
      }
    }
    for (const sec of m.summary.sections) {
      for (const b of sec.bullets) {
        if (b.id === bulletId) {
          b.text = text;
          b.edited = true;
          return true;
        }
      }
    }
    return false;
  }
  flagBullet(meetingId, bulletId, reason) {
    const m = this.meetings.get(meetingId);
    if (!m || !m.summary) return false;
    console.log(`[Bullet Flagged] Meeting ${meetingId}, Bullet ${bulletId}, Reason: ${reason}`);
    return true;
  }
  toggleAction(meetingId, actionId, done) {
    const m = this.meetings.get(meetingId);
    if (!m) return false;
    const a = m.actions.find((x) => x.id === actionId);
    if (!a) return false;
    a.done = done;
    return true;
  }
  switchTemplate(meetingId, template) {
    const m = this.meetings.get(meetingId);
    if (!m) return null;
    const t = SUMMARY_TEMPLATES.find((x) => x.id === template) || SUMMARY_TEMPLATES[0];
    const generated = {
      template: t.id,
      catchUp: [
        {
          id: `b-cu-gen-1`,
          text: `Key alignment achieved across teams for ${m.title} following the ${t.name} framework.`,
          receipts: [{ segmentIds: [m.segments[0]?.id || "s1"], at: m.segments[0]?.start || 0 }]
        },
        {
          id: `b-cu-gen-2`,
          text: `Agreed upon immediate deliverables and follow-up milestones for the upcoming sprint.`,
          receipts: [{ segmentIds: [m.segments[1]?.id || "s2"], at: m.segments[1]?.start || 60 }]
        }
      ],
      sections: t.sections.map((sec, idx) => ({
        heading: sec.heading,
        bullets: [
          {
            id: `b-sec-${idx}-1`,
            text: `Detailed discussion covering: ${sec.instruction.slice(0, 120)}...`,
            receipts: [
              {
                segmentIds: [m.segments[Math.min(idx * 3, m.segments.length - 1)]?.id || "s1"],
                at: m.segments[Math.min(idx * 3, m.segments.length - 1)]?.start || 120
              }
            ]
          }
        ]
      }))
    };
    m.summary = generated;
    return generated;
  }
  // --- Search Engine ---
  search(query, scope, meetingId) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    let targets = Array.from(this.meetings.values());
    if (scope === "meeting" && meetingId) {
      targets = targets.filter((m) => m.id === meetingId);
    }
    const hits = [];
    for (const mtg of targets) {
      for (const seg of mtg.segments) {
        if (seg.text.toLowerCase().includes(q)) {
          const sp = mtg.speakers.find((s) => s.id === seg.speakerId);
          hits.push({
            meetingId: mtg.id,
            meetingTitle: mtg.title,
            segmentId: seg.id,
            speakerName: sp?.name || "Unknown Speaker",
            speakerInitials: sp?.initials || "U",
            time: seg.start,
            text: seg.text,
            context: `Found in ${mtg.title}`
          });
        }
      }
    }
    return hits.slice(0, 40);
  }
  // --- Clips & Shares ---
  createClip(meetingId, start, end, title) {
    const m = this.meetings.get(meetingId);
    if (!m) return null;
    const clip = {
      id: `clip-${Date.now()}`,
      meetingId,
      start: Math.round(start),
      end: Math.round(end),
      title: title.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.clips.set(clip.id, clip);
    return clip;
  }
  createShare(target, opts) {
    const token = `share-${Math.random().toString(36).substring(2, 9)}`;
    const record = {
      id: `sh-${Date.now()}`,
      token,
      meetingId: target.meetingId || "",
      clipId: target.clipId,
      sharedBy: "Alex Rivera",
      opts,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      viewCount: 0
    };
    this.shares.set(token, record);
    return {
      id: record.id,
      token,
      url: `/s/${token}`,
      createdAt: record.createdAt
    };
  }
  getShared(token) {
    const record = this.shares.get(token);
    if (!record) return null;
    record.viewCount++;
    const meeting = this.meetings.get(record.meetingId);
    if (!meeting) return null;
    let clip;
    if (record.clipId) {
      clip = this.clips.get(record.clipId);
    }
    return {
      clip,
      meeting: JSON.parse(JSON.stringify(meeting)),
      sharedBy: record.sharedBy,
      access: record.opts.access
    };
  }
  // --- Calendar Events ---
  listCalendarEvents() {
    return Array.from(this.calendarEvents.values());
  }
  toggleCalendarRecord(id, record) {
    const ev = this.calendarEvents.get(id);
    if (!ev) return false;
    ev.record = record;
    return true;
  }
  // --- Jobs ---
  listJobs() {
    return Array.from(this.jobs.values());
  }
  createJob(type, meetingId, payload) {
    const job = {
      id: `job-${Date.now()}-${Math.floor(Math.random() * 1e3)}`,
      type,
      meetingId,
      status: "pending",
      attempts: 0,
      payload,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.jobs.set(job.id, job);
    return job;
  }
};
var db = new Database();

// server/ai/ask.ts
async function* streamAskAnswer(query, scope, meetingId) {
  const q = query.trim().toLowerCase();
  let targetMeeting;
  if (meetingId) {
    targetMeeting = db.getMeeting(meetingId);
  } else {
    targetMeeting = db.getMeeting("mtg-q3-roadmap");
  }
  const relevantSegments = targetMeeting?.segments.filter(
    (s) => s.text.toLowerCase().includes(q) || q.split(" ").some((word) => word.length > 3 && s.text.toLowerCase().includes(word))
  ) || [];
  const citationSeg = relevantSegments[0] || targetMeeting?.segments[1] || { id: "seg-1", start: 60, text: "Roadmap discussion" };
  let answerText = "";
  if (q.includes("price") || q.includes("cost") || q.includes("plan")) {
    answerText = `Based on the discussion, the team established that usage-based tiers will protect pipeline margins while maintaining transparent query thresholds for self-serve users.`;
  } else if (q.includes("timeline") || q.includes("date") || q.includes("when")) {
    answerText = `The rollout timeline is scheduled for late Q3, with staging verification targeted 2 weeks prior to enterprise migration.`;
  } else if (q.includes("action") || q.includes("next step") || q.includes("who")) {
    answerText = `Sarah and Alex are leading the architectural reviews, with immediate deliverable documentation due before the next sprint kickoff.`;
  } else {
    answerText = `During the session, attendees reviewed key deliverables for "${targetMeeting?.title || "the roadmap"}", emphasizing reliability, structured schemas, and cross-team alignment.`;
  }
  const words = answerText.split(" ");
  for (let i = 0; i < words.length; i++) {
    yield {
      type: "text",
      content: words[i] + " "
    };
    await new Promise((r) => setTimeout(r, 20));
  }
  yield {
    type: "citation",
    content: `[${Math.floor(citationSeg.start / 60)}:${String(Math.floor(citationSeg.start % 60)).padStart(2, "0")}]`,
    citationIndex: 1,
    meetingId: targetMeeting?.id,
    segmentId: citationSeg.id,
    time: citationSeg.start
  };
  yield {
    type: "done",
    content: ""
  };
}

// server/pipeline/normalise.ts
function normalise(rawSegments) {
  if (rawSegments.length === 0) {
    return { speakers: [], segments: [], duration: 0 };
  }
  const speakerMap = /* @__PURE__ */ new Map();
  let nextColorIndex = 1;
  for (const raw of rawSegments) {
    const name = raw.speakerName.trim() || "Speaker";
    const dur = Math.max(1, raw.end - raw.start);
    if (!speakerMap.has(name)) {
      speakerMap.set(name, {
        totalTime: dur,
        colorIndex: nextColorIndex
      });
      nextColorIndex = nextColorIndex % 8 + 1;
    } else {
      const entry = speakerMap.get(name);
      entry.totalTime += dur;
    }
  }
  let maxEnd = 0;
  for (const s of rawSegments) {
    if (s.end > maxEnd) maxEnd = s.end;
  }
  const totalMeetingDuration = Math.max(1, maxEnd);
  const speakers2 = [];
  const speakerNameToId = /* @__PURE__ */ new Map();
  let spIndex = 1;
  for (const [name, meta] of speakerMap.entries()) {
    const id = `sp-${spIndex++}`;
    speakerNameToId.set(name, id);
    const parts = name.split(" ").filter(Boolean);
    const initials = (parts[0]?.[0] || "S") + (parts[1]?.[0] || "");
    speakers2.push({
      id,
      name,
      initials,
      colorIndex: meta.colorIndex,
      talkPct: Math.round(meta.totalTime / totalMeetingDuration * 100),
      named: true,
      isYou: name.toLowerCase().includes("you") || name.toLowerCase().includes("alex")
    });
  }
  const segments2 = [];
  let segIndex = 1;
  for (let i = 0; i < rawSegments.length; i++) {
    const cur = rawSegments[i];
    const spId = speakerNameToId.get(cur.speakerName.trim() || "Speaker") || "sp-1";
    if (segments2.length > 0) {
      const prev = segments2[segments2.length - 1];
      if (prev.speakerId === spId && cur.start - prev.end <= 1.5) {
        prev.end = cur.end;
        prev.text = `${prev.text} ${cur.text.trim()}`;
        continue;
      }
    }
    segments2.push({
      id: `seg-${segIndex++}`,
      speakerId: spId,
      start: cur.start,
      end: cur.end,
      text: cur.text.trim()
    });
  }
  return {
    speakers: speakers2,
    segments: segments2,
    duration: Math.round(totalMeetingDuration)
  };
}

// server/pipeline/chapter.ts
function detectChapters(segments2, duration) {
  if (segments2.length === 0) return [];
  if (duration <= 300) {
    return [
      {
        id: "top-1",
        title: "Call Overview & Discussion",
        start: 0,
        end: duration,
        gist: "Full call dialogue and key exchange."
      }
    ];
  }
  const targetCount = Math.max(2, Math.min(6, Math.round(duration / 600)));
  const chunkDuration = duration / targetCount;
  const topics2 = [];
  const genericTitles = [
    { title: "Introductions & Context Alignment", gist: "Opening remarks, status updates, and session framing." },
    { title: "Core Architectural / Problem Deep-Dive", gist: "Detailed evaluation of obstacles, user feedback, and technical parameters." },
    { title: "Tradeoffs & Decision Exploration", gist: "Comparing implementation strategies, timelines, and resourcing requirements." },
    { title: "Roadmap & Pipeline Review", gist: "Sprint scope planning, milestone targets, and operational priorities." },
    { title: "Action Items & Next Steps Alignment", gist: "Assigning deliverables, review dates, and next follow-up call." }
  ];
  for (let i = 0; i < targetCount; i++) {
    const start = Math.round(i * chunkDuration);
    const end = Math.round(i === targetCount - 1 ? duration : (i + 1) * chunkDuration);
    const preset = genericTitles[i % genericTitles.length];
    topics2.push({
      id: `top-${i + 1}`,
      title: preset.title,
      start,
      end,
      gist: preset.gist
    });
  }
  return topics2;
}

// server/pipeline/summarise.ts
function generateSummary(title, segments2, topics2, templateId = "standard") {
  const template = SUMMARY_TEMPLATES.find((t) => t.id === templateId) || SUMMARY_TEMPLATES[0];
  const catchUp = [
    {
      id: `cu-gen-1`,
      text: `Aligned on strategic objectives for "${title}" across ${topics2.length} key discussion chapters.`,
      receipts: [{ segmentIds: [segments2[0]?.id || "s1"], at: segments2[0]?.start || 0 }]
    },
    {
      id: `cu-gen-2`,
      text: `Evaluated technical constraints, delivery milestones, and immediate cross-functional dependencies.`,
      receipts: [
        {
          segmentIds: [segments2[Math.floor(segments2.length / 2)]?.id || "s2"],
          at: segments2[Math.floor(segments2.length / 2)]?.start || 60
        }
      ]
    }
  ];
  const sections = template.sections.map((sec, secIdx) => {
    const matchingTopic = topics2[secIdx % topics2.length];
    const segSample = segments2.find((s) => s.start >= matchingTopic.start) || segments2[0];
    const bullets = [
      {
        id: `sec-${secIdx}-b1`,
        text: `Discussed: ${sec.instruction.slice(0, 100)}. Focused on ${matchingTopic.title.toLowerCase()}.`,
        receipts: [{ segmentIds: [segSample?.id || "s1"], at: segSample?.start || matchingTopic.start }]
      },
      {
        id: `sec-${secIdx}-b2`,
        text: `Key takeaway: ${matchingTopic.gist}`,
        receipts: [{ segmentIds: [segSample?.id || "s1"], at: Math.min(matchingTopic.end, matchingTopic.start + 45) }]
      }
    ];
    return {
      heading: sec.heading,
      bullets
    };
  });
  return {
    template: template.id,
    catchUp,
    sections
  };
}

// server/pipeline/actions.ts
function extractActionItems(segments2, speakers2) {
  if (segments2.length === 0) return [];
  const actions2 = [];
  const actionVerbs = ["follow up", "send", "review", "update", "schedule", "prepare", "investigate", "share"];
  let actionIndex = 1;
  for (const seg of segments2) {
    const textLower = seg.text.toLowerCase();
    const hasActionTrigger = actionVerbs.some((v) => textLower.includes(v)) || textLower.includes("will") || textLower.includes("need to");
    if (hasActionTrigger && actions2.length < 5) {
      const sp = speakers2.find((s) => s.id === seg.speakerId) || speakers2[0];
      actions2.push({
        id: `act-gen-${actionIndex++}`,
        text: `Action: ${seg.text.slice(0, 80).trim()}${seg.text.length > 80 ? "..." : ""}`,
        ownerId: sp.id,
        done: false,
        receipts: [
          {
            segmentIds: [seg.id],
            at: seg.start
          }
        ]
      });
    }
  }
  if (actions2.length === 0) {
    actions2.push(
      {
        id: "act-gen-1",
        text: "Document and circulate architectural decision record to attendees",
        ownerId: speakers2[0]?.id || "sp-1",
        done: false,
        receipts: [{ segmentIds: [segments2[0]?.id || "s1"], at: segments2[0]?.start || 0 }]
      },
      {
        id: "act-gen-2",
        text: "Schedule follow-up sprint alignment review for next Tuesday",
        ownerId: speakers2[1]?.id || speakers2[0]?.id || "sp-1",
        done: false,
        receipts: [{ segmentIds: [segments2[segments2.length - 1]?.id || "s2"], at: segments2[segments2.length - 1]?.start || 30 }]
      }
    );
  }
  return actions2;
}

// server/pipeline/index.ts
function processMeeting(input) {
  const meetingId = `mtg-${Date.now()}`;
  const job = db.createJob("ingest", meetingId, { title: input.title });
  try {
    job.status = "running";
    const { speakers: speakers2, segments: segments2, duration } = normalise(input.rawSegments);
    const topics2 = detectChapters(segments2, duration);
    const summary2 = generateSummary(input.title, segments2, topics2, input.templateId || "standard");
    const actions2 = extractActionItems(segments2, speakers2);
    const moments2 = [
      {
        id: `hl-initial-1`,
        at: Math.round(duration * 0.15),
        kind: "highlight",
        note: "Strategic objective alignment",
        byId: speakers2[0]?.id
      },
      {
        id: `hl-initial-2`,
        at: Math.round(duration * 0.65),
        kind: "decision",
        note: "Approved roadmap milestones",
        byId: speakers2[1]?.id || speakers2[0]?.id
      }
    ];
    const meeting = {
      id: meetingId,
      title: input.title,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      duration,
      capture: "audio",
      status: "ready",
      speakers: speakers2,
      segments: segments2,
      topics: topics2,
      moments: moments2,
      summary: summary2,
      actions: actions2
    };
    db.saveMeeting(meeting);
    job.status = "completed";
    job.completedAt = (/* @__PURE__ */ new Date()).toISOString();
    return meeting;
  } catch (err) {
    job.status = "failed";
    job.error = err instanceof Error ? err.message : String(err);
    throw err;
  }
}

// server/routes/api.ts
var apiRouter = Router();
apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    meetingsCount: db.meetings.size,
    clipsCount: db.clips.size,
    sharesCount: db.shares.size
  });
});
apiRouter.get("/meetings", (req, res) => {
  const filter = req.query.filter;
  const list = db.listMeetings(filter);
  res.json(list);
});
apiRouter.get("/meetings/:id", (req, res) => {
  const id = String(req.params.id);
  const mtg = db.getMeeting(id);
  if (!mtg) {
    res.status(404).json({ error: `Meeting not found: ${id}` });
    return;
  }
  res.json(mtg);
});
apiRouter.patch("/meetings/:id", (req, res) => {
  const id = String(req.params.id);
  const { title } = req.body;
  if (typeof title !== "string") {
    res.status(400).json({ error: "Title must be a string" });
    return;
  }
  const ok = db.renameMeeting(id, title);
  if (!ok) {
    res.status(404).json({ error: "Meeting not found" });
    return;
  }
  res.json({ success: true, title });
});
apiRouter.patch("/meetings/:id/speakers/:speakerId", (req, res) => {
  const id = String(req.params.id);
  const speakerId = String(req.params.speakerId);
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    res.status(400).json({ error: "Valid speaker name required" });
    return;
  }
  const ok = db.assignSpeaker(id, speakerId, name);
  if (!ok) {
    res.status(404).json({ error: "Meeting or speaker not found" });
    return;
  }
  res.json({ success: true });
});
apiRouter.post("/meetings/:id/highlights", (req, res) => {
  const id = String(req.params.id);
  const { at, note } = req.body;
  if (typeof at !== "number") {
    res.status(400).json({ error: 'Numeric "at" timestamp required' });
    return;
  }
  const moment = db.addHighlight(id, at, note);
  if (!moment) {
    res.status(404).json({ error: "Meeting not found" });
    return;
  }
  res.status(201).json(moment);
});
apiRouter.delete("/meetings/:id/highlights/:momentId", (req, res) => {
  const id = String(req.params.id);
  const momentId = String(req.params.momentId);
  const ok = db.removeHighlight(id, momentId);
  if (!ok) {
    res.status(404).json({ error: "Moment not found" });
    return;
  }
  res.json({ success: true });
});
apiRouter.patch("/meetings/:id/bullets/:bulletId", (req, res) => {
  const id = String(req.params.id);
  const bulletId = String(req.params.bulletId);
  const { text } = req.body;
  if (typeof text !== "string") {
    res.status(400).json({ error: "Text required" });
    return;
  }
  const ok = db.editBullet(id, bulletId, text);
  if (!ok) {
    res.status(404).json({ error: "Bullet or meeting not found" });
    return;
  }
  res.json({ success: true });
});
apiRouter.post("/meetings/:id/bullets/:bulletId/flag", (req, res) => {
  const id = String(req.params.id);
  const bulletId = String(req.params.bulletId);
  const { reason } = req.body;
  const ok = db.flagBullet(id, bulletId, reason || "Inaccurate");
  if (!ok) {
    res.status(404).json({ error: "Meeting not found" });
    return;
  }
  res.json({ success: true, flagged: true });
});
apiRouter.patch("/meetings/:id/actions/:actionId", (req, res) => {
  const id = String(req.params.id);
  const actionId = String(req.params.actionId);
  const { done } = req.body;
  if (typeof done !== "boolean") {
    res.status(400).json({ error: 'Boolean "done" required' });
    return;
  }
  const ok = db.toggleAction(id, actionId, done);
  if (!ok) {
    res.status(404).json({ error: "Action item not found" });
    return;
  }
  res.json({ success: true, done });
});
apiRouter.post("/meetings/:id/summary/template", (req, res) => {
  const id = String(req.params.id);
  const { template } = req.body;
  if (!template || typeof template !== "string") {
    res.status(400).json({ error: "Template ID required" });
    return;
  }
  const summary2 = db.switchTemplate(id, template);
  if (!summary2) {
    res.status(404).json({ error: "Meeting not found" });
    return;
  }
  res.json(summary2);
});
apiRouter.get("/templates", (_req, res) => {
  res.json(Array.from(db.templates.values()));
});
apiRouter.get("/search", (req, res) => {
  const q = req.query.q || "";
  const scope = req.query.scope || "team";
  const meetingId = req.query.meetingId;
  const hits = db.search(q, scope, meetingId);
  res.json(hits);
});
apiRouter.get("/ask", async (req, res) => {
  const q = req.query.q || "Summarize key points";
  const scope = req.query.scope || "team";
  const meetingId = req.query.meetingId;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();
  for await (const chunk of streamAskAnswer(q, scope, meetingId)) {
    res.write(`data: ${JSON.stringify(chunk)}

`);
  }
  res.end();
});
apiRouter.post("/clips", (req, res) => {
  const { meetingId, start, end, title } = req.body;
  if (!meetingId || typeof start !== "number" || typeof end !== "number") {
    res.status(400).json({ error: "Missing required clip parameters" });
    return;
  }
  const clip = db.createClip(meetingId, start, end, title || "Highlight clip");
  if (!clip) {
    res.status(404).json({ error: "Meeting not found" });
    return;
  }
  res.status(201).json(clip);
});
apiRouter.post("/shares", (req, res) => {
  const { target, opts } = req.body;
  if (!target || !opts) {
    res.status(400).json({ error: "Target and options required" });
    return;
  }
  const share = db.createShare(target, opts);
  res.status(201).json(share);
});
apiRouter.get("/shares/:token", (req, res) => {
  const token = String(req.params.token);
  const shared = db.getShared(token);
  if (!shared) {
    res.status(404).json({ error: "Share link expired or not found" });
    return;
  }
  res.json(shared);
});
apiRouter.get("/calendar", (_req, res) => {
  res.json(db.listCalendarEvents());
});
apiRouter.patch("/calendar/:id", (req, res) => {
  const id = String(req.params.id);
  const { record } = req.body;
  if (typeof record !== "boolean") {
    res.status(400).json({ error: 'Boolean "record" parameter required' });
    return;
  }
  const ok = db.toggleCalendarRecord(id, record);
  if (!ok) {
    res.status(404).json({ error: "Calendar event not found" });
    return;
  }
  res.json({ success: true, record });
});
apiRouter.post("/pipeline/process", (req, res) => {
  const { title, rawSegments, templateId, platform } = req.body;
  if (!title || !Array.isArray(rawSegments)) {
    res.status(400).json({ error: "Title and array of rawSegments required" });
    return;
  }
  try {
    const meeting = processMeeting({ title, rawSegments, templateId, platform });
    res.status(201).json(meeting);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});
apiRouter.get("/jobs", (_req, res) => {
  res.json(db.listJobs());
});

// server/app.ts
var app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use((req, _res, next) => {
  const start = Date.now();
  next();
  const dur = Date.now() - start;
  if (!req.url.startsWith("/api/ask")) {
    console.log(`[API] ${req.method} ${req.url} - ${dur}ms`);
  }
});
app.use("/api", apiRouter);
app.use(apiRouter);
app.get("/", (_req, res) => {
  res.json({
    name: "Fanthom AI Backend Engine",
    version: "1.0.0",
    documentation: "/developers/reference",
    health: "/api/health"
  });
});
var app_default = app;
export {
  app,
  app_default as default
};
