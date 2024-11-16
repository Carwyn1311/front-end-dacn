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
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleSelectItem = (item: string) => {
    console.log('Mục đã chọn:', item);
    setSelectedItem(item);
  };

  const items = [
    'Apple',
    'Banana',
    'Orange',
    'Grapes',
    'Pineapple',
    'Strawberry',
    'Blueberry',
    'Watermelon',
  ];

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
        {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

        <Sidebar
          isOpen={isSidebarOpen}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
        />

        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <header className="app-header">
            <div className="top-bar">
              <div className="contact-info">
                {/* Cập nhật nút toggle */}
                <Button onClick={toggleSidebar} className="sidebar-toggle-button">
                  {isSidebarOpen ? <HiChevronDoubleLeft /> : <HiOutlineMenu />}
                </Button>
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
                <Button className="language" onClick={toggleLanguage}>
                  {language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
                </Button>
              </div>
            </div>
          </header>

          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/login" element={<Login onLogin={onLogin} />} />
            </Routes>
          </div>
        </div>
      </div>
    </TourProvider>
  );
};

export default App;
