import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { AppShell } from './components/shell/AppShell';

// Marketing & Story Pages
import { LandingPage } from './pages/LandingPage';
import { StoryPage } from './pages/StoryPage';
import { PricingPage } from './pages/PricingPage';
import { RoleSolutionPage } from './pages/RoleSolutionPage';
import { IntegrationsDirectoryPage } from './pages/IntegrationsDirectoryPage';
import { IntegrationDetailPage } from './pages/IntegrationDetailPage';
import { ChangelogPage } from './pages/ChangelogPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { ResourceHubPage } from './pages/ResourceHubPage';
import { ArticlePage } from './pages/ArticlePage';
import { DevelopersPage } from './pages/DevelopersPage';
import { HelpPage } from './pages/HelpPage';
import { TrustPage } from './pages/TrustPage';
import { CompanyPage } from './pages/CompanyPage';
import { LegalPage } from './pages/LegalPage';
import { FormsPage } from './pages/FormsPage';
import { StatusPage } from './pages/StatusPage';
import { CareersPage } from './pages/CareersPage';
import { PartnerProgramsPage } from './pages/PartnerProgramsPage';

// Dev & Verification
import { ParityBoardPage } from './pages/ParityBoardPage';
import { DesignGalleryPage } from './pages/DesignGalleryPage';
import { RecapEmailPage } from './pages/RecapEmailPage';

// Core App Pages
import { MeetingsHomePage } from './pages/MeetingsHomePage';
import { MeetingDetailPage } from './pages/MeetingDetailPage';
import { SharedRecipientPage } from './pages/SharedRecipientPage';
import { LiveSimulationPage } from './pages/LiveSimulationPage';
import { SettingsPage } from './pages/SettingsPage';
import { OnboardingPage } from './pages/OnboardingPage';

// Tier B App Breadth Pages
import { TemplatesBuilderPage } from './pages/TemplatesBuilderPage';
import { DealViewPage } from './pages/DealViewPage';
import { ScorecardsPage } from './pages/ScorecardsPage';
import { TrackersPage } from './pages/TrackersPage';
import { HighlightsPage } from './pages/HighlightsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PointsPage } from './pages/PointsPage';

// 404 Fallback
const NotFoundPage: React.FC = () => (
  <div style={{ maxWidth: '520px', margin: '80px auto', textAlign: 'center', padding: '0 20px', fontFamily: 'var(--font-ui)' }}>
    <span
      style={{
        display: 'inline-block',
        fontSize: '48px',
        fontWeight: 800,
        color: 'var(--cue)',
        marginBottom: '16px',
      }}
    >
      404
    </span>
    <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
      Page not found
    </h1>
    <p style={{ color: 'var(--ink-2)', marginBottom: '24px', fontSize: '15px' }}>
      This route does not exist. Use the parity ledger or global search to navigate.
    </p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
      <Link to="/" className="btn btn-secondary">
        Return to Home
      </Link>
      <Link to="/meetings" className="btn btn-primary">
        Open Meetings App
      </Link>
    </div>
  </div>
);

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* TIER 1 MARKETING ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/overview" element={<StoryPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/solutions/:role" element={<RoleSolutionPage />} />
          <Route path="/integrations" element={<IntegrationsDirectoryPage />} />
          <Route path="/integrations/category/:slug" element={<IntegrationsDirectoryPage />} />
          <Route path="/integrations/:slug" element={<IntegrationDetailPage />} />
          <Route path="/whats-new" element={<ChangelogPage />} />

          {/* TIER 2 COMPARISONS, HUBS, DOCS, HELP, TRUST, LEGAL */}
          <Route path="/vs" element={<ComparisonPage />} />
          <Route path="/vs/:slug" element={<ComparisonPage />} />
          <Route path="/resource-hub" element={<ResourceHubPage />} />
          <Route path="/learn" element={<ResourceHubPage />} />
          <Route path="/learn/:slug" element={<ArticlePage />} />
          <Route path="/case-studies/:slug" element={<ArticlePage />} />
          <Route path="/news/:slug" element={<ArticlePage />} />
          <Route path="/partner-programs" element={<PartnerProgramsPage />} />
          <Route path="/program/:slug" element={<PartnerProgramsPage />} />
          <Route path="/program/:slug/apply" element={<FormsPage />} />

          {/* DEVELOPERS HUB */}
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/developers/:subpage" element={<DevelopersPage />} />

          {/* HELP CENTER */}
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:subview" element={<HelpPage />} />
          <Route path="/help/:subview/:slug" element={<HelpPage />} />

          {/* TRUST, STATUS, LEGAL, CAREERS */}
          <Route path="/trust" element={<TrustPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/about-us" element={<CompanyPage />} />
          <Route path="/brand" element={<CompanyPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:role" element={<CareersPage />} />

          {/* FORMS & ONBOARDING */}
          <Route path="/signup" element={<FormsPage />} />
          <Route path="/login" element={<FormsPage />} />
          <Route path="/book-demo" element={<FormsPage />} />
          <Route path="/switch" element={<FormsPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* DEV & VERIFICATION */}
          <Route path="/dev/parity" element={<ParityBoardPage />} />
          <Route
            path="/dev/design"
            element={
              <AppShell currentTitle="Design Gallery">
                <DesignGalleryPage />
              </AppShell>
            }
          />
          <Route path="/dev/recap-email" element={<RecapEmailPage />} />

          {/* CORE PRODUCT APPSHELL ROUTES */}
          <Route
            path="/meetings"
            element={
              <AppShell currentTitle="Meetings">
                <MeetingsHomePage />
              </AppShell>
            }
          />
          <Route
            path="/meetings/:id"
            element={
              <AppShell>
                <MeetingDetailPage />
              </AppShell>
            }
          />
          <Route
            path="/live"
            element={
              <AppShell currentTitle="Live Capture">
                <LiveSimulationPage />
              </AppShell>
            }
          />
          <Route
            path="/settings"
            element={
              <AppShell currentTitle="Settings">
                <SettingsPage />
              </AppShell>
            }
          />
          <Route path="/s/:token" element={<SharedRecipientPage />} />

          {/* TIER B APP BREADTH */}
          <Route path="/app/templates" element={<TemplatesBuilderPage />} />
          <Route path="/app/deals" element={<DealViewPage />} />
          <Route path="/app/deals/:id" element={<DealViewPage />} />
          <Route path="/app/scorecards" element={<ScorecardsPage />} />
          <Route path="/app/trackers" element={<TrackersPage />} />
          <Route path="/app/highlights" element={<HighlightsPage />} />
          <Route path="/app/analytics" element={<AnalyticsPage />} />
          <Route path="/app/points" element={<PointsPage />} />

          {/* 404 FALLBACK */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
