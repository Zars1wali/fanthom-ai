import React, { useState } from 'react';
import { AppShell } from '../components/shell/AppShell';
import { Button, Chip } from '../components/ui';

export const PointsPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://demo.fathom.ai/signup?ref=alex-4810';
  const pointsBalance = 2500;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const perks = [
    { id: 'p1', name: '$20 Subscription Credit', cost: 1000, description: 'Applies automatically to your next monthly or annual invoice.' },
    { id: 'p2', name: 'Custom Template Architecture Call', cost: 2000, description: '30-minute consultation with our solution engineering team.' },
    { id: 'p3', name: 'Official Fathom Broadcast Tally Mug', cost: 1500, description: 'Exclusive matte-black ceramic mug with tally mark.' },
    { id: 'p4', name: 'Beta Access: Audio Stem Export', cost: 500, description: 'Early access to multi-channel lossless WAV stem downloads.' },
  ];

  return (
    <AppShell currentTitle="Points & Rewards">
      <div style={{ padding: '24px 32px', maxWidth: '1080px', margin: '0 auto', fontFamily: 'var(--font-ui)' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--cue)', letterSpacing: '0.04em' }}>
              Referral Program
            </span>
            <Chip variant="ok">Points Active</Chip>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '4px 0 6px' }}>
            Fathom Points & Community Rewards
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', margin: 0 }}>
            Invite colleagues and clients to Fathom. Earn points redeemable for billing credits and perks.
          </p>
        </div>

        {/* Balance & Referral Link Card */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', marginBottom: '36px', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '32px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Available Balance</div>
            <div style={{ fontSize: '44px', fontWeight: 800, color: 'var(--cue)', margin: '4px 0' }}>
              {pointsBalance.toLocaleString()} <span style={{ fontSize: '16px', color: 'var(--ink-2)', fontWeight: 600 }}>pts</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--ok)', fontWeight: 600 }}>
              Equivalent to $50 in subscription credits
            </div>
          </div>

          <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
              Your Personal Referral Link:
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                readOnly
                type="text"
                value={referralLink}
                style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--line)', background: '#ffffff', fontSize: '13px', fontFamily: 'monospace' }}
              />
              <Button size="sm" variant="primary" onClick={handleCopy}>
                {copied ? 'Copied! ✓' : 'Copy Link'}
              </Button>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '8px' }}>
              Earn 500 points for each colleague who connects their calendar and records their first call.
            </div>
          </div>
        </div>

        {/* Perks Catalog */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Perks Catalog (Sample)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {perks.map((perk) => (
              <div key={perk.id} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{perk.name}</h3>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--cue)', marginBottom: '8px' }}>
                  {perk.cost} pts
                </div>
                <p style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.4, margin: '0 0 16px', flex: 1 }}>
                  {perk.description}
                </p>
                <Button size="sm" variant="secondary" onClick={() => alert(`Simulated redemption for ${perk.name}.`)}>
                  Redeem Perk
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};
