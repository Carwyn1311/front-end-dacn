import '../.css/TravelPageHaNoi.css';
 // Đảm bảo đường dẫn CSS chính xác
import React from 'react';
import { Layout, Typography, Row, Col, Card, Image } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const TravelPageHaNoi: React.FC = () => {
  return (
    <Layout className="travel-layout">
      {/* Header */}
      <Header className="travel-header">
        <Title level={2} className="header-title">Du lịch Hà Nội</Title>
      </Header>

      {/* Content */}
      <Content className="travel-content">
        <div className="travel-container">
          <Title level={3} className="travel-subtitle">Khám phá thủ đô ngàn năm văn hiến</Title>
          <Paragraph className="travel-description">
            Hà Nội, thủ đô của Việt Nam, không chỉ nổi tiếng với nét đẹp cổ kính, mà còn là trung tâm văn hóa, chính trị và kinh tế hàng đầu. 
            Với những di tích lịch sử, ẩm thực đặc sắc và văn hóa phong phú, Hà Nội là điểm đến không thể bỏ qua khi đến Việt Nam.
          </Paragraph>

          <Row gutter={[16, 16]} justify="center">
            {/* Hồ Gươm */}
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="travel-card"
                cover={
                  <Image
                    alt="Hồ Gươm"
                    src="/assets/images/ho-guom.jpg"
                    preview={false}
                    className="travel-image"
                  />
                }
              >
                <Title level={4}>Hồ Gươm</Title>
                <Paragraph>
                  Hồ Gươm, biểu tượng của Hà Nội, nằm giữa trung tâm thành phố. Nơi đây nổi tiếng với Tháp Rùa và cầu Thê Húc dẫn đến đền Ngọc Sơn.
                </Paragraph>
              </Card>
            </Col>

            {/* Văn Miếu - Quốc Tử Giám */}
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="travel-card"
                cover={
                  <Image
                    alt="Văn Miếu - Quốc Tử Giám"
                    src="/assets/images/van-mieu.jpg"
                    preview={false}
                    className="travel-image"
                  />
                }
              >
                <Title level={4}>Văn Miếu - Quốc Tử Giám</Title>
                <Paragraph>
                  Là trường đại học đầu tiên của Việt Nam, Văn Miếu - Quốc Tử Giám là nơi tôn vinh truyền thống học tập và văn hóa của dân tộc.
                </Paragraph>
              </Card>
            </Col>

            {/* Phố cổ Hà Nội */}
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                className="travel-card"
                cover={
                  <Image
                    alt="Phố cổ Hà Nội"
                    src="/assets/images/pho-co.jpg"
                    preview={false}
                    className="travel-image"
                  />
                }
              >
                <Title level={4}>Phố cổ Hà Nội</Title>
                <Paragraph>
                  Phố cổ Hà Nội là nơi giao thoa giữa nét truyền thống và hiện đại, với 36 phố phường nổi tiếng và ẩm thực đường phố phong phú.
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

export default TravelPageHaNoi;
