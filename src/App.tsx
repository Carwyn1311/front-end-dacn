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

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Header Bọc Sidebar và MainContent */}
      <header className="app-header" style={{ display: 'flex', width: '100%' }}>
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

        {/* Main Content */}
        <div
          className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
          style={{ flexGrow: 1, padding: '20px', transition: 'margin-left 0.3s', overflow: 'auto' }}
        >
          {/* Header trong MainContent */}
          <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
            <button onClick={toggleSidebar} className="sidebar-toggle-button" style={{ fontSize: '24px', cursor: 'pointer' }}>
              &#9776;
            </button>
            <div className="app-title" style={{ fontSize: '18px' }}>My App</div> {/* App Title or Logo */}
          </div>

          {/* Main Content Routes */}
          <Routes>
            <Route path="/" element={<PrivateRoute><MainContent  /></PrivateRoute>} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin" element={<PrivateRoute><AdminUser /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
<Route path="/help" element={<PrivateRoute><Help /></PrivateRoute>} />
            <Route path="/info" element={<PrivateRoute><Info /></PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
            <Route path="/activate" element={<ActivateAccount />} />
          </Routes>
        </div>
      </header>
    </div>
  );
};

export default App;