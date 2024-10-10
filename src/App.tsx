import React, { useState } from 'react';
import './App.css';
import Sidebar from './features/Sidebar/Content/Sidebar';
import MainContent from './features/Maincontent/MainContent';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm trạng thái đăng nhập

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <div className="header">
        <button onClick={toggleSidebar} className="sidebar-toggle-button">
          &#9776;
        </button>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <Sidebar userName={userName} email={email} isOpen={isSidebarOpen} isLoggedIn={isLoggedIn}/>
      )}

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <MainContent />
      </div>
    </div>
  );
};

export default App;
