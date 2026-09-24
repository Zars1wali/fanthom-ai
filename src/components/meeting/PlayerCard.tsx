import React from 'react';
import type { PlayerAdapter } from '../../player/PlayerAdapter';
import { formatTimecode, Kbd } from '../ui';
import './meeting.css';

export interface PlayerCardProps {
  player: PlayerAdapter;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  rate: number;
  captureType?: 'bot-video' | 'audio' | 'transcript';
  onAddHighlight: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  currentTime,
  duration,
  isPlaying,
  rate,
  captureType = 'bot-video',
  onAddHighlight,
}) => {
  const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="player-card" aria-label="Media Playback Controller">
      {/* Visual Surface */}
      <div className="player-no-video">
        <div className="waveform-synth" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, i) => {
            const h = isPlaying
              ? Math.max(8, Math.sin((currentTime * 3) + i) * 24 + 20)
              : 8 + (i % 5) * 4;
            return (
              <div
                key={i}
                className="waveform-bar"
                style={{
                  height: `${h}px`,
                  opacity: isPlaying ? 0.9 : 0.4,
                }}
              />
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {captureType === 'transcript' ? 'Transcript only' : 'Clock-synced playback'}
          </span>
          <span className="tabular" style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
            {formatTimecode(currentTime)} / {formatTimecode(duration)}
          </span>
        </div>
      </div>

      {/* Controls Row */}
      <div className="player-controls-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          {/* Skip -10s */}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => player.seek(currentTime - 10)}
            style={{ color: '#ffffff' }}
            title="Skip back 10s (J)"
            aria-label="Skip back 10 seconds"
          >
            <span style={{ fontSize: '11px' }}>-10s</span>
          </button>

          {/* Play/Pause */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => player.togglePlay()}
            title={isPlaying ? 'Pause (Space / K)' : 'Play (Space / K)'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            style={{ width: '38px', height: '32px', padding: 0 }}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          {/* Skip +10s */}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => player.seek(currentTime + 10)}
            style={{ color: '#ffffff' }}
            title="Skip forward 10s (L)"
            aria-label="Skip forward 10 seconds"
          >
            <span style={{ fontSize: '11px' }}>+10s</span>
          </button>
        </div>

        {/* Speed Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {speeds.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => player.setPlaybackRate(s)}
              className="btn btn-ghost btn-sm tabular"
              style={{
                fontSize: '11px',
                padding: '2px 5px',
                color: rate === s ? 'var(--hl)' : 'rgba(255,255,255,0.7)',
                fontWeight: rate === s ? 700 : 500,
              }}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Highlight Button with H kbd */}
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onAddHighlight}
          title="Highlight current moment (H)"
          style={{ background: 'var(--hl)', color: '#0F2A33', borderColor: 'var(--hl)', fontWeight: 700 }}
        >
          <span>Highlight</span>
          <Kbd style={{ background: '#ffffff', color: '#0F2A33', fontSize: '9px', height: '14px' }}>H</Kbd>
        </button>
      </div>
    </div>
  );
};
