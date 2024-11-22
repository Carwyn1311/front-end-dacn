import TravelPageDongBac from './features/AllTours/Tours/TravelPageDongBac';
import TravelPageHaNoi from './features/AllTours/Tours/TravelPageHaNoi';
import React, { useState, useEffect } from 'react';
import './App.css';
import MainContent from './features/Maincontent/Content/MainContent';
import Button from './components/Button/Button';
import { TourProvider } from './features/TourSlider/Content/TourContext';
import { UserOutlined, SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { RiMenuUnfold4Fill } from 'react-icons/ri'; // Import từ react-icons
import Sidebar from './features/Sidebar/Content/Sidebar';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './features/Login/Content/Login';
import { User } from './features/User/Content/User';
import AutoSearch from './components/AutoSearchField/AutoSearch';
import { HiChevronDoubleLeft, HiOutlineMenu } from "react-icons/hi";
import AdminRoutes from './features/Admin/Content/AdminRoutes';
import AdminUser from './features/Admin/Content/AdminUser';
import AdminTourManagement from './features/Admin/Content/AdminTourManagement';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedItem, setSelectedItem] = useState<string>(''); // Thêm khai báo biến selectedItem
  const navigate = useNavigate();

  useEffect(() => {
    const user = User.getUserData();
    if (user && user.username) {
      setIsLoggedIn(true);
      setUsername(user.username);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vn' : 'en');
  };

  const onLogin = () => {
    const user = User.getUserData();
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username);
      navigate('/');
    }
  };

  const onLogout = () => {
    User.clearUserData();
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <TourProvider>
      <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar
          isOpen={isSidebarOpen}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
        />

        <div className="app-main-content">
          <header className="app-header">
            <div className="top-bar">
              <div className="contact-info">
                <Button onClick={toggleSidebar} className="sidebar-toggle-button">
                  {isSidebarOpen ? <HiChevronDoubleLeft /> : <HiOutlineMenu />}
                </Button>
              </div>
              <div className="contact-info">
                <label> DPT Travel </label>
              </div>
              <div className="user-options">
                  {selectedItem && (
                    <p style={{ marginTop: '20px' }}>
                      Mục bạn đã chọn: <strong>{selectedItem}</strong>
                    </p>
                  )}
                {isLoggedIn ? (
                  <Button className="username">{username}</Button>
                ) : (
                  <Button className="button-login" onClick={() => navigate('/login')}>
                    <UserOutlined /> {language === 'en' ? 'Login' : 'Đăng nhập'}
                  </Button>
                )}
                {/* Nút chuyển đổi ngôn ngữ */}
                <Button className="language" onClick={toggleLanguage}>
                  {language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
                </Button>
              </div>
            </div>
          </header>

          <div className="content-wrapper">
            <Routes>
              <Route path="/travel/dongbac-taybac" element={<TravelPageDongBac />} />
              <Route path="/travel/mien-bac/ha-noi" element={<TravelPageHaNoi />} />
              <Route path="/" element={<MainContent />} />
              <Route path="/login" element={<Login onLogin={onLogin} />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/admin/manage-users" element={<AdminUser />} />
              <Route path="/admin/img-slider" element={<AdminTourManagement />} />
            </Routes>
            {/* <Routes></Routes> */}
          </div>
        </div>
        <div className="content-bottom">

        </div>
      </div>
    </TourProvider>
  );
};

export default App;
