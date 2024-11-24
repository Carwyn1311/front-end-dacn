import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import PaymentForm from '../../Payment/Content/PaymentForm';
import '../.css/MainContent.css';
import { TourContextProvider } from '../../TourSlider/Content/TourContext';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';
import TourSlider from '../../TourSlider/Content/TourSlider';

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
    <TourContextProvider>
      <div className="main-content">
        <div className="slider-display" style={{ padding: '10px'}} >
          <ImageSlider slides={slides} className="main-image-slider" />
        </div>
        <div className="info-tour-new" style={{ padding: '40px'}}>
          <h2 className="info-tour-2025"  style={{ padding: '20px'}}>TOUR TẾT 2025</h2>
          <div style={{ margin: '20px auto', maxWidth: '1200px', padding: '30px' }}>
            <TourSlider interval={4000} /> {/* Thời gian chuyển cảnh là 4 giây */}
          </div>
        </div>
      </div>
    </TourContextProvider>
  );
};

export default MainContent;
