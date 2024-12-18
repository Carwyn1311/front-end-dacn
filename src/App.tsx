import { FaUserCircle } from "react-icons/fa"; 
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HiChevronDoubleLeft, HiOutlineMenu } from 'react-icons/hi';
import Sidebar from './features/Sidebar/Content/Sidebar';
import Button from './components/Button/Button';
import MainContent from './features/Maincontent/Content/MainContent';
import Login from './features/Login/Content/Login';
import { User } from './features/User/Content/User';
import AdminRoutes from './features/Admin/Content/AdminRoutes';
import AdminUser from './features/Admin/Content/AdminUser';
import AdminTourManagement from './features/Admin/Content/AdminTourManagement';
import TravelPageDongBac from './features/AllTours/Tours/TravelPageDongBac';
import TravelPageHaNoi from './features/AllTours/Tours/TravelPageHaNoi';
import TravelPageHaLong from './features/AllTours/Tours/TravelPageHaLong';
import TravelPageSapa from './features/AllTours/Tours/TravelPageSapa';
import CreateAccount from './features/CreateAccount/Content/CreateAccount';
import ForgotPassword from './features/ForgotPassword/Content/ForgotPassword';
import ErrorBoundary from './features/Error Boundary/Error Boundary';
import TourDetail from './features/Admin/Content/TourDetail';
import CityList from './features/Admin/City/CityList';
import ProvinceList from './features/Admin/Content/ProvinceList';
import DestinationList from './features/Admin/Destination/DestinationList';
import Header from "./features/Header/Content/Header";
import HeaderUser from "./features/Header/Content/HeaderUser";
import axiosInstance from "./features/AxiosInterceptor/Content/axiosInterceptor";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullname, setFullname] = useState('');
  const [role, setRole] = useState('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

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
        .catch(error => {
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
      // Kiểm tra trạng thái đăng nhập và vai trò người dùng khi ứng dụng khởi động
      const token = localStorage.getItem('jwt') || sessionStorage.getItem('token');
      const storedRole = localStorage.getItem('role');
      const storedFullname = localStorage.getItem('fullname') || '';

      if (token && storedRole) {
        setRole(storedRole);
        setFullname(storedFullname);
      }
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
      if (storedRole) {
        setRole(storedRole);
      } else {
        setRole('USER');
      }
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

  const isLoginPage = location.pathname === '/login';

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
                selectedItem={selectedItem}
              />
            </>
          )}
        </>
      )}

      <div className="content-wrapper">
        <Routes>
          <Route path="/travel/dongbac-taybac" element={<TravelPageDongBac />} />
          <Route path="/travel/mien-bac/ha-noi" element={<TravelPageHaNoi />} />
          <Route path="/travel/mien-bac/ha-long" element={<TravelPageHaLong />} />
          <Route path="/travel/mien-bac/sapa" element={<TravelPageSapa />} />
          <Route path="/" element={<MainContent />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/admin/manage-users" element={<AdminUser />} />
          <Route path="/admin/img-slider" element={<AdminTourManagement />} />
          <Route path="/admin/tour-list" element={<DestinationList />} /> 
          <Route path="/admin/tour-list/tour/:id" element={<TourDetail />} />
          <Route path="/admin/city-list" element={<CityList />} />
          <Route path="/admin/province-list" element={<ProvinceList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

