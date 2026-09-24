import React from 'react';
import type { Moment } from '../../data/types';
import { mockRepo } from '../../data/mockRepo';
import { ReceiptChip, Button, formatTimecode } from '../ui';
import { useToast } from '../ui/Toast';
import './meeting.css';

export interface HighlightsTabProps {
  meetingId: string;
  moments: Moment[];
  currentTime: number;
  onSeek: (seconds: number) => void;
  onMomentsUpdate: (moments: Moment[]) => void;
  onAddHighlight: () => void;
}

export const HighlightsTab: React.FC<HighlightsTabProps> = ({
  meetingId,
  moments,
  currentTime,
  onSeek,
  onMomentsUpdate,
  onAddHighlight,
}) => {
  const { toast } = useToast();

  const handleRemove = async (momentId: string) => {
    const target = moments.find((m) => m.id === momentId);
    if (!target) return;

    await mockRepo.removeHighlight(meetingId, momentId);
    onMomentsUpdate(moments.filter((m) => m.id !== momentId));

    toast({
      message: `Removed highlight at ${formatTimecode(target.at)}`,
      actionLabel: 'Undo',
      onAction: async () => {
        const added = await mockRepo.addHighlight(meetingId, target.at, target.note);
        onMomentsUpdate([...moments, added].sort((a, b) => a.at - b.at));
      },
    });
  };

  return (
    <div style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', flex: 1, overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Moments & Highlights ({moments.length})
        </span>
        <Button size="sm" variant="secondary" onClick={onAddHighlight}>
          + Highlight at {formatTimecode(currentTime)}
        </Button>
      </div>

      {moments.map((m) => {
        const isHighlight = m.kind === 'highlight';
        return (
          <div
            key={m.id}
            style={{
              padding: 'var(--sp-3)',
              borderRadius: 'var(--radius-control)',
              background: '#ffffff',
              border: '1px solid var(--line)',
              borderLeft: isHighlight ? '3px solid var(--hl)' : '3px solid var(--cue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: isHighlight ? '#7a5200' : 'var(--cue)' }}>
                  {m.kind}
                </span>
                <span className="tabular" style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
                  at {formatTimecode(m.at)}
                </span>
              </div>
              {m.note && (
                <span style={{ fontSize: '13px', color: 'var(--ink)' }}>{m.note}</span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ReceiptChip at={m.at} onClick={(t) => onSeek(t)} />
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => handleRemove(m.id)}
                title="Remove moment"
                style={{ color: 'var(--ink-3)', fontSize: '12px' }}
              >
                ✕
              </button>
            </div>
          </div>
        );
      })}

      {moments.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--sp-6)', color: 'var(--ink-3)' }}>
          No moments marked. Press <kbd className="kbd">H</kbd> during playback to save a moment.
        </div>
      )}
    </div>
  );
};
