import React from 'react';
import { Button } from 'antd';
import { HiChevronDoubleLeft, HiOutlineMenu } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import '../css/TitleBar.css';

interface HeaderProps {
  isSidebarOpen: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
  toggleSidebar: () => void;
  toggleLanguage: () => void;
  language: string;
  username: string;
  selectedItem: string | null;
}

const Header: React.FC<HeaderProps> = ({
  isSidebarOpen,
  isLoggedIn,
  onLogout,
  toggleSidebar,
  toggleLanguage,
  language,
  username,
  selectedItem
}) => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="top-bar">
        <div className="contact-info">
          <Button onClick={toggleSidebar} className="sidebar-toggle-button" style={{ color: "darkgray", fontSize: "20px" }}>
            {isSidebarOpen ? <HiChevronDoubleLeft /> : <HiOutlineMenu />}
          </Button>
        </div>
        <div className="user-options">
          <Button onClick={() => navigate('/admin')}>
            Admin
          </Button>
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
}

export default Header;
