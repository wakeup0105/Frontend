import React, { useState, useEffect } from 'react';
import '../Timer.css';

const Timer = ({ onConfirm }) => {
  const defaultTime = 20 * 60; // 기본값 20분
  const [initialTime, setInitialTime] = useState(defaultTime);
  const [time, setTime] = useState(defaultTime);
  const [minutes, setMinutes] = useState(Math.floor(defaultTime / 60));
  const [seconds, setSeconds] = useState(defaultTime % 60);
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false); // 초기값을 false로 설정
  
  useEffect(() => {
    let timer;
    if (isTimerActive) {
      timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timer);
            setShowAlert(true);
            setIsTimerActive(false); // 타이머 멈춤
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTimerActive]);
  
  useEffect(() => {
    setMinutes(Math.floor(time / 60));
    setSeconds(time % 60);
  }, [time]);
  
  const handleInputMinutesChange = (e) => {
    setInputMinutes(e.target.value);
  };
  
  const handleInputSecondsChange = (e) => {
    setInputSeconds(e.target.value);
  };
  
  const handleSetTime = () => {
    const totalSeconds = parseInt(inputMinutes) * 60 + parseInt(inputSeconds);
    const newInitialTime = isNaN(totalSeconds) || totalSeconds <= 0 ? defaultTime : totalSeconds;
    setInitialTime(newInitialTime);
    setTime(newInitialTime);
    setShowAlert(false);
    setIsTimerActive(true); // 타이머 시작
  };
  
  const handleAlertClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowAlert(false);
      setFadeOut(false);
      setIsTimerActive(true); // 타이머 재시작
      setTime(initialTime); // 타이머 시간을 초기화
      onConfirm(); // 추가: 확인 버튼 클릭 시 호출
    }, 500);
  };
  
  const progressBarWidth = (time / initialTime) * 100;
  
  return (
    <div className="timer-container">
      <h1>알람</h1>
      <div className="timer-display">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progressBarWidth}%` }}></div>
      </div>
      <div className="input-container">
        <input
          type="number"
          value={inputMinutes}
          onChange={handleInputMinutesChange}
          placeholder="분"
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={handleInputSecondsChange}
          placeholder="초"
        />
        <button onClick={handleSetTime}>설정하기</button>
      </div>
      {showAlert && (
        <div className={`alert-overlay ${fadeOut ? 'fade-out' : ''}`} onClick={handleAlertClose}>
          <div className="alert">
            <p>스트레칭하세요!!</p>
            <button onClick={handleAlertClose}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
