import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { AppShell } from './components/shell/AppShell';
import { LandingPage } from './pages/LandingPage';
import { MeetingsHomePage } from './pages/MeetingsHomePage';
import { MeetingDetailPage } from './pages/MeetingDetailPage';
import { SharedRecipientPage } from './pages/SharedRecipientPage';
import { LiveSimulationPage } from './pages/LiveSimulationPage';
import { SettingsPage } from './pages/SettingsPage';
import { DesignGalleryPage } from './pages/DesignGalleryPage';
import { RecapEmailPage } from './pages/RecapEmailPage';
import { OnboardingPage } from './pages/OnboardingPage';

// 404 Page Component
const NotFoundPage: React.FC = () => (
  <div style={{ maxWidth: '500px', margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
    <span
      style={{
        display: 'inline-block',
        fontSize: '48px',
        fontWeight: 800,
        color: 'var(--ink-3)',
        marginBottom: '16px',
      }}
    >
      404
    </span>
    <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
      Page not found
    </h1>
    <p style={{ color: 'var(--ink-2)', marginBottom: '24px', fontSize: '15px' }}>
      This route does not exist. It may have been moved or deleted.
    </p>
    <Link to="/meetings" className="btn btn-primary">
      Return to Meetings Library
    </Link>
  </div>
);

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Marketing */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Core Product AppShell Routes */}
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

          <Route
            path="/dev/design"
            element={
              <AppShell currentTitle="Design Gallery">
                <DesignGalleryPage />
              </AppShell>
            }
          />

          {/* Public Recipient Share View (No login required) */}
          <Route path="/s/:token" element={<SharedRecipientPage />} />

          {/* Dev Preview Routes */}
          <Route path="/dev/recap-email" element={<RecapEmailPage />} />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <AppShell currentTitle="Not Found">
                <NotFoundPage />
              </AppShell>
            }
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
