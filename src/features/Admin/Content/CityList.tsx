import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress, Button, Typography, Grid, FormControlLabel, Switch } from '@mui/material';
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
  const [isTwoColumns, setIsTwoColumns] = useState<boolean>(false); // Trạng thái để chuyển giữa 1 hàng và 2 hàng

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

  useEffect(() => {
    fetchCities();
  }, []);

  // Thêm thành phố mới
  const handleAddCity = async () => {
    try {
      const response = await axiosInstance.post('/api/city/create', newCity);
      setCities([...cities, response.data]);
      setNewCity({ id: 0, name: '', province: 0 });
    } catch (err) {
      message.error('Thêm thành phố thất bại');
    }
  };

  // Xử lý thay đổi trạng thái 2 cột
  const handleColumnSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTwoColumns(event.target.checked);
  };

  return (
    <div className="citylist-container">
      <Typography variant="h4" className="citylist-header">Danh Sách Thành Phố</Typography>

      {/* Thanh tìm kiếm */}
      <div className="citylist-search">
        <TextField
          label="Tìm kiếm thành phố"
          variant="outlined"
          fullWidth
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="citylist-search-input"
        />
      </div>

      {/* Chọn hiển thị 1 cột hoặc 2 cột */}
      <div className="citylist-column-toggle">
        <FormControlLabel
          control={<Switch checked={isTwoColumns} onChange={handleColumnSwitch} />}
          label="Hiển thị 2 cột"
        />
      </div>

      {/* Hiển thị danh sách thành phố */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2} className={`citylist-grid ${isTwoColumns ? 'two-columns' : 'one-column'}`}>
          {cities.filter(city => city.name.toLowerCase().includes(searchValue.toLowerCase())).map(city => (
            <Grid item xs={12} sm={6} md={4} key={city.id} className="citylist-card">
              <div className="citylist-card-content">
                <Typography variant="h6" className="citylist-card-title">{city.name}</Typography>
                <Typography variant="body2" color="textSecondary">{`Province ID: ${city.province}`}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Nút thêm thành phố mới */}
      <Button variant="contained" color="primary" onClick={handleAddCity} className="citylist-add-btn">
        Thêm Thành Phố Mới
      </Button>
    </div>
  );
};

export default CityList;
