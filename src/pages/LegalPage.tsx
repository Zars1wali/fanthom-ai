import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { LEGAL_TERMS, LEGAL_PRIVACY } from '../content/pages';
import { Button } from '../components/ui';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('/privacy');

  const legalDoc = isPrivacy ? LEGAL_PRIVACY : LEGAL_TERMS;
  const title = isPrivacy ? 'Privacy Policy & Data Rights' : 'Terms of Service';

  return (
    <SiteShell
      currentSection="resources"
      breadcrumbs={[{ label: title }]}
    >
      <div style={{ maxWidth: '1100px', margin: '48px auto', padding: '0 24px' }}>
        {/* Toggle between Terms and Privacy */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          <Link
            to="/terms"
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              background: !isPrivacy ? 'var(--ink)' : 'var(--surface)',
              color: !isPrivacy ? '#ffffff' : 'var(--ink-2)',
              border: !isPrivacy ? '1px solid var(--ink)' : '1px solid var(--line)',
            }}
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              background: isPrivacy ? 'var(--ink)' : 'var(--surface)',
              color: isPrivacy ? '#ffffff' : 'var(--ink-2)',
              border: isPrivacy ? '1px solid var(--ink)' : '1px solid var(--line)',
            }}
          >
            Privacy Policy
          </Link>
        </div>

        {/* Disclaimer Banner */}
        <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', padding: '12px 18px', borderRadius: '8px', marginBottom: '32px', fontSize: '13px', color: 'var(--ink-2)' }}>
          ⚠️ <strong>Notice:</strong> {legalDoc.disclaimer}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 260px', gap: '48px', alignItems: 'flex-start' }}>
          {/* Main Legal Content */}
          <article>
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 8px' }}>{title}</h1>
              <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>
                Last updated: {legalDoc.lastUpdated}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {legalDoc.sections.map((sec, idx) => (
                <section key={idx} id={`legal-sec-${idx}`}>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px' }}>
                    {sec.heading}
                  </h2>
                  <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.7, margin: 0, fontFamily: 'var(--font-prose)' }}>
                    {sec.content}
                  </p>
                </section>
              ))}
            </div>

            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
              <Button size="sm" variant="secondary" onClick={() => window.print()}>
                Print / Save Document 🖨️
              </Button>
            </div>
          </article>

          {/* Sticky Table of Contents */}
          <aside style={{ position: 'sticky', top: '80px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)', marginBottom: '12px' }}>
              Sections
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              {legalDoc.sections.map((sec, idx) => (
                <a
                  key={idx}
                  href={`#legal-sec-${idx}`}
                  style={{ color: 'var(--ink-2)', textDecoration: 'none', lineHeight: 1.4 }}
                >
                  {sec.heading}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
};
