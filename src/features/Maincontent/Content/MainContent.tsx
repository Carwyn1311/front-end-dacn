import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Layout, Button, Input, List, Upload, message as antdMessage } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { User } from '../../User/Content/User';

const { Content } = Layout;

const ChatWebSocket: React.FC = () => {
    const [username, setUsername] = useState(''); // Tên người dùng hiện tại
    const [savedUsername, setSavedUsername] = useState<string | null>(''); // Tên người dùng đã lưu
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [currentConversationId, setCurrentConversationId] = useState('');
    const [conversations, setConversations] = useState<any[]>([]);
    const [newTitle, setNewTitle] = useState('');

    const stompClientRef = useRef<Client | null>(null);

    useEffect(() => {
        // Lấy tên người dùng đã lưu từ User.ts khi ứng dụng load
        const storedUser = User.getUserData();
        if (storedUser && storedUser.name) {
            setSavedUsername(storedUser.name); // Lưu tên người dùng vào trạng thái
            setUsername(storedUser.name); // Đặt tên người dùng vào input
        }

        const socket = new SockJS('https://chat-api-backend-x4dl.onrender.com/ws-chat');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str: any) => {
                console.log(str);
            },
            onConnect: (frame: string) => {
                console.log('Đã kết nối: ' + frame);

                stompClient.subscribe('/topic/messages', (messageOutput) => {
                    console.log('Nhận được tin nhắn từ server:', messageOutput.body);
                    const chatMessage = {
                        sender: 'CHERRY', // Mặc định người gửi là CHERRY
                        content: messageOutput.body,
                        color: 'blue'
                    };
                    setMessages((prevMessages) => [...prevMessages, chatMessage]);
                });

                startHeartbeat(stompClient);
            },
        });

        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
            }
        };
    }, []);

    const startHeartbeat = (stompClient: Client) => {
        setInterval(() => {
            if (stompClient.connected) {
                console.log('Đang gửi heartbeat...');
                stompClient.publish({
                    destination: "/app/ping",
                    body: 'ping'
                });
            }
        }, 10000);
    };

    const sendMessage = async () => {
        if (!username || !message || !currentConversationId) {
            antdMessage.error("Vui lòng nhập tên người dùng, tạo cuộc trò chuyện và nhập tin nhắn.");
            return;
        }

        try {
            const response = await fetch(`https://chat-api-backend-x4dl.onrender.com/api/conversations/${currentConversationId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, message })
            });

            if (!response.ok) throw new Error('Lỗi kết nối mạng');

            const responseData = await response.json();
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: responseData.userMessage.sender, content: responseData.userMessage.content, color: 'green' },
                { sender: responseData.aiMessage.sender, content: responseData.aiMessage.content, color: 'blue' }
            ]);

            setMessage('');
            loadConversations();
        } catch (error: unknown) {
            console.error('Lỗi gửi tin nhắn:', error);
            if (error instanceof Error) {
                antdMessage.error('Lỗi gửi tin nhắn: ' + error.message);
            }
        }
    };

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
        } catch (error) {
            console.error('Lỗi tải cuộc trò chuyện:', error);
            antdMessage.error('Lỗi tải cuộc trò chuyện.');
        }
    };

    const deleteConversation = async () => {
        if (!currentConversationId) {
            antdMessage.error("Vui lòng chọn cuộc trò chuyện để xóa.");
            return;
        }

        try {
            const response = await fetch(`https://chat-api-backend-x4dl.onrender.com/api/conversations/${currentConversationId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Lỗi xóa cuộc trò chuyện');
            antdMessage.success('Xóa cuộc trò chuyện thành công.');
            setCurrentConversationId('');
            setMessages([]);
            loadConversations();
        } catch (error) {
            console.error('Lỗi xóa cuộc trò chuyện:', error);
            antdMessage.error('Lỗi xóa cuộc trò chuyện.');
        }
    };

    const uploadImage = async (options: UploadRequestOption) => {
        const file = options.file as File;
        if (!file || !username || !currentConversationId) {
            antdMessage.error("Vui lòng chọn ảnh, nhập tên người dùng và chọn cuộc trò chuyện.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', username);
        formData.append('conversationId', currentConversationId);

        try {
            const response = await fetch('https://chat-api-backend-x4dl.onrender.com/api/images/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Lỗi tải lên hình ảnh');
            const data = await response.json();
            const chatMessage = {
                sender: username,
                content: `[Đã tải lên hình ảnh]`,
                imageUrl: URL.createObjectURL(file),
                color: 'green',
            };
            setMessages((prevMessages) => [...prevMessages, chatMessage]);
            antdMessage.success('Tải ảnh lên thành công.');
        } catch (error) {
            console.error('Lỗi tải lên hình ảnh:', error);
            antdMessage.error('Lỗi tải lên hình ảnh.');
        }
    };

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
            const response = await fetch(`https://chat-api-backend-x4dl.onrender.com/api/conversations/${currentConversationId}/title`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTitle }),
            });

            if (!response.ok) throw new Error('Lỗi cập nhật tiêu đề');
            antdMessage.success('Cập nhật tiêu đề thành công.');
            loadConversations();
            setNewTitle('');
        } catch (error) {
            console.error('Lỗi cập nhật tiêu đề:', error);
            antdMessage.error('Lỗi cập nhật tiêu đề.');
        }
    };

    return (
        <Layout style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Content style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>Cherry Chat</h2>

                {/* Hiển thị tên người dùng đã lưu */}
                {savedUsername && (
                    <p style={{ color: 'green' }}>Tên người dùng đã lưu: {savedUsername}</p>
                )}

                <List
                    bordered
                    style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', backgroundColor: '#f9f9f9' }}
                    dataSource={messages}
                    renderItem={(item) => (
                        <List.Item style={{ color: item.color }}>
                            <strong>{item.sender}:</strong> {item.content}
                            {item.imageUrl && <img src={item.imageUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />}
                        </List.Item>
                    )}
                />

                <Upload customRequest={uploadImage} showUploadList={false}>
                    <Button icon={<UploadOutlined />} style={{ marginBottom: '10px', width: '100%' }}>Tải lên ảnh</Button>
                </Upload>

                <Input.Group compact style={{ marginBottom: '10px' }}>
                    <Input
                        placeholder="Nhập tên người dùng"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '50%' }}
                    />
                    <Button type="primary" onClick={loadConversations} style={{ width: '50%' }}>Tải cuộc trò chuyện</Button>
                </Input.Group>

                <Input.Group compact style={{ marginBottom: '10px' }}>
                    <Button type="default" danger onClick={deleteConversation} style={{ width: '50%' }}>Xóa cuộc trò chuyện</Button>
                </Input.Group>

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

                <Input.Group compact style={{ marginBottom: '10px' }}>
                    <Input
                        placeholder="Nhập tin nhắn"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ width: '70%' }}
                    />
                    <Button type="primary" onClick={sendMessage} style={{ width: '30%' }}>Gửi</Button>
                </Input.Group>

                {currentConversationId && (
                    <Input.Group compact>
                        <Input
                            placeholder="Nhập tiêu đề mới"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            style={{ width: '70%' }}
                        />
                        <Button type="primary" onClick={updateConversationTitle} style={{ width: '30%' }}>Thay đổi tiêu đề</Button>
                    </Input.Group>
                )}
            </Content>
        </Layout>
    );
};

export default ChatWebSocket;
