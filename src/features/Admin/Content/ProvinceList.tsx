import React, { useState, useEffect } from 'react';
import { message, Input, List, Card, Spin, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const ProvinceList: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Định nghĩa interface Province để xác định kiểu dữ liệu trả về từ API
  interface Province {
    id: number;
    name: string;
    country: string;
  }

  useEffect(() => {
    fetchProvinces();
  }, []);

  // Lấy danh sách tỉnh từ API
  const fetchProvinces = async () => {
    setLoading(true);
    try {
      // Lấy JWT từ localStorage
      const token = localStorage.getItem('jwt');
      const user = JSON.parse(localStorage.getItem('userData') || '{}'); // Lấy thông tin user từ localStorage

      // Kiểm tra nếu không có token hoặc user
      if (!token || !user) {
        message.error('Bạn cần đăng nhập để xem danh sách tỉnh');
        return;
      }

      // Lấy dữ liệu tỉnh từ API với header Authorization
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/province/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Kiểm tra dữ liệu nhận được và in ra console
      console.log('Dữ liệu tỉnh nhận được:', response.data);

      // Kiểm tra xem có phải là mảng không và in ra console dữ liệu theo yêu cầu
      if (Array.isArray(response.data)) {
        setProvinces(response.data);
        // In dữ liệu ra console theo format yêu cầu
        console.log(JSON.stringify(response.data, null, 2));  // In đẹp hơn
      } else {
        message.error('Dữ liệu tỉnh không hợp lệ');
      }
    } catch (error) {
      console.error('Error fetching provinces:', error);
      message.error('Lỗi khi tải danh sách tỉnh');
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật giá trị tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Lọc danh sách tỉnh theo giá trị tìm kiếm
  const filterProvinces = () => {
    return provinces.filter(province =>
      province.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <div className="province-list">
      <Card title="Danh Sách Tỉnh" style={{ width: '100%' }}>
        <Form layout="inline" style={{ marginBottom: '20px' }}>
          <Form.Item>
            <Input
              placeholder="Tìm kiếm tỉnh..."
              value={searchValue}
              onChange={handleSearchChange}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Form.Item>
        </Form>

        {loading ? (
          <Spin size="large" />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={filterProvinces()}
            renderItem={(province) => (
              <List.Item>
                <List.Item.Meta
                  title={province.name}
                  description={`Country: ${province.country}`}
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default ProvinceList;
