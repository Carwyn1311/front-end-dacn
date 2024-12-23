// AppHeader.tsx
import React from 'react';
import { Button } from 'antd';
import { HiChevronDoubleLeft, HiOutlineMenu } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  username: string;
  selectedItem: string;
  toggleLanguage: () => void;
  language: 'en' | 'vn';
}

const AppHeader: React.FC<AppHeaderProps> = ({
  isSidebarOpen,
  toggleSidebar,
  isLoggedIn,
  username,
  selectedItem,
  toggleLanguage,
  language,
}) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="top-bar">
        <div className="contact-info">
          <Button
            onClick={toggleSidebar}
            className="sidebar-toggle-button"
            style={{ color: 'white', fontSize: '20px' }}
          >
            {isSidebarOpen ? <HiChevronDoubleLeft /> : <HiOutlineMenu />}
          </Button>
          <Button onClick={() => navigate('/')}>Trang chủ</Button>
          <Button onClick={() => navigate('/tour-trong-nuoc')}>Tour Trong Nước</Button>
          <Button onClick={() => navigate('/tour-nuoc-ngoai')}>Tour Nước Ngoài</Button>
          <Button onClick={() => navigate('/dich-vu')}>Dịch vụ</Button>
          <Button onClick={() => navigate('/lien-he')}>Liên hệ</Button>
        </div>
        <div className="user-options">
          <Button onClick={() => navigate('/admin')}>Admin</Button>
          {selectedItem && (
            <p style={{ marginTop: '20px' }}>
              Mục bạn đã chọn: <strong>{selectedItem}</strong>
            </p>
          )}
          {isLoggedIn ? (
            <Button className="username">{username}</Button>
          ) : (
            <Button className="button-login" onClick={() => navigate('/login')}>
              <FaUserCircle /> {language === 'en' ? 'Login' : 'Đăng nhập'}
            </Button>
          )}
          <Button className="language" onClick={toggleLanguage}>
            {language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
