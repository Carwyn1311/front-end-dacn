// FormCity.tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import message from 'antd/es/message';
import '../css/FormCity.css';

interface CityDTO {
  id: number;
  name: string;
  province: number;
}

interface FormCityProps {
  city: CityDTO | null;
  onSave: (cityData: CityDTO) => Promise<void>;
  onCancel: () => void;
}

const FormCity: React.FC<FormCityProps> = ({ city, onSave, onCancel }) => {
  const [name, setName] = useState<string>('');
  const [province, setProvince] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (city) {
      setName(city.name);
      setProvince(city.province);
      setIsUpdating(true);
    } else {
      setName('');
      setProvince(0);
      setIsUpdating(false);
    }
  }, [city]);

  const handleSubmit = async () => {
    if (!name || province === 0) {
      message.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Nếu đang cập nhật, thêm ID vào cityData, nếu không thì không cần ID
    const cityData: CityDTO = isUpdating
      ? { id: city?.id || 0, name, province }  // Chỉnh sửa thành phố
      : { id: 0, name, province };  // Thêm thành phố mới, ID = 0 (hoặc bỏ ID)

    try {
      await onSave(cityData);
      onCancel(); // Đóng form sau khi lưu thành công
    } catch (error) {
      message.error('Lỗi khi lưu thành phố');
    }
  };

  return (
    <div className="form-city">
      <Typography variant="h6">{isUpdating ? 'Cập nhật thành phố' : 'Thêm thành phố'}</Typography>
      <TextField
        label="Tên thành phố"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Tỉnh"
        variant="outlined"
        fullWidth
        value={province}
        onChange={(e) => setProvince(Number(e.target.value))}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        style={{ marginTop: '20px' }}
      >
        {isUpdating ? 'Cập nhật' : 'Thêm'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onCancel}
        fullWidth
        style={{ marginTop: '10px' }}
      >
        Hủy
      </Button>
    </div>
  );
};

export default FormCity;
