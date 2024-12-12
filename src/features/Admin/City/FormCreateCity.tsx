import React from 'react';
import { 
  Drawer, 
  Form, 
  Input, 
  Button, 
  message 
} from 'antd';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import '../css/FormCreateCity.css';

interface FormCreateCityProps {
  onClose: () => void;
  onSuccess: () => void;
}

const FormCreateCity: React.FC<FormCreateCityProps> = ({ 
  onClose, 
  onSuccess 
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      await axiosInstance.post('/api/city/create', values);
      message.success('Tạo thành phố thành công');
      onSuccess();
      onClose();
    } catch (error) {
      message.error('Lỗi khi tạo thành phố');
    }
  };

  return (
    <Drawer
      title="Thêm Thành Phố Mới"
      placement="right"
      onClose={onClose}
      open={true}
      className="citylist-create-drawer"
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleSubmit}
        className="citylist-create-form"
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
        <Button 
            type="primary" 
            htmlType="submit"
            className="citylist-create-submit-btn"
          >
            Tạo Thành Phố
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FormCreateCity;