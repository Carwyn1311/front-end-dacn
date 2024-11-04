// TitleBar02.tsx
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import '../.css/TitleBar.css';

const TitleBar02: React.FC = () => {
  return (
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
  );
};

export default TitleBar02;
