import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { INTEGRATIONS_LIST } from '../content/integrations';
import { Chip, Button } from '../components/ui';

const CATEGORIES = [
  'All Categories',
  'CRM',
  'Collaboration',
  'Project Management',
  'Workflow Automation',
  'Video Conferencing',
  'Content Generation',
  'Sales',
  'Productivity',
];

const PLANS = ['All Plans', 'Free', 'Team', 'Enterprise'];

export const IntegrationsDirectoryPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // Map slug parameter (e.g. crm, video-conferencing) to category
  const initialCategory = useMemo(() => {
    if (!slug) return 'All Categories';
    const clean = slug.toLowerCase().replace('integrations-', '').replace(/-/g, ' ');
    const found = CATEGORIES.find((c) => c.toLowerCase() === clean);
    return found || 'All Categories';
  }, [slug]);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPlan, setSelectedPlan] = useState<string>('All Plans');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (slug) {
      const clean = slug.toLowerCase().replace('integrations-', '').replace(/-/g, ' ');
      const found = CATEGORIES.find((c) => c.toLowerCase() === clean);
      if (found) setSelectedCategory(found);
    }
  }, [slug]);

  const filteredIntegrations = useMemo(() => {
    return INTEGRATIONS_LIST.filter((item) => {
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedPlan !== 'All Plans') {
        if (selectedPlan === 'Free' && item.planRequirement !== 'Free') return false;
        if (selectedPlan === 'Team' && item.planRequirement === 'Enterprise') return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.overview.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedPlan, searchQuery]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All Categories') {
      navigate('/integrations');
    } else {
      const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
      navigate(`/integrations/category/${catSlug}`);
    }
  };

  return (
    <SiteShell
      currentSection="integrations"
      breadcrumbs={[{ label: 'Integrations Directory' }]}
    >
      <div style={{ maxWidth: '1160px', margin: '48px auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Chip variant="cue">Ecosystem & Automations</Chip>
          <h1 style={{ fontSize: '44px', fontWeight: 800, letterSpacing: '-0.03em', margin: '12px auto 16px', maxWidth: '800px' }}>
            Connect Fathom to your entire operational stack
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
            Automate post-meeting workflows across 21+ tools. Click any app to view setup steps, permissions, and sample webhook payloads.
          </p>
        </div>

        {/* Filter Bar with Search, Category, and Plan */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '280px', flex: 1 }}>
            <input
              type="text"
              placeholder="Search integrations by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid var(--line)',
                background: 'var(--canvas)',
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Plan Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-3)' }}>Plan:</span>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--line)',
                background: 'var(--canvas)',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--ink)',
                cursor: 'pointer',
              }}
            >
              {PLANS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Result Count */}
          <div style={{ fontSize: '13px', color: 'var(--ink-3)', fontWeight: 600 }}>
            {filteredIntegrations.length} of {INTEGRATIONS_LIST.length} apps
          </div>
        </div>

        {/* Category Pills Bar */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '32px' }}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--ink)' : '1px solid var(--line)',
                  background: isSelected ? 'var(--ink)' : 'var(--surface)',
                  color: isSelected ? '#ffffff' : 'var(--ink-2)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Integrations Grid */}
        {filteredIntegrations.length === 0 ? (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '64px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
              No integrations found matching your filters
            </div>
            <p style={{ color: 'var(--ink-2)', fontSize: '14px', marginBottom: '20px' }}>
              Try clearing your search query or selecting "All Categories".
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedPlan('All Plans');
                setSearchQuery('');
                navigate('/integrations');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '64px' }}>
            {filteredIntegrations.map((item) => (
              <Link
                key={item.slug}
                to={`/integrations/${item.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'border-color 0.15s ease',
                }}
              >
                {/* Header with Monogram Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        background: item.monogramBg,
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '16px',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {item.monogram}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{item.name}</h3>
                      <span style={{ fontSize: '12px', color: 'var(--ink-3)' }}>{item.category}</span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      background: 'var(--surface-sunk)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      color: 'var(--ink-2)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    {item.planRequirement}
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0, flex: 1 }}>
                  {item.tagline}
                </p>

                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--cue)', fontWeight: 700 }}>
                  <span>View integration setup</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom Callout: Missing an app? */}
        <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
            Building a custom internal tool or need a bespoke integration?
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '14px', maxWidth: '580px', margin: '0 auto 20px' }}>
            Use our developer platform with REST API, webhooks, and Model Context Protocol (MCP) server.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <Link to="/developers">
              <Button variant="primary">Explore Developer Hub →</Button>
            </Link>
            <Link to="/developers/webhooks">
              <Button variant="secondary">Inspect Webhook Events</Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
};
