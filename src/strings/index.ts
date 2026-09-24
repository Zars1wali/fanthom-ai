/**
 * All user-facing strings in one module.
 * Copy is reviewable in one place; no string literals scattered in components.
 */
import { APP_NAME } from '../config';

export const strings = {
  // Navigation
  nav: {
    meetings: 'Meetings',
    ask: 'Ask',
    highlights: 'Highlights',
    settings: 'Settings',
    searchPlaceholder: 'Search or ask…',
  },

  // Meeting page
  meeting: {
    share: 'Share',
    clip: 'Clip',
    summary: 'Summary',
    transcript: 'Transcript',
    actions: 'Actions',
    ask: 'Ask',
    highlightsTab: 'Highlights',
    catchUp: '60-second catch-up',
    fullSummary: 'Full',
    templateLabel: 'Template',
    playTenSeconds: 'Play 10 seconds',
    followAlong: 'Follow along',
    jumpToNow: 'Jump to now',
    searchTranscript: 'Search transcript…',
    copyMomentLink: 'Copy link to this moment',
    startClipHere: 'Start clip here',
    makeActionItem: 'Make action item',
    highlight: 'Highlight',
    comment: 'Comment',
    editBullet: 'Edit',
    flagBullet: 'This line is wrong',
    inlineRename: 'Click to rename',
  },

  // Score
  score: {
    viewAsTable: 'View as table',
    topics: 'Topics',
    moments: 'Moments',
    speakers: 'Speakers',
    talkTime: 'talk time',
  },

  // Meetings home
  home: {
    nextUp: 'Next up',
    views: {
      all: 'All',
      needsActions: 'Needs my actions',
      sharedWithMe: 'Shared with me',
      manyPeople: '8+ people',
      long: 'Long',
    },
    today: 'Today',
    yesterday: 'Yesterday',
    ready: 'Ready',
    transcribing: 'Transcribing…',
    summarizing: 'Summarizing…',
    upcoming: 'Upcoming',
    joinAndRecord: 'Join and record',
    noMeetings: 'No meetings yet. Connect a calendar or open the sample meeting.',
  },

  // Speaker
  speaker: {
    unnamedBanner: (count: number) =>
      `${count} speaker${count !== 1 ? 's' : ''} need${count === 1 ? 's' : ''} names. Assign them so summaries say who decided what.`,
    assign: 'Assign',
    assignAll: 'Assign to all segments',
  },

  // Highlights
  highlightToast: (time: string) => `Highlighted at ${time}`,
  undo: 'Undo',
  addNote: 'Add note',

  // Search and Ask
  search: {
    scopeThisMeeting: 'This meeting',
    scopeMyMeetings: 'My meetings',
    scopeTeam: 'Team',
    basedOn: (count: number, range: string) =>
      `Based on ${count} meeting${count !== 1 ? 's' : ''} · ${range}`,
    followUp: 'Follow up',
    savePrompt: 'Save prompt',
    noResults: 'No matches found. Try different words or a broader scope.',
  },

  // Clips and sharing
  share: {
    linkAccess: 'Link access',
    anyone: 'Anyone with link',
    workspace: 'People in workspace',
    specific: 'Specific people',
    includeTranscript: 'Include transcript',
    includeSummary: 'Include summary',
    expiry: 'Link expires',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    recipientSharedBy: (name: string) => `${name} shared`,
    requestAccess: 'Request access',
    openFullMeeting: 'Open full meeting',
  },

  // Live mode
  live: {
    recording: 'REC',
    scratchpad: 'Scratchpad',
    liveSummary: 'Live summary',
    catchMeUp: 'Catch me up',
  },

  // First run
  firstRun: {
    step1Title: 'Connect your calendar',
    step1Desc: `${APP_NAME} joins the meetings you choose.`,
    connectGoogle: 'Connect Google Calendar',
    connectOutlook: 'Connect Outlook',
    noCalendar: 'No calendar handy? Open the sample meeting',
    step2Title: 'How should meetings be captured?',
    botVideo: 'Bot with video',
    audioOnly: 'Audio and transcript',
    transcriptOnly: 'Transcript only',
    step3Title: 'Your next meeting',
    recordThis: 'Record this one',
    openSample: 'Open the sample meeting',
  },

  // Processing stages
  processing: {
    transcribing: 'Transcribing…',
    summarizing: 'Summarizing…',
    ready: 'Ready',
  },

  // Errors
  errors: {
    recordingStopped: (time: string) =>
      `Recording stopped at ${time} because the meeting ended early. The transcript up to that point is saved.`,
    loadFailed: 'Could not load this meeting. Refresh the page or try again in a moment.',
    shareFailed: 'Could not create share link. Check your connection and try again.',
    generic: 'Something went wrong. Refresh the page to continue.',
    notFound: 'This page does not exist. It may have been moved or deleted.',
    expired: 'This link has expired or the content is private.',
  },

  // System
  sampleBadge: 'Sample',
  loading: 'Loading…',
} as const;
