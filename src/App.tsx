import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './features/Sidebar/Content/Sidebar';
import AdminUser from './features/Admin/User/AdminUser';
import MainContent from './features/Maincontent/MainContent';
import Profile from './features/Profile/Profile';
import Help from './features/Help/Help';
import Info from './features/Info/Info';
import ChatPage from './features/ChatPage/ChatPage';
import './App.css';
import Login from './features/Login/Content/Login';
import ActivateAccount from './features/ActivateAccount/ActivateAccount';
import Button from './components/Button/Button';

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setEmail('');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // If not logged in, show only the login page
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect any other path to login */}
      </Routes>
    );
  }

  // If logged in, show the full application with the sidebar, header, and main content
  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <Sidebar
          userName={userName}
          email={email}
          isOpen={isSidebarOpen}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content with Header */}
      <div className="main-content" style={{ flexGrow: 1, padding: '20px', transition: 'margin-left 0.3s', marginLeft: isSidebarOpen ? '250px' : '0', overflow: 'auto' }}>
        {/* Header */}
        <header className="app-header" style={{ backgroundColor: '#f11', borderBottom: '1px solid #ddd', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', top: '0', left: isSidebarOpen ? '250px' : '0', width: isSidebarOpen ? 'calc(100% - 250px)' : '100%', zIndex: '1' }}>
          <Button onClick={toggleSidebar} className="sidebar-toggle-button" style={{ fontSize: '24px', cursor: 'pointer' }}>
            &#9776;
          </Button>
        </header>

        {/* Main Content Routes */}
        <div style={{ marginTop: '80px' }}> {/* Adding margin to account for fixed header */}
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/admin" element={<AdminUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/help" element={<Help />} />
            <Route path="/info" element={<Info />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/activate" element={<ActivateAccount />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown paths to home */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
