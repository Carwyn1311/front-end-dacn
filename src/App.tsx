import React, { useState } from 'react';
import './App.css';
import Sidebar from './features/Sidebar/Content/Sidebar';
import MainContent from './features/Maincontent/MainContent';
import Button from './components/Button/Button';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userName] = useState('');
  const [email] = useState('');
  const [isLoggedIn] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <div className="header">
        <Button onClick={toggleSidebar} className="sidebar-toggle-button">
          &#9776;
        </Button>
      </div>
      {isSidebarOpen && (
        <Sidebar userName={userName} email={email} isOpen={isSidebarOpen} isLoggedIn={isLoggedIn}/>
      )}
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <MainContent />
      </div>
    </div>
  );
};

export default App;
