import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import { ConversationId } from './ConversationId';  // Import ConversationId class
import { loadConversations } from './ConversationService';
import '../.css/ConversationList.css';

interface ConversationListProps {
  onSelectConversation: (conversationId: string, messages: any[]) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const data = await loadConversations();  // Use the shared loadConversations function from conversationService
      setConversations(data);  // Update the state with loaded conversations
    };

    fetchConversations();  // Fetch conversations when the component mounts
  }, []);  // Empty dependency array means this effect runs once on mount

  const handleConversationSelect = (conversationId: string, messages: any[]) => {
    ConversationId.storeConversationId(conversationId);  // Store selected conversation ID in session storage
    onSelectConversation(conversationId, messages);  // Pass the selected conversation and messages to parent component
  };

  return (
    <div className="conversation-list-container">
      <List
        bordered
        dataSource={conversations}
        renderItem={(item) => (
          <List.Item
            className="conversation-list-item"
            onClick={() => handleConversationSelect(item.id, item.messages)}
          >
            <strong>{item.title || 'Không có tiêu đề'}</strong>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ConversationList;
