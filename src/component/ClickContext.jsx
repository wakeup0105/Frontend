import React, { createContext, useState, useEffect } from 'react';

export const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
  const [clickCount, setClickCount] = useState(0);
  const [nickname, setNickname] = useState('');
  const [cxp, setCxp] = useState(0); // 경험치 상태 추가
  const [level, setLevel] = useState(1); // 레벨 상태 추가
  const [timerState, setTimerState] = useState({
    time: 20 * 60,
    isTimerActive: false,
    isStretching: false,
  }); // 타이머 상태 추가

  const levelUpRequirements = [0, 10, 20, 30, 40, 50]; // 레벨업 요구사항

  useEffect(() => {
    let currentCxp = cxp;
    let currentLevel = level;
  
    while (currentLevel < levelUpRequirements.length - 1 && currentCxp >= levelUpRequirements[currentLevel]) {
      currentCxp -= levelUpRequirements[currentLevel];
      currentLevel++;
    }
  
    setLevel(currentLevel);
    setCxp(currentCxp);
  }, [cxp]);

  return (
    <ClickContext.Provider value={{ 
      clickCount, 
      setClickCount, 
      nickname, 
      setNickname, 
      cxp, 
      setCxp, 
      level, 
      setLevel, 
      timerState, 
      setTimerState 
    }}>
      {children}
    </ClickContext.Provider>
  );
};
