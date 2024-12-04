import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Sidebar.css';
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
    if (currentUser) {
      setIsAdmin(currentUser.isAdmin()); // Use the isAdmin method from User class
    }
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
      onClick: () => handleMenuClick('/'),
    },
    {
      key: 'domestic-travel',
      icon: <AppstoreOutlined />,
      label: 'Tour trong nước',
      children: [
        {
          type: 'group',
          label: 'Miền Bắc',
          children: [
            { key: 'north-1', label: 'Đông Bắc - Tây Bắc', onClick: () => handleMenuClick('/travel/dongbac-taybac'), // Liên kết đến route
              },
            { key: 'north-2', label: 'Hà Nội', onClick: () => handleMenuClick('/travel/mien-bac/ha-noi') },
            { key: 'north-3', label: 'Hạ Long', onClick: () => handleMenuClick('/travel/mien-bac/ha-long') },
            { key: 'north-4', label: 'Sapa', onClick: () => handleMenuClick('/travel/mien-bac/sapa') },
            { key: 'north-5', label: 'Ninh Bình', onClick: () => handleMenuClick('/travel/mien-bac/ninh-binh') },
            { key: 'north-6', label: 'Hải Phòng', onClick: () => handleMenuClick('/travel/mien-bac/hai-phong') },
            { key: 'north-7', label: 'Thanh Hóa', onClick: () => handleMenuClick('/travel/mien-bac/thanh-hoa') },
          ],
        },
        {
          type: 'group',
          label: 'Miền Trung',
          children: [
            { key: 'central-1', label: 'Phan Thiết', onClick: () => handleMenuClick('/tours/mien-trung/phan-thiet') },
            { key: 'central-2', label: 'Nha Trang', onClick: () => handleMenuClick('/tours/mien-trung/nha-trang') },
            { key: 'central-3', label: 'Đà Lạt', onClick: () => handleMenuClick('/tours/mien-trung/da-lat') },
            { key: 'central-4', label: 'Tây Nguyên', onClick: () => handleMenuClick('/tours/mien-trung/tay-nguyen') },
            { key: 'central-5', label: 'Tuy Hòa - Quy Nhơn - Quảng Ngãi', onClick: () => handleMenuClick('/tours/mien-trung/tuy-hoa-quy-nhon-quang-ngai') },
            { key: 'central-6', label: 'Huế - Quảng Bình', onClick: () => handleMenuClick('/tours/mien-trung/hue-quang-binh') },
            { key: 'central-7', label: 'Nghệ An', onClick: () => handleMenuClick('/tours/mien-trung/nghe-an') },
            { key: 'central-8', label: 'Đà Nẵng', onClick: () => handleMenuClick('/tours/mien-trung/da-nang') },
          ],
        },
        {
          type: 'group',
          label: 'Miền Nam',
          children: [
            { key: 'south-1', label: 'Phú Quốc', onClick: () => handleMenuClick('/tours/mien-nam/phu-quoc') },
            { key: 'south-2', label: 'Miền Tây', onClick: () => handleMenuClick('/tours/mien-nam/mien-tay') },
            { key: 'south-3', label: 'Côn Đảo', onClick: () => handleMenuClick('/tours/mien-nam/con-dao') },
            { key: 'south-4', label: 'Hồ Tràm - Vũng Tàu', onClick: () => handleMenuClick('/tours/mien-nam/ho-tram-vung-tau') },
            { key: 'south-5', label: 'Tour Tp. Hồ Chí Minh', onClick: () => handleMenuClick('/tours/mien-nam/ho-chi-minh') },
            { key: 'south-6', label: 'Tây Ninh', onClick: () => handleMenuClick('/tours/mien-nam/tay-ninh') },
            { key: 'south-7', label: 'Đông Nam Bộ', onClick: () => handleMenuClick('/tours/mien-nam/dong-nam-bo') },
          ],
        },
        {
          type: 'group',
          label: 'Chùm Tour',
          children: [
            { key: 'combo-1', label: 'Vé Quê Nhà', onClick: () => handleMenuClick('/tours/chum-tour/ve-que-nha') },
            { key: 'combo-2', label: 'Combo Free Easy', onClick: () => handleMenuClick('/tours/chum-tour/combo-free-easy') },
            { key: 'combo-3', label: 'Người cao tuổi', onClick: () => handleMenuClick('/tours/chum-tour/nguoi-cao-tuoi') },
            { key: 'combo-4', label: 'Tết Nguyên Đán 2025', onClick: () => handleMenuClick('/tours/chum-tour/tet-nguyen-dan-2025') },
          ],
        },
      ],
    },
    {
      key: 'international-tours',
      icon: <GlobalOutlined />,
      label: 'Tour nước ngoài',
      children: [
        {
          type: 'group',
          label: 'Châu Á',
          children: [
            { key: 'asia-india', label: 'Du lịch Ấn Độ', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-a/an-do') },
            { key: 'asia-bhutan', label: 'Du lịch Bhutan', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-a/bhutan') },
            { key: 'asia-china', label: 'Du lịch Trung Quốc', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-a/trung-quoc') },
            { key: 'asia-cambodia', label: 'Du lịch Campuchia', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-a/campuchia') },
            { key: 'asia-taiwan', label: 'Du lịch Đài Loan', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-a/dai-loan') },
            { key: 'asia-korea', label: 'Du lịch Hàn Quốc', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-a/han-quoc') },
            // Thêm các mục còn lại trong nhóm Châu Á theo yêu cầu
          ],
        },
        {
          type: 'group',
          label: 'Châu Âu',
          children: [
            { key: 'europe-england', label: 'Du lịch Anh', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-au/anh') },
            { key: 'europe-europe', label: 'Du lịch Châu Âu', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-au/chau-au') },
            { key: 'europe-scotland', label: 'Du lịch Scotland', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-au/scotland') },
            { key: 'europe-turkey', label: 'Du lịch Thổ Nhĩ Kỳ', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-au/tho-nhi-ky') },
            // Thêm các mục khác trong nhóm Châu Âu nếu cần
          ],
        },
        {
          type: 'group',
          label: 'Châu Mỹ - Châu Úc - Châu Phi',
          children: [
            { key: 'america-usa', label: 'Du lịch Mỹ', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-my-chau-uc-chau-phi/my') },
            { key: 'australia', label: 'Du lịch Úc', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-my-chau-uc-chau-phi/uc') },
            { key: 'africa-southafrica', label: 'Du lịch Nam Phi', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-my-chau-uc-chau-phi/nam-phi') },
            { key: 'africa-egypt', label: 'Du lịch Ai Cập', onClick: () => handleMenuClick('/tours/nuoc-ngoai/chau-my-chau-uc-chau-phi/ai-cap') },
            // Thêm các mục khác trong nhóm này
          ],
        },
        {
          type: 'group',
          label: 'Chùm Tour',
          children: [
            { key: 'combo-tet-2025', label: 'Tour Tết 2025', onClick: () => handleMenuClick('/tours/chum-tour/tet-2025') },
            { key: 'combo-cruise', label: 'Tour Du thuyền', onClick: () => handleMenuClick('/tours/chum-tour/du-thuyen') },
            { key: 'combo-cherry-blossom', label: 'Tour Hoa Anh Đào', onClick: () => handleMenuClick('/tours/chum-tour/hoa-anh-dao') },
          ],
        },
      ],
    },
    {
      key: 'services',
      icon: <SettingOutlined />,
      label: 'Dịch vụ du lịch',
      children: [
        { key: 'service-1', label: 'Thuê xe', onClick: () => handleMenuClick('/dich-vu/thue-xe') },
        { key: 'service-2', label: 'Vé máy bay', onClick: () => handleMenuClick('/dich-vu/ve-may-bay') },
        { key: 'service-3', label: 'Bảo hiểm du lịch', onClick: () => handleMenuClick('/dich-vu/bao-hiem-du-lich') },
        { key: 'service-4', label: 'Coupon Du lịch', onClick: () => handleMenuClick('/dich-vu/coupon-du-lich') },
        { key: 'service-5', label: 'Dịch vụ Ủy thác Visa Nhật', onClick: () => handleMenuClick('/dich-vu/uy-thac-visa-nhat') },
        { key: 'service-6', label: 'Dịch vụ Free Easy', onClick: () => handleMenuClick('/dich-vu/free-easy') },
      ],
    },
    //...(isAdmin
      //? [
        {
          key: 'admin',
          icon: <UserOutlined />,
          label: 'Trang Admin',
          children: [
            { key: 'manage-users', label: 'Quản lý User', onClick: () => handleMenuClick('/admin/manage-users') },
            { key: 'manage-domestic-tours', label: 'Quản lý Tour Trong Nước', onClick: () => handleMenuClick('/admin/domestic-tours') },
            { key: 'manage-international-tours', label: 'Quản lý Tour Nước Ngoài', onClick: () => handleMenuClick('/admin/international-tours') },
            { key: 'tour-stats', label: 'Thống Kê Tour', onClick: () => handleMenuClick('/admin/tour-stats') },
            { key: 'payment-management', label: 'Quản lý Thanh Toán', onClick: () => handleMenuClick('/admin/payment-management') },
            { key: 'home-board-management', label: 'Quản lý Bảng Tin Trang Chủ', onClick: () => handleMenuClick('/admin/home-board-management') },
            { key: 'manager-tour', label: 'Quản lý Tour Slider', onClick: () => handleMenuClick('/admin/img-slider') },
          ],
        },
    {
      key: 'contact',
      icon: <PhoneOutlined />,
      label: 'Liên hệ',
      onClick: () => handleMenuClick('/contact'),
    },
        ];
      ///: []),
  //];

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
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
