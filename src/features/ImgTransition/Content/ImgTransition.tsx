import React, { useState, useEffect } from 'react';
import '../.css/ImgTransition.css';
import { useNavigate } from 'react-router-dom';

interface ImgTransitionProps {
  imageUrl: string; // URL hình ảnh
  title: string; // Tiêu đề
  subtitle: string; // Phụ đề
  description: string; // Mô tả
  buttonText: string; // Văn bản nút
  buttonUrl: string; // URL khi nhấn nút
  position?: 'left' | 'right'; // Vị trí hiển thị form
}

const ImgTransition: React.FC<ImgTransitionProps> = ({
  imageUrl,
  title,
  subtitle,
  description,
  buttonText,
  buttonUrl,
  position = 'left',
}) => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);

  // Theo dõi sự cuộn trang để tạo hiệu ứng parallax
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = () => {
    if (buttonUrl.startsWith('/')) {
      navigate(buttonUrl); // Điều hướng nội bộ
    } else {
      window.location.href = buttonUrl; // Điều hướng bên ngoài
    }
  };

  return (
    <div className="img-transition-container">
      <div
        className="image-background"
        style={{
          transform: `translateY(${offset * 0.5}px)`, // Hiệu ứng parallax
        }}
      >
        <img
          src={imageUrl}
          alt="Background"
          className="background-image"
        />
      </div>
      <div className={`overlay-form ${position}`}>
        <div className="form-container">
          <h2 className="form-title">{title}</h2>
          <h3 className="form-subtitle">{subtitle}</h3>
          <p className="form-description">{description}</p>
          <button
            className="form-button"
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImgTransition;
