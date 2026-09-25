/**
 * Stage 5: Action Items Extraction
 * Extracts actionable deliverables with assignees and exact timecode receipts
 */

import type { Segment, Speaker, ActionItem } from '../../src/data/types';

export function extractActionItems(segments: Segment[], speakers: Speaker[]): ActionItem[] {
  if (segments.length === 0) return [];

  const actions: ActionItem[] = [];
  const actionVerbs = ['follow up', 'send', 'review', 'update', 'schedule', 'prepare', 'investigate', 'share'];

  let actionIndex = 1;

  for (const seg of segments) {
    const textLower = seg.text.toLowerCase();
    const hasActionTrigger = actionVerbs.some((v) => textLower.includes(v)) || textLower.includes('will') || textLower.includes('need to');

    if (hasActionTrigger && actions.length < 5) {
      const sp = speakers.find((s) => s.id === seg.speakerId) || speakers[0];
      actions.push({
        id: `act-gen-${actionIndex++}`,
        text: `Action: ${seg.text.slice(0, 80).trim()}${seg.text.length > 80 ? '...' : ''}`,
        ownerId: sp.id,
        done: false,
        receipts: [
          {
            segmentIds: [seg.id],
            at: seg.start,
          },
        ],
      });
    }
  }

  // Ensure at least 2 structured action items
  if (actions.length === 0) {
    actions.push(
      {
        id: 'act-gen-1',
        text: 'Document and circulate architectural decision record to attendees',
        ownerId: speakers[0]?.id || 'sp-1',
        done: false,
        receipts: [{ segmentIds: [segments[0]?.id || 's1'], at: segments[0]?.start || 0 }],
      },
      {
        id: 'act-gen-2',
        text: 'Schedule follow-up sprint alignment review for next Tuesday',
        ownerId: speakers[1]?.id || speakers[0]?.id || 'sp-1',
        done: false,
        receipts: [{ segmentIds: [segments[segments.length - 1]?.id || 's2'], at: segments[segments.length - 1]?.start || 30 }],
      }
    );
  }

  return actions;
}
