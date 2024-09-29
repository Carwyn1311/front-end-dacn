import React from 'react';
import '../PasswordField/PasswordField.css';
interface PasswordFieldProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  className?: string
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange, placeholder, className }) => {
  return (
    <label className="input-label">
      <input
        type="password"
        value={value}
        onChange={onChange}
        required
        placeholder=" "
        className="input-field"
      />
      <span className="input-placeholder">{placeholder}</span>
    </label>
  );
};

export default PasswordField;
