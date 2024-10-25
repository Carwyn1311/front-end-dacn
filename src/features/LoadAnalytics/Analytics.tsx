import React, { useState, useEffect, useRef } from 'react';
import { message as antdMessage } from 'antd';
import './Analytics.css'; // Import file CSS

interface AnalyticsData {
  totalProcessedResponses: number;
  averageResponseTime: number;
  totalUniqueUsers: number;
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const successMessageShownRef = useRef(false); // Sử dụng useRef để theo dõi trạng thái thông báo đã hiển thị

  // Gọi API để tải dữ liệu phân tích khi component được render
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await fetch('https://chat-api-backend-x4dl.onrender.com/api/conversations/analytics');
        if (!response.ok) throw new Error('Không thể tải dữ liệu phân tích');

        const analytics: AnalyticsData = await response.json();
        setAnalyticsData(analytics);

        // Chỉ hiển thị thông báo thành công một lần
        if (!successMessageShownRef.current) {
          antdMessage.success('Tải dữ liệu phân tích thành công');
          successMessageShownRef.current = true; // Đánh dấu thông báo đã được hiển thị
        }
      } catch (error) {
        console.error('Error loading analytics:', error);
        antdMessage.error('Lỗi khi tải dữ liệu: ' + (error as Error).message);
      }
    };

    loadAnalytics(); // Gọi hàm loadAnalytics khi component được render
  }, []); // Dependency array rỗng để chỉ gọi một lần khi component mount

  return (
    <div className="analytics-container">
      <h3>Phân tích tổng thể</h3>
      {analyticsData ? (
        <div className="analytics-display">
          <p>Tổng số câu hỏi đã xử lý: {analyticsData.totalProcessedResponses}</p>
          <p>Thời gian phản hồi trung bình: {analyticsData.averageResponseTime.toFixed(2)} ms</p>
          <p>Tổng số người dùng duy nhất: {analyticsData.totalUniqueUsers}</p>
        </div>
      ) : (
        <p>Đang tải dữ liệu...</p> // Hiển thị thông báo đang tải trong khi chờ dữ liệu
      )}
    </div>
  );
};

export default Analytics;
