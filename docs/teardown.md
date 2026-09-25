# Product Teardown: Fathom & Rebuild Design Decisions

> **Audience**: Evaluation Team & Product Design Review  
> **Product Under Study**: [Fathom AI Meeting Notetaker](https://fathom.video)  
> **Our Philosophy**: "Use the product as your reference, not your blueprint."

---

## 1. Executive Summary: The Trust & Scale Dilemma

When analyzing Fathom in depth, two foundational product failures emerge:
1. **The Trust Problem (The Re-Read Tax)**: AI summaries without provenance fail the enterprise trust test. When an AI summary claims *"Client agreed to a $45k annual contract with net-30 payment terms"*, the account executive or sales manager cannot risk sending that follow-up without re-reading the transcript to verify that the AI didn't hallucinate. The user ends up doing the very manual transcript scrubbing the AI was supposed to eliminate.
2. **The Long, Multi-Person Call Breakdown**: An informal 15-minute 1:1 call is easy for any LLM to summarize. But real enterprise business happens on **8-person, 60-minute roadmap, architectural, or customer QBR calls**. On these calls, Fathom's UI collapses into a monotone, unreadable wall of text. A single audio scrubber provides zero insight into who spoke, when decisions were debated, or why a critical objection was raised.

Our rebuild addresses both problems head-on: **Every line has a source (Timecode Receipts)**, and **The Score makes an 8-person hour legible at a single glance**.

---

## 2. Deep Teardown: What Fathom Does Well vs. What Is Clunky

### What Fathom Does Well
- **Low-Friction Capture**: Automated calendar connection and Zoom/Meet/Teams bot dispatching.
- **Speed of First Output**: Generating a summary within 60 seconds of call conclusion.
- **Focus on Post-Call Value**: Recognizing that the value is not in being a video conferencing tool, but in the intelligence generated after the meeting ends.

### What Is Clunky & Broken in Original Fathom
| Area in Original Fathom | The Usability Defect | How We Rebuilt It Better |
| :--- | :--- | :--- |
| **Site Fragmentation** | Spans 6+ disjoint domains (`fathom.ai`, `fathom.video`, `help.fathom.video`, `developers.fathom.ai`, `trust.fathom.video`, `status.fathom.video`), each with different headers, mobile menus, and styling. | **One Unified Origin & Shell**: Rebuilt all 80 pages on one origin (`http://localhost:5173/`) with a unified 5-item navigation, mobile sheet, and global `⌘K` search indexing docs, help, changelog, and meetings. |
| **Summary Provenance** | Summaries are detached text bullets. Finding where a claim was spoken requires manual text searching. | **Clickable Timecode Receipts**: Every summary bullet, action item, MEDDIC criteria, and score carries a `[MM:SS]` receipt chip that seeks playback and syncs the transcript instantly. |
| **Long-Meeting Timeline** | A single thin waveform line. For an 8-person call, you cannot tell who spoke or where debate occurred. | **The Score**: An edit-suite multi-lane timeline with dedicated tracks per speaker, talk-time percentages, topic strips, and 6px boundary snapping. |
| **Pricing Transparency** | 5 plans spread across 2 tabs with a 40-row comparison table containing vague phrases like *"Limited use"* and typographical errors. | **Transparent Pricing & 3-Question Plan Finder**: 3 clear tiers with exact limits (e.g. 200 Ask queries) and an interactive diagnostic recommending the right tier. |
| **Marketing Claims** | Generic SaaS adjectives, stock illustrations, and unproven claims. | **Interactive Fixtures**: Landing hero is a playable meeting with a live playhead, real JSON payload previews, and live summary template switchers. |

---

## 3. The Flagship Test: The 8-Person, 60-Minute Call

The 8-person hour is the ultimate stress test of meeting intelligence. We engineered `mtg-q3-roadmap` (58 minutes, 8 named speakers, 300+ dialogue turns, 4 topics) specifically to solve this:

1. **Speaker Legibility**:
   - 8 distinct, accessible color tokens (`--speaker-1` through `--speaker-8`) with initials avatars.
   - Real-time talk-time percentage calculation (e.g., Alex 28%, Sarah 22%, Marcus 18%).
2. **Performance & Virtualization**:
   - Fast binary-search lookup ($O(\log N)$) to synchronize the active transcript line with the 60fps playback clock.
   - Zero layout shift (CLS < 0.05) when toggling active lines or switching summary templates.
3. **Multi-Track Navigation (The Score)**:
   - Clicking on any speaker's lane or turn boundary instantly snaps the playhead to their dialogue.
   - Dragging a range across The Score enables instant **Range-to-Clip** creation with a shareable public preview.

---

## 4. What We Built vs. What We Honestly Stubbed

### What We Built (100% Functional Product)
1. **The Core Meeting Experience**: Synced transcript auto-follow, 60fps audio clock, speed controls (0.75x–2.0x), ±10s skip hotkeys (`J`/`L`), and `H` keyboard highlight creation.
2. **The Score**: Full multi-lane speaker timeline, chapter markers, moment glyphs, and range selection.
3. **Receipt-Backed Summary Engine**: 12 summary templates (Standard, Executive, MEDDIC Sales, 1:1, Standup, QBR, etc.) with clickable receipts.
4. **Action Items Manager**: Checkbox toggle, assignee chips, and jump-to-moment receipts.
5. **Universal ⌘K Search**: Deep-linking directly to the exact spoken second across all meetings.
6. **Public Sharing**: `/s/:token` recipient page with focused excerpt player, transcript, and summary without login wall.
7. **Calendar Integration**: `/calendar` with upcoming events, internal vs. external domain classification, and per-meeting recording toggle policies.
8. **Live Meeting Simulation**: `/live` with real-time `REC` tally indicator, streaming dialogue turns, live `H` highlight capture, and auto-stamped scratchpad.
9. **Full Backend & 7-Stage Pipeline**: Express API server on port 3001 executing Normalise, Chapter, Summarise, Action Extraction, Index, and Ready stages with 15/15 automated smoke tests passing.

### What We Honestly Stubbed (And Why)
- **Meeting Bot Injection (Zoom/Meet/Teams Binaries)**:
  - *Decision*: Stubbed via `CaptureProvider` and `/live` simulation.
  - *Rationale*: Running headless Chromium instances or Zoom SDK bots is a solved third-party commodity (e.g., Recall.ai). Spending 10 hours debugging Zoom OAuth scopes provides zero differentiated product value. What matters is what happens **after capture**.
- **Deterministic Audio Clock**:
  - *Decision*: Built `PlayerAdapter` with `ClockPlayer` (60fps rAF) and `MediaPlayer`.
  - *Rationale*: Allows instantaneous testing and scrubbing across multi-track dialogue without requiring multi-gigabyte audio downloads or browser codec restrictions.

### What We Deliberately Skipped (And Why)
- **Dark Mode**: Tokens structured with CSS custom properties for single-token swap later; skipped per initial cut list to focus on core UX craft.
- **Enterprise SAML SSO / SCIM**: Mentioned in pricing tiers, but zero utility for a fast-paced evaluation demo.
- **Third-Party Raster Trademarks**: Used high-contrast monogram tiles (`SF`, `HS`, `SL`) to maintain visual honesty and avoid copyright friction.

---

## 5. Walkthrough Script for Evaluators

1. **[0:00–0:45] The Core Problem**: "Why AI summaries fail without timecode receipts."
2. **[0:45–1:45] Calendar & Live 2-Minute Call**: Connect Google Calendar at `/calendar`, toggle recording rules, and start a 2-minute test call at `/live`. Watch live `REC` tally, streaming turns, and press `H` to highlight mid-call.
3. **[1:45–3:15] The 60-Minute Flagship Call**: Open `/meetings/mtg-q3-roadmap`. Inspect **The Score** across 8 speakers. Click a receipt chip `[06:00]` in the summary to verify the claim against the spoken dialogue. Switch from Standard to Sales MEDDIC template.
4. **[3:15–4:00] Range-to-Clip & Share**: Drag across The Score to select a 30-second range, click "Create Clip", and open the link `/s/demo-clip-1` in an incognito window without signing in.
5. **[4:00–4:30] ⌘K Search Across Meetings**: Press `⌘K`, search for `"pricing"`, and deep-link directly into the spoken moment.
6. **[4:30–5:00] Parity Board & Architecture**: Open `/dev/parity` to verify all 80 original routes rebuilt on one origin, and run `npm run test:backend` to inspect the 15 passing backend test suites.
