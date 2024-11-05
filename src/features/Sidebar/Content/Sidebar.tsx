// Sidebar.tsx
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
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      style={{
        width: isOpen ? '250px' : '0',
        backgroundColor: '#002140',
        height: '100vh',
        color: 'white',
        transition: 'width 0.3s ease',
        overflowY: 'auto',
      }}
    >
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={!isOpen}
        style={{ backgroundColor: '#002140', color: 'white' }}
      >
        <Menu.Item
          key="home"
          icon={<HomeOutlined />}
          onClick={() => handleMenuClick('/')}
        >
          Trang chủ
        </Menu.Item>
        
        <Menu.SubMenu
          key="domestic-tours"
          icon={<AppstoreOutlined />}
          title="Tour trong nước"
        >
          <Menu.ItemGroup title="Miền Bắc">
            <Menu.Item key="north-1">Đông Bắc - Tây Bắc</Menu.Item>
            <Menu.Item key="north-2">Hà Nội</Menu.Item>
            <Menu.Item key="north-3">Hạ Long</Menu.Item>
            <Menu.Item key="north-4">Sapa</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Miền Trung">
            <Menu.Item key="central-1">Phan Thiết</Menu.Item>
            <Menu.Item key="central-2">Nha Trang</Menu.Item>
            <Menu.Item key="central-3">Đà Lạt</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Miền Nam">
            <Menu.Item key="south-1">Phú Quốc</Menu.Item>
            <Menu.Item key="south-2">Miền Tây</Menu.Item>
            <Menu.Item key="south-3">Côn Đảo</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Tour nổi bật">
            <Menu.Item key="highlight-1">Tour Tết 2025</Menu.Item>
            <Menu.Item key="highlight-2">Tour Du thuyền</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="international-tours"
          icon={<GlobalOutlined />}
          title="Tour nước ngoài"
        >
          <Menu.ItemGroup title="Châu Á">
            <Menu.Item key="asia-1">Du lịch Nhật Bản</Menu.Item>
            <Menu.Item key="asia-2">Du lịch Hàn Quốc</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Châu Âu">
            <Menu.Item key="europe-1">Du lịch Anh</Menu.Item>
            <Menu.Item key="europe-2">Du lịch Pháp</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Châu Mỹ - Úc - Phi">
            <Menu.Item key="america-1">Du lịch Mỹ</Menu.Item>
            <Menu.Item key="america-2">Du lịch Úc</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="services"
          icon={<SettingOutlined />}
          title="Dịch vụ du lịch"
        >
          <Menu.Item key="service-1">Thuê xe</Menu.Item>
          <Menu.Item key="service-2">Vé máy bay</Menu.Item>
          <Menu.Item key="service-3">Bảo hiểm du lịch</Menu.Item>
        </Menu.SubMenu>

        <Menu.Item
          key="contact"
          icon={<PhoneOutlined />}
          onClick={() => handleMenuClick('/contact')}
        >
          Liên hệ
        </Menu.Item>

        {isAdmin && (
          <Menu.Item
            key="admin"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick('/admin')}
          >
            Trang Admin
          </Menu.Item>
        )}
      </Menu>

      {isLoggedIn && (
        <div style={{ padding: '20px' }}>
          <Button
            onClick={onLogout}
            style={{
              width: '100%',
              backgroundColor: '#ff4d4f',
              color: 'white',
              border: 'none',
            }}
          >
            Đăng xuất
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
