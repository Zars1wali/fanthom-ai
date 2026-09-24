import React, { useState } from 'react';
import type { Meeting, Summary, Bullet } from '../../data/types';
import { mockRepo } from '../../data/mockRepo';
import { ReceiptChip, SegmentedControl, Button } from '../ui';
import { useToast } from '../ui/Toast';
import './meeting.css';

export interface SummaryPanelProps {
  meeting: Meeting;
  onSeek: (seconds: number) => void;
  onSummaryUpdate: (updated: Summary) => void;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  meeting,
  onSeek,
  onSummaryUpdate,
}) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'catchup' | 'full'>('catchup');
  const [editingBulletId, setEditingBulletId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isSwitching, setIsSwitching] = useState(false);

  const summary = meeting.summary || {
    template: 'Standard',
    catchUp: [],
    sections: [],
  };

  const templates = ['Standard', 'Executive', 'Sales Discovery'];

  const handleTemplateChange = async (newTemplate: string) => {
    if (newTemplate === summary.template) return;
    setIsSwitching(true);
    try {
      const res = await mockRepo.switchTemplate(meeting.id, newTemplate);
      onSummaryUpdate(res);
      toast({
        message: `Switched template to ${newTemplate}`,
        duration: 3000,
      });
    } finally {
      setIsSwitching(false);
    }
  };

  const handleStartEdit = (bullet: Bullet) => {
    setEditingBulletId(bullet.id);
    setEditText(bullet.text);
  };

  const handleSaveEdit = async (bulletId: string) => {
    if (!editText.trim()) return;
    await mockRepo.editBullet(meeting.id, bulletId, editText);
    // Optimistic update
    const updated = JSON.parse(JSON.stringify(summary)) as Summary;
    for (const b of updated.catchUp) {
      if (b.id === bulletId) {
        b.text = editText;
        b.edited = true;
      }
    }
    for (const sec of updated.sections) {
      for (const b of sec.bullets) {
        if (b.id === bulletId) {
          b.text = editText;
          b.edited = true;
        }
      }
    }
    onSummaryUpdate(updated);
    setEditingBulletId(null);
    toast({ message: 'Bullet updated', duration: 3000 });
  };

  const handleFlagBullet = async (bulletId: string) => {
    await mockRepo.flagBullet(meeting.id, bulletId, 'Inaccurate summary line');
    toast({
      message: 'Reported: this note has been flagged for review',
      actionLabel: 'Undo',
      onAction: () => toast({ message: 'Flag removed' }),
    });
  };

  const handleCopyMarkdown = () => {
    let md = `# ${meeting.title} — Summary\n\n`;
    md += `## 60-Second Catch-up\n`;
    for (const b of summary.catchUp) {
      md += `- ${b.text}\n`;
    }
    for (const sec of summary.sections) {
      md += `\n## ${sec.heading}\n`;
      for (const b of sec.bullets) {
        md += `- ${b.text}\n`;
      }
    }
    navigator.clipboard?.writeText(md);
    toast({ message: 'Summary copied to clipboard as Markdown', duration: 3000 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Top Template Bar */}
      <div
        style={{
          padding: 'var(--sp-3) var(--sp-4)',
          borderBottom: '1px solid var(--line)',
          background: 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          <span style={{ fontSize: '11px', color: 'var(--ink-3)', fontWeight: 600 }}>Template:</span>
          <select
            value={summary.template}
            onChange={(e) => handleTemplateChange(e.target.value)}
            disabled={isSwitching}
            style={{
              padding: '3px 8px',
              fontSize: '12px',
              borderRadius: 'var(--radius-control)',
              border: '1px solid var(--line)',
              background: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {templates.map((tpl) => (
              <option key={tpl} value={tpl}>
                {tpl}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          <SegmentedControl
            value={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'catchup', label: 'Catch-up' },
              { value: 'full', label: 'Full notes' },
            ]}
          />
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleCopyMarkdown}
            title="Copy as Markdown"
            aria-label="Copy summary as Markdown"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Summary Content Body */}
      <div className="summary-tab-content">
        {/* 60-second catch-up */}
        <div>
          <h3
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--ink-3)',
              marginBottom: 'var(--sp-3)',
              fontWeight: 700,
            }}
          >
            60-Second Catch-up
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            {summary.catchUp.map((bullet) => (
              <div key={bullet.id} className="summary-bullet-item">
                <span className="summary-bullet-bullet">•</span>

                {editingBulletId === bullet.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{
                        padding: '6px',
                        fontSize: '14px',
                        borderRadius: '4px',
                        border: '1px solid var(--cue)',
                        fontFamily: 'inherit',
                      }}
                      rows={3}
                    />
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <Button size="sm" variant="primary" onClick={() => handleSaveEdit(bullet.id)}>
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingBulletId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div style={{ flex: 1 }}>
                    <span>{bullet.text}</span>
                    {bullet.edited && (
                      <span style={{ fontSize: '10px', color: 'var(--ink-3)', marginLeft: 6 }}>
                        (edited)
                      </span>
                    )}
                    {bullet.receipts.map((r, i) => (
                      <ReceiptChip
                        key={i}
                        at={r.at}
                        speakerInitial="P"
                        onClick={(t) => onSeek(t)}
                      />
                    ))}

                    <div className="bullet-actions-trigger" style={{ display: 'inline-flex', gap: 6, marginLeft: 8 }}>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(bullet)}
                        style={{ fontSize: '11px', color: 'var(--ink-3)' }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFlagBullet(bullet.id)}
                        style={{ fontSize: '11px', color: 'var(--ink-3)' }}
                        title="Flag inaccurate line"
                      >
                        Flag
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Sections (shown in Full notes mode) */}
        {viewMode === 'full' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
            {summary.sections.map((sec, sIdx) => (
              <div key={sIdx}>
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    marginBottom: 'var(--sp-2)',
                  }}
                >
                  {sec.heading}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                  {sec.bullets.map((b) => (
                    <div key={b.id} className="summary-bullet-item">
                      <span className="summary-bullet-bullet">•</span>
                      <div style={{ flex: 1 }}>
                        <span>{b.text}</span>
                        {b.receipts.map((r, i) => (
                          <ReceiptChip
                            key={i}
                            at={r.at}
                            onClick={(t) => onSeek(t)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
