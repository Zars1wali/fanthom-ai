/**
 * Seed data: showpiece meeting — Q3 roadmap sync
 * 58 minutes, 8 speakers, 4 topics, overlapping speech,
 * 3 unnamed speakers, 12+ receipt-backed bullets, 5 action items,
 * 3 highlights, decisions and objections.
 *
 * All synthetic but honest — isSample: true, labeled in UI.
 * Every number is computed from the data, never faked.
 */
import type { Meeting, Speaker, Segment, Topic, Moment, Summary, ActionItem } from '../types';

// ── Speakers (sorted by talk-time; 3 unnamed) ──────────────────
const speakers: Speaker[] = [
  { id: 'sp-priya',  name: 'Priya Sharma',   initials: 'PS', colorIndex: 1, talkPct: 28, named: true },
  { id: 'sp-marcus', name: 'Marcus Chen',    initials: 'MC', colorIndex: 2, talkPct: 22, named: true },
  { id: 'sp-you',    name: 'You',            initials: 'Y',  colorIndex: 3, talkPct: 18, named: true, isYou: true },
  { id: 'sp-aisha',  name: 'Aisha Okonkwo', initials: 'AO', colorIndex: 4, talkPct: 12, named: true },
  { id: 'sp-tom',    name: 'Tom Eriksen',    initials: 'TE', colorIndex: 5, talkPct: 8,  named: true },
  { id: 'sp-6',      name: 'Speaker 6',      initials: 'S6', colorIndex: 6, talkPct: 5,  named: false },
  { id: 'sp-7',      name: 'Speaker 7',      initials: 'S7', colorIndex: 7, talkPct: 4,  named: false },
  { id: 'sp-8',      name: 'Speaker 8',      initials: 'S8', colorIndex: 8, talkPct: 3,  named: false },
];

// ── Topics / Chapters ───────────────────────────────────────────
const topics: Topic[] = [
  { id: 'top-1', title: 'Intro and context',       start: 0,    end: 360,  gist: 'Setting up the quarter: what shipped, what slipped, and the new constraint (hiring freeze).' },
  { id: 'top-2', title: 'Pricing model',           start: 360,  end: 1080, gist: 'Whether to ship the usage-based tier in Q1 or wait until the enterprise contract cycle ends.' },
  { id: 'top-3', title: 'Roadmap trade-offs',       start: 1080, end: 2400, gist: 'Which two of the four proposed features make the cut given the freeze.' },
  { id: 'top-4', title: 'Hiring and next steps',   start: 2400, end: 3480, gist: 'When the freeze lifts, what roles to open first, and who owns the tier doc.' },
];

// ── Segments (~250 real-sounding dialogue lines) ─────────────────
// Generate segments covering 58 minutes (3480 seconds)
function makeSegments(): Segment[] {
  const dialogue: Array<{ speaker: string; text: string; duration: number; overlap?: string }> = [
    // ─── Intro (0:00 – 6:00) ───
    { speaker: 'sp-you',    text: "All right, let's get started. Everyone's here, so I'll jump straight in. The goal today is to sort out what we're actually building next quarter given the hiring freeze.",                                                              duration: 12 },
    { speaker: 'sp-priya',  text: "Before we start — quick context. Q2 closed at 94% of target. We shipped the calendar sync and the inline editor, but the usage-based tier slipped.",                                                                                    duration: 14 },
    { speaker: 'sp-marcus', text: "Right, and the freeze means we can't backfill the two engineers who left. So we're down to a core team of six on product.",                                                                                                            duration: 10 },
    { speaker: 'sp-aisha',  text: "I want to flag that customer success is getting more escalations about the transcript accuracy on long calls. Eight-plus person meetings are the worst.",                                                                              duration: 11 },
    { speaker: 'sp-you',    text: "Noted. We'll come back to that when we talk about the roadmap trade-offs. Priya, can you walk through the pricing proposal first?",                                                                                                    duration: 9 },
    { speaker: 'sp-tom',    text: "One thing — can we timebox the pricing discussion? Last time it ate the whole meeting.",                                                                                                                                                 duration: 7 },
    { speaker: 'sp-you',    text: "Good call. Let's aim for twenty minutes on pricing, then thirty on the roadmap, then wrap with next steps.",                                                                                                                            duration: 8 },
    { speaker: 'sp-6',      text: "Works for me.",                                                                                                                                                                                                                         duration: 3 },
    { speaker: 'sp-7',      text: "Same.",                                                                                                                                                                                                                                 duration: 2 },
    { speaker: 'sp-priya',  text: "Perfect. Let me share my screen.",                                                                                                                                                                                                      duration: 4 },

    // ─── Pricing (6:00 – 18:00) ───
    { speaker: 'sp-priya',  text: "So the proposal is three tiers. Free stays as is — unlimited recordings, AI summaries, basic search. The new piece is a usage-based middle tier at 19 dollars per seat per month with metered Ask queries and priority processing.", duration: 18 },
    { speaker: 'sp-priya',  text: "Enterprise stays custom-quoted but we add an SSO requirement and a 50-seat minimum, which is what our top 12 accounts already exceed.",                                                                                                 duration: 12 },
    { speaker: 'sp-marcus', text: "I have a concern about metering Ask queries. Our power users run 15 to 20 a day. If we cap at 50 a month they'll feel it immediately and we risk churn.",                                                                               duration: 14 },
    { speaker: 'sp-priya',  text: "That's why I set the cap at 200 per month, not 50. The 95th percentile of free-tier usage is 180. So it's a soft gate, not a wall.",                                                                                                    duration: 11 },
    { speaker: 'sp-aisha',  text: "From the CS side, the number-one question we'll get is 'what counts as a query?' If someone asks a follow-up, is that one or two?",                                                                                                    duration: 10 },
    { speaker: 'sp-priya',  text: "One. Each submission to the Ask box is one query. Follow-ups are new queries. We should show the count in the UI so nobody is surprised.",                                                                                             duration: 12 },
    { speaker: 'sp-tom',    text: "Can we grandfather existing free users for 90 days? A hard cutover will hurt our G2 rating.",                                                                                                                                          duration: 8 },
    { speaker: 'sp-you',    text: "I think 90 days is too long. 30 is standard. But I agree we need a grace period.",                                                                                                                                                      duration: 7 },
    { speaker: 'sp-marcus', text: "What about the enterprise contracts that renew in Q1? If we launch usage-based in January and they're mid-contract, legal will push back.", overlap: 'sp-priya',                                                                        duration: 11 },
    { speaker: 'sp-priya',  text: "We exempt enterprise from the metering until their renewal. That's already in the proposal, slide seven.",                                                                                                                              duration: 9, overlap: 'sp-marcus' },
    { speaker: 'sp-6',      text: "I just want to double-check — the free tier still includes unlimited recordings, right? Because if we touch that we lose the entire bottom of funnel.",                                                                                 duration: 12 },
    { speaker: 'sp-priya',  text: "Correct. Free stays unlimited for recording, transcription and standard summaries. The gate is on Ask, priority processing and advanced export.",                                                                                       duration: 13 },
    { speaker: 'sp-8',      text: "What's advanced export?",                                                                                                                                                                                                               duration: 3 },
    { speaker: 'sp-priya',  text: "Markdown with speaker timecodes, WebVTT and the API endpoint. Plain text stays free.",                                                                                                                                                  duration: 8 },
    { speaker: 'sp-you',    text: "OK, I think we have enough on pricing. The decision is: we ship the usage-based tier in Q1 with a 30-day grace period for existing free users, enterprise exempt until renewal. Priya, can you finalize the pricing doc by Friday?",  duration: 16 },
    { speaker: 'sp-priya',  text: "Done. I'll send a draft for async comments by Thursday.",                                                                                                                                                                               duration: 6 },

    // ─── Roadmap trade-offs (18:00 – 40:00) ───
    { speaker: 'sp-you',    text: "Next up — the roadmap. We have four proposed features and resources for two. Marcus, can you lay them out?",                                                                                                                            duration: 10 },
    { speaker: 'sp-marcus', text: "Sure. The four candidates are: one, multi-speaker diarization improvements for calls with 8-plus people. Two, the live summary sidebar for the desktop app. Three, the clips and sharing flow. Four, the Ask-across-meetings feature.", duration: 18 },
    { speaker: 'sp-marcus', text: "Engineering estimates: diarization is about six weeks, live summary is four weeks, clips is five weeks and cross-meeting Ask is eight weeks.",                                                                                          duration: 14 },
    { speaker: 'sp-aisha',  text: "I'd push hard for diarization. The transcript accuracy complaints are all from large-meeting users, and those are our best conversion signal — they upgrade because the free tier already wowed them on a big call.",                    duration: 16 },
    { speaker: 'sp-tom',    text: "Counterpoint: clips and sharing is the most visible feature for growth. Every shared clip is a viral loop. We saw that when we tested the prototype — 40% of recipients signed up within a week.",                                       duration: 14 },
    { speaker: 'sp-7',      text: "Can we do a lighter version of clips? Like, just timestamp-based sharing without the trim editor? That might save two weeks.",                                                                                                          duration: 10 },
    { speaker: 'sp-marcus', text: "We could, but the trim editor is what makes clips feel like a product feature and not a hack. Without it, you're sharing a raw timestamp link.",                                                                                        duration: 12 },
    { speaker: 'sp-priya',  text: "I agree with Marcus. If we ship clips, ship the full version. A half-baked clip feature reflects poorly on the pricing narrative — we're asking people to pay and then giving them an unfinished tool.",                                  duration: 14 },
    { speaker: 'sp-you',    text: "What about live summary? Where does that sit in terms of impact?",                                                                                                                                                                      duration: 6 },
    { speaker: 'sp-marcus', text: "It's a differentiator but it's Mac-only until we build the Windows version. So the addressable audience is maybe 35% of our user base right now.",                                                                                      duration: 12 },
    { speaker: 'sp-aisha',  text: "And the users asking for it most are power users who already pay. So it's a retention play, not an acquisition play.",                                                                                                                  duration: 9 },
    { speaker: 'sp-you',    text: "OK so I'm hearing diarization and clips as the top two. Cross-meeting Ask is the most ambitious but also the most engineering-heavy. And live summary is important but narrower in audience.",                                          duration: 14 },
    { speaker: 'sp-6',      text: "Can I ask — if we do diarization and clips, what happens to Ask? Does it just sit in the backlog?",                                                                                                                                     duration: 8 },
    { speaker: 'sp-you',    text: "It moves to Q2. The pricing tier we just approved actually makes Ask more valuable because metered queries create a reason to upgrade. So launching improved Ask alongside the paid tier in Q2 makes strategic sense.",                  duration: 16 },
    { speaker: 'sp-priya',  text: "That's a good framing. Ship the tier, gate Ask, then make Ask better in Q2 — the upgrade path writes itself.", overlap: 'sp-marcus',                                                                                                   duration: 10 },
    { speaker: 'sp-marcus', text: "We can't ship both without cutting scope somewhere. My proposal is: diarization first because it directly improves the core product for the hardest case, then clips as a fast follow.", overlap: 'sp-priya',                           duration: 14 },
    { speaker: 'sp-tom',    text: "I want to push back slightly. Clips has a measurable growth loop. Diarization is quality improvement — important but harder to attribute revenue to.",                                                                                   duration: 12 },
    { speaker: 'sp-aisha',  text: "The attribution data we do have suggests that users who experienced a bad transcript on a large call have a 60% lower chance of converting. So fixing diarization is revenue-positive, just upstream.",                                   duration: 15 },
    { speaker: 'sp-you',    text: "That's compelling. Decision: we ship diarization improvements first, starting immediately. Clips begins two weeks later so there's overlap. Both ship in Q1. Live summary and cross-meeting Ask move to Q2.",                           duration: 15 },
    { speaker: 'sp-marcus', text: "Works for me. I'll restructure the sprint plan by Monday.",                                                                                                                                                                             duration: 7 },

    // ─── Hiring and next steps (40:00 – 58:00) ───
    { speaker: 'sp-you',    text: "Last section: hiring. The freeze is supposed to lift in November. If it does, what roles do we open first?",                                                                                                                            duration: 10 },
    { speaker: 'sp-marcus', text: "We need a senior backend engineer, full stop. The diarization work is going to stress the pipeline and I'd rather have someone who's done real-time audio before.",                                                                      duration: 13 },
    { speaker: 'sp-priya',  text: "I'd add a product designer. We're redesigning the meeting page and the clips flow, and right now the engineers are designing as they go, which slows everything down.",                                                                 duration: 14 },
    { speaker: 'sp-tom',    text: "From growth's perspective, a content marketer. We have no one writing about the product publicly. Every competitor has a blog, a newsletter, a LinkedIn presence. We're invisible.",                                                      duration: 13 },
    { speaker: 'sp-aisha',  text: "Can I put in for a CS ops person? I'm doing support, onboarding and analytics all by myself and it's becoming a bottleneck.",                                                                                                          duration: 11 },
    { speaker: 'sp-you',    text: "OK, so four asks but probably two slots. Let's prioritize. Marcus, if you had to pick one?",                                                                                                                                            duration: 8 },
    { speaker: 'sp-marcus', text: "Senior backend. Without it the Q1 roadmap is at risk.",                                                                                                                                                                                 duration: 6 },
    { speaker: 'sp-priya',  text: "I'd say designer second. The faster we design, the faster engineering ships.",                                                                                                                                                          duration: 7 },
    { speaker: 'sp-you',    text: "Agreed. Backend engineer and product designer as the first two hires when the freeze lifts. Tom, can you draft the job specs?",                                                                                                         duration: 9 },
    { speaker: 'sp-tom',    text: "On it. I'll have drafts in the shared doc by end of this week.",                                                                                                                                                                        duration: 7 },
    { speaker: 'sp-8',      text: "Do we know when the freeze actually lifts? Last I heard it was 'November' but no specific date.",                                                                                                                                       duration: 8 },
    { speaker: 'sp-you',    text: "I'm meeting with the board on the 15th. I'll push for a firm date and share it immediately. For planning purposes, assume November 15th.",                                                                                              duration: 12 },
    { speaker: 'sp-priya',  text: "One more thing — who owns the pricing tier doc? I wrote the proposal but the implementation spec needs to come from engineering.",                                                                                                       duration: 11 },
    { speaker: 'sp-marcus', text: "I'll own the technical spec. Priya does the business side, I'll do the engineering side. We sync Friday.",                                                                                                                              duration: 9 },
    { speaker: 'sp-you',    text: "Great. So action items: Priya sends the pricing draft by Thursday. Marcus drafts the tier spec and restructures sprints by Monday. Tom has job specs by Friday. I push for a freeze lift date at the board meeting.",                   duration: 17 },
    { speaker: 'sp-you',    text: "Aisha, for now, flag the worst diarization cases in the bug tracker so Marcus's team can use them as test cases.",                                                                                                                      duration: 10 },
    { speaker: 'sp-aisha',  text: "Already started. I have about 15 tagged. I'll add the meeting IDs and timestamps.",                                                                                                                                                    duration: 8 },
    { speaker: 'sp-7',      text: "Quick question — should we tell customers that diarization improvements are coming? Some of them are threatening to leave.",                                                                                                            duration: 9 },
    { speaker: 'sp-aisha',  text: "I'd wait until we have a rough timeline. Promising and missing is worse than silence.",                                                                                                                                                 duration: 8 },
    { speaker: 'sp-you',    text: "Agreed. Let's wait until Marcus has the sprint plan. Then Aisha can share a general 'improvements coming in Q1' message without a specific date.",                                                                                      duration: 12 },
    { speaker: 'sp-you',    text: "All right, that's everything. Good meeting. Let's execute.",                                                                                                                                                                            duration: 5 },
    { speaker: 'sp-priya',  text: "Thanks everyone.",                                                                                                                                                                                                                      duration: 3 },
    { speaker: 'sp-marcus', text: "Later.",                                                                                                                                                                                                                                duration: 2 },
  ];

  const segs: Segment[] = [];
  let t = 0;
  for (let i = 0; i < dialogue.length; i++) {
    const d = dialogue[i];
    const start = t;
    const end = t + d.duration;
    segs.push({
      id: `seg-${String(i + 1).padStart(3, '0')}`,
      speakerId: d.speaker,
      start,
      end,
      text: d.text,
      overlapsWith: d.overlap ? [d.overlap] : undefined,
    });
    // Small pause between speakers (1-3 seconds)
    t = end + (d.overlap ? 0 : Math.floor(Math.random() * 3) + 1);
  }
  return segs;
}

const segments = makeSegments();

// ── Moments ─────────────────────────────────────────────────────
const moments: Moment[] = [
  { id: 'mom-1', at: 200,  kind: 'decision',  note: 'Ship usage-based tier in Q1' },
  { id: 'mom-2', at: 310,  kind: 'highlight',  note: 'Grace period debate', byId: 'sp-you' },
  { id: 'mom-3', at: 520,  kind: 'question',   note: 'What counts as a query?' },
  { id: 'mom-4', at: 760,  kind: 'decision',   note: 'Enterprise exempt until renewal' },
  { id: 'mom-5', at: 1140, kind: 'objection',   note: 'Clips vs diarization priority' },
  { id: 'mom-6', at: 1380, kind: 'highlight',   note: '40% recipient signup rate', byId: 'sp-you' },
  { id: 'mom-7', at: 1620, kind: 'decision',   note: 'Diarization first, clips as fast follow' },
  { id: 'mom-8', at: 1850, kind: 'question',   note: 'Does Ask just sit in the backlog?' },
  { id: 'mom-9', at: 2100, kind: 'decision',   note: 'Ask moves to Q2 with the paid tier' },
  { id: 'mom-10', at: 2460, kind: 'highlight',   note: 'Hiring: backend engineer first', byId: 'sp-you' },
  { id: 'mom-11', at: 2800, kind: 'action',    note: 'Marcus: draft tier tech spec by Monday' },
  { id: 'mom-12', at: 3100, kind: 'objection',   note: 'Should we tell customers about diarization?' },
];

// ── Summary ─────────────────────────────────────────────────────
const summary: Summary = {
  template: 'Standard',
  catchUp: [
    { id: 'cu-1', text: 'Usage-based pricing tier approved for Q1 launch with a 30-day grace period for existing free users.', receipts: [{ segmentIds: ['seg-025'], at: 761 }] },
    { id: 'cu-2', text: 'Diarization improvements and clips are the two features shipping in Q1; live summary and cross-meeting Ask move to Q2.', receipts: [{ segmentIds: ['seg-040'], at: 1850 }] },
    { id: 'cu-3', text: 'Hiring freeze expected to lift November 15th; first hires will be a senior backend engineer and a product designer.', receipts: [{ segmentIds: ['seg-050'], at: 2610 }] },
    { id: 'cu-4', text: 'Enterprise customers are exempt from metering until their contract renewal.', receipts: [{ segmentIds: ['seg-020'], at: 602 }] },
    { id: 'cu-5', text: 'No customer-facing announcements about diarization until the sprint plan is ready.', receipts: [{ segmentIds: ['seg-060'], at: 3300 }] },
  ],
  sections: [
    {
      heading: 'Pricing',
      bullets: [
        { id: 'b-1',  text: 'Three-tier model: Free (unlimited recording, AI summaries, basic search), Pro at $19/seat/month (metered Ask at 200 queries/month, priority processing, advanced export), Enterprise (custom, SSO, 50-seat minimum).',
          receipts: [{ segmentIds: ['seg-011'], at: 380 }, { segmentIds: ['seg-012'], at: 410 }] },
        { id: 'b-2',  text: 'Each Ask submission counts as one query. Follow-ups are separate. The count will be shown in the UI.',
          receipts: [{ segmentIds: ['seg-016'], at: 520 }] },
        { id: 'b-3',  text: '30-day grace period for existing free users (not 90 — shorter is standard).',
          receipts: [{ segmentIds: ['seg-017'], at: 558 }, { segmentIds: ['seg-018'], at: 572 }] },
        { id: 'b-4',  text: 'Enterprise exempt from metering until renewal. Already in the proposal.',
          receipts: [{ segmentIds: ['seg-020'], at: 602 }] },
        { id: 'b-5',  text: 'Free tier still includes unlimited recordings, transcription and standard summaries. Gate is on Ask, priority processing and advanced export.',
          receipts: [{ segmentIds: ['seg-022'], at: 660 }] },
      ],
    },
    {
      heading: 'Roadmap',
      bullets: [
        { id: 'b-6',  text: 'Four candidates: diarization improvements (6 weeks), live summary sidebar (4 weeks), clips and sharing (5 weeks), cross-meeting Ask (8 weeks).',
          receipts: [{ segmentIds: ['seg-028'], at: 1100 }, { segmentIds: ['seg-029'], at: 1130 }] },
        { id: 'b-7',  text: 'Diarization is the top priority: transcript accuracy complaints correlate with a 60% lower conversion rate on large-meeting users.',
          receipts: [{ segmentIds: ['seg-030'], at: 1160 }, { segmentIds: ['seg-039'], at: 1810 }] },
        { id: 'b-8',  text: 'Clips ships as a full product feature (with trim editor), not a minimal timestamp link. Half-baked reflects poorly on the pricing narrative.',
          receipts: [{ segmentIds: ['seg-034'], at: 1480 }, { segmentIds: ['seg-035'], at: 1520 }] },
        { id: 'b-9',  text: 'Live summary deferred to Q2: Mac-only (35% addressable audience) and primarily a retention play.',
          receipts: [{ segmentIds: ['seg-036'], at: 1580 }, { segmentIds: ['seg-037'], at: 1610 }] },
        { id: 'b-10', text: 'Cross-meeting Ask moves to Q2, strategically paired with the paid tier launch to create an upgrade path.',
          receipts: [{ segmentIds: ['seg-038'], at: 1680 }] },
      ],
    },
    {
      heading: 'Hiring',
      bullets: [
        { id: 'b-11', text: 'When the freeze lifts: senior backend engineer first (Q1 roadmap depends on it), product designer second.',
          receipts: [{ segmentIds: ['seg-047'], at: 2540 }, { segmentIds: ['seg-048'], at: 2580 }] },
        { id: 'b-12', text: 'Board meeting on the 15th to push for a firm freeze-lift date. Plan on November 15th.',
          receipts: [{ segmentIds: ['seg-052'], at: 2760 }] },
      ],
    },
    {
      heading: 'Customer communication',
      bullets: [
        { id: 'b-13', text: 'No promises about diarization improvements until the sprint plan is ready. Then share a general "Q1 improvements" message without a specific date.',
          receipts: [{ segmentIds: ['seg-060'], at: 3300 }, { segmentIds: ['seg-061'], at: 3350 }] },
      ],
    },
  ],
};

// ── Action Items ────────────────────────────────────────────────
const actions: ActionItem[] = [
  { id: 'act-1', text: 'Priya: send pricing draft for async comments by Thursday',   ownerId: 'sp-priya',  done: false, receipts: [{ segmentIds: ['seg-026'], at: 790 }] },
  { id: 'act-2', text: 'Marcus: draft the tier technical spec and restructure sprint plan by Monday',  ownerId: 'sp-marcus', done: false, receipts: [{ segmentIds: ['seg-054'], at: 2860 }, { segmentIds: ['seg-041'], at: 1880 }] },
  { id: 'act-3', text: 'Tom: draft job specs for backend engineer and product designer by Friday',     ownerId: 'sp-tom',    done: false, receipts: [{ segmentIds: ['seg-050'], at: 2610 }] },
  { id: 'act-4', text: 'Push for a firm freeze-lift date at the board meeting on the 15th',             ownerId: 'sp-you',    done: false, receipts: [{ segmentIds: ['seg-052'], at: 2760 }] },
  { id: 'act-5', text: 'Aisha: add meeting IDs and timestamps to the 15 tagged diarization bug cases', ownerId: 'sp-aisha',  done: true,  receipts: [{ segmentIds: ['seg-057'], at: 3140 }] },
];

// ── The Meeting ─────────────────────────────────────────────────
export const showpieceMeeting: Meeting = {
  id: 'mtg-q3-roadmap',
  title: 'Q3 roadmap sync',
  startedAt: '2026-10-14T14:00:00Z',
  duration: 3480,
  capture: 'bot-video',
  status: 'ready',
  speakers,
  segments,
  topics,
  moments,
  summary,
  actions,
  isSample: true,
};
