import React from 'react';
import { 
  Drawer, 
  Descriptions 
} from 'antd';
import '../css/FormViewCity.css';

interface City {
  id: number;
  name: string;
  province: number;
}

interface FormViewCityProps {
  city: City;
  onClose: () => void;
}

const FormViewCity: React.FC<FormViewCityProps> = ({ 
  city, 
  onClose 
}) => {
  return (
    <Drawer
      title="Chi Tiết Thành Phố"
      placement="right"
      onClose={onClose}
      open={true}
      className="citylist-view-drawer"
    >
      <Descriptions bordered column={1} className="citylist-view-details">
        <Descriptions.Item label="ID">
          {city.id}
        </Descriptions.Item>
        <Descriptions.Item label="Tên Thành Phố">
          {city.name}
        </Descriptions.Item>
        <Descriptions.Item label="Mã Tỉnh">
          {city.province}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default FormViewCity;