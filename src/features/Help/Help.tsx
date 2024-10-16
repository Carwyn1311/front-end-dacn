import React from 'react';
import { Card, List } from 'antd';
import './Help.css'; // Import CSS

const Help = () => {
  const contactInfo = [
    { type: 'Website', link: 'https://www.yourwebsite.com', display: 'www.yourwebsite.com' },
    { type: 'Hotline', link: 'tel:+1234567890', display: '+1234567890' },
    { type: 'Gmail', link: 'mailto:your-email@gmail.com', display: 'your-email@gmail.com' },
    { type: 'Zalo', link: 'https://zalo.me/yourzalo', display: 'Zalo Contact' },
    { type: 'Facebook', link: 'https://www.facebook.com/yourprofile', display: 'Facebook Profile' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Liên hệ với chúng tôi" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <List
          itemLayout="horizontal"
          dataSource={contactInfo}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a href={item.link} target="_blank" rel="noopener noreferrer">{item.type}</a>}
                description={<a href={item.link} target="_blank" rel="noopener noreferrer">{item.display}</a>}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Help;
