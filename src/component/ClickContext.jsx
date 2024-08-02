import React, { createContext, useState } from 'react';

export const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
  const [nickname, setNickname] = useState('');
  const [clickCount, setClickCount] = useState(0); // clickCount 추가

  return (
    <ClickContext.Provider value={{ 
      nickname, 
      setNickname,
      clickCount,
      setClickCount
    }}>
      {children}
    </ClickContext.Provider>
  );
};
