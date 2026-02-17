import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { TabProvider, useTabs } from './context/TabContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { PlatformProvider } from './context/PlatformContext';
import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, lazy } from 'react';
import Navbar from './layouts/Navbar';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const Course = lazy(() => import('./pages/Course'));
const Practice = lazy(() => import('./pages/Practice'));
const Test = lazy(() => import('./pages/Test'));
const Stats = lazy(() => import('./pages/Stats'));
const Games = lazy(() => import('./pages/Games'));
const Certificate = lazy(() => import('./pages/Certificate'));
const AdminHQ = lazy(() => import('./features/admin/AdminHQ'));

const LoadingScreen = () => (
  <div className="h-full w-full flex flex-col items-center justify-center space-y-4 min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    <p className="text-xs font-black text-text-muted uppercase tracking-[0.3em] animate-pulse">Loading...</p>
  </div>
);

const AppContent = () => {
  const { activeTab } = useTabs();
  useTheme();
  const { loading: authLoading } = useAuth();
  const { loading: progressLoading } = useProgress();
  const [visitedTabs, setVisitedTabs] = React.useState(() => new Set(['home']));

  React.useEffect(() => {
    setVisitedTabs(prev => {
      if (prev.has(activeTab)) return prev;
      return new Set(prev).add(activeTab);
    });
  }, [activeTab]);

  // Handle Certificate Verification Route
  const params = new URLSearchParams(window.location.search);
  const verifyId = params.get('verify');

  if (verifyId) {
    return <Certificate certId={verifyId} />;
  }

  if (authLoading || progressLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black text-text-muted uppercase tracking-[0.3em] animate-pulse">Loading Typing Master...</p>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen text-text-primary font-sans selection:bg-accent/20 selection:text-accent transition-colors duration-500">
        <Navbar />
        <main className="container mx-auto px-4 pt-8 pb-24 md:pb-8">
          <div style={{ display: activeTab === 'home' ? 'block' : 'none' }}>
            {visitedTabs.has('home') && (
              <Suspense fallback={<LoadingScreen />}><Home /></Suspense>
            )}
          </div>
          <div style={{ display: activeTab === 'course' ? 'block' : 'none' }}>
            {visitedTabs.has('course') && (
              <Suspense fallback={<LoadingScreen />}><Course /></Suspense>
            )}
          </div>
          <div style={{ display: activeTab === 'practice' ? 'block' : 'none' }}>
            {visitedTabs.has('practice') && (
              <Suspense fallback={<LoadingScreen />}><Practice isVisible={activeTab === 'practice'} /></Suspense>
            )}
          </div>
          <div style={{ display: activeTab === 'test' ? 'block' : 'none' }}>
            {visitedTabs.has('test') && (
              <Suspense fallback={<LoadingScreen />}><Test isVisible={activeTab === 'test'} /></Suspense>
            )}
          </div>
          <div style={{ display: activeTab === 'games' ? 'block' : 'none' }}>
            {visitedTabs.has('games') && (
              <Suspense fallback={<LoadingScreen />}><Games isVisible={activeTab === 'games'} /></Suspense>
            )}
          </div>
          <div style={{ display: activeTab === 'stats' ? 'block' : 'none' }}>
            {visitedTabs.has('stats') && (
              <Suspense fallback={<LoadingScreen />}><Stats /></Suspense>
            )}
          </div>
          <div style={{ display: activeTab === 'admin' ? 'block' : 'none' }}>
            {visitedTabs.has('admin') && (
              <Suspense fallback={<LoadingScreen />}><AdminHQ /></Suspense>
            )}
          </div>
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
