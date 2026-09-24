import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { mockRepo } from '../data/mockRepo';
import type { Meeting } from '../data/types';
import { ClockPlayer, type PlayerAdapter } from '../player/PlayerAdapter';
import { Score } from '../components/meeting/Score';
import { PlayerCard } from '../components/meeting/PlayerCard';
import { TranscriptView } from '../components/meeting/TranscriptView';
import { SummaryPanel } from '../components/meeting/SummaryPanel';
import { ActionItemsTab } from '../components/meeting/ActionItemsTab';
import { HighlightsTab } from '../components/meeting/HighlightsTab';
import { AskTab } from '../components/meeting/AskTab';
import { ShareModal } from '../components/meeting/ShareModal';
import { Tabs, Button, Chip, Skeleton, formatTimecode, useToast } from '../components/ui';
import '../components/meeting/meeting.css';

export const MeetingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Playback state
  const playerRef = useRef<PlayerAdapter | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1.0);

  // Right pane tab
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'summary');

  // Share modal state
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [clipRange, setClipRange] = useState<{ start: number; end: number } | null>(null);

  // Load meeting data
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    mockRepo
      .getMeeting(id)
      .then((m) => {
        setMeeting(m);
        setDuration(m.duration);
        setError(null);

        // Check ?t= parameter from URL
        const tParam = searchParams.get('t');
        const initialTime = tParam ? Number(tParam) : 0;

        // Clean up previous player
        if (playerRef.current) {
          playerRef.current.destroy();
        }

        const clock = new ClockPlayer(m.duration, initialTime);
        playerRef.current = clock;

        clock.onTimeUpdate((t) => {
          setCurrentTime(t);
        });

        clock.onStateChange((playing, r) => {
          setIsPlaying(playing);
          setRate(r);
        });

        setCurrentTime(initialTime);
      })
      .catch((err) => {
        setError(err.message || 'Could not load meeting');
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [id]);

  // Sync seek to player & URL param
  const handleSeek = useCallback(
    (seconds: number) => {
      if (playerRef.current) {
        playerRef.current.seek(seconds);
      }
      setCurrentTime(seconds);
      setSearchParams(
        (prev) => {
          prev.set('t', Math.round(seconds).toString());
          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // Highlight action: H key or button
  const handleAddHighlight = useCallback(
    async (timeToHighlight?: number) => {
      if (!meeting) return;
      const at = timeToHighlight !== undefined ? timeToHighlight : currentTime;
      const newMoment = await mockRepo.addHighlight(meeting.id, at);

      setMeeting((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          moments: [...prev.moments, newMoment].sort((a, b) => a.at - b.at),
        };
      });

      toast({
        message: `Highlighted at ${formatTimecode(at)}`,
        actionLabel: 'Undo',
        onAction: async () => {
          await mockRepo.removeHighlight(meeting.id, newMoment.id);
          setMeeting((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              moments: prev.moments.filter((m) => m.id !== newMoment.id),
            };
          });
        },
      });
    },
    [meeting, currentTime, toast]
  );

  // Keyboard controls: Space (play/pause), J/K/L, H
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl?.tagName === 'INPUT' ||
        activeEl?.tagName === 'TEXTAREA' ||
        activeEl?.getAttribute('contenteditable') === 'true';

      if (isInput) return;

      if (e.code === 'Space' || e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playerRef.current?.togglePlay();
      } else if (e.key.toLowerCase() === 'j') {
        e.preventDefault();
        handleSeek(Math.max(0, currentTime - 10));
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        handleSeek(Math.min(duration, currentTime + 10));
      } else if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        handleAddHighlight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, duration, handleSeek, handleAddHighlight]);

  // Rename meeting
  const handleTitleChange = async (newTitle: string) => {
    if (!meeting || !newTitle.trim()) return;
    await mockRepo.renameMeeting(meeting.id, newTitle);
    setMeeting((prev) => (prev ? { ...prev, title: newTitle } : prev));
    toast({ message: 'Meeting renamed', duration: 2500 });
  };

  // Range clip from Score
  const handleCreateClip = (start: number, end: number) => {
    setClipRange({ start, end });
    setIsShareOpen(true);
  };

  if (loading) {
    return (
      <div style={{ padding: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        <Skeleton width="40%" height={32} />
        <Skeleton width="100%" height={120} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 'var(--sp-4)' }}>
          <Skeleton width="100%" height={400} />
          <Skeleton width="100%" height={400} />
        </div>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--sp-8)' }}>
        <h2 style={{ marginBottom: 'var(--sp-3)' }}>Could not load meeting</h2>
        <p style={{ color: 'var(--ink-2)', marginBottom: 'var(--sp-4)' }}>{error || 'Meeting not found.'}</p>
        <Button variant="primary" onClick={() => navigate('/meetings')}>
          Return to Meetings Library
        </Button>
      </div>
    );
  }

  return (
    <div className="meeting-page">
      {/* Meeting Header */}
      <header className="meeting-header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="text"
              defaultValue={meeting.title}
              onBlur={(e) => handleTitleChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur();
              }}
              className="meeting-title-input"
              title="Click to rename"
              aria-label="Meeting title"
            />
            {meeting.isSample && <Chip variant="cue">Sample</Chip>}
          </div>

          <div className="meeting-meta-line">
            <span>October 14, 2026</span>
            <span>·</span>
            <span className="tabular">{Math.round(meeting.duration / 60)} minutes</span>
            <span>·</span>
            <span>{meeting.speakers.length} attendees</span>
            <span>·</span>
            <span style={{ textTransform: 'capitalize' }}>{meeting.capture.replace('-', ' ')}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          <Button
            variant="secondary"
            onClick={() => {
              setClipRange(null);
              setIsShareOpen(true);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </Button>
        </div>
      </header>

      {/* The Score — Primary interactive timeline control */}
      <Score
        meeting={meeting}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        onCreateClip={handleCreateClip}
        onAddHighlight={handleAddHighlight}
      />

      {/* Workspace Split: Player & Transcript (Left) + Summary Tabs (Right) */}
      <div className="meeting-content-split">
        {/* Left Pane: Player Card + Transcript View */}
        <div className="meeting-left-pane">
          {playerRef.current && (
            <PlayerCard
              player={playerRef.current}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              rate={rate}
              captureType={meeting.capture}
              onAddHighlight={() => handleAddHighlight()}
            />
          )}

          <TranscriptView
            meeting={meeting}
            currentTime={currentTime}
            onSeek={handleSeek}
            onAddHighlight={handleAddHighlight}
            onCreateClip={handleCreateClip}
          />
        </div>

        {/* Right Pane: Summary / Actions / Highlights / Ask */}
        <div className="meeting-right-pane">
          <Tabs
            tabs={[
              { id: 'summary', label: 'Summary' },
              { id: 'actions', label: 'Actions', badge: meeting.actions.filter((a) => !a.done).length },
              { id: 'highlights', label: 'Highlights', badge: meeting.moments.length },
              { id: 'ask', label: 'Ask' },
            ]}
            activeId={activeTab}
            onChange={(tabId) => {
              setActiveTab(tabId);
              setSearchParams((prev) => {
                prev.set('tab', tabId);
                return prev;
              });
            }}
          />

          {activeTab === 'summary' && (
            <SummaryPanel
              meeting={meeting}
              onSeek={handleSeek}
              onSummaryUpdate={(up) =>
                setMeeting((prev) => (prev ? { ...prev, summary: up } : prev))
              }
            />
          )}

          {activeTab === 'actions' && (
            <ActionItemsTab
              meetingId={meeting.id}
              actions={meeting.actions}
              speakers={meeting.speakers}
              onSeek={handleSeek}
              onActionsUpdate={(up) =>
                setMeeting((prev) => (prev ? { ...prev, actions: up } : prev))
              }
            />
          )}

          {activeTab === 'highlights' && (
            <HighlightsTab
              meetingId={meeting.id}
              moments={meeting.moments}
              currentTime={currentTime}
              onSeek={handleSeek}
              onMomentsUpdate={(up) =>
                setMeeting((prev) => (prev ? { ...prev, moments: up } : prev))
              }
              onAddHighlight={() => handleAddHighlight()}
            />
          )}

          {activeTab === 'ask' && (
            <AskTab meetingId={meeting.id} onSeek={handleSeek} />
          )}
        </div>
      </div>

      {/* Share / Clip Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        meeting={meeting}
        initialClipRange={clipRange}
      />
    </div>
  );
};
