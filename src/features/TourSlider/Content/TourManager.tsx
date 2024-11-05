// TourManager.tsx
import React, { useState } from 'react';
import TourSlider from './TourSlider';
import '../.css/TourManager.css';

interface TourItem {
  id: number;
  image: string;
  discount: string;
  duration: string;
  price: string;
  title: string;
  subtitle: string;
}

const TourManager = () => {
  const [tours, setTours] = useState<TourItem[]>([
    {
      id: 1,
      image: 'image1.jpg',
      discount: 'Giảm 3.000.000đ/khách',
      duration: '5 ngày 3 đêm',
      price: '69.999.000đ',
      title: 'Du Lịch Maldives - Tết Nguyên Đán 2025',
      subtitle: 'Tết 2025 | Tour Maldives',
    },
  ]);

  const [newTour, setNewTour] = useState<TourItem>({
    id: Date.now(),
    image: '',
    discount: '',
    duration: '',
    price: '',
    title: '',
    subtitle: '',
  });

  const addTour = () => {
    setTours([...tours, newTour]);
    setNewTour({
      id: Date.now(),
      image: '',
      discount: '',
      duration: '',
      price: '',
      title: '',
      subtitle: '',
    });
  };

  const deleteTour = (id: number) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  return (
    <div className="tour-manager">
      <h2>Quản lý Tour</h2>
      <div className="tour-manager-form">
        <input
          type="text"
          placeholder="Image URL"
          value={newTour.image}
          onChange={(e) => setNewTour({ ...newTour, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Discount"
          value={newTour.discount}
          onChange={(e) => setNewTour({ ...newTour, discount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration"
          value={newTour.duration}
          onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newTour.price}
          onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={newTour.title}
          onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={newTour.subtitle}
          onChange={(e) => setNewTour({ ...newTour, subtitle: e.target.value })}
        />
        <button onClick={addTour}>Thêm Tour</button>
      </div>

      <TourSlider items={tours} itemsPerView={3} interval={5000} />

      {tours.map((tour) => (
        <div key={tour.id} className="tour-item">
          <p>{tour.title}</p>
          <button onClick={() => deleteTour(tour.id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
};

export default TourManager;
