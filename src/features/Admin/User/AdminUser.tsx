import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, List, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Button from '../../../components/Button/Button';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '../../../components/Dropdown/Dropdown';
<<<<<<< HEAD
import CreateUserForm from '../../CreateUserForm/CreateUserForm';
=======
>>>>>>> 7e22e0561df075971105dfd7bcba3082d10f4a7a

const userData = [
  { id: 1, name: 'User1', role: 'Admin', status: 'Hoạt động' },
  // Add other users...
];

const AdminUser: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [users, setUsers] = useState(userData);
  const [statusFilter, setStatusFilter] = useState<string>('Tất cả');
  const [roleFilter, setRoleFilter] = useState<string>('Tất cả');
<<<<<<< HEAD
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
=======
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedUser, setSelectedUser] = useState<any>(null);
>>>>>>> 7e22e0561df075971105dfd7bcba3082d10f4a7a

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    filterUsers(value, statusFilter, roleFilter);
  };

  const handleAddUser = () => {
    setIsCreateUserModalOpen(true); // Open the modal
  };

  const handleUserCreated = (newUser: any) => {
    message.success('User added successfully');
    setUsers([...users, newUser]); // Update user list
    setIsCreateUserModalOpen(false); // Close modal
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
    // Filter logic
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
    <div className="content">
      <div className="user-container">
        <Card title="Quản lý người dùng" className="admin-user-card">
          <Row gutter={16} className="admin-buttons">
            <Col className="admin-search-col">
              <SearchInput
                label="Search by client or project name"
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                prefixIcon={<FaSearch />}
              />
            </Col>
            <Col className="admin-add-user-col">
              <Button
                className="admin-add-user-button"
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddUser}
              >
                Thêm người dùng
              </Button>
            </Col>
          </Row>

<<<<<<< HEAD
          {/* Filter Dropdowns */}
=======
>>>>>>> 7e22e0561df075971105dfd7bcba3082d10f4a7a
          <Row gutter={16} className="admin-filter-row">
            <Col span={8}>
              <Dropdown
                label="Lọc theo trạng thái"
                options={['Tất cả', 'Hoạt động', 'Đóng băng']}
                defaultValue="Tất cả"
                onChange={handleStatusChange}
              />
            </Col>
            <Col span={8}>
              <Dropdown
                label="Lọc theo vai trò"
                options={['Tất cả', 'Admin', 'User']}
                defaultValue="Tất cả"
                onChange={handleRoleChange}
              />
            </Col>
          </Row>

          {/* User List */}
          <List
            className="admin-user-list"
            dataSource={users}
            renderItem={user => (
              <List.Item
                className="admin-user-list-item"
                actions={[
                  <Button icon={<EditOutlined />} onClick={() => handleEditUser(user)}>Sửa</Button>,
                  <Button icon={<DeleteOutlined />} onClick={() => handleDeleteUser(user.id)}>Xóa</Button>,
                ]}
              >
                <List.Item.Meta
                  title={user.name}
                  description={`Role: ${user.role} | Trạng thái: ${user.status}`}
                />
              </List.Item>
            )}
          />

<<<<<<< HEAD
          {/* Create User Modal */}
          <Modal
            title="Create New User"
            visible={isCreateUserModalOpen}
            footer={null}
            onCancel={() => setIsCreateUserModalOpen(false)}
          >
            <CreateUserForm onUserCreated={handleUserCreated} />
          </Modal>
=======
          <Row className="admin-chat-row">
            <Button 
              className="admin-chat-button"
              type="primary" 
              onClick={() => navigate('/chat')}
            >
              Chat với người dùng
            </Button>
          </Row>
>>>>>>> 7e22e0561df075971105dfd7bcba3082d10f4a7a
        </Card>
      </div>
    </div>
  );
};

export default AdminUser;
