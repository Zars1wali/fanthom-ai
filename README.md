# Fathom (rebuild) — Meeting Notes That Show Their Work

A complete, high-craft 24-hour rebuild of **Fathom**, the AI meeting notetaker. Built with a broadcast edit-suite aesthetic where **every summary bullet, decision, and action item carries an exact timecode receipt** jumping directly to the spoken moment.

---

## 🚀 Live Demo & Quick Start

### Running Locally
```bash
# Install dependencies
npm install

# Start development server with instant HMR
npm run dev

# Build production bundle and check TypeScript
npm run build
```

Open `http://localhost:5173/` in your browser.

---

## 🎯 The Core Problem & Design Thesis

1. **The Trust Problem**: Users re-read meeting transcripts to check if AI summaries hallucinated. In this rebuild, **every claim links to its source** via interactive receipt chips (e.g. `12:41 P`).
2. **The Long, Multi-Person Meeting**: An 8-person, 60-minute call becomes chaotic in traditional tools. **The Score** provides a dedicated, color-coded horizontal lane per speaker, showing topic boundaries, talk-time percentages, decision points, and highlights at a glance.

---

## 🧭 Routes & Key Screens

| Route | Purpose & Key Features |
|---|---|
| `/` | **Landing Page & Playable Hero**: Typographic hero, interactive mini meeting player with live Score, and 3 pricing tiers. |
| `/meetings` | **Meetings Library**: Filter by `Needs my actions`, `8+ people`, `Long`, search across attendees, inline title renaming, and slide-over **Peek Drawer**. |
| `/meetings/:id` | **Flagship Meeting (`mtg-q3-roadmap`)**: 58-minute, 8-speaker sync with **The Score**, synchronized 60fps audio clock, transcript with auto-follow and floating "Jump to now" pill, template switcher (`Standard`, `Executive`, `Sales Discovery`), and streaming Ask AI. |
| `/s/:token` | **Public Recipient View**: Clean, phone-friendly shared excerpt player requiring **no login**. |
| `/live` | **Live Meeting Simulation**: Tally REC indicator, real-time streaming dialogue, and an auto-stamped scratchpad. |
| `/settings` | **Settings & Rules**: Natural-language recording rules sentence builder and calendar connection stubs. |
| `/dev/design` | **Component Gallery**: Living design system showcasing color tokens, the 8-speaker palette, buttons, chips, receipts, skeletons, and modals. |
| `/dev/recap-email` | **Recap Email Preview**: HTML email design with clickable receipts. |

---

## 🏗️ Architecture & Boundaries

```
Browser (SPA)  ─────────►  AppShell + React Router v7
                                 │
               ┌─────────────────┴─────────────────┐
               ▼                                   ▼
        PlayerAdapter                         MeetingRepo
       (ClockPlayer / MediaPlayer)          (MockMeetingRepo)
               │                                   │
       60fps rAF Clock Sync               Seed Meetings (Showpiece + 10 others)
       Transcript Binary Search           Instant Filters & Streaming Ask AI
```

- **PlayerAdapter**: Decoupled playback interface. Supports `MediaPlayer` (HTMLMediaElement) and `ClockPlayer` (a 60fps `requestAnimationFrame` timer clock with an animated waveform). Transcript-only meetings render a designed audio surface with full scrubbing and sync.
- **MeetingRepo**: Clean boundary in `src/data/repo.ts`. The UI interacts purely through typed async methods, allowing a backend agent to swap in an `HttpMeetingRepo` with zero front-end refactoring.
- **High-Performance Playhead Sync**: Active transcript turns are located via binary search ($O(\log N)$) rather than scanning hundreds of segments on every frame.

---

## 🔍 Honest Accounting: Real vs. Stubbed

- **What is Real**:
  - Full design system using CSS custom properties and tokens.
  - Complete 8-lane interactive Score timeline with boundary snapping and range selection.
  - Synced transcript with auto-follow pause and floating jump pill.
  - Dynamic template switcher between Standard, Executive, and Sales Discovery summaries.
  - Command palette (`⌘K`) with global shortcut navigation.
  - Public recipient view `/s/:token` with live share sheet preview.
- **What is Honestly Stubbed**:
  - **Capture Layer**: Native meeting bot binaries (Zoom/Meet/Teams) are stubbed via `CaptureProvider` and simulated in `/live`.
  - **Data Backend**: Seeded in-memory repository with realistic latency (100–300ms) and 8 canned Ask AI answers streamed token-by-token.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Space` or `K` | Toggle Play / Pause |
| `J` / `L` | Skip backward / forward 10 seconds |
| `H` | Add highlight at current playhead time |
| `⌘ K` or `Ctrl K` | Open Command Palette & Global Search |
| `←` / `→` | Scrub playhead along The Score |
| `?` | Open Keyboard Shortcuts Cheat Sheet |
| `Esc` | Dismiss modals, sheets, and menus |

---

## 🎨 Design System & Tokens
- **Canvas**: Bone Grey (`#E8ECEA`)
- **Surface**: White Tape panels (`#F8FAF9`)
- **Ink**: Deep Sea Ink (`#0F2A33`)
- **Cue**: Ultramarine (`#2B3FE0`)
- **Highlighter**: Marker-pen amber (`#FFC629`)
- **Tally**: Live red (`#E5484D`)
- **Typography**: `Schibsted Grotesk` (UI/Display with tabular numbers) + `Literata` (Reading serif for transcripts and summary prose).
