import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MANIFEST } from '../../routes/manifest';
import { INTEGRATIONS_LIST } from '../../content/integrations';
import { HELP_ARTICLES } from '../../content/help';
import { API_ENDPOINTS } from '../../content/docs';
import { CHANGELOG_ITEMS } from '../../content/changelog';
import { LEARN_ARTICLES } from '../../content/articles';
import { Kbd } from '../ui';
import './shell.css';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchEntry {
  id: string;
  category: 'Pages' | 'Integrations' | 'Help' | 'Developers' | 'Updates' | 'Learn';
  title: string;
  subtitle: string;
  path: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Unified Search Index
  const searchIndex: SearchEntry[] = useMemo(() => {
    const entries: SearchEntry[] = [];

    // Pages
    ROUTE_MANIFEST.slice(0, 25).forEach((r) => {
      entries.push({
        id: `page-${r.path}`,
        category: 'Pages',
        title: r.title,
        subtitle: r.path,
        path: r.path.replace(':id', 'mtg-q3-roadmap').replace(':slug', 'salesforce').replace(':token', 'demo-share-token'),
      });
    });

    // Integrations
    INTEGRATIONS_LIST.forEach((item) => {
      entries.push({
        id: `int-${item.slug}`,
        category: 'Integrations',
        title: `${item.name} Integration`,
        subtitle: `${item.category} · ${item.tagline}`,
        path: `/integrations/${item.slug}`,
      });
    });

    // Help Articles
    HELP_ARTICLES.forEach((art) => {
      entries.push({
        id: `help-${art.slug}`,
        category: 'Help',
        title: art.title,
        subtitle: `Help Center · ${art.readingTimeMinutes} min read`,
        path: `/help/article/${art.slug}`,
      });
    });

    // API Docs Endpoints
    API_ENDPOINTS.forEach((ep) => {
      entries.push({
        id: `doc-${ep.path}`,
        category: 'Developers',
        title: `${ep.method} ${ep.path}`,
        subtitle: ep.summary,
        path: `/developers/reference#${ep.path.replace(/[\/:]/g, '-')}`,
      });
    });

    // Changelog
    CHANGELOG_ITEMS.slice(0, 6).forEach((ch) => {
      entries.push({
        id: `ch-${ch.id}`,
        category: 'Updates',
        title: `${ch.version}: ${ch.title}`,
        subtitle: ch.date,
        path: '/whats-new',
      });
    });

    // Learn Articles
    LEARN_ARTICLES.forEach((art) => {
      entries.push({
        id: `art-${art.slug}`,
        category: 'Learn',
        title: art.title,
        subtitle: `Guide · ${art.author}`,
        path: `/learn/${art.slug}`,
      });
    });

    return entries;
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return searchIndex.slice(0, 8);
    }
    const q = query.toLowerCase();
    return searchIndex
      .filter((item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q) || item.path.toLowerCase().includes(q))
      .slice(0, 10);
  }, [query, searchIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
      } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        e.preventDefault();
        const target = filteredResults[selectedIndex].path;
        onClose();
        navigate(target);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose, navigate]);

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Global Search">
      <div className="cmd-palette-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        {/* Search Input Bar */}
        <div className="cmd-palette-input-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmd-palette-input"
            placeholder="Search pages, integrations, docs, help, changelog... (esc to exit)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <Kbd>ESC</Kbd>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '8px 0' }}>
          {filteredResults.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--ink-3)', fontSize: '14px' }}>
              No matches found for "{query}". Try searching "Salesforce", "API", or "Pricing".
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    navigate(item.path);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--surface-sunk)' : 'transparent',
                    borderLeft: isSelected ? '3px solid var(--ink)' : '3px solid transparent',
                  }}
                >
                  <div style={{ minWidth: 0, paddingRight: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background:
                            item.category === 'Pages'
                              ? 'var(--line)'
                              : item.category === 'Integrations'
                              ? '#EBF5FF'
                              : item.category === 'Developers'
                              ? '#F3E8FF'
                              : item.category === 'Help'
                              ? '#FEF3C7'
                              : 'var(--surface-sunk)',
                          color:
                            item.category === 'Integrations'
                              ? '#1E40AF'
                              : item.category === 'Developers'
                              ? '#6B21A8'
                              : item.category === 'Help'
                              ? '#92400E'
                              : 'var(--ink-2)',
                        }}
                      >
                        {item.category}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>{item.title}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.subtitle}
                    </div>
                  </div>
                  <Kbd>↵</Kbd>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '10px 16px',
            background: 'var(--surface-sunk)',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--ink-3)',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            <span><Kbd>↑</Kbd> <Kbd>↓</Kbd> Navigate</span>
            <span><Kbd>↵</Kbd> Open</span>
          </div>
          <span>Global Search Across Rebuild</span>
        </div>
      </div>
    </div>
  );
};
