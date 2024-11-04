// TitleBar.tsx
import React from 'react';
import '../.css/TitleBar.css';
import TitleBar01 from './TitleBar01';
import TitleBar02 from './TitleBar02';

const TitleBar: React.FC = () => {
  return (
    <header className="header-container">
      <TitleBar01 />
      <TitleBar02 />
    </header>
  );
};

export default TitleBar;
