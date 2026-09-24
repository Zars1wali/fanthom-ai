import React from 'react';
import './ui.css';

export interface ReceiptChipProps {
  at: number; // time in seconds
  speakerInitial?: string;
  speakerColorIndex?: number;
  onClick?: (time: number) => void;
  title?: string;
}

export function formatTimecode(seconds: number): string {
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  const secStr = sec < 10 ? `0${sec}` : `${sec}`;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    const minStr = min < 10 ? `0${min}` : `${min}`;
    return `${h}:${minStr}:${secStr}`;
  }
  return `${m}:${secStr}`;
}

export const ReceiptChip: React.FC<ReceiptChipProps> = ({
  at,
  speakerInitial,
  speakerColorIndex = 1,
  onClick,
  title,
}) => {
  const timeFormatted = formatTimecode(at);
  const colorVar = `var(--speaker-${speakerColorIndex})`;

  return (
    <button
      type="button"
      className="receipt-chip tabular"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(at);
      }}
      title={title || `Jump to ${timeFormatted}`}
      aria-label={`Jump to moment at ${timeFormatted}`}
    >
      <span>{timeFormatted}</span>
      {speakerInitial && (
        <span
          className="receipt-speaker-initial"
          style={{ backgroundColor: colorVar }}
          aria-hidden="true"
        >
          {speakerInitial}
        </span>
      )}
    </button>
  );
};
