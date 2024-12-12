import React, { useEffect } from 'react';
import { 
  Drawer, 
  Form, 
  Input, 
  Button, 
  message 
} from 'antd';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import '../css/FormUpdateCity.css';

interface City {
  id: number;
  name: string;
  province: number;
}

interface FormUpdateCityProps {
  city: City;
  onClose: () => void;
  onSuccess: () => void;
}

const FormUpdateCity: React.FC<FormUpdateCityProps> = ({ 
  city, 
  onClose, 
  onSuccess 
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(city);
  }, [city, form]);

  const handleSubmit = async (values: any) => {
    try {
      await axiosInstance.put(`/api/city/${city.id}`, values);
      message.success('Cập nhật thành phố thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi cập nhật thành phố');
    }
  };

  return (
    <Drawer
      title="Chỉnh Sửa Thành Phố"
      placement="right"
      onClose={onClose}
      open={true}
      className="citylist-update-drawer"
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit}
         className="citylist-update-form"
      >
        <Form.Item
          name="name"
          label="Tên Thành Phố"
          rules={[{ 
            required: true, 
            message: 'Vui lòng nhập tên thành phố' 
          }]}
        >
          <Input placeholder="Nhập tên thành phố" />
        </Form.Item>

        <Form.Item
          name="province"
          label="Mã Tỉnh"
          rules={[{ 
            required: true, 
            message: 'Vui lòng nhập mã tỉnh' 
          }]}
        >
          <Input type="number" placeholder="Nhập mã tỉnh" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="citylist-update-submit-btn">
            Cập Nhật Thành Phố
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FormUpdateCity;