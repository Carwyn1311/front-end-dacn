import React, { useState } from 'react';
import './AdminUser.css';
import { Card, Select, Row, Col } from 'antd';
import { PlusOutlined, ImportOutlined, SearchOutlined } from '@ant-design/icons';
import Dropdown from '../../../components/Dropdown/Dropdown';
import AutoSearch from '../../../components/AutoSearchField/AutoSearch';
import Button from '../../../components/Button/Button';

const { Option } = Select;

const AdminUser: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  // Adding explicit return type
  const handleSearchChange = (item: string): void => {
    setSearchValue(item);
  };

  // Sample data for AutoSearch items
  const searchItems = [
    'Username1',
    'Name1',
    'Surname1',
    'Email1',
    'Username2',
    'Name2',
    'Surname2',
    'Email2'
  ];

  return (
    <div className="main-content">
      <div className="user-container">
        <Card title="Users" className="admin-user-card">
          <Row gutter={16} className="admin-buttons">
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ backgroundColor: '#f44336', borderColor: '#f44336', width: '120px', height: '30px', color: 'white', fontSize: '14px' }}
                onClick={() => console.log('Button clicked!')} // Add onClick handler
              >
              New User
              </Button>

            </Col>
            <Col>
              <Button
                icon={<ImportOutlined />}
                style={{ backgroundColor: '#f44336', borderColor: '#f44336', width: '120px', height: '30px', color: 'white', fontSize: '14px' }}
                onClick={() => console.log('Import clicked!')} // Add onClick handler
              >
              Import
              </Button>
            </Col>

            <Col span={6}>
              <Dropdown
                label="Position"
                options={['All', 'Dev', 'Tester', 'IT', 'PM', 'Mentor']}
                defaultValue="All"
                onChange={(value) => console.log('Selected:', value)}
              />
            </Col>
            <Col span={8}>
              <AutoSearch
                items={searchItems}
                onSelectItem={handleSearchChange}
                placeholder="Search by Username, Name, Surname or Email"
                prefix={<SearchOutlined />}
                className="admin-search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                width="340px"
                height="50px"
              />
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col span={4}>
              <Select defaultValue="Active" className="admin-select">
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Col>

            <Col span={4}>
              <Select defaultValue="All" className="admin-select">
                <Option value="all">User Type</Option>
              </Select>
            </Col>

            <Col span={4}>
              <Dropdown
                label="Level"
                options={['All', 'Beginner', 'Intermediate', 'Advanced']}
                defaultValue="All"
                onChange={(value) => console.log('Selected:', value)}
              />
            </Col>

            <Col span={4}>
              <Select defaultValue="All" className="admin-select">
                <Option value="all">Trainer</Option>
              </Select>
            </Col>

            <Col span={4}>
              <Select defaultValue="All" className="admin-select">
                <Option value="all">Branch</Option>
              </Select>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default AdminUser;
