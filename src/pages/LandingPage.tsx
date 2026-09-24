import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_NAME, APP_DESCRIPTION, APP_TAGLINE } from '../config';
import { showpieceMeeting } from '../data/seed/showpiece';
import { ClockPlayer, type PlayerAdapter } from '../player/PlayerAdapter';
import { Score } from '../components/meeting/Score';
import { ReceiptChip, Button, Chip, formatTimecode } from '../components/ui';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const demoMeeting = showpieceMeeting;
  const [currentTime, setCurrentTime] = useState(360);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<PlayerAdapter | null>(null);

  // Initialize mini player on mount
  React.useEffect(() => {
    const clock = new ClockPlayer(demoMeeting.duration, 360);
    playerRef.current = clock;
    clock.onTimeUpdate(setCurrentTime);
    clock.onStateChange(setIsPlaying);
    return () => clock.destroy();
  }, [demoMeeting.duration]);

  const handleSeek = (time: number) => {
    playerRef.current?.seek(time);
    setCurrentTime(time);
  };

  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <header
        style={{
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--line)',
          background: 'var(--surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--live)' }} />
          <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            {APP_NAME}
          </span>
          <Chip variant="cue">Rebuild v2.0</Chip>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/meetings" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-2)' }}>
            Meetings Library
          </Link>
          <a href="#pricing" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-2)' }}>
            Pricing
          </a>
          <Button variant="primary" onClick={() => navigate('/meetings/mtg-q3-roadmap')}>
            Try Live Demo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1100px', margin: '48px auto 32px', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Chip variant="hl">BROADCAST-CALIBER NOTETAKER</Chip>
          <span style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{APP_TAGLINE}</span>
        </div>

        <h1
          tabIndex={-1}
          style={{
            fontSize: '48px',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
            marginBottom: '16px',
            maxWidth: '850px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {APP_DESCRIPTION}
        </h1>

        <p
          style={{
            fontSize: '18px',
            color: 'var(--ink-2)',
            maxWidth: '720px',
            margin: '0 auto 32px',
            lineHeight: 1.5,
          }}
        >
          No more guessing if the AI hallucinated. Every bullet, decision, and action item carries an exact timecode receipt. Click to jump directly to the voice that said it.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
          <Button size="lg" variant="primary" onClick={() => navigate('/meetings/mtg-q3-roadmap')}>
            Open 8-Person Flagship Meeting →
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/live')}>
            Simulate Live Meeting
          </Button>
        </div>

        {/* Playable Mini Meeting Page Hero Asset */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-float)',
            overflow: 'hidden',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid var(--line)',
              background: 'var(--surface-sunk)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>Interactive Preview: {demoMeeting.title}</span>
              <span className="tabular" style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
                ({formatTimecode(currentTime)} / {formatTimecode(demoMeeting.duration)})
              </span>
            </div>
            <Button
              size="sm"
              variant="primary"
              onClick={() => playerRef.current?.togglePlay()}
            >
              {isPlaying ? 'Pause' : 'Play Audio Clock'}
            </Button>
          </div>

          {/* Mini Score */}
          <div style={{ padding: '12px' }}>
            <Score
              meeting={demoMeeting}
              currentTime={currentTime}
              duration={demoMeeting.duration}
              onSeek={handleSeek}
            />
          </div>

          {/* Mini Catch-up Bullets with Receipts */}
          <div style={{ padding: '16px 24px', background: '#ffffff', borderTop: '1px solid var(--line)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '8px' }}>
              Sample Receipt-Backed Notes (Click timecode to seek)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {demoMeeting.summary?.catchUp.slice(0, 2).map((b) => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--cue)', fontWeight: 700 }}>•</span>
                  <span>{b.text}</span>
                  {b.receipts.map((r, i) => (
                    <ReceiptChip key={i} at={r.at} speakerInitial="P" onClick={handleSeek} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ maxWidth: '1000px', margin: '64px auto', padding: '0 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
            Straightforward, honest pricing
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '16px' }}>
            Unlimited recordings forever. Upgrade for advanced Ask AI and priority multi-speaker diarization.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* Free Tier */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Free</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-3)', marginBottom: '16px' }}>For individuals & ad-hoc meetings</p>
            <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--ink)', marginBottom: '20px' }}>$0</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--ink-2)', marginBottom: '28px', flex: 1 }}>
              <li>✓ Unlimited video & audio recordings</li>
              <li>✓ Full transcript with speaker colors</li>
              <li>✓ Standard 60-second catch-up notes</li>
              <li>✓ The Score timeline visualization</li>
              <li>✓ 50 Ask AI queries per month</li>
            </ul>
            <Button variant="secondary" onClick={() => navigate('/meetings')}>
              Get Started Free
            </Button>
          </div>

          {/* Usage-based Middle Tier */}
          <div
            style={{
              background: '#ffffff',
              border: '2px solid var(--cue)',
              borderRadius: '12px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: 'var(--shadow-float)',
            }}
          >
            <div style={{ position: 'absolute', top: '-11px', left: '24px', background: 'var(--cue)', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
              MOST POPULAR
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Team</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-3)', marginBottom: '16px' }}>For fast-moving product & engineering teams</p>
            <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--ink)', marginBottom: '20px' }}>
              $19 <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink-3)' }}>/ seat / mo</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--ink)', marginBottom: '28px', flex: 1 }}>
              <li>✓ Everything in Free</li>
              <li>✓ <strong>200 Ask AI queries</strong> per user / month</li>
              <li>✓ Priority 8-person multi-speaker pipeline</li>
              <li>✓ Executive, Sales & Engineering templates</li>
              <li>✓ Inline range clip creation & public links</li>
              <li>✓ Google Calendar auto-join & rules builder</li>
            </ul>
            <Button variant="primary" onClick={() => navigate('/meetings')}>
              Start 14-Day Trial
            </Button>
          </div>

          {/* Enterprise Tier */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '28px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Enterprise</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-3)', marginBottom: '16px' }}>For regulated & large organizations</p>
            <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--ink)', marginBottom: '20px' }}>Custom</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'var(--ink-2)', marginBottom: '28px', flex: 1 }}>
              <li>✓ 50-seat minimum commitment</li>
              <li>✓ SAML SSO & SCIM directory sync</li>
              <li>✓ Granular sharing permissions & audit logs</li>
              <li>✓ Dedicated customer success manager</li>
              <li>✓ Custom AI summary templates & SLA</li>
            </ul>
            <Button variant="secondary" onClick={() => navigate('/meetings')}>
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', borderTop: '1px solid var(--line)', padding: '24px 32px', textAlign: 'center', background: 'var(--surface)', fontSize: '13px', color: 'var(--ink-3)' }}>
        {APP_NAME} — A rebuild demonstrating broadcast edit-suite productivity and receipt-backed trust.
      </footer>
    </div>
  );
};
