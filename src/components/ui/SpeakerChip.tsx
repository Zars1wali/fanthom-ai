import React from 'react';
import type { Speaker } from '../../data/types';
import './ui.css';

export interface SpeakerChipProps {
  speaker: Speaker;
  showTalkPct?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SpeakerChip: React.FC<SpeakerChipProps> = ({
  speaker,
  showTalkPct = true,
  active = false,
  onClick,
  className = '',
}) => {
  const colorVar = `var(--speaker-${speaker.colorIndex})`;
  const tintVar = `var(--speaker-${speaker.colorIndex}-tint)`;

  return (
    <button
      type="button"
      className={`speaker-chip ${className}`.trim()}
      onClick={onClick}
      style={{
        backgroundColor: active ? tintVar : undefined,
        borderColor: active ? colorVar : undefined,
        cursor: onClick ? 'pointer' : 'default',
      }}
      title={`${speaker.name} (${speaker.talkPct}% talk time)`}
    >
      <span
        className="speaker-avatar"
        style={{ backgroundColor: colorVar }}
        aria-hidden="true"
      >
        {speaker.initials}
      </span>
      <span style={{ fontWeight: speaker.named ? 600 : 400, color: speaker.named ? 'var(--ink)' : 'var(--ink-2)' }}>
        {speaker.name}
      </span>
      {showTalkPct && (
        <span className="tabular" style={{ fontSize: '11px', color: 'var(--ink-3)', marginLeft: '2px' }}>
          {speaker.talkPct}%
        </span>
      )}
    </button>
  );
};
