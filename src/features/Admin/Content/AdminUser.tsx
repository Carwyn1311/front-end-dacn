import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Modal, message, Button, Input, Form, Select } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import '../css/AdminUser.css';

const { Option } = Select;

interface User {
  id: number;
  fullname: string | null;
  username: string;
  email: string;
  address: string | null;
  phone: string | null;
  roles: { id: number; name: string }[];
}

interface Role {
  id: number;
  name: string;
}

const AdminUser: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewUserModalOpen, setIsViewUserModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [form] = Form.useForm();
  const token = localStorage.getItem('jwtToken');
  const successMessageShownRef = useRef(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/list-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      if (!successMessageShownRef.current) {
        message.success('Tải danh sách người dùng thành công');
        successMessageShownRef.current = true;
      }
    } catch (error) {
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get('/api/roles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoles(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách vai trò');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleRoleChange = async (userId: number, roleId: number) => {
    try {
      const roleToUpdate = roles.find(role => role.id === roleId);
      if (!roleToUpdate) return;

      const rolesToUpdate = [roleToUpdate];
      await axiosInstance.put(`/api/${userId}/roles`, rolesToUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success('Cập nhật vai trò thành công');
      setUsers(users.map(user => user.id === userId ? { ...user, roles: rolesToUpdate } : user));
    } catch (error: any) {
      if (error instanceof Error) {
        message.error('Lỗi khi cập nhật vai trò người dùng: ' + error.message);
      } else {
        message.error('Lỗi không xác định khi cập nhật vai trò người dùng');
      }
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewUserModalOpen(true);
    form.setFieldsValue(user);
  };

  const handleAddUser = () => {
    setIsCreateUserModalOpen(true);
  };

  const handleUpdateUser = async (values: any) => {
    if (!selectedUser) return;

    try {
        const response = await axiosInstance.put(`/api/update-user/${selectedUser.username}`, values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        message.success('Cập nhật người dùng thành công');
        setUsers(users.map(user => (user.id === selectedUser.id ? { ...selectedUser, ...values } : user)));
        setIsViewUserModalOpen(false);
    } catch (error: any) {
        message.error('Lỗi khi cập nhật người dùng: ' + (error as Error).message);
    }
};


  const columns = [
    {
      title: 'Tên Đăng Nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    { title: 'Vai Trò', 
      dataIndex: 'roles', 
      key: 'roles', 
      render: (roles: { id: number; name: string }[], record: User) => ( 
        roles.map(role => role.name).join(', ') ), 
      },
    {
      title: 'Hành Động',
      key: 'action',
      render: (text: any, record: User) => (
        <span>
          <Button icon={<EyeOutlined />} onClick={() => handleViewUser(record)}>Xem</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="admin-user-content">
      <div className="user-container">
        <Card title="Quản lý người dùng" className="admin-user-card">
          <div className="admin-user-actions">
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>Thêm Người Dùng</Button>
            <Input
              placeholder="Tìm kiếm người dùng"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="admin-user-search"
            />
          </div>
          <Table
            columns={columns}
            dataSource={users}
            loading={loading}
            rowKey="id"
            className='userlist-table'
          />
        </Card>
      </div>

      <Modal
        title="Thông Tin Người Dùng"
        visible={isViewUserModalOpen && selectedUser !== null}
        onCancel={() => setIsViewUserModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateUser}
        >
          <Form.Item name="fullname" label="Họ Tên">
            <Input />
          </Form.Item>
          <Form.Item name="username" label="Tên Đăng Nhập">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa Chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số Điện Thoại">
            <Input />
          </Form.Item>
          {/* Add any other fields you need here */}
          <Form.Item>
            <Button type="primary" htmlType="submit">Cập Nhật Thông Tin</Button>
          </Form.Item>
        </Form>
        <Form
          layout="vertical"
          style={{ marginTop: '20px' }}
        >
          <Form.Item name="roles" label="Vai Trò">
            <Select
              placeholder="Chọn vai trò"
              style={{ width: '100%' }}
              value={selectedUser ? selectedUser.roles[0]?.id : undefined}
              onChange={(value) => handleRoleChange(selectedUser!.id, value)}
            >
              {roles.map(role => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Tạo Người Dùng Mới"
        visible={isCreateUserModalOpen}
        onCancel={() => setIsCreateUserModalOpen(false)}
        footer={null}
      >
        {/* Render CreateUserForm here */}
      </Modal>
    </div>
  );
};

export default AdminUser;

