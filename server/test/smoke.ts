/**
 * Comprehensive Backend Smoke Test Suite
 * Tests all REST, Streaming, and Pipeline endpoints against http://localhost:3001
 */

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

async function runTests() {
  console.log(`\n========================================`);
  console.log(`🧪 Starting Fanthom Backend Smoke Tests`);
  console.log(`🎯 Target API: ${BASE_URL}`);
  console.log(`========================================\n`);

  let passed = 0;
  let failed = 0;

  async function test(name: string, fn: () => Promise<void>) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err: unknown) {
      console.error(`  ✗ ${name}`);
      console.error(`    Error:`, err instanceof Error ? err.message : err);
      failed++;
    }
  }

  // 1. Health check
  await test('GET /health returns 200 and database counts', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (data.status !== 'ok' || typeof data.meetingsCount !== 'number') {
      throw new Error(`Invalid response: ${JSON.stringify(data)}`);
    }
  });

  // 2. List Meetings
  await test('GET /meetings returns array of meetings', async () => {
    const res = await fetch(`${BASE_URL}/meetings`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const list = await res.json();
    if (!Array.isArray(list) || list.length < 5) {
      throw new Error(`Expected at least 5 meetings, got ${list.length}`);
    }
  });

  // 3. Get Flagship Meeting
  await test('GET /meetings/mtg-q3-roadmap returns full meeting object with The Score data', async () => {
    const res = await fetch(`${BASE_URL}/meetings/mtg-q3-roadmap`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const mtg = await res.json();
    if (mtg.id !== 'mtg-q3-roadmap' || !Array.isArray(mtg.speakers) || !Array.isArray(mtg.segments)) {
      throw new Error(`Invalid meeting payload: ${mtg.id}`);
    }
  });

  // 4. Rename Meeting
  await test('PATCH /meetings/mtg-q3-roadmap renames meeting title', async () => {
    const res = await fetch(`${BASE_URL}/meetings/mtg-q3-roadmap`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Q3 Roadmap & Team Sync (Updated)' }),
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error('Rename failed');
  });

  // 5. Add and Remove Highlight
  let createdHighlightId = '';
  await test('POST /meetings/:id/highlights adds a new highlight', async () => {
    const res = await fetch(`${BASE_URL}/meetings/mtg-q3-roadmap/highlights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ at: 420, note: 'Critical pricing discussion point' }),
    });
    if (res.status !== 201) throw new Error(`Status ${res.status}`);
    const hl = await res.json();
    if (!hl.id || hl.at !== 420) throw new Error('Invalid highlight creation');
    createdHighlightId = hl.id;
  });

  await test('DELETE /meetings/:id/highlights/:momentId removes the highlight', async () => {
    const res = await fetch(`${BASE_URL}/meetings/mtg-q3-roadmap/highlights/${createdHighlightId}`, {
      method: 'DELETE',
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 6. Action item toggle
  await test('PATCH /meetings/:id/actions/:actionId toggles action done state', async () => {
    const res = await fetch(`${BASE_URL}/meetings/mtg-q3-roadmap/actions/act-1`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: true }),
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (data.done !== true) throw new Error('Action state not updated');
  });

  // 7. Switch Template
  await test('POST /meetings/:id/summary/template switches summary template', async () => {
    const res = await fetch(`${BASE_URL}/meetings/mtg-q3-roadmap/summary/template`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template: 'sales-meddic' }),
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const summary = await res.json();
    if (summary.template !== 'sales-meddic' || !Array.isArray(summary.catchUp)) {
      throw new Error('Template switch failed');
    }
  });

  // 8. Search
  await test('GET /search?q=pricing returns hits with timestamps and speakers', async () => {
    const res = await fetch(`${BASE_URL}/search?q=pricing&scope=team`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const hits = await res.json();
    if (!Array.isArray(hits) || hits.length === 0) {
      throw new Error('Expected search hits for "pricing"');
    }
    if (!hits[0].time || !hits[0].speakerName) {
      throw new Error('Invalid search hit shape');
    }
  });

  // 9. Ask Streaming (SSE)
  await test('GET /ask streams response tokens and timestamp citations', async () => {
    const res = await fetch(`${BASE_URL}/ask?q=pricing&scope=meeting&meetingId=mtg-q3-roadmap`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes('data:') || !text.includes('citation')) {
      throw new Error('Expected SSE event stream data with citations');
    }
  });

  // 10. Create Clip & Public Share Link
  let sampleShareToken = '';
  await test('POST /clips creates highlight clip', async () => {
    const res = await fetch(`${BASE_URL}/clips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingId: 'mtg-q3-roadmap',
        start: 120,
        end: 240,
        title: 'Roadmap Kickoff Segment',
      }),
    });
    if (res.status !== 201) throw new Error(`Status ${res.status}`);
    const clip = await res.json();
    if (!clip.id || clip.start !== 120) throw new Error('Invalid clip');
  });

  await test('POST /shares creates share link and GET /shares/:token resolves publicly', async () => {
    const resShare = await fetch(`${BASE_URL}/shares`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target: { meetingId: 'mtg-q3-roadmap' },
        opts: { access: 'anyone', includeTranscript: true, includeSummary: true },
      }),
    });
    if (resShare.status !== 201) throw new Error(`Status ${resShare.status}`);
    const shareLink = await resShare.json();
    sampleShareToken = shareLink.token;

    const resGet = await fetch(`${BASE_URL}/shares/${sampleShareToken}`);
    if (resGet.status !== 200) throw new Error(`Status ${resGet.status}`);
    const view = await resGet.json();
    if (view.meeting.id !== 'mtg-q3-roadmap' || !view.sharedBy) {
      throw new Error('Public share view resolution failed');
    }
  });

  // 11. Calendar & Record Toggle
  await test('GET /calendar returns events and PATCH toggles record', async () => {
    const resList = await fetch(`${BASE_URL}/calendar`);
    if (resList.status !== 200) throw new Error(`Status ${resList.status}`);
    const events = await resList.json();
    if (!Array.isArray(events) || events.length === 0) throw new Error('No calendar events');

    const resPatch = await fetch(`${BASE_URL}/calendar/cal-1`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ record: false }),
    });
    if (resPatch.status !== 200) throw new Error(`Status ${resPatch.status}`);
  });

  // 12. 7-Stage Pipeline Processing
  await test('POST /pipeline/process executes all 7 pipeline stages on raw transcript', async () => {
    const rawSegments = [
      { speakerName: 'Alex Rivera', start: 0, end: 12, text: 'Welcome everyone to the architecture review.' },
      { speakerName: 'Alex Rivera', start: 13, end: 25, text: 'We need to review database indexing strategies.' },
      { speakerName: 'Sarah Chen', start: 26, end: 45, text: 'I agree. Let us make sure we follow up with the platform team on latency.' },
      { speakerName: 'Marcus Vance', start: 46, end: 70, text: 'I will prepare the deployment checklist before tomorrow morning.' },
    ];

    const res = await fetch(`${BASE_URL}/pipeline/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Ad-hoc Architecture Review',
        rawSegments,
        templateId: 'standard',
      }),
    });

    if (res.status !== 201) throw new Error(`Status ${res.status}`);
    const newMeeting = await res.json();
    if (!newMeeting.id || newMeeting.speakers.length !== 3 || newMeeting.actions.length === 0) {
      throw new Error(`Pipeline processing output invalid: ${JSON.stringify(newMeeting)}`);
    }
  });

  // 13. Jobs & Templates
  await test('GET /templates returns all 12 templates and GET /jobs returns pipeline jobs', async () => {
    const resTpl = await fetch(`${BASE_URL}/templates`);
    if (resTpl.status !== 200) throw new Error(`Status ${resTpl.status}`);
    const templates = await resTpl.json();
    if (templates.length < 10) throw new Error(`Expected at least 10 templates, got ${templates.length}`);

    const resJobs = await fetch(`${BASE_URL}/jobs`);
    if (resJobs.status !== 200) throw new Error(`Status ${resJobs.status}`);
    const jobs = await resJobs.json();
    if (!Array.isArray(jobs)) throw new Error('Expected jobs array');
  });

  console.log(`\n========================================`);
  console.log(`🏁 Test Summary: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
