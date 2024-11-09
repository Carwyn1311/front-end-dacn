import React from 'react';
import '../.css/MyComponent.css';

interface MyComponentProps {
  title: string;
  content: string;
  imageUrl: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, content, imageUrl }) => {
  return (
    <div className="myComponentContainer">
      <img src={imageUrl} alt={title} className="myComponentImage" />
      <h1 className="myComponentHeading">{title}</h1>
      <p className="myComponentContent">{content}</p>
    </div>
  );
};

export default MyComponent;
