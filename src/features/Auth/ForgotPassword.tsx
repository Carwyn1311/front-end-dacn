import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import axiosInstance from '../AxiosInterceptor/Content/axiosInterceptor';
import CodeInput from './CodeInput';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Email để yêu cầu mã đổi mật khẩu
  const [activationCode, setActivationCode] = useState<string[]>(Array(6).fill('')); // Mã đổi mật khẩu từ email
  const [newPassword, setNewPassword] = useState<string>(''); // Mật khẩu mới
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>(''); // Xác nhận mật khẩu mới
  const [stage, setStage] = useState<number>(1); // Giai đoạn của quy trình
  const [message, setMessage] = useState<string>(''); // Thông báo thành công hoặc lỗi
  const [error, setError] = useState<string>(''); // Thông báo lỗi
  const [isLoading, setIsLoading] = useState<boolean>(false); // Trạng thái tải
  const navigate = useNavigate();

  // Gửi yêu cầu với email để nhận mã đổi mật khẩu qua email
  const handleSendActivationCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/send-verification-code', { email });
      if (response.status === 200) {
        setMessage('Mã đặt lại mật khẩu đã được gửi đến email của bạn.');
        setStage(2); // Chuyển sang giai đoạn nhập mã
      } else {
        setError('Không thể gửi mã đặt lại mật khẩu. Vui lòng thử lại.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Không thể gửi mã đặt lại mật khẩu.');
    }
    setIsLoading(false);
  };

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = activationCode.join('');
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/verify-code', {
        email,
        code,
      });
      if (response.status === 200) {
        setMessage('Mã xác nhận hợp lệ.');
        setStage(3);
        // Lưu token vào localStorage hoặc state
        localStorage.setItem('resetToken', response.data.token);
      } else {
        setError('Mã xác nhận không hợp lệ. Vui lòng thử lại.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Không thể xác minh mã xác nhận.');
    }
    setIsLoading(false);
  };
  

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }
  
    setIsLoading(true);
    try {
      const resetToken = localStorage.getItem('resetToken'); // Lấy token từ localStorage
      if (!resetToken) {
        setError('Token không hợp lệ.');
        return;
      }
  
      const response = await axiosInstance.post('/api/reset-password', {
        email,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${resetToken}`,
        },
      });
      if (response.status === 200) {
        setMessage('Mật khẩu đã được thay đổi thành công.');
        setError('');
        localStorage.removeItem('resetToken');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Không thể đặt lại mật khẩu. Vui lòng thử lại.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Không thể đặt lại mật khẩu.');
    }
    setIsLoading(false);
  };
  

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Chỉ cho phép nhập số

    const newCode = [...activationCode];
    newCode[index] = value.slice(-1);
    setActivationCode(newCode);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && !activationCode[index] && index > 0) {
      const prevElement = document.getElementById(`code-input-${index - 1}`);
      if (prevElement) {
        prevElement.focus();
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(/images/background.jpg)', // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Make the background slightly opaque
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {stage === 1 ? 'Quên mật khẩu' : stage === 2 ? 'Nhập mã đặt lại mật khẩu' : 'Đặt lại mật khẩu'}
        </Typography>
        
        {stage === 1 && (
          <form onSubmit={handleSendActivationCode}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Gửi mã'}
            </Button>
          </form>
        )}

        {stage === 2 && (
          <form onSubmit={handleVerifyCode}>
            <CodeInput
              activationCode={activationCode}
              handleCodeChange={handleCodeChange}
              handleKeyDown={handleKeyDown}
              setActivationCode={setActivationCode}
            />
            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Xác nhận mã'}
            </Button>
          </form>
        )}

        {stage === 3 && (
          <form onSubmit={handleResetPassword}>
            <TextField
              label="Mật khẩu mới"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              label="Xác nhận mật khẩu mới"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" fullWidth disabled={isLoading} sx={{ marginTop: 2 }}>
              {isLoading ? <CircularProgress size={24} /> : 'Đặt lại mật khẩu'}
            </Button>
          </form>
        )}

        {message && <Typography color="success" sx={{ marginTop: 2 }}>{message}</Typography>}
        {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}

        <Button onClick={handleBackToLogin} variant="text" sx={{ marginTop: 2 }}>
          Quay lại trang đăng nhập
        </Button>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
