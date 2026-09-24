import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppShell } from '../components/shell/AppShell';
import { Button, Chip, ReceiptChip } from '../components/ui';

interface TrackerRule {
  id: string;
  triggerSentence: string;
  category: 'Competitor' | 'Pricing' | 'Security';
  matchCount: number;
}

interface TrackerMatch {
  id: string;
  ruleId: string;
  meetingTitle: string;
  speaker: string;
  speakerInitial: string;
  timestamp: number;
  snippet: string;
  date: string;
}

export const TrackersPage: React.FC = () => {
  const [rules, setRules] = useState<TrackerRule[]>([
    { id: 'trk-1', triggerSentence: 'Alert me in Slack when someone mentions Fireflies or Gong in external calls', category: 'Competitor', matchCount: 3 },
    { id: 'trk-2', triggerSentence: 'Flag calls where prospect requests discounts over 15%', category: 'Pricing', matchCount: 1 },
    { id: 'trk-3', triggerSentence: 'Alert Infosec when customer asks about SOC2 or data residency', category: 'Security', matchCount: 2 },
  ]);

  const [matches] = useState<TrackerMatch[]>([
    {
      id: 'm-1',
      ruleId: 'trk-1',
      meetingTitle: 'Acme Corp — Architecture Review',
      speaker: 'Marcus Vance',
      speakerInitial: 'M',
      timestamp: 2190,
      snippet: 'Marcus: "Our legacy contract with Fireflies expires on November 15th, so we will need assistance migrating our call archive."',
      date: 'Sep 24, 2026',
    },
    {
      id: 'm-2',
      ruleId: 'trk-3',
      meetingTitle: 'Acme Corp — Architecture Review',
      speaker: 'Marcus Vance',
      speakerInitial: 'M',
      timestamp: 1840,
      snippet: 'Marcus: "Infosec needs the full SOC2 Type II packet before we can authorize the production pilot."',
      date: 'Sep 24, 2026',
    },
    {
      id: 'm-3',
      ruleId: 'trk-2',
      meetingTitle: 'Starlight Media — Q3 Executive Check-In',
      speaker: 'Sarah Jenkins',
      speakerInitial: 'S',
      timestamp: 620,
      snippet: 'Sarah: "If we commit to +45 seats across EMEA, can we retain our grandfathered 20% tier discount?"',
      date: 'Sep 18, 2026',
    },
  ]);

  const [newRuleSentence, setNewRuleSentence] = useState('');

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleSentence.trim()) return;
    setRules([
      ...rules,
      {
        id: `trk-${Date.now()}`,
        triggerSentence: newRuleSentence,
        category: 'Competitor',
        matchCount: 0,
      },
    ]);
    setNewRuleSentence('');
  };

  return (
    <AppShell currentTitle="Keyword Trackers">
      <div style={{ padding: '24px 32px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cue)', letterSpacing: '0.04em' }}>
              Conversational Monitoring
            </span>
            <Chip variant="default">Alerts Engine</Chip>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0 6px' }}>
            Sentence-Style Trackers & Mention Feeds
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', margin: 0 }}>
            Define keyword alerts in plain conversational English. Fathom scans meeting dialogue and surfaces instant alerts.
          </p>
        </div>

        {/* Sentence Rule Builder Form */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '12px' }}>
            Create New Tracker Rule
          </div>
          <form onSubmit={handleAddRule} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder='e.g. "Alert me when a prospect mentions Zoom AI or pricing pushback in client calls"'
              value={newRuleSentence}
              onChange={(e) => setNewRuleSentence(e.target.value)}
              style={{
                flex: 1,
                minWidth: '320px',
                padding: '10px 14px',
                borderRadius: '6px',
                border: '1px solid var(--line)',
                background: 'var(--canvas)',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <Button type="submit" variant="primary">
              Add Tracker Rule
            </Button>
          </form>
        </div>

        {/* Two Columns: Left = Active Rules, Right = Match Feed with Mini-Score Ticks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(360px, 1.4fr)', gap: '24px', alignItems: 'flex-start' }}>
          {/* Active Rules List */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '16px' }}>Active Tracker Rules ({rules.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {rules.map((rule) => (
                <div key={rule.id} style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <Chip variant="default">{rule.category}</Chip>
                    <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{rule.matchCount} matches</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>
                    "{rule.triggerSentence}"
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Match Feed with Mini-Score Ticks */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '16px' }}>Recent Tracker Matches ({matches.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {matches.map((m) => (
                <div key={m.id} style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--ink)' }}>{m.meetingTitle}</span>
                    <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>{m.date}</span>
                  </div>

                  {/* Mini-Score Timeline representation with tick mark */}
                  <div style={{ background: 'var(--line)', height: '6px', borderRadius: '3px', position: 'relative', marginBottom: '12px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: `${(m.timestamp / 3480) * 100}%`,
                        top: '-3px',
                        width: '4px',
                        height: '12px',
                        background: 'var(--live)',
                        borderRadius: '1px',
                      }}
                      title={`Match at ${m.timestamp}s`}
                    />
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--ink-2)', margin: '0 0 10px', lineHeight: 1.5, fontStyle: 'italic' }}>
                    {m.snippet}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ReceiptChip at={m.timestamp} speakerInitial={m.speakerInitial} />
                    <Link to={`/meetings/mtg-q3-roadmap?t=${m.timestamp}`}>
                      <Button size="sm" variant="ghost" style={{ fontSize: '12px', padding: '2px 8px' }}>
                        Listen Context →
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
