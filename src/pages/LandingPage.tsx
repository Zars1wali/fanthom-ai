import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { showpieceMeeting } from '../data/seed/showpiece';
import { ClockPlayer, type PlayerAdapter } from '../player/PlayerAdapter';
import { Score } from '../components/meeting/Score';
import { ReceiptChip, Button, Chip, formatTimecode } from '../components/ui';
import { ROLE_SOLUTIONS } from '../content/roles';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const demoMeeting = showpieceMeeting;

  // Mini player state for interactive hero playground
  const [currentTime, setCurrentTime] = useState(420);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<PlayerAdapter | null>(null);

  // Capture mode toggle: bot vs bot-free
  const [captureMode, setCaptureMode] = useState<'bot' | 'bot_free'>('bot_free');

  // Role switcher state
  const [selectedRole, setSelectedRole] = useState<'sales' | 'customer-success' | 'teams'>('sales');

  // Ask AI playground state
  const [activeQuestion, setActiveQuestion] = useState(
    'What pricing model and per-seat fee was approved during this meeting?'
  );

  useEffect(() => {
    const clock = new ClockPlayer(demoMeeting.duration, 420);
    playerRef.current = clock;
    clock.onTimeUpdate(setCurrentTime);
    clock.onStateChange(setIsPlaying);
    return () => clock.destroy();
  }, [demoMeeting.duration]);

  const handleSeek = (time: number) => {
    playerRef.current?.seek(time);
    setCurrentTime(time);
  };

  const currentRoleData = ROLE_SOLUTIONS[selectedRole];

  return (
    <SiteShell currentSection="product">
      <div style={{ maxWidth: '1200px', margin: '48px auto', padding: '0 24px' }}>
        {/* HERO SECTION */}
        <section style={{ textAlign: 'center', marginBottom: '56px' }}>
          {/* Eyebrow Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              background: 'var(--surface-sunk)',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid var(--line)',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--live)' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)' }}>
              Truthful Meeting Intelligence · Every AI Bullet Has Receipts
            </span>
          </div>

          <h1
            style={{
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
              marginBottom: '20px',
              maxWidth: '920px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Never take notes again. Verified summaries with clickable receipts.
          </h1>

          <p
            style={{
              fontSize: '20px',
              color: 'var(--ink-2)',
              maxWidth: '740px',
              margin: '0 auto 32px',
              lineHeight: 1.5,
            }}
          >
            Fathom eliminates manual note-taking and CRM hygiene debt. Verbatim transcripts, 8-lane speaker timelines, and summaries that jump directly to spoken seconds. Now available bot-free.
          </p>

          {/* CTA #1 OF 3 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}>
            <Button size="lg" variant="primary" onClick={() => navigate('/onboarding')} style={{ padding: '0 32px', height: '48px', fontSize: '16px' }}>
              Get Started Free — No Credit Card
            </Button>
            <Link to="/meetings/mtg-q3-roadmap">
              <Button size="lg" variant="secondary" style={{ height: '48px' }}>
                Open 8-Person Live Demo
              </Button>
            </Link>
          </div>

          {/* HERO PLAYABLE MINI MEETING FIXTURE (REAL COMPONENTS, NOT A PICTURE!) */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-float)',
              textAlign: 'left',
            }}
          >
            {/* Fixture Player Top Bar */}
            <div
              style={{
                padding: '14px 24px',
                background: 'var(--surface-sunk)',
                borderBottom: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isPlaying ? 'var(--live)' : 'var(--cue)' }} />
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>
                  {demoMeeting.title}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--ink-3)', fontFamily: 'monospace' }}>
                  ({formatTimecode(currentTime)} / {formatTimecode(demoMeeting.duration)})
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Button
                  size="sm"
                  variant={isPlaying ? 'secondary' : 'primary'}
                  onClick={() => playerRef.current?.togglePlay()}
                >
                  {isPlaying ? 'Pause Playhead' : 'Play 60fps Audio Clock'}
                </Button>
                <Link to="/meetings/mtg-q3-roadmap">
                  <Button size="sm" variant="ghost">Full Screen App →</Button>
                </Link>
              </div>
            </div>

            {/* The Score Timeline Track */}
            <div style={{ padding: '20px 24px 16px', background: 'var(--canvas)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                The Score: 8 Dedicated Speaker Lanes · Click to Seek Playhead
              </div>
              <Score
                meeting={demoMeeting}
                currentTime={currentTime}
                duration={demoMeeting.duration}
                onSeek={handleSeek}
              />
            </div>

            {/* Receipt-Backed Takeaway Strip */}
            <div style={{ padding: '20px 24px', background: 'var(--surface)', borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--surface-sunk)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--ink)' }}>Commercial Milestone</div>
                <div>
                  • Launch usage-based tier at $19/seat with 200 query cap{' '}
                  <ReceiptChip at={420} speakerInitial="P" />
                </div>
              </div>
              <div style={{ background: 'var(--surface-sunk)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--ink)' }}>Assigned Action Item</div>
                <div>
                  • Deliver custom SOC2 compliance package by Thursday{' '}
                  <ReceiptChip at={2680} speakerInitial="A" />
                </div>
              </div>
              <div style={{ background: 'var(--surface-sunk)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px' }}>
                <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--ink)' }}>Engineering Architecture</div>
                <div>
                  • Sub-50ms diarization boundary snapping across 8 lanes{' '}
                  <ReceiptChip at={710} speakerInitial="A" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CAPTURE-MODE SELECTOR (BOT VS BOT-FREE) */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', marginBottom: '56px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Chip variant="cue">Capture Ergonomics</Chip>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px', marginBottom: '8px' }}>
              Choose how you record: Bot or Bot-Free
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '16px', maxWidth: '640px', margin: '0 auto' }}>
              Switch modes below to see how Fathoms output adapts to your meeting sensitivity requirements.
            </p>

            <div style={{ display: 'inline-flex', gap: '8px', background: 'var(--surface-sunk)', padding: '4px', borderRadius: '8px', marginTop: '16px' }}>
              <button
                onClick={() => setCaptureMode('bot_free')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: captureMode === 'bot_free' ? 'var(--ink)' : 'transparent',
                  color: captureMode === 'bot_free' ? '#ffffff' : 'var(--ink-2)',
                }}
              >
                Local Desktop (Bot-Free)
              </button>
              <button
                onClick={() => setCaptureMode('bot')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: captureMode === 'bot' ? 'var(--ink)' : 'transparent',
                  color: captureMode === 'bot' ? '#ffffff' : 'var(--ink-2)',
                }}
              >
                Automated Cloud Bot
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>
                {captureMode === 'bot_free'
                  ? 'Total Discretion: No Bot Avatar in Your Video Grid'
                  : 'Automated Cloud Convenience: Zero Software to Install'}
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
                {captureMode === 'bot_free'
                  ? 'Captures system audio locally from your operating system audio pipeline. Ideal for sensitive client calls, executive interviews, or strict organizational policies where external bot avatars are prohibited.'
                  : 'A dedicated Fathom Notetaker joins your scheduled Zoom, Google Meet, or Teams conference room automatically. Perfect for team transparency where participants appreciate clear visual recording indicators.'}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--ink-2)' }}>
                <li>✓ Full 8-track speaker diarization supported</li>
                <li>✓ Clickable timecode receipts on all bullet points</li>
                <li>✓ Automatic CRM sync to Salesforce and HubSpot</li>
              </ul>
            </div>

            <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                  Live Mode Payload Status
                </span>
                <Chip variant={captureMode === 'bot_free' ? 'ok' : 'cue'}>
                  {captureMode === 'bot_free' ? 'Bot-Free Desktop Active' : 'Cloud Bot Active'}
                </Chip>
              </div>

              <div style={{ background: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px' }}>
                <div><strong>Capture Mode:</strong> {captureMode === 'bot_free' ? 'Local CoreAudio Loopback' : 'WebRTC Room Peer'}</div>
                <div style={{ marginTop: '6px' }}><strong>Room Avatar Presence:</strong> {captureMode === 'bot_free' ? 'None (Invisible to participants)' : 'Visible ("Fathom Notetaker")'}</div>
                <div style={{ marginTop: '6px' }}><strong>Diarization Latency:</strong> Sub-50ms streaming</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ASK FATHOM WITH RECEIPTS */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', marginBottom: '56px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto 32px', textAlign: 'center' }}>
            <Chip variant="cue">Cross-Meeting Intelligence</Chip>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px', marginBottom: '8px' }}>
              Ask anything. Every answer cites exact spoken receipts.
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '16px' }}>
              Query across your conversations. No hallucinated claims — only cited facts linked to timecodes.
            </p>
          </div>

          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            {/* Query Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {[
                'What pricing model and per-seat fee was approved during this meeting?',
                'Who was assigned the SOC2 compliance packet and what is the deadline?',
                'What competitor was mentioned regarding contract renewal?',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setActiveQuestion(q)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: activeQuestion === q ? '1px solid var(--ink)' : '1px solid var(--line)',
                    background: activeQuestion === q ? 'var(--ink)' : 'var(--surface-sunk)',
                    color: activeQuestion === q ? '#ffffff' : 'var(--ink-2)',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Answer Card with Live Receipt */}
            <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', marginBottom: '8px' }}>
                Cited AI Answer:
              </div>
              <div style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--ink)', marginBottom: '16px' }}>
                {activeQuestion.includes('pricing') ? (
                  <>
                    Priya proposed and confirmed launching the usage-based tier at <strong>$19 per seat</strong> with a 200 query cap, while grandfathering existing enterprise agreements until Q1 renewal.{' '}
                    <ReceiptChip at={420} speakerInitial="P" />
                  </>
                ) : activeQuestion.includes('SOC2') ? (
                  <>
                    Alex was assigned to deliver the custom SOC2 compliance package and DPA by <strong>Thursday end of day</strong> to Marcus for infosec review.{' '}
                    <ReceiptChip at={2680} speakerInitial="A" />
                  </>
                ) : (
                  <>
                    Marcus mentioned that their legacy contract with <strong>Fireflies</strong> expires on November 15th, requesting migration support.{' '}
                    <ReceiptChip at={2190} speakerInitial="M" />
                  </>
                )}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
                Source: <em>Q3 Product Roadmap Review · Sep 24, 2026</em>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHERE NOTES GO (REAL PAYLOAD PREVIEWS INSTEAD OF LOGO ROWS!) */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', marginBottom: '56px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Chip variant="cue">Real Automations, Not Logo Rows</Chip>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px', marginBottom: '8px' }}>
              Where your notes actually go: Automated CRM & Workspace payloads
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '16px', maxWidth: '680px', margin: '0 auto' }}>
              We don't just show partner icons. Inspect the actual structured JSON emitted to Salesforce, HubSpot, and Slack when meetings end.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Payload 1: Salesforce */}
            <div style={{ background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ background: '#00A1E0', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>SF</span>
                <strong style={{ fontSize: '14px' }}>Salesforce Opportunity Sync</strong>
              </div>
              <pre style={{ background: '#1A202C', color: '#68D391', padding: '14px', borderRadius: '8px', fontSize: '12px', margin: 0, overflowX: 'auto', fontFamily: 'monospace' }}>
{`{
  "task": "Call Recap & Next Steps",
  "opportunity_id": "0065e000002XYZ1",
  "meddic_budget": "$65k confirmed",
  "next_step": "Send SOC2 DPA packet",
  "receipt_url": "fathom.ai/mtg?t=420"
}`}
              </pre>
            </div>

            {/* Payload 2: HubSpot */}
            <div style={{ background: 'var(--canvas)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ background: '#FF7A59', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>HS</span>
                <strong style={{ fontSize: '14px' }}>HubSpot Timeline Engagement</strong>
              </div>
              <pre style={{ background: '#1A202C', color: '#68D391', padding: '14px', borderRadius: '8px', fontSize: '12px', margin: 0, overflowX: 'auto', fontFamily: 'monospace' }}>
{`{
  "deal_stage": "Proposal Scoping",
  "attendees": ["Marcus", "Priya"],
  "expansion_signal": "+45 seats Q4",
  "health_score": "Green",
  "receipt_url": "fathom.ai/mtg?t=620"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 5: ROLE SWITCHER */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', marginBottom: '56px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Chip variant="cue">Role Solutions</Chip>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '8px', marginBottom: '8px' }}>
              Engineered for how your specific team works
            </h2>
            <div style={{ display: 'inline-flex', gap: '8px', background: 'var(--surface-sunk)', padding: '4px', borderRadius: '8px', marginTop: '12px' }}>
              {(['sales', 'customer-success', 'teams'] as const).map((rKey) => (
                <button
                  key={rKey}
                  onClick={() => setSelectedRole(rKey)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: selectedRole === rKey ? 'var(--ink)' : 'transparent',
                    color: selectedRole === rKey ? '#ffffff' : 'var(--ink-2)',
                  }}
                >
                  {ROLE_SOLUTIONS[rKey].roleName}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--surface-sunk)', borderRadius: '12px', padding: '28px', border: '1px solid var(--line)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>{currentRoleData.headline}</h3>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px', marginBottom: '20px' }}>{currentRoleData.subheadline}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to={`/solutions/${selectedRole}`}>
                <Button variant="primary">Explore {currentRoleData.roleName} Solution →</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 6: PRICING TEASER */}
        <section style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '16px', padding: '48px 32px', textAlign: 'center', marginBottom: '56px' }}>
          <Chip variant="default">Sample Pricing Teaser</Chip>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginTop: '12px', marginBottom: '8px' }}>
            Free Forever. Upgrade when you need team CRM sync.
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Unlimited recordings and verbatim transcripts cost $0. Team Edition is $19/seat with custom templates and CRM sync.
          </p>
          <Link to="/pricing">
            <Button variant="secondary" size="md">Compare All Features & Limits →</Button>
          </Link>
        </section>

        {/* BOTTOM FINAL CTA (#3 OF 3) */}
        <div style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--ink)', borderRadius: '16px', color: '#ffffff' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '12px' }}>
            Stop taking notes. Start focusing on the conversation.
          </h2>
          <p style={{ color: 'var(--ink-3)', fontSize: '16px', maxWidth: '600px', margin: '0 auto 28px' }}>
            Join hundreds of thousands of professionals who rely on Fathom every day for truthful meeting notes.
          </p>
          <Button size="lg" variant="primary" onClick={() => navigate('/onboarding')} style={{ padding: '0 32px', height: '48px', fontSize: '16px' }}>
            Get Started Free — Takes 30 Seconds
          </Button>
        </div>
      </div>
    </SiteShell>
  );
};
