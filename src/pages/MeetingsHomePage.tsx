import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRepo } from '../data/mockRepo';
import type { Meeting, ViewFilter } from '../data/types';
import { Button, Chip, Sheet, ReceiptChip, Skeleton, useToast } from '../components/ui';

export const MeetingsHomePage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<ViewFilter>('all');
  const [peekMeeting, setPeekMeeting] = useState<Meeting | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadMeetings = (filter: ViewFilter) => {
    setLoading(true);
    mockRepo
      .listMeetings(filter)
      .then(setMeetings)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMeetings(currentFilter);
  }, [currentFilter]);

  const handleInlineRename = async (id: string, newTitle: string, e: React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
    if (!newTitle.trim()) return;
    await mockRepo.renameMeeting(id, newTitle);
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, title: newTitle } : m))
    );
    toast({ message: 'Meeting title saved' });
  };

  const filteredMeetings = meetings.filter((m) => {
    if (!searchQuery.trim()) return true;
    return (
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.speakers.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const nextUpMeeting = meetings.find((m) => m.status === 'upcoming');

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--sp-6) var(--sp-5)', width: '100%' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--sp-5)' }}>
        <div>
          <h1 tabIndex={-1} style={{ fontSize: 'var(--text-3xl)', letterSpacing: '-0.02em', marginBottom: 'var(--sp-1)' }}>
            Meetings
          </h1>
          <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-sm)' }}>
            All your captured conversations, chaptered and receipt-verified.
          </p>
        </div>

        <Button variant="primary" onClick={() => navigate('/live')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          Join & Record Live
        </Button>
      </div>

      {/* Next Up Card */}
      {nextUpMeeting && (
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-panel)',
            padding: 'var(--sp-4) var(--sp-5)',
            marginBottom: 'var(--sp-5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(15,42,51,0.04)',
          }}
          aria-label="Next upcoming meeting"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--cue-tint)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--cue)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cue)', textTransform: 'uppercase' }}>
                  Next up
                </span>
                <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>in 25 minutes · 10:30 AM</span>
              </div>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--ink)' }}>
                {nextUpMeeting.title}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button size="sm" variant="secondary" onClick={() => navigate('/live')}>
              Simulate Bot Join
            </Button>
            <Button size="sm" variant="primary" onClick={() => navigate('/live')}>
              Join and record
            </Button>
          </div>
        </section>
      )}

      {/* Filter Views & Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--sp-3)',
          marginBottom: 'var(--sp-4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'needs-actions', label: 'Needs my actions' },
            { id: 'shared-with-me', label: 'Shared with me' },
            { id: 'many-speakers', label: '8+ people' },
            { id: 'long', label: 'Long (>40m)' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              className={`btn btn-sm ${currentFilter === f.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setCurrentFilter(f.id as ViewFilter)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter meetings by title or attendee…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '6px 12px',
            fontSize: '13px',
            borderRadius: 'var(--radius-control)',
            border: '1px solid var(--line)',
            background: 'var(--surface)',
            minWidth: '240px',
          }}
        />
      </div>

      {/* Meeting Rows List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-2)',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-panel)',
          overflow: 'hidden',
        }}
        role="feed"
        aria-label="Meeting recordings list"
      >
        {loading ? (
          <div style={{ padding: 'var(--sp-5)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            <Skeleton width="100%" height={48} />
            <Skeleton width="100%" height={48} />
            <Skeleton width="100%" height={48} />
          </div>
        ) : filteredMeetings.length === 0 ? (
          <div style={{ padding: 'var(--sp-8)', textAlign: 'center', color: 'var(--ink-2)' }}>
            No meetings match this filter. Try selecting "All".
          </div>
        ) : (
          filteredMeetings.map((m) => {
            const isProcessing = m.status === 'processing';
            const isUpcoming = m.status === 'upcoming';
            const firstSnippet = m.summary?.catchUp[0]?.text;

            return (
              <div
                key={m.id}
                onClick={() => {
                  if (!isUpcoming) navigate(`/meetings/${m.id}`);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--sp-3) var(--sp-4)',
                  borderBottom: '1px solid rgba(15,42,51,0.06)',
                  cursor: isUpcoming ? 'default' : 'pointer',
                  transition: 'background var(--duration-fast) var(--ease)',
                }}
                onMouseEnter={(e) => {
                  if (!isUpcoming) e.currentTarget.style.backgroundColor = 'var(--surface-sunk)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                role="article"
                aria-label={`Meeting: ${m.title}`}
              >
                {/* Left Title & Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flex: 1, minWidth: 0 }}>
                  {/* Status Indicator */}
                  {isProcessing ? (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--warn)',
                        background: '#fff8e6',
                        border: '1px solid #ffd880',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--warn)' }} />
                      {m.stage === 'transcribing' ? 'Transcribing…' : 'Summarizing…'}
                    </span>
                  ) : isUpcoming ? (
                    <Chip variant="default">Upcoming</Chip>
                  ) : (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--ok)',
                      }}
                      title="Ready"
                    />
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        defaultValue={m.title}
                        onClick={(e) => e.stopPropagation()}
                        onBlur={(e) => handleInlineRename(m.id, e.target.value, e)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') e.currentTarget.blur();
                        }}
                        style={{
                          fontWeight: 700,
                          fontSize: '14px',
                          color: 'var(--ink)',
                          background: 'transparent',
                          border: '1px solid transparent',
                          borderRadius: '4px',
                          padding: '1px 4px',
                          cursor: 'text',
                        }}
                        title="Click to rename"
                      />
                      {m.isSample && <Chip variant="cue">Sample</Chip>}
                      {m.sharedBy && (
                        <span style={{ fontSize: '11px', color: 'var(--ink-3)' }}>
                          Shared by {m.sharedBy}
                        </span>
                      )}
                    </div>

                    {firstSnippet && !isProcessing && (
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--ink-2)',
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '650px',
                        }}
                      >
                        {firstSnippet}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Meta & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', flexShrink: 0 }}>
                  {/* Speakers Avatars */}
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '4px' }}>
                    {m.speakers.slice(0, 4).map((spk, idx) => (
                      <span
                        key={spk.id}
                        className="speaker-avatar"
                        style={{
                          backgroundColor: `var(--speaker-${spk.colorIndex})`,
                          marginLeft: idx > 0 ? '-4px' : '0',
                          border: '2px solid #ffffff',
                          width: '22px',
                          height: '22px',
                          fontSize: '9px',
                        }}
                        title={spk.name}
                      >
                        {spk.initials}
                      </span>
                    ))}
                    {m.speakers.length > 4 && (
                      <span
                        style={{
                          fontSize: '11px',
                          color: 'var(--ink-3)',
                          marginLeft: '4px',
                          fontWeight: 600,
                        }}
                      >
                        +{m.speakers.length - 4}
                      </span>
                    )}
                  </div>

                  <span className="tabular" style={{ fontSize: '12px', color: 'var(--ink-3)', minWidth: '45px' }}>
                    {m.duration > 0 ? `${Math.round(m.duration / 60)}m` : '—'}
                  </span>

                  {/* Peek Drawer Button */}
                  {!isUpcoming && (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPeekMeeting(m);
                      }}
                      title="Quick Peek"
                      aria-label="Peek meeting details"
                    >
                      Peek
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Peek Side Drawer */}
      <Sheet
        isOpen={Boolean(peekMeeting)}
        onClose={() => setPeekMeeting(null)}
        title={peekMeeting?.title || 'Meeting Peek'}
      >
        {peekMeeting && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="tabular" style={{ fontSize: '13px', color: 'var(--ink-2)' }}>
                {Math.round(peekMeeting.duration / 60)} minutes · {peekMeeting.speakers.length} attendees
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Attendees ({peekMeeting.speakers.length})
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {peekMeeting.speakers.map((s) => (
                  <span
                    key={s.id}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'var(--surface-sunk)',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: `var(--speaker-${s.colorIndex})`,
                      }}
                    />
                    {s.name} ({s.talkPct}%)
                  </span>
                ))}
              </div>
            </div>

            {peekMeeting.summary && (
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  60-Second Catch-up
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {peekMeeting.summary.catchUp.map((b) => (
                    <div key={b.id} style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--ink)' }}>
                      • {b.text}
                      {b.receipts[0] && <ReceiptChip at={b.receipts[0].at} />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {peekMeeting.actions.length > 0 && (
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Action Items ({peekMeeting.actions.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {peekMeeting.actions.map((act) => (
                    <div key={act.id} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="checkbox" checked={act.done} readOnly style={{ accentColor: 'var(--cue)' }} />
                      <span>{act.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 'auto', paddingTop: 'var(--sp-4)' }}>
              <Button
                variant="primary"
                style={{ width: '100%' }}
                onClick={() => {
                  const mId = peekMeeting.id;
                  setPeekMeeting(null);
                  navigate(`/meetings/${mId}`);
                }}
              >
                Open Full Interactive Meeting →
              </Button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
};
