import React, { useState } from 'react';
import '../.css/Sidebar.css';
import '../../../App.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import SidebarFooter from '../Content/SidebarFooter';
import SidebarMenu from '../Content/SidebarMenu';
import SidebarProfile from '../Content/SidebarProfile';

interface SidebarProps {
  userName: string
  email: string
}

const Sidebar: React.FC<SidebarProps> = ({ userName, email }): JSX.Element => {
  const [isAdminOpen, setAdminOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleAdminMenu = (): void => setAdminOpen(!isAdminOpen);
  const toggleSidebar = (): void => setSidebarOpen(!isSidebarOpen);

  return (
    <div>
      <div className="sidebar-toggle-button" onClick={toggleSidebar}>
        {isSidebarOpen
          ? (
            <AiOutlineArrowLeft style={{ fontSize: '30px' }} />)
          : (
            <FaBars />)}
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <SidebarProfile userName={userName} email={email} />
        <SidebarMenu isAdminOpen={isAdminOpen} toggleAdminMenu={toggleAdminMenu} />
        <SidebarFooter />
      </div>
    </div>
  );
};

export default Sidebar;
