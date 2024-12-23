import { FaUserCircle } from "react-icons/fa"; 
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { HiChevronDoubleLeft, HiOutlineMenu } from 'react-icons/hi';
import { RiArrowGoBackLine } from 'react-icons/ri';
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
import ProvinceList from './features/Admin/Province/ProvinceList';
import DestinationList from './features/Admin/Destination/DestinationList';


import { Destination, destinationList } from "./features/Admin/Destination/listdest";
import ItemDest from "./features/Admin/Destination/ItemDest";
import ItemDes from "./features/Admin/Destination/ItemDest";
import DestinationDetail from "./features/Maincontent/Content/DestinationDetails";
import PaymentPage from "./features/Maincontent/Payment/PaymentPage";
import PaymentDetailsPage from "./features/Admin/Payment/PaymentDetailsPage";


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
  const [language, setLanguage] = useState('en');
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
    navigate('/'); // Điều hướng về trang chính khi đăng xuất
  };

  const isLoginPage = location.pathname === '/login'; // Kiểm tra nếu đang ở trang login

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''} ${isLoginPage ? 'login-page' : ''}`}>
      {/* Chỉ hiển thị Sidebar và Header khi không ở trang Login */}
      {!isLoginPage && (
        <>
          <Sidebar
            isOpen={isSidebarOpen}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
          />
          <header className="app-header">
            <div className="top-bar">
              <div className="contact-info">
                <Button onClick={toggleSidebar} className="sidebar-toggle-button" style={{ color:"white", fontSize:"20px"}}>
                  {isSidebarOpen ? <HiChevronDoubleLeft /> : <HiOutlineMenu />}
                </Button>
              </div>
              <div className="user-options">

                <Button onClick={() => navigate('/admin')}>
                  Admin
                </Button>
                {selectedItem && (
                  <p style={{ marginTop: '20px' }}>
                    Mục bạn đã chọn: <strong>{selectedItem}</strong>
                  </p>
                )}
                {isLoggedIn ? (
                  <Button className="username">{username}</Button>
                ) : (
                  <Button className="button-login" onClick={() => navigate('/login')}>
                    <FaUserCircle /> {language === 'en' ? 'Login' : 'Đăng nhập'}
                  </Button>
                )}
                <Button className="language" onClick={toggleLanguage}>
                  {language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
                </Button>
              </div>
            </div>
          </header>
        </>
      )}

      <div className="content-wrapper">
        <Routes>
          <Route path="/travel/dongbac-taybac"    element={<TravelPageDongBac />} />
          <Route path="/travel/mien-bac/ha-noi"   element={<TravelPageHaNoi />} />
          <Route path="/travel/mien-bac/ha-long"  element={<TravelPageHaLong />} />
          <Route path="/travel/mien-bac/sapa"     element={<TravelPageSapa />} />
          <Route path="/"                         element={<MainContent />} />
          <Route path="/login"                    element={<Login onLogin={onLogin} />} />
          <Route path="/create-account"           element={<CreateAccount />} />
          <Route path="/forgot-password"          element={<ForgotPassword />} />
          <Route path="/admin/*"                  element={<AdminRoutes />} />
          <Route path="/admin/manage-users"       element={<AdminUser />} />
          <Route path="/admin/img-slider"         element={<AdminTourManagement />} />
          <Route path="/admin/tour-list"          element={<DestinationList />} /> 
          <Route path="/admin/tuor-list/tour/:id" element={<TourDetail />} />
          <Route path="/admin/city-list"          element={<CityList />} />
          <Route path="/admin/province-list"      element={<ProvinceList />} />
          <Route path="/destination/:id"          element={<DestinationDetail />} />
          <Route path="/admin/city-list"          element={<CityList />} />
          <Route path="/payment"                  element={<PaymentPage />} />
          <Route path="/admin/paymentdetails"           element={<PaymentDetailsPage />} />

          {/* {destinationList.map((dest) => (
          <Route
            key={dest.id}
            path={dest.encodedPath}
            element={<ItemDest destination={dest} />}
          />
          ))} */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
