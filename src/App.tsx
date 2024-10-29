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
import ForgotPassword from './features/ForgotPassword/Content/ForgotPassword';
import CreateAccount from './features/CreateAccount/Content/CreateAccount';

const PUBLIC_ROUTES = ['/login', '/activate', '/forgot-password', '/create-account'];

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const ProtectedLayout: React.FC<{
  children: React.ReactNode;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  handleLogout: () => void;
  userName: string;
  email: string;
  onSelectConversation: (id: string, messages: any[]) => void;
  onConversationCreated: (id: string) => void;
}> = ({
  children,
  isSidebarOpen,
  toggleSidebar,
  isLoggedIn,
  handleLogout,
  userName,
  email,
  onSelectConversation,
  onConversationCreated
}) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {isSidebarOpen && (
        <Sidebar
          userName={userName}
          email={email}
          isOpen={isSidebarOpen}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onSelectConversation={onSelectConversation}
        />
      )}

      <div className="main-content" style={{
        flexGrow: 1,
        transition: 'margin-left 0.3s',
        marginLeft: isSidebarOpen ? '250px' : '0',
        overflow: 'auto'
      }}>
        <header className="app-header" style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #ddd',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          top: '0',
          left: isSidebarOpen ? '250px' : '0',
          width: isSidebarOpen ? 'calc(100% - 250px)' : '100%',
          zIndex: '1',
        }}>
          <Button onClick={toggleSidebar} className="sidebar-toggle-button">
            &#9776;
          </Button>

          <CreateConversation className="create-conversation-button"
            username={userName}
            onConversationCreated={onConversationCreated}
          />
        </header>

        <div style={{ marginTop: '80px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const user = User.getUserData();
    const currentPath = window.location.pathname;
    
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);

      // In ra quyền của người dùng trong console
      console.log(`Quyền của người dùng hiện tại: ${user.role}`);

      if (currentPath === '/login') {
        navigate('/');
      }
    } else if (!PUBLIC_ROUTES.includes(currentPath)) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    const user = User.getUserData();
    setCurrentUser(user);

    // In ra quyền của người dùng sau khi đăng nhập
    console.log(`Quyền của người dùng sau khi đăng nhập: ${user?.role}`);
    
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    User.clearUserData();
    setCurrentUser(null);
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

  // Hàm render tuyến đường công khai
  const renderPublicRoute = (Component: React.ComponentType<any>, props: any = {}) => {
    return isLoggedIn ? <Navigate to="/" /> : <Component {...props} />;
  };

  // Hàm render tuyến đường bảo mật (cần đăng nhập)
  const renderProtectedRoute = (Component: React.ComponentType<any>, props: any = {}) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    return (
      <ProtectedLayout
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        userName={currentUser?.username || ''}
        email={currentUser?.email || ''}
        onSelectConversation={handleSelectConversation}
        onConversationCreated={handleConversationCreated}
      >
        <Component {...props} />
        {currentConversationId && (
          <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
            Conversation ID: {currentConversationId}
          </div>
        )}
      </ProtectedLayout>
    );
  };

  // Hàm render tuyến đường dành riêng cho Admin
  const renderAdminRoute = (Component: React.ComponentType<any>, props: any = {}) => {
    if (!isLoggedIn) return <Navigate to="/login" />;
    if (!currentUser?.isAdmin()) return <Navigate to="/" />; // Chuyển hướng nếu không phải là admin
    return renderProtectedRoute(Component, props);
  };
  
  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Routes>
        {/* Các tuyến đường công khai */}
        <Route 
          path="/login" 
          element={renderPublicRoute(Login, { onLogin: handleLogin })} 
        />
        <Route 
          path="/create-account" 
          element={renderPublicRoute(CreateAccount)} 
        />
        <Route 
          path="/activate" 
          element={renderPublicRoute(ActivateAccount)} 
        />
        <Route 
          path="/forgot-password" 
          element={renderPublicRoute(ForgotPassword)} 
        />

        {/* Các tuyến đường bảo mật */}
        <Route 
          path="/" 
          element={renderProtectedRoute(MainContent, { 
            conversationId: selectedConversationId, 
            messages: messages 
          })} 
        />
        <Route 
          path="/profile" 
          element={renderProtectedRoute(Profile)} 
        />
        <Route 
          path="/help" 
          element={renderProtectedRoute(Help)} 
        />
        <Route 
          path="/info" 
          element={renderProtectedRoute(Info)} 
        />
        <Route 
          path="/chat" 
          element={renderProtectedRoute(ChatPage)} 
        />
        <Route 
          path="/analytics" 
          element={renderProtectedRoute(Analytics)} 
        />

        {/* Tuyến đường chỉ dành cho Admin */}
        <Route 
          path="/admin" 
          element={renderAdminRoute(AdminUser)} 
        />

        <Route 
          path="*" 
          element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </div>
  );
};

export default App;
