import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './features/Sidebar/Content/Sidebar'; // Sidebar sẽ bị bỏ khi ở trang login, create-account, forgot-password
import MainContent from './features/Maincontent/Content/MainContent';
import Login from './features/Auth/Login';
import { User } from './features/User/Content/User';
import AdminRoutes from './features/Admin/Content/AdminRoutes';
import AdminUser from './features/Admin/User/AdminUser';
import AdminTourManagement from './features/Admin/Content/AdminTourManagement';
import TravelPageDongBac from './features/AllTours/Tours/TravelPageDongBac';
import TravelPageHaNoi from './features/AllTours/Tours/TravelPageHaNoi';
import TravelPageHaLong from './features/AllTours/Tours/TravelPageHaLong';
import TravelPageSapa from './features/AllTours/Tours/TravelPageSapa';
import CreateAccount from './features/Auth/CreateAccount';
import ForgotPassword from './features/Auth/ForgotPassword';
import ErrorBoundary from './features/Error Boundary/Error Boundary';
import TourDetail from './features/Admin/Content/TourDetail';
import CityList from './features/Admin/City/CityList';
import ProvinceList from './features/Admin/Province/ProvinceList';
import DestinationList from './features/Admin/Destination/DestinationList';
import DestinationDetail from './features/Maincontent/Content/DestinationDetails';
import PaymentPage from './features/Maincontent/Payment/PaymentPage';
import PaymentDetailsPage from './features/Admin/Payment/PaymentDetailsPage';
import AppHeader from './features/Header/Content/AppHeader';
import InfoDPTTravel from './features/Profile/InfoDPTTravel';
import ContactPage from './features/Maincontent/Content/ContactPage';
import { Destination } from './features/Admin/Destination/listdest';
import UserProfile from './features/Profile/UserProfile';

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
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vn'>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation(); // Dùng hook useLocation để lấy đường dẫn hiện tại

  useEffect(() => {
    const user = User.getUserData();
    if (user && user.username) {
      setIsLoggedIn(true);
      setUsername(user.username);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vn' : 'en');
  };

  const onLogin = () => {
    const user = User.getUserData();
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username);
      navigate('/'); // Điều hướng về trang chính
    }
  };

  const onLogout = () => {
    User.clearUserData();
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  // Kiểm tra nếu đang ở trang login, create-account, forgot-password
  const isLoginPage = ['/login', '/create-account', '/forgot-password'].includes(location.pathname);

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''} ${isLoginPage ? 'login-page' : ''}`}>
      {/* Ẩn AppHeader và Sidebar nếu ở trang login, create-account, forgot-password */}
      {!isLoginPage && (
        <>
          <AppHeader
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            isLoggedIn={isLoggedIn}
            username={username}
            selectedItem={selectedItem}
            toggleLanguage={toggleLanguage}
            language={language}
            formatPath={(path: string) => path}
            onLogout={onLogout}
          />
          <Sidebar
            isOpen={isSidebarOpen}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
          />
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
          <Route path="/admin/tuor-list/tour/:id" element={<TourDetail />} />
          <Route path="/admin/city-list" element={<CityList />} />
          <Route path="/admin/province-list" element={<ProvinceList />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/admin/city-list" element={<CityList />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin/paymentdetails" element={<PaymentDetailsPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/info-dpt-travel" element={<InfoDPTTravel />} />
          <Route path="/lien-he" element={<ContactPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
