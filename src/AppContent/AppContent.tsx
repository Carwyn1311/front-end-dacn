import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../features/AxiosInterceptor/Content/axiosInterceptor';
import { User } from '../features/User/Content/User';
import HeaderUser from "../features/Header/Content/HeaderUser";
import Sidebar from '../features/Sidebar/Content/Sidebar';
import RoutesComponent from './RoutesComponent';
import Header from "../features/Header/Content/Header";

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullname, setFullname] = useState('');
  const [role, setRole] = useState('');
  const [selectedItem, setSelectedItem] = useState<string>(''); // Thêm thuộc tính selectedItem
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('token');
    if (token) {
      axiosInstance.post('/api/verify-token', { token })
        .then(response => {
          if (response.data.valid) {
            const user = User.getUserData();
            if (user) {
              setIsLoggedIn(true);
              setFullname(user.fullname);
              setRole(user.role.toString());
            } else {
              handleInvalidToken();
            }
          } else {
            handleInvalidToken();
          }
        })
        .catch(() => {
          handleInvalidToken();
        });
    } else {
      handleInvalidToken();
    }
  }, []);

  const handleInvalidToken = () => {
    User.clearUserData();
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    if (isLoggedIn) {
      const storedRole = localStorage.getItem('role');
      const storedFullname = localStorage.getItem('fullname') || '';
      setRole(storedRole || '');
      setFullname(storedFullname);
    }
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  const onLogin = () => {
    const user = User.getUserData();
    if (user) {
      setIsLoggedIn(true);
      setFullname(user.fullname);
      const storedRole = localStorage.getItem('role');
      setRole(storedRole || 'USER');
      navigate('/');
    }
  };

  const onLogout = () => {
    User.clearUserData();
    setIsLoggedIn(false);
    setRole('');
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('fullname');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''} ${isLoginPage ? 'login-page' : ''}`}>
      {!isLoginPage && (
        <>
          {role !== "ADMIN" && (
            <HeaderUser
              isLoggedIn={isLoggedIn}
              toggleLanguage={toggleLanguage}
              language={language}
              username={fullname}
              className={isHeaderVisible ? '' : 'hidden'}
              onLogout={onLogout}
            />
          )}
          {role === "ADMIN" && (
            <>
              <Sidebar
                isOpen={isSidebarOpen}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
              />
              <Header
                isSidebarOpen={isSidebarOpen}
                isLoggedIn={isLoggedIn}
                onLogout={onLogout}
                toggleSidebar={toggleSidebar}
                toggleLanguage={toggleLanguage}
                language={language}
                username={fullname}
                selectedItem={selectedItem} // Truyền thuộc tính selectedItem
              />
            </>
          )}
        </>
      )}
      <div className="content-wrapper">
        <RoutesComponent onLogin={onLogin} />
      </div>
    </div>
  );
};

export default AppContent;
