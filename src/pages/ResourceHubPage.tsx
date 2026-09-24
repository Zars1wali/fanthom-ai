import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { LEARN_ARTICLES } from '../content/articles';
import { CASE_STUDIES } from '../content/cases';
import { COMPARISONS_LIST } from '../content/comparisons';
import { Chip, Button } from '../components/ui';

// Only categories that actually have items (per craft rule: hide empty categories!)
const FILTER_TYPES = ['All Resources', 'Guides & Academy', 'Case Studies (Sample)', 'Competitor Comparisons'];

export const ResourceHubPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Resources');

  const allItems = useMemo(() => {
    const list: {
      id: string;
      type: 'Guides & Academy' | 'Case Studies (Sample)' | 'Competitor Comparisons';
      title: string;
      summary: string;
      meta: string;
      link: string;
    }[] = [];

    // Articles
    LEARN_ARTICLES.forEach((art) => {
      list.push({
        id: `guide-${art.slug}`,
        type: 'Guides & Academy',
        title: art.title,
        summary: art.excerpt,
        meta: `${art.readingTimeMinutes} min read · By ${art.author}`,
        link: `/learn/${art.slug}`,
      });
    });

    // Case studies
    CASE_STUDIES.forEach((cs) => {
      list.push({
        id: `case-${cs.slug}`,
        type: 'Case Studies (Sample)',
        title: `${cs.companyName}: ${cs.headline}`,
        summary: cs.challenge,
        meta: `${cs.industry} · Sample story`,
        link: `/case-studies/${cs.slug}`,
      });
    });

    // Comparisons
    COMPARISONS_LIST.slice(0, 4).forEach((comp) => {
      list.push({
        id: `comp-${comp.slug}`,
        type: 'Competitor Comparisons',
        title: `Fathom vs ${comp.competitorName}: Architecture & Receipts`,
        summary: comp.tagline,
        meta: `As of ${comp.asOfDate} · Comparison guide`,
        link: `/vs/${comp.slug}`,
      });
    });

    return list;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All Resources') return allItems;
    return allItems.filter((i) => i.type === activeFilter);
  }, [activeFilter, allItems]);

  return (
    <SiteShell
      currentSection="resources"
      breadcrumbs={[{ label: 'Resource Hub' }]}
    >
      <div style={{ maxWidth: '1160px', margin: '48px auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Chip variant="cue">Knowledge & Playbooks</Chip>
          <h1 style={{ fontSize: '44px', fontWeight: 800, letterSpacing: '-0.03em', margin: '12px auto 16px', maxWidth: '800px' }}>
            Meeting Intelligence Resource Hub
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
            Explore practical playbooks, operational frameworks, sample customer case studies, and architectural comparisons.
          </p>
        </div>

        {/* Filter Bar (Hides empty categories) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {FILTER_TYPES.map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--ink)' : '1px solid var(--line)',
                  background: isSelected ? 'var(--ink)' : 'var(--surface)',
                  color: isSelected ? '#ffffff' : 'var(--ink-2)',
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: item.type === 'Case Studies (Sample)' ? 'var(--ok)' : 'var(--cue)',
                  }}
                >
                  {item.type}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>{item.meta}</span>
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.3 }}>
                {item.title}
              </h2>

              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0, flex: 1 }}>
                {item.summary}
              </p>

              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: 'var(--cue)', fontWeight: 700 }}>
                <span>Read resource</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Academy Banner */}
        <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
              Want to master meeting intelligence workflows?
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
              Read our flagship 800-word field guide on asynchronous recaps, speaker accountability, and timecode receipts.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Link to="/learn/meeting-intelligence-playbook">
              <Button size="lg" variant="primary">
                Read The Playbook →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
};
