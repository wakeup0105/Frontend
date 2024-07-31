import React, { useState, useEffect } from 'react';
import '../Timer.css';

const Timer = ({ onConfirm }) => {
  const defaultTime = 20 * 60; // 기본값 20분
  const stretchTime = 60; // 스트레칭 타이머 1분
  const [initialTime, setInitialTime] = useState(defaultTime);
  const [time, setTime] = useState(defaultTime);
  const [minutes, setMinutes] = useState(Math.floor(defaultTime / 60));
  const [seconds, setSeconds] = useState(defaultTime % 60);
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isStretching, setIsStretching] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // 레벨 및 총 경험치량 상태 추가
  const [level, setLevel] = useState(1);
  const [totalExperience, setTotalExperience] = useState(10);

  useEffect(() => {
    let timer;
    if (isTimerActive) {
      timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timer);
            if (isStretching) {
              // 스트레칭 타이머가 끝나면 원래 타이머로 돌아감
              setIsStretching(false);
              setShowAlert(false);
              setTime(initialTime);
              setIsTimerActive(true);
            } else {
              // 원래 타이머가 끝났을 때 알림 표시
              setShowAlert(true);
              setIsTimerActive(false);
              // 레벨업 로직 추가
              levelUp();
            }
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, isStretching]);

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
    setIsTimerActive(true);
  };

  const handleAlertClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowAlert(false);
      setFadeOut(false);
      setIsStretching(true);
      setTime(stretchTime);
      setIsTimerActive(true);
      onConfirm(); // 추가: 확인 버튼 클릭 시 호출
    }, 500);
  };

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const handleVideoClose = () => {
    setShowVideo(false);
  };

  // 레벨업 함수
  const levelUp = () => {
    if (level < 5) { // 최대 레벨 5
      setLevel(prevLevel => {
        const newLevel = prevLevel + 1;
        setTotalExperience(newLevel * 10); // 레벨에 따라 총 경험치량 증가
        return newLevel;
      });
    }
  };

  const progressBarWidth = (time / (isStretching ? stretchTime : initialTime)) * 100;
  const progressBarColor = isStretching ? '#808480' : '#60b1bf';

  return (
    <div className="timer-container">
      <h1>{isStretching ? '휴식 시간' : '알람'}</h1>
      <div className="timer-display">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
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
          disabled={isStretching}
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={handleInputSecondsChange}
          placeholder="초"
          disabled={isStretching}
        />
        <button onClick={handleSetTime} disabled={isStretching}>설정하기</button>
      </div>
      {showAlert && !isStretching && (
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
