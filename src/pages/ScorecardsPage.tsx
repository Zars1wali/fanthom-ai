import React from 'react';
import { Link } from 'react-router-dom';
import { AppShell } from '../components/shell/AppShell';
import { Button, Chip, ReceiptChip } from '../components/ui';

interface ScorecardCriterion {
  id: string;
  name: string;
  score: 'Pass' | 'Needs Work' | 'Incomplete';
  points: number;
  maxPoints: number;
  evidence: string;
  receiptTime: number;
  speaker: string;
  feedback: string;
}

export const ScorecardsPage: React.FC = () => {
  const selectedCall = 'Acme Corp — Architecture Review';

  const criteria: ScorecardCriterion[] = [
    {
      id: 'meddic-m',
      name: 'Metrics (Quantifiable Business Target)',
      score: 'Pass',
      points: 20,
      maxPoints: 20,
      evidence: 'Prospect stated goal of reducing ticket resolution latency from 4.2h to under 45m.',
      receiptTime: 420,
      speaker: 'P',
      feedback: 'Excellent discovery question by rep establishing quantifiable business impact.',
    },
    {
      id: 'meddic-e',
      name: 'Economic Buyer Verified',
      score: 'Pass',
      points: 20,
      maxPoints: 20,
      evidence: 'Marcus confirmed final budget authority ($65,000 allocated for Q4).',
      receiptTime: 780,
      speaker: 'M',
      feedback: 'Confirmed economic buyer in attendance with explicit procurement discretion.',
    },
    {
      id: 'meddic-d1',
      name: 'Decision Criteria Defined',
      score: 'Pass',
      points: 20,
      maxPoints: 20,
      evidence: 'Identified requirement for sub-50ms diarization and SOC2 Type II.',
      receiptTime: 1140,
      speaker: 'P',
      feedback: 'Technical requirements documented and aligned with engineering specs.',
    },
    {
      id: 'meddic-p',
      name: 'Identified Pain Explored',
      score: 'Pass',
      points: 20,
      maxPoints: 20,
      evidence: 'Reps losing 6.5 hours weekly to manual CRM hygiene.',
      receiptTime: 1420,
      speaker: 'M',
      feedback: 'Pain quantified in terms of lost selling hours.',
    },
    {
      id: 'meddic-c',
      name: 'Next Steps & Mutual Action Plan',
      score: 'Needs Work',
      points: 12,
      maxPoints: 20,
      evidence: 'Agreed on sending SOC2 packet by Thursday, but no exact calendar invite set for next review.',
      receiptTime: 2680,
      speaker: 'A',
      feedback: 'Recommend locking down calendar invite during call rather than async via email.',
    },
  ];

  const totalScore = criteria.reduce((sum, c) => sum + c.points, 0);

  return (
    <AppShell currentTitle="Rep Scorecards">
      <div style={{ padding: '24px 32px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cue)', letterSpacing: '0.04em' }}>
                Objective Methodology Evaluation
              </span>
              <Chip variant="ok">MEDDIC Framework</Chip>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0 0' }}>
              Sales Call Scorecard & Spoken Proof
            </h1>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Overall Score</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ok)' }}>{totalScore} / 100</div>
            </div>
            <Link to="/meetings/mtg-q3-roadmap">
              <Button size="sm" variant="secondary">View Call Recording →</Button>
            </Link>
          </div>
        </div>

        {/* Selected Call Information */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: 600 }}>Evaluated Call:</span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)' }}>{selectedCall}</div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
              Rep: <strong>Alex Morgan</strong> · Reviewer: <strong>Automated AI + Sales Ops</strong>
            </div>
          </div>
        </div>

        {/* Criteria Evaluation Table with Spoken Receipts */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1fr 2fr', padding: '12px 20px', background: 'var(--surface-sunk)', borderBottom: '1px solid var(--line)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-3)' }}>
            <div>Criterion</div>
            <div>Status</div>
            <div>Spoken Evidence (Receipt)</div>
            <div>Points</div>
            <div>Coaching Note</div>
          </div>

          {criteria.map((c, idx) => (
            <div
              key={c.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 2fr 1fr 2fr',
                padding: '16px 20px',
                borderBottom: idx < criteria.length - 1 ? '1px solid var(--line)' : 'none',
                alignItems: 'center',
                fontSize: '13px',
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{c.name}</div>
              <div>
                <Chip variant={c.score === 'Pass' ? 'ok' : 'cue'}>{c.score}</Chip>
              </div>
              <div style={{ color: 'var(--ink-2)' }}>
                {c.evidence} <ReceiptChip at={c.receiptTime} speakerInitial={c.speaker} />
              </div>
              <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{c.points} / {c.maxPoints}</div>
              <div style={{ color: 'var(--ink-3)', fontSize: '12px' }}>{c.feedback}</div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};
