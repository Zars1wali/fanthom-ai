import React, { useState } from 'react';
import type { Meeting } from '../../data/types';
import { mockRepo } from '../../data/mockRepo';
import { Dialog, Button, formatTimecode } from '../ui';
import { useToast } from '../ui/Toast';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  meeting: Meeting;
  initialClipRange?: { start: number; end: number } | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  meeting,
  initialClipRange,
}) => {
  const { toast } = useToast();
  const [shareType, setShareType] = useState<'meeting' | 'clip'>(
    initialClipRange ? 'clip' : 'meeting'
  );
  const [access, setAccess] = useState<'anyone' | 'workspace'>('anyone');
  const [includeTranscript, setIncludeTranscript] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [clipTitle, setClipTitle] = useState(
    initialClipRange ? `Clip from ${meeting.title}` : ''
  );
  const [clipStart, setClipStart] = useState(initialClipRange?.start || 0);
  const [clipEnd, setClipEnd] = useState(initialClipRange?.end || 60);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreateShare = async () => {
    setIsGenerating(true);
    try {
      let target: { clipId?: string; meetingId?: string } = { meetingId: meeting.id };

      if (shareType === 'clip') {
        const clip = await mockRepo.createClip(meeting.id, clipStart, clipEnd, clipTitle);
        target = { clipId: clip.id };
      }

      const link = await mockRepo.createShare(target, {
        access,
        includeTranscript,
        includeSummary,
      });

      const fullUrl = `${window.location.origin}${link.url}`;
      setGeneratedLink(fullUrl);
      navigator.clipboard?.writeText(fullUrl);
      toast({ message: 'Public link copied to clipboard!', duration: 4000 });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={shareType === 'clip' ? 'Share a Clip' : 'Share Meeting'}
      maxWidth="540px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        {/* Toggle Share Type */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className={`btn btn-sm ${shareType === 'meeting' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShareType('meeting')}
          >
            Full Meeting
          </button>
          <button
            type="button"
            className={`btn btn-sm ${shareType === 'clip' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShareType('clip')}
          >
            Trimmed Clip
          </button>
        </div>

        {/* Clip Trim Inputs */}
        {shareType === 'clip' && (
          <div style={{ background: 'var(--surface-sunk)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-control)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600 }}>Clip Title:</label>
            <input
              type="text"
              value={clipTitle}
              onChange={(e) => setClipTitle(e.target.value)}
              placeholder="e.g. Key pricing decision"
              style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid var(--line)' }}
            />

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--ink-3)' }}>Start (seconds):</label>
                <input
                  type="number"
                  value={clipStart}
                  onChange={(e) => setClipStart(Number(e.target.value))}
                  style={{ width: '80px', padding: '4px 6px', borderRadius: '4px', border: '1px solid var(--line)' }}
                />
                <span className="tabular" style={{ fontSize: '11px', marginLeft: '6px', color: 'var(--ink-2)' }}>
                  ({formatTimecode(clipStart)})
                </span>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--ink-3)' }}>End (seconds):</label>
                <input
                  type="number"
                  value={clipEnd}
                  onChange={(e) => setClipEnd(Number(e.target.value))}
                  style={{ width: '80px', padding: '4px 6px', borderRadius: '4px', border: '1px solid var(--line)' }}
                />
                <span className="tabular" style={{ fontSize: '11px', marginLeft: '6px', color: 'var(--ink-2)' }}>
                  ({formatTimecode(clipEnd)})
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Permissions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>Access:</label>
          <div style={{ display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="access"
                checked={access === 'anyone'}
                onChange={() => setAccess('anyone')}
              />
              Anyone with link (no login required)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="access"
                checked={access === 'workspace'}
                onChange={() => setAccess('workspace')}
              />
              Workspace only
            </label>
          </div>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>Include in view:</label>
          <div style={{ display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={includeSummary}
                onChange={(e) => setIncludeSummary(e.target.checked)}
              />
              AI Summary & receipts
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={includeTranscript}
                onChange={(e) => setIncludeTranscript(e.target.checked)}
              />
              Transcript
            </label>
          </div>
        </div>

        {/* Generated Link */}
        {generatedLink && (
          <div style={{ background: 'var(--cue-tint)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-control)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--cue)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {generatedLink}
            </span>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                navigator.clipboard?.writeText(generatedLink);
                toast({ message: 'Copied!' });
              }}
            >
              Copy
            </Button>
          </div>
        )}

        {/* Live Recipient Preview Box */}
        <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-control)', padding: 'var(--sp-3)', background: '#ffffff' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Recipient View Preview (No login required)
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>
            {shareType === 'clip' ? clipTitle || 'Untitled Clip' : meeting.title}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--ink-2)', marginTop: '2px' }}>
            Shared by Priya Sharma · Includes {shareType === 'clip' ? `${Math.round(clipEnd - clipStart)}s excerpt` : `${Math.round(meeting.duration / 60)}m call`}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--sp-2)' }}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateShare} disabled={isGenerating}>
            {generatedLink ? 'Generate New Link' : 'Create & Copy Share Link'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
