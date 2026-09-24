import React, { useState } from 'react';
import { AppShell } from '../components/shell/AppShell';
import { SUMMARY_TEMPLATES } from '../content/summaryTemplates';
import type { SummaryTemplateItem } from '../content/types';
import { showpieceMeeting } from '../data/seed/showpiece';
import { Button, Chip, ReceiptChip } from '../components/ui';

export const TemplatesBuilderPage: React.FC = () => {
  const [templates, setTemplates] = useState<SummaryTemplateItem[]>(SUMMARY_TEMPLATES);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('standard');
  const [isEditing, setIsEditing] = useState(false);

  const activeTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  // Editable fields
  const [templateName, setTemplateName] = useState(activeTemplate.name);
  const [sections, setSections] = useState(activeTemplate.sections);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplateId(id);
    const tmpl = templates.find((t) => t.id === id) || templates[0];
    setTemplateName(tmpl.name);
    setSections(tmpl.sections);
    setIsEditing(false);
  };

  const handleDuplicate = () => {
    const newId = `custom-${Date.now()}`;
    const duplicate: SummaryTemplateItem = {
      id: newId,
      name: `${activeTemplate.name} (Custom Copy)`,
      audience: activeTemplate.audience,
      tone: activeTemplate.tone,
      description: activeTemplate.description,
      sections: [...activeTemplate.sections],
    };
    setTemplates([...templates, duplicate]);
    setSelectedTemplateId(newId);
    setTemplateName(duplicate.name);
    setSections(duplicate.sections);
    setIsEditing(true);
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        heading: 'New Custom Section',
        instruction: 'Synthesize relevant statements with timecode receipts',
        format: 'bullets',
      },
    ]);
  };

  const handleRemoveSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx));
  };

  const handleUpdateHeading = (idx: number, newHeading: string) => {
    const updated = [...sections];
    updated[idx].heading = newHeading;
    setSections(updated);
  };

  return (
    <AppShell currentTitle="Summary Templates">
      <div style={{ padding: '24px 32px', maxWidth: '1440px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cue)', letterSpacing: '0.04em' }}>
                Summary Templates & Visual Builder
              </span>
              <Chip variant="ok">12 Presets</Chip>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0 0' }}>
              Tailored Executive Summaries with Receipts
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="sm" variant="secondary" onClick={handleDuplicate}>
              Duplicate as Custom Template
            </Button>
            <Button
              size="sm"
              variant={isEditing ? 'primary' : 'ghost'}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Done Editing' : 'Customize Sections'}
            </Button>
          </div>
        </div>

        {/* Two-Column Workspace: Left = Template Library, Right = Live Preview on Flagship Call */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px minmax(0, 1fr)', gap: '24px', alignItems: 'flex-start' }}>
          {/* LEFT: TEMPLATE GALLERY LIST */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px', maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '12px' }}>
              Template Library
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {templates.map((tmpl) => {
                const isSelected = tmpl.id === selectedTemplateId;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => handleSelectTemplate(tmpl.id)}
                    style={{
                      textAlign: 'left',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: isSelected ? '1px solid var(--ink)' : '1px solid transparent',
                      background: isSelected ? 'var(--surface-sunk)' : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>{tmpl.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '2px' }}>{tmpl.audience}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW ON FLAGSHIP SHOWPIECE MEETING */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '28px', minHeight: '620px' }}>
            {/* Meta Header */}
            <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)' }}>
                  Audience: <strong style={{ color: 'var(--ink)' }}>{activeTemplate.audience}</strong> · Tone: <em>{activeTemplate.tone}</em>
                </span>
                <span style={{ fontSize: '11px', background: 'var(--surface-sunk)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--line)' }}>
                  Previewing on: {showpieceMeeting.title}
                </span>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 6px' }}>{activeTemplate.name}</h2>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', margin: 0 }}>{activeTemplate.description}</p>
            </div>

            {/* If in editing mode, show section builder */}
            {isEditing && (
              <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cue)', display: 'block', marginBottom: '4px' }}>
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--line)', fontSize: '14px', fontWeight: 700 }}
                  />
                </div>
                <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cue)', marginBottom: '12px' }}>
                  Section Builder & Instructions
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {sections.map((sec, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', background: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line)' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)' }}>#{idx + 1}</span>
                      <input
                        type="text"
                        value={sec.heading}
                        onChange={(e) => handleUpdateHeading(idx, e.target.value)}
                        style={{ flex: 1, padding: '4px 8px', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}
                      />
                      <select
                        value={sec.format}
                        onChange={(e) => {
                          const updated = [...sections];
                          updated[idx].format = e.target.value as any;
                          setSections(updated);
                        }}
                        style={{ padding: '4px 8px', border: '1px solid var(--line)', borderRadius: '4px', fontSize: '12px' }}
                      >
                        <option value="bullets">Bullets</option>
                        <option value="checklist">Checklist</option>
                        <option value="table">Table</option>
                        <option value="prose">Prose</option>
                      </select>
                      <button
                        onClick={() => handleRemoveSection(idx)}
                        style={{ border: 'none', background: 'transparent', color: 'var(--live)', cursor: 'pointer', fontSize: '14px' }}
                        title="Remove section"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div style={{ marginTop: '8px' }}>
                    <Button size="sm" variant="secondary" onClick={handleAddSection}>
                      + Add New Section
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Rendered Live Fixture Sections with Clickable Audio Receipts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {sections.map((sec, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--cue)', marginBottom: '10px' }}>
                    {sec.heading}
                  </div>

                  {sec.format === 'checklist' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked />
                        <span>Send custom SOC2 compliance package and DPA by Thursday (Assigned: Alex)</span>
                        <ReceiptChip at={2680} speakerInitial="A" />
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input type="checkbox" />
                        <span>Schedule technical deep dive with security architect for Oct 4th at 2pm</span>
                        <ReceiptChip at={3100} speakerInitial="P" />
                      </label>
                    </div>
                  ) : sec.format === 'table' ? (
                    <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', padding: '8px 12px', background: 'var(--line)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                        <div>Criterion</div>
                        <div>Extracted Context</div>
                        <div>Receipt</div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', padding: '8px 12px', fontSize: '13px', borderTop: '1px solid var(--line)', alignItems: 'center' }}>
                        <div><strong>Target Latency</strong></div>
                        <div>Sub-50ms diarization boundary snapping across 8 lanes</div>
                        <div><ReceiptChip at={710} speakerInitial="A" /></div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', padding: '8px 12px', fontSize: '13px', borderTop: '1px solid var(--line)', alignItems: 'center' }}>
                        <div><strong>Commercial Fee</strong></div>
                        <div>Launch usage-based tier at $19/seat with 200 queries</div>
                        <div><ReceiptChip at={420} speakerInitial="P" /></div>
                      </div>
                    </div>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: 1.5 }}>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: 'var(--ink-3)' }}>•</span>
                        <span>
                          Launch usage-based tier at $19/seat with 200 query cap, while grandfathering existing contracts.{' '}
                          <ReceiptChip at={420} speakerInitial="P" />
                        </span>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: 'var(--ink-3)' }}>•</span>
                        <span>
                          Marcus confirmed legacy Fireflies contract expires on November 15th.{' '}
                          <ReceiptChip at={2190} speakerInitial="M" />
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
