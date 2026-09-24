import type { DocEndpoint } from './types';

export const API_ENDPOINTS: DocEndpoint[] = [
  {
    method: 'GET',
    path: '/v1/meetings',
    summary: 'List meetings',
    description: 'Returns a paginated list of meetings recorded by the authenticated workspace, sorted by date descending.',
    auth: 'Bearer fathom_live_...',
    params: [
      { name: 'limit', type: 'integer', required: false, description: 'Number of results to return (max 100, default 20).' },
      { name: 'starting_after', type: 'string', required: false, description: 'Cursor for pagination.' },
      { name: 'tag', type: 'string', required: false, description: 'Filter by custom meeting tag (e.g. sales, internal).' },
    ],
    responseBody: JSON.stringify(
      {
        object: 'list',
        data: [
          {
            id: 'mtg_891048',
            title: 'Acme Corp — Architecture Review',
            duration_seconds: 3480,
            recorded_at: '2026-09-24T14:00:00Z',
            attendees: ['Alex', 'Priya', 'Marcus'],
            receipts_count: 8,
          },
        ],
        has_more: false,
      },
      null,
      2
    ),
    curlSnippet: `curl https://api.fathom.ai/v1/meetings \\\n  -H "Authorization: Bearer $FATHOM_API_KEY" \\\n  -G -d limit=10`,
    tsSnippet: `import { FathomClient } from '@fathom/sdk';\n\nconst fathom = new FathomClient({ apiKey: process.env.FATHOM_API_KEY });\nconst meetings = await fathom.meetings.list({ limit: 10 });\nconsole.log(meetings.data);`,
    pySnippet: `from fathom import Fathom\n\nclient = Fathom(api_key="your_api_key")\nmeetings = client.meetings.list(limit=10)\nfor m in meetings.data:\n    print(m.title, m.duration_seconds)`,
  },
  {
    method: 'GET',
    path: '/v1/meetings/:id',
    summary: 'Retrieve a meeting',
    description: 'Retrieves the complete metadata, duration, speaker list, and recording status for a specific meeting.',
    auth: 'Bearer fathom_live_...',
    params: [{ name: 'id', type: 'string', required: true, description: 'Unique identifier of the meeting.' }],
    responseBody: JSON.stringify(
      {
        id: 'mtg-q3-roadmap',
        title: 'Q3 Product Roadmap Review',
        duration_seconds: 3480,
        recorded_at: '2026-09-24T10:00:00Z',
        recording_mode: 'bot_free',
        speakers: [
          { initial: 'P', name: 'Priya', talk_time_seconds: 820 },
          { initial: 'A', name: 'Alex', talk_time_seconds: 940 },
          { initial: 'M', name: 'Marcus', talk_time_seconds: 680 },
        ],
      },
      null,
      2
    ),
    curlSnippet: `curl https://api.fathom.ai/v1/meetings/mtg-q3-roadmap \\\n  -H "Authorization: Bearer $FATHOM_API_KEY"`,
    tsSnippet: `const meeting = await fathom.meetings.retrieve('mtg-q3-roadmap');\nconsole.log(meeting.title, meeting.speakers);`,
    pySnippet: `meeting = client.meetings.retrieve("mtg-q3-roadmap")\nprint(meeting.title, meeting.speakers)`,
  },
  {
    method: 'GET',
    path: '/v1/meetings/:id/transcript',
    summary: 'Retrieve meeting transcript',
    description: 'Fetches the verbatim multi-speaker transcript segments with exact millisecond timecodes and confidence scores.',
    auth: 'Bearer fathom_live_...',
    params: [{ name: 'id', type: 'string', required: true, description: 'Unique identifier of the meeting.' }],
    responseBody: JSON.stringify(
      {
        meeting_id: 'mtg-q3-roadmap',
        segments: [
          {
            id: 'seg_001',
            speaker: 'Priya',
            speaker_initial: 'P',
            start_ms: 420000,
            end_ms: 432500,
            text: 'We are launching the usage-based tier at $19 per seat with a 200 query cap.',
          },
        ],
      },
      null,
      2
    ),
    curlSnippet: `curl https://api.fathom.ai/v1/meetings/mtg-q3-roadmap/transcript \\\n  -H "Authorization: Bearer $FATHOM_API_KEY"`,
    tsSnippet: `const transcript = await fathom.meetings.getTranscript('mtg-q3-roadmap');\nconsole.log(transcript.segments.length);`,
    pySnippet: `transcript = client.meetings.get_transcript("mtg-q3-roadmap")\nfor seg in transcript.segments:\n    print(f"[{seg.start_ms}ms] {seg.speaker}: {seg.text}")`,
  },
  {
    method: 'GET',
    path: '/v1/meetings/:id/summary',
    summary: 'Retrieve AI summary & receipts',
    description: 'Retrieves the synthesized executive recap with structured headings and clickable audio receipt timecodes.',
    auth: 'Bearer fathom_live_...',
    params: [
      { name: 'id', type: 'string', required: true, description: 'Unique identifier of the meeting.' },
      { name: 'template_id', type: 'string', required: false, description: 'Optional template override ID.' },
    ],
    responseBody: JSON.stringify(
      {
        meeting_id: 'mtg-q3-roadmap',
        template: 'sales_discovery',
        sections: [
          {
            heading: 'Key Decisions',
            items: [
              {
                text: 'Launch usage-based tier at $19/seat with 200 query cap',
                receipt_timecode: 420,
                speaker: 'P',
                speaker_name: 'Priya',
              },
            ],
          },
        ],
      },
      null,
      2
    ),
    curlSnippet: `curl https://api.fathom.ai/v1/meetings/mtg-q3-roadmap/summary \\\n  -H "Authorization: Bearer $FATHOM_API_KEY"`,
    tsSnippet: `const summary = await fathom.meetings.getSummary('mtg-q3-roadmap');\nconsole.log(summary.sections[0].items[0].text);`,
    pySnippet: `summary = client.meetings.get_summary("mtg-q3-roadmap")\nprint(summary.sections[0].heading)`,
  },
  {
    method: 'POST',
    path: '/v1/meetings/:id/ask',
    summary: 'Ask AI question on meeting',
    description: 'Executes a conversational query against the meeting transcript and returns a cited response with audio receipts.',
    auth: 'Bearer fathom_live_...',
    params: [{ name: 'id', type: 'string', required: true, description: 'Meeting identifier.' }],
    requestBody: JSON.stringify({ question: 'What pricing tiers were proposed?' }, null, 2),
    responseBody: JSON.stringify(
      {
        answer: 'Priya proposed a usage-based tier at $19 per seat with 200 queries included monthly.',
        citations: [{ timecode: 420, speaker: 'P', quote: 'Launch usage-based tier at $19/seat' }],
      },
      null,
      2
    ),
    curlSnippet: `curl -X POST https://api.fathom.ai/v1/meetings/mtg-q3-roadmap/ask \\\n  -H "Authorization: Bearer $FATHOM_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"question":"What pricing tiers were proposed?"}'`,
    tsSnippet: `const response = await fathom.meetings.ask('mtg-q3-roadmap', {\n  question: 'What pricing tiers were proposed?'\n});\nconsole.log(response.answer, response.citations);`,
    pySnippet: `res = client.meetings.ask("mtg-q3-roadmap", question="What pricing tiers were proposed?")\nprint(res.answer, res.citations)`,
  },
  {
    method: 'POST',
    path: '/v1/clips',
    summary: 'Create video highlight clip',
    description: 'Generates a trimmed video clip from a meeting start and end second, returning a frictionless public share URL.',
    auth: 'Bearer fathom_live_...',
    requestBody: JSON.stringify(
      {
        meeting_id: 'mtg-q3-roadmap',
        title: 'Pricing Decision Clip',
        start_seconds: 410,
        end_seconds: 460,
      },
      null,
      2
    ),
    responseBody: JSON.stringify(
      {
        clip_id: 'clp_481029',
        share_url: 'https://demo.fathom.ai/s/demo-share-token?t=410',
        duration_seconds: 50,
      },
      null,
      2
    ),
    curlSnippet: `curl -X POST https://api.fathom.ai/v1/clips \\\n  -H "Authorization: Bearer $FATHOM_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"meeting_id":"mtg-q3-roadmap","start_seconds":410,"end_seconds":460}'`,
    tsSnippet: `const clip = await fathom.clips.create({\n  meetingId: 'mtg-q3-roadmap',\n  startSeconds: 410,\n  endSeconds: 460\n});\nconsole.log(clip.shareUrl);`,
    pySnippet: `clip = client.clips.create(meeting_id="mtg-q3-roadmap", start_seconds=410, end_seconds=460)\nprint(clip.share_url)`,
  },
  {
    method: 'GET',
    path: '/v1/webhooks',
    summary: 'List active webhooks',
    description: 'Returns all active webhook endpoints configured for the authenticated workspace.',
    auth: 'Bearer fathom_live_...',
    responseBody: JSON.stringify(
      {
        object: 'list',
        data: [
          {
            id: 'whk_918231',
            url: 'https://api.yourdomain.com/webhooks/fathom',
            events: ['meeting.completed', 'meeting.summary.created'],
            status: 'active',
          },
        ],
      },
      null,
      2
    ),
    curlSnippet: `curl https://api.fathom.ai/v1/webhooks \\\n  -H "Authorization: Bearer $FATHOM_API_KEY"`,
    tsSnippet: `const webhooks = await fathom.webhooks.list();\nconsole.log(webhooks.data);`,
    pySnippet: `webhooks = client.webhooks.list()\nprint(webhooks.data)`,
  },
  {
    method: 'POST',
    path: '/v1/webhooks',
    summary: 'Create webhook subscription',
    description: 'Subscribes a secure HTTPS endpoint to real-time meeting events with HMAC SHA-256 signature verification.',
    auth: 'Bearer fathom_live_...',
    requestBody: JSON.stringify(
      {
        url: 'https://api.yourdomain.com/webhooks/fathom',
        events: ['meeting.completed', 'action_item.created'],
        secret: 'whsec_customSecretKey...',
      },
      null,
      2
    ),
    responseBody: JSON.stringify(
      {
        id: 'whk_918231',
        url: 'https://api.yourdomain.com/webhooks/fathom',
        events: ['meeting.completed', 'action_item.created'],
        created_at: '2026-09-24T18:00:00Z',
      },
      null,
      2
    ),
    curlSnippet: `curl -X POST https://api.fathom.ai/v1/webhooks \\\n  -H "Authorization: Bearer $FATHOM_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"url":"https://api.yourdomain.com/webhooks/fathom","events":["meeting.completed"]}'`,
    tsSnippet: `const webhook = await fathom.webhooks.create({\n  url: 'https://api.yourdomain.com/webhooks/fathom',\n  events: ['meeting.completed']\n});`,
    pySnippet: `wh = client.webhooks.create(url="https://api.yourdomain.com/webhooks/fathom", events=["meeting.completed"])`,
  },
  {
    method: 'DELETE',
    path: '/v1/webhooks/:id',
    summary: 'Delete webhook subscription',
    description: 'Removes an existing webhook subscription and ceases sending event payloads.',
    auth: 'Bearer fathom_live_...',
    params: [{ name: 'id', type: 'string', required: true, description: 'Webhook endpoint ID.' }],
    responseBody: JSON.stringify({ id: 'whk_918231', deleted: true }, null, 2),
    curlSnippet: `curl -X DELETE https://api.fathom.ai/v1/webhooks/whk_918231 \\\n  -H "Authorization: Bearer $FATHOM_API_KEY"`,
    tsSnippet: `await fathom.webhooks.delete('whk_918231');`,
    pySnippet: `client.webhooks.delete("whk_918231")`,
  },
  {
    method: 'GET',
    path: '/v1/templates',
    summary: 'List summary templates',
    description: 'Lists all built-in and custom workspace summary templates.',
    auth: 'Bearer fathom_live_...',
    responseBody: JSON.stringify(
      {
        object: 'list',
        data: [
          { id: 'standard', name: 'Standard Recap', format: 'bullets' },
          { id: 'sales_discovery', name: 'Sales Discovery (MEDDIC)', format: 'table' },
          { id: 'eng_standup', name: 'Team Standup', format: 'checklist' },
        ],
      },
      null,
      2
    ),
    curlSnippet: `curl https://api.fathom.ai/v1/templates \\\n  -H "Authorization: Bearer $FATHOM_API_KEY"`,
    tsSnippet: `const templates = await fathom.templates.list();`,
    pySnippet: `templates = client.templates.list()`,
  },
  {
    method: 'POST',
    path: '/v1/templates',
    summary: 'Create custom summary template',
    description: 'Creates a custom summary template with defined section instructions and formatting rules.',
    auth: 'Bearer fathom_live_...',
    requestBody: JSON.stringify(
      {
        name: 'Executive Board Briefing',
        audience: 'Executive Board',
        sections: [
          { heading: 'Strategic Outcomes', instruction: 'List decisions impacting Q4 budget', format: 'bullets' },
        ],
      },
      null,
      2
    ),
    responseBody: JSON.stringify({ id: 'tmpl_exec_9812', name: 'Executive Board Briefing', status: 'ready' }, null, 2),
    curlSnippet: `curl -X POST https://api.fathom.ai/v1/templates \\\n  -H "Authorization: Bearer $FATHOM_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"name":"Executive Board Briefing"}'`,
    tsSnippet: `const tmpl = await fathom.templates.create({ name: 'Executive Board Briefing', sections: [] });`,
    pySnippet: `tmpl = client.templates.create(name="Executive Board Briefing", sections=[])`,
  },
  {
    method: 'GET',
    path: '/v1/teams/members',
    summary: 'List team members',
    description: 'Lists all users within the authenticated workspace and their role permissions.',
    auth: 'Bearer fathom_live_...',
    responseBody: JSON.stringify(
      {
        data: [
          { id: 'usr_001', name: 'Alex Morgan', email: 'alex@company.com', role: 'admin' },
          { id: 'usr_002', name: 'Priya Sharma', email: 'priya@company.com', role: 'member' },
        ],
      },
      null,
      2
    ),
    curlSnippet: `curl https://api.fathom.ai/v1/teams/members \\\n  -H "Authorization: Bearer $FATHOM_API_KEY"`,
    tsSnippet: `const members = await fathom.teams.listMembers();`,
    pySnippet: `members = client.teams.list_members()`,
  },
];

export const LLMS_TXT_CONTENT = `# Fathom Meeting Intelligence Platform
> High-accuracy meeting transcription, audio receipts, and conversational API.

## Core Capabilities
- Sub-50ms speaker diarization across up to 8 concurrent speakers.
- Verbatim transcription with timestamped audio receipts for every AI claim.
- The Score: Multi-track visual timeline of conversation cadence.
- Bi-directional CRM synchronization with Salesforce, HubSpot, Slack, and Notion.
- Native Model Context Protocol (MCP) server for Claude Desktop and AI agents.

## API Base URL
https://api.fathom.ai/v1

## Primary REST Endpoints
- GET /v1/meetings : List meetings with metadata and attendee lists.
- GET /v1/meetings/:id : Retrieve meeting details and speaker segment breakdown.
- GET /v1/meetings/:id/transcript : Verbatim transcript with millisecond timecodes.
- GET /v1/meetings/:id/summary : Structured summary with timecode receipt chips.
- POST /v1/meetings/:id/ask : Ask natural language question backed by spoken receipts.
- POST /v1/clips : Create shareable trimmed video clips.
- GET /v1/webhooks : Manage real-time webhook event subscriptions.

## Authentication
HTTP Authorization Header: Bearer fathom_live_<secret_key>
`;
