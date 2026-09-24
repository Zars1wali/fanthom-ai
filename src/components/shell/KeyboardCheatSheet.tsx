import React from 'react';
import { Dialog, Kbd } from '../ui';

export interface KeyboardCheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardCheatSheet: React.FC<KeyboardCheatSheetProps> = ({ isOpen, onClose }) => {
  const shortcuts = [
    { key: 'Space', desc: 'Play / Pause meeting audio clock' },
    { key: 'J', desc: 'Skip backward 10 seconds' },
    { key: 'K', desc: 'Toggle Play / Pause' },
    { key: 'L', desc: 'Skip forward 10 seconds' },
    { key: 'H', desc: 'Add highlight at current playhead time' },
    { key: '⌘ K', desc: 'Open Command Palette & Global Search' },
    { key: '← / →', desc: 'Scrub playhead along the Score' },
    { key: 'Enter', desc: 'Seek to selected moment or receipt' },
    { key: '?', desc: 'Show / hide this keyboard shortcuts sheet' },
    { key: 'Esc', desc: 'Close dialogs, menus, or command palette' },
  ];

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts" maxWidth="480px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
        {shortcuts.map((s, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 0',
              borderBottom: idx < shortcuts.length - 1 ? '1px solid var(--line)' : 'none',
            }}
          >
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>{s.desc}</span>
            <Kbd>{s.key}</Kbd>
          </div>
        ))}
      </div>
    </Dialog>
  );
};
