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
  const successMessageShownRef = useRef(false); 

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await fetch(`https://chat-api-backend-56ja.onrender.com/api/conversations/analytics`);
        if (!response.ok) throw new Error('Không thể tải dữ liệu phân tích');

        const analytics: AnalyticsData = await response.json();
        setAnalyticsData(analytics);

        if (!successMessageShownRef.current) {
          antdMessage.success('Tải dữ liệu phân tích thành công');
          successMessageShownRef.current = true;
        }
      } catch (error) {
        console.error('Error loading analytics:', error);
        antdMessage.error('Lỗi khi tải dữ liệu: ' + (error as Error).message);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <div className="analytics-container">
      {analyticsData ? (
        <div className="analytics-display">
          <div className="analytics-item">
            <span className="analytics-label">Tổng số câu hỏi đã xử lý:</span>
            <span className="analytics-value">{analyticsData.totalProcessedResponses}</span>
          </div>
          <div className="analytics-item">
            <span className="analytics-label">Thời gian phản hồi trung bình: </span>
            <span className="analytics-value">{analyticsData.averageResponseTime.toFixed(2)} ms</span>
          </div>
          <div className="analytics-item">
            <span className="analytics-label">Tổng số người dùng đã sử dụng chatbot (phản hồi câu hỏi với người dùng): </span>
            <span className="analytics-value">{analyticsData.totalUniqueUsers}</span>
          </div>
        </div>
      ) : (
        <p className="analytics-loading">Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

export default Analytics;
