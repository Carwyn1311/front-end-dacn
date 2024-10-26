import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '../../User/Content/Avatar';
import ConversationList from '../../Maincontent/Content/ConversationList';
import avatarImage from '../../User/images/CHERRY.png';
import LogoutButton from '../../Logout/Content/LogoutButton';
import '../.css/Sidebar.css';
import Button from '../../../components/Button/Button';

interface SidebarProps {
  userName: string;
  email: string;
  isOpen: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
  onSelectConversation: (conversationId: string, messages: any[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userName, email, isOpen, isLoggedIn, onLogout, onSelectConversation }) => {
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectConversation = (conversationId: string, conversationMessages: any[]) => {
    setSelectedConversationId(conversationId);
    setMessages(conversationMessages);
    onSelectConversation(conversationId, conversationMessages);
  };

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

  const handleAnalyticsClick = () => {
    navigate('/analytics');
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
        justifyContent: 'space-between',
      }}
    >
      <div className="profile" style={{ position: 'relative', padding: '20px' }}>
        {isLoggedIn ? (
          <>
            <div style={{ cursor: 'pointer' }} onClick={toggleAvatarMenu}>
              <Avatar src={avatarImage} alt="User Profile Picture" size={80} />
            </div>
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
          <div style={{ padding: '10px 0', cursor: 'pointer' }}>
            <Button
              onClick={handleBackToHome}
              className='logout-button'
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
            </Button>
          </div>
        )}

        <div className="conversationlist">
          <ConversationList onSelectConversation={handleSelectConversation} />
        </div>
      </div>

      {/* Avatar menu at the bottom */}
      {isAvatarMenuOpen && (
        <div
          className="avatar-menu"
          style={{
            position: 'absolute',
            top: '110px',
            left: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            padding: '10px',
            zIndex: 1,
            color: 'black',
            width: '150px',
            marginLeft: '30px',
          }}
        >
          <ul className="form-list" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
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
            <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleAnalyticsClick}>
              Phân tích tổng thể
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
