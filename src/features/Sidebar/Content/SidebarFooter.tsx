import React from 'react';
import '../.css/Sidebar.css';

interface SidebarFooterProps {
  className?: string
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ className }) => (
  <div className="footer">
    <h2> &copy;2024 Timesheet.</h2>
  </div>
);

export default SidebarFooter;
