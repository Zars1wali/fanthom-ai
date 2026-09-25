/**
 * Stage 2: Normalise
 * - Merges same-speaker adjacent turns with <1.5s gap
 * - Assigns accessible speaker colors (1-8)
 * - Computes talk-time percentages
 */

import type { Speaker, Segment } from '../../src/data/types';

export interface RawSegment {
  speakerName: string;
  start: number;
  end: number;
  text: string;
}

export interface NormalisedResult {
  speakers: Speaker[];
  segments: Segment[];
  duration: number;
}

export function normalise(rawSegments: RawSegment[]): NormalisedResult {
  if (rawSegments.length === 0) {
    return { speakers: [], segments: [], duration: 0 };
  }

  // 1. Identify unique speakers
  const speakerMap = new Map<string, { totalTime: number; colorIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 }>();
  let nextColorIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 1;

  for (const raw of rawSegments) {
    const name = raw.speakerName.trim() || 'Speaker';
    const dur = Math.max(1, raw.end - raw.start);
    if (!speakerMap.has(name)) {
      speakerMap.set(name, {
        totalTime: dur,
        colorIndex: nextColorIndex,
      });
      nextColorIndex = ((nextColorIndex % 8) + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    } else {
      const entry = speakerMap.get(name)!;
      entry.totalTime += dur;
    }
  }

  // Compute total meeting duration & talk percentages
  let maxEnd = 0;
  for (const s of rawSegments) {
    if (s.end > maxEnd) maxEnd = s.end;
  }
  const totalMeetingDuration = Math.max(1, maxEnd);

  const speakers: Speaker[] = [];
  const speakerNameToId = new Map<string, string>();
  let spIndex = 1;

  for (const [name, meta] of speakerMap.entries()) {
    const id = `sp-${spIndex++}`;
    speakerNameToId.set(name, id);
    const parts = name.split(' ').filter(Boolean);
    const initials = (parts[0]?.[0] || 'S') + (parts[1]?.[0] || '');

    speakers.push({
      id,
      name,
      initials,
      colorIndex: meta.colorIndex,
      talkPct: Math.round((meta.totalTime / totalMeetingDuration) * 100),
      named: true,
      isYou: name.toLowerCase().includes('you') || name.toLowerCase().includes('alex'),
    });
  }

  // 2. Merge adjacent same-speaker turns (<1.5s gap)
  const segments: Segment[] = [];
  let segIndex = 1;

  for (let i = 0; i < rawSegments.length; i++) {
    const cur = rawSegments[i];
    const spId = speakerNameToId.get(cur.speakerName.trim() || 'Speaker') || 'sp-1';

    if (segments.length > 0) {
      const prev = segments[segments.length - 1];
      if (prev.speakerId === spId && cur.start - prev.end <= 1.5) {
        // Merge with previous segment
        prev.end = cur.end;
        prev.text = `${prev.text} ${cur.text.trim()}`;
        continue;
      }
    }

    segments.push({
      id: `seg-${segIndex++}`,
      speakerId: spId,
      start: cur.start,
      end: cur.end,
      text: cur.text.trim(),
    });
  }

  return {
    speakers,
    segments,
    duration: Math.round(totalMeetingDuration),
  };
}
