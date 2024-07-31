import React, { useState, useEffect } from 'react';
import '../index.css';
import { useLocation } from 'react-router-dom';
import health from '../image/health.png';
import healthClick from '../image/healthclick.png'; // 클릭 시 이미지
import ring1 from '../image/ring1.png';
import ringClick from '../image/ringclick.png'; // 클릭 시 이미지
import setting from '../image/setting.png';
import settingClick from '../image/settingclick.png'; // 클릭 시 이미지
import { Link } from 'react-router-dom';
import memark1 from '../image/15memark.png';
import memark2 from '../image/15memark2.png';
import ilona1 from '../image/ilona.png';
import ilona2 from '../image/ilona2.png';
import ilona3 from '../image/ilona3.png';
import enter from '../image/enter.png';
import chat from '../image/chat.png';
import store from '../image/cashstore.png';
import userinformation from '../image/userinformation.png';
import HealthModal from './HealthModal';
import RingModal from './RingModal';
import SettingModal from './SettingModal';
import activeneckbutton from '../image/neckandhuributton/목컬러.png';
import noactiveneckbutton from '../image/neckandhuributton/목흑백.png';
import activehuributton from '../image/neckandhuributton/허리컬러.png';
import noactivehuributton from '../image/neckandhuributton/허리흑백.png';
import Timer from './Timer';
import ironaicon from '../image/ironaicon.png';
import '../Timer.css';
import '../profile.css';
import EditButton from './EditButton';
import moreInfoImage from '../image/moreInfoImage.png';

export default function Profile() {
  const [neckActive, setNeckActive] = useState(true);
  const [huriActive, setHuriActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fadeOutModal, setFadeOutModal] = useState(false);
  const [fadeInModal, setFadeInModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [showMoreInfoImage, setShowMoreInfoImage] = useState(false);
  const [fadeOutMoreInfoImage, setFadeOutMoreInfoImage] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [healthClicked, setHealthClicked] = useState(false);
  const [ringClicked, setRingClicked] = useState(false);
  const [settingClicked, setSettingClicked] = useState(false);

  const location = useLocation();
  const { state } = location;
  const nickname = state?.nickname || '';

  const [cxp, setCxp] = useState(0); // 현재 경험치
  const [level, setLevel] = useState(1); // 현재 레벨

  // 레벨에 따른 필요 경험치
  const levelUpRequirements = [0, 10, 20, 30, 40, 50]; // 레벨 0은 사용하지 않음

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
  
  const totalXPRequired = levelUpRequirements[level];
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
    return (
      <div className="goal-progress">
        <div className="stress-level">어제 보다 5회 더 스트레칭했어요!</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: '60%' }}></div>
        </div>
        <div className="goal">목표에 60% 달성했어요 (30/50회)</div>
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

  const handleMoreInfoClick = () => {
    setShowMoreInfoImage(true);
  };

  const closeMoreInfoImage = () => {
    setFadeOutMoreInfoImage(true);
    setTimeout(() => {
      setShowMoreInfoImage(false);
      setFadeOutMoreInfoImage(false);
    }, 500);
  };

  const incrementClickCount = () => {
    setClickCount((prevCount) => prevCount + 1);
    setCxp((prevCxp) => prevCxp + 4); // 경험치 4 증가
  };

  const getIlonaImage = () => {
    if (clickCount >= 2) return ilona3;
    if (clickCount >= 1) return ilona2;
    return ilona1;
  };

  const handleClick = (setClickState, duration = 100) => {
    setClickState(true);
    setTimeout(() => {
      setClickState(false);
    }, duration);
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
            {modalType === 'Setting' && <SettingModal onClose={closeModal}/>}
          </div>
        </div>
      )}

      {showMoreInfoImage && (
        <div className={`more-info-overlay ${fadeOutMoreInfoImage ? 'fade-out' : 'fade-in'}`} onClick={closeMoreInfoImage}>
          <div className="more-info-content">
            <img src={moreInfoImage} alt="More Info" />
          </div>
        </div>
      )}

      <div className="top">
        <span><img src={memark2} alt="character1" /><img src={memark1} alt="character2" /></span>
        <Link to="/" className="logout">Log out</Link>
      </div>
      <div className="second-top">
        <span></span>
        <div className="icon">
          <button
            className="icon-button"
            onClick={() => {
              handleClick(setHealthClicked);
              handleIconClick('Health');
            }}
          >
            <img src={healthClicked ? healthClick : health} alt="health" />
          </button>
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
                <span className="level">Level.{level}</span> {/* 레벨 표시 */}
              </div>
              <div className="xp-box" title={`현재 경험치: ${cxp} / 필요 경험치: ${totalXPRequired}`}>
                <div 
                  className="xp-bar" 
                  style={{ width: `${xpBarWidth}%` }} 
                ></div> {/* 경험치 바와 호버 텍스트 */}
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

          <img src={getIlonaImage()} alt="ilona" className='imagecenter'/>
          <div className="icon">
            <button className="icon-button">
              <img src={enter} alt="enter" />
            </button>
            <button className="icon-button">
              <img src={chat} alt="chat" />
            </button>
            <button className="icon-button">
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
