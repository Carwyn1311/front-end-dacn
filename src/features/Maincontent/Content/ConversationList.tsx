import React, { useEffect, useState } from 'react';
import { List, message as antdMessage } from 'antd';

interface Conversation {
  id: string;
  title: string;
  messages: any[];
}

interface ConversationListProps {
  username: string;
  setCurrentConversationId: (id: string) => void;
  setMessages: (messages: any[]) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ username, setCurrentConversationId, setMessages }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Load conversations automatically when the component is mounted
  useEffect(() => {
    const loadConversations = async () => {
      if (!username) {
        antdMessage.error("Vui lòng nhập tên người dùng.");
        return;
      }

      try {
        const response = await fetch(`https://chat-api-backend-x4dl.onrender.com/api/conversations/by-username?username=${username}`);
        if (!response.ok) throw new Error('Lỗi tải cuộc trò chuyện');
        const conversations = await response.json();
        setConversations(conversations);

        // Automatically select the first conversation if available
        if (conversations.length > 0) {
          const firstConversation = conversations[0];
          setCurrentConversationId(firstConversation.id);
          setMessages(firstConversation.messages || []);
        }
      } catch (error) {
        console.error('Lỗi tải cuộc trò chuyện:', error);
        antdMessage.error('Lỗi tải cuộc trò chuyện.');
      }
    };

    loadConversations();
  }, [username, setCurrentConversationId, setMessages]);

  return (
    <List
      bordered
      style={{ marginBottom: '10px' }}
      dataSource={conversations}
      renderItem={(item) => (
        <List.Item onClick={() => { setCurrentConversationId(item.id); setMessages(item.messages); }}>
          <strong>{item.title || 'Không có tiêu đề'}</strong>
        </List.Item>
      )}
    />
  );
};

export default ConversationList;
