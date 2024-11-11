// App.tsx
import React, { useState } from 'react';
import './App.css'; // Đảm bảo import đúng file CSS tổng thể
import MainContent from './features/Maincontent/Content/MainContent';
import Button from './components/Button/Button';
import { TourProvider } from './features/TourSlider/Content/TourContext';
import { UserOutlined, SearchOutlined, ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons';
import Sidebar from './features/Sidebar/Content/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from './features/BookingForm/Content/BookingForm';
import MyComponent from './MyComponent/MyComponent/MyComponent';
import TourDetail from './MyComponent/MyComponent/TourDetail';
import Gallery from './MyComponent/MyComponent/Gallery';
import Tabs from './MyComponent/MyComponent/Tabs';
import { TourProgramContent, TourPolicyContent, TourVisaContent } from './MyComponent/MyComponent/TourProgramContent';
import PostManagement from './MyComponent/MyComponent/PostManagement'; // Import component PostManagement
import Login from './features/Login/Content/Login';
import Breadcrumb from './MyComponent/MyComponent/Breadcrumb';

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
  const breadcrumbItems = [
    { label: 'Trang chủ', url: '/' },
    { label: 'Kế hoạch của bạn', url: '/plan' },
    { label: 'Tour khám phá Đà Lạt', url: '/plan/tour-dalat' },
    { label: 'Ngày 1: Khám phá trung tâm thành phố' } // Current page
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
                  <Button onClick={toggleSidebar} className="sidebar-toggle-button">
                    {isSidebarOpen ? <ArrowLeftOutlined /> : <MenuOutlined />}
                  </Button>
                </div>
                <div
                  className="user-options"
                  style={{
                    right: '5px', // Luôn căn phải
                    top: '0',
                    transition: 'transform 0.3s, margin-right 0.3s', // Hiệu ứng mượt khi thay đổi vị trí
                    transform: isSidebarOpen ? 'translateX(-250px)' : 'translateX(0)', // Dịch sang trái 250px khi sidebar mở
                    marginRight: isSidebarOpen ? '10px' : '0px', // Cách bên phải 10px khi sidebar đóng
                    overflow: 'auto',
                  }}
                >
                  <Button className='button-login'>
                    <UserOutlined /> {language === 'en' ? 'Login' : 'Đăng nhập'}
                  </Button>
                  <SearchOutlined className="search-icon" />
                  <span className="language" onClick={toggleLanguage}>
                    {language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
                  </span>
                </div>
              </div>
            </header>
            <div style={{ marginTop: '0px' }}>
              <MainContent />
            </div>
          </div>
        </div>
      </TourProvider>
    </BrowserRouter>
    
  );
};

export default App;
