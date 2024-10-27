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

interface Message {
  sender: string;
  content: string;
  color: string;
  contentType?: 'text' | 'image';
  imageData?: string;
}

interface MainContentProps {
  conversationId: string | null;
  messages: Message[];
}

const MainContent: React.FC<MainContentProps> = ({ conversationId, messages: propsMessages }) => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(propsMessages || []);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(conversationId);

  const stompClientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const memoizedMessages = useMemo(() => messages, [messages]);

  useEffect(() => {
    const storedUser = User.getUserData();
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    if (!username) {
      antdMessage.error("Vui lòng nhập tên người dùng.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/conversations/by-username?username=${username}`);
      if (!response.ok) throw new Error('Lỗi tải cuộc trò chuyện');
      const data = await response.json();

      if (data.messages) {
        const processedMessages = data.messages.map((msg: any) => ({
          ...msg,
          contentType: msg.contentType || 'text',
          imageData: msg.contentType === 'image' ? msg.content : undefined,
          content: msg.contentType === 'image' ? '[Hình ảnh]' : msg.content
        }));
        setMessages(processedMessages);
      }
    } catch (error) {
      console.error('Lỗi tải cuộc trò chuyện:', error);
      antdMessage.error('Lỗi tải cuộc trò chuyện.');
    }
  };

  useEffect(() => {
    setCurrentConversationId(conversationId);
    if (propsMessages) {
      const processedMessages = propsMessages.map(msg => ({
        ...msg,
        contentType: msg.contentType || 'text',
        imageData: msg.contentType === 'image' ? msg.content : undefined,
        content: msg.contentType === 'image' ? '[Hình ảnh]' : msg.content
      }));
      setMessages(processedMessages);
    }
  }, [conversationId, propsMessages]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws-chat');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str: any) => {
        console.log(str);
      },
      onConnect: (frame: string) => {
        console.log('Đã kết nối: ' + frame);

        stompClient.subscribe('/topic/messages', (messageOutput) => {
          console.log('Nhận được tin nhắn từ server:', messageOutput.body);
          const chatMessage: Message = {
            sender: 'Cherry',
            content: messageOutput.body,
            color: 'blue',
            contentType: 'text'
          };
          setMessages(prevMessages => [...prevMessages, chatMessage]);
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
  }, []);

  const sendMessage = async () => {
    if (!username || !message || !currentConversationId) {
      antdMessage.error("Vui lòng nhập tên người dùng, tạo cuộc trò chuyện và nhập tin nhắn.");
      return;
    }

    const userMessage: Message = {
      sender: username,
      content: message,
      color: 'green',
      contentType: 'text'
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setMessage('');

    try {
      const response = await fetch(`http://localhost:8080/api/conversations/${currentConversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, message })
      });

      if (!response.ok) throw new Error('Lỗi kết nối mạng');

      const responseData = await response.json();

      const aiMessage: Message = {
        sender: responseData.aiMessage.sender,
        content: responseData.aiMessage.content,
        color: 'blue',
        contentType: 'text'
      };

      setMessages(prevMessages => [...prevMessages, aiMessage]);
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
      const response = await fetch('http://localhost:8080/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Lỗi tải lên hình ảnh');

      const responseData = await response.json();

      const userImageMessage: Message = {
        sender: username,
        content: '[Hình ảnh]',
        color: 'green',
        contentType: 'image',
        imageData: responseData.base64Image
      };
      setMessages(prevMessages => [...prevMessages, userImageMessage]);

      if (responseData.message) {
        const aiResponseMessage: Message = {
          sender: 'Cherry',
          content: responseData.message,
          color: 'blue',
          contentType: 'text'
        };
        setMessages(prevMessages => [...prevMessages, aiResponseMessage]);
      }

      antdMessage.success('Tải ảnh lên thành công.');
    } catch (error) {
      console.error('Lỗi tải lên hình ảnh:', error);
      antdMessage.error('Lỗi tải lên hình ảnh.');
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.contentType === 'image' && message.imageData) {
      return (
        <div>
          <div>{message.content}</div>
          <img
            src={`data:image/png;base64,${message.imageData}`}
            alt="Uploaded"
            style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              console.error('Error loading image');
            }}
          />
        </div>
      );
    }
    return message.content;
  };

  return (
    <div className="outer-frame">
      <Layout className="layout-container" style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Content style={{ width: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>Cherry Chat</h2>

          <List
            bordered
            style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', backgroundColor: '#f9f9f9' }}
            dataSource={memoizedMessages}
            renderItem={(item: Message) => (
              <List.Item style={{ color: item.color }}>
                <strong>{item.sender}:</strong> {renderMessageContent(item)}
              </List.Item>
            )}
          />
          <div ref={messagesEndRef} />

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
