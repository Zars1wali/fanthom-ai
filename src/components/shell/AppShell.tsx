import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Rail } from './Rail';
import { CommandPalette } from './CommandPalette';
import { KeyboardCheatSheet } from './KeyboardCheatSheet';
import './shell.css';

export interface AppShellProps {
  children: React.ReactNode;
  currentTitle?: string;
}

export const AppShell: React.FC<AppShellProps> = ({ children, currentTitle }) => {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const location = useLocation();

  // Global keyboard shortcuts: ⌘K or Ctrl+K for palette, ? for shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger while typing in inputs, textareas, or contenteditables
      const activeEl = document.activeElement;
      const isInput =
        activeEl?.tagName === 'INPUT' ||
        activeEl?.tagName === 'TEXTAREA' ||
        activeEl?.getAttribute('contenteditable') === 'true';

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === '?' && !isInput && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setShortcutsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Move focus to main heading or main container on route change
  useEffect(() => {
    const h1 = document.querySelector('h1');
    if (h1) {
      h1.focus();
    } else {
      document.getElementById('main-content')?.focus();
    }
  }, [location.pathname]);

  return (
    <div className="app-shell-container">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <TopBar
        onOpenCommandPalette={() => setCmdOpen(true)}
        onOpenShortcuts={() => setShortcutsOpen(true)}
        currentTitle={currentTitle}
      />

      <Rail />

      <main id="main-content" tabIndex={-1} className="shell-main">
        {children}
      </main>

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <KeyboardCheatSheet isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  );
};
