# Design Decisions

Logged as they happen. No editing after the fact.

---

## 2026-09-25

### D001: Framework choice — Vite + React + TypeScript
The repo had no existing framework. Chose Vite + React + TypeScript as the smallest sensible set: fast HMR, zero-config TypeScript, tree-shaking, and the ecosystem needed for a complex single-page app with routing, state, and virtualization. No Next.js because there's no server-side rendering requirement — the app is a client-side SPA with mock data. Recorded per precondition 4.

### D002: Router — React Router v7
Needed for deep-linkable state (t, speaker, tab, q, topic in URL query). React Router is the de facto standard for React SPAs. Lightweight, well-documented, supports query params natively.

### D003: Product name — "Fathom (rebuild)"
Per the plan: product name from one config constant. Default "Fathom (rebuild)" so it's clear what this is. Can be renamed in one place (src/config.ts).

### D004: Plan file location
The master prompt expects `docs/design/fathom-redesign-plan.md`. The user provided `UI_RedesignPlan.md` at root. Copied to both locations; using `UI_RedesignPlan.md` as the sole reference per the master prompt's final instruction.

### D005: No dark mode in v1
Per the plan's cut list. Tokens structured with CSS custom properties so dark mode is a single token swap later. Not shipped.

### D006: Typography — Schibsted Grotesk + Literata
Per the plan section 3.3. Schibsted Grotesk for UI/display (sturdy grotesk with tabular figures), Literata for transcript/summary prose (optical size axis, reading serif). Both from Google Fonts.

### D007: Color system follows plan section 3.2 exactly
Bone Grey canvas, White Tape panels, Ultramarine cue, marker-pen amber highlights, tally-light red for live. No cream/terracotta, no dark+acid.

### D008: PlayerAdapter with requestAnimationFrame ClockPlayer
To decouple playback from DOM media restrictions and stubbed capture, built `PlayerAdapter` with `ClockPlayer` and `MediaPlayer`. `ClockPlayer` updates at 60fps using `requestAnimationFrame`, ensuring instant seek responsiveness and buttery-smooth transcript auto-following with zero layout shift.

### D009: Binary search transcript segment lookup
Transcript auto-follow and active line highlighting utilize binary search over the ordered segment timestamps, keeping active segment calculation $O(\log N)$ on 300+ segment calls.

### D010: The Score multi-lane canvas & range selection
Built The Score as the singular bold element: dedicated lane per speaker, topic strips, moment glyphs, snapping seek within 6px of turn boundaries, and interactive range dragging for inline clip creation.

### D011: Receipt-backed notes & template switcher
Every AI summary bullet carries clickable timecode receipts (`ReceiptChip`) that jump directly to the exact spoken second. Switching between Standard, Executive, and Sales Discovery templates updates content with matching dimension skeletons to avoid cumulative layout shift (CLS < 0.05).

### D012: Live simulation pipeline with timestamped scratchpad
Built `/live` simulation mode featuring live tally REC indicator, streaming turns, and a personal scratchpad that auto-stamps current call timecodes on Enter.

### D013: Public clip page `/s/:token` without auth
Shared links and clips render in a responsive, phone-first standalone view without requiring an account or login wall.

