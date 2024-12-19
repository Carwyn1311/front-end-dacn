import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { message, Form, Input, Button, List, Avatar, Card, Timeline } from 'antd';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Destination, Itinerary, Activity } from './DestinationTypes';
import '../css/DestDetail.css';

// Định nghĩa baseUrl
const baseUrl = process.env.REACT_APP_BASE_URL;

const sampleItineraries: Itinerary[] = [
  {
    id: 1,
    start_date: '2023-12-20',
    end_date: '2023-12-25',
    activities: [
      {
        id: 1,
        activity_name: 'Đi thăm bãi biển',
        start_time: '2023-12-20T08:00:00',
        end_time: '2023-12-20T10:00:00',
      },
      {
        id: 2,
        activity_name: 'Tham quan thành phố',
        start_time: '2023-12-21T09:00:00',
        end_time: '2023-12-21T12:00:00',
      },
    ],
  },
  {
    id: 2,
    start_date: '2023-12-26',
    end_date: '2023-12-30',
    activities: [
      {
        id: 3,
        activity_name: 'Tham quan bảo tàng',
        start_time: '2023-12-26T10:00:00',
        end_time: '2023-12-26T12:00:00',
      },
      {
        id: 4,
        activity_name: 'Mua sắm ở chợ đêm',
        start_time: '2023-12-27T18:00:00',
        end_time: '2023-12-27T20:00:00',
      },
    ],
  },
];

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
        <h2>Hành trình và tuyến đường đi</h2>
        {sampleItineraries.map((itinerary, index) => (
          <Card key={index} title={`Hành trình từ ${itinerary.start_date} đến ${itinerary.end_date}`} style={{ marginBottom: '20px' }}>
            <Timeline>
              {itinerary.activities.map((activity, idx) => (
                <Timeline.Item key={idx}>
                  <p><strong>Hoạt động:</strong> {activity.activity_name}</p>
                  <p><strong>Thời gian bắt đầu:</strong> {activity.start_time}</p>
                  <p><strong>Thời gian kết thúc:</strong> {activity.end_time}</p>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        ))}
      </div>

      <div className="right-column">
        <h1>{destination.name}</h1>
        <p>{destination.description}</p>
        {destination.destinationImages.map((image, index) => (
          <img key={index} src={`${baseUrl}${image.image_url}`} alt={destination.name} />
        ))}

        <div className="ticket-section">
          <h2>Giá vé</h2>
          <Form layout="inline">
            <Form.Item label="Người lớn">
              <Input type="number" min="1" value={adultCount} onChange={(e) => setAdultCount(Number(e.target.value))} />
            </Form.Item>
            <Form.Item label="Trẻ em">
              <Input type="number" min="0" value={childCount} onChange={(e) => setChildCount(Number(e.target.value))} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleBookNow}>Đặt vé</Button>
            </Form.Item>
          </Form>
        </div>

        <div className="like-section">
          <Button type="default" onClick={handleLike}>
            {liked ? <Favorite /> : <FavoriteBorder />}
            {liked ? 'Bỏ thích' : 'Yêu thích'}
          </Button>
        </div>

        <div className="comments-section">
          <h2>Bình luận</h2>
          <List
            className="comment-list"
            header={`${comments.length} bình luận`}
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(comment, index) => (
              <li key={index}>
                <Avatar src="https://via.placeholder.com/40" alt="User Avatar" />
                {comment}
              </li>
            )}
          />
          <div className="comment-input">
            <Input.TextArea
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Nhập bình luận của bạn"
            />
            <Button type="primary" onClick={handleAddComment} style={{ marginTop: '10px' }}>
              Thêm bình luận
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
