/* ===================================================================
   Types — verbatim from plan section 9
   =================================================================== */

export type Speaker = {
  id: string;
  name: string;
  initials: string;
  colorIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  talkPct: number;
  named: boolean;
  isYou?: boolean;
};

export type Segment = {
  id: string;
  speakerId: string;
  start: number;
  end: number;
  text: string;
  overlapsWith?: string[];
};

export type Topic = {
  id: string;
  title: string;
  start: number;
  end: number;
  gist: string;
};

export type Moment = {
  id: string;
  at: number;
  kind: 'highlight' | 'action' | 'decision' | 'question' | 'objection';
  note?: string;
  byId?: string;
};

export type Receipt = {
  segmentIds: string[];
  at: number;
};

export type Bullet = {
  id: string;
  text: string;
  receipts: Receipt[];
  edited?: boolean;
};

export type Summary = {
  template: string;
  catchUp: Bullet[];
  sections: { heading: string; bullets: Bullet[] }[];
};

export type ActionItem = {
  id: string;
  text: string;
  ownerId?: string;
  done: boolean;
  receipts: Receipt[];
};

export type Meeting = {
  id: string;
  title: string;
  startedAt: string;
  duration: number;
  capture: 'bot-video' | 'audio' | 'transcript';
  status: 'upcoming' | 'processing' | 'ready';
  stage?: 'transcribing' | 'summarizing';
  speakers: Speaker[];
  segments: Segment[];
  topics: Topic[];
  moments: Moment[];
  summary?: Summary;
  actions: ActionItem[];
  sharedBy?: string;
  isSample?: boolean;
};

/* ===================================================================
   Extended types for the UI layer
   =================================================================== */

export type Clip = {
  id: string;
  meetingId: string;
  start: number;
  end: number;
  title: string;
  createdAt: string;
};

export type ShareOptions = {
  access: 'anyone' | 'workspace' | 'specific';
  includeTranscript: boolean;
  includeSummary: boolean;
  expiresAt?: string;
  emails?: string[];
};

export type ShareLink = {
  id: string;
  token: string;
  url: string;
  createdAt: string;
};

export type SharedView = {
  clip?: Clip;
  meeting: Meeting;
  sharedBy: string;
  access: ShareOptions['access'];
};

export type SearchHit = {
  meetingId: string;
  meetingTitle: string;
  segmentId: string;
  speakerName: string;
  speakerInitials: string;
  time: number;
  text: string;
  context?: string;
};

export type AskChunk = {
  type: 'text' | 'citation' | 'done';
  content: string;
  citationIndex?: number;
  meetingId?: string;
  segmentId?: string;
  time?: number;
};

export type ViewFilter =
  | 'all'
  | 'needs-actions'
  | 'shared-with-me'
  | 'many-speakers'
  | 'long';
