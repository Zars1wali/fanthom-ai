import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { COMPARISONS_LIST } from '../content/comparisons';
import { Button } from '../components/ui';

export const ComparisonPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // If no slug or 'overview', default to 'fireflies' or show comparison hub
  const activeSlug = slug && slug !== 'overview' ? slug : 'fireflies';
  const comparison = COMPARISONS_LIST.find((c) => c.slug === activeSlug) || COMPARISONS_LIST[0];

  // State: "Show only differences" toggle
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);

  const displayedFeatures = showOnlyDifferences
    ? comparison.featureMatrix.filter((row) => row.fathomValue !== row.competitorValue)
    : comparison.featureMatrix;

  return (
    <SiteShell
      currentSection="product"
      breadcrumbs={[{ label: 'Comparisons', path: '/vs' }, { label: `vs ${comparison.competitorName}` }]}
    >
      <div style={{ maxWidth: '1100px', margin: '48px auto', padding: '0 24px' }}>
        {/* Competitor Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '32px', borderBottom: '1px solid var(--line)' }}>
          {COMPARISONS_LIST.map((comp) => {
            const isActive = comp.slug === activeSlug;
            return (
              <Link
                key={comp.slug}
                to={`/vs/${comp.slug}`}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  background: isActive ? 'var(--ink)' : 'var(--surface)',
                  color: isActive ? '#ffffff' : 'var(--ink-2)',
                  border: isActive ? '1px solid var(--ink)' : '1px solid var(--line)',
                }}
              >
                vs {comp.competitorName}
              </Link>
            );
          })}
        </div>

        {/* Header Hero */}
        <div style={{ maxWidth: '840px', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--surface-sunk)', padding: '4px 12px', borderRadius: '16px', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-3)' }}>
              As of {comparison.asOfDate} · Sample comparison analysis
            </span>
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 16px', lineHeight: 1.15 }}>
            Fathom vs {comparison.competitorName}
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
            {comparison.summary}
          </p>
        </div>

        {/* Key Takeaway Callout Card */}
        <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--cue)', marginBottom: '6px' }}>
            Bottom-Line Evaluation
          </div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.5 }}>
            {comparison.keyTakeaway}
          </div>
        </div>

        {/* FEATURE MATRIX TABLE WITH DIFFERENCES TOGGLE */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>
              Feature & Architecture Comparison
            </h2>

            {/* Differences Only Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--ink-2)' }}>
              <input
                type="checkbox"
                checked={showOnlyDifferences}
                onChange={(e) => setShowOnlyDifferences(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span>Show differences only</span>
            </label>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 2fr',
                padding: '16px 20px',
                background: 'var(--surface-sunk)',
                borderBottom: '1px solid var(--line)',
                fontWeight: 800,
                fontSize: '13px',
              }}
            >
              <div>Capability / Metric</div>
              <div style={{ color: 'var(--cue)' }}>Fathom (rebuild)</div>
              <div>{comparison.competitorName}</div>
            </div>

            {/* Rows */}
            {displayedFeatures.map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 2fr',
                  padding: '14px 20px',
                  borderBottom: idx < displayedFeatures.length - 1 ? '1px solid var(--line)' : 'none',
                  background: idx % 2 === 0 ? 'var(--surface)' : 'var(--canvas)',
                  fontSize: '13px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--ink-3)', display: 'block' }}>{row.category}</span>
                  <strong style={{ color: 'var(--ink)' }}>{row.feature}</strong>
                </div>
                <div style={{ color: row.isAdvantage ? 'var(--ok)' : 'var(--ink)', fontWeight: 600 }}>
                  {row.fathomValue}
                </div>
                <div style={{ color: 'var(--ink-2)' }}>
                  {row.competitorValue}
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '8px' }}>
            * Note: Feature comparison based on public vendor documentation as of {comparison.asOfDate}. Verify before publishing.
          </div>
        </section>

        {/* 3-STEP MIGRATION GUIDE */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>
            Switching from {comparison.competitorName} to Fathom
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {comparison.migrationGuide.map((step) => (
              <div key={step.step} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--cue)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', marginBottom: '12px' }}>
                  {step.step}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {comparison.faq.map((f, idx) => (
              <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{f.q}</div>
                <div style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <div style={{ textAlign: 'center', padding: '40px', background: 'var(--surface-sunk)', borderRadius: '12px', border: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>
            Experience the difference on your next call
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '15px', marginBottom: '20px' }}>
            Free forever for individuals. 14-day team trial with full CRM sync.
          </p>
          <Button size="lg" variant="primary" onClick={() => navigate('/onboarding')}>
            Try Fathom Free
          </Button>
        </div>
      </div>
    </SiteShell>
  );
};
