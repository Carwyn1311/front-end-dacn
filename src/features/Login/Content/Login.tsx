import { IoMdLock } from 'react-icons/io';
import { BiUser } from 'react-icons/bi';
import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import '../.css/Login.css';
import axios from 'axios';
import { auth, googleProvider } from '../../firebaseConfig';
import TextField from '../../../components/TextField/TextField';
import PasswordField from '../../../components/PasswordField/PasswordField';

const Login = (): JSX.Element => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName') ?? '';
    const storedPassword = localStorage.getItem('password') ?? '';
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (storedUserName !== '' && storedPassword !== '') {
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
    if (userName.trim() === '' || password.trim() === '') {
      setError('User name and Password are required');
      return;
    }

    try {
      const response = await axios.post('/login', {
        username: userName,
        password: password.trim()
      });

      if (response.data.success) {
        if (rememberMe) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('password', password);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('userName');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }
        localStorage.setItem('token', response.data.token);
        console.log('Logged in successfully');
      } else {
        setError('Failed to login. Please check your credentials.');
      }
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Logged in with Google:', user);
    } catch (error) {
      setError('Failed to login with Google');
    }
  };

  const handleGoogleLoginClick = (): void => {
    handleGoogleLogin().catch(console.error);
  };

  return (
    <div className="login-group">
      <div>
        <div className="form-group">
          <div className="login-container">
            <h3 className="text-top-label">AI CHAT</h3>
            <h2 className="login-title">Log in</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              {/* Username input */}
              <div className="input-group">
                <BiUser className="user-icon" /> {/* Đưa icon ra bên ngoài */}
                <TextField
                  value={userName}
                  onChange={handleUserNameChange}
                  placeholder=""
                  label="User Name"
                  fullWidth={true}
                />
              </div>
              {/* Password input */}
              <div className="input-group">
                <IoMdLock className="user-icon" /> {/* Đưa icon ra bên ngoài */}
                <PasswordField
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder=""
                  label="Password"
                  fullWidth={true}
                />
              </div>
              {/* Remember me */}
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
          </div>
        </div>
      </div>
      <footer>
      <p style={{ color: "white" }}>© 2024 AI CHAT. <strong>Version 4.3.0.0 [20231608]</strong></p>
      </footer>
    </div>
  );
};

export default Login;
