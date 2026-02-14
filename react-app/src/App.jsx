import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { TabProvider, useTabs } from './context/TabContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Layout/Navbar';
import HomeView from './components/Views/HomeView';
import CourseView from './components/Views/CourseView';
import PracticeView from './components/Views/PracticeView';
import TestView from './components/Views/TestView';
import StatsView from './components/Views/StatsView';
import GamesView from './components/Views/GamesView';

const AppContent = () => {
  const { activeTab } = useTabs();
  const { loading: authLoading } = useAuth();
  const { loading: progressLoading } = useProgress();

  if (authLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black text-text-muted uppercase tracking-[0.3em] animate-pulse">Initializing Tactical Mastery...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary animate-in fade-in duration-700">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'course' && <CourseView />}
        {activeTab === 'practice' && <PracticeView />}
        {activeTab === 'test' && <TestView />}
        {activeTab === 'games' && <GamesView />}
        {activeTab === 'stats' && <StatsView />}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <ThemeProvider>
          <TabProvider>
            <AppContent />
          </TabProvider>
        </ThemeProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
