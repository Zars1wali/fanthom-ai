import React, { useEffect } from 'react';
import './ui.css';

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: 'right' | 'bottom';
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  side = 'right',
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isBottom = side === 'bottom';

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      style={{
        alignItems: isBottom ? 'flex-end' : 'stretch',
        justifyContent: isBottom ? 'center' : 'flex-end',
        padding: 0,
      }}
    >
      <div
        className="sheet-panel"
        style={{
          background: 'var(--surface)',
          borderLeft: isBottom ? 'none' : '1px solid var(--line)',
          borderTop: isBottom ? '1px solid var(--line)' : 'none',
          borderTopLeftRadius: isBottom ? 'var(--radius-panel)' : '0',
          borderTopRightRadius: isBottom ? 'var(--radius-panel)' : '0',
          width: isBottom ? '100%' : '440px',
          maxWidth: '100%',
          height: isBottom ? '70vh' : '100dvh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-float)',
          zIndex: 'var(--z-overlay)',
          overflowY: 'auto',
        }}
      >
        {title && (
          <div className="modal-header">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{title}</h2>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={onClose}
              aria-label="Close panel"
            >
              ✕
            </button>
          </div>
        )}
        <div style={{ padding: 'var(--sp-5)', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
