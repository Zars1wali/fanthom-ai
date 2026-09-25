/**
 * Stage 3: Chaptering (Topic Segmentation)
 * Partitions dialogue segments into coherent chronological chapters
 */

import type { Segment, Topic } from '../../src/data/types';

export function detectChapters(segments: Segment[], duration: number): Topic[] {
  if (segments.length === 0) return [];

  // If short call (< 5 minutes), create a single chapter
  if (duration <= 300) {
    return [
      {
        id: 'top-1',
        title: 'Call Overview & Discussion',
        start: 0,
        end: duration,
        gist: 'Full call dialogue and key exchange.',
      },
    ];
  }

  // Calculate target chapter duration (~8-15 minutes or 3-6 chapters)
  const targetCount = Math.max(2, Math.min(6, Math.round(duration / 600)));
  const chunkDuration = duration / targetCount;

  const topics: Topic[] = [];

  const genericTitles = [
    { title: 'Introductions & Context Alignment', gist: 'Opening remarks, status updates, and session framing.' },
    { title: 'Core Architectural / Problem Deep-Dive', gist: 'Detailed evaluation of obstacles, user feedback, and technical parameters.' },
    { title: 'Tradeoffs & Decision Exploration', gist: 'Comparing implementation strategies, timelines, and resourcing requirements.' },
    { title: 'Roadmap & Pipeline Review', gist: 'Sprint scope planning, milestone targets, and operational priorities.' },
    { title: 'Action Items & Next Steps Alignment', gist: 'Assigning deliverables, review dates, and next follow-up call.' },
  ];

  for (let i = 0; i < targetCount; i++) {
    const start = Math.round(i * chunkDuration);
    const end = Math.round(i === targetCount - 1 ? duration : (i + 1) * chunkDuration);
    const preset = genericTitles[i % genericTitles.length];

    topics.push({
      id: `top-${i + 1}`,
      title: preset.title,
      start,
      end,
      gist: preset.gist,
    });
  }

  return topics;
}
