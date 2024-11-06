import React, { useState } from 'react';
import { Input, Button, DatePicker, Form } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

interface PaymentFormProps {
  onSubmit: (formData: PaymentFormData) => void;
  className?: string; // Thêm thuộc tính className
}

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expirationDate: Date | null;
  cvv: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, className }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expirationDate: null,
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: DatePickerProps['value'] | null) => {
    setFormData({ ...formData, expirationDate: date ? date.toDate() : null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical" className={`payment-form ${className}`}>
      {/* Card Number */}
      <Form.Item
        label="Card Number"
        name="cardNumber"
        rules={[{ required: true, message: 'Please enter your card number!' }]}
      >
        <Input
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
        />
      </Form.Item>

      {/* Card Holder */}
      <Form.Item
        label="Card Holder"
        name="cardHolder"
        rules={[{ required: true, message: 'Please enter the card holder name!' }]}
      >
        <Input
          name="cardHolder"
          value={formData.cardHolder}
          onChange={handleChange}
          placeholder="Card Holder"
        />
      </Form.Item>

      {/* Expiration Date */}
      <Form.Item
        label="Expiration Date"
        name="expirationDate"
        rules={[{ required: true, message: 'Please select the expiration date!' }]}
      >
        <DatePicker
          name="expirationDate"
          value={formData.expirationDate ? dayjs(formData.expirationDate) : null}
          onChange={handleDateChange}
          format="MM/YYYY"
          placeholder="MM/YYYY"
          picker="month"
        />
      </Form.Item>

      {/* CVV */}
      <Form.Item
        label="CVV"
        name="cvv"
        rules={[{ required: true, message: 'Please enter your CVV!' }]}
      >
        <Input
          type="number"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          placeholder="CVV"
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit Payment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
