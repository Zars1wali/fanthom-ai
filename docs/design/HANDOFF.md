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

### Master Prompt v2 Rebuilt Routes

#### `/` — Landing Page (Interactive Hero Fixture)
- **Interactive Fixture**: Real, interactive meeting player running on a sample 58-minute roadmap call.
- **Capture-Mode Selector**: Toggle between Bot-Free Native Audio and Cloud Bot mode with instant feedback.
- **Ask with Receipts**: Interactive prompt suggestions outputting token-streamed answers with timestamp chips.
- **Payload Preview**: Live JSON payload inspection showing CRM integration schema.

#### `/overview` — Story Lifecycle
- **4-Phase Narrative**: Before the Call (prep & context), During (invisible capture & hotkey highlights), After (instant structured summaries with receipts), and Later (enterprise search & deals).

#### `/pricing` — Transparent Pricing & Plan Finder
- **3 Tiers**: Free ($0), Team ($19/mo), and Enterprise ($39/mo, 50-seat minimum).
- **Plan Finder**: 3-question guided diagnostic recommending the right tier dynamically.
- **Sticky Feature Matrix**: Grouped accordions comparing capture, intelligence, CRM sync, and security with exact limits.

#### `/solutions/:role` — Role Solutions (6 Roles)
- Dedicated solution pages for `Sales`, `Customer Success`, `Marketing`, `Teams`, `Operations`, and `Engineering`.
- Each renders an interactive summary showpiece, 3 saved prompts, and workflow integrations.

#### `/integrations` & `/integrations/:slug` — Directory & 21 Detail Pages
- **Instant Filtering**: Category tabs (`All`, `CRM`, `Project Management`, `Workflow Automation`, `Video Conferencing`, `Collaboration`, `Sales Intelligence`) and plan filters.
- **Neutral Monogram Badges**: High-contrast, brand-tinted monogram tiles for all 21 integrations.
- **3-Step Setup & JSON Payloads**: Practical setup steps, required OAuth scopes, and sample webhook payloads.

#### `/whats-new` — Changelog
- 12 dated releases across `Capture`, `AI & Summaries`, and `Integrations` with interactive "Try in App" links.

#### `/vs` & `/vs/:slug` — Competitor Comparisons (8 Competitors)
- Objective comparisons against Fireflies, Granola, Gong, Otter, Read AI, Zoom AI, Google Meet, and Built-In Notes.
- Interactive "Show only differences" toggle, migration steps, and "as of" timestamp notices.

#### `/resource-hub` & `/learn/:slug` — Guides & Playbooks
- 4 long-form playbooks (600+ words each) with reading progress bars, sticky TOC, and related guides.
- 3 sample customer case studies (`Blackthorn`, `Bluleadz`, `NCSI`) explicitly labeled "Sample story".

#### `/developers/*` — 3-Pane Developer Documentation
- **API Reference**: 12+ REST endpoints with multi-language curl/TypeScript/Python snippets and instant copy-to-clipboard.
- **Webhooks & MCP**: Webhook event schemas, Model Context Protocol integration guide, and `llms.txt`.

#### `/help/*` — Unified Help Center
- 9 original categories, 18+ comprehensive articles, real-time search with highlighted matches, and a designed contact support form.

#### `/trust` — Security & Trust Center
- Security architecture overview, data retention policies, third-party subprocessors table, and report request form. Sample compliance notice.

#### `/status` — System Status & Incident Log
- 6 infrastructure components with 90-day uptime bars, historical incident logs, and subscription modal.

#### `/about-us` & `/brand` — Company & Brand Materials
- Mission statement, core values (no lorem ipsum), boilerplate, and downloadable SVG logo pack.

#### `/terms` & `/privacy` — Legal Terms & Privacy
- Full legal structures with sticky TOC, last-updated stamps, print stylesheets, and sample legal disclaimer.

#### `/signup`, `/login`, `/book-demo`, `/switch` — Forms & Onboarding
- Designed accessible forms with inline validation and seamless transition into the live app.

#### `/careers` & `/careers/:role` — Careers Hub
- 3 open roles across Engineering, Product Design, and Solutions with an accessible application modal.

#### `/partner-programs` & `/program/:slug` — Partner Ecosystem
- Overviews and application forms for Solutions Partners, Tech Integrators, Points Program, and Portfolio Partners.

#### Tier B App Breadth:
- `/app/templates`: 12-template library with interactive builder and preview.
- `/app/deals`: Pipeline deal timeline with MEDDIC qualifiers and timecode receipts.
- `/app/scorecards`: Call scoring rubric with cited evidence.
- `/app/trackers`: Natural language alert phrase builder and notification matches.
- `/app/highlights`: Ordered clip reels shareable as a single link.
- `/app/analytics`: Team-wide talk ratio, monologue duration, and trend metrics.
- `/app/points`: Referral program dashboard and perks store.
- `/dev/parity`: Live parity verification ledger mapping all 80 original routes.


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
