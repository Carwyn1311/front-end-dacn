import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../.css/AdminUser.css';
import { Card, Row, Col, List, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Button from '../../../components/Button/Button';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '../../../components/Dropdown/Dropdown'; // Import Dropdown component

const userData = [
  { id: 1, name: 'User1', role: 'Admin', status: 'Hoạt động' },
  { id: 2, name: 'User2', role: 'User', status: 'Đóng băng' },
  { id: 3, name: 'User3', role: 'User', status: 'Hoạt động' },
  { id: 4, name: 'User4', role: 'User', status: 'Hoạt động' },
  { id: 5, name: 'User5', role: 'Admin', status: 'Hoạt động' },
  { id: 6, name: 'User6', role: 'User', status: 'Đóng băng' },
  { id: 7, name: 'User7', role: 'User', status: 'Hoạt động' },
  { id: 8, name: 'User8', role: 'Admin', status: 'Hoạt động' },
];

const AdminUser: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [users, setUsers] = useState(userData);
  const [statusFilter, setStatusFilter] = useState<string>('Tất cả');
  const [roleFilter, setRoleFilter] = useState<string>('Tất cả');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    filterUsers(value, statusFilter, roleFilter);
  };

  const handleAddUser = () => {
    const newUser = { id: users.length + 1, name: 'New User', role: 'User', status: 'Hoạt động' };
    setUsers([...users, newUser]);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    Modal.info({
      title: 'Chỉnh sửa người dùng',
      content: `Chỉnh sửa thông tin của ${user.name}`,
      onOk: () => setSelectedUser(null),
    });
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleFreezeUser = (user: any) => {
    const updatedUsers = users.map(u => (u.id === user.id ? { ...u, status: 'Đóng băng' } : u));
    setUsers(updatedUsers);
  };

  const filterUsers = (searchValue: string, status: string, role: string) => {
    let filteredUsers = userData;

    if (status !== 'Tất cả') {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }

    if (role !== 'Tất cả') {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    if (searchValue) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setUsers(filteredUsers);
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
          <Row gutter={16} className="admin-buttons">
            <Col className="admin-search-col">
              <SearchInput
                className="admin-search"
                label="Search by client or project name"
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                placeholder=""
                prefixIcon={<FaSearch />}
                width="300px"
                height="35px"
                fullWidth={false}
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

          {/* Dropdown lọc trạng thái và vai trò */}
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

          {/* Danh sách người dùng */}
          <List
            className="admin-user-list"
            dataSource={users}
            renderItem={user => (
              <List.Item
                className="admin-user-list-item"
                actions={[
                  <Button className="admin-edit-user-button" icon={<EditOutlined />} onClick={() => handleEditUser(user)}>Sửa</Button>,
                  <Button className="admin-delete-user-button" icon={<DeleteOutlined />} onClick={() => handleDeleteUser(user.id)}>Xóa</Button>,
                  <Button className="admin-freeze-user-button" onClick={() => handleFreezeUser(user)}>Đóng băng</Button>,
                ]}
              >
                <List.Item.Meta
                  title={user.name}
                  description={(
                    <span>
                      Role: {user.role} | Trạng thái: {user.status}
                    </span>
                  )}
                />
              </List.Item>
            )}
          />

          {/* Giao diện chat với nhân viên hỗ trợ */}
          <Row className="admin-chat-row">
            <Button 
              className="admin-chat-button"
              type="primary" 
              onClick={() => navigate('/chat')}
            >
              Chat với nhân viên hỗ trợ
            </Button>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default AdminUser;
