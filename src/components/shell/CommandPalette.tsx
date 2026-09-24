import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRepo } from '../../data/mockRepo';
import type { Meeting, SearchHit } from '../../data/types';
import { Kbd } from '../ui';
import './shell.css';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  currentMeetingId?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  currentMeetingId: _currentMeetingId,
}) => {
  const [query, setQuery] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      mockRepo.listMeetings().then(setMeetings);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setHits([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setHits([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results = await mockRepo.search(query, 'team');
        setHits(results);
      } finally {
        setLoading(false);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredMeetings = query.trim()
    ? meetings.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
    : meetings.slice(0, 4);

  const handleSelectMeeting = (id: string, time?: number) => {
    onClose();
    if (time !== undefined) {
      navigate(`/meetings/${id}?t=${time}`);
    } else {
      navigate(`/meetings/${id}`);
    }
  };

  return (
    <div
      className="cmd-palette-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div className="cmd-palette-box">
        <div className="cmd-palette-input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmd-palette-input"
            placeholder="Search meetings, transcript moments, or actions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Kbd>ESC</Kbd>
        </div>

        <div className="cmd-palette-results">
          {loading && (
            <div style={{ padding: 'var(--sp-4)', textAlign: 'center', color: 'var(--ink-3)', fontSize: '13px' }}>
              Searching transcripts…
            </div>
          )}

          {/* Quick Actions */}
          {!query && (
            <>
              <div className="cmd-group-label">Quick Navigation</div>
              <button
                type="button"
                className="cmd-item"
                onClick={() => {
                  onClose();
                  navigate('/meetings');
                }}
              >
                <span>Go to Meetings Library</span>
                <span className="cmd-item-desc">All calls</span>
              </button>
              <button
                type="button"
                className="cmd-item"
                onClick={() => {
                  onClose();
                  navigate('/live');
                }}
              >
                <span>Simulate Live Meeting</span>
                <span className="cmd-item-desc">Join & record</span>
              </button>
              <button
                type="button"
                className="cmd-item"
                onClick={() => {
                  onClose();
                  navigate('/dev/design');
                }}
              >
                <span>Component Gallery (/dev/design)</span>
                <span className="cmd-item-desc">Design System QA</span>
              </button>
            </>
          )}

          {/* Meetings Matches */}
          {filteredMeetings.length > 0 && (
            <>
              <div className="cmd-group-label">Meetings</div>
              {filteredMeetings.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className="cmd-item"
                  onClick={() => handleSelectMeeting(m.id)}
                >
                  <span style={{ fontWeight: 600 }}>{m.title}</span>
                  <span className="cmd-item-desc">
                    {Math.round(m.duration / 60)}m · {m.speakers.length} speakers
                  </span>
                </button>
              ))}
            </>
          )}

          {/* Transcript / Moments Matches */}
          {hits.length > 0 && (
            <>
              <div className="cmd-group-label">Transcript Moments</div>
              {hits.slice(0, 6).map((hit, idx) => (
                <button
                  key={`${hit.meetingId}-${hit.segmentId}-${idx}`}
                  type="button"
                  className="cmd-item"
                  onClick={() => handleSelectMeeting(hit.meetingId, hit.time)}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '11px', color: 'var(--cue)' }}>
                        {hit.speakerName}
                      </span>
                      <span className="tabular" style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
                        at {Math.floor(hit.time / 60)}:{hit.time % 60 < 10 ? `0${hit.time % 60}` : hit.time % 60}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--ink-2)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      "{hit.text}"
                    </span>
                  </div>
                  <span className="cmd-item-desc" style={{ flexShrink: 0 }}>
                    {hit.meetingTitle}
                  </span>
                </button>
              ))}
            </>
          )}

          {query && !loading && filteredMeetings.length === 0 && hits.length === 0 && (
            <div style={{ padding: 'var(--sp-5)', textAlign: 'center', color: 'var(--ink-3)' }}>
              No matches found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
