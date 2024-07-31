import React, { useState, useEffect } from 'react';
import '../index.css';
import { useLocation } from 'react-router-dom';
import health from '../image/health.png';
import ring1 from '../image/ring1.png';
import setting from '../image/setting.png';
import { Link } from 'react-router-dom'; // Link 컴포넌트 import
import memark1 from '../image/15memark.png';
import memark2 from '../image/15memark2.png';
import ilona1 from '../image/ilona.png'; // 기존 이미지
import ilona2 from '../image/ilona2.png'; // 새로운 이미지 1
import ilona3 from '../image/ilona3.png'; // 새로운 이미지 2
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
import Timer from './Timer'; // Timer를 별도의 파일에서 가져옵니다.
import ironaicon from '../image/ironaicon.png';
import '../Timer.css';
import '../profile.css';
import EditButton from './EditButton'; // EditButton을 임포트합니다.
import moreInfoImage from '../image/moreInfoImage.png'; // 추가: 더보기 이미지

export default function Profile() {
  const [neckActive, setNeckActive] = useState(true);
  const [huriActive, setHuriActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fadeOutModal, setFadeOutModal] = useState(false);
  const [fadeInModal, setFadeInModal] = useState(false);
  const [modalType, setModalType] = useState(null); // modalType 상태 추가
  const [showMoreInfoImage, setShowMoreInfoImage] = useState(false); // 추가: 더보기 이미지 상태
  const [fadeOutMoreInfoImage, setFadeOutMoreInfoImage] = useState(false); // 추가: 더보기 이미지 애니메이션 상태
  const [clickCount, setClickCount] = useState(0); // 추가: 확인 버튼 클릭 횟수 상태

  const location = useLocation();
  const { state } = location;
  const nickname = state?.nickname || ''; // 전달된 nickname을 받아옵니다.

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

  // 추가: 더보기 버튼 클릭 핸들러
  const handleMoreInfoClick = () => {
    setShowMoreInfoImage(true);
  };

  // 추가: 더보기 이미지 닫기 핸들러
  const closeMoreInfoImage = () => {
    setFadeOutMoreInfoImage(true);
    setTimeout(() => {
      setShowMoreInfoImage(false);
      setFadeOutMoreInfoImage(false);
    }, 500);
  };

  // 추가: 타이머에서 클릭 횟수 증가 함수
  const incrementClickCount = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  // 이미지 변경을 위한 조건
    const getIlonaImage = () => {
      if (clickCount >= 2) return ilona3; // 2번 클릭 시 ilona3
      if (clickCount >= 1) return ilona2; // 1번 클릭 시 ilona2
      return ilona1; // 그 외에는 ilona1
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
              <HealthModal neckActive={neckActive} huriActive={huriActive} handleButtonClick={handleButtonClick} />
            )}
            {modalType === 'Ring' && <RingModal onClose={closeModal} />} {/* onClose prop 전달 */}
            {modalType === 'Setting' && <SettingModal />}
            <div className="modal-footer">
              {modalType === 'Health' && <button onClick={handleMoreInfoClick}>더보기</button>}
              <button onClick={closeModal}>닫기</button>
            </div>
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
          <button className="icon-button" onClick={() => handleIconClick('Health')}>
            <img src={health} alt="health" />
          </button>
          <button className="icon-button" onClick={() => handleIconClick('Ring')}>
            <img src={ring1} alt="ring1" />
          </button>
          <button className="icon-button" onClick={() => handleIconClick('Setting')}>
            <img src={setting} alt="setting" />
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
                <span className="level">Level.1</span>
              </div>
              <div className="xp-box">
                <div className="xp-bar" style={{ width: '70%' }}></div>
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
