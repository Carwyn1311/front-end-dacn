import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Tag, 
  Space, 
  message, 
  Popconfirm,
  Image
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  EyeOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';
import axiosInstance from '../../AxiosInterceptor/Content/axiosInterceptor';

import '../css/DestinationList.css';
import FormCreateDestination from './FormCreateDestination';
import FormViewDestination from './FormViewDestination';

interface DestinationImage {
  id: number;
  image_url: string;
  destination_id: number;
}

interface Destination {
  id: number;
  name: string;
  description: string;
  location: string;
  type: 'DOMESTIC' | 'INTERNATIONAL';
  city: number;
  created_at: string | null;
  destinationImages: DestinationImage[];
}

const DestinationList: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'update' | 'view' | null>(null);

  // Fetch destinations
  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/dest/list');
      setDestinations(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách điểm đến');
    } finally {
      setLoading(false);
    }
  };

  // Delete destination
  const handleDeleteDestination = async (destinationId: number) => {
    try {
      await axiosInstance.delete(`/api/dest/${destinationId}`);
      message.success('Xóa điểm đến thành công');
      fetchDestinations();
    } catch (error) {
      message.error('Lỗi khi xóa điểm đến');
    }
  };

  // Reset form and state
  const handleCloseForm = () => {
    setFormMode(null);
    setSelectedDestination(null);
  };

  // Prepare data for editing
  const handleEditDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setFormMode('update');
  };

  // Prepare for view details
  const handleViewDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setFormMode('view');
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'destlist-column-id'
    },
    {
      title: 'Tên Điểm Đến',
      dataIndex: 'name',
      key: 'name',
      className: 'destlist-column-name',
      render: (text: string, record: Destination) => (
        <div className="destlist-destination-info">
          {record.destinationImages.length > 0 && (
            <Image 
              src={record.destinationImages[0].image_url} 
              alt={text}
              className="destlist-destination-thumbnail"
              width={50}
              height={50}
              preview={false}
            />
          )}
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      className: 'destlist-column-type',
      render: (type: string) => (
        <Tag color={type === 'DOMESTIC' ? 'blue' : 'green'}>
          {type === 'DOMESTIC' ? 'Trong Nước' : 'Quốc Tế'}
        </Tag>
      )
    },
    {
      title: 'Địa Điểm',
      dataIndex: 'location',
      key: 'location',
      className: 'destlist-column-location'
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      className: 'destlist-column-actions',
      render: (text: string, record: Destination) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => handleViewDestination(record)}
            className="destlist-view-btn"
          >
            Xem
          </Button>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEditDestination(record)}
            className="destlist-edit-btn"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDeleteDestination(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button 
              icon={<DeleteOutlined />} 
              danger
              className="destlist-delete-btn"
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="destlist-container">
      <div className="destlist-header">
        <h2 className="destlist-title">Quản Lý Điểm Đến</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setFormMode('create')}
          className="destlist-add-button"
        >
          Thêm Điểm Đến Mới
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={destinations} 
        loading={loading}
        rowKey="id"
        className="destlist-table"
        pagination={{
          className: 'destlist-pagination'
        }}
      />

      {formMode === 'create' && (
        <FormCreateDestination 
          onClose={handleCloseForm}
          onSuccess={fetchDestinations}
        />
      )}

      {formMode === 'view' && selectedDestination && (
        <FormViewDestination 
          destination={selectedDestination}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default DestinationList;