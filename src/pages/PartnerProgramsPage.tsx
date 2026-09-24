import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { PARTNER_PROGRAMS } from '../content/programs';
import { Button, Chip } from '../components/ui';

export const PartnerProgramsPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const activeProgram = slug ? PARTNER_PROGRAMS.find((p) => p.slug === slug) : null;

  return (
    <SiteShell
      currentSection="resources"
      breadcrumbs={[{ label: 'Partner Programs', path: '/partner-programs' }, ...(activeProgram ? [{ label: activeProgram.name }] : [])]}
    >
      <div style={{ maxWidth: '1080px', margin: '48px auto', padding: '0 24px' }}>
        {activeProgram ? (
          /* PROGRAM DETAIL VIEW */
          <div>
            <div style={{ maxWidth: '840px', marginBottom: '40px' }}>
              <Chip variant="cue">{activeProgram.badge}</Chip>
              <h1 style={{ fontSize: '38px', fontWeight: 800, margin: '12px 0 16px' }}>{activeProgram.name}</h1>
              <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: 1.5 }}>{activeProgram.overview}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '48px' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px', padding: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Partner Benefits</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeProgram.benefits.map((b, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: 'var(--ink-2)' }}>
                      <span style={{ color: 'var(--ok)', fontWeight: 800 }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px', padding: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Program Requirements</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeProgram.requirements.map((r, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: 'var(--ink-2)' }}>
                      <span style={{ color: 'var(--ink-3)' }}>•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button size="lg" variant="primary" onClick={() => navigate(activeProgram.applyRoute)}>
                {activeProgram.ctaLabel} →
              </Button>
              <Link to="/partner-programs">
                <Button size="lg" variant="ghost">← Back to All Programs</Button>
              </Link>
            </div>
          </div>
        ) : (
          /* PARTNER PROGRAMS DIRECTORY */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <Chip variant="cue">Ecosystem Partnerships</Chip>
              <h1 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', margin: '12px auto 16px' }}>
                Partner with Fathom
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--ink-2)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
                Whether you advise clients on sales strategy, build SaaS integrations, or invest in fast-growing startups, we provide tailored partnership programs.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '64px' }}>
              {PARTNER_PROGRAMS.map((prog) => (
                <div
                  key={prog.slug}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '16px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <Chip variant="default">{prog.badge}</Chip>
                  </div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 10px', color: 'var(--ink)' }}>
                    {prog.name}
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5, margin: '0 0 20px', flex: 1 }}>
                    {prog.tagline}
                  </p>
                  <Link to={`/program/${prog.slug}`}>
                    <Button variant="secondary" size="md" style={{ width: '100%' }}>
                      Explore Program & Benefits →
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
};
