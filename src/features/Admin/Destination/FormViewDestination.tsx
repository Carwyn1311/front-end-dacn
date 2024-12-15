import React from 'react';
import { 
  Drawer, 
  Descriptions, 
  Tag, 
  Image 
} from 'antd';


interface DestinationImage {
  id: number;
  image_url: string;
  destination_id: number;
}

interface Destination {
  id: number;
  name: string;
  description: string;
  location: string;
  type: 'DOMESTIC' | 'INTERNATIONAL';
  city: number;
  destinationImages: DestinationImage[];
}

interface FormViewDestinationProps {
  destination: Destination;
  onClose: () => void;
}

const baseUrl = process.env.REACT_APP_BASE_URL;

const FormViewDestination: React.FC<FormViewDestinationProps> = ({ 
  destination, 
  onClose 
}) => {
  return (
    <Drawer
      title="Chi Tiết Điểm Đến"
      placement="right"
      onClose={onClose}
      open={true}
      className="destlist-view-drawer"
      width={600}
    >
      <Descriptions 
        bordered 
        column={1} 
        className="destlist-view-details"
      >
        <Descriptions.Item label="ID">
          {destination.id}
        </Descriptions.Item>
        <Descriptions.Item label="Tên Điểm Đến">
          {destination.name}
        </Descriptions.Item>
        <Descriptions.Item label="Mô Tả">
          {destination.description || 'Không có mô tả'}
        </Descriptions.Item>
        <Descriptions.Item label="Địa Điểm">
          {destination.location}
        </Descriptions.Item>
        <Descriptions.Item label="Loại">
          <Tag color={destination.type === 'DOMESTIC' ? 'blue' : 'green'}>
            {destination.type === 'DOMESTIC' ? 'Trong Nước' : 'Quốc Tế'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Thành Phố">
          {destination.city}
        </Descriptions.Item>
        <Descriptions.Item label="Hình Ảnh">
          <div className="destlist-image-gallery">
            {destination.destinationImages.map((img) => (
              <Image
                key={img.id}
                width={100}
                src={baseUrl + img.image_url}
                className="destlist-gallery-image"
              />
            ))}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default FormViewDestination;