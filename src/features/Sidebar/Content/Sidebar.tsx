import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  userName: string;
  email: string;
  isOpen: boolean;
  isLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ userName, email, isOpen, isLoggedIn }) => {
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    console.log('Logged out');
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
      }}
    >
      <div className="profile" style={{ position: 'relative', padding: '20px' }}>
        <img
          src="https://static.vecteezy.com/ti/vecteur-libre/p1/21548095-defaut-profil-image-avatar-utilisateur-avatar-icone-la-personne-icone-tete-icone-profil-image-icones-defaut-anonyme-utilisateur-masculin-et-femelle-homme-d-affaire-photo-espace-reserve-social-reseau-avatar-portrait-gratuit-vectoriel.jpg"
          alt="User Avatar"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
          onClick={toggleAvatarMenu}
        />

        {isAvatarMenuOpen && (
          <div
            className="avatar-menu"
            style={{
              position: 'absolute',
              top: '70px',
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
              <li style={{ padding: '5px 0', cursor: 'pointer' }}>Login</li>
              {isLoggedIn && (
                <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleLogout}>
                  Logout
                </li>
              )}
              <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleProfileClick}>
                Edit Profile
              </li>
              <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleHelpClick}>
                Trợ giúp
              </li>
               <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleInfoClick}>
                Thông tin hệ thống
              </li>
            </ul>
          </div>
        )}

        {isOpen && (
          <>
            <h2>{userName ? `Welcome, ${userName}` : 'Vui lòng nhập tên của bạn'}</h2>
            <p>{email ? email : 'Vui lòng nhập email của bạn'}</p>
          </>
        )}
      </div>

      <div className="menu" style={{ marginLeft: '50px' }}>
        <div className="menu-item">{isOpen && <span>Nội dung AI CHAT</span>}</div>
        <div className="menu-item" style={{ marginLeft: '-5px' }}>
          {isOpen && <span>Khám phá AI CHAT</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
