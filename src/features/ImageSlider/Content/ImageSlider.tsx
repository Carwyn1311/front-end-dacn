// ImageSlider.tsx
import React, { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../.css/ImageSlider.css';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTextOverlay, setShowTextOverlay] = useState(false);

  useEffect(() => {
    const textOverlayTimeout = setTimeout(() => setShowTextOverlay(true), 500); 
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(textOverlayTimeout);
    };
  }, [currentSlide]);

  const goToNextSlide = () => {
    setShowTextOverlay(false);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setShowTextOverlay(false);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="slider-container"
      style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
    >
      <div className={`slider-overlay ${showTextOverlay ? 'show' : ''}`}>
        <h2 className="slider-title">{slides[currentSlide].title}</h2>
        <h1 className="slider-subtitle">{slides[currentSlide].subtitle}</h1>
        <p className="slider-price">{slides[currentSlide].price}</p>
        <button className="slider-button">XEM THÊM</button>
      </div>

      <button className="slider-nav-button left" onClick={goToPreviousSlide}>
        <LeftOutlined />
      </button>
      <button className="slider-nav-button right" onClick={goToNextSlide}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default ImageSlider;
