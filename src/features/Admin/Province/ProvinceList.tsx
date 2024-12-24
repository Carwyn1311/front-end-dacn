import React, { useState, useEffect } from 'react';
import { message, Input, Card, Spin, Form, Button, Space, Popconfirm, Table } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosInstanceToken from '../../AxiosInterceptor/Content/axioslnterceptorToken';
import UpdateProvinceForm from './UpdateProvinceForm';
import '../css/ListMain.css';
import { Province } from '../../Admin/Destination/listdest';

const ProvinceList: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const response = await axiosInstanceToken.get(`/api/province/list`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (Array.isArray(response.data)) {
        setProvinces(response.data);
      } else {
        message.error('Dữ liệu tỉnh không hợp lệ');
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách tỉnh:', error);
      message.error('Lỗi khi tải danh sách tỉnh');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filterProvinces = () => {
    return provinces.filter(province =>
      province.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const showDrawer = (province: Province) => {
    setSelectedProvince(province);
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
    setSelectedProvince(null);
  };

  const columns = [
    {
      title: 'Tên Tỉnh',
      dataIndex: 'name',
      key: 'name',
      className: 'mainlist-column-name', // Sử dụng lớp CSS chính mới
    },
    {
      title: 'Quốc Gia',
      dataIndex: 'country',
      key: 'country',
      className: 'mainlist-column-country', // Sử dụng lớp CSS chính mới
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      className: 'mainlist-column-actions', // Sử dụng lớp CSS chính mới
      render: (text: string, record: Province) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showDrawer(record)} className="mainlist-edit-btn">Sửa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="mainlist-container"> 
      <div className="mainlist-header"> 
        <h2 className="mainlist-title">Danh Sách Tỉnh</h2> 
      </div>

      <Form layout="inline" className="mainlist-search-form">
        <Form.Item>
          <Input
            placeholder="Tìm kiếm tỉnh..."
            value={searchValue}
            onChange={handleSearchChange}
            prefix={<SearchOutlined />}
            allowClear
            className="mainlist-search-input" // Sử dụng lớp CSS chính mới
          />
        </Form.Item>
      </Form>

      {loading ? (
        <div className="mainlist-spin-container">
          <Spin size="large" /> 
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filterProvinces()}
          rowKey="id"
          className="mainlist-table" 
          pagination={{ className: 'mainlist-pagination' }} 
        />
      )}

      <UpdateProvinceForm
        visible={drawerVisible}
        onClose={onClose}
        province={selectedProvince}
        fetchProvinces={fetchProvinces}
      />
    </div>
  );
};

export default ProvinceList;
