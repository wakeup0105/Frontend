import React, { useState, useEffect } from 'react';
import '../Timer.css';
import alarmsound  from '../audio/alarm.mp3';

const Timer = ({ onConfirm , onCancel}) => {
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
  const [isStretching, setIsStretching] = useState(false); // 스트레칭 상태
  const [showVideo, setShowVideo] = useState(false); // 영상 표시 상태

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
              setTime(initialTime); // 원래 타이머 시간으로 복원
              setIsTimerActive(true); // 원래 타이머 재시작
            } else {
              // 원래 타이머가 끝났을 때 알림 표시
              setShowAlert(true);
              setIsTimerActive(false); // 타이머 멈춤
            }
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, isStretching, initialTime]);

  useEffect(() => {
    let autoCloseTimer;
    if (showAlert && !isStretching) {
      autoCloseTimer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowAlert(false);
          setFadeOut(false);
          setIsStretching(false);
          setTime(initialTime); // 원래 타이머 시간으로 복원
          setIsTimerActive(true); // 원래 타이머 재시작
          onCancel(); // 자동 닫힐 때 onCancel 호출
        }, 500);
      }, 1 * 60 * 1000); // 10분 후에 팝업 닫기
    }
    return () => clearTimeout(autoCloseTimer);
  }, [showAlert, isStretching, initialTime, onCancel]);

  useEffect(() => {
    setMinutes(Math.floor(time / 60));
    setSeconds(time % 60);
  }, [time]);

  useEffect(() => {
    if (showAlert && !isStretching) {
      const audio = new Audio(alarmsound);
      audio.play();
    }
  }, [showAlert, isStretching]);

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
      setIsStretching(true); // 스트레칭 타이머 시작
      setTime(stretchTime); // 스트레칭 타이머로 설정
      setIsTimerActive(true); // 스트레칭 타이머 시작
      onConfirm(); // 추가: 확인 버튼 클릭 시 호출
    }, 500);
  };

  const handleVideoClick = () => {
    setShowVideo(true); // 영상 표시 상태로 변경
  };

  const handleVideoClose = () => {
    setShowVideo(false); // 영상 숨기기
  };

  const progressBarWidth = (time / (isStretching ? stretchTime : initialTime)) * 100;
  const progressBarColor = isStretching ? '#808480' : '#60b1bf'; // 스트레칭 타이머일 때 회색

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
          disabled={isStretching} // 스트레칭 상태에서 비활성화
        />
        <input
          type="number"
          value={inputSeconds}
          onChange={handleInputSecondsChange}
          placeholder="초"
          disabled={isStretching} // 스트레칭 상태에서 비활성화
        />
        <button onClick={handleSetTime} disabled={isStretching}>설정하기</button> {/* 스트레칭 상태에서 비활성화 */}
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
