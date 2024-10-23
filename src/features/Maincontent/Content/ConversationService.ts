import { message as antdMessage } from 'antd';
import { User } from '../../User/Content/User';

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
    return data;
  } catch (error) {
    console.error('Lỗi tải cuộc trò chuyện:', error);
    antdMessage.error('Lỗi tải cuộc trò chuyện.');
    return [];
  }
};
