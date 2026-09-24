import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { CAREER_OPENINGS } from '../content/careers';
import { Button, Chip, Dialog } from '../components/ui';

export const CareersPage: React.FC = () => {
  const { role } = useParams<{ role?: string }>();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedRoleTitle, setSelectedRoleTitle] = useState('');
  const [applied, setApplied] = useState(false);

  const activeOpening = role ? CAREER_OPENINGS.find((c) => c.slug === role) : null;

  const handleApplyClick = (title: string) => {
    setSelectedRoleTitle(title);
    setIsApplyModalOpen(true);
    setApplied(false);
  };

  return (
    <SiteShell
      currentSection="resources"
      breadcrumbs={[{ label: 'Careers', path: '/careers' }, ...(activeOpening ? [{ label: activeOpening.title }] : [])]}
    >
      <div style={{ maxWidth: '960px', margin: '48px auto', padding: '0 24px' }}>
        {activeOpening ? (
          /* SINGLE ROLE DETAIL VIEW */
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Chip variant="cue">{activeOpening.department}</Chip>
                <span style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{activeOpening.location} · {activeOpening.type}</span>
              </div>
              <h1 style={{ fontSize: '38px', fontWeight: 800, margin: '0 0 16px' }}>{activeOpening.title}</h1>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.6 }}>{activeOpening.overview}</p>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Key Responsibilities</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeOpening.responsibilities.map((r, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: 'var(--ink-2)' }}>
                    <span style={{ color: 'var(--ok)', fontWeight: 800 }}>✓</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Qualifications</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeOpening.qualifications.map((q, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: 'var(--ink-2)' }}>
                    <span style={{ color: 'var(--ink-3)' }}>•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button size="lg" variant="primary" onClick={() => handleApplyClick(activeOpening.title)}>
                Apply for this Position (Sample) →
              </Button>
              <Link to="/careers">
                <Button size="lg" variant="ghost">← Back to All Roles</Button>
              </Link>
            </div>
          </div>
        ) : (
          /* CAREERS HUB & OPENINGS LIST */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <Chip variant="cue">Engineering & Design</Chip>
              <h1 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', margin: '12px auto 16px' }}>
                Build the Future of Truthful Meeting AI
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--ink-2)', maxWidth: '620px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                We are building the conversational intelligence layer for high-performance teams. Work on real-time acoustic models, 60fps player ergonomics, and scalable CRM integrations.
              </p>
              <div style={{ fontSize: '12px', color: 'var(--ink-3)', background: 'var(--surface-sunk)', padding: '6px 14px', borderRadius: '4px', display: 'inline-block' }}>
                Notice: All job listings shown below are illustrative Sample positions for the rebuild demonstration.
              </div>
            </div>

            {/* Openings Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '64px' }}>
              {CAREER_OPENINGS.map((op) => (
                <div
                  key={op.slug}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '14px',
                    padding: '28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <div style={{ maxWidth: '580px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cue)', textTransform: 'uppercase' }}>
                        {op.department}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>• {op.location}</span>
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>
                      {op.title}
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--ink-2)', margin: 0, lineHeight: 1.4 }}>
                      {op.overview}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/careers/${op.slug}`}>
                      <Button size="sm" variant="secondary">View Details</Button>
                    </Link>
                    <Button size="sm" variant="primary" onClick={() => handleApplyClick(op.title)}>
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Apply Dialog Modal */}
        <Dialog
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title={`Apply for ${selectedRoleTitle} (Sample)`}
        >
          {applied ? (
            <div style={{ padding: '16px 0', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>Sample Application Submitted</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-2)', marginTop: '6px' }}>
                Thank you for exploring our careers flow. This is a design demonstration modal.
              </p>
              <Button size="sm" variant="secondary" onClick={() => setIsApplyModalOpen(false)} style={{ marginTop: '16px' }}>
                Close
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setApplied(true);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '8px 0' }}
            >
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input required type="text" placeholder="Your name" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email</label>
                <input required type="email" placeholder="you@domain.com" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>GitHub or Portfolio URL</label>
                <input required type="url" placeholder="https://github.com/..." style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <Button size="sm" variant="ghost" onClick={() => setIsApplyModalOpen(false)}>Cancel</Button>
                <Button size="sm" variant="primary" type="submit">Submit Application</Button>
              </div>
            </form>
          )}
        </Dialog>
      </div>
    </SiteShell>
  );
};
