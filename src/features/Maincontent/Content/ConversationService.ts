import { message as antdMessage } from 'antd';
import { User } from '../../User/Content/User';

let errorCount = 0; 
const maxErrorCount = 3; 
const resetErrorTimeout = 30000; 

let errorTimeoutActive = false; 

export const loadConversations = async (): Promise<any[]> => {
  const savedUser = User.getUserData();
  if (!savedUser || !savedUser.username) {
    antdMessage.error('Vui lòng nhập tên người dùng.');
    return [];
  }

  const username = savedUser.username;
  
  try {
    const response = await fetch(`https://chat-api-backend-x4dl.onrender.com/api/conversations/by-username?username=${username}`);
    if (!response.ok) throw new Error('Lỗi tải cuộc trò chuyện');
    
    const data = await response.json();
    
    if (Array.isArray(data) && data.length === 0) {
      console.warn('Không có cuộc trò chuyện nào.');
      return [];
    }
    
    errorCount = 0;
    errorTimeoutActive = false;
    return data;
  } catch (error) {
    if (errorCount < maxErrorCount && !errorTimeoutActive) {
      console.error('Lỗi tải cuộc trò chuyện:', error);
      antdMessage.error('Lỗi tải cuộc trò chuyện.');
      errorCount++; 


      if (errorCount >= maxErrorCount) {
        errorTimeoutActive = true;
        setTimeout(() => {
          errorCount = 0; 
          errorTimeoutActive = false;
        }, resetErrorTimeout);
      }
    }
    return [];
  }
};
