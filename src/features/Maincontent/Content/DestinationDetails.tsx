import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { message } from 'antd';
import { Destination } from './DestinationTypes';
import '../css/DestDetail.css';
import ItineraryCard from '../components/ItineraryCard';
import ImageGallery from '../components/ImageGallery';
import TicketSection from '../components/TicketSection';
import LikeSection from '../components/LikeSection';
import CommentsSection from '../components/CommentsSection';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [liked, setLiked] = useState<boolean>(false);

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

  const handleBookNow = () => {
    // Xử lý đặt vé
    message.success('Đặt vé thành công!');
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
        {destination.itineraries.map((itinerary, index) => (
          <ItineraryCard key={index} itinerary={itinerary} />
        ))}
      </div>

      <div className="right-column">
        <h1>{destination.name}</h1>
        <p>{destination.description}</p>
        
        <ImageGallery images={destination.destinationImages} />

        <TicketSection adultCount={adultCount} setAdultCount={setAdultCount} childCount={childCount} setChildCount={setChildCount} handleBookNow={handleBookNow} />

        <LikeSection liked={liked} handleLike={handleLike} />

        <CommentsSection comments={comments} newComment={newComment} setNewComment={setNewComment} handleAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default DestinationDetail;
