import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress, Button, Typography } from '@mui/material';
import { TokenAuthService } from '../../TokenAuthService/TokenAuthService';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import message from 'antd/es/message';
import '../css/CityList.css';

interface CityDTO {
  id: number;
  name: string;
  province: number;
}

const CityList: React.FC = () => {
  const [cities, setCities] = useState<CityDTO[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newCity, setNewCity] = useState<CityDTO>({ id: 0, name: '', province: 0 });

  // Lấy danh sách thành phố từ API
  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/city/list'); // Lấy danh sách thành phố
      setCities(response.data);
    } catch (err) {
      setError('Không thể tải dữ liệu thành phố');
      message.error('Không thể tải dữ liệu thành phố');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Thêm mới thành phố
  const handleAddCity = async () => {
    try {
      const response = await axiosInstance.post('/api/city/create', newCity);
      setCities([...cities, response.data]);
      setNewCity({ id: 0, name: '', province: 0 }); // Reset form sau khi thêm
      message.success('Thêm thành công');
    } catch (err) {
      message.error('Không thể thêm thành phố');
    }
  };

  // Cập nhật thành phố
  const handleUpdateCity = async (id: number) => {
    try {
      const updatedCity = { ...newCity, id };
      const response = await axiosInstance.put(`/api/city/${id}`, updatedCity);
      setCities(cities.map(city => (city.id === id ? response.data : city)));
      setNewCity({ id: 0, name: '', province: 0 }); // Reset form
      message.success('Cập nhật thành công');
    } catch (err) {
      message.error('Không thể cập nhật thành phố');
    }
  };

  // Xóa thành phố
  const handleDeleteCity = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/city/${id}`);
      setCities(cities.filter(city => city.id !== id));
      message.success('Xóa thành công');
    } catch (err) {
      message.error('Không thể xóa thành phố');
    }
  };

  // Render danh sách thành phố
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="citylist-container">
      <Typography variant="h4">Danh sách Thành Phố</Typography>

      {/* Form thêm thành phố */}
      <div className="citylist-form">
        <TextField
          label="Tên Thành Phố"
          variant="outlined"
          value={newCity.name}
          onChange={e => setNewCity({ ...newCity, name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Mã Tỉnh"
          variant="outlined"
          value={newCity.province}
          onChange={e => setNewCity({ ...newCity, province: parseInt(e.target.value) })}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddCity}>
          Thêm Thành Phố
        </Button>
      </div>

      {/* Danh sách thành phố */}
      <div className="citylist">
        {cities.filter(city => city.name.toLowerCase().includes(searchValue.toLowerCase())).map((city) => (
          <div key={city.id} className="citylist-item">
            <div className="citylist-item-details">
              <Typography variant="h6">{city.name}</Typography>
              <Typography variant="body2">Mã Tỉnh: {city.province}</Typography>
            </div>
            <div className="citylist-item-actions">
              <Button variant="contained" color="primary" onClick={() => handleUpdateCity(city.id)}>
                Cập Nhật
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteCity(city.id)}>
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityList;
