import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClickContext } from './ClickContext';
import HealthModal from './HealthModal';
import RingModal from './RingModal';
import SettingModal from './SettingModal';
import Timer from './Timer';
import StoreModal from './StoreModal'; // StoreModal 추가
import memark1 from '../image/15memark.png';
import memark2 from '../image/15memark2.png';
import ilona1 from '../image/ilona.png';
import ilona2 from '../image/ilona2.png';
import ilona3 from '../image/ilona3.png';
import health from '../image/health.png';
import healthClick from '../image/healthclick.png';
import ring1 from '../image/ring1.png';
import ringClick from '../image/ringclick.png';
import setting from '../image/setting.png';
import settingClick from '../image/settingclick.png';
import enter from '../image/enter.png';
import chat from '../image/chat.png';
import store from '../image/cashstore.png';
import userinformation from '../image/userinformation.png';
import activeneckbutton from '../image/neckandhuributton/목컬러.png';
import noactiveneckbutton from '../image/neckandhuributton/목흑백.png';
import activehuributton from '../image/neckandhuributton/허리컬러.png';
import noactivehuributton from '../image/neckandhuributton/허리흑백.png';
import Chat from './Chat/Chatapp';
import ironaicon from '../image/ironaicon.png';
import jam from '../image/jam.png'; // jam 이미지 추가
import '../Timer.css';
import '../profile.css';
import '../GoalProgress.css';
import EditButton from './EditButton';

const getIlonaImage = (clickCount) => {
  if (clickCount >= 2) return ilona3;
  if (clickCount >= 1) return ilona2;
  return ilona1;
};

export default function Profile() {
  const { nickname, setNickname, clickCount, setClickCount } = useContext(ClickContext); // clickCount 추가
  const [neckActive, setNeckActive] = useState(true);
  const [huriActive, setHuriActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fadeOutModal, setFadeOutModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [rewardMessage, setRewardMessage] = useState('');
  const [rewardReceived, setRewardReceived] = useState(false);
  const [challengeCount, setChallengeCount] = useState(0);
  const [healthClicked, setHealthClicked] = useState(false);
  const [ringClicked, setRingClicked] = useState(false);
  const [settingClicked, setSettingClicked] = useState(false);
  const [fadeInModal, setFadeInModal] = useState(false);
  const [jamCount, setJamCount] = useState(300); // 기본 잼 개수 설정
  const navigate = useNavigate();
  const [cxp, setCxp] = useState(0); // 로컬 상태로 관리
  const [level, setLevel] = useState(1); // 로컬 상태로 관리
  const [showStoreModal, setShowStoreModal] = useState(false); // 모달 상태 관리

  const handleRewardClick = () => {
    setCxp((prevCxp) => prevCxp + 10);
    setRewardReceived(true);
    setRewardMessage('보상받기 완료✔');
  };

  useEffect(() => {
    let currentCxp = cxp;
    let currentLevel = level;
    let newJamCount = jamCount;

    // 레벨업 요구 경험치 배열을 50레벨까지 확장
    const levelUpRequirements = Array.from({ length: 50 }, (_, i) => i * 10);
    
    const jamRewards = (level) => {
      if (level <= 9) return 30;
      if (level <= 14) return 70;
      if (level <= 19) return 100;
      if (level <= 24) return 200;
      if (level <= 29) return 300;
      if (level <= 34) return 400;
      if (level <= 39) return 500;
      return 700;
    };

    while (currentLevel < levelUpRequirements.length - 1 && currentCxp >= levelUpRequirements[currentLevel]) {
      currentCxp -= levelUpRequirements[currentLevel];
      currentLevel++;
      newJamCount += jamRewards(currentLevel); // 레벨업할 때마다 잼 추가
    }

    setLevel(currentLevel);
    setCxp(currentCxp);
    setJamCount(newJamCount); // 잼 개수 업데이트
  }, [cxp, level, jamCount]);

  const totalXPRequired = Array.from({ length: 50 }, (_, i) => i * 10)[level];
  const xpBarWidth = (cxp / totalXPRequired) * 100;

  const handleButtonClick = (button) => {
    if (button === 'neck') {
      setNeckActive(true);
      setHuriActive(false);
    } else if (button === 'huri') {
      setNeckActive(false);
      setHuriActive(true);
    }
  };

  const handleIconClick = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      setFadeInModal(true);
    }
  }, [showModal]);

  const closeModal = () => {
    setFadeOutModal(true);
    setTimeout(() => {
      setShowModal(false);
      setFadeOutModal(false);
      setFadeInModal(false);
    }, 500);
  };

  const GoalProgress = () => {
    const goalchallengeCount = 10;
    const progressPercentage = (challengeCount / goalchallengeCount) * 100;
    const isChallengeComplete = challengeCount >= goalchallengeCount;
  
    return (
      <div className="goal-progress">
        <h1>{isChallengeComplete ? "✨도전과제 성공✨" : "✨도전 과제✨"}</h1>
        <br />
        {!isChallengeComplete && (
          <>
            <div className="goal">
              <h2 className="goal-text">현재 자세 고친 횟수: {challengeCount} / 목표 횟수: {goalchallengeCount}</h2>
            </div>
            <div className="goalprogress-bar">
              <div 
                className="goalprogress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </>
        )}
        {isChallengeComplete && !rewardReceived && (
          <button className="reward-button" onClick={handleRewardClick}>보상받기🎁</button>
        )}
        {rewardReceived && <div className="reward-message">{rewardMessage}</div>}
      </div>
    );
  };

  const handleAlertClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowAlert(false);
      setFadeOut(false);
    }, 500);
  };

  const incrementClickCount = () => {
    setChallengeCount((prevCount) => prevCount + 1);
    setClickCount((prevCount) => prevCount + 1);
    setCxp((prevCxp) => prevCxp + 4);
  };

  const handleClick = (setter) => {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 100);
  };

  return (
    <div className="container">
      {showAlert && (
        <div className={`alert-overlay ${fadeOut ? 'fade-out' : ''}`} onClick={handleAlertClose}>
          <div className="alert">
            스트레칭하세요!!
          </div>
        </div>
      )}

      {showModal && (
        <div className={`modal ${fadeOutModal ? 'fade-out' : 'fade-in'}`} onClick={closeModal}>
          <div className="modal-content modal-content-custom" onClick={(e) => e.stopPropagation()}>
            {modalType === 'Health' && (
              <HealthModal neckActive={neckActive} huriActive={huriActive} handleButtonClick={handleButtonClick} onClose={closeModal} />
            )}
            {modalType === 'Ring' && <RingModal onClose={closeModal} />}
            {modalType === 'Setting' && <SettingModal onClose={closeModal} />}
          </div>
        </div>
      )}

      {showStoreModal && <StoreModal onClose={() => setShowStoreModal(false)} />}

      <div className="top">
        <span><img src={memark2} alt="character1" /><img src={memark1} alt="character2" /></span>
        <Link to="/" className="logout">Log out</Link>
      </div>
      <div className="second-top">
        <span></span>
        <div className="icon">
          <div className="jam-container">
            <button className="icon-button">
              <img src={jam} alt="jam" />
              <div className="jam-text">{jamCount}</div>
            </button>
          </div>
          <button
            className="icon-button"
            onClick={() => {
              handleClick(setHealthClicked);
              handleIconClick('Health');
            }}
          >
            <img src={healthClicked ? healthClick : health} alt="health" />
          </button>
          <div>
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
          <button
            className="icon-button"
            onClick={() => {
              handleClick(setRingClicked);
              handleIconClick('Ring');
            }}
          >
            <img src={ringClicked ? ringClick : ring1} alt="ring1" />
          </button>
          <button
            className="icon-button"
            onClick={() => {
              handleClick(setSettingClicked);
              handleIconClick('Setting');
            }}
          >
            <img src={settingClicked ? settingClick : setting} alt="setting" />
          </button>
        </div>
      </div>
      <div className="Main-Layout">
        <div className="Left-Box">
          <div className="profile-container">
            <div className="icon-box">
              <img src={ironaicon} alt="character1" />
            </div>
            <div className="info-container">
              <div className="name-level-box">
                <span className="username">{nickname}</span>
                <span className="level">Level.{level}</span>
              </div>
              <div className="xp-box" title={`현재 경험치: ${cxp} / 필요 경험치: ${totalXPRequired}`}>
                <div 
                  className="xp-bar" 
                  style={{ width: `${xpBarWidth}%` }} 
                ></div>
              </div>
            </div>
          </div>
          <div className="icon">
            <button 
              className="icon-button" 
              onClick={() => handleButtonClick('neck')}
              disabled={neckActive}
            >
              <img src={neckActive ? activeneckbutton : noactiveneckbutton} alt="neck" />
            </button>
            <button 
              className="icon-button" 
              onClick={() => handleButtonClick('huri')}
              disabled={huriActive}
            >
              <img src={huriActive ? activehuributton : noactivehuributton} alt="huri" />
            </button>
          </div>

          <img src={getIlonaImage(clickCount)} alt="ilona" className='imagecenter'/>
          <div className="icon">
            <button className="icon-button">
              <img src={enter} alt="enter" />
            </button>
            <button className="icon-button" onClick={() => navigate('/chat')}>
              <img src={chat} alt="chat" />
            </button>
            <button className="icon-button" onClick={() => setShowStoreModal(true)}>
              <img src={store} alt="store" />
            </button>
            <button className="icon-button">
              <img src={userinformation} alt="userinformation" className='icon-image'/>
            </button>
          </div>
        </div>
        <div className="Right-Box">
          <div className="sub-box"><Timer onConfirm={incrementClickCount} /></div>
          <div className="sub-box"><GoalProgress/></div>
          <div className="sub-box"><EditButton/></div>
        </div>
      </div>
    </div>
  );
}
