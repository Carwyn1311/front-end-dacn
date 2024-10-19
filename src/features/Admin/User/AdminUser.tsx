import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminUser.css';
import { Card, Select, Row, Col, Input, List, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Button from '../../../components/Button/Button';

const { Option } = Select;
const { Search } = Input;

const userData = [
  { id: 1, name: 'User1', role: 'Admin', status: 'Hoạt động' },
  { id: 2, name: 'User2', role: 'User', status: 'Đóng băng' },
  { id: 3, name: 'User3', role: 'User', status: 'Hoạt động' },
];

const AdminUser: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [users, setUsers] = useState(userData);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    const filteredUsers = userData.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filteredUsers);
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

  return (
    <div className="main-content">
      <div className="user-container">
        <Card title="Quản lý người dùng" className="admin-user-card">
          
          {/* Tìm kiếm người dùng và thêm người dùng */}
          <Row gutter={16} className="admin-buttons">
            <Col className="admin-search-col">
              <Search
                className="admin-search"
                placeholder="Tìm kiếm người dùng"
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                allowClear
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

          {/* Chọn trạng thái người dùng */}
          <Row gutter={16} className="admin-status-row">
            <Select className="admin-status-select" defaultValue="all">
              <Option value="all">Tất cả</Option>
              <Option value="active">Hoạt động</Option>
              <Option value="frozen">Đóng băng</Option>
            </Select>
            <Button className="admin-save-status-button" type="primary">Lưu trạng thái</Button>
          </Row>

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