import React, { useState } from 'react';
import { SiteShell } from '../components/shell/SiteShell';
import { SYSTEM_COMPONENTS, RECENT_INCIDENTS } from '../content/status';
import { Chip, Button } from '../components/ui';

export const StatusPage: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <SiteShell
      currentSection="resources"
      breadcrumbs={[{ label: 'System Status' }]}
    >
      <div style={{ maxWidth: '960px', margin: '48px auto', padding: '0 24px' }}>
        {/* Header with All Systems Operational Badge */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#E6FFFA', border: '1px solid #38B2AC', padding: '6px 14px', borderRadius: '20px', marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ok)' }} />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#234E52' }}>
              All Systems Fully Operational
            </span>
          </div>

          <h1 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            Fathom System Status
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--ink-2)', maxWidth: '560px', margin: '0 auto 16px', lineHeight: 1.5 }}>
            Real-time component health, 90-day uptime history, and incident maintenance tracking.
          </p>
          <div style={{ fontSize: '12px', color: 'var(--ink-3)', background: 'var(--surface-sunk)', padding: '4px 12px', borderRadius: '4px', display: 'inline-block' }}>
            Notice: All metrics and uptime figures shown below are illustrative Sample demonstration data.
          </div>
        </div>

        {/* 90-Day Uptime Components List */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px' }}>
            Core Infrastructure Components (90-Day History)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {SYSTEM_COMPONENTS.map((comp) => (
              <div key={comp.id} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>{comp.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{comp.uptime90Days}% uptime</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ok)' }}>Operational</span>
                  </div>
                </div>

                {/* 30-day mini bar graph */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, 1fr)', gap: '3px', height: '18px' }}>
                  {comp.recentStatus.map((st, barIdx) => (
                    <div
                      key={barIdx}
                      style={{
                        background: st === 'green' ? 'var(--ok)' : st === 'yellow' ? 'var(--cue)' : 'var(--live)',
                        borderRadius: '2px',
                        opacity: 0.85,
                      }}
                      title={`Day ${barIdx + 1}: ${st === 'green' ? '100% operational' : 'Minor degraded latency'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents Log */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px' }}>
            Incident History & Maintenance Log
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {RECENT_INCIDENTS.map((inc) => (
              <div key={inc.id} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Chip variant={inc.impact === 'Maintenance' ? 'default' : 'cue'}>{inc.impact}</Chip>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>{inc.title}</h3>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{inc.date}</span>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--ink-2)' }}>
                  {inc.timeline.map((item, tIdx) => (
                    <div key={tIdx} style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--ink)', minWidth: '70px' }}>{item.time}</span>
                      <span>{item.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe to Status Updates */}
        <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>Subscribe to Incident Updates</h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '14px', marginBottom: '16px' }}>
            Receive real-time notifications via email or webhook when incidents are opened or resolved.
          </p>

          {isSubscribed ? (
            <div style={{ color: 'var(--ok)', fontWeight: 700, fontSize: '14px' }}>
              ✓ Subscribed successfully for {email}. (Sample subscription)
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubscribed(true);
              }}
              style={{ display: 'flex', justifyContent: 'center', gap: '10px', maxWidth: '420px', margin: '0 auto' }}
            >
              <input
                type="email"
                required
                placeholder="Enter alert email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)', fontSize: '14px' }}
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </SiteShell>
  );
};
