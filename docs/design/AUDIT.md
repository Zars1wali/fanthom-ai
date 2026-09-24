# Start-State Audit (Master Prompt v2)

Audit conducted on existing routes at `http://localhost:5173/` across viewport widths:
- **Mobile (360px)**
- **Tablet (768px)**
- **Desktop (1440px)**

---

## 1. Existing Routes Audit Matrix

| Route | Viewport Status (360 / 768 / 1440) | What is Strong (Keep) | What is Generic (Rework/Remove) | What is Broken / Missing | Decision |
|---|---|---|---|---|---|
| `/` (Landing) | Pass / Pass / Pass | Interactive Score playground, speaker lane palette, real fixture data, clear value proposition. | Hero used a static image mockup (`/images/fathom_meeting_hero.jpg`) instead of live playable mini-meeting component; logo row of big tech names was generic SaaS; pillar numbers `01.`, `02.`, `03.` violated anti-generic craft rules. | Missing capture-mode selector (Bot vs Bot-free live fixture demo); missing live sample webhook/CRM payload preview; needs single CTA repeated at most 3 times. | **Rework**: Turn hero into real playable fixture component; add capture-mode switcher and real payload inspection; remove generic numbered pillars. |
| `/meetings` (Library) | Pass / Pass / Pass | Clean list, instant search, speaker chips, processing simulation pill, next-up card, responsive peek drawer (`Sheet`). | Filter chips were slightly basic; could use more structured metadata. | Minor: Add quick links to Tier B features (Deals, Templates, Analytics, Scorecards, Trackers). | **Keep & Extend**: Retain core UX, wire top-level links to new Tier B tools. |
| `/meetings/:id` (Showpiece & Details) | Pass / Pass / Pass | The Score (snapping seek, speaker lanes, moment glyphs), 60fps ClockPlayer, auto-follow transcript with binary search, receipts on every summary bullet, action item jump. | None; fits broadcast-suite aesthetic tightly with zero generic fluff. | Mobile table view for The Score exists as modal; summary template switcher works cleanly. | **Keep**: Benchmark core experience. |
| `/live` (Live Capture Simulation) | Pass / Pass / Pass | Streaming dialogue turns, live audio scratchpad, real-time timer, auto-timestamped highlights. | Broadcast header could be tighter on 360px. | None; fully responsive and interactive. | **Keep**: Excellent live demo tool. |
| `/settings` | Pass / Pass / Pass | Natural language rule builder ("When meeting contains... auto-share to..."), calendar connection stubs, speaker voice profile. | Form controls could have stronger broadcast-suite tactile styling. | Needs links to Trust center and Developer webhooks. | **Keep & Polish**: Link outward to new sub-hubs. |
| `/s/:token` (Shared Recipient) | Pass / Pass / Pass | Zero-login requirement verified, read-only permissions badge, clean video player + receipt tabs. | None. | None. | **Keep**: Public share verification passes. |
| `/onboarding` | Pass / Pass / Pass | 4-step wizard, interactive calendar permission simulator, bot vs bot-free toggle. | None. | None. | **Keep**: Useful interactive flow. |
| `/dev/design` | Pass / Pass / Pass | Complete token swatches, button states, chip variants, dialog previews. | None. | Could include references to the 17 new page templates. | **Keep & Update**: Add template preview registry. |
| `/dev/recap-email` | Pass / Pass / Pass | Clean responsive email layout with timecode receipt chips. | None. | None. | **Keep**: Brand collateral deliverable. |
| `/*` (404) | Pass / Pass / Pass | Clean fallback with return link. | Minimalist. | Needs global shell navigation and search integration. | **Rework**: Integrate into global marketing shell. |

---

## 2. Key Architecture & Template Decisions

1. **Rebuild Marketing on Shared Shell**:
   - The original Fathom presence spans 6 disconnected web domains (`fathom.ai`, `fathom.video`, `developers.fathom.ai`, `help.fathom.video`, `trust.fathom.video`, `status.fathom.video`).
   - We unify them into **one origin (`http://localhost:5173/`)** with one shared marketing header, sticky banner, global `⌘K` search palette, and consistent footer.

2. **Template-Driven Strategy (17 Core Templates)**:
   - Instead of 90 ad-hoc pages, we create typed content collections (`src/content/`) rendered by ~17 high-craft templates.
   - Parity Manifest (`src/routes/manifest.ts`) indexes every route, original URL, template, tier, and verification status.
   - Interactive Parity Board (`/dev/parity`) provides instant live proof of parity coverage.

3. **Receipts & Honest Proof**:
   - Every pricing figure, rating, customer quote, uptime bar, and third-party comparison is labeled `"Sample"`.
   - Claims are accompanied by live components, timecodes, or structured JSON payloads rather than empty superlatives.
