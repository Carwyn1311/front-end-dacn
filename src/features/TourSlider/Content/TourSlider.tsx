import React, { useContext, useEffect, useRef, useState } from 'react';
import { TourContext } from './TourContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import '../.css/TourSlider.css';

interface TourSliderProps {
  interval: number;
}

const TourSlider: React.FC<TourSliderProps> = ({ interval }) => {
  const itemsPerView = 5;
  const { tours } = useContext(TourContext) ?? { tours: [] };
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Clone tours for infinite sliding
  const clonedTours = tours.length > 0 ? [...tours, ...tours] : [];

  useEffect(() => {
    const timer = setInterval(() => {
      moveNext();
    }, interval);

    return () => clearInterval(timer);
  }, [interval, currentIndex]);

  // Move to the next item, wrapping around at the end
  const moveNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tours.length);
  };

  // Move to the previous item, wrapping around at the start
  const movePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tours.length) % tours.length);
  };

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
    // Adjust the transform for sliding, based on the current index
    sliderRef.current.style.transform = `translateX(-${(currentIndex * 100) / itemsPerView}%)`;
  }, [currentIndex]);

  const handleTourClick = (url: string) => {
    if (url) {
      navigate(url);
    }
  };

  if (tours.length === 0) return <p>Không có tour nào để hiển thị</p>;

  // Render Dots Navigation
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < tours.length; i++) {
      dots.push(
        <span
          key={i}
          className={`dot ${i === currentIndex ? 'active' : ''}`}
          onClick={() => setCurrentIndex(i)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setCurrentIndex(i);
            }
          }}
          aria-label={`Go to slide ${i + 1}`}
        />
      );
    }
    return dots;
  };

  return (
    <div className="tour-slider">
      <div ref={sliderRef} className="tour-slider-container">
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
                  <span className="tour-duration">/ {item.duration}</span>
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

      {/* Dots Navigation */}
      <div className="dots-navigation">
        {renderDots()}
      </div>
    </div>
  );
};

export default TourSlider;
