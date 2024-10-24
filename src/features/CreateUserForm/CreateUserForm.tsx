import React, { useState } from 'react';
import { Form, Input, Button, Select, Switch, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'; // Import icons để hiển thị và ẩn mật khẩu
import './CreateUserForm.css'; // Import file CSS
import { User } from '../User/Content/User';

const { Option } = Select;

interface CreateUserFormProps {
  onUserCreated: (user: User) => void; // Callback để báo cáo khi người dùng mới được tạo
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onUserCreated }) => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Thêm trạng thái để quản lý hiển thị mật khẩu

  const onFinish = async (values: any) => {
    setLoading(true);

    // Tạo đối tượng người dùng mới từ các giá trị trong form
    const newUser = new User({
      username: values.username,
      email: values.email,
      password: values.password,
      role: parseInt(values.role), // Chuyển đổi string thành number
      active: values.active,
    });

    try {
      const response = await fetch('https://your-api-endpoint.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${User.getToken()}`, // Giả sử cần token để xác thực
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        message.success('Tạo người dùng thành công');
        const createdUser = await response.json();
        onUserCreated(createdUser);
      } else {
        message.error('Tạo người dùng thất bại');
      }
    } catch (error: unknown) {
      // Sửa lỗi 'error is of type unknown'
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
      <Form layout="vertical" onFinish={onFinish} initialValues={{ role: '0', active: true }}>
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
          {/* Sử dụng Input.Password với nút hiển thị/ẩn mật khẩu */}
          <Input.Password
            placeholder="Nhập mật khẩu"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            visibilityToggle={true}
          />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
        >
          <Select>
            <Option value="0">Người dùng</Option>
            <Option value="1">Quản trị viên</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Kích hoạt" name="active" valuePropName="checked" className="short-switch">
          <Switch defaultChecked />
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
