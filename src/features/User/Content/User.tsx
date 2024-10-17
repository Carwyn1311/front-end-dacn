import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar/Content/Sidebar';  // Kiểm tra import này

interface User {
  name: string;
  email: string;
}

interface LoginResponse {
  name: string;
  email: string;
}

const UserComponent: React.FC = (): JSX.Element => {
  const [user, setUser] = useState<User>({ name: '', email: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('email');

    if (storedUserName && storedUserEmail) {
      setUser({ name: storedUserName, email: storedUserEmail });
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (): Promise<void> => {
    setError(null);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorMessage = `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data: LoginResponse = await response.json();

      // Lưu thông tin đăng nhập vào localStorage
      localStorage.setItem('userName', data.name);
      localStorage.setItem('email', data.email);

      // Cập nhật trạng thái người dùng
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
      navigate('/home'); // Điều hướng tới trang home sau khi đăng nhập
    } catch (err: any) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleLoginClick = (): void => {
    handleLogin().catch((error) => console.error(error));
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="app-container">
          {/* Sidebar với isOpen để quản lý trạng thái mở/đóng */}
          <Sidebar userName={user.name} email={user.email} isOpen={isSidebarOpen} isLoggedIn={isLoggedIn} />
          <button onClick={toggleSidebar} className="sidebar-toggle-button">
            &#9776; Toggle Sidebar {/* Nút để mở/đóng sidebar */}
          </button>
        </div>
      ) : (
        <div>
          {/* Giao diện đăng nhập */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLoginClick}>Login</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default UserComponent;
