import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, useToast } from '../components/ui';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [_connectedCalendar, setConnectedCalendar] = useState<'google' | 'outlook' | null>(null);
  const [role, setRole] = useState('Product Lead');
  const [meetingType, setMeetingType] = useState('Internal team syncs & roadmaps');
  const [teamSize, setTeamSize] = useState('6-20 people');
  const [captureMode, setCaptureMode] = useState<'bot-free' | 'bot-video'>('bot-free');
  const [autoShare, setAutoShare] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConnectCalendar = (provider: 'google' | 'outlook') => {
    setIsSubmitting(true);
    setTimeout(() => {
      setConnectedCalendar(provider);
      setIsSubmitting(false);
      toast({ message: `Successfully connected ${provider === 'google' ? 'Google Calendar' : 'Microsoft Outlook'}!` });
      setStep(2);
    }, 700);
  };

  const handleFinishOnboarding = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ message: 'Welcome to Fathom! Your workspace is ready.' });
      navigate('/meetings/mtg-q3-roadmap');
    }, 800);
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--canvas)', display: 'flex', flexDirection: 'column' }}>
      {/* Onboarding Header */}
      <header
        style={{
          padding: '16px 32px',
          borderBottom: '1px solid var(--line)',
          background: 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--live)' }} />
          <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--ink)' }}>FATHOM</span>
          <Chip variant="cue">Setup</Chip>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--ink-2)' }}>
          <span style={{ fontWeight: step === 1 ? 700 : 500, color: step === 1 ? 'var(--cue)' : undefined }}>1. Calendar</span>
          <span>→</span>
          <span style={{ fontWeight: step === 2 ? 700 : 500, color: step === 2 ? 'var(--cue)' : undefined }}>2. Role</span>
          <span>→</span>
          <span style={{ fontWeight: step === 3 ? 700 : 500, color: step === 3 ? 'var(--cue)' : undefined }}>3. Recording</span>
          <span>→</span>
          <span style={{ fontWeight: step === 4 ? 700 : 500, color: step === 4 ? 'var(--cue)' : undefined }}>4. First Call</span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/meetings')}
          style={{ fontSize: '13px', color: 'var(--ink-3)', border: 'none', background: 'none', cursor: 'pointer' }}
        >
          Skip to Library
        </button>
      </header>

      {/* Main Form Container */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
        <div
          style={{
            maxWidth: '560px',
            width: '100%',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-panel)',
            padding: '36px',
            boxShadow: 'var(--shadow-float)',
          }}
        >
          {/* STEP 1: CONNECT CALENDAR */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--cue-tint)', color: 'var(--cue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h1 tabIndex={-1} style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
                  Connect your calendar
                </h1>
                <p style={{ color: 'var(--ink-2)', fontSize: '14px', lineHeight: 1.5 }}>
                  Fathom needs calendar access so it knows which meetings to join and summarize. You can choose exactly which calls to record.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => handleConnectCalendar('google')}
                  disabled={isSubmitting}
                  style={{ width: '100%', justifyContent: 'center', gap: '12px', background: '#ffffff' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Connect with Google Calendar
                </button>

                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => handleConnectCalendar('outlook')}
                  disabled={isSubmitting}
                  style={{ width: '100%', justifyContent: 'center', gap: '12px', background: '#ffffff' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0078D4">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  Connect with Microsoft Outlook
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{ fontSize: '13px', color: 'var(--cue)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  No calendar handy? Continue with demo data →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: STRATEGIC FRICTION & ROLE SEGMENTATION */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <Chip variant="cue">Tailored AI</Chip>
                <h1 tabIndex={-1} style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', margin: '12px 0 8px' }}>
                  Help Fathom customize your notes
                </h1>
                <p style={{ color: 'var(--ink-2)', fontSize: '14px', lineHeight: 1.5 }}>
                  We tailor AI summaries, action item detection, and template structures to your specific team context.
                </p>
              </div>

              {/* Natural sentence completion builder */}
              <div style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '8px', padding: '20px', lineHeight: 2.2, fontSize: '15px', fontFamily: 'var(--font-prose)' }}>
                I work as a{' '}
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, color: 'var(--cue)', background: 'var(--cue-tint)', border: 'none', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}
                >
                  <option value="Product Lead">Product Lead / Designer</option>
                  <option value="Sales / Account Executive">Sales / Account Executive</option>
                  <option value="Customer Success Manager">Customer Success Manager</option>
                  <option value="Engineering Manager">Engineering Manager</option>
                  <option value="Executive / Founder">Executive / Founder</option>
                </select>
                . My meetings are primarily{' '}
                <select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, color: 'var(--cue)', background: 'var(--cue-tint)', border: 'none', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}
                >
                  <option value="Internal team syncs & roadmaps">Internal team syncs & roadmaps</option>
                  <option value="Sales discovery & deal closing calls">Sales discovery & deal closing calls</option>
                  <option value="Customer onboarding & QBRs">Customer onboarding & QBRs</option>
                  <option value="1:1s and candidate interviews">1:1s and candidate interviews</option>
                </select>
                , with team sizes around{' '}
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, color: 'var(--cue)', background: 'var(--cue-tint)', border: 'none', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}
                >
                  <option value="2-5 people">2–5 people</option>
                  <option value="6-20 people">6–20 people</option>
                  <option value="20+ people">20+ people</option>
                </select>
                .
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="primary" onClick={() => setStep(3)}>
                  Continue to Preferences →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: RECORDING & BOT-FREE PREFERENCES */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <Chip variant="hl">Capture Flexibility</Chip>
                <h1 tabIndex={-1} style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', margin: '12px 0 8px' }}>
                  How should Fathom capture calls?
                </h1>
                <p style={{ color: 'var(--ink-2)', fontSize: '14px', lineHeight: 1.5 }}>
                  Choose whether you want a visible notetaker bot in the call or seamless bot-free capture.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Bot-Free Option */}
                <div
                  onClick={() => setCaptureMode('bot-free')}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: `2px solid ${captureMode === 'bot-free' ? 'var(--cue)' : 'var(--line)'}`,
                    background: captureMode === 'bot-free' ? 'var(--cue-tint)' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <input type="radio" checked={captureMode === 'bot-free'} readOnly style={{ marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Bot-Free Capture
                      <Chip variant="cue">New</Chip>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--ink-2)', marginTop: '4px', lineHeight: 1.4 }}>
                      No awkward bot joins the meeting tile grid. Captures system audio directly via the desktop companion.
                    </div>
                  </div>
                </div>

                {/* Visible Bot Option */}
                <div
                  onClick={() => setCaptureMode('bot-video')}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: `2px solid ${captureMode === 'bot-video' ? 'var(--cue)' : 'var(--line)'}`,
                    background: captureMode === 'bot-video' ? 'var(--cue-tint)' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <input type="radio" checked={captureMode === 'bot-video'} readOnly style={{ marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>
                      Visible Meeting Bot (Fathom Notetaker)
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--ink-2)', marginTop: '4px', lineHeight: 1.4 }}>
                      A friendly bot joins Zoom, Google Meet, or Microsoft Teams to capture video and audio records.
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'var(--surface-sunk)', borderRadius: '6px' }}>
                <input
                  type="checkbox"
                  id="auto-share"
                  checked={autoShare}
                  onChange={(e) => setAutoShare(e.target.checked)}
                  style={{ accentColor: 'var(--cue)' }}
                />
                <label htmlFor="auto-share" style={{ fontSize: '13px', color: 'var(--ink)', cursor: 'pointer' }}>
                  Automatically email me full notes and timecode receipts right after every call
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                <Button variant="ghost" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button variant="primary" onClick={() => setStep(4)}>
                  Continue to Activation →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: FIRST ACTIVATION MEETING */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '32px' }}>🎉</span>
                <h1 tabIndex={-1} style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', margin: '12px 0 8px' }}>
                  You're all set!
                </h1>
                <p style={{ color: 'var(--ink-2)', fontSize: '14px', lineHeight: 1.5 }}>
                  Your workspace is seeded with our flagship 8-person meeting so you can experience The Score, live receipt chips, and template switching immediately.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cue)', textTransform: 'uppercase' }}>
                      Ready to experience
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)' }}>
                      Q3 Roadmap Sync (58 mins · 8 speakers)
                    </div>
                  </div>
                  <Chip variant="cue">Sample Flagship</Chip>
                </div>

                <div style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  Configured with your <strong>{role}</strong> preference, <strong>{captureMode === 'bot-free' ? 'Bot-Free' : 'Video Bot'}</strong> mode, and receipt-backed AI summary.
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleFinishOnboarding}
                  disabled={isSubmitting}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {isSubmitting ? 'Entering Workspace…' : 'Enter Workspace & Open Flagship Meeting →'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/meetings')}
                  style={{ width: '100%', justifyContent: 'center', color: 'var(--ink-3)' }}
                >
                  Or explore all meetings in Library
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
