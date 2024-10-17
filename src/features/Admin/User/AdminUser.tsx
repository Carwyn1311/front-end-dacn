import React, { useState } from 'react';
import './AdminUser.css';
import { Card, Select, Row, Col, Input, Button, List, Checkbox, Modal } from 'antd';
import { PlusOutlined, ImportOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;

// Giả lập dữ liệu người dùng
const userData = [
  { id: 1, name: 'User1', role: 'Admin', status: 'Hoạt động' },
  { id: 2, name: 'User2', role: 'User', status: 'Đóng băng' },
  { id: 3, name: 'User3', role: 'User', status: 'Hoạt động' },
];

const AdminUser: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [users, setUsers] = useState(userData); // Quản lý danh sách người dùng
  const [selectedUser, setSelectedUser] = useState<any>(null); // Quản lý người dùng được chọn

  // Thay đổi sự kiện tìm kiếm
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    const filteredUsers = userData.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  // Thêm người dùng
  const handleAddUser = () => {
    const newUser = { id: users.length + 1, name: 'New User', role: 'User', status: 'Hoạt động' };
    setUsers([...users, newUser]);
  };

  // Sửa người dùng
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    Modal.info({
      title: 'Chỉnh sửa người dùng',
      content: `Chỉnh sửa thông tin của ${user.name}`,
      onOk: () => setSelectedUser(null),
    });
  };

  // Xóa người dùng
  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Đóng băng người dùng
  const handleFreezeUser = (user: any) => {
    const updatedUsers = users.map(u => (u.id === user.id ? { ...u, status: 'Đóng băng' } : u));
    setUsers(updatedUsers);
  };

  return (
    <div className="main-content" style={{ padding: '20px', backgroundColor: '#f0f2f5', height: '100vh' }}>
      <div className="user-container">
        <Card title="Quản lý người dùng" className="admin-user-card" style={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
          
          {/* Tìm kiếm người dùng */}
          <Row gutter={16} className="admin-buttons" style={{ marginBottom: '20px' }}>
            <Col span={16}>
              <Search
                placeholder="Tìm kiếm người dùng"
                value={searchValue}
                onChange={e => handleSearchChange(e.target.value)}
                prefix={<SearchOutlined />}
                allowClear
                enterButton
              />
            </Col>
            <Col>
              <Button
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
            dataSource={users}
            renderItem={user => (
              <List.Item
                actions={[
                  <Button icon={<EditOutlined />} onClick={() => handleEditUser(user)}>Sửa</Button>,
                  <Button icon={<DeleteOutlined />} onClick={() => handleDeleteUser(user.id)} danger>Xóa</Button>,
                  <Button onClick={() => handleFreezeUser(user)}>Đóng băng</Button>,
                ]}
              >
                <List.Item.Meta
                  title={user.name}
                  description={`Role: ${user.role} | Trạng thái: ${user.status}`}
                />
              </List.Item>
            )}
          />

          {/* Chọn trạng thái người dùng */}
          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col span={6}>
              <Select defaultValue="Hoạt động" style={{ width: '100%' }}>
                <Option value="active">Hoạt động</Option>
                <Option value="frozen">Đóng băng</Option>
              </Select>
            </Col>

            <Col span={6}>
              <Button type="primary">Lưu trạng thái</Button>
            </Col>
          </Row>

          {/* Giao diện chat với nhân viên hỗ trợ */}
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <Button type="primary" style={{ width: '100%' }}>
                Chat với nhân viên hỗ trợ
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default AdminUser;
