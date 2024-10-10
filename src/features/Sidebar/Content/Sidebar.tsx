import React, { useState } from 'react';

interface SidebarProps {
  userName: string;
  email: string;
  isOpen: boolean; // Trạng thái của sidebar (mở hoặc đóng)
  isLoggedIn: boolean; // Trạng thái đăng nhập
}

const Sidebar: React.FC<SidebarProps> = ({ userName, email, isOpen, isLoggedIn }) => {
  const [isAvatarMenuOpen, setAvatarMenuOpen] = useState(false); // Quản lý việc hiển thị menu của avatar

  const toggleAvatarMenu = () => {
    setAvatarMenuOpen(!isAvatarMenuOpen); // Bật/tắt khung menu khi bấm vào avatar
  };

  const handleLogout = () => {
    // Xử lý việc đăng xuất ở đây
    console.log('Logged out');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="profile" style={{ position: 'relative' }}>
        {/* Avatar - hiển thị luôn dù sidebar đóng/mở */}
        <img 
          src="https://static.vecteezy.com/ti/vecteur-libre/p1/21548095-defaut-profil-image-avatar-utilisateur-avatar-icone-la-personne-icone-tete-icone-profil-image-icones-defaut-anonyme-utilisateur-masculin-et-femelle-homme-d-affaire-photo-espace-reserve-social-reseau-avatar-portrait-gratuit-vectoriel.jpg" 
          alt="User Avatar" 
          style={{
            width: '30px', /* Điều chỉnh kích thước rộng nhỏ hơn */
            height: '30px', /* Điều chỉnh kích thước cao nhỏ hơn */
            borderRadius: '50%', /* Bo tròn avatar */
            objectFit: 'cover', /* Đảm bảo hình ảnh vừa khung tròn */
            cursor: 'pointer' // Đổi con trỏ khi hover
          }}
          onClick={toggleAvatarMenu} // Thêm sự kiện onClick vào avatar
        />

        {/* Hiển thị khung menu khi bấm vào avatar */}
        {isAvatarMenuOpen && (
          <div className="avatar-menu" style={{
            position: 'absolute',
            top: '40px',
            left: '0',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            padding: '10px',
            zIndex: 1
          }}>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '5px 0', cursor: 'pointer' }}>Trang Admin</li>
              <li style={{ padding: '5px 0', cursor: 'pointer' }}>Login</li>
              {isLoggedIn && (
                <li style={{ padding: '5px 0', cursor: 'pointer' }} onClick={handleLogout}>Logout</li>
              )}
              <li style={{ padding: '5px 0', cursor: 'pointer' }}>Edit Profile</li>
              <li style={{ padding: '5px 0', cursor: 'pointer' }}>Trợ giúp</li>
            </ul>
          </div>
        )}
        
        {/* Thông tin người dùng chỉ hiển thị khi sidebar mở */}
        {isOpen && (
          <>
            <h2>{userName ? `Welcome, ${userName}` : 'Vui lòng nhập tên của bạn'}</h2>
            <p>{email ? email : 'Vui lòng nhập email của bạn'}</p>
          </>
        )}
      </div>

      <div className="menu">
        {/* Menu items - hiển thị icon khi sidebar đóng */}
        <div className="menu-item">
          {isOpen && <span>Nội dung AI CHAT</span>}
        </div>
        <div className="menu-item">
          {isOpen && <span>Khám phá AI CHAT</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
