import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContent from '../features/Maincontent/Content/MainContent';
import Login from '../features/Login/Content/Login';
import CreateAccount from '../features/CreateAccount/Content/CreateAccount';
import ForgotPassword from '../features/ForgotPassword/Content/ForgotPassword';
import AdminRoutes from '../features/Admin/Content/AdminRoutes';
import AdminUser from '../features/Admin/Content/AdminUser';
import AdminTourManagement from '../features/Admin/Content/AdminTourManagement';
import DestinationList from '../features/Admin/Destination/DestinationList';
import TourDetail from '../features/Admin/Content/TourDetail';
import CityList from '../features/Admin/City/CityList';
import ProvinceList from '../features/Admin/Content/ProvinceList';
import TravelPageDongBac from '../features/AllTours/Tours/TravelPageDongBac';
import TravelPageHaNoi from '../features/AllTours/Tours/TravelPageHaNoi';
import TravelPageSapa from '../features/AllTours/Tours/TravelPageSapa';
import TravelPageHaLong from '../features/AllTours/Tours/TravelPageHaLong';

const RoutesComponent: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {

  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/admin/manage-users" element={<AdminUser />} />
      <Route path="/admin/img-slider" element={<AdminTourManagement />} />
      <Route path="/admin/tour-list" element={<DestinationList />} />
      <Route path="/admin/tour-list/tour/:id" element={<TourDetail />} />
      <Route path="/admin/city-list" element={<CityList />} />
      <Route path="/admin/province-list" element={<ProvinceList />} />
      <Route path="/travel/dongbac-taybac" element={<TravelPageDongBac />} />
      <Route path="/travel/mien-bac/ha-noi" element={<TravelPageHaNoi />} />
      <Route path="/travel/mien-bac/ha-long" element={<TravelPageHaLong />} />
      <Route path="/travel/mien-bac/sapa" element={<TravelPageSapa />} />
    </Routes>
  );
};

export default RoutesComponent;
