import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { LEARN_ARTICLES } from '../content/articles';
import { CASE_STUDIES } from '../content/cases';
import { Button, Chip } from '../components/ui';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const isCaseStudy = location.pathname.includes('/case-studies');

  // Find either learn article or case study
  const article = LEARN_ARTICLES.find((a) => a.slug === slug) || LEARN_ARTICLES[0];
  const caseStudy = CASE_STUDIES.find((c) => c.slug === slug) || CASE_STUDIES[0];

  // Reading progress state
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPct = (totalScroll / windowHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, scrollPct)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SiteShell
      currentSection="resources"
      breadcrumbs={[
        { label: isCaseStudy ? 'Case Studies' : 'Learn Academy', path: isCaseStudy ? '/resource-hub' : '/learn' },
        { label: isCaseStudy ? caseStudy.companyName : article.title },
      ]}
    >
      {/* Sticky Reading Progress Bar */}
      <div
        style={{
          position: 'sticky',
          top: '60px',
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--surface-sunk)',
          zIndex: 80,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${readingProgress}%`,
            background: 'var(--cue)',
            transition: 'width 0.1s ease',
          }}
        />
      </div>

      <div style={{ maxWidth: '1160px', margin: '48px auto', padding: '0 24px' }}>
        {isCaseStudy ? (
          /* CASE STUDY TEMPLATE (SAMPLE STORY) */
          <div>
            {/* Header */}
            <div style={{ maxWidth: '840px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Chip variant="ok">Sample Customer Story</Chip>
                <span style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{caseStudy.industry} · {caseStudy.teamSize}</span>
              </div>

              <h1 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px' }}>
                {caseStudy.companyName}: {caseStudy.headline}
              </h1>

              <div style={{ fontSize: '12px', color: 'var(--ink-3)', background: 'var(--surface-sunk)', padding: '6px 12px', borderRadius: '4px', display: 'inline-block' }}>
                Notice: All customer names, quotes, and results in this case study are illustrative Sample demonstration data.
              </div>
            </div>

            {/* Outcome Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '48px' }}>
              {caseStudy.outcomeStats.map((stat, idx) => (
                <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--cue)', marginBottom: '4px' }}>
                    {stat.metric}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Challenge & Solution Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '48px' }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px', padding: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px' }}>
                  The Challenge
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                  {caseStudy.challenge}
                </p>
              </div>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px', padding: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px' }}>
                  The Solution
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div style={{ background: 'var(--surface-sunk)', borderLeft: '4px solid var(--cue)', padding: '32px', borderRadius: '0 12px 12px 0', marginBottom: '48px' }}>
              <blockquote style={{ fontSize: '18px', fontStyle: 'italic', color: 'var(--ink)', margin: '0 0 16px', lineHeight: 1.6 }}>
                "{caseStudy.quote.text}"
              </blockquote>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>
                {caseStudy.quote.author} — <span style={{ fontWeight: 400, color: 'var(--ink-2)' }}>{caseStudy.quote.role}</span>
              </div>
            </div>

            {/* Workflow Implementation Details */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px', padding: '32px', marginBottom: '64px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>
                Operational Workflow Deployed
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {caseStudy.workflowDetails.map((step, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--ink-2)' }}>
                    <span style={{ color: 'var(--ok)', fontWeight: 800 }}>✓</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* LEARN ARTICLE TEMPLATE (600+ WORDS) */
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '64px', alignItems: 'flex-start' }}>
            {/* Article Main Prose Body */}
            <article>
              <div style={{ marginBottom: '32px' }}>
                <Chip variant="cue">{article.category}</Chip>
                <h1 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '12px 0 16px' }}>
                  {article.title}
                </h1>
                <div style={{ fontSize: '14px', color: 'var(--ink-3)', display: 'flex', gap: '16px' }}>
                  <span>By <strong>{article.author}</strong></span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readingTimeMinutes} min read</span>
                </div>
              </div>

              {/* Excerpt Lead */}
              <div style={{ fontSize: '19px', lineHeight: 1.6, color: 'var(--ink-2)', fontStyle: 'italic', marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid var(--line)' }}>
                {article.excerpt}
              </div>

              {/* Sections with Headings, Prose, Callouts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {article.sections.map((sec, sIdx) => (
                  <section key={sIdx} id={`sec-${sIdx}`}>
                    <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--ink)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                      {sec.heading}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px', lineHeight: 1.7, color: 'var(--ink-2)', fontFamily: 'var(--font-prose)' }}>
                      {sec.body.map((para, pIdx) => (
                        <p key={pIdx} style={{ margin: 0 }}>
                          {para}
                        </p>
                      ))}
                    </div>

                    {sec.callout && (
                      <div style={{ background: 'var(--surface-sunk)', borderLeft: '3px solid var(--cue)', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginTop: '20px', fontSize: '15px', fontWeight: 600, color: 'var(--ink)' }}>
                        {sec.callout}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Bottom Sharing & Print Controls */}
              <div style={{ marginTop: '56px', paddingTop: '24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button size="sm" variant="secondary" onClick={() => window.print()}>
                  Print / Save as PDF 🖨️
                </Button>
                <Link to="/learn">
                  <Button size="sm" variant="ghost">← Back to All Guides</Button>
                </Link>
              </div>
            </article>

            {/* Sticky Right Sidebar (Table of Contents & Related Guides) */}
            <aside style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Table of Contents */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)', marginBottom: '12px' }}>
                  On This Page
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  {article.sections.map((sec, idx) => (
                    <a
                      key={idx}
                      href={`#sec-${idx}`}
                      style={{ color: 'var(--ink-2)', textDecoration: 'none', lineHeight: 1.4 }}
                    >
                      {sec.heading}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Guides */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)', marginBottom: '12px' }}>
                  Related Playbooks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {LEARN_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3).map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/learn/${rel.slug}`}
                      style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', lineHeight: 1.4 }}
                    >
                      {rel.title}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </SiteShell>
  );
};
