/**
 * Main repository export
 * Exports HttpMeetingRepo instance as `mockRepo` for backward-compatible drop-in usage,
 * ensuring all UI components interact directly with the backend API while retaining
 * localMockRepo for offline testing or fallback.
 */

export { MockMeetingRepo, mockRepo as localMockRepo } from './localMockRepo';
export { HttpMeetingRepo, httpRepo, httpRepo as mockRepo } from './httpRepo';
