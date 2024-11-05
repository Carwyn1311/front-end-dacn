// TourSlider.tsx
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../.css/TourSlider.css';

interface TourItem {
  id: number;
  image: string;
  discount: string;
  duration: string;
  price: string;
  title: string;
  subtitle: string;
}

interface TourSliderProps {
  items: TourItem[];
  itemsPerView: number;
  interval?: number;
  className?: string;
}

const TourSlider: React.FC<TourSliderProps> = ({
  items,
  itemsPerView,
  interval = 5000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className={`tour-slider ${className}`}>
      <div className="tour-slider-container" style={{ transform: `translateX(-${currentIndex * 100 / itemsPerView}%)` }}>
        {items.map((item) => (
          <div key={item.id} className="tour-item" style={{ flex: `0 0 ${100 / itemsPerView}%` }}>
            <img src={item.image} alt={item.title} className="tour-image" />
            <div className="tour-info">
              <div className="tour-discount">{item.discount}</div>
              <div className="tour-duration">{item.duration}</div>
              <h3 className="tour-title">{item.title}</h3>
              <p className="tour-subtitle">{item.subtitle}</p>
              <div className="tour-price">{item.price}</div>
              <button className="tour-button">Mua tour</button>
            </div>
          </div>
        ))}
      </div>
      <IconButton onClick={goToPrevious} className="tour-nav-button left">
        <LeftOutlined />
      </IconButton>
      <IconButton onClick={goToNext} className="tour-nav-button right">
        <RightOutlined />
      </IconButton>
    </div>
  );
};

export default TourSlider;
