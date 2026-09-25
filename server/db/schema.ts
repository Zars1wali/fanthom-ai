/**
 * Database schema and types matching Section 4.4 of IMPLEMENTATION_PLAN.md
 */

import type {
  Meeting,
  Speaker,
  Segment,
  Topic,
  Moment,
  Bullet,
  Summary,
  ActionItem,
  Clip,
  ShareOptions,
  ShareLink,
  SharedView,
  SearchHit,
  AskChunk,
} from '../../src/data/types';

export interface WorkspaceRecord {
  id: string;
  name: string;
  createdAt: string;
}

export interface UserRecord {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  avatarColor: string;
}

export interface CalendarEventRecord {
  id: string;
  workspaceId: string;
  title: string;
  startsAt: string;
  endsAt: string;
  link: string;
  platform: 'zoom' | 'meet' | 'teams';
  record: boolean;
  attendees: Array<{ name: string; email: string }>;
}

export interface JobRecord {
  id: string;
  type: 'ingest' | 'normalise' | 'chapter' | 'summarise' | 'action_items' | 'index';
  meetingId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  attempts: number;
  payload: Record<string, unknown>;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

export interface TemplateRecord {
  id: string;
  name: string;
  description: string;
  sections: Array<{
    key: string;
    title: string;
    instruction: string;
  }>;
}

export interface ShareRecord {
  id: string;
  token: string;
  meetingId: string;
  clipId?: string;
  sharedBy: string;
  opts: ShareOptions;
  createdAt: string;
  viewCount: number;
}
