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

    </div>
  );
};

export default MainContent;
