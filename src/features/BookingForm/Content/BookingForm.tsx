// BookingForm.js
import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, message, Select } from 'antd';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';

const BookingForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    console.log('Form data submitted:', values);
    setLoading(true);

    try {
      // Gửi dữ liệu đến server bằng axiosInstance
      const response = await axiosInstance.post('/submit', values);
      
      // Kiểm tra dữ liệu phản hồi và xử lý
      if (response.data && response.data !== undefined) {
        console.log('Response from server:', response.data);
        message.success('Form submitted successfully!');
      } else {
        throw new Error('Invalid response data');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('There was an error submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ numberOfPassengers: 1, paymentMethod: 'full' }}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: 'Please enter your full name!' }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label="Number of Passengers"
          name="numberOfPassengers"
          rules={[{ required: true, message: 'Please enter the number of passengers!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[{ required: true, message: 'Please select payment method!' }]}
        >
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingForm;
