import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { Button, Chip, Dialog } from '../components/ui';
import {
  PRICING_PLANS,
  PRICING_COMPARISON_CATEGORIES,
  PLAN_FINDER_QUESTIONS,
  PRICING_FAQS,
} from '../content/pricing';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  // Plan Finder state
  const [finderAnswers, setFinderAnswers] = useState<Record<string, string>>({});
  const [recommendedPlan, setRecommendedPlan] = useState<string | null>(null);

  const handleFinderSelect = (questionId: string, planId: string) => {
    const updated = { ...finderAnswers, [questionId]: planId };
    setFinderAnswers(updated);

    // If 2+ questions answered, calculate recommendation
    const answers = Object.values(updated);
    if (answers.length >= 2) {
      if (answers.includes('enterprise')) {
        setRecommendedPlan('enterprise');
      } else if (answers.includes('team')) {
        setRecommendedPlan('team');
      } else {
        setRecommendedPlan('free');
      }
    }
  };

  return (
    <SiteShell currentSection="pricing" breadcrumbs={[{ label: 'Pricing & Plans' }]}>
      <div style={{ maxWidth: '1160px', margin: '48px auto', padding: '0 24px' }}>
        {/* Header & Honest Sample Notice */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--surface-sunk)', padding: '6px 14px', borderRadius: '20px', marginBottom: '16px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cue)' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-2)' }}>
              Sample Demonstration Pricing · All Tiers Fully Exploreable
            </span>
          </div>
          <h1 style={{ fontSize: '44px', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '16px' }}>
            Transparent pricing. Zero surprises.
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', maxWidth: '680px', margin: '0 auto 28px', lineHeight: 1.5 }}>
            Unlimited recordings forever. Scaled plans with AI custom templates, bi-directional CRM field mapping, and SOC2 compliance.
          </p>

          {/* Billing Cycle Switcher (Save 20% on Annual) */}
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--surface-sunk)', padding: '4px', borderRadius: '8px', border: '1px solid var(--line)', gap: '4px' }}>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: billingCycle === 'annual' ? 'var(--surface)' : 'transparent',
                color: billingCycle === 'annual' ? 'var(--ink)' : 'var(--ink-2)',
                boxShadow: billingCycle === 'annual' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              Annual Billing <span style={{ color: 'var(--ok)', fontWeight: 800, marginLeft: '4px' }}>(Save 20%)</span>
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: billingCycle === 'monthly' ? 'var(--surface)' : 'transparent',
                color: billingCycle === 'monthly' ? 'var(--ink)' : 'var(--ink-2)',
                boxShadow: billingCycle === 'monthly' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            const isHighlight = plan.highlighted;

            return (
              <div
                key={plan.id}
                style={{
                  background: isHighlight ? '#ffffff' : 'var(--surface)',
                  border: isHighlight ? '2px solid var(--cue)' : '1px solid var(--line)',
                  borderRadius: '16px',
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: isHighlight ? '0 8px 32px rgba(235, 94, 40, 0.12)' : 'none',
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '32px',
                      background: isHighlight ? 'var(--cue)' : 'var(--surface-sunk)',
                      color: isHighlight ? '#ffffff' : 'var(--ink-2)',
                      padding: '2px 10px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      border: isHighlight ? 'none' : '1px solid var(--line)',
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginBottom: '6px' }}>{plan.name}</h2>
                  <p style={{ fontSize: '14px', color: 'var(--ink-2)', minHeight: '40px', lineHeight: 1.4 }}>{plan.summary}</p>
                </div>

                {/* Price Display */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.03em' }}>
                      ${price}
                    </span>
                    {price > 0 && (
                      <span style={{ fontSize: '13px', color: 'var(--ink-3)', fontWeight: 600 }}>
                        / user / month
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>
                    {price === 0 ? 'Forever free · Sample tier' : billingCycle === 'annual' ? 'Billed annually · Sample rate' : 'Billed monthly · Sample rate'}
                  </div>
                </div>

                {/* CTA Button */}
                <div style={{ marginBottom: '32px' }}>
                  {plan.id === 'enterprise' ? (
                    <Button
                      variant="secondary"
                      size="lg"
                      style={{ width: '100%' }}
                      onClick={() => setIsEnterpriseModalOpen(true)}
                    >
                      {plan.ctaText}
                    </Button>
                  ) : (
                    <Button
                      variant={isHighlight ? 'primary' : 'secondary'}
                      size="lg"
                      style={{ width: '100%' }}
                      onClick={() => navigate(plan.ctaLink)}
                    >
                      {plan.ctaText}
                    </Button>
                  )}
                </div>

                {/* Exact Limits Callout (No vague "Limited use") */}
                <div style={{ background: 'var(--surface-sunk)', borderRadius: '8px', padding: '14px', marginBottom: '24px', fontSize: '12px', border: '1px solid var(--line)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Exact Limits Specification:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--ink-2)' }}>
                    <div>• <strong>Recordings:</strong> {plan.limits.recordings}</div>
                    <div>• <strong>Ask AI:</strong> {plan.limits.askAi}</div>
                    <div>• <strong>Templates:</strong> {plan.limits.templates}</div>
                    <div>• <strong>Integrations:</strong> {plan.limits.integrations}</div>
                    <div>• <strong>Retention:</strong> {plan.limits.retention}</div>
                  </div>
                </div>

                {/* Features List */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
                    Included in this plan:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'var(--ink-2)' }}>
                    {plan.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--ok)', fontWeight: 800 }}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3-QUESTION PLAN FINDER */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '16px', padding: '40px', marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Chip variant="cue">Interactive Recommendation</Chip>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginTop: '8px', marginBottom: '8px' }}>
              Not sure which plan fits? Answer 3 quick questions.
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px' }}>
              Tell us about your team size and workflow priorities to receive an instant plan recommendation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {PLAN_FINDER_QUESTIONS.map((q) => (
              <div key={q.id} style={{ background: 'var(--surface-sunk)', borderRadius: '12px', padding: '20px', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', marginBottom: '12px' }}>
                  {q.prompt}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {q.options.map((opt, idx) => {
                    const isSelected = finderAnswers[q.id] === opt.recommendedPlanId;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleFinderSelect(q.id, opt.recommendedPlanId)}
                        style={{
                          textAlign: 'left',
                          padding: '10px 14px',
                          borderRadius: '6px',
                          border: isSelected ? '2px solid var(--ink)' : '1px solid var(--line)',
                          background: isSelected ? '#ffffff' : 'var(--surface)',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>{opt.label}</div>
                        <div style={{ fontSize: '11px', color: 'var(--ink-3)', marginTop: '2px' }}>{opt.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {recommendedPlan && (
            <div style={{ background: '#E6FFFA', border: '1px solid #38B2AC', borderRadius: '8px', padding: '16px 24px', textAlign: 'center' }}>
              <span style={{ fontSize: '15px', color: '#234E52', fontWeight: 700 }}>
                💡 Recommendation based on your inputs:{' '}
                <strong>
                  {recommendedPlan === 'free' ? 'Free Forever' : recommendedPlan === 'team' ? 'Team Edition ($19/mo)' : 'Enterprise / Scale'}
                </strong>
              </span>
              <div style={{ marginTop: '8px' }}>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    if (recommendedPlan === 'enterprise') {
                      setIsEnterpriseModalOpen(true);
                    } else {
                      navigate(`/signup?plan=${recommendedPlan}`);
                    }
                  }}
                >
                  Choose {recommendedPlan === 'free' ? 'Free' : recommendedPlan === 'team' ? 'Team' : 'Enterprise'} →
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* DETAILED COMPARISON TABLE WITH STICKY HEADERS */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Detailed Plan Feature Comparison
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px' }}>
              Exact limits and capabilities across all tiers. No ambiguous footnotes or vague asterisks.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Sticky Table Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                padding: '16px 24px',
                background: 'var(--surface-sunk)',
                borderBottom: '1px solid var(--line)',
                fontWeight: 800,
                fontSize: '13px',
                position: 'sticky',
                top: '60px',
                zIndex: 20,
              }}
            >
              <div>Feature Category</div>
              <div>Free Forever</div>
              <div style={{ color: 'var(--cue)' }}>Team Edition</div>
              <div>Enterprise</div>
            </div>

            {/* Accordion Categories */}
            {PRICING_COMPARISON_CATEGORIES.map((cat, catIdx) => {
              const isOpen = activeAccordion === catIdx;
              return (
                <div key={cat.category} style={{ borderBottom: '1px solid var(--line)' }}>
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : catIdx)}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      background: 'var(--surface)',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--ink)',
                    }}
                  >
                    <span>{cat.category}</span>
                    <span>{isOpen ? '▲' : '▼'}</span>
                  </button>

                  {isOpen && (
                    <div style={{ background: 'var(--canvas)' }}>
                      {cat.rows.map((row, rIdx) => (
                        <div
                          key={rIdx}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1fr 1fr 1fr',
                            padding: '12px 24px',
                            borderTop: '1px solid var(--line)',
                            fontSize: '13px',
                            alignItems: 'center',
                          }}
                        >
                          <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{row.feature}</div>
                          <div style={{ color: 'var(--ink-2)' }}>{row.free}</div>
                          <div style={{ color: 'var(--cue)', fontWeight: 700 }}>{row.team}</div>
                          <div style={{ color: 'var(--ink-2)' }}>{row.enterprise}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* PRICING FAQS */}
        <div style={{ maxWidth: '860px', margin: '0 auto 64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px' }}>
              Clear answers regarding demo pricing, billing frequency, and enterprise agreements.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {PRICING_FAQS.map((faq, idx) => (
              <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
                  {faq.q}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Dialog Modal */}
        <Dialog
          isOpen={isEnterpriseModalOpen}
          onClose={() => setIsEnterpriseModalOpen(false)}
          title="Enterprise Solution Consultation (Sample)"
        >
          <div style={{ padding: '8px 0', fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5 }}>
            <p style={{ marginBottom: '16px' }}>
              This is a sample enterprise contact dialog for the Fathom rebuild evaluation. In a live deployment, this submits to your solutions engineering queue for custom SAML/SSO configuration and custom CRM field mapping.
            </p>
            <div style={{ background: 'var(--surface-sunk)', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)', marginBottom: '16px' }}>
              <div><strong>Enterprise Scope:</strong> 25+ seats</div>
              <div><strong>Included Features:</strong> SOC2 Report, Dedicated CSM, Custom Webhook SLAs</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button variant="secondary" onClick={() => setIsEnterpriseModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => setIsEnterpriseModalOpen(false)}>
                Simulate Consultation Request
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </SiteShell>
  );
};
