import React from 'react';
import { Layout, Input } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import '../.css/TitleBar.css';

const { Header } = Layout;

const TitleBar: React.FC = () => {
  return (
    <div>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="contact-info">
          <MailOutlined /> <span>info@saigontourist.net</span>
          <span className="separator">|</span>
          <PhoneOutlined /> <span>Hotline: 1900 1808</span>
        </div>
        <div className="user-options">
          <EnvironmentOutlined /> <span>Chọn điểm khởi hành</span>
          <span className="separator">|</span>
          <span>Đăng nhập</span>
          <span className="separator">|</span>
          <span className="language">GB English</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <Header className="nav-bar">
        <div className="logo">
          <img src="/path/to/logo.png" alt="Saigontourist Logo" className="logo-image" />
          <span className="logo-text">SAIGONTOURIST TRAVEL</span>
        </div>
        <div className="navigation">
          <a href="#home">TRANG CHỦ</a>
          <a href="#domestic-tour">TOUR TRONG NƯỚC</a>
          <a href="#international-tour">TOUR NƯỚC NGOÀI</a>
          <a href="#services">DỊCH VỤ DU LỊCH</a>
          <a href="#contact">LIÊN HỆ</a>
        </div>
        <div className="search-bar">
          <SearchOutlined className="search-icon" />
        </div>
      </Header>
    </div>
  );
};

export default TitleBar;
