import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './shell.css';

export interface RailProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Rail: React.FC<RailProps> = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`rail ${collapsed ? 'collapsed' : 'expanded'}`} aria-label="Main Navigation">
      <nav className="rail-nav">
        <NavLink
          to="/meetings"
          className={({ isActive }) => `rail-link ${isActive ? 'active' : ''}`}
          title="Meetings"
        >
          <span className="rail-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          {!collapsed && <span className="rail-label">Meetings</span>}
        </NavLink>

        <NavLink
          to="/live"
          className={({ isActive }) => `rail-link ${isActive ? 'active' : ''}`}
          title="Live Simulation"
        >
          <span className="rail-icon" style={{ position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 7l-7 5 7 5V7z" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'var(--live)',
              }}
            />
          </span>
          {!collapsed && <span className="rail-label">Live Mode</span>}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => `rail-link ${isActive ? 'active' : ''}`}
          title="Settings"
        >
          <span className="rail-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </span>
          {!collapsed && <span className="rail-label">Settings</span>}
        </NavLink>
      </nav>

      <div className="rail-bottom">
        <button
          type="button"
          className="rail-link"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{ width: '100%', border: 'none', background: 'none' }}
        >
          <span className="rail-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {collapsed ? (
                <polyline points="9 18 15 12 9 6" />
              ) : (
                <polyline points="15 18 9 12 15 6" />
              )}
            </svg>
          </span>
          {!collapsed && <span className="rail-label">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};
