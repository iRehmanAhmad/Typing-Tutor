import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { TabProvider, useTabs } from './context/TabContext';
import { ThemeProvider } from './context/ThemeContext';
import { PlatformProvider } from './context/PlatformContext';
import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, lazy } from 'react';
import Navbar from './components/Layout/Navbar';
import HomeView from './components/Views/HomeView';
import CourseView from './components/Views/CourseView';
import PracticeView from './components/Views/PracticeView';
import TestView from './components/Views/TestView';
import VerifyCertificate from './components/Views/VerifyCertificate';
import Dashboard from './components/Dashboard/Dashboard';

// Lazy Load Heavy Views
const StatsView = lazy(() => import('./components/Views/StatsView'));
const GamesView = lazy(() => import('./components/Views/GamesView'));
const AdminHQ = lazy(() => import('./components/Admin/AdminHQ'));

const LoadingScreen = () => (
  <div className="h-full w-full flex flex-col items-center justify-center space-y-4 min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    <p className="text-xs font-black text-text-muted uppercase tracking-[0.3em] animate-pulse">Initializing Module...</p>
  </div>
);

const AppContent = () => {
  const { activeTab } = useTabs();
  const { loading: authLoading } = useAuth();
  const { loading: progressLoading } = useProgress();

  // Handle Certificate Verification Route
  const params = new URLSearchParams(window.location.search);
  const verifyId = params.get('verify');

  if (verifyId) {
    return <VerifyCertificate certId={verifyId} />;
  }

  if (authLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black text-text-muted uppercase tracking-[0.3em] animate-pulse">Initializing Tactical Mastery...</p>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background text-text-primary font-sans selection:bg-accent/20 selection:text-accent">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<LoadingScreen />}>
            {activeTab === 'home' && <Dashboard />}
            {activeTab === 'course' && <CourseView />}
            {activeTab === 'practice' && <PracticeView />}
            {activeTab === 'test' && <TestView />}
            {activeTab === 'games' && <GamesView />}
            {activeTab === 'stats' && <StatsView />}
            {activeTab === 'admin' && <AdminHQ />}
          </Suspense>
        </main>
      </div>
    </HelmetProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <PlatformProvider>
          <ThemeProvider>
            <TabProvider>
              <AppContent />
            </TabProvider>
          </ThemeProvider>
        </PlatformProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
