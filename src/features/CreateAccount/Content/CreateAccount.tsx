import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import '../.css/CreateAccount.css';
import { TextField } from '@mui/material';

const CreateAccount: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (): Promise<void> => {
    try {
      console.log('Username:', userName);
      console.log('Password:', password);
      console.log('Email:', email);

      const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/api/register`, {
        username: userName,
        password: password,
        email: email,
      });

      if (response.status === 201) {
        const successMessage = 'Tài khoản đã được tạo thành công.';
        console.log(successMessage);  // Log the success message

        setError(successMessage);
        setTimeout(() => {
          navigate('/login'); // Chuyển qua trang đăng nhập sau khi đăng ký thành công
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to create account.');
      }
    } catch (error: any) {
      // Kiểm tra lỗi và log chi tiết để xác định vấn đề
      if (error.response) {
        console.error("Error response:", error.response); // Log toàn bộ lỗi phản hồi từ server
        setError(error.response.data.message || 'Failed to create account.');
      } else if (error.request) {
        console.error("Error request:", error.request); // Log lỗi khi yêu cầu không nhận được phản hồi
        setError('No response from the server.');
      } else {
        console.error("Error message:", error.message); // Log lỗi trong cấu hình yêu cầu
        setError('An error occurred while creating the account.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !password || !email) {
      setError('All fields are required.');
      return;
    }
    handleRegister();
  };

  const handleCreateAccount = (): void => {
    setIsRegistering(true);
  };

  const handleBackToLoginClick = (): void => {
    navigate('/Login');
  };

  return (
    <div className="create-account-group">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type='input'
          label="Username"
          fullWidth
          variant="outlined"
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="input"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}
        <button onClick={handleCreateAccount} className="create-account-btn">
          Create Account
        </button>
      </form>
      <div className="button-group">
        <button onClick={handleBackToLoginClick} className="back-to-login-btn">
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
