import React, { useState, useEffect } from 'react';
import './App.css';
import MainContent from './features/Maincontent/Content/MainContent';
import Button from './components/Button/Button';
import { TourProvider } from './features/TourSlider/Content/TourContext';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import Sidebar from './features/Sidebar/Content/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from './features/BookingForm/Content/BookingForm';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1000);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    const isMobileView = window.innerWidth < 600;
    setIsMobile(isMobileView);

    if (window.innerWidth < 1000) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BrowserRouter>
      <TourProvider>
        <div style={{ display: 'flex', height: '100vh' }}>
          {!isMobile && (
            <Sidebar 
              isOpen={isSidebarOpen} 
              isLoggedIn={true} 
              onLogout={() => console.log('Logged out')} 
            />
          )}

          <div
            className="main-content"
            style={{
              flexGrow: 1,
              transition: 'margin-left 0.3s',
              marginLeft: isSidebarOpen && !isMobile ? '250px' : '0',
              overflow: 'auto',
            }}
          >
            <header className="app-header">
              <div className="top-bar">
                <div className="contact-info">
                  <MailOutlined /> info@saigontourist.net
                  <span className="separator">|</span>
                  <PhoneOutlined /> Hotline: 1900 1808
                </div>
                <div className="user-options">
                  <EnvironmentOutlined /> Chọn điểm khởi hành
                  <span className="separator">|</span>
                  <UserOutlined /> Đăng nhập
                  <span className="separator">|</span>
                  <span className="language">🇬🇧 English</span>
                </div>
              </div>

              <div className="nav-bar">
                <div className="logo">
                  <img src="/path-to-your-logo.png" alt="Saigontourist Logo" className="logo-image" />
                  <span className="logo-text">SAIGONTOURIST TRAVEL</span>
                </div>
                <nav className="navigation">
                  <a href="/">TRANG CHỦ</a>
                  <a href="/domestic-tours">TOUR TRONG NƯỚC</a>
                  <a href="/international-tours">TOUR NƯỚC NGOÀI</a>
                  <a href="/services">DỊCH VỤ DU LỊCH</a>
                  <a href="/contact">LIÊN HỆ</a>
                </nav>
                <div className="search-bar">
                  <SearchOutlined className="search-icon" />
                </div>
              </div>
              <Button onClick={toggleSidebar} className="sidebar-toggle-button">
                &#9776;
              </Button>
            </header>

            <div style={{ marginTop: '130px' }}>
              <MainContent />
              <BookingForm />
            </div>
          </div>
        </div>
      </TourProvider>
    </BrowserRouter>
  );
};

export default App;
