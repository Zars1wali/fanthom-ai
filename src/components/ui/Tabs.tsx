import React, { useState } from 'react';
import './ui.css';

/* ── Tooltip ─────────────────────────────────────────── */
export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="tooltip-box" role="tooltip">
          {content}
        </div>
      )}
    </div>
  );
};

/* ── Tabs ────────────────────────────────────────────── */
export interface TabItem {
  id: string;
  label: string;
  badge?: number | string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeId,
  onChange,
  className = '',
}) => {
  return (
    <nav className={`tabs-header ${className}`.trim()} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="tab-badge tabular">{tab.badge}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

/* ── Segmented Control ───────────────────────────────── */
export interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string; icon?: React.ReactNode }[];
  value: T;
  onChange: (val: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <div className={`segmented-control ${className}`.trim()} role="group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`segmented-option ${opt.value === value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.icon && <span style={{ marginRight: '4px' }}>{opt.icon}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
