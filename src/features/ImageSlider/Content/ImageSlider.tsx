import React, { useState, useEffect, useCallback } from 'react';
import '../css/ImageSlider.css';  // Đảm bảo rằng file CSS đúng
import Button from '../../../components/Button/Button';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}

interface ImageSliderProps {
  slides: Slide[];
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = React.memo(({ slides, className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTextOverlay, setShowTextOverlay] = useState(false);

  // Hàm chuyển sang slide tiếp theo
  const goToNextSlide = useCallback(() => {
    setShowTextOverlay(false);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  // Hàm quay lại slide trước
  const goToPreviousSlide = useCallback(() => {
    setShowTextOverlay(false);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Hàm nhảy tới một slide cụ thể
  const goToSlide = (index: number) => {
    setShowTextOverlay(false);
    setCurrentSlide(index);
  };

  // Xử lý hiệu ứng hiển thị overlay và chuyển slide tự động
  useEffect(() => {
    const textOverlayTimeout = setTimeout(() => setShowTextOverlay(true), 500);
    const interval = setInterval(goToNextSlide, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(textOverlayTimeout);
    };
  }, [goToNextSlide]);

  // Kiểm tra nếu slides không rỗng và phần tử tại currentSlide tồn tại
  const currentSlideData = slides[currentSlide];

  return (
    <section 
      className={`slider-container ${className}`} 
      style={{ 
        backgroundImage: currentSlideData.image ? `url(${currentSlideData.image})` : 'none' 
      }} // Kiểm tra URL hợp lệ
    >
      <div className={`slider-overlay ${showTextOverlay ? 'show' : ''}`}>
        <h2 className="slider-title">{currentSlideData.title}</h2>
        <h1 className="slider-subtitle">{currentSlideData.subtitle}</h1>
        <p className="slider-price">{currentSlideData.price}</p>
        <button className="slider-button">XEM THÊM</button>
      </div>

      {/* Dấu chấm điều hướng */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button className="slider-nav-button left" onClick={goToPreviousSlide} style={{ left: '10px' }}>
        <span className="material-icons">chevron_left</span>
      </Button>
      <Button className="slider-nav-button right" onClick={goToNextSlide} style={{ right: '10px' }}>
        <span className="material-icons">chevron_right</span>
      </Button>
    </section>
  );
});

export default ImageSlider;
