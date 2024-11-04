// TitleBar01.tsx
import React from 'react';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import '../.css/TitleBar.css';

const TitleBar01: React.FC = () => {
  return (
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
  );
};

export default TitleBar01;
