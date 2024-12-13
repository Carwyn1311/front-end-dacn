import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, message, Select } from 'antd';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import '../css/FormCreateCity.css';

interface FormCreateCityProps {
  onClose: () => void;
  onSuccess: () => void;
}

const FormCreateCity: React.FC<FormCreateCityProps> = ({ onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    // Fetch the list of provinces from the API
    const fetchProvinces = async () => {
      try {
        const response = await axiosInstance.get('/api/province/list');
        setProvinces(response.data);
      } catch (error) {
        message.error('Lỗi khi tải danh sách tỉnh');
      }
    };

    fetchProvinces();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      // Tạo đối tượng dữ liệu như yêu cầu
      const data = {
        name: values.name,
        province: {
          id: values.provinceId
        }
      };
      
      await axiosInstance.post('/api/city/create', data);
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
          <Input placeholder="Nhập tên thành phố" className="citylist-create-form-label"/>
        </Form.Item>

        <Form.Item
          name="provinceId"
          label="Tỉnh"
          rules={[{ 
            required: true, 
            message: 'Vui lòng chọn tỉnh' 
          }]}
        >
          <Select placeholder="Chọn tỉnh">
            {provinces.map((province: any) => (
              <Select.Option key={province.id} value={province.id}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
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
