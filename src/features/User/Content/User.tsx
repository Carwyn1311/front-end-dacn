import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar/Content/Sidebar';

interface User {
  name: string
  email: string
}

interface LoginResponse {
  name: string
  email: string
}

const UserComponent: React.FC = (): JSX.Element => {
  const [user, setUser] = useState<User>({ name: '', email: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect((): void => {
    const storedUserName = localStorage.getItem('userName');
    const storedUserEmail = localStorage.getItem('email');

    if (storedUserName != null && storedUserEmail != null) {
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate. Please check your credentials.');
      }

      const data: LoginResponse = await response.json();

      localStorage.setItem('userName', data.name);
      localStorage.setItem('email', data.email);

      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleLoginClick = (): void => {
    handleLogin().catch((error) => console.error(error));
  };

  return (
    <div>
      {isLoggedIn
        ? (
          <div className="app-container">
            <Sidebar userName={user.name} email={user.email} />
          </div>)
        : (
          <div>
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
            {(error != null) && <div style={{ color: 'red' }}>{error}</div>}
          </div>)}
    </div>
  );
};

export default UserComponent;
