import React, { useState, useEffect, useCallback } from 'react';
import './.css/ImageSlider.css';
import Button from '../../components/Button/Button';

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

  const goToNextSlide = useCallback(() => {
    setShowTextOverlay(false);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const goToPreviousSlide = useCallback(() => {
    setShowTextOverlay(false);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setShowTextOverlay(false);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const textOverlayTimeout = setTimeout(() => setShowTextOverlay(true), 500);
    const interval = setInterval(goToNextSlide, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(textOverlayTimeout);
    };
  }, [currentSlide, goToNextSlide]);

  return (
    <section className={`slider-container ${className}`} style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
      <div className={`slider-overlay ${showTextOverlay ? 'show' : ''}`}>
        <h2 className="slider-title">{slides[currentSlide].title}</h2>
        <h1 className="slider-subtitle">{slides[currentSlide].subtitle}</h1>
        <p className="slider-price">{slides[currentSlide].price}</p>
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

      {/* Navigation Buttons (if needed) */}
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
