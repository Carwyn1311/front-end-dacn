// Profile.tsx
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, message, Spin } from "antd";
import axios from "axios";
import "./Profile.css";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm();

  const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) {
      message.error("Bạn chưa đăng nhập!");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/user/${id}", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        form.setFieldsValue(response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          message.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        } else {
          message.error("Không thể tải thông tin người dùng!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [token, form]);

  const handleSave = async (values: any) => {
    if (!token) {
      message.error("Bạn chưa đăng nhập!");
      return;
    }

    try {
      const response = await axios.put("/api/update", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Cập nhật thông tin thành công!");
      setUser({ ...user, ...values });
      setIsEditing(false);
    } catch (error: any) {
      message.error("Cập nhật thông tin thất bại!");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card className="profile-card">
      <h2>Thông tin cá nhân</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          fullname: user?.fullname,
          username: user?.username,
          email: user?.email,
          phone: user?.phone,
          address: user?.address,
        }}
      >
        <Form.Item
          name="fullname"
          label="Họ và tên"
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item
          name="username"
          label="Tên người dùng"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
        >
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ">
          <Input.TextArea disabled={!isEditing} />
        </Form.Item>

        {isEditing ? (
          <div className="form-actions">
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setIsEditing(false);
                form.resetFields();
              }}
            >
              Hủy
            </Button>
          </div>
        ) : (
          <Button type="primary" onClick={() => setIsEditing(true)}>
            Chỉnh sửa thông tin
          </Button>
        )}
      </Form>
    </Card>
  );
};

export default Profile;
