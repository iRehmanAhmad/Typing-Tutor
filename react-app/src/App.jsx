import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { TabProvider, useTabs } from './context/TabContext';
import Navbar from './components/Layout/Navbar';
import HomeView from './components/Views/HomeView';
import CourseView from './components/Views/CourseView';
import TestView from './components/Views/TestView';
import StatsView from './components/Views/StatsView';

const AppContent = () => {
  const { activeTab } = useTabs();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'course' && <CourseView />}
        {activeTab === 'test' && <TestView />}
        {activeTab === 'stats' && <StatsView />}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <TabProvider>
          <AppContent />
        </TabProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
