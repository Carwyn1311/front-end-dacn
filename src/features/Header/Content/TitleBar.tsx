import React from 'react';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import '../.css/TitleBar.css';

const TitleBar: React.FC = () => {
  return (
    <header className="header-container">
      {/* Top Bar with Contact Information */}
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

      {/* Navigation Bar with Logo and Links */}
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
    </header>
  );
};

export default TitleBar;
