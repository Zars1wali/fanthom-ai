import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../config';
import { Kbd } from '../ui';
import './shell.css';

export interface TopBarProps {
  onOpenCommandPalette: () => void;
  onOpenShortcuts: () => void;
  currentTitle?: string;
  isSample?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenCommandPalette,
  onOpenShortcuts,
  currentTitle,
  isSample = true,
}) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <Link to="/meetings" className="topbar-logo" aria-label={`${APP_NAME} Home`}>
          <span className="topbar-tally-dot" title="Tally indicator: system ready" />
          <span>{APP_NAME}</span>
        </Link>

        {isSample && (
          <span className="sample-badge" title="Synthesized sample meeting dataset">
            Sample
          </span>
        )}

        {currentTitle && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
            <span style={{ color: 'var(--line)' }}>/</span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>
              {currentTitle}
            </span>
          </div>
        )}
      </div>

      <div className="topbar-right">
        <button
          type="button"
          className="topbar-search-btn"
          onClick={onOpenCommandPalette}
          aria-label="Search or run command"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ flex: 1, textAlign: 'left' }}>Search or ask…</span>
          <Kbd>⌘K</Kbd>
        </button>

        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={onOpenShortcuts}
          title="Keyboard shortcuts (?)"
          aria-label="View keyboard shortcuts"
        >
          <Kbd>?</Kbd>
        </button>

        <Link to="/dev/design" className="btn btn-ghost btn-sm" title="Component Gallery & QA">
          <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>Gallery</span>
        </Link>

        <div className="user-avatar-btn" title="You (Demo Workspace)">
          Y
        </div>
      </div>
    </header>
  );
};
