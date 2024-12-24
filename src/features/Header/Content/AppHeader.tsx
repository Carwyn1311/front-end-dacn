import React, { useEffect, useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import { AppstoreOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../css/AppHeader.css';
import { classifyDestinations, fetchDestinations } from '../../Admin/Destination/listdest'; // Import để fetch data

interface Destination {
  id: number;
  name: string;
}

interface AppHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isLoggedIn: boolean;
  username: string;
  selectedItem: string;
  toggleLanguage: () => void;
  language: 'en' | 'vn';
  formatPath: (path: string) => string;
  onLogout: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  isSidebarOpen,
  toggleSidebar,
  isLoggedIn,
  username,
  selectedItem,
  toggleLanguage,
  language,
  formatPath,
  onLogout,
}) => {
  const navigate = useNavigate();

  const [domesticDestinations, setDomesticDestinations] = useState<{ [key: string]: Destination[] }>({});
  const [internationalDestinations, setInternationalDestinations] = useState<{ [key: string]: Destination[] }>({});

  // Gọi fetchDestinations khi component được mount
  useEffect(() => {
    const fetchAndClassifyDestinations = async () => {
      await fetchDestinations(); // Fetch dữ liệu điểm đến từ API
      const { domestic, international } = classifyDestinations(); // Phân loại điểm đến thành trong nước và quốc tế
      setDomesticDestinations(domestic); // Lưu trữ điểm đến trong nước
      setInternationalDestinations(international); // Lưu trữ điểm đến quốc tế
    };

    fetchAndClassifyDestinations(); // Thực thi chức năng fetch và phân loại điểm đến
  }, []); // Gọi 1 lần khi component mount

  const createMenuItems = () => [
    {
      key: "domestic-travel",
      icon: <AppstoreOutlined />,
      label: "Tour Trong Nước",
      children: Object.entries(domesticDestinations).map(
        ([provinceName, destinations]) => ({
          key: `province-${provinceName}`,
          label: provinceName,
          children: destinations.map((dest) => ({
            key: `domestic-${dest.id}`,
            label: dest.name,
            onClick: () => navigate(`/destination/${dest.id}`),  // Sử dụng id làm URL
          })),
        })
      ),
    },
    {
      key: "international-travel",
      icon: <GlobalOutlined />,
      label: "Tour Quốc Tế",
      children: Object.entries(internationalDestinations).map(
        ([provinceName, destinations]) => ({
          key: `province-${provinceName}`,
          label: provinceName,
          children: destinations.map((dest) => ({
            key: `international-${dest.id}`,
            label: dest.name,
            onClick: () => navigate(`/destination/${dest.id}`),  // Sử dụng id làm URL
          })),
        })
      ),
    },
    {
      key: "services",
      label: "Thông tin về DPT Travel",
      onClick: () => navigate('/info-dpt-travel'),
    },
    {
      key: "contact",
      label: "Liên Hệ",
      onClick: () => navigate('/lien-he'),
    },
  ];

  const createAdminMenuItems = () => [
    {
      key: "admin",
      icon: <UserOutlined />,
      label: "Trang Admin",
      children: [
        {
          key: "manage-users",
          label: "Quản lý User",
          onClick: () => navigate("/admin/manage-users"),
        },
        {
          key: "paymentdetails",
          label: "Xác nhận thanh toán",
          onClick: () => navigate("/admin/paymentdetails"),
        },
        {
          key: "tour-list",
          label: "Quản lý DS Tour",
          onClick: () => navigate("/admin/tour-list"),
        },
        {
          key: "city-list",
          label: "Quản lý City",
          onClick: () => navigate("/admin/city-list"),
        },
        {
          key: "province-list",
          label: "Quản lý Province List",
          onClick: () => navigate("/admin/province-list"),
        },
      ],
    },
  ];

  const createLoginMenuItems = () => [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      onClick: () => navigate("/profile"),
    },
    {
      key: "switch-account",
      label: "Đăng nhập bằng tài khoản khác",
      onClick: () => navigate("/login"),
    },
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: onLogout, 
    },
  ];

  const menu = (
    <Menu items={createMenuItems()} />
  );

  const adminMenu = (
    <Menu items={createAdminMenuItems()} />
  );

  const loginMenu = (
    <Menu items={createLoginMenuItems()} />
  );

  return (
    <header className="app-header">
      <div className="top-bar">
        <div className="contact-info">
          <Button onClick={() => navigate('/')} className="nav-button">
            Trang Chủ
          </Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className="nav-button">Danh Mục</Button>
          </Dropdown>


        </div>
        <div className="user-options">
          <Dropdown overlay={adminMenu} trigger={['click']}>
            <Button className="nav-button">Admin</Button>
          </Dropdown>
          {isLoggedIn ? (
            <Dropdown overlay={loginMenu} trigger={['click']}>
              <Button className="nav-button">
                <FaUserCircle /> {username}
              </Button>
            </Dropdown>
          ) : (
            <Button className="button-login nav-button" onClick={() => navigate('/login')}>
              <FaUserCircle /> {language === 'en' ? 'Login' : 'Đăng nhập'}
            </Button>
          )}

          <Button className="language nav-button" onClick={toggleLanguage}>
            {language === 'en' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
