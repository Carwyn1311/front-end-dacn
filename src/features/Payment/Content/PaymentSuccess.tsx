import React from 'react';

// Định nghĩa kiểu cho props
interface PaymentSuccessProps {
  message: string;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ message }) => {
  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>{message}</p>
    </div>
  );
};

export default PaymentSuccess;