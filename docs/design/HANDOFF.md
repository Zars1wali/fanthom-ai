# Front-End Handoff Specification

## 1. What Is Built (By Route)

### `/` — Landing Page & Interactive Hero
- **Hero Presentation**: Typographic title and value proposition ("Meeting notes that show their work").
- **Playable Mini Meeting**: An interactive fixture rendering a playable audio clock, mini Score timeline, and receipt-backed bullets that seek on click.
- **Pricing Cards**: 3 tier cards: Free ($0/mo with unlimited recordings), Team ($19/seat/mo with 200 Ask queries & priority pipeline), and Enterprise (50-seat minimum, SAML SSO, audit logs).

### `/meetings` — Meetings Library & Peek Drawer
- **Row List**: All seeded meetings showing title, date, duration, speaker avatars, summary snippets, and processing/ready states.
- **Saved Views**: Filters for `All`, `Needs my actions`, `Shared with me`, `8+ people`, `Long (>40m)`.
- **Search Bar**: Real-time filtering by title or attendee.
- **Next-Up Card**: Countdown card for upcoming calendar events with simulated "Join and record".
- **Inline Rename**: Click-to-rename meeting title inline with instant blur/Enter persistence.
- **Peek Side Drawer**: Slide-over drawer with attendee breakdown, talk percentage, 60-second catch-up, and action items.

### `/meetings/:id` — Meeting Detail & The Score
- **The Score**: Primary interactive multi-lane speaker timeline.
  - 8 distinct color-coded speaker lanes with initials and talk-time percentage.
  - Chapter / topic strip at the top.
  - Key moment glyphs (Highlights, Decisions, Actions).
  - 6px boundary snapping seek on pointer drag.
  - Range selection: dragging creates a range with floating "Create Clip" and "Highlight" bar.
  - Score draw-in entrance animation.
  - Accessible "View as table" modal.
- **Player Card**: Waveform audio clock, play/pause, ±10s skip (`J`/`L`), speed selector (0.75x–2.0x), `H` key highlight trigger.
- **Transcript View**:
  - Speaker-colored turns with initial avatar.
  - Fast binary search segment active-line highlight.
  - Auto-follow mode with floating "Jump to live position" pill when scrolled away.
  - Turn hover menu: "Highlight", "Copy Link to moment", "Clip".
  - In-transcript keyword search.
- **Right Pane Tabs**:
  - **Summary**: Template switcher (`Standard`, `Executive`, `Sales Discovery`), segmented catch-up vs full notes, inline bullet edit, "This line is wrong" flag bullet, copy Markdown.
  - **Action Items**: Grouped action items, completion checkbox toggle, assignee chip, timestamp jump chip, undo toast.
  - **Highlights**: Chronological highlight list, undo deletion, add highlight at current playhead.
  - **Ask AI**: Streaming token-by-token answer with clickable citation receipt chips.
- **Share Modal**: Trim clip start/end, choose permission (`anyone` vs `workspace`), include toggle, copy public link.

### `/s/:token` — Public Recipient Page
- **No Login Required**: Clean, phone-first responsive view.
- **Excerpt Player**: Scoped playback clock, active segment tracking, AI summary with receipts.

### `/live` — Live Meeting Simulation
- **Simulated Capture Layer**: Live `REC` indicator with tally dot and elapsed timer.
- **Streaming Dialogue**: Realistic multi-speaker dialogue turns streamed in real time.
- **Auto-Stamped Scratchpad**: Pressing Enter automatically prefixes the note with the current timecode.
- **Pipeline Progression**: Transitions through Transcribing → Segmenting → Summarizing → Ready, redirecting to the generated meeting.

### `/settings` — Settings & Rules Builder
- **Natural Language Rules Builder**: Sentence builder configuring auto-record, video/audio capture, and sharing behavior.
- **Calendar Stubs**: Google Calendar & Outlook connection toggle.

### `/dev/design` — Design Gallery & QA Surface
- Component showcase: Buttons, Chips, Speaker avatars, Receipts, Skeletons, Tabs, Segmented controls, Modals, Sheets, and Color Tokens.

### `/dev/recap-email` — Post-Meeting Email Recap
- Responsive HTML email preview with receipt chips and action items.

---

## 2. Precise Task List for Backend Agent

The front-end code reads and writes data exclusively through the `MeetingRepo` interface in `src/data/repo.ts`. To replace `MockMeetingRepo` with a production backend:

1. **Implement `HttpMeetingRepo`**:
   - `listMeetings(filter?: ViewFilter)`: GET `/api/meetings?filter=...`
   - `getMeeting(id: string)`: GET `/api/meetings/:id`
   - `renameMeeting(id: string, title: string)`: PATCH `/api/meetings/:id` `{ title }`
   - `assignSpeaker(meetingId, speakerId, attendeeName)`: PATCH `/api/meetings/:id/speakers/:speakerId`
   - `addHighlight(meetingId, at, note)`: POST `/api/meetings/:id/highlights` `{ at, note }`
   - `removeHighlight(meetingId, momentId)`: DELETE `/api/meetings/:id/highlights/:momentId`
   - `editBullet(meetingId, bulletId, text)`: PATCH `/api/meetings/:id/bullets/:bulletId` `{ text }`
   - `flagBullet(meetingId, bulletId, reason)`: POST `/api/meetings/:id/bullets/:bulletId/flag`
   - `toggleAction(meetingId, actionId, done)`: PATCH `/api/meetings/:id/actions/:actionId` `{ done }`
   - `switchTemplate(meetingId, template)`: POST `/api/meetings/:id/summary/template` `{ template }`
   - `search(query, scope, meetingId)`: GET `/api/search?q=...&scope=...`
   - `ask(query, scope, meetingId)`: Server-Sent Events (SSE) or Fetch streaming yielding `AskChunk` tokens and `{ type: 'citation', time, segmentId }`.
   - `createClip(meetingId, start, end, title)`: POST `/api/clips`
   - `createShare(target, opts)`: POST `/api/shares`
   - `getShared(token)`: GET `/api/shares/:token`

2. **Data Shapes**:
   - All response JSON must match the types in `src/data/types.ts` verbatim (`Speaker`, `Segment`, `Topic`, `Moment`, `Receipt`, `Bullet`, `Summary`, `ActionItem`, `Meeting`).

---

## 3. Deliberately Left Out (Per Product Judgment)
- Real meeting bot capture (Zoom/Meet/Teams native binaries): Stubbed cleanly via `CaptureProvider` / `LiveSimulationPage`.
- Team SSO / SCIM provisioning / Enterprise Billing: Mentioned in pricing tiers, out of scope for 24h client MVP.
- Complex multi-player comment threads: Kept single-player with receipts.
