import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { IconButton } from '@mui/material';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { styled } from '@mui/material/styles';

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

  // Định nghĩa các hàm trước khi sử dụng trong useEffect
  const goToNextSlide = useCallback(() => {
    setShowTextOverlay(false);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const goToPreviousSlide = useCallback(() => {
    setShowTextOverlay(false);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const textOverlayTimeout = setTimeout(() => setShowTextOverlay(true), 500);
    const interval = setInterval(goToNextSlide, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(textOverlayTimeout);
    };
  }, [currentSlide, goToNextSlide]);

  const NavButton = useMemo(
    () =>
      styled(IconButton)({
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }),
    []
  );

  return (
    <div className={`slider-container ${className}`} style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
      <div className={`slider-overlay ${showTextOverlay ? 'show' : ''}`}>
        <h2 className="slider-title">{slides[currentSlide].title}</h2>
        <h1 className="slider-subtitle">{slides[currentSlide].subtitle}</h1>
        <p className="slider-price">{slides[currentSlide].price}</p>
        <button className="slider-button">XEM THÊM</button>
      </div>

      <NavButton className="slider-nav-button left" onClick={goToPreviousSlide} style={{ left: '10px' }}>
        <LeftOutlined style={{ fontSize: '2rem' }} />
      </NavButton>
      <NavButton className="slider-nav-button right" onClick={goToNextSlide} style={{ right: '10px' }}>
        <RightOutlined style={{ fontSize: '2rem' }} />
      </NavButton>
    </div>
  );
});

export default ImageSlider;
