import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { IoMdLock } from 'react-icons/io';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel, Button, Typography, Box, Container } from '@mui/material';
import { TokenAuthService } from '../../TokenAuthService/TokenAuthService';
import { User } from '../../User/Content/User';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }): JSX.Element => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      const response = await axiosInstance.post('/api/login', { username: userName, password: password });

      const token = response.data?.jwt || response.data?.data?.jwt;
      const role = response.data?.role;
      const email = response.data?.email;
      const userId = response.data?.userId || '1';

      if (!token || !role) {
        throw new Error('No token or role returned from API.');
      }
      localStorage.setItem('jwt', token);

      const user = new User({
        id: userId,
        username: userName,
        email: email || '',
        password: password,
        role: role,
        active: true
      });

      if (rememberMe) {
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('token', token);  
      } else {
        sessionStorage.setItem('token', token);
        localStorage.removeItem('userName');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }
      User.storeUserData(user, token, rememberMe);
      TokenAuthService.setToken(token);
      onLogin();
      navigate('/');
    } catch (error: any) {
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
        backgroundImage: 'url(/images/Tokyo_japan.jpg)', // Đặt đường dẫn tới ảnh background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Làm mờ background
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          CHERRY CHAT
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            margin="normal"
            value={userName}
            onChange={handleUserNameChange}
            InputProps={{
              startAdornment: <BiUser />,
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              startAdornment: <IoMdLock />,
            }}
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
        <footer style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="body2" color="textSecondary">
            © 2024 AI CHAT. <strong>Version 4.3.0.0 [20231608]</strong>
          </Typography>
        </footer>
      </Container>
    </Box>
  );
};

export default Login;
