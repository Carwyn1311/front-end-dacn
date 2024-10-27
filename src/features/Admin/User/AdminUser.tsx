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
  const [analyticsData, setAnalyticsData] = useState<any | null>(null);
  const successMessageShownRef = useRef(false);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await fetch('https://chat-api-backend-x4dl.onrender.com/api/conversations/analytics');
        if (!response.ok) throw new Error('Không thể tải dữ liệu phân tích');

        const analytics = await response.json();
        setAnalyticsData(analytics);

        if (!successMessageShownRef.current) {
          message.success('Tải dữ liệu phân tích thành công');
          successMessageShownRef.current = true;
        }
      } catch (error) {
        console.error('Error loading analytics:', error);
        message.error('Lỗi khi tải dữ liệu: ' + (error as Error).message);
      }
    };

    loadAnalytics();
  }, []);

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
            
          <h3>Phân tích tổng thể</h3>
          {analyticsData ? (
            <div className="analytics-display">
              <p>Tổng số câu hỏi đã xử lý: {analyticsData.totalProcessedResponses}</p>
              <p>Thời gian phản hồi trung bình: {analyticsData.averageResponseTime.toFixed(2)} ms</p>
              <p>Tổng số người dùng duy nhất: {analyticsData.totalUniqueUsers}</p>
            </div>
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
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
