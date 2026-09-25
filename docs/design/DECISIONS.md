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

---

## 2026-09-25 (Master Prompt v2 Rebuild)

### D014: Master Prompt v2 Strategy — 17 Templates Fed by Typed Content Layer
Rather than authoring 90+ monolithic JSX pages, designed 17 parameterized templates (`Landing`, `Story`, `Pricing`, `RoleSolution`, `IntegrationsDirectory`, `IntegrationDetail`, `Comparison`, `Changelog`, `ResourceHub`, `Article`, `Developers`, `Help`, `Trust`, `Status`, `Company`, `Legal`, `Forms`, `Careers`, `PartnerPrograms`) driven by a type-safe content layer in `src/content/`. This guarantees design uniformity, high speed of evolution, and maintainability.

### D015: Parity Board & Route Manifest as Contract (`src/routes/manifest.ts`)
Created `src/routes/manifest.ts` mapping all 80 original Fathom routes with template type, tier, original URL, SEO metadata, and verification status. Exposed an interactive ledger at `/dev/parity` enabling quick inspection of coverage, tiers, and parity mapping.

### D016: Unified SiteShell Across All External Domains
Replaced the original Fathom fragmentation (which spanned 6+ disjoint domains with mismatched navigation) with a single unified `SiteShell` featuring a 5-item top navigation, dismissible release banner, responsive mobile drawer, and 6-column comprehensive footer across marketing, docs, help, trust, and status.

### D017: Universal ⌘K Search Across All Content Domains
Implemented `GlobalSearchModal` operating across pages, integrations, help articles, API documentation, and changelog updates with keyboard navigation, section groupings, and instant search filtering.

### D018: Neutral Monogram Tiles for Third-Party Integrations
To avoid trademark disputes or stale assets, implemented clean neutral monogram tiles with semantic brand tints for all 21 integration partners rather than raster logos.

### D019: Receipts Principle in Marketing & Product
Extended the receipts principle beyond transcripts into marketing and role pages. Role solutions (`/solutions/:role`) showcase live interactive summaries citing concrete timecodes, and comparisons (`/vs/:slug`) feature "show only differences" toggles, verifiable feature matrices, and explicit as-of timestamps.

### D020: Strict "Sample" Labeling Policy
In adherence to the honesty rules, all non-verified figures, customer quotes, ROI calculations, SOC2 attestations, and pricing figures are explicitly badged with a "Sample" chip in the UI to prevent any misleading assertions.

### D021: Client-Side Interactive Plan Finder on Pricing Page
Built a 3-question guided diagnostic ("Team size", "CRM integration", "Monthly meeting volume") recommending Free, Team, or Business editions dynamically with exact limits and transparent pricing, eliminating ambiguous "Limited use" descriptions.

### D022: Three-Pane Developer Documentation with Multi-Language Code Snippets
Built `/developers/*` as a three-pane doc layout (sidebar navigation, documentation content, on-this-page sticky TOC) with 12+ REST endpoints, interactive copy-to-clipboard curl/TypeScript/Python snippets, webhooks schemas, MCP guide, and an `llms.txt` viewer.

### D023: Tier B Advanced App Suites on Seeded Data
Extended the product app with Tier B capabilities on real meeting fixtures:
- `/app/templates`: 12-template library and live interactive prompt builder.
- `/app/deals`: Pipeline deal timeline with MEDDIC qualifiers and timecode citations.
- `/app/scorecards`: Objective evaluation rubric with timestamped evidence receipts.
- `/app/trackers`: Natural language alert phrase builder and notification matches.
- `/app/highlights`: Curated clip reels shareable as a single unified link.
- `/app/analytics`: Team-wide talk ratio, monologue duration, and trend metrics calculated directly from segment data.
- `/app/points`: Referral program dashboard and perks store.

### D024: Backend Engine & Processing Pipeline (`backend/`)
Implemented the complete backend architecture matching `IMPLEMENTATION_PLAN.md`:
- Express REST & SSE streaming server on port 3001 with Vite proxy mapping `/api` -> `http://localhost:3001`.
- Complete 7-stage processing pipeline (`normalise`, `chapter`, `summarise`, `actions`, `index`).
- Server-Sent Events (SSE) AI Ask streaming engine emitting tokens and clickable timecode citations.
- In-memory & persistent data store schema matching Section 4.4 (`workspaces`, `users`, `meetings`, `clips`, `shares`, `calendarEvents`, `jobs`, `templates`).
- `HttpMeetingRepo` client in frontend with automatic fallback to local seed data if disconnected.
- 15/15 automated smoke test suites verifying health, CRUD, mutations, search, streaming, and pipeline execution.


