import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Button from '../../../components/Button/Button';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '../../../components/Dropdown/Dropdown';
import CreateUserForm from '../../CreateUserForm/CreateUserForm';
import '../.css/AdminUser.css';
import Analytics from '../../LoadAnalytics/Analytics';

const AdminUser: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('Tất cả');
  const [roleFilter, setRoleFilter] = useState<string>('Tất cả');
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const token = localStorage.getItem('jwtToken'); // Giả định token đã được lưu sau khi đăng nhập
  const successMessageShownRef = useRef(false);

  useEffect(() => {
    loadUsers();
  }, []);

  // Hàm tải danh sách người dùng từ API
  const loadUsers = async () => {
    try {
      const response = await fetch('https://chat-api-backend-56ja.onrender.com/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Thêm JWT token vào tiêu đề Authorization
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể tải danh sách người dùng');
      }

      const usersData = await response.json();
      setUsers(usersData);
      message.success('Tải danh sách người dùng thành công');
    } catch (error) {
      console.error('Error loading users:', error);
      message.error('Lỗi khi tải danh sách người dùng: ' + (error as Error).message);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    filterUsers(value, statusFilter, roleFilter);
  };

  const handleAddUser = () => {
    setIsCreateUserModalOpen(true); 
  };

  const handleUserCreated = async (newUser: any) => {
    try {
      const response = await fetch('https://chat-api-backend-56ja.onrender.com/admin/users/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error('Không thể tạo người dùng mới');

      const createdUser = await response.json();
      message.success('Tạo người dùng thành công');
      setUsers([...users, createdUser]); 
      setIsCreateUserModalOpen(false); 
    } catch (error) {
      console.error('Error creating user:', error);
      message.error('Lỗi khi tạo người dùng: ' + (error as Error).message);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await fetch(`https://chat-api-backend-56ja.onrender.com/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      message.success('Xóa người dùng thành công');
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Lỗi khi xóa người dùng: ' + (error as Error).message);
    }
  };

  const filterUsers = (searchValue: string, status: string, role: string) => {
    // Chức năng lọc người dùng theo searchValue, status, và role
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    filterUsers(searchValue, status, roleFilter);
  };

  const handleRoleChange = (role: string) => {
    setRoleFilter(role);
    filterUsers(searchValue, statusFilter, role);
  };

  return (
    <div className="admin-user-content">
      <div className="user-container">
        <Card title="Quản lý người dùng" className="admin-user-card">
          
        </Card>
      </div>
    </div>
  );
};

export default AdminUser;
