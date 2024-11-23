import React from "react";
import '../.css/Footer.css';
import FooterCard from "./FooterCard";

const Footer: React.FC = () => {
    return (
      <footer className="footer">
        <div className="footer-wrapper">
          {/* Logo và thông tin thương hiệu */}
          <div className="footer-brand">
            <img
              src="/path-to-logo.png"
              alt="Saigontourist Logo"
              className="footer-logo"
            />
            <p className="footer-tagline">
              Lữ hành Saigontourist, thương hiệu lữ hành hàng đầu Việt Nam
            </p>
            <p className="footer-subtitle">Thương hiệu quốc gia</p>
            <div className="footer-awards">
              <span>🏆</span>
              <span>⭐</span>
              <span>🏅</span>
            </div>
            <p className="footer-contact">Tổng đài: 1900 1808</p>
            <p className="footer-contact">Email: info@saigontourist.net</p>
          </div>
  
          {/* Dịch vụ */}
          <div className="footer-section">
            <h4 className="footer-title">DỊCH VỤ</h4>
            <ul className="footer-list">
              <li className="footer-item">Tour trong nước</li>
              <li className="footer-item">Tour nước ngoài</li>
              <li className="footer-item">Dịch vụ du lịch</li>
              <li className="footer-item">Vé máy bay</li>
              <li className="footer-item">Thuê xe</li>
              <li className="footer-item">Du học Saigontourist</li>
              <li className="footer-item">Việc làm ngoài nước</li>
            </ul>
          </div>
  
          {/* Chăm sóc khách hàng */}
          <div className="footer-section">
            <h4 className="footer-title">CHĂM SÓC KHÁCH HÀNG</h4>
            <ul className="footer-list">
              <li className="footer-item">Thẻ khách hàng</li>
              <li className="footer-item">Đổi điểm Hoa Mai Vàng</li>
              <li className="footer-item">Tải App Saigontourist</li>
              <li className="footer-item">Travel Voucher</li>
              <li className="footer-item">Bảo hiểm Du lịch</li>
              <li className="footer-item">Ý kiến khách hàng</li>
              <li className="footer-item">Tra cứu thông tin Đoàn</li>
              <li className="footer-item">Giải quyết khiếu nại</li>
            </ul>
          </div>
  
          {/* Liên hệ */}
          <div className="footer-section">
            <h4 className="footer-title">LIÊN HỆ</h4>
            <ul className="footer-list">
              <li className="footer-item">Giới thiệu</li>
              <li className="footer-item">Liên hệ</li>
              <li className="footer-item">Chi nhánh</li>
              <li className="footer-item">Quy định bảo vệ</li>
              <li className="footer-item">Điều khoản chung</li>
              <li className="footer-item">Hướng dẫn mua tour online</li>
              <li className="footer-item">Chính sách chất lượng</li>
              <li className="footer-item">Tuyển dụng</li>
            </ul>
          </div>
        </div>
        <FooterCard />
      </footer>
    );
  };
  
  export default Footer;