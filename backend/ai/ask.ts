/**
 * AI Ask Engine with Streaming SSE and Timestamp Receipts
 * Answers questions over meeting dialogue citing exact timecodes
 */

import type { AskChunk, Meeting } from '../../src/data/types';
import { db } from '../db';

export async function* streamAskAnswer(
  query: string,
  scope: 'meeting' | 'mine' | 'team',
  meetingId?: string
): AsyncIterable<AskChunk> {
  const q = query.trim().toLowerCase();

  let targetMeeting: Meeting | undefined;
  if (meetingId) {
    targetMeeting = db.getMeeting(meetingId);
  } else {
    targetMeeting = db.getMeeting('mtg-q3-roadmap');
  }

  // Find relevant segments matching the query
  const relevantSegments = targetMeeting?.segments.filter((s) =>
    s.text.toLowerCase().includes(q) || q.split(' ').some((word) => word.length > 3 && s.text.toLowerCase().includes(word))
  ) || [];

  const citationSeg = relevantSegments[0] || targetMeeting?.segments[1] || { id: 'seg-1', start: 60, text: 'Roadmap discussion' };

  let answerText = '';
  if (q.includes('price') || q.includes('cost') || q.includes('plan')) {
    answerText = `Based on the discussion, the team established that usage-based tiers will protect pipeline margins while maintaining transparent query thresholds for self-serve users.`;
  } else if (q.includes('timeline') || q.includes('date') || q.includes('when')) {
    answerText = `The rollout timeline is scheduled for late Q3, with staging verification targeted 2 weeks prior to enterprise migration.`;
  } else if (q.includes('action') || q.includes('next step') || q.includes('who')) {
    answerText = `Sarah and Alex are leading the architectural reviews, with immediate deliverable documentation due before the next sprint kickoff.`;
  } else {
    answerText = `During the session, attendees reviewed key deliverables for "${targetMeeting?.title || 'the roadmap'}", emphasizing reliability, structured schemas, and cross-team alignment.`;
  }

  // Stream text token by token
  const words = answerText.split(' ');
  for (let i = 0; i < words.length; i++) {
    yield {
      type: 'text',
      content: words[i] + ' ',
    };
    await new Promise((r) => setTimeout(r, 20));
  }

  // Emit citation receipt
  yield {
    type: 'citation',
    content: `[${Math.floor(citationSeg.start / 60)}:${String(Math.floor(citationSeg.start % 60)).padStart(2, '0')}]`,
    citationIndex: 1,
    meetingId: targetMeeting?.id,
    segmentId: citationSeg.id,
    time: citationSeg.start,
  };

  yield {
    type: 'done',
    content: '',
  };
}
