import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../.css/Sidebar.css';
import { User } from '../../User/Content/User';
import { Menu, Button } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  GlobalOutlined,
  SettingOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

interface SidebarProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const currentUser = User.getUserData();
    if (currentUser?.role === 'ADMIN') {
      setIsAdmin(true);
    }
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      style={{
        width: isOpen ? '250px' : '0',
        backgroundColor: '#ffffff',
        height: '100vh',
        color: '#333',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)',
        borderRadius: isOpen ? '8px' : '0',
      }}
    >
      <Menu
        mode="inline"
        inlineCollapsed={!isOpen}
        className="sidebar-menu"
        style={{
          backgroundColor: '#ffffff',
          color: '#333',
          border: 'none',
          fontSize: '14px',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          onClick={() => handleMenuClick('/')}
          className="sidebar-menu-item"
        >
          Trang chủ
        </Menu.Item>

        <Menu.SubMenu
          key="domestic-tours"
          icon={<AppstoreOutlined />}
          title="Tour trong nước"
          className="sidebar-submenu"
        >
          <Menu.ItemGroup title="Miền Bắc" className="sidebar-item-group">
            <Menu.Item key="north-1" onClick={() => handleMenuClick('/tours/mien-bac/dong-bac-tay-bac')}>
              Đông Bắc - Tây Bắc
            </Menu.Item>
            <Menu.Item key="north-2" onClick={() => handleMenuClick('/tours/mien-bac/ha-noi')}>
              Hà Nội
            </Menu.Item>
            <Menu.Item key="north-3" onClick={() => handleMenuClick('/tours/mien-bac/ha-long')}>
              Hạ Long
            </Menu.Item>
            <Menu.Item key="north-4" onClick={() => handleMenuClick('/tours/mien-bac/sapa')}>
              Sapa
            </Menu.Item>
          </Menu.ItemGroup>

          <Menu.ItemGroup title="Miền Trung" className="sidebar-item-group">
            <Menu.Item key="central-1" onClick={() => handleMenuClick('/tours/mien-trung/phan-thiet')}>
              Phan Thiết
            </Menu.Item>
            <Menu.Item key="central-2" onClick={() => handleMenuClick('/tours/mien-trung/nha-trang')}>
              Nha Trang
            </Menu.Item>
            <Menu.Item key="central-3" onClick={() => handleMenuClick('/tours/mien-trung/da-lat')}>
              Đà Lạt
            </Menu.Item>
          </Menu.ItemGroup>

          <Menu.ItemGroup title="Miền Nam" className="sidebar-item-group">
            <Menu.Item key="south-1" onClick={() => handleMenuClick('/tours/mien-nam/phu-quoc')}>
              Phú Quốc
            </Menu.Item>
            <Menu.Item key="south-2" onClick={() => handleMenuClick('/tours/mien-nam/mien-tay')}>
              Miền Tây
            </Menu.Item>
            <Menu.Item key="south-3" onClick={() => handleMenuClick('/tours/mien-nam/con-dao')}>
              Côn Đảo
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="international-tours"
          icon={<GlobalOutlined />}
          title="Tour nước ngoài"
          className="sidebar-submenu"
        >
          <Menu.ItemGroup title="Châu Á" className="sidebar-item-group">
            <Menu.Item key="asia-1" onClick={() => handleMenuClick('/tours/nuoc-ngoai/chau-a/nhat-ban')}>
              Du lịch Nhật Bản
            </Menu.Item>
            <Menu.Item key="asia-2" onClick={() => handleMenuClick('/tours/nuoc-ngoai/chau-a/han-quoc')}>
              Du lịch Hàn Quốc
            </Menu.Item>
          </Menu.ItemGroup>

          <Menu.ItemGroup title="Châu Âu" className="sidebar-item-group">
            <Menu.Item key="europe-1" onClick={() => handleMenuClick('/tours/nuoc-ngoai/chau-au/anh')}>
              Du lịch Anh
            </Menu.Item>
            <Menu.Item key="europe-2" onClick={() => handleMenuClick('/tours/nuoc-ngoai/chau-au/phap')}>
              Du lịch Pháp
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="services"
          icon={<SettingOutlined />}
          title="Dịch vụ du lịch"
          className="sidebar-submenu"
        >
          <Menu.Item key="service-1" onClick={() => handleMenuClick('/dich-vu/thue-xe')}>
            Thuê xe
          </Menu.Item>
          <Menu.Item key="service-2" onClick={() => handleMenuClick('/dich-vu/ve-may-bay')}>
            Vé máy bay
          </Menu.Item>
          <Menu.Item key="service-3" onClick={() => handleMenuClick('/dich-vu/bao-hiem-du-lich')}>
            Bảo hiểm du lịch
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item
          key="contact"
          icon={<PhoneOutlined />}
          onClick={() => handleMenuClick('/contact')}
          className="sidebar-menu-item"
        >
          Liên hệ
        </Menu.Item>

        {isAdmin && (
          <Menu.Item
            key="admin"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick('/admin')}
            className="sidebar-menu-item"
          >
            Trang Admin
          </Menu.Item>
        )}
      </Menu>

      {isLoggedIn && (
        <div className="sidebar-logout">
          <Button
            onClick={onLogout}
            className="sidebar-logout-btn"
          >
            Đăng xuất
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
