import React from 'react';
import { message as antdMessage } from 'antd';
import Button from '../../../components/Button/Button';

interface CreateConversationProps {
    username: string;
    onConversationCreated: (conversationId: string, newConversation: any) => void; // Thêm tham số newConversation
}

const CreateConversation: React.FC<CreateConversationProps> = ({ 
    username, 
    onConversationCreated 
}) => {
    const createConversation = async () => {
        if (!username) {
            antdMessage.error("Vui lòng nhập tên người dùng.");
            return;
        }

        const token = localStorage.getItem('token');

        try {
            // Tạo conversation mới
            const response = await fetch('https://chat-api-backend-x4dl.onrender.com/api/conversations/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username, message: '' })
            });

            if (!response.ok) throw new Error('Error creating conversation');
            const newConversation = await response.json();

            // Sử dụng ngay dữ liệu vừa tạo
            onConversationCreated(newConversation.id, newConversation); // Gửi thông tin cuộc trò chuyện vừa tạo về cho App

            antdMessage.success("Đã tạo cuộc trò chuyện mới.");
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
                width: 'auto',
                padding: '10px',
                fontSize: '17px',
                float: 'right',
                marginRight: '100%',
                marginTop: '5px'
            }}
        >
            &#9998;
        </Button>
    );
};

export default CreateConversation;
