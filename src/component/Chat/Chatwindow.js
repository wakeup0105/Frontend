import React, { useState } from 'react';
import MessageBubble from './Messagebubble';
import MessageInput from './Messageinput';
import './Chat.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: 'Alice', text: 'Hello!' },
    { sender: 'Bob', text: 'Hi there!' },
  ]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <MessageInput onSend={addMessage} />
    </div>
  );
};

export default ChatWindow;