import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { Button, Chip, ReceiptChip, formatTimecode } from '../components/ui';
import { showpieceMeeting } from '../data/seed/showpiece';
import { Score } from '../components/meeting/Score';

export const StoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeLifecycleStage, setActiveLifecycleStage] = useState<'before' | 'during' | 'after' | 'later'>('before');
  const [seekTime, setSeekTime] = useState(420);

  const stages = [
    { id: 'before', label: '1. Before the Call', summary: 'Zero-friction scheduling, calendar sync, and meeting prep' },
    { id: 'during', label: '2. During the Call', summary: 'Bot-free capture, live scratchpad, and 1-tap highlight hotkeys' },
    { id: 'after', label: '3. After the Call', summary: '60-second executive recaps with clickable timecode receipts' },
    { id: 'later', label: '4. Later (Knowledge & CRM)', summary: 'Cross-meeting Ask AI, deal timelines, and automatic CRM field sync' },
  ];

  return (
    <SiteShell currentSection="product" breadcrumbs={[{ label: 'Product Story & Lifecycle' }]}>
      <div style={{ maxWidth: '1160px', margin: '48px auto', padding: '0 24px' }}>
        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <Chip variant="cue">The Complete Conversation Lifecycle</Chip>
          <h1 style={{ fontSize: '46px', fontWeight: 800, letterSpacing: '-0.03em', margin: '16px auto 16px', maxWidth: '840px', lineHeight: 1.15 }}>
            From pre-call preparation to enterprise CRM sync: how Fathom works
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', maxWidth: '720px', margin: '0 auto 32px', lineHeight: 1.5 }}>
            Most meeting tools treat calls as disconnected audio recordings. Fathom treats conversations as living knowledge that flows seamlessly through every stage of your workday.
          </p>

          {/* Interactive Lifecycle Navigation Tabs */}
          <div
            style={{
              display: 'inline-flex',
              background: 'var(--surface-sunk)',
              padding: '6px',
              borderRadius: '10px',
              border: '1px solid var(--line)',
              gap: '6px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {stages.map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveLifecycleStage(st.id as any)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: activeLifecycleStage === st.id ? 'var(--surface)' : 'transparent',
                  color: activeLifecycleStage === st.id ? 'var(--ink)' : 'var(--ink-2)',
                  boxShadow: activeLifecycleStage === st.id ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* STAGE 1: BEFORE */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--cue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Phase 01: Setup & Pre-Call Alignment
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 16px', letterSpacing: '-0.02em' }}>
              Set your recording rules once. Never worry about it again.
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '16px', lineHeight: 1.6, marginBottom: '20px' }}>
              Fathom connects with your Google Calendar or Microsoft Outlook in 30 seconds. Using natural language rules, you specify exactly when Fathom records — for instance, only recording external customer calls with clients while automatically skipping personal appointments and confidential HR 1:1s.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--ink-2)', paddingLeft: '20px' }}>
              <li>Automatic calendar scanning with smart attendee domain classification</li>
              <li>Choice between Bot-Free local desktop capture or automated cloud bot join</li>
              <li>Pre-call prep: Fathom surfaces past meeting summaries with attendees before you join</li>
            </ul>
          </div>

          {/* Interactive UI Simulation: Rule Builder Card */}
          <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Natural Language Recording Rule
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
                "Record only external calls with &gt; 1 outside attendee, exclude personal invites, and use Sales Discovery template."
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Chip variant="ok">Rule Active</Chip>
                <Chip variant="default">Google Calendar Sync</Chip>
                <Chip variant="cue">Bot-Free Mode</Chip>
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
              ✓ Next scheduled call: <strong>Acme Corp Architecture Review</strong> (Auto-record enabled)
            </div>
          </div>
        </section>

        {/* STAGE 2: DURING */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--live)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Phase 02: In-Call Presence & Focus
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 16px', letterSpacing: '-0.02em' }}>
              Stay 100% present. Bookmark key moments with hotkey 'H'.
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '16px', lineHeight: 1.6, marginBottom: '20px' }}>
              Stop frantically taking messy notes while clients speak. Make direct eye contact and ask better consultative questions. When a pivotal commitment or pricing objection arises, press <strong>H</strong> to mark a highlight. Fathoms live scratchpad auto-stamps your manual notes to the exact spoken second.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/live">
                <Button variant="secondary" size="md">Test Live Simulation →</Button>
              </Link>
            </div>
          </div>

          {/* Live Scratchpad Simulation Card */}
          <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--live)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--live)' }} />
                LIVE CALL IN PROGRESS (00:14:28)
              </span>
              <span style={{ fontSize: '11px', color: 'var(--ink-3)', fontWeight: 600 }}>Press 'H' to bookmark</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-ui)', fontSize: '13px' }}>
              <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--ink-3)', marginRight: '8px' }}>14:10</span>
                <strong>Priya:</strong> "We can launch the usage-based tier at $19 per seat with 200 included queries."
              </div>
              <div style={{ background: 'rgba(235, 94, 40, 0.08)', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--cue)' }}>
                <span style={{ color: 'var(--cue)', fontWeight: 700, marginRight: '8px' }}>14:21 [FLAG]</span>
                <strong>Scratchpad bookmark:</strong> Pricing threshold approved by Marcus.
              </div>
            </div>
          </div>
        </section>

        {/* STAGE 3: AFTER */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '40px',
          }}
        >
          <div style={{ maxWidth: '800px', marginBottom: '32px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ok)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Phase 03: Post-Call Clarity & Verification
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 16px', letterSpacing: '-0.02em' }}>
              The Score & Clickable Receipts: Truth you can verify
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '16px', lineHeight: 1.6 }}>
              Within 60 seconds of hanging up, your recap arrives in your inbox. Click any bullet to hear the exact moment on The Score. Snapping seek allows you to scrub across 8 speaker lanes with sub-50ms accuracy.
            </p>
          </div>

          {/* Embedded Real Score Component */}
          <div style={{ background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>
                {showpieceMeeting.title} · (Scrubbed to {formatTimecode(seekTime)})
              </span>
              <Link to="/meetings/mtg-q3-roadmap">
                <Button size="sm" variant="secondary">Open Full Flagship Meeting →</Button>
              </Link>
            </div>
            <Score
              meeting={showpieceMeeting}
              currentTime={seekTime}
              duration={showpieceMeeting.duration}
              onSeek={(t) => setSeekTime(t)}
            />
          </div>

          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--surface-sunk)', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>Bulletproof Evidence</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-2)' }}>
                • Launch usage-based tier at $19/seat <ReceiptChip at={420} speakerInitial="P" />
              </div>
            </div>
            <div style={{ background: 'var(--surface-sunk)', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>Assigned Accountability</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-2)' }}>
                • Send SOC2 packet by Thursday <ReceiptChip at={2680} speakerInitial="A" />
              </div>
            </div>
            <div style={{ background: 'var(--surface-sunk)', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>Zero-Login Public Sharing</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-2)' }}>
                Share trimmed clips that open instantly without forcing client account sign-ups.
              </div>
            </div>
          </div>
        </section>

        {/* STAGE 4: LATER */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--cue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Phase 04: Institutional Knowledge & CRM Automation
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, margin: '8px 0 16px', letterSpacing: '-0.02em' }}>
              Ask across 100 meetings. Auto-sync to your company stack.
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '16px', lineHeight: 1.6, marginBottom: '20px' }}>
              Conversations no longer gather dust. Ask AI allows you to query your entire team meeting library: "What competitor pricing pushback did we hear this month?" Notes, action items, and soundbites sync directly to Salesforce, HubSpot, Slack, and Notion without human overhead.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/integrations">
                <Button variant="primary">Browse 21+ Integrations →</Button>
              </Link>
            </div>
          </div>

          {/* CRM JSON Payload Preview Card */}
          <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Live Automated CRM Sync Event (Salesforce)
            </div>
            <pre
              style={{
                background: '#1A202C',
                color: '#68D391',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '12px',
                lineHeight: 1.5,
                overflowX: 'auto',
                fontFamily: 'monospace',
                margin: 0,
              }}
            >
{`{
  "event": "salesforce.task.created",
  "opportunity": "Acme Cloud Architecture",
  "meddic_qualification": {
    "budget": "$65,000 confirmed (Marcus)",
    "decision_criteria": "SOC2 + sub-50ms diarization",
    "next_step": "Security review packet by Thursday"
  },
  "fathom_audio_receipt": "https://demo.fathom.ai/mtg?t=420"
}`}
            </pre>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <div style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--surface-sunk)', borderRadius: '16px', border: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>
            Ready to experience truthful meeting intelligence?
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Get started in 30 seconds. Connect your calendar and record your first call for free.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Button size="lg" variant="primary" onClick={() => navigate('/onboarding')}>
              Start Free Forever
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/pricing')}>
              View Plans & Comparison
            </Button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
};
