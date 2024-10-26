import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { IoMdLock } from 'react-icons/io';
import { BiUser } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md'; // Import biểu tượng email
import { useNavigate } from 'react-router-dom';
import '../.css/Login.css';
import TextField from '../../../components/TextField/TextField';
import PasswordField from '../../../components/PasswordField/PasswordField';
import { TokenAuthService } from '../../TokenAuthService/TokenAuthService';
import { User } from '../../User/Content/User';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }): JSX.Element => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>(''); 

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [savedUserName, setSavedUserName] = useState<string | null>(''); 

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = User.getUserData();
    if (storedUser && storedUser.username) {
      setSavedUserName(storedUser.username); 
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
        console.log('Attempting login with:', { userName, password });
    
        const response = await axiosInstance.post('/auth/authenticate', {
            username: userName,
            password: password,
        });
    
        console.log('API full response:', response.data);
    
        const token = response.data?.data?.jwt;
    
        if (!token) {
            throw new Error('No token returned from API.');
        }
    

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

        TokenAuthService.setToken(token); 

        const user = new User({
            id: '1',                   
            username: userName,         
            email: email || '',        
            role: 0,                   
            active: true,              
        });
        User.storeUserData(user, token); 
    
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

  const handleGoogleLoginClick = async (): Promise<void> => {
    try {
  window.location.href = 'https://chat-api-backend-x4dl.onrender.com/auth/login/google';
    } catch (error: any) {
      console.error('Google Login error:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Google login failed.');
    }
  };


  return (
    <div className="login-group">
      <div>
        <div className="form-group">
          <div className="login-container">
            <h3 className="text-top-label">CHERRY CHAT</h3>
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
            <BiUser className="user-icon" />
            <TextField
              className="InputUserName"
              label="Username"
              name="userName"
              value={userName}
              onChange={handleUserNameChange}
              fullWidth={true}
              placeholder=""
            />
          </div>
              <div className="input-group">
                <IoMdLock className="user-icon" />
                <PasswordField className='InputUserName'
                  value={password}
                  onChange={handlePasswordChange}
                  label="Password"
                  fullWidth={true}
                />
              </div>

              <div className="input-group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label>Remember me</label>
              </div>

              {error && <p className="error">{error}</p>}
              <button type="submit">Log in</button>
            </form>
              <button onClick={handleGoogleLoginClick} className="google-login-btn">
                Log In With Google
              </button>
            <div className="horizontal-buttons">
                <button onClick={handleCreateAccount} className="create-account-btn">
                  Create Account
                </button>
                <button onClick={handleForgotPassword} className="forgot-password-btn">
                  Forgot Password
                </button>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p style={{ textAlign: 'center', fontSize: '16px', marginTop: '20px', color: 'blue' }}>
          © 2024 AI CHAT. <strong>Version 4.3.0.0 [20231608]</strong>
        </p>
      </footer>
    </div>
  );
};

export default Login;