import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Chip, Kbd, formatTimecode, useToast } from '../components/ui';

export const LiveSimulationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialUrl = searchParams.get('url') || 'https://meet.google.com/abc-xyz-123';
  const initialTitle = searchParams.get('title') || '2-Minute Self-Test Call';

  const [meetingUrl, setMeetingUrl] = useState(initialUrl);
  const [meetingTitle, setMeetingTitle] = useState(initialTitle);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [notes, setNotes] = useState<string>('');
  const [turns, setTurns] = useState<{ speaker: string; text: string; time: number; colorIndex: number }[]>([]);
  const [stage, setStage] = useState<'idle' | 'recording' | 'processing' | 'done'>('idle');
  const [processStep, setProcessStep] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const timerRef = useRef<number | null>(null);

  const scriptedDialogue = [
    { speaker: 'You', text: "Starting a quick 2-minute recording check to test audio diarization and action item extraction.", colorIndex: 3 },
    { speaker: 'Priya Sharma', text: "Let's review the customer feedback on the 60-minute calls before we touch the roadmap.", colorIndex: 1 },
    { speaker: 'Marcus Chen', text: "Engineering found that diarization accuracy drops after turn 400 when speakers overlap.", colorIndex: 2 },
    { speaker: 'You', text: "We need to fix that before launching the usage-based tier next month. I will document the test cases.", colorIndex: 3 },
    { speaker: 'Aisha Okonkwo', text: "Customer success has 15 tagged bug reports ready for review. I'll send them over by 4 PM.", colorIndex: 4 },
  ];

  // Call timer and live stream simulation
  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          if (next % 3 === 0 && scriptedDialogue.length > 0) {
            const turnIdx = Math.floor(next / 3) - 1;
            if (turnIdx < scriptedDialogue.length) {
              const item = scriptedDialogue[turnIdx];
              setTurns((t) => [...t, { ...item, time: next }]);
            }
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleStartCall = () => {
    setIsRecording(true);
    setStage('recording');
    setElapsed(0);
    setTurns([]);
    toast({ message: 'Fathom notetaker joined the call. Recording started.', duration: 3000 });
  };

  const handleHighlight = () => {
    toast({
      message: `Live highlight marked at ${formatTimecode(elapsed)}`,
      duration: 3000,
    });
  };

  const handleAddTimestampedNote = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const timeTag = `[${formatTimecode(elapsed)}] `;
      setNotes((prev) => prev + (prev.endsWith('\n') || !prev ? '' : '\n') + timeTag);
    }
  };

  const handleEndCall = async () => {
    setIsRecording(false);
    setStage('processing');

    setProcessStep('1/4 Normalising audio turns & computing speaker talk-time…');

    try {
      const turnsToProcess = turns.length > 0 ? turns : scriptedDialogue.map((d, i) => ({ ...d, time: i * 15 }));
      const rawSegments = turnsToProcess.map((t, idx) => ({
        speakerName: t.speaker,
        start: idx * 12,
        end: (idx + 1) * 12,
        text: t.text,
      }));

      const res = await fetch('/api/pipeline/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: meetingTitle || '2-Minute Self-Test Call',
          rawSegments,
          templateId: 'standard',
          platform: 'meet',
        }),
      });

      if (res.ok) {
        const newMtg = await res.json();
        setProcessStep('2/4 Segmenting chapters & detecting topic boundaries…');
        setTimeout(() => {
          setProcessStep('3/4 Generating summary with timecode receipts…');
          setTimeout(() => {
            setProcessStep('4/4 Extracting action items & indexing for ⌘K search…');
            setTimeout(() => {
              setStage('done');
              toast({ message: 'Meeting ready with receipts! Opening…' });
              setTimeout(() => {
                navigate(`/meetings/${newMtg.id}`);
              }, 700);
            }, 700);
          }, 700);
        }, 700);
        return;
      }
    } catch (e) {
      console.warn('Pipeline process error, using fallback:', e);
    }

    // Graceful fallback to flagship roadmap meeting
    setTimeout(() => {
      setProcessStep('Segmenting chapters & detecting topic boundaries…');
      setTimeout(() => {
        setProcessStep('Summarizing with receipts and extracting action items…');
        setTimeout(() => {
          setStage('done');
          toast({ message: 'Meeting ready! Opening flagship 60-min meeting…' });
          setTimeout(() => {
            navigate('/meetings/mtg-q3-roadmap');
          }, 900);
        }, 900);
      }, 900);
    }, 900);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: 'var(--sp-6) var(--sp-4)', width: '100%' }}>
      <header style={{ marginBottom: 'var(--sp-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Chip variant="live">LIVE CAPTURE</Chip>
          <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>Simulated Meeting Pipeline</span>
        </div>
        <h1 tabIndex={-1} style={{ fontSize: 'var(--text-3xl)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Live Meeting Simulation
        </h1>
        <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-base)' }}>
          Test how Fathom joins, records in real time, streams transcription, auto-stamps scratchpad notes, and pipelines into finished notes.
        </p>
      </header>

      {stage === 'idle' && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-panel)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px', display: 'block' }}>
              Meeting Title:
            </label>
            <input
              type="text"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              placeholder="e.g. 2-Minute Self-Test Call"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                borderRadius: 'var(--radius-control)',
                border: '1px solid var(--line)',
                background: '#ffffff',
                marginBottom: '16px',
              }}
            />
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px', display: 'block' }}>
              Meeting URL (Google Meet, Zoom, or Teams):
            </label>
            <input
              type="text"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                borderRadius: 'var(--radius-control)',
                border: '1px solid var(--line)',
                background: '#ffffff',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button variant="primary" size="lg" onClick={handleStartCall}>
              Join & Start Recording
            </Button>
            <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
              Runs a 30-second live dialogue simulation with real-time sync.
            </span>
          </div>
        </div>
      )}

      {stage === 'recording' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Live Control Bar */}
          <div
            style={{
              background: 'var(--ink)',
              color: '#ffffff',
              borderRadius: 'var(--radius-panel)',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--live)',
                  boxShadow: '0 0 0 4px rgba(229, 72, 77, 0.4)',
                  animation: 'pulse 1.5s infinite',
                }}
              />
              <span style={{ fontWeight: 800, letterSpacing: '0.05em', color: '#ffffff' }}>REC</span>
              <span className="tabular" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--hl)' }}>
                {formatTimecode(elapsed)}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleHighlight}
                style={{ background: 'var(--hl)', color: '#0F2A33', fontWeight: 700, borderColor: 'var(--hl)' }}
              >
                Highlight Moment <Kbd>H</Kbd>
              </Button>

              <Button variant="danger" size="sm" onClick={handleEndCall}>
                End Call & Process Notes
              </Button>
            </div>
          </div>

          {/* Split: Live Transcript Stream & Scratchpad */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Live Transcript Stream */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-panel)', padding: '20px', display: 'flex', flexDirection: 'column', height: '360px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '12px' }}>
                Live Audio Stream
              </h3>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {turns.map((t, idx) => (
                  <div key={idx} style={{ padding: '8px', borderRadius: '6px', background: '#ffffff', border: '1px solid var(--line)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: `var(--speaker-${t.colorIndex})` }}>
                        {t.speaker}
                      </span>
                      <span className="tabular" style={{ fontSize: '10px', color: 'var(--ink-3)' }}>
                        {formatTimecode(t.time)}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--ink)' }}>{t.text}</div>
                  </div>
                ))}

                {turns.length === 0 && (
                  <div style={{ color: 'var(--ink-3)', fontSize: '13px', fontStyle: 'italic', margin: 'auto' }}>
                    Listening to incoming audio stream…
                  </div>
                )}
              </div>
            </div>

            {/* Auto-stamped Scratchpad */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-panel)', padding: '20px', display: 'flex', flexDirection: 'column', height: '360px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                  Scratchpad
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>Press Enter for time-stamp</span>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onKeyDown={handleAddTimestampedNote}
                placeholder="Take personal notes during the call. Press Enter to stamp current timecode…"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid var(--line)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  resize: 'none',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {stage === 'processing' && (
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-panel)',
            padding: '48px 32px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--cue-tint)',
              borderTopColor: 'var(--cue)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <style>{`
            @keyframes spin { 100% { transform: rotate(360deg); } }
            @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
          `}</style>
          <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Processing Meeting Notes</h2>
          <p style={{ color: 'var(--cue)', fontSize: '14px', fontWeight: 600 }}>{processStep}</p>
          <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
            Building receipts, chapter boundaries, and action items…
          </span>
        </div>
      )}

      {stage === 'done' && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ color: 'var(--ok)', marginBottom: '8px' }}>✓ Meeting Ready!</h2>
          <p style={{ color: 'var(--ink-2)' }}>Opening interactive meeting page…</p>
        </div>
      )}
    </div>
  );
};
