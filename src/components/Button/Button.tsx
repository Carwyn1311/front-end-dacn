import React from 'react';

interface ButtonProps {
  onClick?: () => void;  // Make onClick optional
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | 'primary';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, style, children, className = '', type = 'button', icon }) => {
  const buttonType = type === 'primary' ? 'button' : type;
  const buttonClass = type === 'primary' ? `${className} primary-button` : className;

  return (
    <button className={buttonClass} onClick={onClick} style={style} type={buttonType}>
      {icon != null && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
