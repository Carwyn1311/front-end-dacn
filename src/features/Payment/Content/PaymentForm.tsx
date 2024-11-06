import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, DatePicker, Form, Radio } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';
import { RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';

interface PaymentFormProps {
  onSubmit: (formData: PaymentFormData) => void;
  className?: string;
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo'>('card');
  const [amount, setAmount] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: DatePickerProps['value'] | null) => {
    setFormData({ ...formData, expirationDate: date ? date.toDate() : null });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value as 'card' | 'momo');
  };

  const handleMoMoPayment = async () => {
    try {
      const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', {
        partnerCode: 'YOUR_PARTNER_CODE',
        accessKey: 'YOUR_ACCESS_KEY',
        secretKey: 'YOUR_SECRET_KEY',
        requestId: `${Date.now()}`,
        amount: amount,
        orderId: `${Date.now()}`,
        orderInfo: 'Thanh toán đơn hàng MoMo',
        redirectUrl: 'YOUR_REDIRECT_URL', // URL để chuyển hướng người dùng sau khi thanh toán thành công
        ipnUrl: 'YOUR_IPN_URL',           // URL để nhận thông báo thanh toán từ MoMo
        requestType: 'captureWallet',
      });

      // Kiểm tra xem MoMo có trả về URL thanh toán hay không
      if (response.data && response.data.payUrl) {
        // Chuyển hướng đến trang thanh toán MoMo
        window.location.href = response.data.payUrl;
      }
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'momo') {
      handleMoMoPayment(); // Gọi hàm thanh toán MoMo nếu chọn phương thức này
    } else {
      onSubmit(formData); // Gọi hàm xử lý thanh toán bằng thẻ
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical" className={`payment-form ${className}`}>
      <Form.Item label="Amount">
        <Input value={amount} onChange={handleAmountChange} placeholder="Enter amount" />
      </Form.Item>

      <Form.Item label="Payment Method">
        <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
          <Radio value="card">Credit/Debit Card</Radio>
          <Radio value="momo">MoMo Wallet</Radio>
        </Radio.Group>
      </Form.Item>

      {paymentMethod === 'card' && (
        <>
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
        </>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {paymentMethod === 'momo' ? 'Pay with MoMo' : 'Submit Payment'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
