import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { Button } from '../components/ui';

export const FormsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname.includes('/login');
  const isBookDemo = location.pathname.includes('/book-demo');
  const isSwitch = location.pathname.includes('/switch');
  const isSignup = !isLogin && !isBookDemo && !isSwitch;

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [currentTool, setCurrentTool] = useState('Fireflies');
  const [seatCount, setSeatCount] = useState('10-50');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid work email address.');
      return;
    }
    setError(null);
    setSubmitted(true);

    // Mock redirect into seeded meetings app after 800ms
    setTimeout(() => {
      navigate('/meetings');
    }, 1200);
  };

  return (
    <SiteShell currentSection="resources">
      <div style={{ maxWidth: '520px', margin: '48px auto', padding: '0 24px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', boxShadow: 'var(--shadow-float)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--live)' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)' }}>
                FATHOM <span style={{ color: 'var(--ink-3)' }}>(rebuild)</span>
              </span>
            </div>

            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
              {isLogin
                ? 'Log in to your account'
                : isBookDemo
                ? 'Schedule an Enterprise Walkthrough'
                : isSwitch
                ? 'Switch to Fathom with Contract Credits'
                : 'Create your free account'}
            </h1>

            <p style={{ fontSize: '14px', color: 'var(--ink-2)', margin: 0 }}>
              {isLogin
                ? 'Access your meetings, summaries, and action items.'
                : isBookDemo
                ? 'Talk with solution engineers about SOC2 and custom CRM mapping.'
                : isSwitch
                ? 'Import legacy notes and credit your remaining competitor term.'
                : 'Unlimited recordings forever. No credit card required.'}
            </p>
          </div>

          {submitted ? (
            /* Success State */
            <div style={{ background: '#E6FFFA', border: '1px solid #38B2AC', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>✓</div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#234E52', margin: 0 }}>
                {isLogin ? 'Authenticated' : 'Account Ready'}
              </h2>
              <p style={{ fontSize: '13px', color: '#285E61', marginTop: '6px' }}>
                Redirecting you into the meetings library...
              </p>
            </div>
          ) : (
            /* Form Input */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {error && (
                <div style={{ background: '#FFF5F5', border: '1px solid #FEB2B2', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#C53030' }} role="alert">
                  {error}
                </div>
              )}

              {(isSignup || isBookDemo) && (
                <div>
                  <label htmlFor="form-name" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                    Full Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              )}

              <div>
                <label htmlFor="form-email" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                  Work Email Address
                </label>
                <input
                  id="form-email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)', fontSize: '14px', outline: 'none' }}
                />
              </div>

              {isSwitch && (
                <div>
                  <label htmlFor="form-tool" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                    Current Notetaker Tool
                  </label>
                  <select
                    id="form-tool"
                    value={currentTool}
                    onChange={(e) => setCurrentTool(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="Fireflies">Fireflies.ai</option>
                    <option value="Otter">Otter.ai</option>
                    <option value="Gong">Gong.io</option>
                    <option value="Zoom">Zoom AI Companion</option>
                    <option value="Other">Other Vendor</option>
                  </select>
                </div>
              )}

              {isBookDemo && (
                <div>
                  <label htmlFor="form-seats" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                    Estimated Team Seat Size
                  </label>
                  <select
                    id="form-seats"
                    value={seatCount}
                    onChange={(e) => setSeatCount(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="10-50">10 – 50 team members</option>
                    <option value="51-200">51 – 200 team members</option>
                    <option value="200+">200+ enterprise seats</option>
                  </select>
                </div>
              )}

              {isLogin && (
                <div>
                  <label htmlFor="form-password" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                    Password
                  </label>
                  <input
                    id="form-password"
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" style={{ marginTop: '8px' }}>
                {isLogin
                  ? 'Sign In to Demo'
                  : isBookDemo
                  ? 'Request Enterprise Walkthrough'
                  : isSwitch
                  ? 'Claim Migration Credits'
                  : 'Get Started Free →'}
              </Button>
            </form>
          )}

          {/* Bottom Switch Links */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--line)', textAlign: 'center', fontSize: '13px', color: 'var(--ink-3)' }}>
            {isLogin ? (
              <span>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: 'var(--ink)', fontWeight: 700, textDecoration: 'none' }}>
                  Sign up free
                </Link>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--ink)', fontWeight: 700, textDecoration: 'none' }}>
                  Log in here
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
};
