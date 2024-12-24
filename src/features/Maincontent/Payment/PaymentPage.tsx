import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Grid, Paper, Button, CircularProgress, Card, CardContent, CardMedia, Box } from '@mui/material';
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

  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<Array<{ id: string; method_name: string }>>([]);
  const [banks, setBanks] = useState<Array<{ id: string; name: string }>>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(120);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(true);
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
      setShowPaymentForm(true);
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
        const qrCodeRequest = {
          paymentId: Number(paymentDetailsId),
          bankId: Number(selectedBank)
        };

        const qrCodeResponse = await axiosInstanceToken.post('/api/qrcode/create', qrCodeRequest, {});

        const fullQrCodeUrl = `${baseUrl}${qrCodeResponse.data.qrCodeUrl}`;
        setQrCodeUrl(fullQrCodeUrl);
        setTimer(120);
        setShowPaymentForm(false);
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

  const handleCancel = () => {
    setQrCodeUrl('');
    setShowPaymentForm(true);
    setTimer(120);
  };

  const typeDisplay = bookingData.destination.type === 'DOMESTIC' ? 'Trong nước' : 'Ngoài nước';

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
      <Grid item xs={12} md={8}>
        <Card className="card-container">
          <CardMedia
            component="img"
            height="300"
            image={`${baseUrl}${bookingData.destination.destinationImages[0]?.image_url}`}
            alt={`Destination ${bookingData.destination.name}`}
          />
          <CardContent className="card-content">
            <Typography variant="h6">Điểm đến: {bookingData.destination.name}</Typography>
            <Typography variant="subtitle1">Địa chỉ: {bookingData.destination.location}</Typography>
            <Typography variant="subtitle1">Mô tả: {bookingData.destination.description || 'Không có mô tả'}</Typography>
            <Typography variant="subtitle1">Loại: {typeDisplay}</Typography>
            <Typography variant="subtitle1">Thành phố: {bookingData.destination.city.name}</Typography>
            <Typography variant="subtitle1">Tỉnh: {bookingData.destination.city.province.name}</Typography>
            <Typography variant="subtitle1">Quốc gia: {bookingData.destination.city.province.country}</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Paper elevation={3} className="paper-container">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Thông tin đặt vé</Typography>
              <Box className="ticket-info">
                <Typography variant="subtitle1">Ngày đặt: {bookingData.booking_date}</Typography>
                <Typography variant="subtitle1">Người lớn: {bookingData.adult_tickets}</Typography>
                <Typography variant="subtitle1">Trẻ em: {bookingData.child_tickets}</Typography>
                <Typography variant="subtitle1">Số ngày: {bookingData.days}</Typography>
                <Typography variant="subtitle1">
                  Tổng giá vé: {(bookingData.adult_tickets * bookingData.ticketPrice.adult_price + bookingData.child_tickets * bookingData.ticketPrice.child_price) * bookingData.days} VND
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {showPaymentForm ? (
                <div>
                  <Typography variant="h6">Chọn phương thức thanh toán</Typography>
                  <PaymentForm
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    paymentMethods={paymentMethods}
                    selectedBank={selectedBank}
                    setSelectedBank={setSelectedBank}
                    banks={banks}
                  />
                  <Button variant="contained" color="primary" fullWidth onClick={handlePayment} disabled={loading} sx={{ mt: 2 }}>
                    {loading ? <CircularProgress size={24} /> : 'Xác nhận thanh toán'}
                  </Button>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <QRCodeDisplay qrCodeUrl={qrCodeUrl} />
                  <Typography variant="body2" color="error">QR code hết hạn sau: {timer}s</Typography>
                  <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mt: 2 }}>Hủy</Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PaymentPage;
