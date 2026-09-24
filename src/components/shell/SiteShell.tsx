import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GlobalSearchModal } from './GlobalSearchModal';
import { Button, Kbd } from '../ui';
import './shell.css';

export interface SiteShellProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; path?: string }[];
  currentSection?: 'product' | 'solutions' | 'integrations' | 'developers' | 'pricing' | 'resources';
}

export const SiteShell: React.FC<SiteShellProps> = ({ children, breadcrumbs, currentSection }) => {
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const dismissed = localStorage.getItem('fathom_banner_dismissed_v2');
    if (dismissed === 'true') {
      setIsBannerDismissed(true);
    }
  }, []);

  const dismissBanner = () => {
    setIsBannerDismissed(true);
    localStorage.setItem('fathom_banner_dismissed_v2', 'true');
  };

  // Keyboard shortcut listener: Cmd+K or Ctrl+K or '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && !isInput) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--canvas)', color: 'var(--ink)' }}>
      {/* Top Banner Announcement */}
      {!isBannerDismissed && (
        <div
          style={{
            background: 'var(--ink)',
            color: '#ffffff',
            padding: '8px 24px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ background: 'var(--cue)', color: '#ffffff', padding: '1px 6px', borderRadius: '3px', fontSize: '11px', fontWeight: 800 }}>
              NEW
            </span>
            <span>Fathom is now available <strong>bot-free</strong> — record locally without an avatar in the call.</span>
            <Link to="/live" style={{ color: 'var(--hl)', textDecoration: 'underline', marginLeft: '4px' }}>
              Simulate Live Capture →
            </Link>
          </div>
          <button
            onClick={dismissBanner}
            aria-label="Dismiss banner"
            style={{
              position: 'absolute',
              right: '16px',
              background: 'transparent',
              border: 'none',
              color: 'var(--ink-3)',
              cursor: 'pointer',
              fontSize: '16px',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Site Header */}
      <header
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--line)',
          position: 'sticky',
          top: 0,
          zIndex: 90,
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Logo with live tally dot */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--live)', display: 'inline-block' }} />
            <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--ink)', letterSpacing: '-0.02em' }}>
              FATHOM <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-3)' }}>(rebuild)</span>
            </span>
          </Link>

          {/* Desktop Nav Items (Max 5) */}
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '22px', fontSize: '14px', fontWeight: 600 }}>
            <Link
              to="/overview"
              style={{
                color: currentSection === 'product' ? 'var(--ink)' : 'var(--ink-2)',
                textDecoration: 'none',
                borderBottom: currentSection === 'product' ? '2px solid var(--ink)' : '2px solid transparent',
                padding: '18px 0',
              }}
            >
              Overview
            </Link>
            <Link
              to="/solutions/sales"
              style={{
                color: currentSection === 'solutions' ? 'var(--ink)' : 'var(--ink-2)',
                textDecoration: 'none',
                borderBottom: currentSection === 'solutions' ? '2px solid var(--ink)' : '2px solid transparent',
                padding: '18px 0',
              }}
            >
              Solutions
            </Link>
            <Link
              to="/integrations"
              style={{
                color: currentSection === 'integrations' ? 'var(--ink)' : 'var(--ink-2)',
                textDecoration: 'none',
                borderBottom: currentSection === 'integrations' ? '2px solid var(--ink)' : '2px solid transparent',
                padding: '18px 0',
              }}
            >
              Integrations
            </Link>
            <Link
              to="/developers"
              style={{
                color: currentSection === 'developers' ? 'var(--ink)' : 'var(--ink-2)',
                textDecoration: 'none',
                borderBottom: currentSection === 'developers' ? '2px solid var(--ink)' : '2px solid transparent',
                padding: '18px 0',
              }}
            >
              Developers & API
            </Link>
            <Link
              to="/pricing"
              style={{
                color: currentSection === 'pricing' ? 'var(--ink)' : 'var(--ink-2)',
                textDecoration: 'none',
                borderBottom: currentSection === 'pricing' ? '2px solid var(--ink)' : '2px solid transparent',
                padding: '18px 0',
              }}
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--canvas)',
              border: '1px solid var(--line)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '13px',
              color: 'var(--ink-2)',
              cursor: 'pointer',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="desktop-only">Search</span>
            <Kbd>⌘K</Kbd>
          </button>

          {/* Quick link to meetings app */}
          <Link to="/meetings" className="desktop-only" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', padding: '6px 10px' }}>
            Open App
          </Link>

          {/* Primary CTA */}
          <Button variant="primary" size="sm" onClick={() => navigate('/onboarding')} style={{ padding: '6px 14px' }}>
            Get Started Free
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'transparent',
              border: '1px solid var(--line)',
              borderRadius: '6px',
              padding: '6px 8px',
              cursor: 'pointer',
              color: 'var(--ink)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Sheet */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--surface)',
            zIndex: 85,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '18px', fontWeight: 700 }}>
            <Link to="/overview" style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', color: 'var(--ink)', textDecoration: 'none' }}>
              Product Story & Lifecycle
            </Link>
            <Link to="/solutions/sales" style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', color: 'var(--ink)', textDecoration: 'none' }}>
              Solutions by Role
            </Link>
            <Link to="/integrations" style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', color: 'var(--ink)', textDecoration: 'none' }}>
              Integrations (21+ Apps)
            </Link>
            <Link to="/developers" style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', color: 'var(--ink)', textDecoration: 'none' }}>
              Developers & REST API
            </Link>
            <Link to="/pricing" style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', color: 'var(--ink)', textDecoration: 'none' }}>
              Pricing & Plans
            </Link>
            <Link to="/resource-hub" style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', color: 'var(--ink)', textDecoration: 'none' }}>
              Resource Hub & Guides
            </Link>
            <Link to="/help" style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', color: 'var(--ink)', textDecoration: 'none' }}>
              Help Center & Knowledge Base
            </Link>
            <Link to="/whats-new" style={{ padding: '12px 0', borderBottom: '1px solid var(--line)', color: 'var(--ink)', textDecoration: 'none' }}>
              What's New (Changelog)
            </Link>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button variant="primary" size="lg" onClick={() => navigate('/onboarding')}>
              Start Free Trial
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/meetings')}>
              Open Meetings App
            </Button>
          </div>
        </div>
      )}

      {/* Breadcrumbs Bar (if passed) */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div style={{ background: 'var(--surface-sunk)', borderBottom: '1px solid var(--line)', padding: '8px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--ink-3)' }}>
            <Link to="/" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span>/</span>
                {crumb.path ? (
                  <Link to={crumb.path} style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Unified Global Footer */}
      <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', padding: '64px 24px 32px', marginTop: '64px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* 6 Column Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px', marginBottom: '48px' }}>
            {/* Column 1: Product */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '16px', letterSpacing: '0.04em' }}>
                Product
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <li><Link to="/overview" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Overview & Story</Link></li>
                <li><Link to="/meetings/mtg-q3-roadmap" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>The Score Showpiece</Link></li>
                <li><Link to="/live" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Bot-Free Live Capture</Link></li>
                <li><Link to="/pricing" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Pricing & Plans</Link></li>
                <li><Link to="/vs" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Competitor Comparison</Link></li>
              </ul>
            </div>

            {/* Column 2: Solutions */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '16px', letterSpacing: '0.04em' }}>
                Solutions
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <li><Link to="/solutions/sales" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Sales & Account Execs</Link></li>
                <li><Link to="/solutions/customer-success" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Customer Success</Link></li>
                <li><Link to="/solutions/marketing" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Marketing & Research</Link></li>
                <li><Link to="/solutions/teams" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Cross-Functional Teams</Link></li>
                <li><Link to="/solutions/operations" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>RevOps & Operations</Link></li>
                <li><Link to="/solutions/engineering" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Product & Engineering</Link></li>
              </ul>
            </div>

            {/* Column 3: Integrations */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '16px', letterSpacing: '0.04em' }}>
                Integrations
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <li><Link to="/integrations" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Directory (21+ Apps)</Link></li>
                <li><Link to="/integrations/salesforce" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Salesforce CRM</Link></li>
                <li><Link to="/integrations/hubspot" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>HubSpot</Link></li>
                <li><Link to="/integrations/slack" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Slack Digests</Link></li>
                <li><Link to="/integrations/notion" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Notion Databases</Link></li>
                <li><Link to="/integrations/zapier" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Zapier Triggers</Link></li>
              </ul>
            </div>

            {/* Column 4: Developers */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '16px', letterSpacing: '0.04em' }}>
                Developers
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <li><Link to="/developers" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Developer Hub</Link></li>
                <li><Link to="/developers/reference" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>REST API (12+ Endpoints)</Link></li>
                <li><Link to="/developers/webhooks" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Webhooks & Events</Link></li>
                <li><Link to="/developers/mcp" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Model Context Protocol (MCP)</Link></li>
                <li><Link to="/developers/sdks" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Official SDKs</Link></li>
              </ul>
            </div>

            {/* Column 5: Resources & Support */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '16px', letterSpacing: '0.04em' }}>
                Resources
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <li><Link to="/help" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Help Center (9 Categories)</Link></li>
                <li><Link to="/whats-new" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>What's New (Changelog)</Link></li>
                <li><Link to="/learn" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Meeting Intelligence Academy</Link></li>
                <li><Link to="/resource-hub" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Resource Hub</Link></li>
                <li><Link to="/partner-programs" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Partner Programs</Link></li>
                <li><Link to="/status" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>System Status</Link></li>
              </ul>
            </div>

            {/* Column 6: Company & Trust */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '16px', letterSpacing: '0.04em' }}>
                Company & Trust
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <li><Link to="/about-us" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>About Us & Values</Link></li>
                <li><Link to="/brand" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Brand Kit & Downloads</Link></li>
                <li><Link to="/trust" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Trust & Security Center</Link></li>
                <li><Link to="/terms" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Terms of Service</Link></li>
                <li><Link to="/privacy" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Privacy Policy</Link></li>
                <li><Link to="/careers" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>Careers (3 Openings)</Link></li>
              </ul>
            </div>
          </div>

          {/* Dev / Reviewer Bar */}
          <div
            style={{
              padding: '16px 20px',
              background: 'var(--surface-sunk)',
              borderRadius: '8px',
              border: '1px solid var(--line)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '32px',
              fontSize: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ok)' }} />
              <span style={{ fontWeight: 700, color: 'var(--ink)' }}>Rebuild Parity Verification:</span>
              <span style={{ color: 'var(--ink-2)' }}>All original fathom.ai and fathom.video routes unified on one origin.</span>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/dev/parity" style={{ color: 'var(--cue)', fontWeight: 700, textDecoration: 'none' }}>
                /dev/parity (Coverage Table) →
              </Link>
              <Link to="/dev/design" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>
                /dev/design (Design Gallery)
              </Link>
              <Link to="/dev/recap-email" style={{ color: 'var(--ink-2)', textDecoration: 'none' }}>
                /dev/recap-email
              </Link>
            </div>
          </div>

          {/* Copyright & Honest Sample Disclosure */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--line)',
              paddingTop: '24px',
              fontSize: '12px',
              color: 'var(--ink-3)',
              gap: '12px',
            }}
          >
            <div>
              © 2026 Fathom (rebuild). All product names, logos, prices, ratings, and customer testimonials are illustrative Sample data.
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/terms" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Terms</Link>
              <Link to="/privacy" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Privacy</Link>
              <Link to="/status" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Status: Operational</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Search Dialog Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};
