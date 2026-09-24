# 5-Minute Walkthrough Script (Camera ON)

**Target Duration**: 4:45  
**Product**: Fathom (rebuild)  
**Presenter**: Lead Product Designer & Senior Front-End Engineer  

---

### [0:00 – 0:40] Opening: The Core Problem & Philosophy
- **Camera ON**.
- "Hi, I'm presenting our rebuild of Fathom. When teams use AI meeting notetakers, two critical problems always emerge:
  1. **Trust**: People don't trust generic AI summaries because they don't show where the claim came from. People spend more time re-reading 60-minute transcripts to check if the AI hallucinated.
  2. **The Long, Multi-Person Call**: An 8-person, 60-minute call turns into a chaotic wall of text.
- Our design thesis is simple: **Every note must link to the moment it came from**, and **The Score** makes an 8-person hour legible at a single glance."

---

### [0:40 – 1:15] Overview: Scope, What Was Built, What Was Stubbed
- "We focused on delivering an uncompromising, broadcast edit-suite experience:
  - **Built**: Bespoke design system (Bone Grey canvas, White Tape panels, Ultramarine cue, 8-speaker accessible palette), The Score interactive multi-lane timeline, receipt-backed summaries, template switcher, ⌘K command palette, and public clip sharing without login.
  - **Deliberately Stubbed**: Meeting bot capture is stubbed via a realistic `CaptureProvider` simulation. We built what happens *after* capture, because capture APIs like Recall.ai are solved commodities."

---

### [1:15 – 2:30] Step 1 & 2: Meetings Library & The Flagship Meeting
- *Screen share on `http://localhost:5173/meetings`*
- "Here is the Meetings Library. Notice the saved views (`Needs my actions`, `8+ people`, `Long`), inline title editing, and the Next-Up card with a simulated auto-record toggle.
- Let's open our flagship meeting: **Q3 Roadmap Sync** — 58 minutes, 8 speakers, 4 topics.
- Notice **The Score** at the top. Instead of a single waveform, each speaker has their own dedicated lane. We see talk-time percentages, topic boundaries, decisions, and highlights.
- Seeking snaps to turn boundaries. Watch as I click this receipt chip `[06:00]` in the summary: the playhead seeks instantly, the audio clock updates, and the transcript scrolls into view."

---

### [2:30 – 3:30] Step 3 & 4: Template Switcher, Receipts & ⌘K Search
- "In the summary panel, switching templates is instant:
  - From **Standard** to **Executive** or **Sales Discovery**.
  - Notice the layout doesn't jump.
  - Every single bullet has a receipt chip. If I click on `13:10 P`, we immediately jump to Priya's proposal.
- We can edit bullets inline or click 'This line is wrong' to flag inaccuracies.
- Now I press `⌘K`. The Command Palette opens: we can search for 'pricing' or 'freeze', and every result links directly to the spoken moment."

---

### [3:30 – 4:15] Step 5 & 6: Range-to-Clip & Public Recipient Experience
- "Now look at The Score. I can click and drag across a 30-second range: a floating bar appears offering **Create Clip** or **Highlight**.
- Clicking **Create Clip** opens the Share Sheet with a live recipient preview.
- When a recipient opens the link `/s/demo-clip-1` in an incognito window without an account, they get a phone-friendly, focused excerpt player with the transcript and receipts intact."

---

### [4:15 – 4:45] Parity Board & Coverage Proof
- *Screen share on `http://localhost:5173/dev/parity`*
- "Next, let's look at the **Parity Board** at `/dev/parity`.
- We've mapped all 80 routes from the original Fathom domain and external hubs (Help Center, Developer Docs, Trust Center, Status Page, Legal, Roles, Competitor comparisons, and Partner programs) into 17 high-craft templates fed by a typed content layer.
- Everything lives on one unified origin with zero external fragmentation and a shared ⌘K global search.
- Any visitor or stakeholder can click on any row in the parity table to immediately inspect the rebuilt, superior equivalent with live fixtures, honest sample labeling, and exact pricing limits."

---

### [4:45 – 5:00] Conclusion & Architecture
- "Finally, our `/live` simulation and advanced app modules (`/app/templates`, `/app/deals`, `/app/scorecards`, `/app/trackers`) demonstrate how real-time audio streams into our pipeline, auto-stamps scratchpad notes, and powers sales intelligence with receipts.
- All code passes clean route-check crawls and compiles with zero TypeScript errors.
- Thank you — every line links to the moment it came from."
