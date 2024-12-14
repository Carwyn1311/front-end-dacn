import React, { useState } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from '@mui/material';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor'; // Axios instance
import dayjs, { Dayjs } from 'dayjs';
import { JSX } from 'react/jsx-runtime';
import DatePicker from 'react-datepicker';

interface PaymentFormProps {
  onSubmit: (formData: PaymentFormData) => void;
  className?: string;
}

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expirationDate: Date | null;
  cvv: string;
  amount: string;
  paymentMethod: 'card' | 'momo';
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, className }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expirationDate: null,
    cvv: '',
    amount: '',
    paymentMethod: 'card',
  });

  const [loading, setLoading] = useState(false);

  // Hàm thay đổi thông tin từ các input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý sự kiện thay đổi ngày
  const handleDateChange = (date: Dayjs | null) => {
    setFormData({ ...formData, expirationDate: date ? date.toDate() : null });
  };

  // Hàm thay đổi phương thức thanh toán
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, paymentMethod: e.target.value as 'card' | 'momo' });
  };

  // Hàm xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Gửi dữ liệu thanh toán lên server
      await axiosInstance.post('/payment/submit', formData);
      onSubmit(formData); // Call onSubmit callback
      setLoading(false);
    } catch (error) {
      console.error("Error submitting payment:", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <TextField
        label="Card Number"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Card Holder"
        name="cardHolder"
        value={formData.cardHolder}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="CVV"
        name="cvv"
        value={formData.cvv}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="password"
      />

      <TextField
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />

      {/* Phương thức thanh toán */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          value={formData.paymentMethod}
          onChange={handlePaymentMethodChange}
          row
        >
          <FormControlLabel value="card" control={<Radio />} label="Card" />
          <FormControlLabel value="momo" control={<Radio />} label="Momo" />
        </RadioGroup>
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? 'Processing...' : 'Submit Payment'}
      </Button>
    </form>
  );
};

export default PaymentForm;
