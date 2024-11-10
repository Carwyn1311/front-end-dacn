// App.tsx
import React, { useState } from 'react';
import './App.css';
import MainContent from './features/Maincontent/Content/MainContent';
import Button from './components/Button/Button';
import { TourProvider } from './features/TourSlider/Content/TourContext';
import { UserOutlined, SearchOutlined, ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons';
import Sidebar from './features/Sidebar/Content/Sidebar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookingForm from './features/BookingForm/Content/BookingForm';
import MyComponent from './MyComponent/MyComponent/MyComponent';
import TourDetail from './MyComponent/MyComponent/TourDetail';
import Gallery from './MyComponent/MyComponent/Gallery';
import Tabs from './MyComponent/MyComponent/Tabs';
import { TourProgramContent, TourPolicyContent, TourVisaContent } from './MyComponent/MyComponent/TourProgramContent';
import PostManagement from './MyComponent/MyComponent/PostManagement';
import Login from './features/Login/Content/Login';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'vn' : 'en');

  const images = [
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' },
    { src: '/image4.jpg', alt: 'Image 4' },
    { src: '/image5.jpg', alt: 'Image 5' },
    { src: '/image6.jpg', alt: 'Image 6' },
  ];

  const tabs = [
    { name: language === 'en' ? 'Tour Program' : 'Chương trình Tour', content: <TourProgramContent /> },
    { name: language === 'en' ? 'Tour Policy' : 'Chính sách Tour', content: <TourPolicyContent /> },
    { name: language === 'en' ? 'Procedures & Visa' : 'Thủ tục & Visa', content: <TourVisaContent /> },
  ];

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <TourProvider>
        <div style={{ display: 'flex', height: '100vh' }}>
          {isSidebarOpen && <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>}
          <Sidebar isOpen={isSidebarOpen} isLoggedIn={isAuthenticated} onLogout={handleLogout} />

          <div
            className="main-content"
            style={{
              flexGrow: 1,
              transition: 'margin-left 0.3s',
              marginLeft: isSidebarOpen ? '250px' : '0',
              overflow: 'auto',
            }}
          >
            <header className="app-header">
              <div className="top-bar">
                <Button onClick={toggleSidebar} className="sidebar-toggle-button">
                  {isSidebarOpen ? <ArrowLeftOutlined /> : <MenuOutlined />}
                </Button>
                <div className="user-options" style={{
                  right: '5px',
                  top: '0',
                  transition: 'transform 0.3s, margin-right 0.3s',
                  transform: isSidebarOpen ? 'translateX(-250px)' : 'translateX(0)',
                  marginRight: isSidebarOpen ? '10px' : '0px',
                  overflow: 'auto',
                }}>
                  <UserOutlined />
                  {isAuthenticated ? (
                    <span onClick={handleLogout}>{language === 'en' ? 'Logout' : 'Đăng xuất'}</span>
                  ) : (
                    <span onClick={() => setIsSidebarOpen(false)}>{language === 'en' ? 'Login' : 'Đăng nhập'}</span>
                  )}
                  <SearchOutlined className="search-icon" />
                  <span className="language" onClick={toggleLanguage}>
                    {language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
                  </span>
                </div>
              </div>
            </header>

            <Routes>
              <Route
                path="/login"
                element={<Login onLogin={handleLogin} />}
              />
              <Route
                path="/"
                element={isAuthenticated ? (
                  <>
                    <MainContent />
                    <BookingForm />
                    <MyComponent
                      title="Khám phá Úc cùng Saigontourist"
                      content="Tham gia tour du lịch đến Melbourne và Sydney để tận hưởng kỳ nghỉ Tết Nguyên Đán không thể quên với những trải nghiệm độc đáo."
                      imageUrl="/img1.jpg"
                    />
                    <TourDetail
                      departureDate="27/01/2025"
                      tourCode="STSTOB-2025-00049"
                      price="79.999.000"
                      childPrice="63.999.200"
                      babyPrice="0"
                      details={[
                        "Đón Tết Nguyên Đán 2025 nơi xứ sở chuột túi với hành trình qua những thành phố nổi tiếng.",
                        "Thăm Melbourne, thưởng lãm cảnh đẹp của vườn thực vật Fitzroy Garden, gặp gỡ tận mắt vô số động vật đặc hữu nước Úc.",
                        "Tham quan Thành phố Cảng Sydney danh tiếng, chiêm ngưỡng các biểu tượng của nước Úc: Nhà hát con sò, cầu cảng Sydney.",
                        "Trải nghiệm độc đáo với tàu lửa hơi nước, cáp treo qua thung lũng Jamison khám phá Blue Mountain.",
                        "Thưởng thức bữa tiệc vị giác thú vị trên du thuyền Sydney Showboat sang trọng."
                      ]}
                    />
                    <Gallery images={images} />
                    <Tabs tabs={tabs} />
                    <PostManagement />
                  </>
                ) : (
                  <Navigate to="/login" />
                )}
              />
            </Routes>
          </div>
        </div>
      </TourProvider>
    </BrowserRouter>
  );
};

export default App;
