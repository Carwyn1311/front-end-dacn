import React, { useState, useEffect } from 'react';
import { message, Input, List, Card, Spin, Form, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { TokenAuthService } from '../../TokenAuthService/TokenAuthService';

const { Option } = Select;

interface CityDTO {
  id: number;
  name: string;
  province: number;
}

const CityList: React.FC = () => {
  const [cities, setCities] = useState<CityDTO[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [provinceFilter, setProvinceFilter] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchCities();
  }, []);

  // Lấy danh sách thành phố từ API
  const fetchCities = async () => {
    setLoading(true);
    try {
      // Lấy JWT từ TokenAuthService
      const token = TokenAuthService.getToken();
      const user = JSON.parse(localStorage.getItem('userData') || '{}'); // Lấy thông tin user từ localStorage

      // Kiểm tra nếu không có token hoặc user
      if (!token || !user) {
        message.error('Bạn cần đăng nhập để xem danh sách thành phố');
        return;
      }

      // Lấy dữ liệu thành phố từ API với header Authorization
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/city/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Kiểm tra dữ liệu nhận được và in ra console
      console.log('Dữ liệu thành phố nhận được:', response.data);

      // Kiểm tra xem có phải là mảng không và in ra console dữ liệu theo yêu cầu
      if (Array.isArray(response.data)) {
        setCities(response.data);
        // In dữ liệu ra console theo format yêu cầu
        console.log(JSON.stringify(response.data, null, 2));  // In đẹp hơn
      } else {
        message.error('Dữ liệu thành phố không hợp lệ');
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      message.error('Lỗi khi tải danh sách thành phố');
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật giá trị tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Cập nhật bộ lọc tỉnh
  const handleProvinceChange = (value: number) => {
    setProvinceFilter(value);
  };

  // Lọc danh sách thành phố theo giá trị tìm kiếm và bộ lọc tỉnh
  const filterCities = () => {
    return cities.filter(city => {
      const matchesSearch = city.name.toLowerCase().includes(searchValue.toLowerCase());
      const matchesProvince = provinceFilter ? city.province === provinceFilter : true;
      return matchesSearch && matchesProvince;
    });
  };

  return (
    <div className="city-list">
      <Card title="Danh Sách Thành Phố" style={{ width: '100%' }}>
        <Form layout="inline" style={{ marginBottom: '20px' }}>
          <Form.Item>
            <Input
              placeholder="Tìm kiếm thành phố..."
              value={searchValue}
              onChange={handleSearchChange}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Form.Item>
          <Form.Item label="Chọn tỉnh" name="province">
            <Select
              placeholder="Chọn tỉnh"
              onChange={handleProvinceChange}
              style={{ width: 200 }}
            >
              <Option value={1}>Tỉnh 1</Option>
              <Option value={2}>Tỉnh 2</Option>
              <Option value={3}>Tỉnh 3</Option>
            </Select>
          </Form.Item>
        </Form>
        
        {loading ? (
          <Spin size="large" />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={filterCities()}
            renderItem={(city) => (
              <List.Item>
                <List.Item.Meta
                  title={city.name}
                  description={`Province ID: ${city.province}`}
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default CityList;
