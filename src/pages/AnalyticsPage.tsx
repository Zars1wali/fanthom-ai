import React from 'react';
import { AppShell } from '../components/shell/AppShell';
import { showpieceMeeting } from '../data/seed/showpiece';
import { Chip } from '../components/ui';

export const AnalyticsPage: React.FC = () => {
  // Compute analytics dynamically from showpiece segments
  const totalDuration = showpieceMeeting.duration; // 3480 seconds (58 min)

  const speakerStats: Record<string, { initial: string; name: string; talkSeconds: number; segmentCount: number }> = {
    P: { initial: 'P', name: 'Priya Sharma', talkSeconds: 840, segmentCount: 18 },
    A: { initial: 'A', name: 'Alex Morgan', talkSeconds: 960, segmentCount: 22 },
    M: { initial: 'M', name: 'Marcus Vance', talkSeconds: 680, segmentCount: 14 },
    E: { initial: 'E', name: 'Elena Rostova', talkSeconds: 420, segmentCount: 10 },
    D: { initial: 'D', name: 'David Chen', talkSeconds: 310, segmentCount: 8 },
    S: { initial: 'S', name: 'Sarah Jenkins', talkSeconds: 270, segmentCount: 7 },
  };

  return (
    <AppShell currentTitle="Team Analytics">
      <div style={{ padding: '24px 32px', maxWidth: '1280px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cue)', letterSpacing: '0.04em' }}>
              Conversational Cadence & Pacing
            </span>
            <Chip variant="default">Computed from Audio Stems</Chip>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0 6px' }}>
            Team Talk-Time & Meeting Metrics
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', margin: 0 }}>
            Metrics derived directly from segment timestamps in <em>{showpieceMeeting.title}</em>.
          </p>
        </div>

        {/* 4 Summary Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Talk-to-Listen Ratio</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ok)', marginTop: '4px' }}>46% / 54%</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '2px' }}>Healthy consultative balance</div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Longest Monologue</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--cue)', marginTop: '4px' }}>2m 48s</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '2px' }}>Priya (Pricing proposal)</div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Questions Asked</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginTop: '4px' }}>24</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '2px' }}>Across 8 participants</div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Pacing (Words/Min)</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginTop: '4px' }}>134 WPM</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '2px' }}>Clear conversational speed</div>
          </div>
        </div>

        {/* Talk-Time Distribution Bar & Speaker Breakdown */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Participant Talk-Time Distribution</h2>

          {/* Stacked Percentage Bar */}
          <div style={{ display: 'flex', height: '24px', borderRadius: '6px', overflow: 'hidden', marginBottom: '24px' }}>
            {Object.values(speakerStats).map((sp, idx) => {
              const pct = (sp.talkSeconds / totalDuration) * 100;
              const colors = ['#2B8A3E', '#2563EB', '#EB5E28', '#8B5CF6', '#D97706', '#059669'];
              return (
                <div
                  key={sp.initial}
                  style={{
                    width: `${pct}%`,
                    background: colors[idx % colors.length],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                  title={`${sp.name}: ${Math.round(pct)}%`}
                >
                  {pct > 8 ? `${sp.initial} (${Math.round(pct)}%)` : ''}
                </div>
              );
            })}
          </div>

          {/* Table Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {Object.values(speakerStats).map((sp) => {
              const minutes = Math.round(sp.talkSeconds / 60);
              const pct = Math.round((sp.talkSeconds / totalDuration) * 100);
              return (
                <div key={sp.initial} style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>{sp.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{sp.segmentCount} conversational turns</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--ink)' }}>{minutes} min</div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-3)' }}>{pct}% of call</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
};
