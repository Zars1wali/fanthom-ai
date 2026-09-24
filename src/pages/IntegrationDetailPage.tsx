import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { INTEGRATIONS_LIST } from '../content/integrations';
import { Button, Chip } from '../components/ui';

export const IntegrationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const integration = INTEGRATIONS_LIST.find((item) => item.slug === slug) || INTEGRATIONS_LIST[0];

  return (
    <SiteShell
      currentSection="integrations"
      breadcrumbs={[{ label: 'Integrations', path: '/integrations' }, { label: integration.name }]}
    >
      <div style={{ maxWidth: '1080px', margin: '48px auto', padding: '0 24px' }}>
        {/* Header Hero */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '12px',
                background: integration.monogramBg,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '24px',
                letterSpacing: '-0.02em',
                flexShrink: 0,
              }}
            >
              {integration.monogram}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>{integration.name} Integration</h1>
                <Chip variant="default">{integration.category}</Chip>
              </div>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', margin: 0 }}>
                {integration.tagline}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="primary" size="md" onClick={() => navigate('/onboarding')}>
              Connect in Fathom →
            </Button>
            <Link to="/integrations">
              <Button variant="secondary" size="md">
                Browse All Apps
              </Button>
            </Link>
          </div>
        </div>

        {/* Plan Availability Callout */}
        <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px 20px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Plan Availability:</span>{' '}
            <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>Included on {integration.planRequirement} and above</strong>
          </div>
          <Link to="/pricing" style={{ fontSize: '13px', color: 'var(--cue)', fontWeight: 700, textDecoration: 'none' }}>
            Compare Plans & Limits →
          </Link>
        </div>

        {/* Overview & Key Capabilities */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px' }}>
            How Fathom works with {integration.name}
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: '24px' }}>
            {integration.overview}
          </p>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '16px' }}>Key Capabilities</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {integration.keyFeatures.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--ink-2)' }}>
                  <span style={{ color: 'var(--ok)', fontWeight: 800 }}>✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3-Step Setup Instructions with UI Screens */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>
            Three-Step Setup Guide
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {integration.setupSteps.map((step) => (
              <div key={step.step} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--cue)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '14px',
                    marginBottom: '16px',
                  }}
                >
                  {step.step}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Webhook / CRM Event Payload */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>Sample Data Payload</h2>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', margin: '4px 0 0' }}>
                Inspect the structured JSON emitted when Fathom syncs to {integration.name}.
              </p>
            </div>
            <Link to="/developers/webhooks">
              <Button size="sm" variant="secondary">
                Webhook Docs →
              </Button>
            </Link>
          </div>

          <pre
            style={{
              background: '#1A202C',
              color: '#68D391',
              padding: '20px',
              borderRadius: '10px',
              fontSize: '13px',
              lineHeight: 1.5,
              overflowX: 'auto',
              fontFamily: 'monospace',
              margin: 0,
            }}
          >
            {JSON.stringify(integration.samplePayload, null, 2)}
          </pre>
        </section>

        {/* Required Permissions */}
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>
            Required OAuth Permissions
          </h2>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {integration.permissions.map((perm, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--ink-2)' }}>
                  <span style={{ color: 'var(--ink-3)' }}>🔒</span>
                  <span>{perm}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Integration FAQ */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {integration.faq.map((f, idx) => (
              <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{f.q}</div>
                <div style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <div style={{ textAlign: 'center', padding: '40px', background: 'var(--surface-sunk)', borderRadius: '12px', border: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
            Connect {integration.name} to Fathom in seconds
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '15px', marginBottom: '20px' }}>
            Available immediately on your Fathom workspace.
          </p>
          <Button size="lg" variant="primary" onClick={() => navigate('/onboarding')}>
            Get Started Free
          </Button>
        </div>
      </div>
    </SiteShell>
  );
};
