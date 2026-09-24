import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { HELP_CATEGORIES, HELP_ARTICLES } from '../content/help';
import { Button, Chip } from '../components/ui';

export const HelpPage: React.FC = () => {
  const { subview, slug } = useParams<{ subview?: string; slug?: string }>();

  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  // Mode: 'home' | 'category' | 'article' | 'contact'
  const isContact = subview === 'contact';
  const isArticle = subview === 'article' && slug;
  const isCategory = subview === 'category' && slug;

  const currentArticle = useMemo(() => {
    if (!isArticle) return null;
    return HELP_ARTICLES.find((a) => a.slug === slug) || HELP_ARTICLES[0];
  }, [isArticle, slug]);

  const currentCategory = useMemo(() => {
    if (!isCategory) return null;
    return HELP_CATEGORIES.find((c) => c.slug === slug) || HELP_CATEGORIES[0];
  }, [isCategory, slug]);

  const categoryArticles = useMemo(() => {
    if (!currentCategory) return [];
    return HELP_ARTICLES.filter((a) => a.categorySlug === currentCategory.slug);
  }, [currentCategory]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return HELP_ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <SiteShell
      currentSection="resources"
      breadcrumbs={[
        { label: 'Help Center', path: '/help' },
        ...(currentCategory ? [{ label: currentCategory.name }] : []),
        ...(currentArticle ? [{ label: currentArticle.title }] : []),
        ...(isContact ? [{ label: 'Contact Support' }] : []),
      ]}
    >
      <div style={{ maxWidth: '1080px', margin: '48px auto', padding: '0 24px' }}>
        {/* Help Search Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Chip variant="cue">Support & Knowledge Base</Chip>
          <h1 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', margin: '12px auto 16px' }}>
            How can we help you today?
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', maxWidth: '580px', margin: '0 auto 24px' }}>
            Search across our 9 support categories and 18+ detailed troubleshooting articles.
          </p>

          {/* Search Input Box */}
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Search guides (e.g. 'bot-free', 'salesforce', 'permissions')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '10px',
                border: '1px solid var(--line)',
                background: 'var(--surface)',
                fontSize: '15px',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        {/* SEARCH RESULTS VIEW */}
        {searchQuery.trim() ? (
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>
              Search Results for "{searchQuery}" ({searchResults.length})
            </h2>
            {searchResults.length === 0 ? (
              <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '12px', border: '1px solid var(--line)', textAlign: 'center' }}>
                <p style={{ color: 'var(--ink-2)', margin: 0 }}>No matching articles found. Try a different search term or contact support.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {searchResults.map((res) => (
                  <Link
                    key={res.slug}
                    to={`/help/article/${res.slug}`}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--line)',
                      borderRadius: '10px',
                      padding: '20px',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)', marginBottom: '6px' }}>{res.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--ink-2)', margin: 0 }}>{res.summary}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : isContact ? (
          /* CONTACT SUPPORT FORM VIEW */
          <div style={{ maxWidth: '640px', margin: '0 auto 64px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '36px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Contact Concierge Support</h2>
              <p style={{ fontSize: '14px', color: 'var(--ink-2)', marginBottom: '24px' }}>
                Our solutions engineering team typically responds within 2 business hours.
              </p>

              {contactSubmitted ? (
                <div style={{ background: '#E6FFFA', border: '1px solid #38B2AC', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>✓</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#234E52', margin: 0 }}>Message Received</h3>
                  <p style={{ fontSize: '13px', color: '#285E61', marginTop: '6px' }}>
                    Thank you. A member of our support team will contact your email shortly. (Sample confirmation)
                  </p>
                  <Button size="sm" variant="secondary" onClick={() => setContactSubmitted(false)} style={{ marginTop: '12px' }}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                      Your Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)', fontSize: '14px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                      Topic or Inquiry
                    </label>
                    <select
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)', fontSize: '14px' }}
                    >
                      <option>Audio or Microphone Troubleshooting</option>
                      <option>Salesforce or HubSpot Integration Setup</option>
                      <option>Enterprise SOC2 & Security Review</option>
                      <option>Billing, Invoices & Team Seats</option>
                      <option>Feature Request / Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)', display: 'block', marginBottom: '6px' }}>
                      Message Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe the issue or question..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--canvas)', fontSize: '14px', resize: 'vertical' }}
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg">
                    Send Message to Support
                  </Button>
                </form>
              )}
            </div>
          </div>
        ) : isArticle && currentArticle ? (
          /* ARTICLE VIEW WITH WAS THIS HELPFUL */
          <div style={{ maxWidth: '780px', margin: '0 auto 64px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', color: 'var(--ink-3)', fontWeight: 600 }}>
                Last updated {currentArticle.lastUpdated} · {currentArticle.readingTimeMinutes} min read
              </span>
              <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '8px 0 16px', lineHeight: 1.2 }}>
                {currentArticle.title}
              </h1>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0 }}>
                {currentArticle.summary}
              </p>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '36px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', lineHeight: 1.7, color: 'var(--ink-2)' }}>
                {currentArticle.content.map((p, idx) => (
                  <p key={idx} style={{ margin: 0 }}>{p}</p>
                ))}
              </div>

              {currentArticle.steps && (
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Actionable Steps:</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {currentArticle.steps.map((st, sIdx) => (
                      <div key={sIdx} style={{ background: 'var(--surface-sunk)', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)', marginBottom: '4px' }}>
                          {sIdx + 1}. {st.title}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--ink-2)' }}>
                          {st.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* "Was this helpful?" feedback */}
              <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>Was this article helpful?</span>
                {feedbackGiven !== null ? (
                  <span style={{ fontSize: '12px', color: 'var(--ok)', fontWeight: 700 }}>Thank you for your feedback! ✓</span>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setFeedbackGiven(true)}
                      style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-sunk)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                    >
                      👍 Yes
                    </button>
                    <button
                      onClick={() => setFeedbackGiven(false)}
                      style={{ padding: '6px 14px', borderRadius: '6px', border: '1px solid var(--line)', background: 'var(--surface-sunk)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                    >
                      👎 No
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to="/help">
                <Button size="sm" variant="ghost">← Back to Help Center</Button>
              </Link>
              <Link to="/help/contact">
                <Button size="sm" variant="secondary">Still need help? Contact Support</Button>
              </Link>
            </div>
          </div>
        ) : isCategory && currentCategory ? (
          /* CATEGORY LIST VIEW */
          <div style={{ marginBottom: '64px' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '32px' }}>{currentCategory.icon}</span>
                <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>{currentCategory.name}</h1>
              </div>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', marginTop: '8px' }}>{currentCategory.description}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categoryArticles.map((art) => (
                <Link
                  key={art.slug}
                  to={`/help/article/${art.slug}`}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '10px',
                    padding: '24px',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', marginBottom: '6px' }}>{art.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-2)', margin: 0 }}>{art.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* DEFAULT: 9 CATEGORIES GRID */
          <div style={{ marginBottom: '64px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '48px' }}>
              {HELP_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/help/category/${cat.slug}`}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '12px',
                    padding: '24px',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', marginBottom: '6px' }}>{cat.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.5, margin: 0, flex: 1 }}>{cat.description}</p>
                  <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--cue)', fontWeight: 700 }}>
                    {cat.articleCount} articles →
                  </div>
                </Link>
              ))}
            </div>

            {/* Contact Support Strip */}
            <div style={{ background: 'var(--surface-sunk)', border: '1px solid var(--line)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>Can't find what you're looking for?</h2>
              <p style={{ color: 'var(--ink-2)', fontSize: '14px', marginBottom: '16px' }}>
                Our concierge support team is here to assist with calendar setup, custom CRM mapping, or enterprise security.
              </p>
              <Link to="/help/contact">
                <Button variant="primary">Contact Support Concierge →</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </SiteShell>
  );
};
