import React, { createContext, ReactNode, useState } from 'react';
import { tours as initialTours, Tour } from './tours';

interface TourContextProps {
  tours: Tour[];
}

export const TourContext = createContext<TourContextProps | null>(null);

export const TourContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tours] = useState<Tour[]>(initialTours);

  return (
    <TourContext.Provider value={{ tours }}>
      {children}
    </TourContext.Provider>
  );
};
