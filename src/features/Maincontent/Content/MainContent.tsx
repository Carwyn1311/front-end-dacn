import React, { useState } from 'react';
import { Layout } from 'antd';
import ImageSlider from '../../ImageSlider/Content/ImageSlider';
import MenuSlider from '../../ImageSlider/Content/MenuSlider';
import PaymentForm from '../../Payment/Content/PaymentForm';

// Import CSS for styling PaymentForm (from the Payment folder)
import '../../Payment/.css/PaymentForm.css'; 

const { Content } = Layout;

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}

// Initial slides data
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

  // Update slides handler for MenuSlider
  const handleUpdateSlides = (updatedSlides: Slide[]) => {
    setSlides(updatedSlides);
  };

  // Handler function for PaymentForm onSubmit
  const handlePaymentSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    // Xử lý dữ liệu form ở đây
  };

  return (
    <Layout className="main-content-layout">
      {/* MenuSlider for adding, editing, and deleting slides */}
      <MenuSlider slides={slides} onUpdateSlides={handleUpdateSlides} />

      {/* ImageSlider displays the slides */}
      <ImageSlider slides={slides} />

      <Content className="main-content">
        <p>Welcome to the MainContent component!</p>
        <p>This is a placeholder text for demonstration purposes.</p>
        
        {/* Pass handlePaymentSubmit as onSubmit prop */}
        <PaymentForm onSubmit={handlePaymentSubmit} /> 
      </Content>
    </Layout>
  );
};

export default MainContent;
