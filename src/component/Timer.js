import React, { useState, useEffect, useContext } from 'react';
import '../Timer.css';
import { ClickContext } from './ClickContext'; // Import context

const Timer = ({ onConfirm }) => {
  const defaultTime = 20 * 60; // 기본값 20분
  const stretchTime = 60; // 스트레칭 타이머 1분
  const autoCloseTime = 10 * 60 * 1000; // 자동 닫힘 타이머 10분 (밀리초)

  const { timerState, setTimerState } = useContext(ClickContext); // Destructure context state
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [autoCloseTimer, setAutoCloseTimer] = useState(null);
  const [autoCloseTriggered, setAutoCloseTriggered] = useState(false);

  useEffect(() => {
    let timer;
    if (timerState.isTimerActive) {
      timer = setInterval(() => {
        setTimerState(prevState => {
          const newTime = prevState.time - 1;
          if (newTime > 0) {
            return { ...prevState, time: newTime };
          } else {
            clearInterval(timer);
            if (prevState.isStretching) {
              return { ...prevState, time: defaultTime, isStretching: false };
            } else {
              setShowAlert(true);
              return { ...prevState, isTimerActive: false };
            }
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerState.isTimerActive]);

  useEffect(() => {
    if (showAlert && autoCloseTimer === null) {
      startAutoCloseTimer();
    }
  }, [showAlert]);

  const handleInputMinutesChange = (e) => {
    setInputMinutes(e.target.value);
  };

  const handleInputSecondsChange = (e) => {
    setInputSeconds(e.target.value);
  };

  const handleSetTime = () => {
    const totalSeconds = parseInt(inputMinutes) * 60 + parseInt(inputSeconds);
    const newInitialTime = isNaN(totalSeconds) || totalSeconds <= 0 ? defaultTime : totalSeconds;
    setTimerState({ ...timerState, time: newInitialTime, isTimerActive: true });
    setShowAlert(false);
  };

  const handleAlertClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowAlert(false);
      setFadeOut(false);
      setTimerState({ ...timerState, time: stretchTime, isStretching: true, isTimerActive: true });
      if (!autoCloseTriggered && typeof onConfirm === 'function') {
        onConfirm();
      }
      setAutoCloseTriggered(false);
    }, 500);
  };

  const startAutoCloseTimer = () => {
    setAutoCloseTimer(setTimeout(() => {
      handleAutoClose();
      setAutoCloseTimer(null);
    }, autoCloseTime));
  };

  const handleAutoClose = () => {
    setAutoCloseTriggered(true);
    setShowAlert(false);
    setTimerState({ ...timerState, time: stretchTime, isStretching: true, isTimerActive: true });
  };

  useEffect(() => {
    return () => {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }
    };
  }, [autoCloseTimer]);

  const progressBarWidth = (timerState.time / (timerState.isStretching ? stretchTime : defaultTime)) * 100;
  const progressBarColor = timerState.isStretching ? '#808480' : '#60b1bf';

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const handleVideoClose = () => {
    setShowVideo(false);
  };

  return (
    <div className="timer-container">
      <h1>{timerState.isStretching ? '휴식 시간' : '알람'}</h1>
      <div className="timer-display">
        {Math.floor(timerState.time / 60)}:{(timerState.time % 60).toString().padStart(2, '0')}
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressBarWidth}%`, backgroundColor: progressBarColor }}
        ></div>
      </div>
      <div className="input-container">
        <input
          type="number"
          value={inputMinutes}
          onChange={handleInputMinutesChange}
          placeholder="분"
          disabled={timerState.isStretching}
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={handleInputSecondsChange}
          placeholder="초"
          disabled={timerState.isStretching}
        />
        <button onClick={handleSetTime} disabled={timerState.isStretching}>설정하기</button>
      </div>
      {showAlert && !timerState.isStretching && (
        <div className={`alert-overlay ${fadeOut ? 'fade-out' : ''}`}>
          <div className="alert">
            <p>스트레칭하세요!!</p>
            <button onClick={handleVideoClick}>영상 보기</button>
            <button onClick={handleAlertClose}>확인</button>
          </div>
          {showVideo && (
            <div className="video-overlay">
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/yZpgPj9RKLQ?start=12"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Stretching Video"
                ></iframe>
                <button className="video-close" onClick={handleVideoClose}>영상 닫기</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Timer;
