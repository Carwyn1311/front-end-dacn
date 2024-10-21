import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for detecting the current route
import LogoutButton from '../../Logout/Content/LogoutButton';

interface SidebarProps {
  userName: string;
  email: string; // Giữ lại email
  isOpen: boolean;
  isLoggedIn: boolean;
  onLogout: () => void; // Thêm hàm xử lý logout
}

const Sidebar: React.FC<SidebarProps> = ({ userName, email, isOpen, isLoggedIn, onLogout }) => {
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

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
      }}
    >
      <div className="profile" style={{ position: 'relative', padding: '20px' }}>
        {isLoggedIn ? (
          <>
            {/* Chỉ hiển thị avatar và menu khi đã đăng nhập */}
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
                    <LogoutButton onLogout={onLogout} /> {/* Nút Logout */}
                  </li>
                </ul>
              </div>
            )}

            {/* Hiển thị username và email khi đã đăng nhập */}
            {isOpen && (
              <>
                <h2>{userName}</h2> {/* Chỉ hiển thị username */}
                {email && <p>{email}</p>} {/* Chỉ hiển thị email nếu không trống */}
              </>
            )}
          </>
        ) : (
          <div style={{ padding: '20px', cursor: 'pointer' }} onClick={handleLoginClick}>
            <button style={{ padding: '10px', width: '100%', backgroundColor: '#1890ff', border: 'none', color: 'white', cursor: 'pointer' }}>
              Login
            </button>
          </div>
        )}

        {/* Back to Home Button */}
        {location.pathname !== '/' && ( // Show the button if not on the home page
          <div style={{ padding: '10px 0', cursor: 'pointer' }} onClick={handleBackToHome}>
            <button style={{ padding: '10px', width: '100%', backgroundColor: '#ff5722', border: 'none', color: 'white', cursor: 'pointer' }}>
              Quay lại trang chính
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
