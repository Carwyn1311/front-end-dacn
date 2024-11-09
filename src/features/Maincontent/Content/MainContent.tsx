import React, { useState } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import ImageSlider from '../../ImageSlider/Content/ImageSlider';
import MenuSlider from '../../ImageSlider/Content/MenuSlider';
import PaymentForm from '../../Payment/Content/PaymentForm';
import TitleBar from '../../Header/Content/TitleBar';
import '../.css/MainContent.css';



const { Content } = Layout;

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}

const initialSlides: Slide[] = [
  {
    image: '/path/to/image1.jpg',
    title: 'KHUYẾN MÃI DU LỊCH ÚC',
    subtitle: 'MELBOURNE - SYDNEY',
    price: 'Giá shock: 64.999.000đ/khách',
  },
  {
    image: '/path/to/image2.jpg',
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

  return (
    <Layout className="main-content-layout">
      {/* Header */}
      <TitleBar />

      <Content className="main-content">
        {/* MenuSlider for adding, editing, and deleting slides */}
        <MenuSlider slides={slides} onUpdateSlides={handleUpdateSlides} />

        {/* ImageSlider displays the slides */}
        <ImageSlider slides={slides} />

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

        {/* Payment Form */}
        <div className="payment-container">
          <PaymentForm onSubmit={handlePaymentSubmit} className="payment-form" />
        </div>
        <div className="myComponentContainer">
      <h1 className="myComponentHeading">Payment!</h1>
    </div>
    

      </Content>
    </Layout>
  );
};

export default MainContent;
