/**
 * Express Router mounting all REST and Streaming endpoints
 * Matches Section 4.5 & HANDOFF.md specifications
 */

import { Router, Request, Response } from 'express';
import { db } from '../db';
import { streamAskAnswer } from '../ai/ask';
import { processMeeting } from '../pipeline';
import type { ViewFilter } from '../../src/data/types';

export const apiRouter = Router();

// --- Health Check ---
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    meetingsCount: db.meetings.size,
    clipsCount: db.clips.size,
    sharesCount: db.shares.size,
  });
});

// --- Meetings Endpoints ---
apiRouter.get('/meetings', (req: Request, res: Response) => {
  const filter = req.query.filter as ViewFilter | undefined;
  const list = db.listMeetings(filter);
  res.json(list);
});

apiRouter.get('/meetings/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const mtg = db.getMeeting(id);
  if (!mtg) {
    res.status(404).json({ error: `Meeting not found: ${id}` });
    return;
  }
  res.json(mtg);
});

apiRouter.patch('/meetings/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { title } = req.body;
  if (typeof title !== 'string') {
    res.status(400).json({ error: 'Title must be a string' });
    return;
  }
  const ok = db.renameMeeting(id, title);
  if (!ok) {
    res.status(404).json({ error: 'Meeting not found' });
    return;
  }
  res.json({ success: true, title });
});

apiRouter.patch('/meetings/:id/speakers/:speakerId', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const speakerId = String(req.params.speakerId);
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    res.status(400).json({ error: 'Valid speaker name required' });
    return;
  }
  const ok = db.assignSpeaker(id, speakerId, name);
  if (!ok) {
    res.status(404).json({ error: 'Meeting or speaker not found' });
    return;
  }
  res.json({ success: true });
});

// --- Highlights & Moments ---
apiRouter.post('/meetings/:id/highlights', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { at, note } = req.body;
  if (typeof at !== 'number') {
    res.status(400).json({ error: 'Numeric "at" timestamp required' });
    return;
  }
  const moment = db.addHighlight(id, at, note);
  if (!moment) {
    res.status(404).json({ error: 'Meeting not found' });
    return;
  }
  res.status(201).json(moment);
});

apiRouter.delete('/meetings/:id/highlights/:momentId', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const momentId = String(req.params.momentId);
  const ok = db.removeHighlight(id, momentId);
  if (!ok) {
    res.status(404).json({ error: 'Moment not found' });
    return;
  }
  res.json({ success: true });
});

// --- Bullets & Flags ---
apiRouter.patch('/meetings/:id/bullets/:bulletId', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const bulletId = String(req.params.bulletId);
  const { text } = req.body;
  if (typeof text !== 'string') {
    res.status(400).json({ error: 'Text required' });
    return;
  }
  const ok = db.editBullet(id, bulletId, text);
  if (!ok) {
    res.status(404).json({ error: 'Bullet or meeting not found' });
    return;
  }
  res.json({ success: true });
});

apiRouter.post('/meetings/:id/bullets/:bulletId/flag', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const bulletId = String(req.params.bulletId);
  const { reason } = req.body;
  const ok = db.flagBullet(id, bulletId, reason || 'Inaccurate');
  if (!ok) {
    res.status(404).json({ error: 'Meeting not found' });
    return;
  }
  res.json({ success: true, flagged: true });
});

// --- Actions ---
apiRouter.patch('/meetings/:id/actions/:actionId', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const actionId = String(req.params.actionId);
  const { done } = req.body;
  if (typeof done !== 'boolean') {
    res.status(400).json({ error: 'Boolean "done" required' });
    return;
  }
  const ok = db.toggleAction(id, actionId, done);
  if (!ok) {
    res.status(404).json({ error: 'Action item not found' });
    return;
  }
  res.json({ success: true, done });
});

// --- Templates & Summaries ---
apiRouter.post('/meetings/:id/summary/template', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { template } = req.body;
  if (!template || typeof template !== 'string') {
    res.status(400).json({ error: 'Template ID required' });
    return;
  }
  const summary = db.switchTemplate(id, template);
  if (!summary) {
    res.status(404).json({ error: 'Meeting not found' });
    return;
  }
  res.json(summary);
});

apiRouter.get('/templates', (_req: Request, res: Response) => {
  res.json(Array.from(db.templates.values()));
});

// --- Search ---
apiRouter.get('/search', (req: Request, res: Response) => {
  const q = (req.query.q as string) || '';
  const scope = (req.query.scope as 'meeting' | 'mine' | 'team') || 'team';
  const meetingId = req.query.meetingId as string | undefined;

  const hits = db.search(q, scope, meetingId);
  res.json(hits);
});

// --- Ask AI (Server-Sent Events Streaming) ---
apiRouter.get('/ask', async (req: Request, res: Response) => {
  const q = (req.query.q as string) || 'Summarize key points';
  const scope = (req.query.scope as 'meeting' | 'mine' | 'team') || 'team';
  const meetingId = req.query.meetingId as string | undefined;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  for await (const chunk of streamAskAnswer(q, scope, meetingId)) {
    res.write(`data: ${JSON.stringify(chunk)}\n\n`);
  }

  res.end();
});

// --- Clips & Sharing ---
apiRouter.post('/clips', (req: Request, res: Response) => {
  const { meetingId, start, end, title } = req.body;
  if (!meetingId || typeof start !== 'number' || typeof end !== 'number') {
    res.status(400).json({ error: 'Missing required clip parameters' });
    return;
  }
  const clip = db.createClip(meetingId, start, end, title || 'Highlight clip');
  if (!clip) {
    res.status(404).json({ error: 'Meeting not found' });
    return;
  }
  res.status(201).json(clip);
});

apiRouter.post('/shares', (req: Request, res: Response) => {
  const { target, opts } = req.body;
  if (!target || !opts) {
    res.status(400).json({ error: 'Target and options required' });
    return;
  }
  const share = db.createShare(target, opts);
  res.status(201).json(share);
});

apiRouter.get('/shares/:token', (req: Request, res: Response) => {
  const token = String(req.params.token);
  const shared = db.getShared(token);
  if (!shared) {
    res.status(404).json({ error: 'Share link expired or not found' });
    return;
  }
  res.json(shared);
});

// --- Calendar ---
apiRouter.get('/calendar', (_req: Request, res: Response) => {
  res.json(db.listCalendarEvents());
});

apiRouter.patch('/calendar/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { record } = req.body;
  if (typeof record !== 'boolean') {
    res.status(400).json({ error: 'Boolean "record" parameter required' });
    return;
  }
  const ok = db.toggleCalendarRecord(id, record);
  if (!ok) {
    res.status(404).json({ error: 'Calendar event not found' });
    return;
  }
  res.json({ success: true, record });
});

// --- Processing Pipeline Trigger ---
apiRouter.post('/pipeline/process', (req: Request, res: Response) => {
  const { title, rawSegments, templateId, platform } = req.body;
  if (!title || !Array.isArray(rawSegments)) {
    res.status(400).json({ error: 'Title and array of rawSegments required' });
    return;
  }
  try {
    const meeting = processMeeting({ title, rawSegments, templateId, platform });
    res.status(201).json(meeting);
  } catch (err: unknown) {
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
});

// --- Jobs ---
apiRouter.get('/jobs', (_req: Request, res: Response) => {
  res.json(db.listJobs());
});
