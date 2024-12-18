import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import '../css/HeaderUser.css';

interface HeaderUserProps {
  isLoggedIn: boolean;
  toggleLanguage: () => void;
  language: string;
  username: string;
  className?: string;
  onLogout: () => void;
}

const HeaderUser: React.FC<HeaderUserProps> = ({
  isLoggedIn,
  toggleLanguage,
  language,
  username,
  className,
  onLogout
}) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        navigate('/profile');
        break;
      case 'history':
        navigate('/history');
        break;
      case 'favorites':
        navigate('/favorites');
        break;
      case 'logout':
        onLogout();
        navigate('/login');
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Thông tin cá nhân</Menu.Item>
      <Menu.Item key="history">Lịch sử</Menu.Item>
      <Menu.Item key="favorites">Yêu thích</Menu.Item>
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <header className={`app-header-user ${className}`}>
      <div className="top-bar-user">
        <div className="logo">
          <h3>TravelNow</h3>
        </div>
        <div className="user-options-user">
          {isLoggedIn ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <Button className="username">{username}</Button>
            </Dropdown>
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

export default HeaderUser;
