import React, { useState, useEffect, useRef } from 'react';
import { List, Button, message as antdMessage } from 'antd';
import { ConversationId } from './ConversationId';
import EditConversation from './EditConversation';
import { loadConversations } from './ConversationService';
import { deleteConversation } from './DeleteConversation';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import '../.css/ConversationList.css';

interface ConversationListProps {
  onSelectConversation: (conversationId: string, messages: any[]) => void;
  onConversationCreated?: (conversationId: string, newConversation: any) => void;
  className?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ onSelectConversation, onConversationCreated, className }) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [editingConversationId, setEditingConversationId] = useState<string | null>(null); 
  const isFirstLoad = useRef(true); 
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const data = await loadConversations();
      setConversations(data);
  
      if (isFirstLoad.current && data.length > 0) {
        const latestConversation = data[data.length - 1];
        setSelectedConversation(latestConversation);
        onSelectConversation(latestConversation.id, latestConversation.messages);
        isFirstLoad.current = false;
      }
    };
  
    fetchConversations();
  
    const socket = new SockJS('https://chat-api-backend-ky64.onrender.com');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str: any) => {
        console.log(str);
      },
      onConnect: (frame: string) => {
        console.log('Đã kết nối: ' + frame);
  
        stompClient.subscribe('/topic/messages', (messageOutput) => {
          const chatMessage = {
            sender: 'GEMINI',
            content: messageOutput.body,
            color: 'blue'
          };
  
          setConversations((prevConversations) =>
            prevConversations.map((conv) =>
              conv.id === selectedConversation?.id
                ? { ...conv, messages: [...conv.messages, chatMessage] }
                : conv
            )
          );
        });
      },
    });
  
    stompClient.activate();
    stompClientRef.current = stompClient;
  
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [onSelectConversation, selectedConversation?.id]); 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleConversationCreated = (conversationId: string, newConversation: any) => {
    setConversations((prevConversations) => [...prevConversations, newConversation]);
  };

  const handleConversationSelect = (conversationId: string, messages: any[]) => {
    const selectedConv = conversations.find(conv => conv.id === conversationId);
    setSelectedConversation(selectedConv);
    ConversationId.storeConversationId(conversationId);
    onSelectConversation(conversationId, messages);
  };

  const handleDeleteConversation = async () => {
    if (!selectedConversation || !selectedConversation.id) {
      antdMessage.error('Vui lòng chọn cuộc trò chuyện để xóa.');
      return;
    }

    try {
      await deleteConversation(selectedConversation.id);
      const updatedConversations = await loadConversations();
      setConversations(updatedConversations);

      if (updatedConversations.length > 0) {
        const latestConversation = updatedConversations[updatedConversations.length - 1];
        setSelectedConversation(latestConversation);
        onSelectConversation(latestConversation.id, latestConversation.messages);
      } else {
        setSelectedConversation(null);
        onSelectConversation('', []);
      }

    } catch (error) {
      antdMessage.error('Có lỗi xảy ra khi xóa cuộc trò chuyện.');
    }
  };

  const handleEditClick = (conversationId: string) => {
    setEditingConversationId(conversationId === editingConversationId ? null : conversationId); 
  };

  const handleUpdateConversation = async () => {
    setEditingConversationId(null); 
    const updatedConversations = await loadConversations();
    setConversations(updatedConversations);
  };

  return (
    <div className={`conversation-list-container ${className || ''}`}>
      <List
        bordered
        dataSource={conversations}
        renderItem={(item) => (
          <List.Item className="conversation-list-item">
            <div className="conversation-title-container">
              <div className="conversation-title" onClick={() => handleConversationSelect(item.id, item.messages)}>
                <strong>{item.title || 'Không có tiêu đề'}</strong>
              </div>

              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEditClick(item.id)}
                className="edit-button"
              />
            </div>

            {editingConversationId === item.id && (
              <div className="conversation-actions">
                <EditConversation
                  conversationId={item.id}
                  initialTitle={item.title}
                  onUpdate={handleUpdateConversation}
                />
                <Button 
                  type="text" 
                  icon={<DeleteOutlined />} 
                  danger 
                  onClick={handleDeleteConversation}
                  className="delete-button"
                >
                  Xóa
                </Button>
              </div>
            )}
          </List.Item>
        )}
      />
    </div>
  );
};

export default ConversationList;
