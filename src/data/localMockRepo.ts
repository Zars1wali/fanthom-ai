import type {
  Meeting, Moment, Summary, Clip, ShareLink, ShareOptions,
  SharedView, SearchHit, AskChunk, ViewFilter,
} from './types';
import type { MeetingRepo } from './repo';
import { showpieceMeeting } from './seed/showpiece';
import { otherMeetings } from './seed/others';

// Latency helper (realistic 150-350ms)
const delay = (ms: number = 180) => new Promise(resolve => setTimeout(resolve, ms));

export class MockMeetingRepo implements MeetingRepo {
  private meetings: Map<string, Meeting> = new Map();
  private clips: Map<string, Clip> = new Map();
  private shares: Map<string, { token: string; target: { clipId?: string; meetingId?: string }; opts: ShareOptions }> = new Map();

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.meetings.clear();
    this.clips.clear();
    this.shares.clear();

    // Deep clone seeds so mutations in-session are isolated
    const all = [showpieceMeeting, ...otherMeetings];
    for (const m of all) {
      this.meetings.set(m.id, JSON.parse(JSON.stringify(m)));
    }

    // Seed default demo clips
    const sampleClip: Clip = {
      id: 'clip-roadmap-pricing',
      meetingId: 'mtg-q3-roadmap',
      start: 360,
      end: 480,
      title: 'Usage-based pricing discussion and query limits',
      createdAt: new Date().toISOString(),
    };
    this.clips.set(sampleClip.id, sampleClip);

    // Seed demo shared view
    this.shares.set('demo-clip-1', {
      token: 'demo-clip-1',
      target: { clipId: sampleClip.id, meetingId: 'mtg-q3-roadmap' },
      opts: {
        access: 'anyone',
        includeTranscript: true,
        includeSummary: true,
      },
    });

    this.shares.set('demo-meeting-1', {
      token: 'demo-meeting-1',
      target: { meetingId: 'mtg-q3-roadmap' },
      opts: {
        access: 'anyone',
        includeTranscript: true,
        includeSummary: true,
      },
    });
  }

  async listMeetings(filter?: ViewFilter): Promise<Meeting[]> {
    await delay(120);
    const list = Array.from(this.meetings.values());

    if (!filter || filter === 'all') {
      return list;
    }

    if (filter === 'needs-actions') {
      return list.filter(m => m.actions.some(a => !a.done && (a.ownerId === 'sp-you' || a.ownerId?.includes('you') || !a.ownerId)));
    }

    if (filter === 'shared-with-me') {
      return list.filter(m => Boolean(m.sharedBy));
    }

    if (filter === 'many-speakers') {
      return list.filter(m => m.speakers.length >= 5);
    }

    if (filter === 'long') {
      return list.filter(m => m.duration >= 2000);
    }

    return list;
  }

  async getMeeting(id: string): Promise<Meeting> {
    await delay(100);
    const mtg = this.meetings.get(id);
    if (!mtg) {
      throw new Error(`Meeting not found: ${id}`);
    }
    return JSON.parse(JSON.stringify(mtg));
  }

  async renameMeeting(id: string, title: string): Promise<void> {
    await delay(100);
    const mtg = this.meetings.get(id);
    if (!mtg) throw new Error(`Meeting not found: ${id}`);
    mtg.title = title.trim();
  }

  async assignSpeaker(meetingId: string, speakerId: string, attendeeName: string): Promise<void> {
    await delay(120);
    const mtg = this.meetings.get(meetingId);
    if (!mtg) throw new Error(`Meeting not found: ${meetingId}`);

    const speaker = mtg.speakers.find(s => s.id === speakerId);
    if (speaker) {
      speaker.name = attendeeName.trim();
      speaker.named = true;
      speaker.initials = attendeeName
        .split(' ')
        .map(w => w[0]?.toUpperCase() || '')
        .slice(0, 2)
        .join('');
    }
  }

  async addHighlight(meetingId: string, at: number, note?: string): Promise<Moment> {
    await delay(80);
    const mtg = this.meetings.get(meetingId);
    if (!mtg) throw new Error(`Meeting not found: ${meetingId}`);

    const newMoment: Moment = {
      id: `moment-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      at: Math.round(at),
      kind: 'highlight',
      note: note || undefined,
      byId: 'sp-you',
    };

    mtg.moments.push(newMoment);
    mtg.moments.sort((a, b) => a.at - b.at);
    return newMoment;
  }

  async removeHighlight(meetingId: string, momentId: string): Promise<void> {
    await delay(80);
    const mtg = this.meetings.get(meetingId);
    if (!mtg) return;
    mtg.moments = mtg.moments.filter(m => m.id !== momentId);
  }

  async editBullet(meetingId: string, bulletId: string, text: string): Promise<void> {
    await delay(100);
    const mtg = this.meetings.get(meetingId);
    if (!mtg || !mtg.summary) return;

    for (const b of mtg.summary.catchUp) {
      if (b.id === bulletId) {
        b.text = text;
        b.edited = true;
        return;
      }
    }

    for (const sec of mtg.summary.sections) {
      for (const b of sec.bullets) {
        if (b.id === bulletId) {
          b.text = text;
          b.edited = true;
          return;
        }
      }
    }
  }

  async flagBullet(meetingId: string, _bulletId: string, _reason: string): Promise<void> {
    await delay(80);
    // Bullet flagged event tracked
    const mtg = this.meetings.get(meetingId);
    if (!mtg) return;
  }

  async toggleAction(meetingId: string, actionId: string, done: boolean): Promise<void> {
    await delay(60);
    const mtg = this.meetings.get(meetingId);
    if (!mtg) return;
    const item = mtg.actions.find(a => a.id === actionId);
    if (item) {
      item.done = done;
    }
  }

  async switchTemplate(meetingId: string, template: string): Promise<Summary> {
    await delay(200);
    const mtg = this.meetings.get(meetingId);
    if (!mtg) throw new Error(`Meeting not found: ${meetingId}`);

    if (template === 'Executive') {
      const summary: Summary = {
        template: 'Executive',
        catchUp: [
          {
            id: 'exec-1',
            text: 'Q3 priorities locked to usage-based pricing ($19/seat) and diarization fixes. Hiring remains frozen until board approval.',
            receipts: [{ segmentIds: ['seg-026'], at: 790 }, { segmentIds: ['seg-052'], at: 2760 }],
          },
          {
            id: 'exec-2',
            text: 'Usage-based tier introduces 200 Ask queries per month; existing enterprise contracts remain exempt until renewal.',
            receipts: [{ segmentIds: ['seg-018'], at: 420 }, { segmentIds: ['seg-022'], at: 630 }],
          },
        ],
        sections: [
          {
            heading: 'Key Decisions',
            bullets: [
              {
                id: 'exec-b1',
                text: 'Launch usage-based tier at $19/seat/mo with 200 Ask queries soft cap.',
                receipts: [{ segmentIds: ['seg-018'], at: 420 }],
              },
              {
                id: 'exec-b2',
                text: 'Freeze backfills will be reviewed with the board on the 15th.',
                receipts: [{ segmentIds: ['seg-052'], at: 2760 }],
              },
            ],
          },
          {
            heading: 'Risks & Mitigations',
            bullets: [
              {
                id: 'exec-b3',
                text: 'Customer churn risk addressed by grandfathering active power accounts for 30 days.',
                receipts: [{ segmentIds: ['seg-020'], at: 550 }],
              },
            ],
          },
        ],
      };
      mtg.summary = summary;
      return summary;
    }

    if (template === 'Sales Discovery') {
      const summary: Summary = {
        template: 'Sales Discovery',
        catchUp: [
          {
            id: 'sales-1',
            text: 'Pricing model adjusted to $19/mo usage tier with enterprise minimum at 50 seats with mandatory SSO.',
            receipts: [{ segmentIds: ['seg-016'], at: 360 }],
          },
        ],
        sections: [
          {
            heading: 'Buyer Needs & Objections',
            bullets: [
              {
                id: 'sales-b1',
                text: 'Enterprise accounts expect contract stability during mid-term renewals.',
                receipts: [{ segmentIds: ['seg-022'], at: 630 }],
              },
            ],
          },
          {
            heading: 'Next Steps',
            bullets: [
              {
                id: 'sales-b2',
                text: 'Send revised sales deck with updated tier comparisons by Thursday.',
                receipts: [{ segmentIds: ['seg-026'], at: 790 }],
              },
            ],
          },
        ],
      };
      mtg.summary = summary;
      return summary;
    }

    // Default to Standard
    if (mtg.id === showpieceMeeting.id) {
      const baseSummary: Summary = JSON.parse(JSON.stringify(showpieceMeeting.summary!));
      baseSummary.template = template;
      mtg.summary = baseSummary;
      return baseSummary;
    }

    return mtg.summary || {
      template,
      catchUp: [],
      sections: [],
    };
  }

  async search(query: string, scope: 'meeting' | 'mine' | 'team', meetingId?: string): Promise<SearchHit[]> {
    await delay(120);
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const hits: SearchHit[] = [];
    const targetMeetings = meetingId && scope === 'meeting'
      ? [this.meetings.get(meetingId)].filter((m): m is Meeting => Boolean(m))
      : Array.from(this.meetings.values());

    for (const mtg of targetMeetings) {
      const speakerMap = new Map(mtg.speakers.map(s => [s.id, s]));

      for (const seg of mtg.segments) {
        if (seg.text.toLowerCase().includes(q)) {
          const spk = speakerMap.get(seg.speakerId);
          hits.push({
            meetingId: mtg.id,
            meetingTitle: mtg.title,
            segmentId: seg.id,
            speakerName: spk ? spk.name : 'Unknown Speaker',
            speakerInitials: spk ? spk.initials : '?',
            time: seg.start,
            text: seg.text,
            context: mtg.title,
          });
        }
      }
    }

    return hits.slice(0, 30);
  }

  async *ask(query: string, _scope: 'meeting' | 'mine' | 'team', meetingId?: string): AsyncIterable<AskChunk> {
    const q = query.toLowerCase();

    // 8 canned answers with real receipts matching seed dialogue
    let text = '';
    let citations: { time: number; segmentId: string; meetingId: string }[] = [];

    if (q.includes('price') || q.includes('pricing') || q.includes('tier')) {
      text = 'Priya proposed a 3-tier pricing structure: Free remains unlimited for recording and transcription, a new usage-based tier at $19/seat/month includes 200 Ask queries with priority processing, and Enterprise requires a 50-seat minimum and SSO.';
      citations = [
        { time: 360, segmentId: 'seg-016', meetingId: 'mtg-q3-roadmap' },
        { time: 420, segmentId: 'seg-018', meetingId: 'mtg-q3-roadmap' },
        { time: 790, segmentId: 'seg-026', meetingId: 'mtg-q3-roadmap' },
      ];
    } else if (q.includes('freeze') || q.includes('hire') || q.includes('hiring')) {
      text = 'The product team is down to 6 engineers due to the hiring freeze preventing two backfills. A date for lifting the freeze will be negotiated at the board meeting on the 15th, after which job specs for a backend engineer and product designer will be opened.';
      citations = [
        { time: 30, segmentId: 'seg-003', meetingId: 'mtg-q3-roadmap' },
        { time: 2610, segmentId: 'seg-050', meetingId: 'mtg-q3-roadmap' },
        { time: 2760, segmentId: 'seg-052', meetingId: 'mtg-q3-roadmap' },
      ];
    } else if (q.includes('accuracy') || q.includes('diarization') || q.includes('long call')) {
      text = 'Customer Success reported escalations regarding transcript accuracy and speaker diarization errors on 8+ person calls. Aisha has tagged 15 specific customer bug cases with meeting IDs and timestamps for engineering to investigate.';
      citations = [
        { time: 45, segmentId: 'seg-004', meetingId: 'mtg-q3-roadmap' },
        { time: 3140, segmentId: 'seg-057', meetingId: 'mtg-q3-roadmap' },
      ];
    } else if (q.includes('action') || q.includes('who') || q.includes('assign') || q.includes('task')) {
      text = 'Key actions assigned: Priya sends pricing draft by Thursday; Marcus drafts tier technical spec and updates sprint plan by Monday; Tom prepares role specs by Friday; Aisha compiles the 15 diarization bug cases; and you will address the hiring freeze at the board meeting.';
      citations = [
        { time: 790, segmentId: 'seg-026', meetingId: 'mtg-q3-roadmap' },
        { time: 2610, segmentId: 'seg-050', meetingId: 'mtg-q3-roadmap' },
        { time: 2860, segmentId: 'seg-054', meetingId: 'mtg-q3-roadmap' },
      ];
    } else if (q.includes('enterprise') || q.includes('contract')) {
      text = 'Mid-contract enterprise customers are explicitly exempted from Ask query metering until their contract renewal dates, addressing legal pushback concerns raised during the roadmap sync.';
      citations = [
        { time: 630, segmentId: 'seg-022', meetingId: 'mtg-q3-roadmap' },
      ];
    } else if (q.includes('clip') || q.includes('drag') || q.includes('mobile')) {
      text = 'In the clips design review, Ella Chen introduced inline range-dragging on the Score, while Noah Williams raised concerns about mobile gesture conflicts between range selection and Score scrolling.';
      citations = [
        { time: 0, segmentId: 'ds-001', meetingId: 'mtg-shared-design-review' },
        { time: 37, segmentId: 'ds-002', meetingId: 'mtg-shared-design-review' },
      ];
    } else if (q.includes('nexus') || q.includes('compliance') || q.includes('qbr')) {
      text = 'During the Nexus Financial QBR, David Park stated that degraded transcript quality on 20-person calls is impacting their compliance review team.';
      citations = [
        { time: 27, segmentId: 'qs-002', meetingId: 'mtg-customer-qbr' },
      ];
    } else {
      text = `Regarding "${query}": The team emphasized maintaining unlimited recording on the free tier while reserving advanced AI Ask and priority pipelines for the usage-based tier, with all decisions verified against recorded moments.`;
      citations = [
        { time: 360, segmentId: 'seg-016', meetingId: meetingId || 'mtg-q3-roadmap' },
      ];
    }

    // Stream token by token
    const words = text.split(' ');
    for (const word of words) {
      await new Promise(r => setTimeout(r, 25));
      yield {
        type: 'text',
        content: word + ' ',
      };
    }

    // Yield citations
    for (let i = 0; i < citations.length; i++) {
      const cite = citations[i];
      yield {
        type: 'citation',
        content: `[${i + 1}]`,
        citationIndex: i + 1,
        meetingId: cite.meetingId,
        segmentId: cite.segmentId,
        time: cite.time,
      };
    }

    yield {
      type: 'done',
      content: '',
    };
  }

  async createClip(meetingId: string, start: number, end: number, title: string): Promise<Clip> {
    await delay(120);
    const clipId = `clip-${Date.now()}`;
    const clip: Clip = {
      id: clipId,
      meetingId,
      start: Math.round(start),
      end: Math.round(end),
      title: title.trim() || 'Untitled Clip',
      createdAt: new Date().toISOString(),
    };
    this.clips.set(clipId, clip);
    return clip;
  }

  async createShare(target: { clipId?: string; meetingId?: string }, opts: ShareOptions): Promise<ShareLink> {
    await delay(150);
    const token = `s-${Math.random().toString(36).substring(2, 9)}`;
    this.shares.set(token, {
      token,
      target,
      opts,
    });

    return {
      id: token,
      token,
      url: `/s/${token}`,
      createdAt: new Date().toISOString(),
    };
  }

  async getShared(token: string): Promise<SharedView> {
    await delay(120);
    const share = this.shares.get(token);
    if (!share) {
      // Fallback for default demo links
      const defaultMeeting = this.meetings.get('mtg-q3-roadmap') || showpieceMeeting;
      return {
        meeting: defaultMeeting,
        sharedBy: 'Priya Sharma',
        access: 'anyone',
      };
    }

    const meetingId = share.target.meetingId || (share.target.clipId ? this.clips.get(share.target.clipId)?.meetingId : undefined);
    const meeting = this.meetings.get(meetingId || 'mtg-q3-roadmap') || showpieceMeeting;
    const clip = share.target.clipId ? this.clips.get(share.target.clipId) : undefined;

    return {
      clip,
      meeting,
      sharedBy: 'Priya Sharma',
      access: share.opts.access,
    };
  }
}

// Singleton repository export
export const mockRepo = new MockMeetingRepo();
export const localMockRepo = mockRepo;
