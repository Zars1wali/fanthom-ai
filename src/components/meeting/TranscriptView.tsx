import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { Meeting, Segment } from '../../data/types';
import { formatTimecode } from '../ui';
import { useToast } from '../ui/Toast';
import './meeting.css';

export interface TranscriptViewProps {
  meeting: Meeting;
  currentTime: number;
  onSeek: (seconds: number) => void;
  onAddHighlight: (at: number) => void;
  onCreateClip: (start: number, end: number) => void;
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({
  meeting,
  currentTime,
  onSeek,
  onAddHighlight,
  onCreateClip,
}) => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoFollow, setAutoFollow] = useState(true);
  const [showJumpPill, setShowJumpPill] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(null);
  const activeSegmentRef = useRef<HTMLDivElement | null>(null);

  // Fast binary search to find active segment
  const activeSegmentId = useMemo(() => {
    const segs = meeting.segments;
    if (segs.length === 0) return null;

    let low = 0;
    let high = segs.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const seg = segs[mid];
      if (currentTime >= seg.start && currentTime <= seg.end) {
        return seg.id;
      }
      if (currentTime < seg.start) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    // If between segments or after, pick the closest previous
    if (high >= 0 && high < segs.length) {
      return segs[high].id;
    }
    return segs[0]?.id || null;
  }, [meeting.segments, currentTime]);

  // Auto-scroll to active segment
  useEffect(() => {
    if (!autoFollow || !activeSegmentRef.current || !containerRef.current) return;
    activeSegmentRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [activeSegmentId, autoFollow]);

  // Detect manual scroll away from active segment
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !activeSegmentRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const aRect = activeSegmentRef.current.getBoundingClientRect();

    const isVisible =
      aRect.top >= cRect.top - 20 &&
      aRect.bottom <= cRect.bottom + 20;

    if (!isVisible) {
      setAutoFollow(false);
      setShowJumpPill(true);
    } else {
      setShowJumpPill(false);
    }
  }, []);

  const handleJumpToNow = () => {
    setAutoFollow(true);
    setShowJumpPill(false);
    activeSegmentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleCopyLink = (seg: Segment) => {
    const url = `${window.location.origin}${window.location.pathname}?t=${seg.start}`;
    navigator.clipboard?.writeText(url);
    toast({
      message: `Link copied to moment (${formatTimecode(seg.start)})`,
      duration: 3000,
    });
  };

  // Speaker map
  const speakerMap = useMemo(() => {
    return new Map(meeting.speakers.map((s) => [s.id, s]));
  }, [meeting.speakers]);

  // Topic map keyed by start time
  const topicMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const t of meeting.topics) {
      map.set(t.start, t.title);
    }
    return map;
  }, [meeting.topics]);

  // Filter segments
  const filteredSegments = useMemo(() => {
    return meeting.segments.filter((seg) => {
      if (selectedSpeakerId && seg.speakerId !== selectedSpeakerId) {
        return false;
      }
      if (searchQuery.trim() && !seg.text.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [meeting.segments, selectedSpeakerId, searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, position: 'relative' }}>
      {/* Transcript Toolbar */}
      <div className="transcript-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', flex: 1 }}>
          <input
            type="text"
            placeholder="Search transcript…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              borderRadius: '4px',
              border: '1px solid var(--line)',
              width: '180px',
              background: '#ffffff',
            }}
          />
          {searchQuery && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>Filter:</span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setSelectedSpeakerId(null)}
            style={{ fontWeight: selectedSpeakerId === null ? 700 : 400 }}
          >
            All
          </button>
          {meeting.speakers.slice(0, 4).map((spk) => (
            <button
              key={spk.id}
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() =>
                setSelectedSpeakerId(selectedSpeakerId === spk.id ? null : spk.id)
              }
              style={{
                fontWeight: selectedSpeakerId === spk.id ? 700 : 400,
                color: selectedSpeakerId === spk.id ? `var(--speaker-${spk.colorIndex})` : undefined,
              }}
            >
              {spk.initials}
            </button>
          ))}
        </div>
      </div>

      {/* Transcript Scroll Area */}
      <div
        ref={containerRef}
        className="transcript-container"
        onScroll={handleScroll}
        aria-label="Meeting transcript"
        role="region"
      >
        {filteredSegments.map((seg) => {
          const spk = speakerMap.get(seg.speakerId);
          const isActive = seg.id === activeSegmentId;
          const topicTitle = topicMap.get(seg.start);
          const colorVar = spk ? `var(--speaker-${spk.colorIndex})` : 'var(--ink-2)';

          return (
            <React.Fragment key={seg.id}>
              {topicTitle && (
                <div className="transcript-topic-divider">
                  <span>{topicTitle}</span>
                </div>
              )}

              <div
                ref={isActive ? activeSegmentRef : null}
                className={`transcript-turn ${isActive ? 'active' : ''}`}
                onClick={() => onSeek(seg.start)}
                role="article"
                aria-label={`Speech by ${spk?.name || 'Speaker'} at ${formatTimecode(seg.start)}`}
              >
                {/* Speaker Avatar Gutter */}
                <div className="turn-gutter">
                  <span
                    className="speaker-avatar"
                    style={{ backgroundColor: colorVar }}
                    aria-hidden="true"
                  >
                    {spk?.initials || '?'}
                  </span>
                </div>

                {/* Turn Text & Header */}
                <div className="turn-body">
                  <div className="turn-speaker-line">
                    <span className="turn-speaker-name" style={{ color: colorVar }}>
                      {spk?.name || 'Unknown Speaker'}
                    </span>
                    <span className="turn-timecode tabular">
                      {formatTimecode(seg.start)}
                    </span>
                  </div>

                  <p className="turn-text">{seg.text}</p>
                </div>

                {/* Hover Action Menu */}
                <div className="turn-hover-menu" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => onAddHighlight(seg.start)}
                    title="Highlight this moment"
                  >
                    Highlight
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleCopyLink(seg)}
                    title="Copy link to moment"
                  >
                    Copy Link
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => onCreateClip(seg.start, seg.end + 20)}
                    title="Create clip from here"
                  >
                    Clip
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        {filteredSegments.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--sp-6)', color: 'var(--ink-3)' }}>
            No transcript turns match the current filter.
          </div>
        )}
      </div>

      {/* Floating "Jump to now" pill */}
      {showJumpPill && (
        <button
          type="button"
          className="jump-to-now-pill"
          onClick={handleJumpToNow}
          aria-label="Resume auto-following live playhead"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span>Jump to live position</span>
        </button>
      )}
    </div>
  );
};
