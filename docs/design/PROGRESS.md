# Progress

## Phase 0: Preconditions ✅
- [x] Capture test passes, `.agent-logs/` tracked
- [x] Read `docs/design/fathom-redesign-plan.md` (= `UI_RedesignPlan.md`)
- [x] No existing framework; chose Vite + React + TypeScript
- [x] DECISIONS.md started

## Phase 1: Foundation (5%) ✅
- [x] Tokens CSS (light theme, dark-swap ready)
- [x] Fonts loaded (Schibsted Grotesk + Literata)
- [x] Shell (rail + top bar + skip link)
- [x] UI primitives (Button, Chip, SpeakerChip, ReceiptChip, Toast, Dialog, Sheet, Tabs, SegmentedControl, Skeleton, Kbd)
- [x] Strings module (`src/strings/index.ts`)
- [x] Data layer + types (`types.ts`, `repo.ts`, `mockRepo.ts`)
- [x] Seed data (`showpiece.ts` 58m/8-person + `others.ts` covering all states)
- [x] PlayerAdapter (`ClockPlayer` 60fps rAF + `MediaPlayer`)
- [x] Routing + deep-link state (`?t=`, `?tab=`)
- [x] Component gallery (`/dev/design`)

## Phase 2: Meeting page (35%) ✅
- [x] Player (`PlayerCard` with speed 0.75x–2.0x, ±10s skip, waveform, H hotkey)
- [x] Transcript (`TranscriptView` with binary search active line, auto-follow, floating jump pill, speaker initials, hover menu)
- [x] Summary tabs + receipts (every bullet links to spoken timecode)
- [x] Template switcher (Standard, Executive, Sales Discovery)
- [x] Sync (playhead ↔ transcript ↔ summary receipts)

## Phase 3: The Score (part of meeting page) ✅
- [x] Static Score (8 speaker lanes, topic strips, moment glyphs)
- [x] Interactive (snapping seek within 6px, hover tooltip, range drag for inline clip, keyboard scrub)
- [x] Draw-in animation (`score-draw-in`)
- [x] Mobile chapter strip + accessible table modal

## Phase 4: Meetings home (10%) ✅
- [x] Rows, peek drawer (`Sheet`), processing states (`Transcribing…`, `Summarizing…`)
- [x] Inline rename, saved views (`Needs my actions`, `Shared with me`, `8+ people`, `Long`), next-up card

## Phase 5: Search and ask (10%) ✅
- [x] Command palette (`⌘K` modal across meetings and moments)
- [x] Results, cited answer with token-by-token streaming and receipt chips
- [x] Scope line, saved prompt suggestions

## Phase 6: Clips and share (10%) ✅
- [x] Range to clip, share sheet with live recipient preview
- [x] Recipient page (`/s/:token`), OG tags, no login required

## Phase 7: Live mode and first run (8%) ✅
- [x] Live column, auto-stamped scratchpad, call timer, streaming dialogue turns
- [x] Onboarding, natural language recording-rules builder, calendar stubs (`/settings`)

## Phase 8: Landing and pricing (10%) ✅
- [x] Hero (playable mini meeting page with interactive Score & receipts)
- [x] Pricing cards (Free $0, Team $19, Enterprise)

## Phase 9: Polish and QA (12%) ✅
- [x] Responsive pass (desktop, tablet, mobile layout)
- [x] Accessibility pass (WCAG 2.2 AA semantic markup, aria-live toasts, skip-link, focus states)
- [x] Motion moment (orchestrated Score draw-in)
- [x] Performance pass (60fps rAF timer clock, binary search segment sync, fast bundle)
- [x] Documentation & Handoff (`HANDOFF.md`, `WALKTHROUGH.md`, `DECISIONS.md`)
