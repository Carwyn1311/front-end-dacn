import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { MoreOutlined, EditOutlined, EyeOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';

interface ProjectItemProps {
  clientName: string
  projectId: string
  projectMembers: string
  memberCount: number
  projectType: string
  projectDate: string
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  clientName,
  projectId,
  projectMembers,
  memberCount,
  projectType,
  projectDate
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" icon={<EyeOutlined />}>
        View
      </Menu.Item>
      <Menu.Item key="3" icon={<StopOutlined />}>
        Deactivate
      </Menu.Item>
      <Menu.Item key="4" icon={<DeleteOutlined />} danger>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ border: '1px solid #e0e0e0', marginBottom: '10px', padding: '10px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0 }}>{clientName}</h3>
          <p style={{ margin: 0 }}>
            Project {projectId} • {projectMembers} • {memberCount} members
          </p>
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button icon={<MoreOutlined />}>Actions</Button>
        </Dropdown>
      </div>
      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px', fontWeight: 500 }}>{projectType}</span>
        <span style={{ backgroundColor: '#4caf50', color: '#fff', padding: '4px 8px', borderRadius: '5px' }}>{projectDate}</span>
      </div>
    </div>
  );
};

export default ProjectItem;
