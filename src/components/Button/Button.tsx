import React from 'react';
import { Button as AntButton } from 'antd';
import { ButtonType } from 'antd/lib/button';

interface ButtonProps {
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
  type?: ButtonType;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  style,
  children,
  className = '',
  type = 'default',
  icon
}) => {
  return (
    <AntButton
      className={className}
      onClick={onClick}
      style={style}
      type={type}
      icon={icon}
    >
      {children}
    </AntButton>
  );
};

export default Button;
