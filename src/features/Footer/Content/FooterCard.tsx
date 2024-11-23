import React from "react";
import "../.css/FooterCard.css"; // Import CSS file

const FooterCard: React.FC = () => {
  return (
    <div className="footer-card">
      {/* Payment Icons */}
      <div className="footer-card-icons">
        <img
          src="/images/thequocte.gif"
          alt="Thẻ Quốc Tế"
          className="footer-card-icon"
          style={{ width: '100%', height: '85%'}}
        />
      </div>

      {/* Footer Information */}
      <div className="footer-card-info">
        <p className="footer-card-text">
          Bản quyền 2006 - 2024 © Công ty TNHH Một Thành Viên Dịch vụ Lữ hành
          Saigontourist.
          <br />
          45 Lê Thánh Tôn, Quận 1, TP.HCM.
          <br />
          ĐT: (84-28) 38 279 279 - Fax: (84-28) 38 224 987.
        </p>
        <p className="footer-card-text">
          Số đăng ký kinh doanh: 0310891532 do Sở kế hoạch và đầu tư TP.HCM
          cấp/thay đổi lần thứ 12, ngày 26/12/2023.
        </p>
        <p className="footer-card-text">
          Người đại diện: Ông Nguyễn Thành Lưu
          <br />
          © Ghi rõ nguồn "SAIGONTOURIST.NET" khi sử dụng lại thông tin từ website
          này.
        </p>
      </div>

      {/* Mobile App Download Section */}
      <div className="footer-card-app">
        <p className="footer-card-app-title">Tải app Saigontourist Travel</p>
        <p className="footer-card-app-subtitle">Ứng dụng 5 sao</p>
        <img
          src="/images/app-image.png"
          alt="App Preview"
          className="footer-card-app-image"
        />
        <div className="footer-card-app-buttons">
          <img
            src="/images/google-play.png"
            alt="Google Play"
            className="footer-card-app-button"
          />
          <img
            src="/images/app-store.png"
            alt="App Store"
            className="footer-card-app-button"
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="footer-card-contact">
        <p className="footer-card-contact-title">Tư vấn & đặt dịch vụ: 1900 1808</p>
        <p className="footer-card-contact-info">
          Website SAIGONTOURIST.NET đã{" "}
          <span className="footer-card-highlight">được đăng ký</span> với Bộ Công
          Thương
        </p>
        <img
          src="/images/bo-cong-thuong.png"
          alt="Bộ Công Thương"
          className="footer-card-contact-badge"
        />
        <p className="footer-card-connect-text">Kết nối với Lữ hành Saigontourist</p>
        <div className="footer-card-social-icons">
          <img
            src="/images/facebook.png"
            alt="Facebook"
            className="footer-card-social-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterCard;
