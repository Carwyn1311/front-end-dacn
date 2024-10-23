import React, { useState, useEffect, useRef } from 'react';
import { List, Button, Modal, message as antdMessage } from 'antd';
import { ConversationId } from './ConversationId';
import EditConversation from './EditConversation';
import '../.css/ConversationList.css';
import { loadConversations } from './ConversationService';
import { deleteConversation } from './DeleteConversation';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

interface ConversationListProps {
  onSelectConversation: (conversationId: string, messages: any[]) => void;
  onConversationCreated?: (conversationId: string, newConversation: any) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ onSelectConversation, onConversationCreated }) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const isFirstLoad = useRef(true); // Sử dụng biến cờ để kiểm soát lần đầu tải
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const data = await loadConversations();
      setConversations(data);

      // Chỉ tự động chọn cuộc trò chuyện mới nhất lần đầu mở ứng dụng
      if (isFirstLoad.current && data.length > 0) {
        const latestConversation = data[data.length - 1]; // Lấy cuộc trò chuyện mới nhất
        setSelectedConversation(latestConversation);
        onSelectConversation(latestConversation.id, latestConversation.messages);
        isFirstLoad.current = false; // Đặt cờ để không chọn tự động lại
      }
    };

    // Tải lần đầu tiên khi component được mount
    fetchConversations();

    // Thiết lập kết nối WebSocket để nhận tin nhắn từ GEMINI
    const socket = new SockJS('https://your-websocket-server.com/ws-chat');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str: any) => {
        console.log(str);
      },
      onConnect: (frame: string) => {
        console.log('Đã kết nối: ' + frame);

        // Lắng nghe các tin nhắn từ server
        stompClient.subscribe('/topic/messages', (messageOutput) => {
          console.log('Nhận tin nhắn từ GEMINI:', messageOutput.body);

          // Xử lý tin nhắn nhận từ GEMINI
          const chatMessage = {
            sender: 'GEMINI',
            content: messageOutput.body,
            color: 'blue'
          };

          // Thêm tin nhắn mới từ GEMINI vào cuộc trò chuyện
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
  }, [onSelectConversation]);

  const handleConversationCreated = (conversationId: string, newConversation: any) => {
    setConversations((prevConversations) => [...prevConversations, newConversation]);
  };

  const handleConversationSelect = (conversationId: string, messages: any[]) => {
    setSelectedConversation(conversationId); // Đặt cuộc trò chuyện đã chọn
    ConversationId.storeConversationId(conversationId);
    onSelectConversation(conversationId, messages);
  };

  const handleDeleteConversation = async () => {
    if (selectedConversation) {
      await deleteConversation(
        selectedConversation.id,
        async () => {
          const updatedConversations = await loadConversations();
          setConversations(updatedConversations);

          // Chọn cuộc trò chuyện mới nhất sau khi xóa
          if (updatedConversations.length > 0) {
            const latestConversation = updatedConversations[updatedConversations.length - 1];
            setSelectedConversation(latestConversation);
            onSelectConversation(latestConversation.id, latestConversation.messages);
          } else {
            setSelectedConversation(null);
          }
        },
        () => setSelectedConversation(null),
        () => {}
      );
      setModalVisible(false);
    }
  };

  const handleEditClick = (conversation: any) => {
    setSelectedConversation(conversation);
    setShowEditForm(true);
    setModalVisible(false);
  };

  const showModal = (conversation: any) => {
    setSelectedConversation(conversation);
    setModalVisible(true);
  };

  return (
    <div className="conversation-list-container">
      <List
        bordered
        dataSource={conversations}
        renderItem={(item) => (
          <List.Item className="conversation-list-item" onClick={() => handleConversationSelect(item.id, item.messages)}>
            <strong>{item.title || 'Không có tiêu đề'}</strong>
            <Button type="text" icon={<EditOutlined />} onClick={() => showModal(item)} style={{ float: 'right' }} />
          </List.Item>
        )}
      />

      <Modal
        visible={modalVisible}
        title="Tùy chọn"
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
      >
        <div className="modal-overlay">
          <div className="modal-container">
            <Button className="modal-button" type="text" icon={<EditOutlined />} onClick={() => handleEditClick(selectedConversation)}>
              Đổi tên
            </Button>
            <Button className="modal-button modal-button-danger" type="text" icon={<DeleteOutlined />} danger onClick={handleDeleteConversation}>
              Xóa
            </Button>
            <button className="modal-close-button" onClick={() => setModalVisible(false)}>✕</button>
          </div>
        </div>
      </Modal>

      {showEditForm && selectedConversation && (
        <EditConversation
          conversationId={selectedConversation.id}
          initialTitle={selectedConversation.title}
          onUpdate={async () => {
            setShowEditForm(false);
            const updatedConversations = await loadConversations();
            setConversations(updatedConversations);

            if (updatedConversations.length > 0) {
              const latestConversation = updatedConversations[updatedConversations.length - 1];
              setSelectedConversation(latestConversation);
              onSelectConversation(latestConversation.id, latestConversation.messages);
            }
          }}
        />
      )}
    </div>
  );
};

export default ConversationList;
