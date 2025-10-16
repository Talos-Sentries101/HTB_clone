import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Challenges } from './pages/Challenges';
import { Courses } from './pages/Courses';
import { Community } from './pages/Community';

type Page = 'dashboard' | 'courses' | 'challenges' | 'community';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <Courses />;
      case 'challenges':
        return <Challenges />;
      case 'community':
        return <Community />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Toaster />
      <Sonner />
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;
