import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminUser from './AdminUser';
import AdminTourManagement from './AdminTourManagement';
const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin/manage-users" element={<AdminUser />} />
      <Route path="/admin/tour-slider" element={<AdminTourManagement />} />
    </Routes>
  );
};

export default AdminRoutes;
