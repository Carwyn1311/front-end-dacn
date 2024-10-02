// src/components/LogoutButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenAuthService } from '../../TokenAuthService/TokenAuthService';
import '../.css/LogoutButton.css';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    // Xóa token khỏi localStorage
    TokenAuthService.removeToken();

    // Xóa toàn bộ localStorage (nếu cần thiết)
    TokenAuthService.clearStorage();

    // Xóa dữ liệu sessionStorage (nếu cần thiết)
    TokenAuthService.removeSessionData('userData');

    // Xóa cookie (ví dụ: cookie lưu token)
    TokenAuthService.removeCookie('token');

    // Điều hướng người dùng về trang đăng nhập
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
