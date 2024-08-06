import React from 'react';
import './Chat.css';

const Sidebar = () => {
  const users = ['1', '2', '3', '4'];
  
  return (
    <div className="sidebar">
      <h2>Contacts</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;