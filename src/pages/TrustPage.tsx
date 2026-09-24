import React, { useState } from 'react';
import { SiteShell } from '../components/shell/SiteShell';
import { TRUST_CENTER_DATA } from '../content/pages';
import { Chip, Button } from '../components/ui';

export const TrustPage: React.FC = () => {
  const [reportRequested, setReportRequested] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <SiteShell
      currentSection="resources"
      breadcrumbs={[{ label: 'Trust & Security Center' }]}
    >
      <div style={{ maxWidth: '960px', margin: '48px auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Chip variant="ok">Enterprise Security & Compliance</Chip>
          <h1 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', margin: '12px auto 16px' }}>
            Fathom Trust & Security Center
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', maxWidth: '640px', margin: '0 auto 20px', lineHeight: 1.5 }}>
            {TRUST_CENTER_DATA.overview}
          </p>

          <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', color: 'var(--ink-3)', display: 'inline-block' }}>
            ⚠️ {TRUST_CENTER_DATA.complianceDisclaimer}
          </div>
        </div>

        {/* Security Architectural Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {TRUST_CENTER_DATA.encryption.map((enc, idx) => (
            <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
                {enc.title}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
                {enc.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Third-Party Subprocessors Table */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>
            Approved Subprocessors
          </h2>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1.5fr', padding: '14px 20px', background: 'var(--surface-sunk)', borderBottom: '1px solid var(--line)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-3)' }}>
              <div>Subprocessor Entity</div>
              <div>Processing Purpose</div>
              <div>Data Location</div>
            </div>

            {TRUST_CENTER_DATA.subprocessors.map((sub, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 2fr 1.5fr',
                  padding: '14px 20px',
                  borderBottom: idx < TRUST_CENTER_DATA.subprocessors.length - 1 ? '1px solid var(--line)' : 'none',
                  fontSize: '13px',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{sub.name}</div>
                <div style={{ color: 'var(--ink-2)' }}>{sub.purpose}</div>
                <div style={{ color: 'var(--ink-3)' }}>{sub.location}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Request Compliance Report Form */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '36px', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
            Request SOC 2 Type II Security Packet (Sample)
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', marginBottom: '24px' }}>
            Enterprise security and infosec teams can request our sample compliance architecture review packet and DPA.
          </p>

          {reportRequested ? (
            <div style={{ background: '#E6FFFA', border: '1px solid #38B2AC', borderRadius: '8px', padding: '16px', color: '#234E52', fontSize: '14px', fontWeight: 600 }}>
              ✓ Thank you. Your sample SOC2 report request has been registered for {email}.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReportRequested(true);
              }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              <input
                type="email"
                required
                placeholder="Enter corporate security email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '260px',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--line)',
                  background: 'var(--canvas)',
                  fontSize: '14px',
                }}
              />
              <Button type="submit" variant="primary">
                Request Security Report (Sample)
              </Button>
            </form>
          )}
        </section>
      </div>
    </SiteShell>
  );
};
