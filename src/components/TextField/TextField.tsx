import React, { useState } from 'react';

interface TextFieldProps {
  label?: string
  name?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  fullWidth?: boolean
  fullHeight?: boolean
  margin?: 'none' | 'dense' | 'normal'
  className?: string
  width?: string
  height?: string
}

const TextField: React.FC<TextFieldProps> = ({
  label = 'Label',
  name = 'text-field',
  value,
  onChange,
  placeholder = '',
  fullWidth = false,
  fullHeight = false,
  margin = 'normal',
  className = '',
  width = 'auto',
  height = 'auto'
}: TextFieldProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = (): void => setIsFocused(true);
  const handleBlur = (): void => setIsFocused(false);

  return (
    <div
      className={`floating-label-container ${margin}`}
      style={{ width: fullWidth ? '100%' : width, height: fullHeight ? '100%' : height }}
    >
      <label
        htmlFor={name}
        className={`floating-label ${isFocused || value !== '' ? 'focused' : ''}`}
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${className}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default TextField;
