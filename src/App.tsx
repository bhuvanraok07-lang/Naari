import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { ConsentModal } from './components/common/ConsentModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { CycleCarePage } from './components/cycle/CycleCarePage';
import { PcosCarePage } from './components/pcos/PcosCarePage';
import { AiInterpreterPage } from './components/ai/AiInterpreterPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { ReportViewPage } from './components/report/ReportViewPage';

export const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [, setRefreshCount] = useState(0);

  const handleDataChanged = () => {
    setRefreshCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-nearBlack font-sans">
      {/* Non-diagnostic Medical Notice */}
      <DisclaimerBanner />

      {/* Main Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        openSettings={() => setIsSettingsOpen(true)} 
      />

      {/* Page Routing */}
      <main className="flex-1">
        {currentTab === 'landing' && <LandingPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'dashboard' && (
          <DashboardPage 
            setCurrentTab={setCurrentTab} 
            openSettings={() => setIsSettingsOpen(true)} 
          />
        )}
        {currentTab === 'cycle' && <CycleCarePage />}
        {currentTab === 'pcos' && <PcosCarePage setCurrentTab={setCurrentTab} />}
        {currentTab === 'ai' && <AiInterpreterPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'analytics' && <AnalyticsPage />}
        {currentTab === 'report' && <ReportViewPage setCurrentTab={setCurrentTab} />}
      </main>

      {/* Privacy and Consent Modal */}
      <ConsentModal />

      {/* Settings & Privacy Controls */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onDataChanged={handleDataChanged}
      />

      {/* Global Footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
