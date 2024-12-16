import React from 'react';
import { Card, Button } from 'antd';
import Doctohtml from './DoctoHTML';

interface Destination {
  id: number;
  name: string;
  description: string;
  location: string;
  type: 'DOMESTIC' | 'INTERNATIONAL';
  city: number;
  created_at: string | null;
  docUrl: string;  // URL file DOCX
}

interface ItemDesProps {
  destination: Destination;
  onEdit: (id: number) => void;
}

const ItemDes: React.FC<ItemDesProps> = ({ destination, onEdit }) => {
  return (
    <Card
      title={destination.name}
      extra={<Button onClick={() => onEdit(destination.id)}>Chỉnh sửa</Button>}
      style={{ width: '100%' }}
    >
      <p><strong>Mô tả:</strong> {destination.description}</p>
      <p><strong>Vị trí:</strong> {destination.location}</p>
      <p><strong>Loại:</strong> {destination.type}</p>
      <p><strong>Ngày tạo:</strong> {destination.created_at}</p>

      {/* Hiển thị nội dung file DOCX */}
      <div>
        <h3>Chi tiết file DOCX:</h3>
        <Doctohtml url={destination.docUrl} />
      </div>
    </Card>
  );
};

export default ItemDes;
