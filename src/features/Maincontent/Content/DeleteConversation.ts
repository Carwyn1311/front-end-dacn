import { message as antdMessage } from 'antd';
import { User } from '../../User/Content/User';
import { ConversationId } from './ConversationId';

// Hàm để tải danh sách cuộc trò chuyện
export const loadConversations = async (): Promise<any[]> => {
    const savedUser = User.getUserData();
    if (!savedUser || !savedUser.username) {
      antdMessage.error('Vui lòng nhập tên người dùng.');
      return [];
    }
  
    const username = savedUser.username;
  
    try {
      const response = await fetch(`https://chat-api-backend-ky64.onrender.com/api/conversations/by-username?username=${username}`);
      if (!response.ok) throw new Error('Lỗi tải cuộc trò chuyện');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Lỗi tải cuộc trò chuyện:', error);
      antdMessage.error('Lỗi tải cuộc trò chuyện.');
      return [];
    }
  };
  
  // Hàm để xóa cuộc trò chuyện
  export const deleteConversation = async (currentConversationId: string): Promise<void> => {
    if (!currentConversationId) {
      antdMessage.error('Vui lòng chọn cuộc trò chuyện để xóa.');
      return;
    }
  
    try {
      const response = await fetch(
        `https://chat-api-backend-ky64.onrender.com/api/conversations/${currentConversationId}`,
        {
          method: 'DELETE',
        }
      );
  
      if (!response.ok) throw new Error('Lỗi xóa cuộc trò chuyện');
  
      antdMessage.success('Xóa cuộc trò chuyện thành công.');
      ConversationId.clearConversationId(); // Xóa conversationId khỏi sessionStorage
  
    } catch (error) {
      console.error('Lỗi xóa cuộc trò chuyện:', error);
      antdMessage.error('Lỗi xóa cuộc trò chuyện.');
    }
  };
  
  
  // Hàm để chọn cuộc trò chuyện
  export const selectConversation = (
    conversationId: string,
    messages: any[],
    setCurrentConversationId: (id: string) => void,
    setMessages: (messages: any[]) => void
  ) => {
    setCurrentConversationId(conversationId); // Lưu ID cuộc trò chuyện hiện tại vào state
    setMessages(messages); // Cập nhật danh sách tin nhắn của cuộc trò chuyện
    ConversationId.storeConversationId(conversationId); // Lưu conversationId vào sessionStorage
  };
  