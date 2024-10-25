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
  const [selectedUser, setSelectedUser] = useState<any>(null);
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
    <div className="content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh', padding: '40px' }}>
      <div className="user-container" style={{ width: '1000%', maxWidth: '1200px', padding: '70px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Card title="Quản lý người dùng" className="admin-user-card">
          <Row gutter={16} className="admin-buttons">
            <Col className="admin-search-col">
              <SearchInput
                label=""
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

          <Row gutter={16} className="admin-filter-row" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Col span={8} className="admin-filter-col" style={{ marginRight: '20px' }}>
              <Dropdown
                label="Lọc theo trạng thái"
                options={['Tất cả', 'Hoạt động', 'Đóng băng']}
                defaultValue="Tất cả"
                onChange={handleStatusChange}
              />
            </Col>
            <Col span={8} className="admin-filter-col">
              <Dropdown
                label="Lọc theo vai trò"
                options={['Tất cả', 'Admin', 'User']}
                defaultValue="Tất cả"
                onChange={handleRoleChange}
              />
            </Col>
          </Row>

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
