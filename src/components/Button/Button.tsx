import React from 'react';

interface ButtonProps {
  onClick: () => void
  style?: React.CSSProperties
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset' | 'primary'
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ onClick, style, children, className = '', type = 'button', icon }) => {
  // Handle 'primary' type as a class and map others to the button's native type attribute
  const buttonType = type === 'primary' ? 'button' : type;
  const buttonClass = type === 'primary' ? `${className} primary-button` : className;

  return (
    <button className={buttonClass} onClick={onClick} style={style} type={buttonType}>
      {icon != null ? <span className="button-icon">{icon}</span> : null}
      {children}
    </button>
  );
};

export default Button;
