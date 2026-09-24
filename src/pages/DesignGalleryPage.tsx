import React, { useState } from 'react';
import {
  Button,
  Chip,
  Kbd,
  ReceiptChip,
  SpeakerChip,
  Skeleton,
  SegmentedControl,
  Tabs,
  Dialog,
  Sheet,
  useToast,
} from '../components/ui';
import type { Speaker } from '../data/types';

export const DesignGalleryPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('primitives');
  const [segmentedVal, setSegmentedVal] = useState('catchup');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const sampleSpeakers: Speaker[] = [
    { id: '1', name: 'Priya Sharma', initials: 'PS', colorIndex: 1, talkPct: 28, named: true },
    { id: '2', name: 'Marcus Chen', initials: 'MC', colorIndex: 2, talkPct: 22, named: true },
    { id: '3', name: 'You', initials: 'Y', colorIndex: 3, talkPct: 18, named: true, isYou: true },
    { id: '4', name: 'Aisha Okonkwo', initials: 'AO', colorIndex: 4, talkPct: 12, named: true },
    { id: '5', name: 'Tom Eriksen', initials: 'TE', colorIndex: 5, talkPct: 8, named: true },
    { id: '6', name: 'Speaker 6', initials: 'S6', colorIndex: 6, talkPct: 5, named: false },
    { id: '7', name: 'Speaker 7', initials: 'S7', colorIndex: 7, talkPct: 4, named: false },
    { id: '8', name: 'Speaker 8', initials: 'S8', colorIndex: 8, talkPct: 3, named: false },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'var(--sp-6) var(--sp-4)' }}>
      <header style={{ marginBottom: 'var(--sp-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: 'var(--sp-2)' }}>
          <Chip variant="cue">Design System</Chip>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>QA Harness · /dev/design</span>
        </div>
        <h1 tabIndex={-1} style={{ fontSize: 'var(--text-3xl)', letterSpacing: '-0.02em', marginBottom: 'var(--sp-2)' }}>
          Component Gallery & Tokens
        </h1>
        <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-base)' }}>
          Living specification of tokens, broadcast edit-suite visual language, receipts, and UI primitives.
        </p>
      </header>

      <div style={{ marginBottom: 'var(--sp-6)' }}>
        <Tabs
          tabs={[
            { id: 'primitives', label: 'UI Primitives' },
            { id: 'receipts', label: 'Receipts & Speakers' },
            { id: 'states', label: 'States & Skeletons' },
            { id: 'tokens', label: 'Color Tokens' },
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {activeTab === 'primitives' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          {/* Buttons */}
          <section style={{ background: 'var(--surface)', padding: 'var(--sp-5)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-4)' }}>Buttons & Controls</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', alignItems: 'center' }}>
              <Button variant="primary">Primary Cue</Button>
              <Button variant="secondary">Secondary Default</Button>
              <Button variant="subtle">Subtle Action</Button>
              <Button variant="ghost">Ghost Option</Button>
              <Button variant="danger">Destructive</Button>
              <Button size="sm" variant="secondary">Small Control</Button>
              <Button disabled variant="primary">Disabled</Button>
            </div>
          </section>

          {/* Segmented Control & Kbd */}
          <section style={{ background: 'var(--surface)', padding: 'var(--sp-5)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-4)' }}>Segmented Controls & Keyboard Glyphs</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-5)', flexWrap: 'wrap' }}>
              <SegmentedControl
                value={segmentedVal}
                onChange={setSegmentedVal}
                options={[
                  { value: 'catchup', label: '60-second catch-up' },
                  { value: 'full', label: 'Full notes' },
                  { value: 'actions', label: 'Action items' },
                ]}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-2)' }}>Shortcuts:</span>
                <Kbd>Space</Kbd>
                <Kbd>H</Kbd>
                <Kbd>⌘K</Kbd>
                <Kbd>J / L</Kbd>
              </div>
            </div>
          </section>

          {/* Feedback & Modals */}
          <section style={{ background: 'var(--surface)', padding: 'var(--sp-5)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-4)' }}>Feedback & Overlays</h2>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
              <Button
                variant="secondary"
                onClick={() => {
                  toast({
                    message: 'Highlighted at 12:41',
                    actionLabel: 'Undo',
                    onAction: () => alert('Undo clicked!'),
                  });
                }}
              >
                Trigger Toast with Undo
              </Button>
              <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
                Open Modal Dialog
              </Button>
              <Button variant="secondary" onClick={() => setIsSheetOpen(true)}>
                Open Slide Sheet
              </Button>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'receipts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          {/* Speaker Palette */}
          <section style={{ background: 'var(--surface)', padding: 'var(--sp-5)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-3)' }}>8-Speaker Palette</h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', marginBottom: 'var(--sp-4)' }}>
              Distinct accessible hues paired with initials and talk-time percentage.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              {sampleSpeakers.map((spk) => (
                <SpeakerChip key={spk.id} speaker={spk} />
              ))}
            </div>
          </section>

          {/* Receipts */}
          <section style={{ background: 'var(--surface)', padding: 'var(--sp-5)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-3)' }}>Timecode Receipts</h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', marginBottom: 'var(--sp-4)' }}>
              Every AI summary bullet & action item carries clickable receipts linking directly to the speech moment.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                <span style={{ fontSize: 'var(--text-sm)' }}>Standalone timecode:</span>
                <ReceiptChip at={360} onClick={(t) => alert(`Seek to ${t}s`)} />
                <ReceiptChip at={1245} onClick={(t) => alert(`Seek to ${t}s`)} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                <span style={{ fontSize: 'var(--text-sm)' }}>With speaker attribution:</span>
                <ReceiptChip at={790} speakerInitial="P" speakerColorIndex={1} onClick={(t) => alert(`Seek to ${t}s`)} />
                <ReceiptChip at={1880} speakerInitial="M" speakerColorIndex={2} onClick={(t) => alert(`Seek to ${t}s`)} />
                <ReceiptChip at={2610} speakerInitial="T" speakerColorIndex={5} onClick={(t) => alert(`Seek to ${t}s`)} />
              </div>

              <div style={{ padding: 'var(--sp-3)', background: 'var(--surface-sunk)', borderRadius: 'var(--radius-control)', marginTop: 'var(--sp-2)' }}>
                <p style={{ fontFamily: 'var(--font-prose)', fontSize: 'var(--text-base)', lineHeight: 1.6 }}>
                  "Priya proposed 3 tiers: Free remains unlimited, usage-based introduces 200 Ask queries at $19/seat
                  <ReceiptChip at={420} speakerInitial="P" speakerColorIndex={1} onClick={(t) => alert(`Jumped to ${t}s`)} />
                  and enterprise contracts remain grandfathered until renewal
                  <ReceiptChip at={630} speakerInitial="P" speakerColorIndex={1} onClick={(t) => alert(`Jumped to ${t}s`)} />."
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'states' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          <section style={{ background: 'var(--surface)', padding: 'var(--sp-5)', borderRadius: 'var(--radius-panel)', border: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--sp-4)' }}>Skeletons (Exact Dimension Matching)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              <Skeleton width="100%" height={160} style={{ borderRadius: 'var(--radius-panel)' }} />
              <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
                <Skeleton width="30%" height={24} />
                <Skeleton width="45%" height={24} />
                <Skeleton width="20%" height={24} />
              </div>
              <Skeleton width="100%" height={18} />
              <Skeleton width="85%" height={18} />
              <Skeleton width="60%" height={18} />
            </div>
          </section>
        </div>
      )}

      {activeTab === 'tokens' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--sp-3)' }}>
          {[
            { name: 'Canvas (Bone Grey)', value: '#E8ECEA', varName: '--canvas' },
            { name: 'Surface (White Tape)', value: '#F8FAF9', varName: '--surface' },
            { name: 'Surface Sunk (Gaffer)', value: '#DDE3E0', varName: '--surface-sunk' },
            { name: 'Ink (Deep Sea)', value: '#0F2A33', varName: '--ink' },
            { name: 'Cue (Ultramarine)', value: '#2B3FE0', varName: '--cue' },
            { name: 'Highlight (Marker)', value: '#FFC629', varName: '--hl' },
            { name: 'Live (Tally Dot)', value: '#E5484D', varName: '--live' },
          ].map((t) => (
            <div
              key={t.name}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-panel)',
                padding: 'var(--sp-3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ height: '48px', borderRadius: '4px', background: `var(${t.varName})`, border: '1px solid rgba(0,0,0,0.06)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>{t.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--ink-3)', fontFamily: 'monospace' }}>{t.varName} · {t.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Test Dialog Primitive">
        <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-4)' }}>
          This dialog traps focus, supports Escape, and announces properly for assistive technology.
        </p>
        <Button variant="primary" onClick={() => setIsDialogOpen(false)}>
          Got it
        </Button>
      </Dialog>

      <Sheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} title="Test Slide Sheet">
        <p style={{ color: 'var(--ink-2)', fontSize: 'var(--text-sm)' }}>
          Sheet slide-over drawer for mobile Score inspection and peek details.
        </p>
      </Sheet>
    </div>
  );
};
