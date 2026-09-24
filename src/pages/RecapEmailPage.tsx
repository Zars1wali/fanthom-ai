import React from 'react';
import { Link } from 'react-router-dom';
import { showpieceMeeting } from '../data/seed/showpiece';
import { ReceiptChip } from '../components/ui';

export const RecapEmailPage: React.FC = () => {
  const m = showpieceMeeting;

  return (
    <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 16px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>Previewing Post-Meeting Recap Email (/dev/recap-email)</span>
        <Link to={`/meetings/${m.id}`} className="btn btn-secondary btn-sm">
          Open Meeting in App
        </Link>
      </div>

      <div
        style={{
          background: '#ffffff',
          border: '1px solid var(--line)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-float)',
          overflow: 'hidden',
          fontFamily: 'var(--font-ui)',
        }}
      >
        {/* Email Header */}
        <div style={{ background: 'var(--surface-sunk)', padding: '24px 32px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--live)' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', letterSpacing: '0.04em' }}>
              FATHOM RECAP
            </span>
          </div>
          <h1 tabIndex={-1} style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginBottom: '6px' }}>
            {m.title}
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>
            October 14, 2026 · 58 mins · 8 attendees
          </div>
        </div>

        {/* Email Body */}
        <div style={{ padding: '32px' }}>
          {/* Quick Catch-up */}
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-3)', marginBottom: '12px' }}>
              60-Second Catch-up
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {m.summary?.catchUp.map((b) => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: 'var(--cue)', fontWeight: 700 }}>•</span>
                  <p style={{ fontSize: '15px', color: 'var(--ink)', lineHeight: 1.5, margin: 0 }}>
                    {b.text}
                    {b.receipts.map((r, i) => (
                      <ReceiptChip key={i} at={r.at} />
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div style={{ marginBottom: '28px', background: 'var(--surface)', padding: '20px', borderRadius: '8px', border: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-3)', marginBottom: '12px' }}>
              Action Items ({m.actions.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {m.actions.map((act) => (
                <div key={act.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" checked={act.done} readOnly style={{ accentColor: 'var(--cue)' }} />
                    <span style={{ fontSize: '14px', color: 'var(--ink)', textDecoration: act.done ? 'line-through' : 'none' }}>
                      {act.text}
                    </span>
                  </div>
                  {act.receipts[0] && <ReceiptChip at={act.receipts[0].at} />}
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div style={{ textAlign: 'center', paddingTop: '16px' }}>
            <Link
              to={`/meetings/${m.id}`}
              style={{
                display: 'inline-block',
                background: 'var(--cue)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Open Full Interactive Score & Transcript →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 32px', background: 'var(--surface-sunk)', borderTop: '1px solid var(--line)', textAlign: 'center', fontSize: '12px', color: 'var(--ink-3)' }}>
          Sent automatically by Fathom (rebuild) · Every note links to the moment it came from.
        </div>
      </div>
    </div>
  );
};
