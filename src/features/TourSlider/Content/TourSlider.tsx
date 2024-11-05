// TourSlider.tsx
import React, { useContext, useEffect, useState } from 'react';
import { TourContext } from './TourContext';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../.css/TourSlider.css';

interface TourSliderProps {
  itemsPerView: number;
  interval: number;
}

const TourSlider: React.FC<TourSliderProps> = ({ itemsPerView, interval }) => {
  const { tours } = useContext(TourContext) ?? { tours: [] };
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tours.length);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval, tours.length]);

  if (tours.length === 0) return <p>Không có tour nào để hiển thị</p>;

  return (
    <div className="tour-slider">
      <div className="tour-slider-container" style={{ transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)` }}>
        {tours.map((item) => (
          <div key={item.id} className="tour-item" style={{ flex: `0 0 ${100 / itemsPerView}%` }}>
            <img src={item.image} alt={item.title} className="tour-image" />
            <div className="tour-info">
              <div className="tour-discount">{item.discount}</div>
              <div className="tour-price-tag">
                <span>Giá từ</span>
                <div className="tour-price">{item.price}</div>
                <span>{item.duration}</span>
              </div>
              <div className="tour-details">
                <p className="tour-date">Tết 2025</p>
                <p className="tour-country">Tour {item.subtitle}</p>
                <h3 className="tour-title">{item.title}</h3>
              </div>
              <Button type="primary" className="tour-button">Mua tour</Button>
            </div>
          </div>
        ))}
      </div>
      <Button icon={<LeftOutlined />} onClick={() => setCurrentIndex((prev) => (prev - 1 + tours.length) % tours.length)} className="tour-nav-button left" />
      <Button icon={<RightOutlined />} onClick={() => setCurrentIndex((prev) => (prev + 1) % tours.length)} className="tour-nav-button right" />
    </div>
  );
};

export default TourSlider;
