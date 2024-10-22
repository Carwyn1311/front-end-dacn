import React, { useState, useEffect } from 'react';
import { List, Button, Modal, message as antdMessage } from 'antd';
import { ConversationId } from './ConversationId';
import EditConversation from './EditConversation';
import '../.css/ConversationList.css';
import { loadConversations } from './ConversationService';
import { deleteConversation } from './DeleteConversation';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface ConversationListProps {
  onSelectConversation: (conversationId: string, messages: any[]) => void;
  onConversationCreated?: (conversationId: string, newConversation: any) => void; // Thêm sự kiện để nhận cuộc trò chuyện mới
}

const ConversationList: React.FC<ConversationListProps> = ({ onSelectConversation, onConversationCreated }) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);  // State to control edit form visibility
  const [modalVisible, setModalVisible] = useState<boolean>(false);  // To handle modal visibility

  useEffect(() => {
    const fetchConversations = async () => {
      const data = await loadConversations();
      setConversations(data);
    };

    // Tải lần đầu tiên khi component được mount
    fetchConversations();

    // Thiết lập setInterval để tải lại cuộc trò chuyện mỗi 1 giây
    const intervalId = setInterval(() => {
      fetchConversations();
    }, 1000);

    // Cleanup function khi component bị unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Cập nhật danh sách conversations khi có cuộc trò chuyện mới
  const handleConversationCreated = (conversationId: string, newConversation: any) => {
    setConversations((prevConversations) => [...prevConversations, newConversation]);
  };

  const handleConversationSelect = (conversationId: string, messages: any[]) => {
    console.log("Selected Conversation ID:", conversationId); 
    ConversationId.storeConversationId(conversationId);  // Store selected conversation ID in session storage
    onSelectConversation(conversationId, messages);  // Pass the selected conversation and messages to parent component
  };

  const handleDeleteConversation = async () => {
    if (selectedConversation) {
      await deleteConversation(
        selectedConversation.id,
        async () => {
          const updatedConversations = await loadConversations();
          setConversations(updatedConversations);
        },
        () => setSelectedConversation(null),
        () => {}
      );
      setModalVisible(false);  // Close the modal after deletion
    }
  };

  const handleEditClick = (conversation: any) => {
    setSelectedConversation(conversation);
    setShowEditForm(true);  // Show the edit form
    setModalVisible(false);  // Close the modal
  };

  // Modal content for editing or deleting a conversation
  const showModal = (conversation: any) => {
    setSelectedConversation(conversation);
    setModalVisible(true);  // Show the modal
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

      {/* Modal for renaming or deleting conversation */}
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
            {/* Optional close button */}
            <button className="modal-close-button" onClick={() => setModalVisible(false)}>✕</button>
          </div>
        </div>
      </Modal>

      {/* Show edit form if showEditForm is true */}
      {showEditForm && selectedConversation && (
        <EditConversation
          conversationId={selectedConversation.id}
          initialTitle={selectedConversation.title}
          onUpdate={async () => {
            setShowEditForm(false);
            const updatedConversations = await loadConversations();  // Reload conversations after update
            setConversations(updatedConversations);
          }}
        />
      )}
    </div>
  );
};

export default ConversationList;
