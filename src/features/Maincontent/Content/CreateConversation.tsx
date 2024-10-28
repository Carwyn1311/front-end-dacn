import React from 'react';
import { message as antdMessage } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '../../../components/Button/Button';

interface CreateConversationProps {
    username: string;
    onConversationCreated: (conversationId: string, newConversation: any) => void;
    className?: string;
}

const CreateConversation: React.FC<CreateConversationProps> = ({ 
    username, 
    onConversationCreated, 
    className 
}) => {
    const navigate = useNavigate(); // Khởi tạo useNavigate

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

            onConversationCreated(newConversation.id, newConversation);
            antdMessage.success("Đã tạo cuộc trò chuyện mới.");

            // Điều hướng về trang chính
            navigate('/'); // Thay đổi '/' thành đường dẫn trang chính của bạn

        } catch (error) {
            console.error('Error creating conversation:', error);
            antdMessage.error('Error creating conversation.');
        }
    };

    return (
        <Button 
            type="primary" 
            onClick={createConversation}
            className={className}
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