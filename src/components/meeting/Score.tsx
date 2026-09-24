import React, { useState, useRef, useCallback, useMemo } from 'react';
import type { Meeting, Topic, Moment, Segment } from '../../data/types';
import { Dialog, formatTimecode } from '../ui';
import './meeting.css';

export interface ScoreProps {
  meeting: Meeting;
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  onCreateClip?: (start: number, end: number) => void;
  onAddHighlight?: (at: number) => void;
}

export const Score: React.FC<ScoreProps> = ({
  meeting,
  currentTime,
  duration,
  onSeek,
  onCreateClip,
  onAddHighlight,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverInfo, setHoverInfo] = useState<{
    time: number;
    speakerName?: string;
    text?: string;
    x: number;
  } | null>(null);

  const [dragRange, setDragRange] = useState<{ start: number; end: number } | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const [showTableModal, setShowTableModal] = useState(false);

  const totalDuration = Math.max(1, duration || meeting.duration);

  // Group segments by speaker
  const speakerSegments = useMemo(() => {
    const map = new Map<string, Segment[]>();
    for (const spk of meeting.speakers) {
      map.set(spk.id, []);
    }
    for (const seg of meeting.segments) {
      const list = map.get(seg.speakerId);
      if (list) list.push(seg);
    }
    return map;
  }, [meeting]);

  // Turn boundaries for snapping
  const turnBoundaries = useMemo(() => {
    return meeting.segments.map((s) => s.start);
  }, [meeting]);

  const getTimeFromPointerX = useCallback((clientX: number): number => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const rawTime = (x / rect.width) * totalDuration;

    // Snapping: if within 6px of turn boundary
    const pxPerSec = rect.width / totalDuration;
    for (const boundary of turnBoundaries) {
      const distPx = Math.abs(boundary - rawTime) * pxPerSec;
      if (distPx <= 6) {
        return boundary;
      }
    }
    return rawTime;
  }, [totalDuration, turnBoundaries]);

  // Pointer down: handle click or drag range
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const time = getTimeFromPointerX(e.clientX);
    dragStartXRef.current = e.clientX;
    isDraggingRef.current = true;
    setDragRange(null);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dist = Math.abs(moveEvent.clientX - dragStartXRef.current);
      if (dist > 8) {
        const time1 = getTimeFromPointerX(dragStartXRef.current);
        const time2 = getTimeFromPointerX(moveEvent.clientX);
        setDragRange({
          start: Math.min(time1, time2),
          end: Math.max(time1, time2),
        });
      }
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      isDraggingRef.current = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      const dist = Math.abs(upEvent.clientX - dragStartXRef.current);
      if (dist <= 8) {
        // Simple click / seek
        onSeek(time);
        setDragRange(null);
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Hover detection
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current || isDraggingRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = (x / rect.width) * totalDuration;

    // Find segment at time
    const activeSeg = meeting.segments.find((s) => time >= s.start && time <= s.end);
    const spk = activeSeg ? meeting.speakers.find((s) => s.id === activeSeg.speakerId) : undefined;

    setHoverInfo({
      time,
      speakerName: spk?.name,
      text: activeSeg?.text.slice(0, 70),
      x,
    });
  };

  const handlePointerLeave = () => {
    if (!isDraggingRef.current) {
      setHoverInfo(null);
    }
  };

  // Keyboard navigation on Score
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onSeek(Math.min(totalDuration, currentTime + 5));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onSeek(Math.max(0, currentTime - 5));
    }
  };

  const playheadPercent = (currentTime / totalDuration) * 100;

  return (
    <section
      className="score-wrapper"
      aria-label="The Score: Speaker timeline and meeting chapters"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="score-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--ink)' }}>
            The Score
          </span>
          <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
            {meeting.speakers.length} speakers · {Math.round(totalDuration / 60)} min
          </span>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setShowTableModal(true)}
          style={{ fontSize: '11px', color: 'var(--ink-2)' }}
        >
          View as table
        </button>
      </div>

      {/* Chapter / Topic Strip */}
      {meeting.topics.length > 0 && (
        <div className="score-topic-strip" role="list" aria-label="Meeting chapters">
          {meeting.topics.map((t: Topic) => {
            const widthPct = ((t.end - t.start) / totalDuration) * 100;
            return (
              <button
                key={t.id}
                type="button"
                className="score-topic-block"
                style={{ width: `${widthPct}%` }}
                onClick={() => onSeek(t.start)}
                title={`${t.title} (${formatTimecode(t.start)} - ${formatTimecode(t.end)}): ${t.gist}`}
                aria-label={`Jump to chapter: ${t.title}`}
              >
                <span>{t.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Speaker Lanes & Canvas */}
      <div
        ref={containerRef}
        className="score-canvas-container score-draw-in"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        role="slider"
        aria-label="Meeting playhead seek"
        aria-valuemin={0}
        aria-valuemax={totalDuration}
        aria-valuenow={Math.round(currentTime)}
        aria-valuetext={`${formatTimecode(currentTime)} of ${formatTimecode(totalDuration)}`}
      >
        <div className="score-lanes">
          {meeting.speakers.map((spk) => {
            const segments = speakerSegments.get(spk.id) || [];
            const colorVar = `var(--speaker-${spk.colorIndex})`;

            return (
              <div key={spk.id} className="score-lane">
                <div className="score-lane-header">
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 1,
                      backgroundColor: colorVar,
                    }}
                  />
                  <span>{spk.initials}</span>
                </div>

                {segments.map((seg) => {
                  const leftPct = (seg.start / totalDuration) * 100;
                  const widthPct = Math.max(0.2, ((seg.end - seg.start) / totalDuration) * 100);

                  return (
                    <div
                      key={seg.id}
                      className="score-speech-block"
                      style={{
                        left: `${leftPct}%`,
                        width: `${widthPct}%`,
                        backgroundColor: colorVar,
                      }}
                      title={`${spk.name} at ${formatTimecode(seg.start)}`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Moments Lane */}
        <div className="score-moments-lane" title="Highlights, decisions, and action items">
          {meeting.moments.map((m: Moment) => {
            const leftPct = (m.at / totalDuration) * 100;
            const glyphClass =
              m.kind === 'highlight'
                ? 'glyph-highlight'
                : m.kind === 'decision'
                ? 'glyph-decision'
                : 'glyph-action';

            return (
              <button
                key={m.id}
                type="button"
                className={`score-moment-glyph ${glyphClass}`}
                style={{ left: `${leftPct}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSeek(m.at);
                }}
                title={`${m.kind.toUpperCase()} at ${formatTimecode(m.at)}: ${m.note || ''}`}
                aria-label={`${m.kind} at ${formatTimecode(m.at)}`}
              />
            );
          })}
        </div>

        {/* Playhead */}
        <div
          className="score-playhead"
          style={{ left: `${playheadPercent}%` }}
          aria-hidden="true"
        />

        {/* Range Selection */}
        {dragRange && (
          <div
            className="score-range-selection"
            style={{
              left: `${(dragRange.start / totalDuration) * 100}%`,
              width: `${((dragRange.end - dragRange.start) / totalDuration) * 100}%`,
            }}
          >
            <div className="score-floating-bar" onClick={(e) => e.stopPropagation()}>
              <span className="tabular" style={{ fontSize: '11px', color: '#ffffff', fontWeight: 600 }}>
                {formatTimecode(dragRange.start)} – {formatTimecode(dragRange.end)}
              </span>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  onCreateClip?.(dragRange.start, dragRange.end);
                  setDragRange(null);
                }}
              >
                Create Clip
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  onAddHighlight?.(dragRange.start);
                  setDragRange(null);
                }}
              >
                Highlight
              </button>
              <button
                type="button"
                onClick={() => setDragRange(null)}
                style={{ color: '#ffffff', opacity: 0.6, fontSize: '14px', marginLeft: 4 }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Hover Tooltip */}
        {hoverInfo && !dragRange && (
          <div
            className="tooltip-box"
            style={{
              left: hoverInfo.x,
              bottom: '100%',
              marginBottom: 4,
              pointerEvents: 'none',
              transform: 'translateX(-50%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="tabular" style={{ fontWeight: 700, color: 'var(--hl)' }}>
                {formatTimecode(hoverInfo.time)}
              </span>
              {hoverInfo.speakerName && (
                <span style={{ fontWeight: 600, color: '#ffffff' }}>
                  {hoverInfo.speakerName}
                </span>
              )}
            </div>
            {hoverInfo.text && (
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                "{hoverInfo.text}…"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Accessible Table Modal */}
      <Dialog
        isOpen={showTableModal}
        onClose={() => setShowTableModal(false)}
        title="Speaker Talk Time Table"
        maxWidth="500px"
      >
        <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-4)' }}>
          Accessible breakdown of speaker talk times and contributions for this meeting.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
              <th style={{ padding: '8px 4px' }}>Speaker</th>
              <th style={{ padding: '8px 4px' }}>Initials</th>
              <th style={{ padding: '8px 4px' }}>Talk %</th>
              <th style={{ padding: '8px 4px' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {meeting.speakers.map((spk) => {
              const timeSec = Math.round((spk.talkPct / 100) * totalDuration);
              return (
                <tr key={spk.id} style={{ borderBottom: '1px solid rgba(15,42,51,0.06)' }}>
                  <td style={{ padding: '8px 4px', fontWeight: 600 }}>{spk.name}</td>
                  <td style={{ padding: '8px 4px' }}>{spk.initials}</td>
                  <td style={{ padding: '8px 4px' }} className="tabular">{spk.talkPct}%</td>
                  <td style={{ padding: '8px 4px' }} className="tabular">{formatTimecode(timeSec)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Dialog>
    </section>
  );
};
