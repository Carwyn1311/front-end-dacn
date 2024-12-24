import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';
import { message } from 'antd';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import '../css/PaymentPage.css';

import PaymentForm from './PaymentForm';
import QRCodeDisplay from './QRCodeDisplay';
import useFetchMethods from './UseFetchMethods';
import { Destination } from '../Content/DestinationTypes';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state as {
    booking_date: string;
    adult_tickets: number;
    child_tickets: number;
    status: string;
    days: number;
    destination_id: number;
    ticketPrice: {
      adult_price: number;
      child_price: number;
    };
    bookingId: number;
    destination: Destination;
  };

  // Khởi tạo paymentMethod và selectedBank với giá trị mặc định
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<Array<{ id: string; method_name: string }>>([]);
  const [banks, setBanks] = useState<Array<{ id: string; name: string }>>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(120); // 2 minutes = 120 seconds
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useFetchMethods(setPaymentMethods, setBanks, paymentMethod);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (qrCodeUrl) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      setQrCodeUrl('');
      message.warning('QR code đã hết hạn. Vui lòng thử lại.');
    }

    return () => clearInterval(interval);
  }, [qrCodeUrl, timer]);

  const handlePayment = async () => {
    setLoading(true);
    const paymentData = {
      paymentMethodId: Number(paymentMethod),
      bookingId: Number(bookingData.bookingId),
      selectedBank: paymentMethod === '1' ? selectedBank : null,
    };

    try {
      const paymentResponse = await axiosInstanceToken.post('/api/payments/create', paymentData, {});

      const paymentDetailsId = paymentResponse.data.id;

      if (paymentMethod === '1') {
        // Generate QR Code
        const qrCodeRequest = {
          paymentId: Number(paymentDetailsId),
          bankId: Number(selectedBank)
        };

        const qrCodeResponse = await axiosInstanceToken.post('/api/qrcode/create', qrCodeRequest, {});

        const fullQrCodeUrl = `${baseUrl}${qrCodeResponse.data.qrCodeUrl}`; // Combine base URL with QR code URL
        setQrCodeUrl(fullQrCodeUrl); // Set the QR code URL to state
        setTimer(120); // Reset timer to 2 minutes
        message.success('Thanh toán và tạo mã QR thành công!');
      } else {
        message.success('Thanh toán thành công!');
      }
    } catch (error) {
      message.error('Thanh toán thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const typeDisplay = bookingData.destination.type === 'DOMESTIC' ? 'Trong nước' : 'Ngoài nước';

  return (
    <Box sx={{ maxWidth: 700, margin: '0 auto', padding: 2, paddingTop: '80px', border: '1px solid #ccc', borderRadius: 4, textAlign: 'center', backgroundColor: '#f9f9f9', boxShadow: 3 }}>
      <Typography variant="h4" component="h1" marginBottom={2}>Thông tin thanh toán</Typography>
      {bookingData.destination && (
        <Box sx={{ textAlign: 'left', marginBottom: 2, padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>Điểm đến: {bookingData.destination.name}</Typography>
          <Typography variant="h6" gutterBottom>Địa chỉ: {bookingData.destination.location}</Typography>
          <Typography variant="h6" gutterBottom>Mô tả: {bookingData.destination.description || 'Không có mô tả'}</Typography>
          <Typography variant="h6" gutterBottom>Loại: {typeDisplay}</Typography>
          <Typography variant="h6" gutterBottom>Thành phố: {bookingData.destination.city.name}</Typography>
          <Typography variant="h6" gutterBottom>Tỉnh: {bookingData.destination.city.province.name}</Typography>
          <Typography variant="h6" gutterBottom>Quốc gia: {bookingData.destination.city.province.country}</Typography>
          {bookingData.destination.destinationImages.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 2 }}>
              {bookingData.destination.destinationImages.map((image) => (
                <img
                  key={image.id}
                  src={`${baseUrl}${image.image_url}`}
                  alt={`Destination ${bookingData.destination.name}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '5px', borderRadius: 4 }}
                />
              ))}
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ textAlign: 'left', marginBottom: 2, padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
        <Typography variant="h6" gutterBottom>Ngày đặt: {bookingData.booking_date}</Typography>
        <Typography variant="h6" gutterBottom>Người lớn: {bookingData.adult_tickets}</Typography>
        <Typography variant="h6" gutterBottom>Trẻ em: {bookingData.child_tickets}</Typography>
        <Typography variant="h6" gutterBottom>Số ngày: {bookingData.days}</Typography>
        <Typography variant="h6" gutterBottom>
          Tổng giá vé: {(bookingData.adult_tickets * bookingData.ticketPrice.adult_price + bookingData.child_tickets * bookingData.ticketPrice.child_price) * bookingData.days} VND
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 2, padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
        <PaymentForm
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paymentMethods={paymentMethods}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          banks={banks}
        />
      </Box>

      <Button variant="contained" color="primary" fullWidth onClick={handlePayment} disabled={loading} sx={{ backgroundColor: '#00796b', "&:hover": { backgroundColor: '#004d40' } }}>
        {loading ? <CircularProgress size={24} /> : 'Thanh toán'}
      </Button>

      {qrCodeUrl && (
        <Box sx={{ textAlign: 'center', marginTop: 2, padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
          <QRCodeDisplay qrCodeUrl={qrCodeUrl} />
          <Typography variant="body2" color="error">QR code hết hạn sau: {timer}s</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaymentPage;
