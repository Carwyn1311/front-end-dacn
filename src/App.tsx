// App.tsx
import React, { useState } from 'react';
import './App.css'; // Đảm bảo import đúng file CSS tổng thể
import MainContent from './features/Maincontent/Content/MainContent';
import Button from './components/Button/Button';
import { TourProvider } from './features/TourSlider/Content/TourContext';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import Sidebar from './features/Sidebar/Content/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from './features/BookingForm/Content/BookingForm';
import MyComponent from './MyComponent/MyComponent/MyComponent';
import TourDetail from './MyComponent/MyComponent/TourDetail';
import Gallery from './MyComponent/MyComponent/Gallery';
import Tabs from './MyComponent/MyComponent/Tabs';
import { TourProgramContent, TourPolicyContent, TourVisaContent } from './MyComponent/MyComponent/TourProgramContent';
import PostManagement from './MyComponent/MyComponent/PostManagement'; // Import component PostManagement

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'vn' for Vietnamese

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vn' : 'en');
  };

  const images = [
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' },
    { src: '/image4.jpg', alt: 'Image 4' },
    { src: '/image5.jpg', alt: 'Image 5' },
    { src: '/image6.jpg', alt: 'Image 6' },
  ];

  const tabs = [
    {
      name: language === 'en' ? 'Tour Program' : 'Chương trình Tour',
      content: <TourProgramContent />,
    },
    {
      name: language === 'en' ? 'Tour Policy' : 'Chính sách Tour',
      content: <TourPolicyContent />,
    },
    {
      name: language === 'en' ? 'Procedures & Visa' : 'Thủ tục & Visa',
      content: <TourVisaContent />,
    },
  ];

  return (
    <BrowserRouter>
      <TourProvider>
        <div style={{ display: 'flex', height: '100vh' }}>
          {isSidebarOpen && (
            <div className="overlay" onClick={closeSidebar}></div>
          )}
          <Sidebar 
            isOpen={isSidebarOpen} 
            isLoggedIn={true} 
            onLogout={() => console.log('Logged out')} 
          />

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
                <div className="contact-info">
                  <MailOutlined /> info@saigontourist.net
                  <span className="separator">|</span>
                  <PhoneOutlined /> {language === 'en' ? 'Hotline' : 'Đường dây nóng'}: 1900 1808
                </div>
                <div className="user-options">
                  <EnvironmentOutlined /> {language === 'en' ? 'Select departure point' : 'Chọn điểm khởi hành'}
                  <span className="separator">|</span>
                  <UserOutlined /> {language === 'en' ? 'Login' : 'Đăng nhập'}
                  <span className="separator">|</span>
                  <SearchOutlined className="search-icon" />
                  <span className="language" onClick={toggleLanguage}>
                    {language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
                  </span>
                </div>
              </div>

              <div className="nav-bar">
                <div className="logo">
                  <img src="/path-to-your-logo.png" alt="Saigontourist Logo" className="logo-image" />
                  <span className="logo-text">SAIGONTOURIST TRAVEL</span>
                </div>
                <nav className="navigation">
                  <a href="/">{language === 'en' ? 'HOME' : 'TRANG CHỦ'}</a>
                  <a href="/domestic-tours">{language === 'en' ? 'DOMESTIC TOURS' : 'TOUR TRONG NƯỚC'}</a>
                  <a href="/international-tours">{language === 'en' ? 'INTERNATIONAL TOURS' : 'TOUR NƯỚC NGOÀI'}</a>
                  <a href="/services">{language === 'en' ? 'TOUR SERVICES' : 'DỊCH VỤ DU LỊCH'}</a>
                  <a href="/contact">{language === 'en' ? 'CONTACT' : 'LIÊN HỆ'}</a>
                </nav>
              </div>
              <Button onClick={toggleSidebar} className="sidebar-toggle-button">
                &#9776;
              </Button>
            </header>

            <div style={{ marginTop: '130px' }}>
              <MainContent />
              {/* Thêm BookingForm */}
              <BookingForm />
              {/* Thêm MyComponent */}
              <MyComponent
                title="Khám phá Úc cùng Saigontourist"
                content="Tham gia tour du lịch đến Melbourne và Sydney để tận hưởng kỳ nghỉ Tết Nguyên Đán không thể quên với những trải nghiệm độc đáo."
                imageUrl="/img1.jpg"
              />
              {/* Thêm component TourDetail */}
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
              {/* Thêm Gallery */}
              <Gallery images={images} />
              {/* Thêm Tabs */}
              <Tabs tabs={tabs} />
              {/* Thêm component PostManagement */}
              <PostManagement />
            </div>
          </div>
        </div>
      </TourProvider>
    </BrowserRouter>
  );
};

export default App;
