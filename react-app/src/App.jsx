import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <div className="min-h-screen bg-background text-text-primary">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Dashboard />
          </main>
        </div>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
