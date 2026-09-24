import React from 'react';
import type { ActionItem, Speaker } from '../../data/types';
import { mockRepo } from '../../data/mockRepo';
import { ReceiptChip } from '../ui';
import { useToast } from '../ui/Toast';
import './meeting.css';

export interface ActionItemsTabProps {
  meetingId: string;
  actions: ActionItem[];
  speakers: Speaker[];
  onSeek: (seconds: number) => void;
  onActionsUpdate: (actions: ActionItem[]) => void;
}

export const ActionItemsTab: React.FC<ActionItemsTabProps> = ({
  meetingId,
  actions,
  speakers,
  onSeek,
  onActionsUpdate,
}) => {
  const { toast } = useToast();
  const speakerMap = new Map(speakers.map((s) => [s.id, s]));

  const handleToggle = async (item: ActionItem) => {
    const nextDone = !item.done;
    await mockRepo.toggleAction(meetingId, item.id, nextDone);

    const updated = actions.map((a) =>
      a.id === item.id ? { ...a, done: nextDone } : a
    );
    onActionsUpdate(updated);

    toast({
      message: nextDone ? 'Marked action as complete' : 'Marked action as incomplete',
      actionLabel: 'Undo',
      onAction: async () => {
        await mockRepo.toggleAction(meetingId, item.id, item.done);
        onActionsUpdate(actions);
      },
    });
  };

  return (
    <div style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', flex: 1, overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Action Items ({actions.filter((a) => !a.done).length} open)
        </span>
      </div>

      {actions.map((act) => {
        const owner = act.ownerId ? speakerMap.get(act.ownerId) : undefined;

        return (
          <div key={act.id} className="action-item-row">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1 }}>
              <input
                type="checkbox"
                checked={act.done}
                onChange={() => handleToggle(act)}
                style={{
                  marginTop: '3px',
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--cue)',
                  cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '14px',
                    color: act.done ? 'var(--ink-3)' : 'var(--ink)',
                    textDecoration: act.done ? 'line-through' : 'none',
                    lineHeight: 1.4,
                  }}
                >
                  {act.text}
                </span>

                {owner && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '2px',
                        fontSize: '9px',
                        fontWeight: 700,
                        color: '#ffffff',
                        backgroundColor: `var(--speaker-${owner.colorIndex})`,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {owner.initials}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--ink-2)' }}>
                      {owner.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {act.receipts[0] && (
              <ReceiptChip at={act.receipts[0].at} onClick={(t) => onSeek(t)} />
            )}
          </div>
        );
      })}

      {actions.length === 0 && (
        <div style={{ textAlign: 'center', padding: 'var(--sp-6)', color: 'var(--ink-3)' }}>
          No action items recorded for this meeting.
        </div>
      )}
    </div>
  );
};
