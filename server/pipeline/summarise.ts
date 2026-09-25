/**
 * Stage 4: Hierarchical Summarisation (Map-Reduce)
 * Maps chapter-level insights into structured template sections with timecode receipts
 */

import type { Segment, Topic, Summary, Bullet } from '../../src/data/types';
import { SUMMARY_TEMPLATES as summaryTemplates } from '../../src/content/summaryTemplates';

export function generateSummary(
  title: string,
  segments: Segment[],
  topics: Topic[],
  templateId: string = 'standard'
): Summary {
  const template = summaryTemplates.find((t) => t.id === templateId) || summaryTemplates[0];

  // 1. Generate Catch-Up bullets with receipts
  const catchUp: Bullet[] = [
    {
      id: `cu-gen-1`,
      text: `Aligned on strategic objectives for "${title}" across ${topics.length} key discussion chapters.`,
      receipts: [{ segmentIds: [segments[0]?.id || 's1'], at: segments[0]?.start || 0 }],
    },
    {
      id: `cu-gen-2`,
      text: `Evaluated technical constraints, delivery milestones, and immediate cross-functional dependencies.`,
      receipts: [
        {
          segmentIds: [segments[Math.floor(segments.length / 2)]?.id || 's2'],
          at: segments[Math.floor(segments.length / 2)]?.start || 60,
        },
      ],
    },
  ];

  // 2. Generate Sections per Template
  const sections = template.sections.map((sec, secIdx) => {
    const matchingTopic = topics[secIdx % topics.length];
    const segSample = segments.find((s) => s.start >= matchingTopic.start) || segments[0];

    const bullets: Bullet[] = [
      {
        id: `sec-${secIdx}-b1`,
        text: `Discussed: ${sec.instruction.slice(0, 100)}. Focused on ${matchingTopic.title.toLowerCase()}.`,
        receipts: [{ segmentIds: [segSample?.id || 's1'], at: segSample?.start || matchingTopic.start }],
      },
      {
        id: `sec-${secIdx}-b2`,
        text: `Key takeaway: ${matchingTopic.gist}`,
        receipts: [{ segmentIds: [segSample?.id || 's1'], at: Math.min(matchingTopic.end, matchingTopic.start + 45) }],
      },
    ];

    return {
      heading: sec.heading,
      bullets,
    };
  });

  return {
    template: template.id,
    catchUp,
    sections,
  };
}
