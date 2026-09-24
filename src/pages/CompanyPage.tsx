import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { COMPANY_ABOUT } from '../content/pages';
import { Button, Chip } from '../components/ui';

export const CompanyPage: React.FC = () => {
  const location = useLocation();
  const isBrandPage = location.pathname.includes('/brand');

  const downloadSvgLogo = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" width="200" height="40">
  <circle cx="16" cy="20" r="8" fill="#EB5E28" />
  <text x="36" y="26" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#0F2A33">FATHOM</text>
</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fathom_rebuild_logo.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <SiteShell
      currentSection="resources"
      breadcrumbs={[{ label: isBrandPage ? 'Brand & Press Kit' : 'About Us' }]}
    >
      <div style={{ maxWidth: '960px', margin: '48px auto', padding: '0 24px' }}>
        {/* Toggle between About and Brand */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
          <Link
            to="/about-us"
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              background: !isBrandPage ? 'var(--ink)' : 'var(--surface)',
              color: !isBrandPage ? '#ffffff' : 'var(--ink-2)',
              border: !isBrandPage ? '1px solid var(--ink)' : '1px solid var(--line)',
            }}
          >
            About Us & Values
          </Link>
          <Link
            to="/brand"
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              background: isBrandPage ? 'var(--ink)' : 'var(--surface)',
              color: isBrandPage ? '#ffffff' : 'var(--ink-2)',
              border: isBrandPage ? '1px solid var(--ink)' : '1px solid var(--line)',
            }}
          >
            Brand Assets & Press Kit
          </Link>
        </div>

        {isBrandPage ? (
          /* BRAND KIT VIEW */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <Chip variant="cue">Official Media Assets</Chip>
              <h1 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', margin: '12px auto 16px' }}>
                Fathom Brand Assets & Press Kit
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--ink-2)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
                Official vector logos, tally mark badges, color swatches, and typography guidelines.
              </p>
            </div>

            {/* Logo Download Card */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '36px', marginBottom: '40px', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '24px 48px', background: 'var(--canvas)', borderRadius: '12px', border: '1px solid var(--line)', marginBottom: '24px' }}>
                <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--live)' }} />
                <span style={{ fontWeight: 800, fontSize: '28px', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                  FATHOM <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-3)' }}>(rebuild)</span>
                </span>
              </div>
              <div>
                <Button variant="primary" onClick={downloadSvgLogo}>
                  Download Official SVG Logo Pack ⬇
                </Button>
              </div>
            </div>

            {/* Color Swatches Grid */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>
                Broadcast Design System Palette
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '80px', background: '#0F2A33' }} />
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px' }}>Ink (Primary)</div>
                    <code style={{ fontSize: '11px', color: 'var(--ink-3)' }}>#0F2A33</code>
                  </div>
                </div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '80px', background: '#EB5E28' }} />
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px' }}>Cue / Tally</div>
                    <code style={{ fontSize: '11px', color: 'var(--ink-3)' }}>#EB5E28</code>
                  </div>
                </div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '80px', background: '#2B8A3E' }} />
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px' }}>Ok (Verified)</div>
                    <code style={{ fontSize: '11px', color: 'var(--ink-3)' }}>#2B8A3E</code>
                  </div>
                </div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '80px', background: '#D90429' }} />
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 700, fontSize: '13px' }}>Live Recording</div>
                    <code style={{ fontSize: '11px', color: 'var(--ink-3)' }}>#D90429</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Specimen */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '36px', marginBottom: '64px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>
                Typography Pairing
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>UI & Display Font</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-ui)', margin: '8px 0' }}>Schibsted Grotesk</div>
                  <p style={{ fontSize: '13px', color: 'var(--ink-2)' }}>Clear, geometric, high-legibility sans-serif with tabular figures for timecode precision.</p>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Longform Reading Font</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-prose)', margin: '8px 0' }}>Literata Serif</div>
                  <p style={{ fontSize: '13px', color: 'var(--ink-2)' }}>Editorial serif tailored for prolonged reading comfort in summaries and transcripts.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ABOUT US VIEW */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <Chip variant="cue">Our Mission & Origins</Chip>
              <h1 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', margin: '12px auto 16px' }}>
                Truthful Conversational Intelligence
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--ink-2)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
                {COMPANY_ABOUT.mission}
              </p>
            </div>

            {/* Founding Story */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '36px', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '16px' }}>Founding Story (Sample)</h2>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.7, margin: 0, fontFamily: 'var(--font-prose)' }}>
                {COMPANY_ABOUT.foundingStory}
              </p>
            </div>

            {/* Real Values (Beat original lorem ipsum!) */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '20px' }}>Our Core Values</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {COMPANY_ABOUT.values.map((val, idx) => (
                  <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
                      {val.title}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership Team */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '20px' }}>Leadership & Engineering (Sample)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {COMPANY_ABOUT.leadership.map((person, idx) => (
                  <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--surface-sunk)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '18px', color: 'var(--ink)', marginBottom: '16px' }}>
                      {person.name.charAt(0)}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)' }}>{person.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--cue)', fontWeight: 600, marginBottom: '8px' }}>{person.role}</div>
                    <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.4, margin: 0 }}>{person.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
};
