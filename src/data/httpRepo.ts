/**
 * HttpMeetingRepo — Production HTTP Client implementing MeetingRepo
 * Talks to the backend server at /api/*
 * Falls back to localMockRepo if the backend server is offline
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
  AskChunk,
  ViewFilter,
} from './types';
import type { MeetingRepo } from './repo';
import { localMockRepo } from './localMockRepo';

export class HttpMeetingRepo implements MeetingRepo {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private async fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      ...init,
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`API error ${res.status}: ${errBody}`);
    }

    return res.json();
  }

  async listMeetings(filter?: ViewFilter): Promise<Meeting[]> {
    try {
      const query = filter && filter !== 'all' ? `?filter=${encodeURIComponent(filter)}` : '';
      return await this.fetchJson<Meeting[]>(`/meetings${query}`);
    } catch (e) {
      console.warn('[HttpMeetingRepo] Falling back to local mockRepo:', e);
      return localMockRepo.listMeetings(filter);
    }
  }

  async getMeeting(id: string): Promise<Meeting> {
    try {
      return await this.fetchJson<Meeting>(`/meetings/${encodeURIComponent(id)}`);
    } catch (e) {
      console.warn(`[HttpMeetingRepo] Meeting ${id} fallback to local mockRepo:`, e);
      return localMockRepo.getMeeting(id);
    }
  }

  async renameMeeting(id: string, title: string): Promise<void> {
    try {
      await this.fetchJson(`/meetings/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: JSON.stringify({ title }),
      });
    } catch {
      await localMockRepo.renameMeeting(id, title);
    }
  }

  async assignSpeaker(meetingId: string, speakerId: string, attendeeName: string): Promise<void> {
    try {
      await this.fetchJson(`/meetings/${encodeURIComponent(meetingId)}/speakers/${encodeURIComponent(speakerId)}`, {
        method: 'PATCH',
        body: JSON.stringify({ name: attendeeName }),
      });
    } catch {
      await localMockRepo.assignSpeaker(meetingId, speakerId, attendeeName);
    }
  }

  async addHighlight(meetingId: string, at: number, note?: string): Promise<Moment> {
    try {
      return await this.fetchJson<Moment>(`/meetings/${encodeURIComponent(meetingId)}/highlights`, {
        method: 'POST',
        body: JSON.stringify({ at, note }),
      });
    } catch {
      return localMockRepo.addHighlight(meetingId, at, note);
    }
  }

  async removeHighlight(meetingId: string, momentId: string): Promise<void> {
    try {
      await this.fetchJson(`/meetings/${encodeURIComponent(meetingId)}/highlights/${encodeURIComponent(momentId)}`, {
        method: 'DELETE',
      });
    } catch {
      await localMockRepo.removeHighlight(meetingId, momentId);
    }
  }

  async editBullet(meetingId: string, bulletId: string, text: string): Promise<void> {
    try {
      await this.fetchJson(`/meetings/${encodeURIComponent(meetingId)}/bullets/${encodeURIComponent(bulletId)}`, {
        method: 'PATCH',
        body: JSON.stringify({ text }),
      });
    } catch {
      await localMockRepo.editBullet(meetingId, bulletId, text);
    }
  }

  async flagBullet(meetingId: string, bulletId: string, reason: string): Promise<void> {
    try {
      await this.fetchJson(`/meetings/${encodeURIComponent(meetingId)}/bullets/${encodeURIComponent(bulletId)}/flag`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      });
    } catch {
      await localMockRepo.flagBullet(meetingId, bulletId, reason);
    }
  }

  async toggleAction(meetingId: string, actionId: string, done: boolean): Promise<void> {
    try {
      await this.fetchJson(`/meetings/${encodeURIComponent(meetingId)}/actions/${encodeURIComponent(actionId)}`, {
        method: 'PATCH',
        body: JSON.stringify({ done }),
      });
    } catch {
      await localMockRepo.toggleAction(meetingId, actionId, done);
    }
  }

  async switchTemplate(meetingId: string, template: string): Promise<Summary> {
    try {
      return await this.fetchJson<Summary>(`/meetings/${encodeURIComponent(meetingId)}/summary/template`, {
        method: 'POST',
        body: JSON.stringify({ template }),
      });
    } catch {
      return localMockRepo.switchTemplate(meetingId, template);
    }
  }

  async search(query: string, scope: 'meeting' | 'mine' | 'team', meetingId?: string): Promise<SearchHit[]> {
    try {
      const params = new URLSearchParams({ q: query, scope });
      if (meetingId) params.set('meetingId', meetingId);
      return await this.fetchJson<SearchHit[]>(`/search?${params.toString()}`);
    } catch {
      return localMockRepo.search(query, scope, meetingId);
    }
  }

  async *ask(query: string, scope: 'meeting' | 'mine' | 'team', meetingId?: string): AsyncIterable<AskChunk> {
    try {
      const params = new URLSearchParams({ q: query, scope });
      if (meetingId) params.set('meetingId', meetingId);

      const response = await fetch(`${this.baseUrl}/ask?${params.toString()}`);
      if (!response.ok || !response.body) {
        throw new Error('Failed to stream from backend');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6).trim();
            if (jsonStr) {
              try {
                const chunk: AskChunk = JSON.parse(jsonStr);
                yield chunk;
              } catch {
                // ignore parse error
              }
            }
          }
        }
      }
    } catch {
      // Fallback to local streaming generator
      for await (const chunk of localMockRepo.ask(query, scope, meetingId)) {
        yield chunk;
      }
    }
  }

  async createClip(meetingId: string, start: number, end: number, title: string): Promise<Clip> {
    try {
      return await this.fetchJson<Clip>('/clips', {
        method: 'POST',
        body: JSON.stringify({ meetingId, start, end, title }),
      });
    } catch {
      return localMockRepo.createClip(meetingId, start, end, title);
    }
  }

  async createShare(target: { clipId?: string; meetingId?: string }, opts: ShareOptions): Promise<ShareLink> {
    try {
      return await this.fetchJson<ShareLink>('/shares', {
        method: 'POST',
        body: JSON.stringify({ target, opts }),
      });
    } catch {
      return localMockRepo.createShare(target, opts);
    }
  }

  async getShared(token: string): Promise<SharedView> {
    try {
      return await this.fetchJson<SharedView>(`/shares/${encodeURIComponent(token)}`);
    } catch {
      return localMockRepo.getShared(token);
    }
  }
}

export const httpRepo = new HttpMeetingRepo();
