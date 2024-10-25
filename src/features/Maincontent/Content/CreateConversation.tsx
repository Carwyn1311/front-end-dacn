import React from 'react';
import { message as antdMessage } from 'antd';
import Button from '../../../components/Button/Button';

interface CreateConversationProps {
    username: string;
    onConversationCreated: (conversationId: string, newConversation: any) => void;
    className?: string; // Thêm className tùy chọn
}

const CreateConversation: React.FC<CreateConversationProps> = ({ 
    username, 
    onConversationCreated, 
    className // Nhận className từ props
}) => {
    const createConversation = async () => {
        if (!username) {
            antdMessage.error("Vui lòng nhập tên người dùng.");
            return;
        }

        const token = localStorage.getItem('token');

        try {
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

            onConversationCreated(newConversation.id, newConversation); // Gửi thông tin cuộc trò chuyện mới

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
            className={className} // Gán className từ props
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
