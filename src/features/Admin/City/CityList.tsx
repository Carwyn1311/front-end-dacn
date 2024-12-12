import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  message,
  Space,
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';
import FormCreateCity from './FormCreateCity';
import FormUpdateCity from './FormUpdateCity';
import FormViewCity from './FormViewCity';
import '../css/CityList.css';

interface City {
  id: number;
  name: string;
  province: number;
}

const CityList: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'update' | 'view' | null>(null);

  // Lấy danh sách thành phố
  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/city/list');
      setCities(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách thành phố');
    } finally {
      setLoading(false);
    }
  };

  // Xóa thành phố
  const handleDeleteCity = async (cityId: number) => {
    try {
      await axiosInstance.delete(`/api/city/${cityId}`);
      message.success('Xóa thành phố thành công');
      fetchCities();
    } catch (error) {
      message.error('Lỗi khi xóa thành phố');
    }
  };

  // Reset form và trạng thái
  const handleCloseForm = () => {
    setFormMode(null);
    setSelectedCity(null);
  };

  // Chuẩn bị dữ liệu để chỉnh sửa
  const handleEditCity = (city: City) => {
    setSelectedCity(city);
    setFormMode('update');
  };

  // Chuẩn bị xem chi tiết
  const handleViewCity = (city: City) => {
    setSelectedCity(city);
    setFormMode('view');
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên Thành Phố',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã Tỉnh',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      render: (text: string, record: City) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewCity(record)}
          >
            Xem
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCity(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDeleteCity(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className='citylist-container'>
      <div className='citylist-header'>
      <h2 className="citylist-title">Quản Lý Thành Phố</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setFormMode('create')}
          className='citylist-add-button'
        >
          Thêm Thành Phố Mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={cities}
        loading={loading}
        rowKey="id"
        className="citylist-table"
        pagination={{
          className: 'citylist-pagination'
        }}
      />

      {formMode === 'create' && (
        <FormCreateCity
          onClose={handleCloseForm}
          onSuccess={fetchCities}
        />
      )}

      {formMode === 'update' && selectedCity && (
        <FormUpdateCity
          city={selectedCity}
          onClose={handleCloseForm}
          onSuccess={fetchCities}
        />
      )}

      {formMode === 'view' && selectedCity && (
        <FormViewCity
          city={selectedCity}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default CityList;
