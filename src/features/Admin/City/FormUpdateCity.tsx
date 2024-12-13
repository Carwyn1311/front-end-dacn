import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, message, Select } from 'antd';
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

const FormUpdateCity: React.FC<FormUpdateCityProps> = ({ city, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    form.setFieldsValue({
      ...city,
      province: city.province.toString() // Chuyển đổi province ID sang chuỗi để hợp với Select
    });
    
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
  }, [city, form]);

  const handleSubmit = async (values: any) => {
    try {
      const data = {
        ...values,
        province: {
          id: values.province
        }
      };
      
      await axiosInstance.put(`/api/city/${city.id}`, data);
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
          label="Tỉnh"
          rules={[{ 
            required: true, 
            message: 'Vui lòng chọn tỉnh' 
          }]}
        >
          <Select placeholder="Chọn tỉnh">
            {provinces.map((province: any) => (
              <Select.Option key={province.id} value={province.id.toString()}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
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
