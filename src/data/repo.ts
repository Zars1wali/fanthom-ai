/**
 * MeetingRepo — the one typed interface between UI and data.
 * Implement as mockRepo (in-memory + seed data) now.
 * Backend agent can later add httpRepo without changing any UI.
 */
import type {
  Meeting, Moment, Summary, Clip, ShareLink, ShareOptions,
  SharedView, SearchHit, AskChunk, ViewFilter,
} from './types';

export interface MeetingRepo {
  listMeetings(filter?: ViewFilter): Promise<Meeting[]>;
  getMeeting(id: string): Promise<Meeting>;
  renameMeeting(id: string, title: string): Promise<void>;
  assignSpeaker(meetingId: string, speakerId: string, attendeeName: string): Promise<void>;
  addHighlight(meetingId: string, at: number, note?: string): Promise<Moment>;
  removeHighlight(meetingId: string, momentId: string): Promise<void>;
  editBullet(meetingId: string, bulletId: string, text: string): Promise<void>;
  flagBullet(meetingId: string, bulletId: string, reason: string): Promise<void>;
  toggleAction(meetingId: string, actionId: string, done: boolean): Promise<void>;
  switchTemplate(meetingId: string, template: string): Promise<Summary>;
  search(query: string, scope: 'meeting' | 'mine' | 'team', meetingId?: string): Promise<SearchHit[]>;
  ask(query: string, scope: 'meeting' | 'mine' | 'team', meetingId?: string): AsyncIterable<AskChunk>;
  createClip(meetingId: string, start: number, end: number, title: string): Promise<Clip>;
  createShare(target: { clipId?: string; meetingId?: string }, opts: ShareOptions): Promise<ShareLink>;
  getShared(token: string): Promise<SharedView>;
}
