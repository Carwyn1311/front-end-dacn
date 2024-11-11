import React from 'react';
import '../.css/Gallery.css';
import '../.css/AntDesignOverrides.css';
interface Image {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="galleryContainer">
      {images.map((image, index) => (
        <div key={index} className="galleryItem">
          <img src={image.src} alt={image.alt} className="galleryImage" />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
