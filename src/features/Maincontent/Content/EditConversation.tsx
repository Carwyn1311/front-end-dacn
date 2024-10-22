import React, { useState, useEffect } from 'react';
import { Input, Button, message as antdMessage } from 'antd';
import { loadConversations } from './ConversationService'; // Import hàm loadConversations
import { ConversationId } from './ConversationId'; // Import lớp ConversationId

interface EditConversationProps {
  conversationId: string;
  initialTitle: string;
  onUpdate: () => void; // Callback để load lại danh sách cuộc trò chuyện sau khi cập nhật
}

const EditConversation: React.FC<EditConversationProps> = ({ conversationId, initialTitle, onUpdate }) => {
  const [newTitle, setNewTitle] = useState<string>(initialTitle);
  const [currentConversationId, setCurrentConversationId] = useState<string>(conversationId);

  // Khi component được mount, lấy conversationId từ sessionStorage
  useEffect(() => {
    const savedConversationId = ConversationId.getConversationId();
    if (savedConversationId) {
      setCurrentConversationId(savedConversationId);
    }
  }, []);

  // Hàm cập nhật tiêu đề cuộc trò chuyện
  const updateConversationTitle = async () => {
    if (!currentConversationId) {
      antdMessage.error("Vui lòng chọn cuộc trò chuyện.");
      return;
    }

    if (!newTitle) {
      antdMessage.error("Vui lòng nhập tiêu đề mới.");
      return;
    }

    try {
      const response = await fetch(`https://chat-api-backend-x4dl.onrender.com/api/conversations/${currentConversationId}/title`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) throw new Error('Lỗi cập nhật tiêu đề');
      
      // Thông báo thành công
      antdMessage.success('Cập nhật tiêu đề thành công.');
      
      // Lưu conversationId vào sessionStorage
      ConversationId.storeConversationId(currentConversationId);
      
      // Gọi callback để cập nhật danh sách cuộc trò chuyện
      onUpdate();

      // Xóa tiêu đề sau khi cập nhật
      setNewTitle('');
    } catch (error) {
      console.error('Lỗi cập nhật tiêu đề:', error);
      antdMessage.error('Lỗi cập nhật tiêu đề.');
    }
  };

  return (
    <Input.Group compact style={{ marginBottom: '10px' }}>
      <Input
        placeholder="Nhập tiêu đề mới"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{ width: '70%' }}
      />
      <Button type="primary" onClick={updateConversationTitle} style={{ width: '30%' }}>
        Thay đổi tiêu đề
      </Button>
    </Input.Group>
  );
};

export default EditConversation;
