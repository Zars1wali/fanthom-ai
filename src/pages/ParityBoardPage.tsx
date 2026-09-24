import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_MANIFEST } from '../routes/manifest';
import { Button } from '../components/ui';

export const ParityBoardPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = useMemo(() => {
    const total = ROUTE_MANIFEST.length;
    const verified = ROUTE_MANIFEST.filter((r) => r.status === 'verified').length;
    const built = ROUTE_MANIFEST.filter((r) => r.status === 'built').length;
    const planned = ROUTE_MANIFEST.filter((r) => r.status === 'planned').length;
    const completedPct = Math.round(((verified + built) / total) * 100);
    const uniqueTemplates = new Set(ROUTE_MANIFEST.map((r) => r.template)).size;

    return { total, verified, built, planned, completedPct, uniqueTemplates };
  }, []);

  const filteredRoutes = useMemo(() => {
    return ROUTE_MANIFEST.filter((route) => {
      if (statusFilter !== 'all' && route.status !== statusFilter) return false;
      if (tierFilter !== 'all' && String(route.tier) !== tierFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          route.path.toLowerCase().includes(query) ||
          route.originalUrl.toLowerCase().includes(query) ||
          route.title.toLowerCase().includes(query) ||
          route.template.toLowerCase().includes(query) ||
          (route.notes && route.notes.toLowerCase().includes(query));
        if (!matches) return false;
      }
      return true;
    });
  }, [statusFilter, tierFilter, searchQuery]);

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px', fontFamily: 'var(--font-ui)' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--cue)' }} />
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cue)' }}>
            Parity Contract & Coverage Ledger
          </span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
          Original Fathom Web Presence vs Rebuilt Architecture
        </h1>
        <p style={{ color: 'var(--ink-2)', fontSize: '15px', maxWidth: '840px', lineHeight: 1.5 }}>
          This table tracks the exact parity mapping of every original Fathom web URL (marketing, product, docs, help, trust, status, forms) into unified, receipt-backed demo templates on a single origin.
        </p>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px 20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Total Mapped Routes</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink)', marginTop: '4px' }}>{stats.total}</div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px 20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Built & Verified</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ok)', marginTop: '4px' }}>
            {stats.verified + stats.built} <span style={{ fontSize: '14px', color: 'var(--ink-3)', fontWeight: 600 }}>({stats.completedPct}%)</span>
          </div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px 20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Templates Defined</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--cue)', marginTop: '4px' }}>{stats.uniqueTemplates}</div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px 20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' }}>In Progress / Planned</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink-2)', marginTop: '4px' }}>{stats.planned}</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Filter by path, title, or original URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid var(--line)',
              background: 'var(--canvas)',
              fontSize: '14px',
              minWidth: '280px',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)' }}>Status:</span>
            {['all', 'verified', 'built', 'planned'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: statusFilter === st ? '1px solid var(--ink)' : '1px solid var(--line)',
                  background: statusFilter === st ? 'var(--ink)' : 'var(--surface)',
                  color: statusFilter === st ? '#ffffff' : 'var(--ink-2)',
                  cursor: 'pointer',
                }}
              >
                {st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)' }}>Tier:</span>
            {['all', '1', '2', '3', 'App'].map((tr) => (
              <button
                key={tr}
                onClick={() => setTierFilter(tr)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: tierFilter === tr ? '1px solid var(--ink)' : '1px solid var(--line)',
                  background: tierFilter === tr ? 'var(--ink)' : 'var(--surface)',
                  color: tierFilter === tr ? '#ffffff' : 'var(--ink-2)',
                  cursor: 'pointer',
                }}
              >
                {tr === 'App' ? 'App' : `Tier ${tr}`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--ink-3)', fontWeight: 600 }}>
          Showing {filteredRoutes.length} of {ROUTE_MANIFEST.length} routes
        </div>
      </div>

      {/* Parity Ledger Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'var(--surface-sunk)', borderBottom: '1px solid var(--line)', color: 'var(--ink-3)', fontWeight: 700, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Demo Route</th>
                <th style={{ padding: '12px 16px' }}>Original URL</th>
                <th style={{ padding: '12px 16px' }}>Template</th>
                <th style={{ padding: '12px 16px' }}>Tier</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Title & Differentiation Notes</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map((route, idx) => (
                <tr
                  key={route.path + idx}
                  style={{
                    borderBottom: idx < filteredRoutes.length - 1 ? '1px solid var(--line)' : 'none',
                    background: idx % 2 === 0 ? 'var(--surface)' : 'var(--canvas)',
                  }}
                >
                  <td style={{ padding: '12px 16px', fontWeight: 700 }}>
                    <Link to={route.path} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                      <code style={{ background: 'var(--surface-sunk)', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                        {route.path}
                      </code>
                    </Link>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink-2)', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <a href={route.originalUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--ink-2)', textDecoration: 'underline' }}>
                      {route.originalUrl.replace('https://', '')}
                    </a>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                      {route.template}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--ink-3)' }}>
                    {route.tier}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {route.status === 'verified' && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--ok)', fontWeight: 700, fontSize: '12px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ok)' }} />
                        Verified
                      </span>
                    )}
                    {route.status === 'built' && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--cue)', fontWeight: 700, fontSize: '12px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cue)' }} />
                        Built
                      </span>
                    )}
                    {route.status === 'planned' && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--ink-3)', fontWeight: 600, fontSize: '12px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--line-strong)' }} />
                        Planned
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', maxWidth: '340px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--ink)', marginBottom: '2px' }}>{route.title}</div>
                    {route.notes && (
                      <div style={{ fontSize: '11px', color: 'var(--ink-3)', lineHeight: 1.4 }}>
                        {route.notes}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <Link to={route.path.replace(':id', 'mtg-q3-roadmap').replace(':slug', 'salesforce').replace(':token', 'demo-share-token').replace('*', 'reference')}>
                      <Button size="sm" variant="secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                        Open Demo
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
