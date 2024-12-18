import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import '../css/CreateAccount.css'; // Cập nhật đường dẫn CSS
import { TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAccount: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
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
        phone: phone,
        fullname: fullname
      });

      if (response.status === 201) {
        const successMessage = 'Tài khoản đã được tạo thành công.';
        console.log(successMessage);  // Log the success message

        toast.success(successMessage, {
          position: "top-right",
          autoClose: 2000, // 2 giây
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          setIsRegistering(false);
          navigate('/login'); // Chuyển qua trang đăng nhập sau khi đăng ký thành công
        }, 2000); // Đảm bảo thời gian này khớp với autoClose
      } else {
        setError(response.data.message || 'Failed to create account.');
        setIsRegistering(false); // Đặt lại isRegistering thành false khi có lỗi
      }
    } catch (error: any) {
      setIsRegistering(false); // Đặt lại isRegistering thành false khi có lỗi
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
    if (!userName || !password || !email || !phone || !fullname) { // Kiểm tra tất cả các trường
      setError('All fields are required.');
      return;
    }
    setIsRegistering(true); // Đặt isRegistering thành true khi bắt đầu đăng ký
    handleRegister();
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
          label="FullName"
          type="input"
          fullWidth
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        <TextField
          label="Phone"
          type="number"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
        <button type="submit" className="create-account-btn" disabled={isRegistering}>
          Create Account
        </button>
      </form>
      <ToastContainer />
      <div className="button-group">
        <button onClick={handleBackToLoginClick} className="back-to-login-btn">
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
