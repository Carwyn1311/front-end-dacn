import React, { useState } from 'react';

// Định nghĩa kiểu cho các phương thức thanh toán
interface PaymentMethodsProps {
  methods: string[];
  onSelectMethod: (method: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ methods, onSelectMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
    onSelectMethod(method);
  };

  return (
    <div>
      <h3>Select Payment Method</h3>
      <ul>
        {methods.map((method) => (
          <li key={method}>
            <button
              onClick={() => handleSelect(method)}
              style={{ fontWeight: selectedMethod === method ? 'bold' : 'normal' }}
            >
              {method}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethods;