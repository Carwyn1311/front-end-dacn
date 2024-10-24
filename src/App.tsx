import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './features/Sidebar/Content/Sidebar';
import AdminUser from './features/Admin/User/AdminUser';
import MainContent from './features/Maincontent/Content/MainContent';
import Profile from './features/Profile/Profile';
import Help from './features/Help/Help';
import Info from './features/Info/Info';
import ChatPage from './features/ChatPage/ChatPage';
import './App.css';
import Login from './features/Login/Content/Login';
import ActivateAccount from './features/ActivateAccount/ActivateAccount';
import Button from './components/Button/Button';
import CreateConversation from './features/Maincontent/Content/CreateConversation';

import { User } from './features/User/Content/User';
import Analytics from './features/LoadAnalytics/Analytics';

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = User.getUserData();

    if (currentUser && currentUser.username) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    User.clearUserData();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleConversationCreated = (conversationId: string) => {
    setCurrentConversationId(conversationId);
  };

  const handleSelectConversation = (conversationId: string, conversationMessages: any[]) => {
    setSelectedConversationId(conversationId);
    setMessages(conversationMessages);
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} style={{ display: 'flex', height: '100vh' }}>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />

        <Route
          path="*"
          element={
            !isLoggedIn ? <Navigate to="/login" /> : (
              <div style={{ display: 'flex', height: '100vh' }}>
                {isSidebarOpen && (
                  <Sidebar
                    userName={User.getUserData()?.username || ''}
                    email={User.getUserData()?.email || ''}
                    isOpen={isSidebarOpen}
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout}
                    onSelectConversation={handleSelectConversation}
                  />
                )}

                <div className="main-content" style={{ flexGrow: 1, padding: '20px', transition: 'margin-left 0.3s', marginLeft: isSidebarOpen ? '250px' : '0', overflow: 'auto' }}>
                  <header className="app-header" style={{ backgroundColor: 'white', borderBottom: '1px solid #ddd', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', top: '0', left: isSidebarOpen ? '250px' : '0', width: isSidebarOpen ? 'calc(100% - 250px)' : '100%', zIndex: '1' }}>
                    <Button onClick={toggleSidebar} className="sidebar-toggle-button" style={{ fontSize: '24px', cursor: 'pointer' }}>
                      &#9776;
                    </Button>

                    {isLoggedIn && (
                      <CreateConversation username={User.getUserData()?.username || ''} onConversationCreated={handleConversationCreated} />
                    )}
                  </header>

                  <div style={{ marginTop: '80px' }}>
                    <Routes>
                      <Route path="/" element={<MainContent conversationId={selectedConversationId} messages={messages} />} />
                      <Route path="/admin" element={<AdminUser />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/info" element={<Info />} />
                      <Route path="/chat" element={<ChatPage />} />
                      <Route path="/activate" element={<ActivateAccount />} />
                      <Route path="/analytics" element={<Analytics />} /> {/* Thêm route cho Analytics */}
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>

                    {currentConversationId && (
                      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                        Conversation ID: {currentConversationId}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
