import React from 'react';
import '../.css/Sidebar.css';
import Avatar from '../../User/Content/Avatar';

interface SidebarProfileProps {
  userName: string
  email: string
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({ userName, email }) => {
  return (
    <div className="my-profile">
      <Avatar src="../images/Userimage.png" alt="My_Profile" size={80} />
      <h2 className="info-username">Lê Trọng Phúc</h2>
      <p className="info-email">phuc.letrong@ncc.asia</p>
    </div>
  );
};

export default SidebarProfile;
