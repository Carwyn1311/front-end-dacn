import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutButton from '../../Logout/Content/LogoutButton';
import Avatar from '../../User/Content/Avatar';
import avatarImage from '../../User/images/CHERRY.png';

interface SidebarProps {
  userName: string;
  email: string;
  isOpen: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userName, email, isOpen, isLoggedIn, onLogout }) => {
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleAvatarMenu = () => {
    setAvatarMenuOpen(!isAvatarMenuOpen);
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  const handleInfoClick = () => {
    navigate('/info');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      style={{
        width: isOpen ? '250px' : '0',
        backgroundColor: '#002140',
        height: '100vh',
        color: 'white',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Ensures that the avatar is at the top and the menu is at the bottom
      }}
    >
      <div className="profile" style={{ position: 'relative', padding: '20px' }}>
        {isLoggedIn ? (
          <>
            <div style={{ cursor: 'pointer' }} onClick={toggleAvatarMenu}>
              <Avatar src={avatarImage} alt="User Profile Picture" size={70} />
            </div>
            {isOpen && (
              <>
                <h2>{userName}</h2>
                {email && <p>{email}</p>}
              </>
            )}
          </>
        ) : (
          <div style={{ padding: '20px', cursor: 'pointer' }} onClick={handleLoginClick}>
            <button
              style={{
                padding: '10px',
                width: '100%',
                backgroundColor: '#1890ff',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          </div>
        )}
        {location.pathname !== '/' && (
          <div style={{ padding: '10px 0', cursor: 'pointer' }} onClick={handleBackToHome}>
            <button
              style={{
                padding: '10px',
                width: '100%',
                backgroundColor: '#ff5722',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              Quay lại trang chính
            </button>
          </div>
        )}
      </div>
{/* Avatar menu at the bottom */}
      {isAvatarMenuOpen && (
        <div
          className="avatar-menu"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '0',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            padding: '10px',
            zIndex: 1,
            color: 'black',
            width: '150px',
          }}
        >
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleAdminClick}>
              Trang Admin
            </li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleProfileClick}>
              Edit Profile
            </li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleHelpClick}>
              Trợ giúp
            </li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleInfoClick}>
              Thông tin hệ thống
            </li>
            <li style={{ padding: '5px 0', cursor: 'pointer', color: 'red' }}>
              <LogoutButton onLogout={onLogout} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;