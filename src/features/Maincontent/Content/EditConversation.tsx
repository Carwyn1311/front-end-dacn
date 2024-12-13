import React, { useState, useEffect } from 'react';
import { Input, Button, message as antdMessage } from 'antd';
import { ConversationId } from './ConversationId'; 

interface EditConversationProps {
  conversationId: string;
  initialTitle: string;
  onUpdate: () => void; 
}

const EditConversation: React.FC<EditConversationProps> = ({ conversationId, initialTitle, onUpdate }) => {
  const [newTitle, setNewTitle] = useState<string>(initialTitle);
  const [currentConversationId, setCurrentConversationId] = useState<string>(conversationId);

  useEffect(() => {
    const savedConversationId = ConversationId.getConversationId();
    if (savedConversationId) {
      setCurrentConversationId(savedConversationId);
    }
  }, []);

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
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/conversations/${currentConversationId}/title`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) throw new Error('Lỗi cập nhật tiêu đề');
      
      antdMessage.success('Cập nhật tiêu đề thành công.');

      ConversationId.storeConversationId(currentConversationId);
      onUpdate();
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
        style={{ width: 'calc(100% - 80px)', height: '40px' }} // Adjust width and height
      />
      <Button 
        type="primary" 
        onClick={updateConversationTitle} 
        style={{ width: '80px', height: '40px' }} // Matches input height
      >
        Đổi tên
      </Button>
    </Input.Group>
  );
};

export default EditConversation;
