import React, { createContext, useState } from 'react';

export const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
  const [nickname, setNickname] = useState('');
  const [clickCount, setClickCount] = useState(0); 
  const [selectedEye, setSelectedEye] = useState(require('../image/기본눈.png')); 
  const [selectedMouth, setSelectedMouth] = useState(require('../image/기본입.png')); 

  return (
    <ClickContext.Provider value={{ 
      nickname, 
      setNickname,
      clickCount,
      setClickCount,
      selectedEye,
      setSelectedEye,
      selectedMouth,
      setSelectedMouth
    }}>
      {children}
    </ClickContext.Provider>
  );
};
