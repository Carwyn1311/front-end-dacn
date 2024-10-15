import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './features/Sidebar/Content/Sidebar';
import AdminUser from './features/Admin/User/AdminUser'; // Đường dẫn đến AdminUser
import MainContent from './features/Maincontent/MainContent';
import Profile from './features/Profile/Profile'; // Import trang Profile
import Help from './features/Help/Help';
import Info from './features/Info/Info';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('');  // Bạn có thể cập nhật giá trị người dùng khi có dữ liệu
  const [email, setEmail] = useState('');        // Cập nhật giá trị email khi người dùng đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm trạng thái đăng nhập

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  // Toggle trạng thái của Sidebar (mở/đóng)
  };

  return (
    <Router>
      <div className="app-container" style={{ display: 'flex' }}>
        {/* Sidebar Toggle Button */}
        <div className="header" style={{ padding: '10px' }}>
          <button onClick={toggleSidebar} className="sidebar-toggle-button" style={{ fontSize: '24px' }}>
            &#9776; {/* Icon menu hamburger */}
          </button>
        </div>

        {/* Sidebar */} 
        {isSidebarOpen && (
          <Sidebar 
            userName={userName} 
            email={email} 
            isOpen={isSidebarOpen} 
            isLoggedIn={isLoggedIn} 
          />
        )}

        {/* Main Content */}
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} style={{ flexGrow: 1 }}>
          <Routes>
            {/* Định tuyến đến trang chính */}
            <Route path="/" element={<MainContent isSidebarOpen={isSidebarOpen} />} />

            {/* Định tuyến đến trang Admin */}
            <Route path="/admin" element={<AdminUser />} />

            {/* Trang Profile */}
            <Route path="/profile" element={<Profile />} />

            {/* Trang Trợ giúp */}
            <Route path="/help" element={<Help />} /> {/* Thêm route cho trang trợ giúp */}
            <Route path="/info" element={<Info />} />  {/* Thêm route cho Info */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
