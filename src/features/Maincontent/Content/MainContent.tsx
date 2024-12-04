import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import PaymentForm from '../../Payment/Content/PaymentForm';
import '../css/MainContent.css';
import { TourContextProvider } from '../../TourSlider/Content/TourContext';

import TourSlider from '../../TourSlider/Content/TourSlider';
import ImgTransition from '../../ImgTransition/Content/ImgTransition';
import AutoSearch from '../../../components/AutoSearchField/AutoSearch';
import { itemsWithUrls } from './Inputdata';
import Footer from '../../Footer/Content/Footer';
import CommitmentSection from '../../CommitmentSection/Content/CommitmentSection';
import ImageSlider from '../../ImageSlider/Content/ImageSlider';
import { ImgSliderContextProvider } from '../../ImageSlider/Content/ImgSliderContext';

const MainContent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedUrl, setSelectedUrl] = useState<string>('');

  const handleSelectItem = (item: string, url: string) => {
    setSelectedItem(item);
    setSelectedUrl(url);
    console.log('Selected item:', item);
    console.log('Redirecting to:', url);
    window.location.href = url; // Điều hướng đến URL tương ứng
  };


  const handlePaymentSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
  };

  const handleTourSubmit = (values: any) => {
    console.log('Tour form submitted:', values);
  };


  return (
    <ImgSliderContextProvider>
      <TourContextProvider>
        <div className="main-content">
          <div className="slider-display" >
            <ImageSlider />
          </div>
          <div className="info-tour-new">
            <AutoSearch
              className='search-input'
              items={itemsWithUrls}
              onSelectItem={handleSelectItem}
              label="Search for Tour...."
              placeholder=""
              width='50%'
              height='60px'
            />
            <h2 className="info-tour-2025">TOUR TẾT 2025</h2>
            <div className="TourSlider">
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
          <div className="content-bottom">
            <div className='content01'>
              <CommitmentSection />
            </div>
          </div>
        </div>
      </TourContextProvider>
    </ImgSliderContextProvider>

  );
};

export default MainContent;
