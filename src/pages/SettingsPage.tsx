import React, { useState } from 'react';
import { Button, Chip, useToast } from '../components/ui';

export const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [calendarConnected, setCalendarConnected] = useState(true);
  const [capturePreference, setCapturePreference] = useState<'bot-video' | 'audio' | 'transcript'>('bot-video');

  // Recording-rules sentence builder states
  const [ruleScope, setRuleScope] = useState('all meetings with external attendees');
  const [ruleAction, setRuleAction] = useState('record automatically with video');
  const [ruleShare, setRuleShare] = useState('share notes with attendees immediately');

  const handleSave = () => {
    toast({ message: 'Settings & recording rules saved successfully', duration: 3000 });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--sp-6) var(--sp-4)', width: '100%' }}>
      <header style={{ marginBottom: 'var(--sp-5)' }}>
        <h1 tabIndex={-1} style={{ fontSize: 'var(--text-3xl)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Settings & Recording Rules
        </h1>
        <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-base)' }}>
          Configure calendar integration, default capture modes, and automated rules.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
        {/* Calendar Connection */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-panel)', padding: '24px' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: '8px' }}>Calendar Integration</h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', marginBottom: '16px' }}>
            Connect Google Calendar or Microsoft Outlook to allow Fathom to detect upcoming calls and join automatically.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--surface-sunk)', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: calendarConnected ? 'var(--ok)' : 'var(--ink-3)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>Google Calendar (Demo Workspace)</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>you@workspace.com · 4 events synced</div>
              </div>
            </div>

            <Button
              size="sm"
              variant={calendarConnected ? 'ghost' : 'secondary'}
              onClick={() => {
                setCalendarConnected(!calendarConnected);
                toast({ message: calendarConnected ? 'Calendar disconnected' : 'Google Calendar connected' });
              }}
            >
              {calendarConnected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        </section>

        {/* Recording Rules Sentence Builder */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-panel)', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Chip variant="cue">Smart Rule</Chip>
            <h2 style={{ fontSize: 'var(--text-lg)' }}>Recording-Rules Builder</h2>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', marginBottom: '16px' }}>
            Formulate natural automation policies for how your notetaker joins and shares.
          </p>

          <div
            style={{
              padding: '18px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid var(--line)',
              lineHeight: 2,
              fontSize: '15px',
              fontFamily: 'var(--font-prose)',
            }}
          >
            For{' '}
            <select
              value={ruleScope}
              onChange={(e) => setRuleScope(e.target.value)}
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                color: 'var(--cue)',
                background: 'var(--cue-tint)',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 8px',
                margin: '0 4px',
                cursor: 'pointer',
              }}
            >
              <option value="all meetings with external attendees">all meetings with external attendees</option>
              <option value="every meeting on my calendar">every meeting on my calendar</option>
              <option value="only meetings where I am the organizer">only meetings where I am the organizer</option>
            </select>
            ,{' '}
            <select
              value={ruleAction}
              onChange={(e) => setRuleAction(e.target.value)}
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                color: 'var(--cue)',
                background: 'var(--cue-tint)',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 8px',
                margin: '0 4px',
                cursor: 'pointer',
              }}
            >
              <option value="record automatically with video">record automatically with video</option>
              <option value="record audio only">record audio only</option>
              <option value="ask me 5 minutes before">ask me 5 minutes before</option>
            </select>
            , and{' '}
            <select
              value={ruleShare}
              onChange={(e) => setRuleShare(e.target.value)}
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                color: 'var(--cue)',
                background: 'var(--cue-tint)',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 8px',
                margin: '0 4px',
                cursor: 'pointer',
              }}
            >
              <option value="share notes with attendees immediately">share notes with attendees immediately</option>
              <option value="keep notes private until I approve">keep notes private until I approve</option>
              <option value="send only action items to Slack">send only action items to Slack</option>
            </select>
            .
          </div>
        </section>

        {/* Capture Mode */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-panel)', padding: '24px' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: '8px' }}>Default Capture Mode</h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', marginBottom: '16px' }}>
            Choose the bot presence and recording fidelity across your meetings.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              { id: 'bot-video', title: 'Bot with Video', desc: 'Captures full video, speaker tiles, and audio.' },
              { id: 'audio', title: 'Audio & Transcript', desc: 'Captures high-fidelity audio and speaker diarization.' },
              { id: 'transcript', title: 'Transcript Only', desc: 'Lightweight transcription without raw video storage.' },
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setCapturePreference(opt.id as any)}
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  border: `2px solid ${capturePreference === opt.id ? 'var(--cue)' : 'var(--line)'}`,
                  background: capturePreference === opt.id ? 'var(--cue-tint)' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>{opt.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-2)', marginTop: '4px' }}>{opt.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="primary" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};
