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

---

## Master Prompt v2: Every Original Page, Done Better ✅

### Phase 10: V2 Foundations & Typed Content Layer ✅
- [x] Preconditions confirmed (`.agent-logs/` tracked, plan read, Stack: Vite + React 19 + TypeScript)
- [x] Initial 3-viewport audit completed at 360, 768, and 1440 (`docs/design/AUDIT.md`)
- [x] Parity Manifest (`src/routes/manifest.ts`) mapping 80 original routes with templates, tiers, and statuses
- [x] Interactive Parity Board (`/dev/parity` via `src/pages/ParityBoardPage.tsx`)
- [x] Global ⌘K search (`GlobalSearchModal.tsx`) indexing pages, integrations, help, docs, and changelog
- [x] Unified Site Shell (`SiteShell.tsx`) with dismissible announcement banner, 5-item nav, mobile drawer, and 6-column footer
- [x] Typed Content Layer (`src/content/`):
  - `pricing.ts` (3 plans, exact limits, plan finder, comparison matrix)
  - `roles.ts` (6 roles with interactive summary showpieces)
  - `integrations.ts` (21 integrations with monogram badges, steps, JSON payloads)
  - `comparisons.ts` (8 competitor teardowns with differences-only toggle)
  - `changelog.ts` (12 dated releases with feature tags)
  - `docs.ts` (12+ REST endpoints, curl/TS/Python code samples, webhooks, MCP guide, llms.txt)
  - `help.ts` (9 categories, 18+ articles, feedback widget, contact form)
  - `cases.ts` (3 sample customer case studies)
  - `articles.ts` (4 deep-dive playbooks of 600+ words)
  - `programs.ts` (4 partner programs)
  - `summaryTemplates.ts` (12 summary templates)
  - `status.ts` (6 system components with 90-day uptime bars & incident logs)
  - `careers.ts` (3 job listings with application modal)
  - `pages.ts` (About Us, Brand Press Kit, Trust Center, Terms, Privacy)

### Phase 11: Tier 1 & Tier 2 Templates Implementation ✅
- [x] `LandingPage` (`/`): interactive hero meeting player, capture selector, Ask receipts, payload preview
- [x] `StoryPage` (`/overview`): 4-phase lifecycle narrative
- [x] `PricingPage` (`/pricing`): plan cards, 3-question plan finder, sticky comparison matrix
- [x] `RoleSolutionPage` (`/solutions/:role`): 6 roles with live summary showpieces
- [x] `IntegrationsDirectoryPage` (`/integrations`, `/integrations/category/:slug`): instant category & plan filter
- [x] `IntegrationDetailPage` (`/integrations/:slug`): 21 integrations with setup steps & sample payloads
- [x] `ChangelogPage` (`/whats-new`): 12 releases with category pills & Try in App links
- [x] `ComparisonPage` (`/vs`, `/vs/:slug`): differences-only toggle, feature table, migration guide
- [x] `ResourceHubPage` (`/resource-hub`, `/learn`): filterable cards by type
- [x] `ArticlePage` (`/learn/:slug`, `/case-studies/:slug`): reading progress bar, sticky TOC, related articles
- [x] `DevelopersPage` (`/developers/*`): 3-pane layout, API reference, multi-language snippets, MCP guide, llms.txt
- [x] `HelpPage` (`/help/*`): 9 categories, 18+ articles, search with highlighting, feedback widget
- [x] `TrustPage` (`/trust`): security pillars, subprocessors table, compliance notice
- [x] `StatusPage` (`/status`): 90-day uptime bars, incident log, subscribe modal
- [x] `CompanyPage` (`/about-us`, `/brand`): mission, values, press kit with downloadable SVG logo pack
- [x] `LegalPage` (`/terms`, `/privacy`): sticky TOC, sample legal notice, print styles
- [x] `FormsPage` (`/signup`, `/login`, `/book-demo`, `/switch`): inline validation, clear states
- [x] `CareersPage` (`/careers`, `/careers/:role`): listings & application modal
- [x] `PartnerProgramsPage` (`/partner-programs`, `/program/:slug`): partner tier overviews

### Phase 12: Tier 3 & Advanced App Features ✅
- [x] `/app/templates`: 12-template gallery and interactive template builder
- [x] `/app/deals`: Deal pipeline overview with MEDDIC qualification & timecode receipts
- [x] `/app/scorecards`: Call scoring rubric with cited evidence
- [x] `/app/trackers`: Natural language alert phrase builder and notification matches
- [x] `/app/highlights`: Ordered clip reels shareable as a single link
- [x] `/app/analytics`: Team talk ratio, monologue duration, and talk trend analytics
- [x] `/app/points`: Referral program dashboard and perks store

### Phase 13: Verification & Automation ✅
- [x] `scripts/route-check.js`: automated manifest crawler testing routes, HTTP 200 responses, and content linting (0 lorem ipsum, 0 forbidden placeholders)
- [x] `npm run build`: zero errors, 1.42s clean compilation
- [x] All 80 mapped routes verified against live dev server

