import { useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';

export default function App() {
  // Keep navigation and mobile menu state here so every sidebar item shares one route switch.
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [searchValue, setSearchValue] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const signOut = () => {
    setIsSignedIn(false);
    setCurrentPage('Dashboard');
    setSearchValue('');
  };

  if (!isSignedIn) return <LoginPage onContinue={() => setIsSignedIn(true)} />;

  return (
    <div className="app-shell">
      <Sidebar currentPage={currentPage} onNavigate={navigate} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-shell">
        <Header
          pageTitle={currentPage}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={signOut}
        />
        <main>
          {currentPage === 'Dashboard'
            ? <Dashboard searchValue={searchValue} onNavigate={navigate} />
            : <PlaceholderPage pageTitle={currentPage} onNavigate={navigate} />}
        </main>
      </div>
    </div>
  );
}