import React from 'react';
import { TourProvider } from '../../TourSlider/Content/TourContext';
import TourManager from '../../TourSlider/Content/TourManager';
import TourSlider from '../../TourSlider/Content/TourSlider';

const AdminTourManagement: React.FC = () => {
  return (
    <TourProvider>
      <div className="admin-tour-management">
        <h1>Quản Lý Tour</h1>

        {/* Quản lý tour: thêm, xóa */}
        <TourManager />

        {/* Hiển thị slider để xem trước */}
        <div className="preview-section">
          <h2>Xem trước tour</h2>
          <TourSlider itemsPerView={3} interval={5000} />
        </div>
      </div>
    </TourProvider>
  );
};

export default AdminTourManagement;
