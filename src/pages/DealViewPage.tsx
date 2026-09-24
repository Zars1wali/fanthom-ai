import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppShell } from '../components/shell/AppShell';
import { Button, Chip, ReceiptChip } from '../components/ui';

export const DealViewPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'timeline' | 'summary' | 'ask'>('summary');
  const [dealQuestion, setDealQuestion] = useState('');
  const [dealAnswer, setDealAnswer] = useState<string | null>(null);

  const handleAskDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealQuestion.trim()) return;
    setDealAnswer(
      `Based on the last 3 calls with Acme Corp: The primary security concern was subprocessor data residency. Marcus approved the $65,000 budget allocation pending infosec packet delivery.`
    );
  };

  return (
    <AppShell currentTitle="Deal Intelligence">
      <div style={{ padding: '24px 32px', maxWidth: '1440px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
        {/* Deal Header */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cue)', letterSpacing: '0.04em' }}>
                  Enterprise Opportunity (Stage 4 — Proposal Scoping)
                </span>
                <Chip variant="ok">Healthy Deal Sentiment</Chip>
              </div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px' }}>
                Acme Cloud Services — Global RevOps & Architecture
              </h1>
              <div style={{ fontSize: '13px', color: 'var(--ink-2)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span>Deal Value: <strong>$65,000 / year</strong></span>
                <span>•</span>
                <span>Target Close: <strong>Oct 15, 2026</strong></span>
                <span>•</span>
                <span>Owner: <strong>Alex Morgan</strong></span>
                <span>•</span>
                <span>Synced to Salesforce Opportunity ID: <code>0065e000002XYZ1</code></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="sm" variant="secondary" onClick={() => navigate('/meetings/mtg-q3-roadmap')}>
                Open Latest Meeting →
              </Button>
            </div>
          </div>

          {/* Key Stakeholders Chips */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Key People:</span>
            <Chip variant="default">Marcus Vance (VP Eng — Economic Buyer)</Chip>
            <Chip variant="default">Sarah Jenkins (Infosec Lead — Gatekeeper)</Chip>
            <Chip variant="default">Priya Sharma (Internal Champion)</Chip>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--line)', marginBottom: '24px' }}>
          {(['summary', 'timeline', 'ask'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 16px',
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                color: activeTab === tab ? 'var(--ink)' : 'var(--ink-2)',
                borderBottom: activeTab === tab ? '2px solid var(--ink)' : '2px solid transparent',
              }}
            >
              {tab === 'summary' ? 'AI Deal Summary & Risks' : tab === 'timeline' ? 'Chronological Calls (3)' : 'Ask Deal AI'}
            </button>
          ))}
        </div>

        {/* TAB 1: DEAL SUMMARY & RISKS */}
        {activeTab === 'summary' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {/* Deal Overview Card */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '12px' }}>
                Qualification & Executive Signals
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: 1.5 }}>
                <li>
                  • <strong>Budget Confirmed:</strong> $65k allocation approved by Marcus{' '}
                  <ReceiptChip at={780} speakerInitial="M" />
                </li>
                <li>
                  • <strong>Primary Pain Point:</strong> Reps wasting 6.5 hours weekly on manual CRM hygiene{' '}
                  <ReceiptChip at={1420} speakerInitial="M" />
                </li>
                <li>
                  • <strong>Technical Benchmark:</strong> Sub-50ms diarization and Salesforce bi-directional sync{' '}
                  <ReceiptChip at={1140} speakerInitial="P" />
                </li>
              </ul>
            </div>

            {/* Identified Risks & Competitors */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cue)', marginBottom: '12px' }}>
                Deal Risks & Blockers
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: 1.5 }}>
                <li>
                  ⚠️ <strong>Security Gatekeeper:</strong> Sarah requires full SOC2 Type II packet before pilot{' '}
                  <ReceiptChip at={1840} speakerInitial="M" />
                </li>
                <li>
                  ⚠️ <strong>Incumbent Vendor:</strong> Legacy Fireflies agreement active until Nov 15th{' '}
                  <ReceiptChip at={2190} speakerInitial="M" />
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ok)', marginBottom: '12px' }}>
                Next Steps & Commitments
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', lineHeight: 1.5 }}>
                <li>
                  ✓ Send SOC2 compliance packet and DPA by Thursday (Assigned: Alex){' '}
                  <ReceiptChip at={2680} speakerInitial="A" />
                </li>
                <li>
                  ✓ Schedule security deep dive for Oct 4th at 2pm EST{' '}
                  <ReceiptChip at={3100} speakerInitial="P" />
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: CHRONOLOGICAL CALLS */}
        {activeTab === 'timeline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { id: 'mtg-q3-roadmap', title: 'Call #3: Architecture & Security Review', date: 'Sep 24, 2026', duration: '58 min', attendees: 'Marcus, Priya, Alex' },
              { id: 'mtg-acme-demo', title: 'Call #2: Product Demo & CRM Field Mapping', date: 'Sep 17, 2026', duration: '42 min', attendees: 'Marcus, Elena, Alex' },
              { id: 'mtg-acme-discovery', title: 'Call #1: Initial Qualification & Discovery', date: 'Sep 10, 2026', duration: '31 min', attendees: 'Marcus, Alex' },
            ].map((call, idx) => (
              <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px' }}>{call.title}</h3>
                  <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{call.date} · {call.duration} · Attendees: {call.attendees}</div>
                </div>
                <Link to="/meetings/mtg-q3-roadmap">
                  <Button size="sm" variant="secondary">Open Meeting & Score →</Button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: ASK DEAL AI */}
        {activeTab === 'ask' && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '32px', maxWidth: '780px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>Ask AI Across All Calls for Acme Corp</h2>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', marginBottom: '20px' }}>
              Query all historical calls associated with this opportunity.
            </p>

            <form onSubmit={handleAskDeal} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Ask about budget, objections, or timelines..."
                value={dealQuestion}
                onChange={(e) => setDealQuestion(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)' }}
              />
              <Button type="submit" variant="primary">Ask Deal AI</Button>
            </form>

            {dealAnswer && (
              <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '8px', padding: '20px' }}>
                <div style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--ink)' }}>
                  {dealAnswer}
                </div>
                <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--ink-3)' }}>
                  Cites: Call #3 (12:41 P) and Call #2 (08:14 M)
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
};
