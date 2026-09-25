# 🎙️ Fathom (Rebuild) — Meeting Notes That Show Their Work

<div align="center">

> **A high-craft rebuild of Fathom with broadcast-grade edit-suite aesthetics, multi-speaker spatial timelines, and verified timecode receipts on every single claim.**

[![Live Demo](https://img.shields.io/badge/Demo-fanthom--ai--one.vercel.app-2B3FE0?style=for-the-badge&logo=google-chrome&logoColor=white)](https://fanthom-ai-one.vercel.app)
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://fanthom-ai-one.vercel.app)
[![React 19](https://img.shields.io/badge/react%2019-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![esbuild](https://img.shields.io/badge/esbuild-%23FFCF00.svg?style=for-the-badge&logo=esbuild&logoColor=black)](https://esbuild.github.io/)
[![React Router 7](https://img.shields.io/badge/react--router%20v7-%23CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Zars1wali/fanthom-ai)

<br />

**[Explore Live Demo](https://fanthom-ai-one.vercel.app)** • **[API Health Check](https://fanthom-ai-one.vercel.app/api/health)** • **[Documentation](https://fanthom-ai-one.vercel.app/developers)** • **[Design Gallery](https://fanthom-ai-one.vercel.app/dev/design)**

</div>

---

## ⚡ What is This?

Traditional AI meeting tools ask you to trust black-box summaries. When an 8-person roadmap call ends, you are handed an unverified block of bullet points. If you want to know whether a claim was *actually* agreed upon or hallucinated, you are forced to re-read thousands of words of raw transcript or scrub blindly through an hour of audio.

**Fathom (Rebuild)** solves this trust problem at the root:

1. **Every summary bullet, action item, and decision is cryptographically anchored to its spoken moment with interactive Timecode Receipts** (`[12:41]`). Click any receipt to jump immediately to the speaker's exact phrase.
2. **The Score** transforms chaotic multi-speaker audio into an 8-lane visual sequencer where every participant has their own lane, talk-time metrics, decision tags, and topic chapters.

---

## 🏆 How This Rebuild Stands Out From The Original Fathom

| Feature | Original Fathom | This Rebuild (`Fanthom AI`) |
|---|---|---|
| **Summary Verification** | Static text bullets; user must manually search the transcript to verify claims | **100% Receipt-Linked Architecture**: Every bullet carries an interactive receipt chip that instantly seeks audio to the exact syllable |
| **Multi-Speaker Timeline** | Single 1D progress bar; overlapping participants and speaking dominance are hidden | **The Score**: Broadcast-grade multi-track sequencer with dedicated horizontal lanes per speaker, talk-time bars, and chapter boundaries |
| **Audio Engine Resilience** | Freezes or errors if audio files fail or media permissions drop | **Dual-Engine `PlayerAdapter`**: Seamlessly runs either native audio or a 60fps `requestAnimationFrame` Clock Player with real-time waveform canvas |
| **Summary Flexibility** | Single static format generated post-call | **Dynamic Persona Switching**: Instant morphing between **Standard Sprint**, **Executive Brief**, and **Sales Discovery (BANT)** with receipts intact |
| **AI Q&A Grounding** | Chat response without direct time links | **Streaming Ask AI with Citation Cards**: Tokens stream in real time and emit verified millisecond receipts that link directly into dialogue |
| **Public Sharing** | Often requires account registration or app download to view clips | **Zero-Auth Recipient View (`/s/:token`)**: Lightweight, mobile-friendly excerpt player requiring zero login |
| **Visual Craft & Identity** | Generic dark SaaS dashboard | **Editorial Broadcast Edit-Suite**: Physical "White Tape" panels, Deep Sea Ink (`#0F2A33`), Ultramarine Cues (`#2B3FE0`), and Marker Amber highlights (`#FFC629`) |
| **Performance** | Frequent transcript re-renders on every second of playback | **$O(\log N)$ Binary Search Sync**: Transcript tracking computes the active turn via binary search, skipping heavy DOM scans |

---

## 🌟 Key Product Highlights

### 1. 🎵 "The Score" — Multi-Track Spatial Timeline
Rather than flattening an entire call into a standard progress bar, **The Score** gives every attendee a dedicated lane:
- **8-Speaker Dedicated Palette**: Instant visual identification for who spoke and when.
- **Micro Talk-Time Quotas**: Displays exact speaking percentages (e.g. `Alex: 38%`, `Sarah: 26%`).
- **Interactive Scrubber & Range Selector**: Click and drag to create highlight clips, set excerpt bounds, or jump chapters.

### 2. 🧾 Timecode Receipts (Show Your Work)
Every claim in the meeting summary includes an interactive pill:
```markdown
* Sarah confirmed backend migration will conclude 2 weeks before Q3 kickoff [18:24]
```
Clicking `[18:24]` performs a smooth 60fps seek, autoscrolls the transcript to Sarah's line, and highlights the spoken words in marker amber.

### 3. 🔄 Multi-Persona Summary Morphing
Switch perspectives on the fly without re-processing:
- **Standard**: Chronological topics, technical decisions, and assigned action items.
- **Executive Brief**: Bottom-line impact, resource blockers, timeline risks, and high-level milestones.
- **Sales Discovery (BANT)**: Budget verification, Authority matrix, Need identification, and Timeline milestones.

### 4. ⚡ Live Meeting Simulation (`/live`)
Test Fathom's end-to-end recording pipeline in real time:
- Simulated notetaker joining Google Meet, Zoom, or Teams.
- Real-time speech diarization stream with live elapsed timer.
- Interactive timestamped scratchpad notes (`⌘Enter` auto-stamps current timecode).
- Instant handoff into the 7-stage processing pipeline.

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          BROWSER CLIENT (SPA)                          │
│                                                                        │
│   React 19  •  React Router v7  •  The Score (8-Lane Canvas/CSS Grid)  │
│   Schibsted Grotesk + Literata Typography  •  Design Token System      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA & PLAYBACK ADAPTERS                        │
│                                                                        │
│   ┌───────────────────────────┐      ┌───────────────────────────────┐ │
│   │       PlayerAdapter       │      │          MeetingRepo          │ │
│   │  ───────────────────────  │      │  ───────────────────────────  │ │
│   │  • HTML5 MediaPlayer      │      │  • HttpMeetingRepo (Live API) │ │
│   │  • 60fps ClockPlayer (rAF)│      │  • LocalMockRepo (Offline FB) │ │
│   │  • Animated Waveform SVG  │      │  • In-Memory Seed Database    │ │
│   └───────────────────────────┘      └───────────────────────────────┘ │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                    HTTP REST / Server-Sent Events
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    VERCEL SERVERLESS ENGINE (Node.js)                  │
│                                                                        │
│   Express 5 REST API  •  7-Stage Pipeline  •  Streaming Ask AI (SSE)   │
│   esbuild Bundler  •  Zero-Cold-Start Monolithic Lambda (api/index.js) │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Complete Tech Stack

| Layer | Technologies | Purpose |
|---|---|---|
| **Frontend Framework** | `React 19`, `React DOM` | Modern concurrent rendering and UI state |
| **Language** | `TypeScript ~6.0` (Strict) | End-to-end type safety across client and server |
| **Routing** | `React Router v7` | Client-side SPA routing with deep-link support |
| **Build & Dev Tool** | `Vite 8`, `esbuild` | Lightning-fast HMR and optimized production bundling |
| **Backend & API** | `Express 5`, `Node.js 24` | REST endpoints, SSE streaming, pipeline orchestrator |
| **Deployment** | `Vercel Serverless Functions` | Global CDN static delivery & serverless execution |
| **Code Quality** | `Oxlint` | High-speed Rust-based linting and validation |
| **Typography** | `Schibsted Grotesk`, `Literata` | Display tabular numbers and editorial serif reading |

---

## 🧭 Application Routes

| Path | Screen | Key Functionality |
|---|---|---|
| `/` | **Landing & Playable Hero** | Typographic value proposition, live interactive mini player with The Score, pricing tiers |
| `/meetings` | **Meetings Hub** | Filter by `Needs my actions`, `8+ people`, `Long`, title renaming, and slide-over **Peek Drawer** |
| `/meetings/:id` | **Flagship Meeting Player** | 58-min, 8-speaker roadmap sync with **The Score**, synchronized transcript, template switcher, and Ask AI |
| `/calendar` | **Upcoming Calendar** | Auto-record toggles for Zoom, Google Meet, Teams with internal/external prospect badges |
| `/live` | **Live Meeting Simulation** | Real-time audio stream simulation, timestamped scratchpad notes, pipeline processing |
| `/s/:token` | **Zero-Auth Share Player** | Phone-friendly public excerpt view with verified timecode receipts and no login barrier |
| `/developers` | **API Reference** | Interactive API documentation, cURL examples, request schemas, and endpoint tester |
| `/dev/design` | **Design Token Gallery** | Living showcase of color tokens, buttons, chips, receipts, skeletons, and modals |
| `/dev/recap-email` | **Recap Email Preview** | Production-ready HTML email template with clickable receipt tags |
| `/settings` | **Recording Rules** | Natural-language sentence builder for automatic bot joining rules |

---

## ⌨️ Pro Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>Space</kbd> or <kbd>K</kbd> | Toggle Play / Pause |
| <kbd>J</kbd> / <kbd>L</kbd> | Skip backward / forward 10 seconds |
| <kbd>H</kbd> | Drop instant highlight marker at current playhead time |
| <kbd>⌘ K</kbd> or <kbd>Ctrl K</kbd> | Open Command Palette & Global Search |
| <kbd>←</kbd> / <kbd>→</kbd> | Scrub playhead along The Score |
| <kbd>?</kbd> | Open Keyboard Shortcuts Cheat Sheet modal |
| <kbd>Esc</kbd> | Dismiss modals, drawers, and menus |

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/Zars1wali/fanthom-ai.git
cd fanthom-ai

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

The web app will be available at: **`http://localhost:5173/`**

### Running the Backend Engine
To run the local Express server alongside the frontend:
```bash
# Start the local backend server (port 3001)
npm run server

# Run backend API smoke tests
npm run test:backend
```

### Production Build
```bash
# Typecheck and build frontend + bundle serverless API
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Live Deployment

This project is deployed to **Vercel** with full CI/CD connected to the master branch of this repository.

* **Production URL:** [https://fanthom-ai-one.vercel.app](https://fanthom-ai-one.vercel.app)
* **API Health Check:** [https://fanthom-ai-one.vercel.app/api/health](https://fanthom-ai-one.vercel.app/api/health)
* **GitHub Repository:** [https://github.com/Zars1wali/fanthom-ai](https://github.com/Zars1wali/fanthom-ai)

---

<div align="center">

Crafted with precision by **[Umer Wali (Zars1wali)](https://github.com/Zars1wali)**

</div>
