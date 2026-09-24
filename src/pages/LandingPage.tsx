import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showpieceMeeting } from '../data/seed/showpiece';
import { ClockPlayer, type PlayerAdapter } from '../player/PlayerAdapter';
import { Score } from '../components/meeting/Score';
import { ReceiptChip, Button, Chip, formatTimecode } from '../components/ui';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const demoMeeting = showpieceMeeting;
  const [currentTime, setCurrentTime] = useState(360);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAudience, setActiveAudience] = useState<'teams' | 'individuals'>('teams');
  const playerRef = useRef<PlayerAdapter | null>(null);

  // Initialize mini player for interactive hero playground
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
    <div style={{ background: 'var(--canvas)', minHeight: '100dvh', display: 'flex', flexDirection: 'column', color: 'var(--ink)' }}>
      {/* Top Banner Announcement */}
      <div
        style={{
          background: 'var(--ink)',
          color: '#ffffff',
          padding: '10px 20px',
          textAlign: 'center',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <span style={{ background: 'var(--cue)', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>
          NEW
        </span>
        <span>Fathom is now available <strong>bot-free</strong> — record without an avatar in the call.</span>
        <Link to="/onboarding" style={{ color: 'var(--hl)', marginLeft: '8px', textDecoration: 'underline' }}>
          Try it now →
        </Link>
      </div>

      {/* Main Navigation Header */}
      <header
        style={{
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--line)',
          background: 'var(--surface)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--live)' }} />
            <span style={{ fontWeight: 800, fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
              FATHOM
            </span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '14px', fontWeight: 600 }}>
            <a href="#solutions" style={{ color: 'var(--ink-2)' }}>Solutions</a>
            <a href="#features" style={{ color: 'var(--ink-2)' }}>Features</a>
            <a href="#integrations" style={{ color: 'var(--ink-2)' }}>Integrations</a>
            <a href="#pricing" style={{ color: 'var(--ink-2)' }}>Pricing</a>
            <Link to="/dev/design" style={{ color: 'var(--ink-3)', fontSize: '12px' }}>/dev/design</Link>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/meetings" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
            Meetings App
          </Link>
          <Button variant="primary" onClick={() => navigate('/onboarding')}>
            Get Started - Free Forever
          </Button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ maxWidth: '1160px', margin: '48px auto 32px', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px', background: 'var(--surface-sunk)', padding: '6px 14px', borderRadius: '20px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--live)' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)' }}>
            #1 Rated AI Meeting Assistant on G2 · 4.9/5 Stars
          </span>
        </div>

        <h1
          tabIndex={-1}
          style={{
            fontSize: '54px',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
            marginBottom: '20px',
            maxWidth: '920px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Fathom summarizes your meetings so you can focus on the conversation.
        </h1>

        <p
          style={{
            fontSize: '20px',
            color: 'var(--ink-2)',
            maxWidth: '760px',
            margin: '0 auto 36px',
            lineHeight: 1.5,
          }}
        >
          Never take notes again. Shockingly accurate transcripts, instant summaries with clickable timecode receipts, and auto-synced CRM updates. Now available bot-free.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          <Button size="lg" variant="primary" onClick={() => navigate('/onboarding')} style={{ padding: '0 28px', fontSize: '16px', height: '46px' }}>
            Get started - free forever →
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/meetings/mtg-q3-roadmap')} style={{ height: '46px' }}>
            Explore 8-Person Flagship Demo
          </Button>
        </div>

        {/* Hero Visual Mockup Image */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-float)',
            border: '1px solid var(--line)',
            background: 'var(--surface)',
            marginBottom: '48px',
          }}
        >
          <img
            src="/images/fathom_meeting_hero.jpg"
            alt="Fathom AI Meeting Notetaker Interface showing 8-person call, speaker timeline, and receipt-backed summary"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Social Proof: Used at 300K+ companies */}
        <div style={{ padding: '24px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-3)', marginBottom: '16px' }}>
            Used at 300,000+ companies worldwide
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px', flexWrap: 'wrap', opacity: 0.75, fontWeight: 700, fontSize: '18px', color: 'var(--ink-2)' }}>
            <span>Google</span>
            <span>Zoom</span>
            <span>Meta</span>
            <span>Salesforce</span>
            <span>HubSpot</span>
            <span>Stripe</span>
            <span>Notion</span>
          </div>
        </div>
      </section>

      {/* TEAMS VS INDIVIDUALS INTERACTIVE SWITCHER */}
      <section id="solutions" style={{ maxWidth: '1100px', margin: '48px auto', padding: '0 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Whether you’re a team of 1 or 1,000, Fathom’s got your back
          </h2>
          <div style={{ display: 'inline-flex', gap: '8px', background: 'var(--surface-sunk)', padding: '4px', borderRadius: '8px', marginTop: '12px' }}>
            <button
              type="button"
              className={`btn btn-sm ${activeAudience === 'teams' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveAudience('teams')}
              style={{ padding: '6px 18px', fontSize: '14px' }}
            >
              Fathom for Teams
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeAudience === 'individuals' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveAudience('individuals')}
              style={{ padding: '6px 18px', fontSize: '14px' }}
            >
              Fathom for Individuals
            </button>
          </div>
        </div>

        {activeAudience === 'teams' ? (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <Chip variant="cue">Shared Intelligence</Chip>
              <h3 style={{ fontSize: '28px', fontWeight: 800, margin: '16px 0 12px' }}>
                Shared visibility. Smarter execution.
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                Fathom gives teams a shared source of truth across every customer conversation, internal sync, and strategy call – so decisions are visible, follow-through is consistent, and nothing gets lost between meetings.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
                <li>✓ <strong>Automatic notes & CRM updates</strong> reduce follow-ups and admin across the entire team.</li>
                <li>✓ <strong>Turn conversations into clear next steps</strong> that move deals and projects forward.</li>
                <li>✓ <strong>Cross-meeting Ask AI</strong> surfaces customer signals, competitor mentions, and pricing trends.</li>
              </ul>
              <div style={{ marginTop: '28px' }}>
                <Button variant="primary" onClick={() => navigate('/onboarding')}>
                  Try Fathom for Teams →
                </Button>
              </div>
            </div>
            <div style={{ background: 'var(--surface-sunk)', borderRadius: '12px', padding: '24px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '12px' }}>
                Team Impact Metrics
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--cue)' }}>6+ Hours Saved</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-2)' }}>per team member every week on meeting recaps and manual CRM updates.</div>
                </div>
                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ok)' }}>3X Faster</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-2)' }}>from spoken customer objections to engineering sprint tickets.</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <Chip variant="hl">Personal Productivity</Chip>
              <h3 style={{ fontSize: '28px', fontWeight: 800, margin: '16px 0 12px' }}>
                Fully present. Always prepared.
              </h3>
              <p style={{ color: 'var(--ink-2)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                Fathom captures every detail of your meetings so you can stay present, ask better questions, and never scramble to take messy notes during important calls.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
                <li>✓ <strong>Never touch a notepad again</strong> — 38 minutes saved on average per meeting.</li>
                <li>✓ <strong>One-click highlight hotkey (H)</strong> marks moments and decisions live.</li>
                <li>✓ <strong>Instant recap email</strong> with action items delivered right as the call ends.</li>
              </ul>
              <div style={{ marginTop: '28px' }}>
                <Button variant="primary" onClick={() => navigate('/onboarding')}>
                  Get Started Free →
                </Button>
              </div>
            </div>
            <div style={{ background: 'var(--surface-sunk)', borderRadius: '12px', padding: '24px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '12px' }}>
                Individual Benefits
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--cue)' }}>100% Focused</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-2)' }}>Eye contact with clients instead of looking down at your keyboard.</div>
                </div>
                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ok)' }}>Zero Missed Tasks</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-2)' }}>AI surfaces every commitment made by you or the client.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* THREE CORE PILLARS: CLARITY, MOMENTUM, EASE */}
      <section id="features" style={{ maxWidth: '1100px', margin: '48px auto', padding: '0 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Chip variant="cue">The Three Pillars</Chip>
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '12px' }}>
            Meeting intelligence engineered for zero friction
          </h2>
        </div>

        {/* Pillar 1: Clarity */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '36px', marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cue)', textTransform: 'uppercase' }}>01. Clarity</span>
            <h3 style={{ fontSize: '26px', fontWeight: 800, margin: '8px 0 12px' }}>
              Unforgettable meetings... quite literally
            </h3>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
              Shockingly accurate transcripts, instant summaries, and action items with consistent quality across every call — delivered straight to your inbox, like magic.
            </p>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px', lineHeight: 1.6 }}>
              Every single bullet carries an exact timecode receipt chip. Click `12:41 P` to hear Priya's exact words in context.
            </p>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 16px rgba(15,42,51,0.06)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '12px' }}>
              Receipt-Backed Summary Demonstration
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', fontFamily: 'var(--font-prose)' }}>
              <div>
                • Launch usage-based tier at $19/seat with 200 query cap <ReceiptChip at={420} speakerInitial="P" />
              </div>
              <div>
                • Grandfather existing enterprise contracts until Q1 renewal <ReceiptChip at={630} speakerInitial="P" />
              </div>
              <div>
                • Aisha compiling 15 diarization escalation bug cases <ReceiptChip at={3140} speakerInitial="A" />
              </div>
            </div>
          </div>
        </div>

        {/* Pillar 2: Momentum (Ask Fathom) */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '36px', marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cue)', textTransform: 'uppercase' }}>02. Momentum</span>
            <h3 style={{ fontSize: '26px', fontWeight: 800, margin: '8px 0 12px' }}>
              Eliminate overhead & maximize productivity
            </h3>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
              'Ask Fathom' anything about your meetings — search across conversations, spot trends, and get customizable AI summaries tailored to your team's workflow and priorities.
            </p>
            <Button variant="secondary" onClick={() => navigate('/meetings/mtg-q3-roadmap?tab=ask')}>
              Try Ask AI in Flagship Meeting →
            </Button>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'var(--shadow-float)' }}>
            <img
              src="/images/fathom_ask_ai.jpg"
              alt="Ask Fathom Cross-Meeting Intelligence with cited receipts and source cards"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>

        {/* Pillar 3: Ease (Integrations) */}
        <div id="integrations" style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '36px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'center' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)', boxShadow: 'var(--shadow-float)' }}>
            <img
              src="/images/fathom_integrations.jpg"
              alt="Fathom Integrations with Slack, Salesforce, HubSpot, Zoom, Google Meet, and Notion"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cue)', textTransform: 'uppercase' }}>03. Ease</span>
            <h3 style={{ fontSize: '26px', fontWeight: 800, margin: '8px 0 12px' }}>
              Works wherever you do
            </h3>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
              Meeting notes, insights, and action items sync automatically with your stack — Slack, Salesforce, HubSpot, Notion, Asana, Google Meet, Zoom, and Teams — without you lifting a finger.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Chip variant="default">Salesforce CRM</Chip>
              <Chip variant="default">HubSpot</Chip>
              <Chip variant="default">Slack Channels</Chip>
              <Chip variant="default">Notion Docs</Chip>
              <Chip variant="default">Google Meet</Chip>
              <Chip variant="default">Zoom Video</Chip>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SCORE PLAYGROUND */}
      <section style={{ maxWidth: '1100px', margin: '48px auto', padding: '0 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Chip variant="hl">Live Interactive Demonstration</Chip>
          <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '8px' }}>
            Experience The Score in your browser right now
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '16px', marginTop: '4px' }}>
            Click anywhere on the timeline or click the timecode chips to seek the 60fps audio clock.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-float)' }}>
          <div style={{ padding: '12px 20px', background: 'var(--surface-sunk)', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 700 }}>
              {demoMeeting.title} · ({formatTimecode(currentTime)} / {formatTimecode(demoMeeting.duration)})
            </span>
            <Button size="sm" variant="primary" onClick={() => playerRef.current?.togglePlay()}>
              {isPlaying ? 'Pause' : 'Play Audio Clock'}
            </Button>
          </div>

          <div style={{ padding: '16px' }}>
            <Score
              meeting={demoMeeting}
              currentTime={currentTime}
              duration={demoMeeting.duration}
              onSeek={handleSeek}
            />
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" style={{ maxWidth: '1000px', margin: '64px auto', padding: '0 24px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
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
            <Button variant="secondary" onClick={() => navigate('/onboarding')}>
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
            <Button variant="primary" onClick={() => navigate('/onboarding')}>
              Start 14-Day Trial →
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
            <Button variant="secondary" onClick={() => navigate('/onboarding')}>
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ marginTop: 'auto', borderTop: '1px solid var(--line)', padding: '48px 32px 32px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--live)' }} />
              <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--ink)' }}>FATHOM</span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: '280px' }}>
              Meeting notes that show their work. Every line links to the moment it came from.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>Solutions</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--ink-2)' }}>
              <li><Link to="/meetings">For Sales</Link></li>
              <li><Link to="/meetings">For Customer Success</Link></li>
              <li><Link to="/meetings">For Product & Design</Link></li>
              <li><Link to="/meetings">For Teams</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>Integrations</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--ink-2)' }}>
              <li><span>Zoom Video</span></li>
              <li><span>Google Meet</span></li>
              <li><span>Microsoft Teams</span></li>
              <li><span>Slack & Salesforce</span></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>Product</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--ink-2)' }}>
              <li><Link to="/onboarding">Sign Up Free</Link></li>
              <li><Link to="/meetings/mtg-q3-roadmap">Flagship Demo</Link></li>
              <li><Link to="/live">Live Simulation</Link></li>
              <li><Link to="/dev/design">Design Gallery</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--ink-3)' }}>
          <span>© 2026 Fathom (rebuild). All rights reserved. SOC 2 Type II Certified · GDPR Compliant.</span>
          <span>Broadcast edit-suite productivity & receipt-backed trust.</span>
        </div>
      </footer>
    </div>
  );
};
