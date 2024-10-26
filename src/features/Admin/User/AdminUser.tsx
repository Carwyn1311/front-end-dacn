
import '../.css/AdminUser.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, List, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Button from '../../../components/Button/Button';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '../../../components/Dropdown/Dropdown';
import CreateUserForm from '../../CreateUserForm/CreateUserForm';


const userData = [
  { id: 1, name: 'User1', role: 'Admin', status: 'Hoạt động' },
];

const AdminUser: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [users, setUsers] = useState(userData);
  const [statusFilter, setStatusFilter] = useState<string>('Tất cả');
  const [roleFilter, setRoleFilter] = useState<string>('Tất cả');
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    filterUsers(value, statusFilter, roleFilter);
  };

  const handleAddUser = () => {
    setIsCreateUserModalOpen(true); 
  };

  const handleUserCreated = (newUser: any) => {
    message.success('User added successfully');
    setUsers([...users, newUser]); 
    setIsCreateUserModalOpen(false); 
  };

  const handleEditUser = (user: any) => {
    Modal.info({
      title: 'Chỉnh sửa người dùng',
      content: `Chỉnh sửa thông tin của ${user.name}`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const filterUsers = (searchValue: string, status: string, role: string) => {
    // Chức năng lọc người dùng
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
    <div className="main-content">
      <div className="user-container">
        <Card title="Quản lý người dùng" className="admin-user-card">
          <div className="admin-header">
            <SearchInput
              label="Tìm kiếm theo tên khách hàng hoặc dự án"
              value={searchValue}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder=" "
              prefixIcon={<FaSearch />}
              fullWidth={true}
            />
            <Button
              className="admin-button"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddUser}
            >
              Thêm người dùng
            </Button>
          </div>

          <div className="admin-filter-row">
            <Dropdown
              label="Lọc theo trạng thái"
              options={['Tất cả', 'Hoạt động', 'Đóng băng']}
              defaultValue="Tất cả"
              onChange={handleStatusChange}
            />
            <Dropdown
              label="Lọc theo vai trò"
              options={['Tất cả', 'Admin', 'User']}
              defaultValue="Tất cả"
              onChange={handleRoleChange}
            />
          </div>

          <List
            className="admin-user-list"
            dataSource={users}
            renderItem={user => (
              <List.Item
                className="admin-user-list-item"
                actions={[
                  <Button icon={<EditOutlined />} className="admin-button admin-edit-button" onClick={() => handleEditUser(user)}>Sửa</Button>,
                  <Button icon={<DeleteOutlined />} className="admin-button admin-delete-button" onClick={() => handleDeleteUser(user.id)}>Xóa</Button>,
                ]}
              >
                <List.Item.Meta
                  title={user.name}
                  description={`Role: ${user.role} | Trạng thái: ${user.status}`}
                />
              </List.Item>
            )}
          />

          <Modal
            title="Create New User"
            visible={isCreateUserModalOpen}
            footer={null}
            onCancel={() => setIsCreateUserModalOpen(false)}
          >
            <CreateUserForm onUserCreated={handleUserCreated} />
          </Modal>
        </Card>
      </div>
    </div>
  );
};

export default AdminUser;
