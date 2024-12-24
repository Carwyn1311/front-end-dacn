import React from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import '../css/AppHeader.css';

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

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => navigate('/tour-trong-nuoc')}>Tour Trong Nước</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={() => navigate('/tour-nuoc-ngoai')}>Tour Nước Ngoài</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={() => navigate('/dich-vu')}>Dịch vụ</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a onClick={() => navigate('/lien-he')}>Liên hệ</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="app-header">
      <div className="top-bar">
        <div className="contact-info">
          <Button
            onClick={toggleSidebar}
            className="sidebar-toggle-button"
          >
            {isSidebarOpen ? <MdMenuOpen /> : <MdOutlineMenu />}
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="nav-button"
          >
            Trang chủ
          </Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className="nav-button">Danh Mục</Button>
          </Dropdown>
        </div>
        <div className="user-options">
          <Button
            onClick={() => navigate('/admin')}
            className="nav-button"
          >
            Admin
          </Button>
          {selectedItem && (
            <p className="selected-item">
              Mục bạn đã chọn: <strong>{selectedItem}</strong>
            </p>
          )}
          {isLoggedIn ? (
            <Button
              className="nav-button"
            >
              {username}
            </Button>
          ) : (
            <Button
              className="button-login nav-button"
              onClick={() => navigate('/login')}
            >
              <FaUserCircle /> {language === 'en' ? 'Login' : 'Đăng nhập'}
            </Button>
          )}
          <Button
            className="language nav-button"
            onClick={toggleLanguage}
          >
            {language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
