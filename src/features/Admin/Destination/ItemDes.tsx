// src/components/ItemDes.tsx
import React, { useState, useEffect } from 'react';
import { Descriptions, Tag, Image, Row, Col, Button } from 'antd';
import DoctoHtml from './DoctoHTML'; // Chắc chắn rằng import đúng file DoctoHtml.tsx

interface ItemDesProps {
  destination: {
    id: number;
    name: string;
    description: string;
    location: string;
    type: 'DOMESTIC' | 'INTERNATIONAL';
    city: number;
    destinationImages: Array<{ id: number; image_url: string }>;
    docUrl: string;  // URL của file DOCX nếu có
    descriptionFile: {
      id: number;
      fileName: string;
      filePath: string;
      destination: null | string;
    };
  };
}

const ItemDes: React.FC<ItemDesProps> = ({ destination }) => {
  const [docUrl, setDocUrl] = useState<string | null>(null);

  // Hàm để tải file DOCX từ API (nếu có)
  useEffect(() => {
    if (destination.descriptionFile && destination.descriptionFile.filePath) {
      setDocUrl(destination.descriptionFile.filePath);
    }
  }, [destination.descriptionFile]);

  return (
    <div className="destination-detail">
      <Descriptions bordered column={1} title="Chi Tiết Điểm Đến">
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
            {destination.type}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Thành Phố">
          {destination.city}
        </Descriptions.Item>
        {destination.destinationImages && destination.destinationImages.length > 0 && (
          <Descriptions.Item label="Hình ảnh">
            <Row gutter={16}>
              {destination.destinationImages.map((image) => (
                <Col span={8} key={image.id}>
                  <Image
                    width="100%"
                    src={image.image_url}
                    alt={`Image ${image.id}`}
                  />
                </Col>
              ))}
            </Row>
          </Descriptions.Item>
        )}
        {docUrl && (
          <Descriptions.Item label="Mô Tả Chi Tiết (DOCX)">
            <DoctoHtml url={docUrl} /> {/* Sử dụng DoctoHtml để chuyển file DOCX thành HTML */}
          </Descriptions.Item>
        )}
      </Descriptions>

      {/* Thêm button để mở form ItemDes */}
      <Button type="primary" onClick={() => console.log("Open ItemDes form")}>
        Xem Chi Tiết
      </Button>
    </div>
  );
};

export default ItemDes;
