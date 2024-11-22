import React from 'react';
import { Layout, Typography, Row, Col, Card, Image } from 'antd';
import '../.css/TravelPageDongBac.css';
 // Sửa đường dẫn CSS cho phù hợp với cấu trúc dự án

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const TravelPageDongBac: React.FC = () => {
  return (
    <Layout className="travel-layout">
      {/* Header */}
      <Header className="travel-header">
        <Title level={2} className="header-title">Du lịch Đông Bắc - Tây Bắc</Title>
      </Header>

      {/* Content */}
      <Content className="travel-content">
        <div className="travel-container">
          <Row gutter={[16, 16]} justify="center">
            {/* Đông Bắc */}
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="travel-card"
                cover={
                  <Image
                    alt="Đông Bắc"
                    //src="/assets/images/dongbac.jpg" // Thay placeholder bằng đường dẫn ảnh thực
                    preview={false}
                    className="travel-image"
                  />
                }
              >
                <Title level={4}>Đông Bắc</Title>
                <Paragraph>
                  Khám phá vẻ đẹp hùng vĩ của Hà Giang, Cao Bằng và những ngọn núi trùng điệp nơi Đông Bắc.
                </Paragraph>
              </Card>
            </Col>

            {/* Tây Bắc */}
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="travel-card"
                cover={
                  <Image
                    alt="Tây Bắc"
                    //src="/assets/images/taybac.jpg" // Thay placeholder bằng đường dẫn ảnh thực
                    preview={false}
                    className="travel-image"
                  />
                }
              >
                <Title level={4}>Tây Bắc</Title>
                <Paragraph>
                  Thưởng thức mùa lúa chín vàng tại Mù Cang Chải, Sapa và những cung đường đèo tuyệt đẹp ở Tây Bắc.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      {/* Footer */}
      <Footer className="travel-footer">
        <Paragraph>© 2024 Du lịch Việt Nam. Tất cả các quyền được bảo lưu.</Paragraph>
      </Footer>
    </Layout>
  );
};

export default TravelPageDongBac;
