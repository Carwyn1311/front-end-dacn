import React, { useState, useEffect, useRef, useMemo } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Layout, Button, List, Upload, message as antdMessage, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { User } from '../../User/Content/User';
import '../.css/MainContent.css';

const { Content } = Layout;
const { Search } = Input;

interface MainContentProps {
  conversationId: string | null;
  messages: any[];
}

const MainContent: React.FC<MainContentProps> = ({ conversationId, messages: propsMessages }) => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>(propsMessages || []);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(conversationId);

  const stompClientRef = useRef<Client | null>(null);

  const memoizedMessages = useMemo(() => messages, [messages]);

  const loadConversations = async () => {
    if (!username) {
      antdMessage.error("Vui lòng nhập tên người dùng.");
      return;
    }

    try {
      const response = await fetch(`https://chat-api-backend-x4dl.onrender.com/api/conversations/by-username?username=${username}`);
      if (!response.ok) throw new Error('Lỗi tải cuộc trò chuyện');
      await response.json();
    } catch (error) {
      console.error('Lỗi tải cuộc trò chuyện:', error);
      antdMessage.error('Lỗi tải cuộc trò chuyện.');
    }
  };

  useEffect(() => {
    setCurrentConversationId(conversationId);
    setMessages(propsMessages);
  }, [conversationId, propsMessages]);

  useEffect(() => {
    const storedUser = User.getUserData();
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }
  }, []);

  useEffect(() => {
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
            sender: 'GEMINI',
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
  
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: username, content: message, color: 'green' }
    ]);
  
    setMessage(''); 
  
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
        { sender: responseData.aiMessage.sender, content: responseData.aiMessage.content, color: 'blue' }
      ]);
  
      loadConversations(); 
    } catch (error: unknown) {
      console.error('Lỗi gửi tin nhắn:', error);
      if (error instanceof Error) {
        antdMessage.error('Lỗi gửi tin nhắn: ' + error.message);
      }
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

  return (
    <div className="outer-frame">
      <Layout className="layout-container" style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Content style={{ width: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>AI Chat</h2>

          <List
            bordered
            style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', backgroundColor: '#f9f9f9' }}
            dataSource={memoizedMessages}
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

          <Input.Group className="input-group">
            <Search
                placeholder="Nhập tin nhắn"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onSearch={sendMessage} 
                enterButton="Gửi"
            />
            </Input.Group>
        </Content>
      </Layout>
    </div>
  );
};

export default MainContent;
