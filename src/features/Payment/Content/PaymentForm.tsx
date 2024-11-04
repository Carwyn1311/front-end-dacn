import React, { useState } from 'react';
import InputDay from '../../../components/InputDay/InputDay';
import TextField from '../../../components/TextField/TextField';


interface PaymentFormProps {
  onSubmit: (formData: PaymentFormData) => void;
}

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expirationDate: Date | null; // Thay đổi kiểu dữ liệu cho ngày tháng
  cvv: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expirationDate: null, // Khởi tạo là null
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, expirationDate: date });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Card Number"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        placeholder=""
        fullWidth
      />
      <TextField
        label="Card Holder"
        name="cardHolder"
        value={formData.cardHolder}
        onChange={handleChange}
        placeholder=""
        fullWidth
      />
      <InputDay
        label="Expiration Date"
        name="expirationDate"
        value={formData.expirationDate}
        onChange={handleDateChange}
        width="100%"
      />
      <TextField
        label="CVV"
        name="cvv"
        value={formData.cvv}
        onChange={handleChange}
        placeholder=""
        fullWidth
      />
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
