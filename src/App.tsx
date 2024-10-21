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
import { User } from './features/User/Content/User'; // Import lớp User để lấy thông tin người dùng

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
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);  // Lưu conversation ID sau khi tạo
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa dựa trên thông tin trong User.ts
    const currentUser = User.getUserData();

    // Nếu đã đăng nhập, đặt trạng thái isLoggedIn thành true, ngược lại là false
    if (currentUser && currentUser.name) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate('/login'); // Điều hướng về trang login nếu chưa đăng nhập
    }
  }, [navigate]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/'); // Chuyển hướng về trang chính sau khi đăng nhập
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    User.clearUserData(); // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage
    navigate('/login'); // Chuyển hướng đến trang login sau khi đăng xuất
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Callback khi cuộc trò chuyện mới được tạo
  const handleConversationCreated = (conversationId: string) => {
    setCurrentConversationId(conversationId);  // Lưu ID của cuộc trò chuyện
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} style={{ display: 'flex', height: '100vh' }}>
      <Routes>
        {/* Route cho trang đăng nhập */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} // Điều hướng nếu đã đăng nhập
        />

        {/* Các Route khác */}
        <Route
          path="*"
          element={
            !isLoggedIn ? <Navigate to="/login" /> : (
              <div style={{ display: 'flex', height: '100vh' }}>
                {/* Sidebar */}
                {isSidebarOpen && (
                  <Sidebar
                    userName={User.getUserData()?.name || ''}
                    email={User.getUserData()?.email || ''}
                    isOpen={isSidebarOpen}
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout}
                  />
                )}

                {/* Main Content with Header */}
                <div className="main-content" style={{ flexGrow: 1, padding: '20px', transition: 'margin-left 0.3s', marginLeft: isSidebarOpen ? '250px' : '0', overflow: 'auto' }}>
                  {/* Header */}
                  <header className="app-header" style={{ backgroundColor: 'white', borderBottom: '1px solid #ddd', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', top: '0', left: isSidebarOpen ? '250px' : '0', width: isSidebarOpen ? 'calc(100% - 250px)' : '100%', zIndex: '1' }}>
                    <Button onClick={toggleSidebar} className="sidebar-toggle-button" style={{ fontSize: '24px', cursor: 'pointer' }}>
                      &#9776;
                    </Button>

                    {/* Nút tạo cuộc trò chuyện mới trong Header */}
                    {isLoggedIn && (
                      <CreateConversation username={User.getUserData()?.name || ''} onConversationCreated={handleConversationCreated} />
                    )}
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

                    {/* Hiển thị Conversation ID sau khi tạo */}
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
