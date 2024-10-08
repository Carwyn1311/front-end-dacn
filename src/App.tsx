import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AdminUser from './features/Admin/User/AdminUser';
import Login from './features/Login/Content/Login';
import Sidebar from './features/Sidebar/Content/Sidebar';
import MainContent from './features/Maincontent/MainContent';
import Titlebar from './features/Titlebar/Content/Titlebar';
import PrivateRoute from './features/PrivateRoute/PrivateRoute';
import LogoutButton from './features/Logout/Content/LogoutButton';
import Dashboard from './features/Dashboard/Content/Dashboard';
import Manageprojects from './features/ProjectManager/Content/Manageprojects';
import { TokenAuthService } from './features/TokenAuthService/TokenAuthService';
import CreateAccount from './features/CreateAccount/Content/CreateAccount'; // Import Create Account

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const [isSidebarVisible] = useState<boolean>(true);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/create-account'; // Kiểm tra cả trang đăng nhập và tạo tài khoản

  return (
    <div className={`app-container ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
      {/* Hiển thị Sidebar và các thành phần khác khi không phải trang Auth */}
      {!isAuthPage && TokenAuthService.getToken() && (
        <div className="sidebar-container">
          <Sidebar userName={''} email={''} />
        </div>
      )}
      <div className="content-container">
        {!isAuthPage && TokenAuthService.getToken() && (
          <>
            <header className="app-header">
              <h1>Timesheet Application</h1>
              <LogoutButton />
            </header>
            <Titlebar />
          </>
        )}
        <div className="main-content">
          <Routes>
            {/* Định nghĩa Route cho trang Login và Create Account */}
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />

            {/* Định nghĩa Route cho các trang yêu cầu xác thực */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <AdminUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/roles"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <Manageprojects />
                </PrivateRoute>
              }
            />
            <Route
              path="/timesheets"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/working-time"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-timesheet"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-requests"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-working-times"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-working"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-supervised"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-todo"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-messages"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-documents"
              element={
                <PrivateRoute>
                  <MainContent page={''} />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
