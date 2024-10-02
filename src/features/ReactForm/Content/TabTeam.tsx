import React, { useState } from 'react';
import { Form, Button, Checkbox, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SearchInput from '../../../components/SearchInput/SearchInput';

const TabTeam: React.FC = () => {
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onFinish = (values: any): void => {
    console.log('Form values:', values);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="tab-team-form"
    >
      <h3>Selected member</h3>

      <Form.Item name="showDeactiveMember" valuePropName="checked">
        <Checkbox>Show deactive member</Checkbox>
      </Form.Item>

      <Form.Item name="showInactiveUser" valuePropName="checked">
        <Checkbox>Show Inactive user</Checkbox>
      </Form.Item>

      <Form.Item name="searchTerm">
        <SearchInput
          label="Search by client or project name"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder=""
          prefixIcon={<SearchOutlined />}
          fullWidth={true}
          height="40px"
        />
      </Form.Item>

      <Form.Item>
        <Row justify="end" gutter={16}>
          <Col>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#e91e63', borderColor: '#e91e63' }}>
              Add users
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default TabTeam;
