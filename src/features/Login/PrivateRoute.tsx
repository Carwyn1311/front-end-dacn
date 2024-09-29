import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = (): JSX.Element => {
  const token = localStorage.getItem('token');
  return (token != null) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
