import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenAuthService } from '../../TokenAuthService/TokenAuthService';

const LogoutButton: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    // Xóa token khỏi localStorage
    TokenAuthService.removeToken();

    // Xóa toàn bộ localStorage (nếu cần thiết)
    TokenAuthService.clearStorage();

    // Xóa dữ liệu sessionStorage (nếu cần thiết)
    TokenAuthService.removeSessionData('userData');

    // Gọi callback để cập nhật trạng thái đăng nhập
    onLogout();

    // Điều hướng người dùng về trang đăng nhập
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}>
      Logout
    </button>
  );
};

export default LogoutButton;
