import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, useToast } from '../components/ui';

interface CalendarEvent {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  link: string;
  platform: 'zoom' | 'meet' | 'teams';
  record: boolean;
  attendees: Array<{ name: string; email: string }>;
}

export const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [calendarConnected, setCalendarConnected] = useState(true);
  const [activeRule, setActiveRule] = useState<'all' | 'external' | 'manual'>('external');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/calendar')
      .then((r) => r.json())
      .then((data: CalendarEvent[]) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Failed to load calendar events from API, using fallback:', err);
        setEvents([
          {
            id: 'cal-1',
            title: 'Weekly Leadership Standup (Internal)',
            startsAt: new Date(Date.now() + 1800000).toISOString(),
            endsAt: new Date(Date.now() + 3600000).toISOString(),
            link: 'https://meet.google.com/abc-xyz-123',
            platform: 'meet',
            record: false,
            attendees: [
              { name: 'Alex Rivera', email: 'alex@acme.corp' },
              { name: 'Sarah Chen', email: 'sarah@acme.corp' },
            ],
          },
          {
            id: 'cal-2',
            title: 'Enterprise Pipeline Review & Demo (Prospect Call)',
            startsAt: new Date(Date.now() + 7200000).toISOString(),
            endsAt: new Date(Date.now() + 10800000).toISOString(),
            link: 'https://zoom.us/j/9876543210',
            platform: 'zoom',
            record: true,
            attendees: [
              { name: 'Marcus Vance', email: 'marcus@acme.corp' },
              { name: 'David K. (Prospect)', email: 'david@finscale.ai' },
            ],
          },
          {
            id: 'cal-3',
            title: 'Customer Onboarding: FinScale AI Architecture Review',
            startsAt: new Date(Date.now() + 86400000).toISOString(),
            endsAt: new Date(Date.now() + 90000000).toISOString(),
            link: 'https://teams.microsoft.com/l/meetup-join/12345',
            platform: 'teams',
            record: true,
            attendees: [
              { name: 'Sarah Chen', email: 'sarah@acme.corp' },
              { name: 'Elena Rostova', email: 'elena@acme.corp' },
              { name: 'External Engineers (4)', email: 'team@finscale.ai' },
            ],
          },
        ]);
        setLoading(false);
      });
  }, []);

  const handleToggleRecord = async (eventId: string, currentRecord: boolean) => {
    const nextRecord = !currentRecord;
    setEvents((prev) =>
      prev.map((ev) => (ev.id === eventId ? { ...ev, record: nextRecord } : ev))
    );

    try {
      await fetch(`/api/calendar/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ record: nextRecord }),
      });
      toast({
        message: nextRecord
          ? 'Notetaker set to automatically join and record'
          : 'Recording disabled for this meeting',
      });
    } catch {
      toast({
        message: nextRecord ? 'Recording scheduled (offline)' : 'Recording disabled (offline)',
      });
    }
  };

  const handleStartSelfTest = () => {
    navigate('/live');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'var(--sp-6) var(--sp-4)', width: '100%' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-5)', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: calendarConnected ? 'var(--ok)' : 'var(--ink-3)' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-2)' }}>
              {calendarConnected ? 'Google Calendar Connected (alex@acme.corp)' : 'No Calendar Connected'}
            </span>
          </div>
          <h1 tabIndex={-1} style={{ fontSize: 'var(--text-3xl)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Calendar & Recording Rules
          </h1>
          <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-base)', maxWidth: '640px' }}>
            Fathom monitors your connected calendar and joins meetings based on your natural language recording rules. You can override recording settings per meeting at any time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button variant="secondary" onClick={() => setCalendarConnected(!calendarConnected)}>
            {calendarConnected ? 'Disconnect' : 'Connect Calendar'}
          </Button>
          <Button variant="primary" onClick={handleStartSelfTest}>
            Start 2-Min Self-Test Call →
          </Button>
        </div>
      </div>

      {/* Recording Rules Panel */}
      <div
        style={{
          background: 'var(--tape)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--rad-md)',
          padding: 'var(--sp-4)',
          marginBottom: 'var(--sp-5)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Automated Recording Rule</h2>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', margin: 0 }}>
              Defines default behavior when calendar invites are detected.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Button
              variant={activeRule === 'external' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveRule('external');
                toast({ message: 'Rule updated: Only record meetings with external clients' });
              }}
            >
              External Only
            </Button>
            <Button
              variant={activeRule === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveRule('all');
                toast({ message: 'Rule updated: Record all meetings' });
              }}
            >
              Record All
            </Button>
            <Button
              variant={activeRule === 'manual' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveRule('manual');
                toast({ message: 'Rule updated: Never record automatically (manual toggle only)' });
              }}
            >
              Manual Only
            </Button>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--ink-1)', background: 'var(--canvas)', padding: '10px 14px', borderRadius: 'var(--rad-sm)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--cue)', fontWeight: 600 }}>Active Policy:</span>
          {activeRule === 'external' && 'Record meetings when at least one participant has an external domain. Automatically skip internal 1:1s and private personal blocks.'}
          {activeRule === 'all' && 'Join and record every scheduled meeting on Google Calendar.'}
          {activeRule === 'manual' && 'Never record unless explicitly toggled on individual calendar invites below.'}
        </div>
      </div>

      {/* Upcoming Meetings List */}
      <div style={{ marginBottom: 'var(--sp-6)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--sp-3)' }}>
          Upcoming Calendar Invites ({events.length})
        </h2>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--ink-3)' }}>Loading calendar events…</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {events.map((ev) => {
              const startDate = new Date(ev.startsAt);
              const isExternal = ev.attendees.some((a) => !a.email.endsWith('@acme.corp'));

              return (
                <div
                  key={ev.id}
                  style={{
                    background: 'var(--tape)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--rad-md)',
                    padding: 'var(--sp-4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: '1 1 360px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <Chip variant="default">{ev.platform.toUpperCase()}</Chip>
                      {isExternal ? (
                        <Chip variant="ok">External Prospect</Chip>
                      ) : (
                        <Chip variant="default">Internal Team</Chip>
                      )}
                      <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
                        {startDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} at{' '}
                        {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{ev.title}</h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--ink-2)' }}>
                      <span>Attendees ({ev.attendees.length}): {ev.attendees.map((a) => a.name).join(', ')}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: ev.record ? 'var(--cue)' : 'var(--ink-3)',
                        userSelect: 'none',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={ev.record}
                        onChange={() => handleToggleRecord(ev.id, ev.record)}
                        style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: 'var(--cue)' }}
                      />
                      {ev.record ? 'Record: ON' : 'Record: OFF'}
                    </label>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        navigate(`/live?url=${encodeURIComponent(ev.link)}&title=${encodeURIComponent(ev.title)}`);
                      }}
                    >
                      Join & Test Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fast Demo Banner */}
      <div
        style={{
          background: 'var(--canvas)',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--rad-md)',
          padding: 'var(--sp-4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>Want to see what happens after recording?</h4>
          <p style={{ fontSize: '13px', color: 'var(--ink-2)', margin: 0 }}>
            Inspect our flagship 58-minute 8-person call with The Score, talk-time metrics, and verified receipts.
          </p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/meetings/mtg-q3-roadmap')}>
          Open Flagship 8-Person Call →
        </Button>
      </div>
    </div>
  );
};
