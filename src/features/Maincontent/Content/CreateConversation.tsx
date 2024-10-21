import React from 'react';
import { message as antdMessage } from 'antd';
import Button from '../../../components/Button/Button';

interface CreateConversationProps {
  username: string;  // The username to start a conversation with
  onConversationCreated: (conversationId: string) => void;  // Callback when a new conversation is created
}

const CreateConversation: React.FC<CreateConversationProps> = ({ username, onConversationCreated }) => {

  const createConversation = async () => {
    if (!username) {
      antdMessage.error("Vui lòng nhập tên người dùng.");
      return;
    }

    const token = localStorage.getItem('token');  // Retrieve token from localStorage

    try {
      const response = await fetch('https://chat-api-backend-x4dl.onrender.com/api/conversations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Send token if available
        },
        body: JSON.stringify({ username, message: '' })  // Create conversation with the username
      });

      if (!response.ok) throw new Error('Error creating conversation');

      const newConversation = await response.json();
      antdMessage.success("New conversation created.");
      onConversationCreated(newConversation.id);  // Call the callback with the conversation ID
    } catch (error) {
      console.error('Error creating conversation:', error);
      antdMessage.error('Error creating conversation.');
    }
  };

  return (
    <Button 
  type="primary" 
  onClick={createConversation} 
  style={{ 
    width: 'auto',          // Điều chỉnh độ rộng tự động
    padding: ' 10px',    // Điều chỉnh khoảng cách bên trong nút
    fontSize: '17px',       // Điều chỉnh kích thước biểu tượng hoặc văn bản
    float: 'right',         // Căn sang phải
    marginRight: '100%',    // Điều chỉnh khoảng cách bên phải nếu cần
    marginTop: '5px'       // Điều chỉnh khoảng cách trên nếu cần
  }}>
  &#9998;
</Button>




  );
};

export default CreateConversation;
