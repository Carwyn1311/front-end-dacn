import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import PaymentForm from '../../Payment/Content/PaymentForm';
import '../.css/MainContent.css';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}

const initialSlides: Slide[] = [
  {
    image: '', // Bạn có thể thêm đường dẫn hình ảnh thực tế
    title: 'KHUYẾN MÃI DU LỊCH ÚC',
    subtitle: 'MELBOURNE - SYDNEY',
    price: 'Giá shock: 64.999.000đ/khách',
  },
  {
    image: '', // Bạn có thể thêm đường dẫn hình ảnh thực tế
    title: 'KHUYẾN MÃI DU LỊCH NHẬT BẢN',
    subtitle: 'TOKYO - KYOTO',
    price: 'Giá shock: 54.999.000đ/khách',
  },
];

const MainContent: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);

  const handleUpdateSlides = (updatedSlides: Slide[]) => {
    setSlides(updatedSlides);
  };

  const handlePaymentSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
  };

  const handleTourSubmit = (values: any) => {
    console.log('Tour form submitted:', values);
  };

  React.useEffect(() => {
    const storedSlides = localStorage.getItem('slides');
    if (storedSlides) {
      setSlides(JSON.parse(storedSlides)); // Đọc dữ liệu từ localStorage
    }
  }, []);
  

  return (
    <div className="main-content">
      <div className="slider-display">
        <ImageSlider slides={slides} className="main-image-slider" />
      </div>

      {/* Form quản lý Tour */}
      <div className="tour-management">
        <h1>Quản lý Tour</h1>
        <Form className="tour-form" onFinish={handleTourSubmit}>
          <Form.Item
            label="Tên Tour"
            name="tourName"
            rules={[{ required: true, message: 'Vui lòng nhập tên tour!' }]}
          >
            <Input placeholder="Nhập tên tour" />
          </Form.Item>

          <Form.Item
            label="Địa điểm"
            name="location"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
          >
            <Input placeholder="Nhập địa điểm" />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <Input placeholder="Nhập giá" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Form Thanh toán */}
      <div className="payment-container">
        <PaymentForm onSubmit={handlePaymentSubmit} className="payment-form" />
      </div>

      {/* Tiêu đề cho phần thanh toán */}
      <div className="myComponentContainer">
        <h1 className="myComponentHeading">Payment!</h1>
      </div>
    </div>
  );
};

export default MainContent;
