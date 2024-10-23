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
  const [email, setEmail] = useState<string>(''); // Thêm email cho đăng ký
  const [error, setError] = useState<string>(''); 
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [savedUserName, setSavedUserName] = useState<string | null>(''); // Lưu tên người dùng đã lưu

  const navigate = useNavigate();

  useEffect(() => {
    // Lấy tên người dùng đã lưu từ User.ts khi ứng dụng tải
    const storedUser = User.getUserData();
    if (storedUser && storedUser.username) {
      setSavedUserName(storedUser.username); // Hiển thị tên người dùng đã lưu
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setError('');
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!userName || !password || (isRegistering && !email)) {
      setError('All fields are required.');
      return;
    }

    if (isRegistering) {
      await handleRegister();
    } else {
      await handleLogin();
    }
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
    
        // Lưu thông tin người dùng và token vào localStorage hoặc sessionStorage
        if (rememberMe) {
            localStorage.setItem('userName', userName);
            localStorage.setItem('password', password);
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('token', token);  // Lưu token vào localStorage khi Remember Me được chọn
        } else {
            sessionStorage.setItem('token', token);  // Lưu token vào sessionStorage khi Remember Me không được chọn
            localStorage.removeItem('userName');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberMe');
        }

        TokenAuthService.setToken(token); 
    
        // Nếu API không trả về userData, chúng ta sẽ sử dụng giá trị mặc định cho người dùng
        const user = new User({
            id: '1',                   // Mặc định ID là 1
            username: userName,         // Tên người dùng đã nhập
            email: email || '',         // Email từ form hoặc rỗng nếu không có
            role: 0,                    // Mặc định là user
            active: true,               // Mặc định tài khoản kích hoạt
        });
        User.storeUserData(user, token);  // Lưu thông tin người dùng cùng với token
    
        console.log('Logged in successfully');
        onLogin();
        navigate('/');
    } catch (error: any) {
        console.error('Login error:', error.response?.data?.message || error.message);
        setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
};



  const handleRegister = async (): Promise<void> => {
    try {
      console.log('Attempting registration for:', { userName, password });

      const response = await axiosInstance.post('/auth/register', {
        username: userName,
        password: password,
        email: email, 
      });

      console.log('Registration API Response:', response.data);

      if (response.status === 201) {
        console.log('Account created successfully');
        setError('Tài khoản đã được tạo thành công. Vui lòng kiểm tra email của bạn để nhận mã kích hoạt.');

        setTimeout(() => {
          navigate('/activate');
        }, 2000); 
      } else {
        setError(response.data.message || 'Failed to create account.');
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        if (validationErrors.username) {
          setError(validationErrors.username);
        } else if (validationErrors.email) {
          setError(validationErrors.email);
        } else if (validationErrors.password) {
          setError(validationErrors.password);
        } else {
          setError('Failed to create account.');
        }
      } else {
        console.error('Registration error:', error.response?.data?.message || error.message);
        setError(error.response?.data?.message || 'Failed to create account.');
      }
    }
  };

  const handleCreateAccount = (): void => {
    setIsRegistering(true);
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

  const handleActivateAccountClick = (): void => {
    navigate('/activate');
  };

  const handleBackToLoginClick = (): void => {
    setIsRegistering(false); 
  };

  return (
    <div className="login-group">
      <div>
        <div className="form-group">
          <div className="login-container">
            <h3 className="text-top-label">AI CHAT</h3>
            <h2 className="login-title">{isRegistering ? 'Register' : 'Login'}</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <BiUser className="user-icon" />
                <TextField
                  value={userName}
                  onChange={handleUserNameChange}
                  label="User Name"
                  fullWidth={true}
                />
              </div>
              <div className="input-group">
                <IoMdLock className="user-icon" />
                <PasswordField
                  value={password}
                  onChange={handlePasswordChange}
                  label="Password"
                  fullWidth={true}
                />
              </div>

              {isRegistering && (
                <div className="input-group">
                  <MdEmail className="user-icon" /> 
                  <TextField
                    value={email}
                    onChange={handleEmailChange}
                    label="Email"
                    fullWidth={true}
                  />
                </div>
              )}

              <div className="input-group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label>Remember me</label>
              </div>

              {error && <p className="error">{error}</p>}
              <button type="submit">{isRegistering ? 'Create Account' : 'Log in'}</button>
            </form>
            {!isRegistering && (
              <button onClick={handleGoogleLoginClick} className="google-login-btn">
                Log In With Google
              </button>
            )}
            <div className="horizontal-buttons">
              {!isRegistering && (
                <button onClick={handleCreateAccount} className="create-account-btn">
                  Create Account
                </button>
              )}
              {!isRegistering && (
                <button onClick={handleForgotPassword} className="forgot-password-btn">
                  Forgot Password
                </button>
              )}
              {isRegistering && (
                <>
                  <button onClick={handleActivateAccountClick} className="activate-account-btn">
                    Activate Account
                  </button>
                  <button onClick={handleBackToLoginClick} className="back-to-login-btn">
                    Back to Login
                  </button>
                </>
              )}
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