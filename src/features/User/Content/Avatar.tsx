import React from 'react';
import '../.css/Avatar.css';

interface AvatarProps{
  src: string
  alt: string
  size?: number
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size }) => {
  return (
    <div className="avatar" style={{ width: size, height: size }}>
      <img src={src} alt={alt} className="avatar-img" />
    </div>
  );
};
export default Avatar;
