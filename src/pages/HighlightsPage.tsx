import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppShell } from '../components/shell/AppShell';
import { Button, Chip, ReceiptChip } from '../components/ui';

interface ClipItem {
  id: string;
  title: string;
  sourceMeeting: string;
  speaker: string;
  speakerInitial: string;
  startSec: number;
  durationSec: number;
  transcriptExcerpt: string;
}

export const HighlightsPage: React.FC = () => {
  const playlistTitle = 'Acme Corp — Key Moments Reel';
  const [copiedLink, setCopiedLink] = useState(false);

  const clips: ClipItem[] = [
    {
      id: 'clip-1',
      title: 'Pricing Threshold & Usage Tier Agreement',
      sourceMeeting: 'Q3 Product Roadmap Review',
      speaker: 'Priya Sharma',
      speakerInitial: 'P',
      startSec: 420,
      durationSec: 35,
      transcriptExcerpt: 'We are launching the usage-based tier at $19 per seat with 200 included queries, grandfathering enterprise accounts.',
    },
    {
      id: 'clip-2',
      title: 'Diarization Latency Engineering Target',
      sourceMeeting: 'Q3 Product Roadmap Review',
      speaker: 'Alex Morgan',
      speakerInitial: 'A',
      startSec: 710,
      durationSec: 28,
      transcriptExcerpt: 'Binary search segment indexing ensures sub-50ms diarization boundary snapping across all 8 concurrent speaker lanes.',
    },
    {
      id: 'clip-3',
      title: 'Security Package & DPA Delivery Deadline',
      sourceMeeting: 'Q3 Product Roadmap Review',
      speaker: 'Alex Morgan',
      speakerInitial: 'A',
      startSec: 2680,
      durationSec: 40,
      transcriptExcerpt: 'I will personally deliver our complete SOC2 Type II compliance package and signed DPA by Thursday end of day.',
    },
  ];

  const handleCopyPlaylist = () => {
    navigator.clipboard.writeText('https://demo.fathom.ai/s/demo-share-token');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AppShell currentTitle="Highlights & Playlists">
      <div style={{ padding: '24px 32px', maxWidth: '1160px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cue)', letterSpacing: '0.04em' }}>
                Curated Video Clips
              </span>
              <Chip variant="ok">{clips.length} Clips in Reel</Chip>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0 0' }}>
              {playlistTitle}
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button size="sm" variant="secondary" onClick={handleCopyPlaylist}>
              {copiedLink ? 'Link Copied! ✓' : 'Share Reel Link 🔗'}
            </Button>
            <Link to="/meetings/mtg-q3-roadmap">
              <Button size="sm" variant="primary">+ Clip from Showpiece</Button>
            </Link>
          </div>
        </div>

        {/* Ordered Clips Playlist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          {clips.map((clip, idx) => (
            <div
              key={clip.id}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '20px 24px',
                display: 'grid',
                gridTemplateColumns: '40px minmax(0, 1fr) auto',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink-3)', textAlign: 'center' }}>
                #{idx + 1}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>
                    {clip.title}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>({clip.durationSec}s)</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginBottom: '8px' }}>
                  From: {clip.sourceMeeting}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--ink-2)', fontStyle: 'italic', margin: 0 }}>
                  "{clip.transcriptExcerpt}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ReceiptChip at={clip.startSec} speakerInitial={clip.speakerInitial} />
                <Link to={`/meetings/mtg-q3-roadmap?t=${clip.startSec}`}>
                  <Button size="sm" variant="ghost">Play Context →</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Zero-Login Recipient Callout */}
        <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 4px' }}>Shareable Without Recipient Login</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', margin: 0 }}>
              Recipients can watch this compiled reel in sequence without needing to create an account.
            </p>
          </div>
          <Link to="/s/demo-share-token">
            <Button size="sm" variant="secondary">Preview Public Recipient Page →</Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
};
