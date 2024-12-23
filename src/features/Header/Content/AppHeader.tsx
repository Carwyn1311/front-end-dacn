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

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'rgb(255 255 255 / 0%)', // Màu nền xanh trong suốt 75%
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
    position: 'relative',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const loginButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    border: '2px solid white',
    backgroundColor: 'transparent',
  };

  const sidebarButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    fontSize: '20px',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(187, 134, 252, 0.75)',
  };

  const languageButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: 'rgb(255 255 255 / 0%)',
  };

  const hoverEffect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.style.textDecoration = 'underline';
  };

  const removeHoverEffect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.style.textDecoration = 'none';
  };

  return (
    <header className="app-header">
      <div className="top-bar">
        <div className="contact-info">
          <Button
            onClick={toggleSidebar}
            style={sidebarButtonStyle}
            onMouseEnter={hoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            {isSidebarOpen ? <HiChevronDoubleLeft /> : <HiOutlineMenu />}
          </Button>
          <Button
            onClick={() => navigate('/')}
            style={buttonStyle}
            onMouseEnter={hoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            Trang chủ
          </Button>
          <Button
            onClick={() => navigate('/tour-trong-nuoc')}
            style={buttonStyle}
            onMouseEnter={hoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            Tour Trong Nước
          </Button>
          <Button
            onClick={() => navigate('/tour-nuoc-ngoai')}
            style={buttonStyle}
            onMouseEnter={hoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            Tour Nước Ngoài
          </Button>
          <Button
            onClick={() => navigate('/dich-vu')}
            style={buttonStyle}
            onMouseEnter={hoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            Dịch vụ
          </Button>
          <Button
            onClick={() => navigate('/lien-he')}
            style={buttonStyle}
            onMouseEnter={hoverEffect}
            onMouseLeave={removeHoverEffect}
          >
            Liên hệ
          </Button>
        </div>
        <div className="user-options">
          <Button
            onClick={() => navigate('/admin')}
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF5722')} // Đổi màu chữ
            onMouseLeave={(e) => (e.currentTarget.style.color = 'white')} // Trả về màu ban đầu
          >
            Admin
          </Button>
          {selectedItem && (
            <p style={{ marginTop: '20px', color: '#ffcccb' }}>
              Mục bạn đã chọn: <strong>{selectedItem}</strong>
            </p>
          )}
          {isLoggedIn ? (
            <Button
              className="username"
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF5722')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
            >
              {username}
            </Button>
          ) : (
            <Button
              className="button-login"
              onClick={() => navigate('/login')}
              style={loginButtonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF5722')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
            >
              <FaUserCircle /> {language === 'en' ? 'Login' : 'Đăng nhập'}
            </Button>
          )}
          <Button
            className="language"
            onClick={toggleLanguage}
            style={languageButtonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF5722')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
          >
            {language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
          </Button>
        </div>

      </div>
    </header>
  );
};

export default AppHeader;
