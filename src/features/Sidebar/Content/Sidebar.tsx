import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Sidebar.css";
import { User } from "../../User/Content/User";
import { Menu, Button } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  GlobalOutlined,
  SettingOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { classifyDestinations, fetchDestinations } from "../../Admin/Destination/listdest";

interface SidebarProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isLoggedIn, onLogout }) => {
  const [domestic, setDomestic] = useState<any[]>([]);
  const [international, setInternational] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  

  useEffect(() => {
    const currentUser = User.getUserData();
    if (currentUser) {
      setIsAdmin(currentUser.isAdmin()); // Use the isAdmin method from User class
    }

    // Fetch and classify destinations
    const fetchAndClassifyDestinations = async () => {
      await fetchDestinations(); // Fetch the destinations from the API
      const { domestic, international } = classifyDestinations(); // Classify them into domestic and international
      setDomestic(Object.values(domestic).flat());
      setInternational(Object.values(international).flat());
    };

    fetchAndClassifyDestinations(); // Call the function to fetch and classify destinations
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const formatPath = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\s,]/g, "-");
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Trang chủ",
      onClick: () => handleMenuClick("/"),
    },
    //...(isAdmin
    //? [
    {
      key: "admin",
      icon: <UserOutlined />,
      label: "Trang Admin",
      children: [
        {
          key: "manage-users",
          label: "Quản lý User",
          onClick: () => handleMenuClick("/admin/manage-users"),
        },
        {
          key: "paymentdetails",
          label: "Xác nhận thanh toán",
          onClick: () => handleMenuClick("/admin/paymentdetails"),
        },
        {
          key: "tour-list",
          label: "Quản lý DS Tour",
          onClick: () => handleMenuClick("/admin/tour-list"),
        },
        {
          key: "city-list",
          label: "Quản lý City",
          onClick: () => handleMenuClick("/admin/city-list"),
        },
        {
          key: "province-list",
          label: "Quản lý Provice List",
          onClick: () => handleMenuClick("/admin/province-list"),
        },
      ],
    },
    {
      key: "domestic-travel",
      icon: <AppstoreOutlined />,
      label: "Tour trong nước",
      children: Object.entries(classifyDestinations().domestic).map(([provinceName, destinations]) => ({
        key: `province-${provinceName}`,
        label: provinceName, // Tên của province
        children: destinations.map((dest) => ({
          key: `domestic-${dest.id}`,
          label: dest.name, // Tên điểm đến
          onClick: () => navigate(`/travel/domestic/${formatPath(dest.name)}`),
        })),
      })),
    },
    {
      key: "international-travel",
      icon: <GlobalOutlined />,
      label: "Tour quốc tế",
      children: Object.entries(classifyDestinations().international).map(([provinceName, destinations]) => ({
        key: `province-${provinceName}`,
        label: provinceName, // Tên của province
        children: destinations.map((dest) => ({
          key: `international-${dest.id}`,
          label: dest.name, // Tên điểm đến
          onClick: () => navigate(`/travel/international/${formatPath(dest.name)}`),
        })),
      })),
    },
    
    {
      key: "services",
      icon: <SettingOutlined />,
      label: "Dịch vụ du lịch",
      children: [
        {
          key: "service-1",
          label: "Thông tin về PDT Travel",
          onClick: () => handleMenuClick("/info-dpt-travel"),
        },
      ],
    },

    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: "Liên hệ",
      onClick: () => handleMenuClick("/contact"),
    },
  ];
  ///: []),
  //];

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Menu
        mode="inline"
        inlineCollapsed={!isOpen}
        className="sidebar-menu"
        items={menuItems}
      />
      {isLoggedIn && (
        <div className="sidebar-logout">
          <Button onClick={onLogout} className="sidebar-logout-btn">
            Đăng xuất
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
