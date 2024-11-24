import React, { useContext, useEffect, useRef, useState } from 'react';
import { TourContext } from './TourContext';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../.css/TourSlider.css';

interface TourSliderProps {
  interval: number; // Interval for auto-slide
}

const TourSlider: React.FC<TourSliderProps> = ({ interval }) => {
  const itemsPerView = 3; // Fixed number of items per view
  const { tours } = useContext(TourContext) ?? { tours: [] };
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Clone tours for infinite sliding
  const clonedTours = [...tours, ...tours.slice(0, itemsPerView)];

  useEffect(() => {
    const timer = setInterval(() => {
      moveNext();
    }, interval);

    return () => clearInterval(timer);
  }, [interval, currentIndex]);

  const moveNext = () => {
    setCurrentIndex((prevIndex) => {
      const isLastSlide = prevIndex >= tours.length;
      if (isLastSlide) {
        setTimeout(() => {
          sliderRef.current!.style.transition = 'none';
          setCurrentIndex(0);
        }, 500); // Match CSS transition duration
        return prevIndex; // Temporarily hold the last index
      }
      return prevIndex + 1;
    });
  };

  const movePrev = () => {
    setCurrentIndex((prevIndex) => {
      const isFirstSlide = prevIndex === 0;
      if (isFirstSlide) {
        setTimeout(() => {
          sliderRef.current!.style.transition = 'none';
          setCurrentIndex(tours.length - 1);
        }, 500); // Match CSS transition duration
        return tours.length - 1; // Temporarily hold the first index
      }
      return prevIndex - 1;
    });
  };

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
    sliderRef.current.style.transform = `translateX(-${(currentIndex * 100) / itemsPerView}%)`;
  }, [currentIndex]);

  const handleTourClick = (url: string) => {
    if (url) {
      navigate(url); // Navigate to the provided URL
    }
  };

  if (tours.length === 0) return <p>Không có tour nào để hiển thị</p>;

  return (
    <div className="tour-slider">
      <div
        ref={sliderRef}
        className="tour-slider-container"
        style={{
          display: 'flex',
          gap: '20px', // Ensure proper spacing between items
        }}
      >
        {clonedTours.map((item, index) => (
          <div key={index} className="tour-item">
            <div className="tour-card">
              <div className="tour-image-container">
                <img src={item.image} alt={item.title} className="tour-image" />
                <div className="tour-badge">Ưu đãi hấp dẫn</div>
              </div>
              <div className="tour-info">
                <h3 className="tour-title">{item.title}</h3>
                <p className="tour-destination">Tour {item.subtitle}</p>
                <div className="tour-meta">
                  <div className="tour-price">
                    <span>Giá từ:</span>
                    <strong>{item.price}</strong>
                  </div>
                  <span className="tour-duration">{item.duration}</span>
                </div>
                <Button
                  type="primary"
                  className="tour-button"
                  onClick={() => handleTourClick(item.url)}
                >
                  Mua tour ngay
                </Button>
              </div>
            </div>
          </div>

        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        icon={<LeftOutlined />}
        onClick={movePrev}
        className="tour-nav-button left"
      />
      <Button
        icon={<RightOutlined />}
        onClick={moveNext}
        className="tour-nav-button right"
      />
    </div>
  );
};

export default TourSlider;
