import React, { useState } from 'react';
import { Form, Input, Button, Select, Switch, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './CreateUserForm.css';
import { User } from '../User/Content/User';
import { TokenAuthService } from '../TokenAuthService/TokenAuthService';

const { Option } = Select;

interface CreateUserFormProps {
  onUserCreated: (user: User) => void; 
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onUserCreated }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    // Tạo đối tượng người dùng mới với role là "ADMIN" hoặc "USER" tùy chọn
    const newUser = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: values.role,  // Giữ nguyên giá trị "ADMIN" hoặc "USER"
      active: values.active,
    };

    try {
      // Lấy token từ TokenAuthService
      const token = TokenAuthService.getToken() || TokenAuthService.getSessionData('token');
      
      // Kiểm tra token và payload
      console.log("Token:", token);
      console.log("Payload:", JSON.stringify(newUser));

      if (!token) {
        message.error('Bạn cần đăng nhập để thực hiện tác vụ này.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Đính kèm token trong header
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        message.success('Tạo người dùng thành công');
        const createdUser = await response.json();
        onUserCreated(createdUser);
      } else {
        // Nếu phản hồi từ máy chủ không thành công
        const errorData = await response.json(); // In chi tiết lỗi từ API nếu có
        console.error("Error response:", errorData);
        message.error(`Tạo người dùng thất bại: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      // Nếu `fetch` gặp lỗi
      console.error("Fetch error:", error);
      if (error instanceof Error) {
        message.error(`Lỗi: ${error.message}`);
      } else {
        message.error('Đã xảy ra lỗi');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user-form">
      <h2 className="form-title">Tạo người dùng mới</h2>
      <Form layout="vertical" onFinish={onFinish} initialValues={{ role: 'USER', active: true }}>
        
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input placeholder="Nhập tên đăng nhập" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Vui lòng nhập email hợp lệ!', type: 'email' }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            visibilityToggle={true}
          />
        </Form.Item>

        {/* Form.Item cho Vai trò */}
        <Form.Item
          label="Vai trò"
          name="role"  // Đặt tên cho Form.Item để lấy giá trị từ Select
          rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
        >
          <Select placeholder="Chọn vai trò"> {/* Thêm placeholder cho Select */}
            <Option value="USER">Người dùng</Option>
            <Option value="ADMIN">Quản trị viên</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Kích hoạt" name="active" valuePropName="checked" className="short-switch">
          <Switch defaultChecked /> {/* Không disable, mặc định true */}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Tạo người dùng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUserForm;
