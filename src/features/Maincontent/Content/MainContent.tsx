import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

const MainContent: React.FC = () => {
  return (
    <Layout className="main-content-layout">
      <Content className="main-content">
        <p>Welcome to the MainContent component!</p>
        <p>This is a placeholder text for demonstration purposes.</p>
      </Content>
    </Layout>
  );
};

export default MainContent;
