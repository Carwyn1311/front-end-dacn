import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, message, Popconfirm, Image } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../css/DestinationList.css';
import FormCreateDestination from './FormCreateDestination';
import FormViewDestination from './FormViewDestination';
import {
  classifyDestinations,
  deleteDestination,
  destinationList,
  fetchDestinations,
  Destination,
  Itinerary,
} from './listdest';
import FormUpdateDestination from './form/FormUpdateDestination';

const DestinationList: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'update' | 'view' | null>(null);

  useEffect(() => {
    const loadDestinations = async () => {
      setLoading(true);
      await fetchDestinations();
      setDestinations([...destinationList]);
      setLoading(false);
    };
    loadDestinations();
  }, []);

  const handleDeleteDestination = async (destinationId: number) => {
    setLoading(true);
    await deleteDestination(destinationId);
    setDestinations([...destinationList]);
    setLoading(false);
  };

  const handleCloseForm = () => {
    setFormMode(null);
    setSelectedDestination(null);
  };

  const handleEditDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setFormMode('update');
  };

  const handleViewDestination = (destination: Destination) => {
    setSelectedDestination(destination);
    setFormMode('view');
  };

  const renderItineraries = (itineraries: Itinerary[]) => {
    return itineraries.map((itinerary) => (
      <div key={itinerary.id} style={{ marginBottom: '8px' }}>
        <strong>Lịch trình #{itinerary.id}</strong>
        <p>
          Bắt đầu: {moment(itinerary.start_date).format('DD-MM-YYYY HH:mm')} <br />
          Kết thúc: {moment(itinerary.end_date).format('DD-MM-YYYY HH:mm')}
        </p>
        <ul>
          {itinerary.activities.map((activity: { id: React.Key | null | undefined; activity_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; start_time: moment.MomentInput; end_time: moment.MomentInput; }) => (
            <li key={activity.id}>
              {activity.activity_name} ({moment(activity.start_time).format('HH:mm')} - {moment(activity.end_time).format('HH:mm')})
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'destlist-column-id',
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
              src={`${process.env.REACT_APP_BASE_URL}${record.destinationImages[0].image_url}`}
              alt={text}
              className="destlist-destination-thumbnail"
              width={50}
              height={50}
              preview={false}
            />
          )}
          <span>{text}</span>
        </div>
      ),
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
      ),
    },
    {
      title: 'Địa Điểm',
      dataIndex: 'location',
      key: 'location',
      className: 'destlist-column-location',
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
        pagination={{ className: 'destlist-pagination' }}
      />

      {formMode === 'create' && (
        <FormCreateDestination onClose={handleCloseForm} onSuccess={() => setDestinations([...destinationList])} />
      )}

      {formMode === 'view' && selectedDestination && (
        <FormViewDestination destination={selectedDestination} onClose={handleCloseForm} />
      )}

      {formMode === 'update' && selectedDestination && (
        <FormUpdateDestination
          visible={formMode === 'update'}
          onClose={handleCloseForm}
          destination={selectedDestination}
          onSuccess={() => setDestinations([...destinationList])}
        />
      )}
    </div>
  );
};

export default DestinationList;
