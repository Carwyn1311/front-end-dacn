import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { message, Modal, Button } from 'antd';
import { Destination } from './DestinationTypes';
import '../css/DestDetail.css';
import ItineraryCard from '../components/ItineraryCard';
import ImageGallery from '../components/ImageGallery';
import TicketSection from '../components/TicketSection';
import LikeSection from '../components/LikeSection';
import CommentsSection from '../components/CommentsSection';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';
import moment from 'moment';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [bookingDate, setBookingDate] = useState<string>(moment().format("YYYY-MM-DDTHH:mm:ss.SSS"));
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [days, setDays] = useState<number>(1);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [liked, setLiked] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axiosInstance.get(`/api/dest/${id}`);
        setDestination(response.data);
      } catch (error) {
        message.error('Không thể tải chi tiết điểm đến');
      }
    };

    fetchDestination();
  }, [id]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const bookingData = {
      booking_date: moment(bookingDate).format("YYYY-MM-DDTHH:mm:ss.SSS"),
      adult_tickets: adultCount,
      child_tickets: childCount,
      status: 'PENDING',
      days: days,
      destination_id: destination?.id,
    };

    console.log('Dữ liệu gửi đi:', bookingData);

    try {
      const token = localStorage.getItem('token');
      await axiosInstanceToken.post('/api/bookings/create', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Đặt vé thành công!');
    } catch (error) {
      message.error('Đặt vé thất bại.');
    }
    
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  if (!destination) {
    return <div>Loading...</div>;
  }

  return (
    <div className="destination-detail">
      <div className="left-column">
        <h2>Hành trình</h2>
        <ItineraryCard itineraries={destination.itineraries} />
      </div>

      <div className="right-column">
        <h1>{destination.name}</h1>
        <p>{destination.description}</p>
        <ImageGallery images={destination.destinationImages} />

        <TicketSection
          bookingDate={bookingDate}
          setBookingDate={setBookingDate}
          adultCount={adultCount}
          setAdultCount={setAdultCount}
          childCount={childCount}
          setChildCount={setChildCount}
          days={days}
          setDays={setDays}
          handleBookNow={showModal}
          ticketPrice={destination.ticketPrice}
        />

        <LikeSection liked={liked} handleLike={handleLike} />

        <CommentsSection
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      </div>

      <Modal title="Xác nhận đặt vé" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Ngày đặt: {bookingDate}</p>
        <p>Người lớn: {adultCount}</p>
        <p>Trẻ em: {childCount}</p>
        <p>Số ngày: {days}</p>
        <p>Tổng giá vé: {(adultCount * destination.ticketPrice.adult_price + childCount * destination.ticketPrice.child_price) * days} VND</p>
      </Modal>
    </div>
  );
};

export default DestinationDetail;
