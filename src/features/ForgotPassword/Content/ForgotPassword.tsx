import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../.css/ForgotPassword.css'; // Import CSS
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Email để yêu cầu mã đổi mật khẩu
  const [activationCode, setActivationCode] = useState<string>(''); // Mã đổi mật khẩu từ email
  const [newPassword, setNewPassword] = useState<string>(''); // Mật khẩu mới
  const [stage, setStage] = useState<number>(1); // Giai đoạn 1 là nhập email, giai đoạn 2 là nhập mã đổi mật khẩu và mật khẩu mới
  const [message, setMessage] = useState<string>(''); // Thông báo thành công hoặc lỗi
  const [error, setError] = useState<string>(''); // Thông báo lỗi
  const [isLoading, setIsLoading] = useState<boolean>(false); // Trạng thái tải
  const navigate = useNavigate();

  // Gửi yêu cầu với email để nhận mã đổi mật khẩu qua email
  const handleSendActivationCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/forgot-password', { email });
      if (response.status === 200) {
        setMessage('Mã đặt lại mật khẩu đã được gửi đến email của bạn.');
        setStage(2); // Chuyển sang giai đoạn nhập mã và mật khẩu mới
      } else {
        setError('Không thể gửi mã đặt lại mật khẩu. Vui lòng thử lại.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Không thể gửi mã đặt lại mật khẩu.');
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/reset-password', {
        token: activationCode, 
        newPassword,
      });
      if (response.status === 200) {
        setMessage('Mật khẩu đã được thay đổi thành công.');
        setError('');
        setTimeout(() => {
          navigate('/login'); 
        }, 2000); 
      } else {
        setError('Không thể đặt lại mật khẩu. Vui lòng kiểm tra lại mã kích hoạt.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Không thể đặt lại mật khẩu.');
    }
    setIsLoading(false);
  };


  const handleBackToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="forgot-password-group">
      <h2>{stage === 1 ? 'Quên mật khẩu' : 'Đặt lại mật khẩu'}</h2>
      {stage === 1 && (
        <form onSubmit={handleSendActivationCode}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Đang gửi...' : 'Gửi mã đặt lại mật khẩu'}
          </button>
        </form>
      )}

      {stage === 2 && (
        <form onSubmit={handleResetPassword}>
          <div>
            <label>Mã đặt lại mật khẩu:</label>
            <input
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Mật khẩu mới:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
          </button>
        </form>
      )}

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <button onClick={handleBackToLogin} className="button-back">
        Quay lại trang đăng nhập
      </button>
    </div>
  );
};

export default ForgotPassword;
