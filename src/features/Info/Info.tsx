import React from 'react';

const Info: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Thông tin về hệ thống</h1>
      <ul>
        <li><strong>Version:</strong> 1.0.0</li>
        <li><strong>Người tạo:</strong> Lê Trọng Phúc</li>
        <li><strong>Nhóm phát triển:</strong> Nhóm X</li>
        <li><strong>Liên hệ kỹ thuật:</strong></li>
        <ul>
          <li>Hotline: 0123456789</li>
          <li>Email: techsupport@example.com</li>
        </ul>
      </ul>
    </div>
  );
};

export default Info;
