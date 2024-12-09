import React, { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import { Button, TextField, CircularProgress, Typography } from '@mui/material';
import message from 'antd/es/message';
import '../css/DestinationList.css';

interface DestinationDTO {
  id: number;
  name: string;
  description: string;
  location: string;
  created_at: string;
}

const DestinationList: React.FC = () => {
  const [destinations, setDestinations] = useState<DestinationDTO[]>([]);
  const [newDestination, setNewDestination] = useState<DestinationDTO>({
    id: 0,
    name: '',
    description: '',
    location: '',
    created_at: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm lấy tất cả danh sách địa điểm
  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/dest/list');
      setDestinations(response.data);
    } catch (err) {
      setError('Không thể tải dữ liệu địa điểm');
      message.error('Không thể tải dữ liệu địa điểm');
    } finally {
      setLoading(false);
    }
  };

  // Hàm thêm mới địa điểm
  const handleAddDestination = async () => {
    try {
      const response = await axiosInstance.post('/api/dest/create', newDestination);
      setDestinations([...destinations, response.data]);
      setNewDestination({
        id: 0,
        name: '',
        description: '',
        location: '',
        created_at: ''
      });
      message.success('Thêm địa điểm thành công');
    } catch (err) {
      message.error('Không thể thêm địa điểm');
    }
  };

  // Hàm upload file mô tả cho một địa điểm
  const handleUploadDescriptionFile = async (destinationId: number, file: File) => {
    const formData = new FormData();
    formData.append('descriptionFile', file);

    try {
      await axiosInstance.post(`/api/dest/upload-description-file/${destinationId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Tải file mô tả lên thành công');
    } catch (err) {
      message.error('Không thể tải file mô tả lên');
    }
  };

  // Hàm cập nhật địa điểm
  const handleUpdateDestination = async (destination: DestinationDTO) => {
    try {
      const response = await axiosInstance.put('/api/dest/update', destination);
      const updatedDestinations = destinations.map((dest) =>
        dest.id === destination.id ? response.data : dest
      );
      setDestinations(updatedDestinations);
      message.success('Cập nhật địa điểm thành công');
    } catch (err) {
      message.error('Không thể cập nhật địa điểm');
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className="destination-list-container">
      <Typography variant="h4" className="destination-list-title">
        Danh sách tất cả các tour
      </Typography>
      
      {loading && <CircularProgress />}
      {error && <div className="error-message">{error}</div>}

      <div className="destination-form">
        <TextField
          label="Tên địa điểm"
          value={newDestination.name}
          onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Mô tả"
          value={newDestination.description}
          onChange={(e) => setNewDestination({ ...newDestination, description: e.target.value })}
          fullWidth
        />
        <TextField
          label="Vị trí"
          value={newDestination.location}
          onChange={(e) => setNewDestination({ ...newDestination, location: e.target.value })}
          fullWidth
        />
        <Button onClick={handleAddDestination} variant="contained" color="primary">
          Thêm địa điểm
        </Button>
      </div>

      <div className="destination-items-container">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-item">
            <Typography variant="h6">{destination.name}</Typography>
            <Typography variant="body2">{destination.description}</Typography>
            <Button
              onClick={() => handleUpdateDestination(destination)}
              variant="outlined"
              color="primary"
            >
              Cập nhật
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationList;
