import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { CHANGELOG_ITEMS } from '../content/changelog';
import { Chip, Button } from '../components/ui';

const CATEGORIES = ['All Updates', 'Capture', 'AI', 'Integrations', 'Performance'];

export const ChangelogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Updates');
  const navigate = useNavigate();

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All Updates') return CHANGELOG_ITEMS;
    return CHANGELOG_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <SiteShell
      currentSection="resources"
      breadcrumbs={[{ label: "What's New" }]}
    >
      <div style={{ maxWidth: '960px', margin: '48px auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Chip variant="cue">Product Changelog & Engine Updates</Chip>
          <h1 style={{ fontSize: '44px', fontWeight: 800, letterSpacing: '-0.03em', margin: '12px auto 16px' }}>
            What's New in Fathom
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.5 }}>
            Continuous improvements to our speech diarization engine, timeline player, CRM sync pipelines, and AI receipt verification.
          </p>

          {/* Category Filter Pills */}
          <div style={{ display: 'inline-flex', gap: '8px', background: 'var(--surface-sunk)', padding: '6px', borderRadius: '10px', border: '1px solid var(--line)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--surface)' : 'transparent',
                    color: isSelected ? 'var(--ink)' : 'var(--ink-2)',
                    boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Changelog Timeline Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '64px' }}>
          {filteredItems.map((item) => (
            <article
              key={item.id}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '36px',
                position: 'relative',
              }}
            >
              {/* Header meta */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, background: 'var(--surface-sunk)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--line)' }}>
                    {item.version}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color:
                        item.category === 'Capture'
                          ? 'var(--live)'
                          : item.category === 'AI'
                          ? 'var(--cue)'
                          : item.category === 'Integrations'
                          ? '#2563EB'
                          : 'var(--ok)',
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                <time style={{ fontSize: '13px', color: 'var(--ink-3)', fontWeight: 600 }}>{item.date}</time>
              </div>

              {/* Title & Summary */}
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px' }}>
                {item.title}
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '20px' }}>
                {item.summary}
              </p>

              {/* Highlights Bullet points */}
              <div style={{ background: 'var(--canvas)', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)', marginBottom: '10px' }}>
                  Release Highlights
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--ink-2)' }}>
                  {item.highlights.map((hl, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--ok)', fontWeight: 800 }}>✓</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action / Try It Deep Link */}
              {item.tryRoute && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(item.tryRoute!)}
                  >
                    {item.tryLabel || 'Try this feature in demo'} →
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Subscribe / RSS footer */}
        <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
            Want to stay updated on new engine releases?
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '14px', marginBottom: '16px' }}>
            Subscribe to our product release notifications or consume via RSS.
          </p>
          <div style={{ display: 'inline-flex', gap: '8px' }}>
            <Button size="sm" variant="secondary" onClick={() => alert('Sample RSS feed subscription link.')}>
              Copy RSS URL
            </Button>
            <Button size="sm" variant="primary" onClick={() => navigate('/onboarding')}>
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
};
