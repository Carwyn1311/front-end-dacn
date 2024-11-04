import React, { useState } from 'react';
import './App.css';
import MainContent from './features/Maincontent/Content/MainContent';
import Button from './components/Button/Button';
import TitleBar from './features/Header/Content/TitleBar';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        className="main-content"
        style={{
          flexGrow: 1,
          transition: 'margin-left 0.3s',
          marginLeft: isSidebarOpen ? '250px' : '0',
          overflow: 'auto',
        }}
      >
        <header className="app-header" style={{ borderBottom: '1px solid #ddd', position: 'fixed', top: '0', width: '100%', zIndex: '1' }}>
          <TitleBar />
            <Button onClick={toggleSidebar} className="sidebar-toggle-button">
              &#9776;
            </Button>
        </header>

        <div style={{ marginTop: '80px' }}>
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default App;
