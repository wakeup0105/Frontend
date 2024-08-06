import React from 'react';
import './Chat.css';

const MessageBubble = ({ sender, text }) => {
  return (
    <div className={`message-bubble ${sender === 'Me' ? 'sent' : 'received'}`}>
      <p><strong>{sender}:</strong> {text}</p>
    </div>
  );
};

export default MessageBubble;
