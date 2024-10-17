import React, { useState } from 'react';
import './ChatPage.css';

interface MainContentProps {
  isSidebarOpen?: boolean; // Optional prop
}

const ChatPage: React.FC<MainContentProps> = ({ isSidebarOpen }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="chat-page-container">
      <h1>Chat with Support</h1>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            {message}
          </div>
        ))}
      </div>
      <div className="chat-input-section">
        <input 
          type="text"
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
