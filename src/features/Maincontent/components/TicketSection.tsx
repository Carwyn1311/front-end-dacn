import React from 'react';
import { Form, Input, Button } from 'antd';

interface TicketSectionProps {
  adultCount: number;
  setAdultCount: (value: number) => void;
  childCount: number;
  setChildCount: (value: number) => void;
  handleBookNow: () => void;
}

const TicketSection: React.FC<TicketSectionProps> = ({ adultCount, setAdultCount, childCount, setChildCount, handleBookNow }) => (
  <div className="ticket-section">
    <h2>Giá vé</h2>
    <Form layout="inline">
      <Form.Item label="Người lớn">
        <Input type="number" min="1" value={adultCount} onChange={(e) => setAdultCount(Number(e.target.value))} />
      </Form.Item>
      <Form.Item label="Trẻ em">
        <Input type="number" min="0" value={childCount} onChange={(e) => setChildCount(Number(e.target.value))} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleBookNow}>Đặt vé</Button>
      </Form.Item>
    </Form>
  </div>
);

export default TicketSection;
