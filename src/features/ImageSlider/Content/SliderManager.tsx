import React, { useState } from 'react';
import ImageSlider from './ImageSlider';
import MenuSlider from './MenuSlider';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  price: string;
}

const SliderManager: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([
    { image: 'url1.jpg', title: 'Slide 1', subtitle: 'Subtitle 1', price: '100' },
    // Thêm các slide khác nếu có
  ]);

  const handleUpdateSlides = (updatedSlides: Slide[]) => {
    setSlides(updatedSlides);
  };

  return (
    <div>
      {/* Render ImageSlider ở trang main content */}
      <ImageSlider slides={slides} />

      {/* Render MenuSlider ở trang admin */}
      <MenuSlider slides={slides} onUpdateSlides={handleUpdateSlides} />
    </div>
  );
};

export default SliderManager;
