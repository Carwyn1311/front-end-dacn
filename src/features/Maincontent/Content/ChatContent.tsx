import React, { useState, useEffect, useRef, useMemo } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Layout, Button, List, Upload, message as antdMessage, Input, Spin } from 'antd';
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
  isLoading?: boolean;
}

interface ChatContentProps {
  conversationId: string | null;
  messages: Message[];
}

const ChatContent: React.FC<ChatContentProps> = ({ conversationId, messages: propsMessages }) => {
  const [username, setUsername] = useState(() => {
    const currentUser = User.getUserData();
    return currentUser?.username || ''; // Lấy `username` từ dữ liệu người dùng nếu có
  });
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(propsMessages || []);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(conversationId);
  const [isLoading, setIsLoading] = useState(false);

  const stompClientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const memoizedMessages = useMemo(() => messages, [messages]);
  useEffect(() => {
    const storedUser = User.getUserData();
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }
  })
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom(); 

  }, [messages]);

  const loadConversations = async () => {
    if (!username) {
      antdMessage.error("Vui lòng nhập tên người dùng.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/conversations/by-username?username=${username}`);
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
    const socket = new SockJS(`${process.env.REACT_APP_BASE_URL}/ws-chat`);
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

    const loadingMessage: Message = {
      sender: 'Cherry',
      content: 'Đang gửi...',
      color: 'blue',
      contentType: 'text',
      isLoading: true
    };

    setMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/conversations/${currentConversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, message })
      });

      if (!response.ok) throw new Error('Lỗi kết nối mạng');

      const responseData = await response.json();

      // Remove loading message and add AI response
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => !msg.isLoading);
        return [...filteredMessages, {
          sender: responseData.aiMessage.sender,
          content: responseData.aiMessage.content,
          color: 'blue',
          contentType: 'text'
        }];
      });

      loadConversations();
    } catch (error: unknown) {
      console.error('Lỗi gửi tin nhắn:', error);
      if (error instanceof Error) {
        antdMessage.error('Lỗi gửi tin nhắn: ' + error.message);
      }
      // Remove loading message on error
      setMessages(prevMessages => prevMessages.filter(msg => !msg.isLoading));
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (options: UploadRequestOption) => {
    const file = options.file as File;
    if (!file || !username || !currentConversationId) {
      antdMessage.error("Vui lòng chọn ảnh, nhập tên người dùng và chọn cuộc trò chuyện.");
      return;
    }

    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = async (e) => {
      const previewImage = e.target?.result as string;
      const base64Data = previewImage.split(',')[1];

      // Add image preview message immediately
      const previewMessage: Message = {
        sender: username,
        content: '[Hình ảnh]',
        color: 'green',
        contentType: 'image',
        imageData: base64Data
      };

      const loadingMessage: Message = {
        sender: 'Cherry',
        content: 'Đang xử lý ảnh...',
        color: 'blue',
        contentType: 'text',
        isLoading: true
      };

      setMessages(prevMessages => [...prevMessages, previewMessage, loadingMessage]);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('username', username);
      formData.append('conversationId', currentConversationId);

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/images/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Lỗi tải lên hình ảnh');

        const responseData = await response.json();

        // Remove loading message and add AI response
        setMessages(prevMessages => {
          const filteredMessages = prevMessages.filter(msg => !msg.isLoading);
          return [...filteredMessages, {
            sender: 'Cherry',
            content: responseData.message,
            color: 'blue',
            contentType: 'text'
          }];
        });

        antdMessage.success('Tải ảnh lên thành công.');
      } catch (error) {
        console.error('Lỗi tải lên hình ảnh:', error);
        antdMessage.error('Lỗi tải lên hình ảnh.');
        // Remove loading message on error
        setMessages(prevMessages => prevMessages.filter(msg => !msg.isLoading));
      }
    };

    reader.readAsDataURL(file);
  };

  const renderMessageContent = (message: Message) => {
    if (message.isLoading) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {message.content} <Spin size="small" />
        </div>
      );
    }

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
              disabled={isLoading}
            />
          </Input.Group>
        </Content>
      </Layout>
    </div>
  );
};

export default ChatContent;