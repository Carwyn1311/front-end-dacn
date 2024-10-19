import React from 'react';
import { Navigate } from 'react-router-dom';
import { TokenAuthService } from '../TokenAuthService/TokenAuthService';

interface PrivateRouteProps {
  children: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = TokenAuthService.getToken();

  if ((isAuthenticated == null) || isAuthenticated === '') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
