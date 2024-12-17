import React, { useState } from 'react';
import { Drawer, Descriptions, Button } from 'antd';
import ItemDes from './ItemDes';

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
  docUrl: string; // URL của file DOCX nếu có
  descriptionFile: {
    id: number;
    fileName: string;
    filePath: string;
    destination: null;
  };
}

interface FormViewDestinationProps {
  destination: Destination;
  onClose: () => void;
}

const FormViewDestination: React.FC<FormViewDestinationProps> = ({ 
  destination, 
  onClose 
}) => {
  const [showItemDes, setShowItemDes] = useState<boolean>(false);

  // Hàm mở modal ItemDes
  const handleOpenItemDes = () => {
    setShowItemDes(true);
  };

  // Hàm đóng modal ItemDes
  const handleCloseItemDes = () => {
    setShowItemDes(false);
  };

  return (
    <>
      <Drawer
        title="Chi Tiết Điểm Đến"
        placement="right"
        onClose={onClose}
        open={true}
        className="destlist-view-drawer"
        width={600}
      >
        <Descriptions bordered column={1} className="destlist-view-details">
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
            <span>{destination.type}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Thành phố">
            {destination.city}
          </Descriptions.Item>
        </Descriptions>

        {/* Button mở ItemDes */}
        <Button 
          type="primary" 
          onClick={handleOpenItemDes}
          style={{ marginTop: 20 }}
        >
          Xem Chi Tiết
        </Button>
      </Drawer>

      {/* Modal hoặc Drawer hiển thị ItemDes */}
      {showItemDes && (
        <Drawer
          title="Chi Tiết Điểm Đến - ItemDes"
          placement="right"
          onClose={handleCloseItemDes}
          open={showItemDes}
          className="itemdes-view-drawer"
          width={600}
        >
         <ItemDes
          destination={destination} // Truyền destination vào ItemDes
        />
        </Drawer>
      )}
    </>
  );
};

export default FormViewDestination;
