// TourContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface TourItem {
  id: number;
  image: string;
  discount: string;
  duration: string;
  price: string;
  title: string;
  subtitle: string;
}

interface TourContextType {
  tours: TourItem[];
  addTour: (tour: TourItem) => void;
  deleteTour: (id: number) => void;
}

export const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tours, setTours] = useState<TourItem[]>([]);

  const addTour = (tour: TourItem) => {
    setTours((prevTours) => [...prevTours, { ...tour, id: Date.now() }]);
  };

  const deleteTour = (id: number) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
  };

  return (
    <TourContext.Provider value={{ tours, addTour, deleteTour }}>
      {children}
    </TourContext.Provider>
  );
};
