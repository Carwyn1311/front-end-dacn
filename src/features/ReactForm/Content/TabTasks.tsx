import React, { useState } from 'react';
import { Table, Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import '../.css/TabTasks.css';

interface Task {
  key: string
  name: string
  billable: boolean
}

const TabTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { key: '1', name: 'Task 1', billable: true },
    { key: '2', name: '!@#$', billable: true },
    { key: '3', name: 'DFF', billable: true },
    { key: '4', name: 'GBGdf123123', billable: true },
    { key: '5', name: 'testing_12345', billable: true },
    { key: '6', name: '7', billable: true },
    { key: '7', name: 'h', billable: true },
    { key: '8', name: '66', billable: true },
    { key: '9', name: 'a', billable: true },
    { key: '10', name: 'coding454', billable: true }
  ]);

  const handleDelete = (key: string): void => {
    const newTasks = tasks.filter((task) => task.key !== key);
    setTasks(newTasks);
  };

  const handleCheckboxChange = (key: string, checked: boolean): void => {
    const updatedTasks = tasks.map((task) =>
      task.key === key ? { ...task, billable: checked } : task
    );
    setTasks(updatedTasks);
  };

  const columns = [
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: (_: any, record: Task) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        />
      )
    },
    {
      title: 'Tasks',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Billable',
      dataIndex: 'billable',
      key: 'billable',
      render: (_: any, record: Task) => (
        <Checkbox
          checked={record.billable}
          onChange={(e) => handleCheckboxChange(record.key, e.target.checked)}
        />
      )
    }
  ];

  return (
    <div className="task-table-container">
      <Table
        dataSource={tasks}
        columns={columns}
        pagination={false}
        rowKey="key"
        scroll={{ y: 240 }}
      />
    </div>
  );
};

export default TabTasks;
