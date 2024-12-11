// CityList.tsx
import React, { useState, useEffect } from 'react';
import { CircularProgress, Button, Typography, FormControlLabel, Switch } from '@mui/material';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import message from 'antd/es/message';
import FormCity from './FormCity';
import '../css/CityList.css';

interface CityDTO {
  id: number;
  name: string;
  province: number;
}

const CityList: React.FC = () => {
  const [cities, setCities] = useState<CityDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<CityDTO | null>(null); // Thành phố đang chỉnh sửa
  const [isTwoColumns, setIsTwoColumns] = useState<boolean>(false);

  // Lấy danh sách thành phố từ API
  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/city/list');
      setCities(response.data);
    } catch (err) {
      setError('Không thể tải dữ liệu thành phố');
      message.error('Không thể tải dữ liệu thành phố');
    } finally {
      setLoading(false);
    }
  };

  // Tạo mới thành phố
  const createCity = async (cityData: CityDTO) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const user = JSON.parse(localStorage.getItem('userData') || '{}');

      if (!token || !user) {
        message.error('Bạn cần đăng nhập để tạo thành phố');
        return;
      }

      const response = await axiosInstance.post('/api/city/create', cityData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Thành phố đã tạo:', response.data);
      message.success('Tạo thành phố thành công!');
      fetchCities(); // Cập nhật danh sách sau khi tạo mới
    } catch (error) {
      console.error('Lỗi khi tạo thành phố:', error);
      message.error('Lỗi khi tạo thành phố');
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật thành phố
  const updateCity = async (cityId: number, cityData: CityDTO) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const user = JSON.parse(localStorage.getItem('userData') || '{}');

      if (!token || !user) {
        message.error('Bạn cần đăng nhập để cập nhật thành phố');
        return;
      }

      const response = await axiosInstance.put(`/api/city/${cityId}`, cityData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Thành phố đã cập nhật:', response.data);
      message.success('Cập nhật thành phố thành công!');
      fetchCities(); // Cập nhật danh sách sau khi chỉnh sửa
    } catch (error) {
      console.error('Lỗi khi cập nhật thành phố:', error);
      message.error('Lỗi khi cập nhật thành phố');
    } finally {
      setLoading(false);
    }
  };

  // Chọn thành phố để chỉnh sửa
  const handleEditCity = (city: CityDTO) => {
    setSelectedCity(city);
    setShowForm(true);
  };

  // Đóng form
  const handleCancel = () => {
    setSelectedCity(null);
    setShowForm(false);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="city-list">
      <Typography variant="h4">Danh Sách Thành Phố</Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div className="city-table">
          {cities.map((city) => (
            <div key={city.id} className="city-item">
              <Typography variant="body1">{city.name}</Typography>
              <Button variant="outlined" onClick={() => handleEditCity(city)}>
                Chỉnh Sửa
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
        Thêm Thành Phố Mới
      </Button>

      {showForm && (
        <FormCity
          city={selectedCity}
          onSave={(cityData) => {
            if (selectedCity) {
              return updateCity(selectedCity.id, cityData);
            } else {
              return createCity(cityData);
            }
          }}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CityList;
