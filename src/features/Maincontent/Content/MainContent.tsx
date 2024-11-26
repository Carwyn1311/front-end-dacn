import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import PaymentForm from '../../Payment/Content/PaymentForm';
import '../.css/MainContent.css';
import { TourContextProvider } from '../../TourSlider/Content/TourContext';

import TourSlider from '../../TourSlider/Content/TourSlider';
import ImgTransition from '../../ImgTransition/Content/ImgTransition';
import AutoSearch from '../../../components/AutoSearchField/AutoSearch';
import { itemsWithUrls } from './Inputdata';
import Footer from '../../Footer/Content/Footer';
import CommitmentSection from '../../CommitmentSection/Content/CommitmentSection';
import ImageSlider from '../../ImageSlider/ImageSlider';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}

const initialSlides: Slide[] = [
  {
    image: '/images/1649002172.jpg', // Bạn có thể thêm đường dẫn hình ảnh thực tế
    title: 'KHUYẾN MÃI DU LỊCH ÚC',
    subtitle: 'MELBOURNE - SYDNEY',
    price: 'Giá shock: 64.999.000đ/khách',
  },
  {
    image: '/images/2020-03-11-Session-Tokyo-thumbnail.jpg', // Bạn có thể thêm đường dẫn hình ảnh thực tế
    title: 'KHUYẾN MÃI DU LỊCH NHẬT BẢN',
    subtitle: 'TOKYO - KYOTO',
    price: 'Giá shock: 54.999.000đ/khách',
  },
];

const MainContent: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedUrl, setSelectedUrl] = useState<string>('');

  const handleSelectItem = (item: string, url: string) => {
    setSelectedItem(item);
    setSelectedUrl(url);
    console.log('Selected item:', item);
    console.log('Redirecting to:', url);
    window.location.href = url; // Điều hướng đến URL tương ứng
  };

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
        <div className="slider-display" style={{ padding: '10px' }} >
          <ImageSlider slides={slides} className="main-image-slider" />
        </div>
        <div className="info-tour-new" style={{ padding: '40px', gap: '10px' }}>
          <div className="search-input">
          <AutoSearch
            items={itemsWithUrls}
            onSelectItem={handleSelectItem}
            label="Search for Tour...."
            placeholder=""
            width='600px'
            height='50px'
          />
          </div>
          <h2 className="info-tour-2025" style={{ padding: '20px' }}>TOUR TẾT 2025</h2>
          <div style={{ margin: '20px auto', maxWidth: '1200px', padding: '30px'}}>
            <TourSlider interval={4000} /> {/* Thời gian chuyển cảnh là 4 giây */}
          </div>
        </div>
        <div className='img-transition'>
          <ImgTransition
            imageUrl="/images/ha-long-1.jpg"
            title="Đón 7 Chuyến Tàu Biển Quốc Tế"
            subtitle="Tin Nổi Bật"
            description="Saigontourist đón và phục vụ hơn 20,600 du khách quốc tế đến Việt Nam từ tháng 11/2024."
            buttonText="Xem thêm"
            buttonUrl="https://www.saigontourist.net/vi/chi-tiet/668"
            position="left"
          />
        </div>
      </div>
      <div className="content-bottom">
        <div className='content01'>
          <CommitmentSection />
          <Footer />
        </div>
      </div>
    </TourContextProvider>
  );
};

export default MainContent;
