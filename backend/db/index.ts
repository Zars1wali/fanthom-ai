/**
 * In-memory & Persistent database store matching IMPLEMENTATION_PLAN.md Section 4.4
 */

import type {
  Meeting,
  Moment,
  Summary,
  Clip,
  ShareLink,
  ShareOptions,
  SharedView,
  SearchHit,
  ViewFilter,
  ActionItem,
} from '../../src/data/types';
import type {
  WorkspaceRecord,
  UserRecord,
  CalendarEventRecord,
  JobRecord,
  TemplateRecord,
  ShareRecord,
} from './schema';
import { showpieceMeeting } from '../../src/data/seed/showpiece';
import { otherMeetings } from '../../src/data/seed/others';
import { SUMMARY_TEMPLATES as summaryTemplates } from '../../src/content/summaryTemplates';

export class Database {
  public workspaces: Map<string, WorkspaceRecord> = new Map();
  public users: Map<string, UserRecord> = new Map();
  public meetings: Map<string, Meeting> = new Map();
  public clips: Map<string, Clip> = new Map();
  public shares: Map<string, ShareRecord> = new Map();
  public calendarEvents: Map<string, CalendarEventRecord> = new Map();
  public jobs: Map<string, JobRecord> = new Map();
  public templates: Map<string, TemplateRecord> = new Map();

  constructor() {
    this.seed();
  }

  public seed(): void {
    // 1. Workspace & Users
    const defaultWorkspace: WorkspaceRecord = {
      id: 'ws-main',
      name: 'Acme Product & Growth',
      createdAt: '2026-08-01T09:00:00Z',
    };
    this.workspaces.set(defaultWorkspace.id, defaultWorkspace);

    const defaultUsers: UserRecord[] = [
      { id: 'usr-1', workspaceId: 'ws-main', name: 'Alex Rivera', email: 'alex@acme.corp', avatarColor: '#2563EB' },
      { id: 'usr-2', workspaceId: 'ws-main', name: 'Sarah Chen', email: 'sarah@acme.corp', avatarColor: '#059669' },
      { id: 'usr-3', workspaceId: 'ws-main', name: 'Marcus Vance', email: 'marcus@acme.corp', avatarColor: '#D97706' },
      { id: 'usr-4', workspaceId: 'ws-main', name: 'Elena Rostova', email: 'elena@acme.corp', avatarColor: '#7C3AED' },
    ];
    for (const u of defaultUsers) {
      this.users.set(u.id, u);
    }

    // 2. Seed Meetings
    const all = [showpieceMeeting, ...otherMeetings];
    for (const m of all) {
      this.meetings.set(m.id, JSON.parse(JSON.stringify(m)));
    }

    // 3. Seed Clips
    const sampleClip: Clip = {
      id: 'clip-roadmap-pricing',
      meetingId: 'mtg-q3-roadmap',
      start: 360,
      end: 480,
      title: 'Usage-based pricing discussion and query limits',
      createdAt: new Date().toISOString(),
    };
    this.clips.set(sampleClip.id, sampleClip);

    // 4. Seed Shares
    const sampleShareClip: ShareRecord = {
      id: 'sh-1',
      token: 'demo-clip-1',
      meetingId: 'mtg-q3-roadmap',
      clipId: sampleClip.id,
      sharedBy: 'Alex Rivera',
      opts: { access: 'anyone', includeTranscript: true, includeSummary: true },
      createdAt: new Date().toISOString(),
      viewCount: 14,
    };
    this.shares.set(sampleShareClip.token, sampleShareClip);

    const sampleShareMeeting: ShareRecord = {
      id: 'sh-2',
      token: 'demo-meeting-1',
      meetingId: 'mtg-q3-roadmap',
      sharedBy: 'Alex Rivera',
      opts: { access: 'anyone', includeTranscript: true, includeSummary: true },
      createdAt: new Date().toISOString(),
      viewCount: 28,
    };
    this.shares.set(sampleShareMeeting.token, sampleShareMeeting);

    // 5. Seed Calendar Events
    const events: CalendarEventRecord[] = [
      {
        id: 'cal-1',
        workspaceId: 'ws-main',
        title: 'Weekly Leadership Standup',
        startsAt: new Date(Date.now() + 3600000).toISOString(),
        endsAt: new Date(Date.now() + 5400000).toISOString(),
        link: 'https://meet.google.com/abc-defg-hij',
        platform: 'meet',
        record: true,
        attendees: [
          { name: 'Alex Rivera', email: 'alex@acme.corp' },
          { name: 'Sarah Chen', email: 'sarah@acme.corp' },
        ],
      },
      {
        id: 'cal-2',
        workspaceId: 'ws-main',
        title: 'Enterprise Pipeline Review (Q3)',
        startsAt: new Date(Date.now() + 86400000).toISOString(),
        endsAt: new Date(Date.now() + 90000000).toISOString(),
        link: 'https://zoom.us/j/9876543210',
        platform: 'zoom',
        record: true,
        attendees: [
          { name: 'Marcus Vance', email: 'marcus@acme.corp' },
          { name: 'Elena Rostova', email: 'elena@acme.corp' },
        ],
      },
      {
        id: 'cal-3',
        workspaceId: 'ws-main',
        title: 'Customer Onboarding: FinScale AI',
        startsAt: new Date(Date.now() + 172800000).toISOString(),
        endsAt: new Date(Date.now() + 176400000).toISOString(),
        link: 'https://teams.microsoft.com/l/meetup-join/12345',
        platform: 'teams',
        record: false,
        attendees: [
          { name: 'Sarah Chen', email: 'sarah@acme.corp' },
          { name: 'David K.', email: 'david@finscale.ai' },
        ],
      },
    ];
    for (const ev of events) {
      this.calendarEvents.set(ev.id, ev);
    }

    // 6. Seed Templates
    for (const t of summaryTemplates) {
      this.templates.set(t.id, {
        id: t.id,
        name: t.name,
        description: t.description,
        sections: t.sections.map((s) => ({
          key: s.heading.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          title: s.heading,
          instruction: s.instruction,
        })),
      });
    }

    // 7. Seed Initial Jobs
    this.jobs.set('job-initial-1', {
      id: 'job-initial-1',
      type: 'ingest',
      meetingId: 'mtg-q3-roadmap',
      status: 'completed',
      attempts: 1,
      payload: { source: 'calendar-bot', format: 'pcm_16000' },
      createdAt: '2026-09-24T18:00:00Z',
      completedAt: '2026-09-24T18:02:15Z',
    });
  }

  // --- Meetings CRUD ---
  public listMeetings(filter?: ViewFilter): Meeting[] {
    const list = Array.from(this.meetings.values());
    if (!filter || filter === 'all') return list;
    if (filter === 'needs-actions') {
      return list.filter((m) =>
        m.actions.some(
          (a) => !a.done && (a.ownerId === 'sp-you' || a.ownerId?.includes('you') || !a.ownerId)
        )
      );
    }
    if (filter === 'shared-with-me') return list.filter((m) => Boolean(m.sharedBy));
    if (filter === 'many-speakers') return list.filter((m) => m.speakers.length >= 5);
    if (filter === 'long') return list.filter((m) => m.duration >= 2000);
    return list;
  }

  public getMeeting(id: string): Meeting | undefined {
    const m = this.meetings.get(id);
    return m ? JSON.parse(JSON.stringify(m)) : undefined;
  }

  public saveMeeting(meeting: Meeting): void {
    this.meetings.set(meeting.id, JSON.parse(JSON.stringify(meeting)));
  }

  public renameMeeting(id: string, title: string): boolean {
    const m = this.meetings.get(id);
    if (!m) return false;
    m.title = title.trim();
    return true;
  }

  public assignSpeaker(meetingId: string, speakerId: string, attendeeName: string): boolean {
    const m = this.meetings.get(meetingId);
    if (!m) return false;
    const sp = m.speakers.find((s) => s.id === speakerId);
    if (!sp) return false;
    sp.name = attendeeName.trim();
    sp.named = true;
    const parts = sp.name.split(' ').filter(Boolean);
    sp.initials = (parts[0]?.[0] || 'S') + (parts[1]?.[0] || '');
    return true;
  }

  public addHighlight(meetingId: string, at: number, note?: string): Moment | null {
    const m = this.meetings.get(meetingId);
    if (!m) return null;
    const moment: Moment = {
      id: `hl-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      at: Math.round(at),
      kind: 'highlight',
      note: note?.trim(),
      byId: 'sp-you',
    };
    m.moments.push(moment);
    m.moments.sort((a, b) => a.at - b.at);
    return moment;
  }

  public removeHighlight(meetingId: string, momentId: string): boolean {
    const m = this.meetings.get(meetingId);
    if (!m) return false;
    const idx = m.moments.findIndex((x) => x.id === momentId);
    if (idx === -1) return false;
    m.moments.splice(idx, 1);
    return true;
  }

  public editBullet(meetingId: string, bulletId: string, text: string): boolean {
    const m = this.meetings.get(meetingId);
    if (!m || !m.summary) return false;

    for (const b of m.summary.catchUp) {
      if (b.id === bulletId) {
        b.text = text;
        b.edited = true;
        return true;
      }
    }
    for (const sec of m.summary.sections) {
      for (const b of sec.bullets) {
        if (b.id === bulletId) {
          b.text = text;
          b.edited = true;
          return true;
        }
      }
    }
    return false;
  }

  public flagBullet(meetingId: string, bulletId: string, reason: string): boolean {
    const m = this.meetings.get(meetingId);
    if (!m || !m.summary) return false;
    console.log(`[Bullet Flagged] Meeting ${meetingId}, Bullet ${bulletId}, Reason: ${reason}`);
    return true;
  }

  public toggleAction(meetingId: string, actionId: string, done: boolean): boolean {
    const m = this.meetings.get(meetingId);
    if (!m) return false;
    const a = m.actions.find((x) => x.id === actionId);
    if (!a) return false;
    a.done = done;
    return true;
  }

  public switchTemplate(meetingId: string, template: string): Summary | null {
    const m = this.meetings.get(meetingId);
    if (!m) return null;
    const t = summaryTemplates.find((x) => x.id === template) || summaryTemplates[0];

    const generated: Summary = {
      template: t.id,
      catchUp: [
        {
          id: `b-cu-gen-1`,
          text: `Key alignment achieved across teams for ${m.title} following the ${t.name} framework.`,
          receipts: [{ segmentIds: [m.segments[0]?.id || 's1'], at: m.segments[0]?.start || 0 }],
        },
        {
          id: `b-cu-gen-2`,
          text: `Agreed upon immediate deliverables and follow-up milestones for the upcoming sprint.`,
          receipts: [{ segmentIds: [m.segments[1]?.id || 's2'], at: m.segments[1]?.start || 60 }],
        },
      ],
      sections: t.sections.map((sec, idx) => ({
        heading: sec.heading,
        bullets: [
          {
            id: `b-sec-${idx}-1`,
            text: `Detailed discussion covering: ${sec.instruction.slice(0, 120)}...`,
            receipts: [
              {
                segmentIds: [m.segments[Math.min(idx * 3, m.segments.length - 1)]?.id || 's1'],
                at: m.segments[Math.min(idx * 3, m.segments.length - 1)]?.start || 120,
              },
            ],
          },
        ],
      })),
    };

    m.summary = generated;
    return generated;
  }

  // --- Search Engine ---
  public search(query: string, scope: 'meeting' | 'mine' | 'team', meetingId?: string): SearchHit[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    let targets = Array.from(this.meetings.values());
    if (scope === 'meeting' && meetingId) {
      targets = targets.filter((m) => m.id === meetingId);
    }

    const hits: SearchHit[] = [];

    for (const mtg of targets) {
      for (const seg of mtg.segments) {
        if (seg.text.toLowerCase().includes(q)) {
          const sp = mtg.speakers.find((s) => s.id === seg.speakerId);
          hits.push({
            meetingId: mtg.id,
            meetingTitle: mtg.title,
            segmentId: seg.id,
            speakerName: sp?.name || 'Unknown Speaker',
            speakerInitials: sp?.initials || 'U',
            time: seg.start,
            text: seg.text,
            context: `Found in ${mtg.title}`,
          });
        }
      }
    }

    return hits.slice(0, 40);
  }

  // --- Clips & Shares ---
  public createClip(meetingId: string, start: number, end: number, title: string): Clip | null {
    const m = this.meetings.get(meetingId);
    if (!m) return null;
    const clip: Clip = {
      id: `clip-${Date.now()}`,
      meetingId,
      start: Math.round(start),
      end: Math.round(end),
      title: title.trim(),
      createdAt: new Date().toISOString(),
    };
    this.clips.set(clip.id, clip);
    return clip;
  }

  public createShare(target: { clipId?: string; meetingId?: string }, opts: ShareOptions): ShareLink {
    const token = `share-${Math.random().toString(36).substring(2, 9)}`;
    const record: ShareRecord = {
      id: `sh-${Date.now()}`,
      token,
      meetingId: target.meetingId || '',
      clipId: target.clipId,
      sharedBy: 'Alex Rivera',
      opts,
      createdAt: new Date().toISOString(),
      viewCount: 0,
    };
    this.shares.set(token, record);

    return {
      id: record.id,
      token,
      url: `/s/${token}`,
      createdAt: record.createdAt,
    };
  }

  public getShared(token: string): SharedView | null {
    const record = this.shares.get(token);
    if (!record) return null;
    record.viewCount++;

    const meeting = this.meetings.get(record.meetingId);
    if (!meeting) return null;

    let clip: Clip | undefined;
    if (record.clipId) {
      clip = this.clips.get(record.clipId);
    }

    return {
      clip,
      meeting: JSON.parse(JSON.stringify(meeting)),
      sharedBy: record.sharedBy,
      access: record.opts.access,
    };
  }

  // --- Calendar Events ---
  public listCalendarEvents(): CalendarEventRecord[] {
    return Array.from(this.calendarEvents.values());
  }

  public toggleCalendarRecord(id: string, record: boolean): boolean {
    const ev = this.calendarEvents.get(id);
    if (!ev) return false;
    ev.record = record;
    return true;
  }

  // --- Jobs ---
  public listJobs(): JobRecord[] {
    return Array.from(this.jobs.values());
  }

  public createJob(type: JobRecord['type'], meetingId: string, payload: Record<string, unknown>): JobRecord {
    const job: JobRecord = {
      id: `job-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type,
      meetingId,
      status: 'pending',
      attempts: 0,
      payload,
      createdAt: new Date().toISOString(),
    };
    this.jobs.set(job.id, job);
    return job;
  }
}

export const db = new Database();
