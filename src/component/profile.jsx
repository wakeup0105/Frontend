import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClickContext } from './ClickContext';
import HealthModal from './HealthModal';
import RingModal from './RingModal';
import SettingModal from './SettingModal';
import Timer from './Timer';
import JamModal from './JamModal'; // JamModal 추가
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
import ironaicon from '../image/ironaicon.png';
import jam from '../image/jam.png'; // jam 이미지 추가
import 기본눈 from '../image/기본눈.png'; // 기본 눈 이미지 추가
import 기본입 from '../image/기본입.png'; // 기본 입 이미지 추가
import '../Timer.css';
import '../profile.css';
import '../GoalProgress.css';
import '../JamModal.css'; // JamModal CSS 추가
import EditButton from './EditButton';
import EnterModal from './EnterModal';


const getIlonaImage = (clickCount) => {
  if (clickCount >= 2) return ilona3;
  if (clickCount >= 1) return ilona2;
  return ilona1;
};

const getEyePosition = (clickCount) => {
  switch (clickCount) {
    case 0:
      return { top: '60%', left: '72%',transform: 'translate(-20%, -10%)' }; // 비율로 위치 설정
    case 1:
      return { top: '15%', left: '65%' ,transform: 'translate(-15%, -20%)'};  
    case 2:
      return { top: '10%', left: '44%', transform: 'translate(-15%, -20%)' };
    default:
      return { top: '10%', left: '44%', transform: 'translate(-15%, -20%)' };
  }
};

const getMouthPosition = (clickCount) => {
  switch (clickCount) {
    case 0:
      return { top: '70%', left: '77%', transform: 'translate(-20%, -10%)'  }; // 비율로 위치 설정
    case 1:
      return { top: '25%', left: '70%',transform: 'translate(-10%, -50%)' };  
    case 2:
      return { top: '20%', left: '48%' };
    default:
      return { top: '20%', left: '48%' };
  }
};

export default function Profile() {
  const { nickname, clickCount, setClickCount, selectedEye, selectedMouth, setSelectedEye, setSelectedMouth } = useContext(ClickContext);
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
  const [jamCount, setJamCount] = useState(300); 
  const navigate = useNavigate();
  const [cxp, setCxp] = useState(0); 
  const [level, setLevel] = useState(1); 
  const [showJamModal, setShowJamModal] = useState(false); 
  const [jamAnimation, setJamAnimation] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false); 
  const [eyePosition, setEyePosition] = useState(getEyePosition(clickCount));
  const [mouthPosition, setMouthPosition] = useState(getMouthPosition(clickCount));
  const [showEnterModal, setShowEnterModal] = useState(false);


  const handleRewardClick = () => {
    setCxp((prevCxp) => prevCxp + 10);
    setRewardReceived(true);
    setRewardMessage('보상받기 완료✔');
  };

  useEffect(() => {
    if (jamAnimation) {
      const timer = setTimeout(() => {
        setJamAnimation(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [jamAnimation]);

  useEffect(() => {
    let currentCxp = cxp;
    let currentLevel = level;
    let newJamCount = jamCount;

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
      newJamCount += jamRewards(currentLevel);
      setJamAnimation(true);
    }

    setLevel(currentLevel);
    setCxp(currentCxp);
    setJamCount(newJamCount);
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

  const closeModal = () => {
    setFadeOutModal(true);
    setTimeout(() => {
      setShowModal(false);
      setFadeOutModal(false);
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
                class="goalprogress-fill"
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
    setClickCount((prevCount) => {
      if (prevCount < 2) {
        return prevCount + 1;
      } else {
        return prevCount;
      }
    });
    setCxp((prevCxp) => prevCxp + 4);
    setEyePosition(getEyePosition(clickCount + 1));
    setMouthPosition(getMouthPosition(clickCount + 1));
  };

  const decrementClickCount = () => {
    setClickCount((prevCount) => {
      if (prevCount === 0) {
        return prevCount;
      } else {
        return prevCount - 1;
      }
    });
    setEyePosition(getEyePosition(clickCount - 1));
    setMouthPosition(getMouthPosition(clickCount - 1));
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


      {showStoreModal && (
        <StoreModal 
          onClose={() => setShowStoreModal(false)} 
          selectedEye={selectedEye}
          selectedMouth={selectedMouth}
          setSelectedEye={setSelectedEye}
          setSelectedMouth={setSelectedMouth}
        /> 
      )}

      {showEnterModal && (
        <EnterModal onClose={() => setShowEnterModal(false)} />
      )}

      <div className="top">
        <span><img src={memark2} alt="character1" /><img src={memark1} alt="character2" /></span>
        <Link to="/" className="logout">Log out</Link>
      </div>
      <div className="second-top">
        <span></span>
        <div className="icon">
          <div className="jam-container">
            <button className={`icon-button ${jamAnimation ? 'jam-animation' : ''}`} onClick={() => setShowJamModal(true)}>
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
        
          <div className="relative-position-container"> {/* 추가된 부모 컨테이너 */}
            <img src={getIlonaImage(clickCount)} alt="ilona" className='imagecenter' />
            <img src={selectedEye || 기본눈} alt="기본 눈" style={{ position: 'absolute', ...eyePosition }} />
            <img src={selectedMouth || 기본입} alt="기본 입" style={{ position: 'absolute', ...mouthPosition }} />
          </div>

          <div className="icon">
            <button className="icon-button" onClick={() => setShowStoreModal(true)}> {/* StoreModal 열기 */}
              <img src={store} alt="store" />
            </button>
            <button
              className="icon-button"
              onClick={() => setShowProfileCard(true)}
            >
              <img src={userinformation} alt="userinformation" className='icon-image' />
            </button>
          </div>
        </div>
        {showProfileCard && (
          <div className="profile-card-popup">
            <div className="profile-card-content">
              <button className="close-button" onClick={() => setShowProfileCard(false)}>X</button>
              <h2>Profile card</h2>
              <div className="profile-info">
                <p><span>닉네임:</span> {nickname}</p>
                <p><span>레벨:</span> {level}</p>
                <p><span>경험치:</span> {cxp} / {totalXPRequired}</p>
              </div>
            </div>
          </div>
        )}

        <div className="Right-Box">
          <div className="sub-box"><Timer onConfirm={incrementClickCount} onCancel={decrementClickCount} /></div>
          <div className="sub-box"><GoalProgress /></div>
          <div className="sub-box"><EditButton /></div>
        </div>
      </div>
    </div>
  );
}
