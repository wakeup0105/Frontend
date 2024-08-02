import React from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './Chatwindow';
import './Chat.css';

const Chat = () => {
  return (
    <div className="chat-app">
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

export default Chat;