import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, Button, Typography, Box, Container, TextField } from '@mui/material';
import { TokenAuthService } from '../../TokenAuthService/TokenAuthService';
import { User } from '../../User/Content/User';
import { RiArrowGoBackLine } from 'react-icons/ri';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }): JSX.Element => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullname, setFullName] = useState<string>(''); // Add state for fullname
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = User.getUserData();
    if (storedUser && storedUser.username) {
      setUserName(storedUser.username); 
    }

    const storedUserName = localStorage.getItem('userName') ?? '';
    const storedPassword = localStorage.getItem('password') ?? '';
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (storedUserName && storedPassword) {
      setUserName(storedUserName);
      setPassword(storedPassword);
    }
    setRememberMe(storedRememberMe);
  }, []);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setError('');
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!userName || !password) {
      setError('All fields are required.');
      return;
    }

    await handleLogin();
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post('/api/login', {
        username: userName,
        password: password,
      });
  
      const token = response.data?.jwt || response.data?.data?.jwt;
      const roles = response.data?.role; // 'role' là một mảng, vì vậy cần lấy đối tượng đầu tiên
      const email = response.data?.email;
      const userId = response.data?.userId;
      const fullname = response.data?.fullname; // Get fullname from response
  
      if (!token || !roles || roles.length === 0) {
        throw new Error('No token or role returned from API.');
      }
  
      // Lấy id và name của role
      const roleId = roles[0]?.id; // Lấy id từ phần tử đầu tiên của mảng role
      const roleName = roles[0]?.name; // Lấy name từ phần tử đầu tiên của mảng role
  
      localStorage.setItem('jwt', token);
      localStorage.setItem('fullname', fullname); // Store fullname in localStorage
  
      const user = new User({
        id: userId,
        username: userName,
        email: email || '',
        password: password,
        role: roleName,  // Sử dụng role name
        active: true
      });
  
      if (rememberMe) {
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
        localStorage.setItem('role', roleName);  // Lưu tên role
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('token', token);  
      } else {
        sessionStorage.setItem('token', token);
        localStorage.removeItem('userName');
        localStorage.removeItem('password');
        localStorage.setItem('role', roleName);  // Lưu tên role
        localStorage.removeItem('rememberMe');
      }
  
      User.storeUserData(user, token, rememberMe);
      TokenAuthService.setToken(token);
  
      console.log('Logged in successfully');
      
      onLogin();
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleCreateAccount = (): void => {
    navigate('/create-account');
  };

  const handleForgotPassword = (): void => {
    navigate('/forgot-password');
  };

  return (
    <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: 'url(/images/Tokyo_japan.jpg)', // Background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    overflowX: 'hidden',
    height: '100vh',
    width: '100vw',
    padding: '16px', // Thêm padding để tránh cắt mép trên màn hình nhỏ
    '@media (max-width: 600px)': { // Media query cho màn hình nhỏ
      padding: '8px',
      backgroundSize: 'contain', // Đảm bảo hình nền hiển thị tốt trên màn hình nhỏ
    },
  }}
>
  <Container
    maxWidth="xs"
    sx={{
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Make the background slightly opaque
      padding: 4,
      borderRadius: 2,
      boxShadow: 3,
    }}
  >
    <Typography variant="h4" align="center" gutterBottom>
      DPT Travel Login Page
    </Typography>
    <Typography variant="h6" align="center" gutterBottom>
      Wellcome
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        type='input'
        label="Username"
        fullWidth
        variant="outlined"
        margin="normal"
        value={userName}
        onChange={handleUserNameChange}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
        margin="normal"
        value={password}
        onChange={handlePasswordChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={handleRememberMeChange}
            color="primary"
          />
        }
        label="Remember me"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
        Log in
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="text" onClick={handleCreateAccount}>
          Create Account
        </Button>
        <Button variant="text" onClick={handleForgotPassword}>
          Forgot Password
        </Button>
      </Box>
    </form>
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography className='login-header-bottom'>
        © 2024 DPT TRAVEL. <strong>Version 4.3.0.0 [20231608]</strong>
      </Typography>
    </div>
  </Container>
</Box>

  );
};

export default Login;
