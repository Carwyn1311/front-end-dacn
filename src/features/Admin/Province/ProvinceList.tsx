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

  const handleDeleteProvince = async (id: number) => {
    try {
      await axiosInstanceToken.delete(`/api/province/${id}`);
      message.success('Xóa tỉnh thành công');
      fetchProvinces();
    } catch (error) {
      console.error('Lỗi khi xóa tỉnh:', error);
      message.error('Lỗi khi xóa tỉnh');
    }
  };

  const columns = [
    {
      title: 'Tên Tỉnh',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quốc Gia',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      render: (text: string, record: Province) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showDrawer(record)}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDeleteProvince(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="citylist-container"> 
      <div className="citylist-header"> 
        <h2 className="citylist-title">Danh Sách Tỉnh</h2> 
      </div>

      <Form layout="inline" className="citylist-search-form">
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
        <div className="citylist-spin-container">
          <Spin size="large" /> 
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filterProvinces()}
          rowKey="id"
          className="citylist-table" 
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
