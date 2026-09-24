import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { ROLE_SOLUTIONS } from '../content/roles';
import { Button, Chip, ReceiptChip } from '../components/ui';

export const RoleSolutionPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();

  const currentRoleKey = role && ROLE_SOLUTIONS[role] ? role : 'sales';
  const roleData = ROLE_SOLUTIONS[currentRoleKey];

  return (
    <SiteShell
      currentSection="solutions"
      breadcrumbs={[{ label: 'Solutions', path: '/solutions/sales' }, { label: roleData.roleName }]}
    >
      <div style={{ maxWidth: '1160px', margin: '48px auto', padding: '0 24px' }}>
        {/* Role Switcher Pill Bar */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '32px', borderBottom: '1px solid var(--line)' }}>
          {Object.keys(ROLE_SOLUTIONS).map((slug) => {
            const r = ROLE_SOLUTIONS[slug];
            const isActive = slug === currentRoleKey;
            return (
              <Link
                key={slug}
                to={`/solutions/${slug}`}
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
                {r.roleName}
              </Link>
            );
          })}
        </div>

        {/* Hero Section */}
        <div style={{ maxWidth: '860px', marginBottom: '56px' }}>
          <Chip variant="cue">{roleData.roleName}</Chip>
          <h1 style={{ fontSize: '46px', fontWeight: 800, letterSpacing: '-0.03em', margin: '16px 0 16px', lineHeight: 1.15 }}>
            {roleData.headline}
          </h1>
          <p style={{ fontSize: '19px', color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: '32px' }}>
            {roleData.subheadline}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button size="lg" variant="primary" onClick={() => navigate('/onboarding')}>
              Start Free for {roleData.roleName} →
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/meetings/mtg-q3-roadmap')}>
              Explore Showpiece Meeting
            </Button>
          </div>
        </div>

        {/* METRICS ROW (Labeled Sample) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          {roleData.metrics.map((m, idx) => (
            <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--cue)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ink-3)', lineHeight: 1.4 }}>
                {m.detail}
              </div>
            </div>
          ))}
        </div>

        {/* LIVE SHOWPIECE TEMPLATE PREVIEW WITH RECEIPTS */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', marginBottom: '56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-3)' }}>
                Dedicated Summary Template
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px' }}>
                {roleData.templateName}
              </h2>
            </div>
            <Link to="/meetings/mtg-q3-roadmap">
              <Button size="sm" variant="secondary">
                View Full Live Playhead →
              </Button>
            </Link>
          </div>

          <div style={{ background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: '10px', padding: '24px' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px' }}>
              Call Fixture: {roleData.sampleSummary.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {roleData.sampleSummary.sections.map((sec, sIdx) => (
                <div key={sIdx}>
                  <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--cue)', marginBottom: '10px' }}>
                    {sec.heading}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sec.items.map((item, iIdx) => (
                      <li key={iIdx} style={{ fontSize: '14px', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: 'var(--ink-3)' }}>•</span>
                        <span>
                          {item.text}{' '}
                          <ReceiptChip at={item.timecode} speakerInitial={item.speaker} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 SAVED PROMPTS & KEY INTEGRATION GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '56px' }}>
          {/* Saved Prompts */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)' }}>
              Ask AI Presets
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '8px 0 16px' }}>
              3 Saved Prompts for {roleData.roleName}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', marginBottom: '20px' }}>
              Click any prompt to instantly query across your team meeting history with cited receipts.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {roleData.savedPrompts.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => navigate('/meetings/mtg-q3-roadmap?tab=ask')}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    background: 'var(--surface-sunk)',
                    fontSize: '13px',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>"{prompt}"</span>
                  <span style={{ color: 'var(--cue)', fontWeight: 800, marginLeft: '8px' }}>→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Key Integration & Sample Payload */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)' }}>
              Automated Sync
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '8px 0 8px' }}>
              {roleData.keyIntegration.name}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', marginBottom: '16px' }}>
              {roleData.keyIntegration.benefit}
            </p>

            <pre
              style={{
                background: '#1A202C',
                color: '#68D391',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '12px',
                lineHeight: 1.4,
                overflowX: 'auto',
                fontFamily: 'monospace',
                margin: 0,
              }}
            >
              {JSON.stringify(roleData.keyIntegration.samplePayload, null, 2)}
            </pre>
          </div>
        </div>

        {/* CTA Footer */}
        <div style={{ textAlign: 'center', padding: '40px', background: 'var(--surface-sunk)', borderRadius: '12px', border: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>
            Transform your {roleData.roleName} workflow today
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '15px', marginBottom: '20px' }}>
            No credit card required. Connect in 30 seconds.
          </p>
          <Button size="lg" variant="primary" onClick={() => navigate('/onboarding')}>
            Get Started Free
          </Button>
        </div>
      </div>
    </SiteShell>
  );
};
