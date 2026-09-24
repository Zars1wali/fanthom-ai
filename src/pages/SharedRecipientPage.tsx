import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockRepo } from '../data/mockRepo';
import type { SharedView } from '../data/types';
import { ClockPlayer, type PlayerAdapter } from '../player/PlayerAdapter';
import { ReceiptChip, Skeleton, formatTimecode } from '../components/ui';

export const SharedRecipientPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<SharedView | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<PlayerAdapter | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    mockRepo
      .getShared(token)
      .then((res) => {
        setData(res);
        const startTime = res.clip ? res.clip.start : 0;
        const duration = res.clip ? res.clip.end - res.clip.start : res.meeting.duration;

        const clock = new ClockPlayer(duration, 0);
        playerRef.current = clock;

        clock.onTimeUpdate((t) => {
          setCurrentTime(startTime + t);
        });

        clock.onStateChange((playing) => {
          setIsPlaying(playing);
        });

        // Set document title for SEO & unfurl
        document.title = `${res.clip ? res.clip.title : res.meeting.title} — Shared via Fathom`;
      })
      .finally(() => setLoading(false));

    return () => {
      playerRef.current?.destroy();
    };
  }, [token]);

  if (loading) {
    return (
      <div style={{ maxWidth: '720px', margin: '40px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Skeleton width="60%" height={32} />
        <Skeleton width="100%" height={240} />
        <Skeleton width="100%" height={120} />
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Link expired or private</h2>
        <p style={{ color: 'var(--ink-2)', marginTop: '8px', marginBottom: '16px' }}>
          This shared link may have expired or is restricted to members of the workspace.
        </p>
        <Link to="/meetings" className="btn btn-primary">
          Explore Sample Meetings
        </Link>
      </div>
    );
  }

  const { meeting, clip, sharedBy } = data;
  const isClip = Boolean(clip);
  const startBound = clip ? clip.start : 0;
  const endBound = clip ? clip.end : meeting.duration;
  const clipDuration = endBound - startBound;

  // Filter transcript segments to clip range if clip
  const relevantSegments = isClip
    ? meeting.segments.filter((s) => s.end >= startBound && s.start <= endBound)
    : meeting.segments;

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--canvas)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Banner */}
      <header
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--line)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--live)' }} />
          <span style={{ fontWeight: 800, fontSize: '15px', color: 'var(--ink)' }}>Fathom (rebuild)</span>
          <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>· Recipient View</span>
        </div>

        <Link to={`/meetings/${meeting.id}`} className="btn btn-primary btn-sm">
          Open Full Meeting →
        </Link>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '780px', width: '100%', margin: '24px auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Recipient Header Info */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-panel)', padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginBottom: '4px' }}>
            {sharedBy} shared {isClip ? 'a 2-minute excerpt' : 'a meeting'} with you
          </div>
          <h1 tabIndex={-1} style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
            {isClip ? clip?.title : meeting.title}
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--ink-2)', display: 'flex', gap: '12px' }}>
            <span>October 14, 2026</span>
            <span>·</span>
            <span className="tabular">{formatTimecode(clipDuration)}</span>
            <span>·</span>
            <span>{meeting.speakers.length} attendees</span>
          </div>
        </div>

        {/* Video / Playback Card */}
        <div style={{ background: 'var(--ink)', borderRadius: 'var(--radius-panel)', padding: '20px', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              height: '160px',
              background: '#08171d',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => playerRef.current?.togglePlay()}
              style={{ width: '48px', height: '48px', borderRadius: '50%', padding: 0 }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            <span className="tabular" style={{ fontSize: '14px', fontWeight: 600 }}>
              {formatTimecode(currentTime)} / {formatTimecode(endBound)}
            </span>
          </div>
        </div>

        {/* AI Summary Section */}
        {meeting.summary && (
          <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-panel)', padding: '20px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-3)', marginBottom: '12px' }}>
              Key Takeaway & Receipts
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {meeting.summary.catchUp.slice(0, 2).map((b) => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: 'var(--cue)', fontWeight: 700 }}>•</span>
                  <p style={{ margin: 0, fontSize: '15px', color: 'var(--ink)', lineHeight: 1.5, fontFamily: 'var(--font-prose)' }}>
                    {b.text}
                    {b.receipts.map((r, idx) => (
                      <ReceiptChip
                        key={idx}
                        at={r.at}
                        onClick={(t) => {
                          const rel = Math.max(0, t - startBound);
                          playerRef.current?.seek(rel);
                        }}
                      />
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Transcript Excerpt */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-panel)', padding: '20px' }}>
          <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-3)', marginBottom: '12px' }}>
            Transcript Excerpt
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {relevantSegments.map((seg) => {
              const spk = meeting.speakers.find((s) => s.id === seg.speakerId);
              const isActive = currentTime >= seg.start && currentTime <= seg.end;

              return (
                <div
                  key={seg.id}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: isActive ? 'var(--cue-tint)' : 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    const rel = Math.max(0, seg.start - startBound);
                    playerRef.current?.seek(rel);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: spk ? `var(--speaker-${spk.colorIndex})` : 'var(--ink)' }}>
                      {spk?.name || 'Speaker'}
                    </span>
                    <span className="tabular" style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
                      {formatTimecode(seg.start)}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--ink)', fontFamily: 'var(--font-prose)', lineHeight: 1.5 }}>
                    {seg.text}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
