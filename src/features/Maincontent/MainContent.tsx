import React from 'react';

interface MainContentProps {
  page: string
}

const MainContent: React.FC<MainContentProps> = ({ page }) => {
  return (
    <div className="main-content">
      {page}
    </div>
  );
};

export default MainContent;
