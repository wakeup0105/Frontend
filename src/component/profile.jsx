import React, { useState, useEffect } from 'react';
import '../index.css';
import health from '../image/health.png';
import ring1 from '../image/ring1.png';
import setting from '../image/setting.png';
import character1 from '../image/character1.png';
import character2 from '../image/character2.png';
import memark1 from '../image/15memark.png';
import memark2 from '../image/15memark2.png';
import ilona from '../image/ilona.png';
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
import '../Timer.css';

export default function Profile() {
  const [neckActive, setNeckActive] = useState(true);
  const [huriActive, setHuriActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fadeOutModal, setFadeOutModal] = useState(false);
  const [fadeInModal, setFadeInModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleButtonClick = (button) => {
    if (button === 'neck') {
      setNeckActive(true);
      setHuriActive(false);
    } else if (button === 'huri') {
      setNeckActive(false);
      setHuriActive(true);
    }
  };

  const handleIconClick = (content) => {
    if (content === 'Health') {
      setModalContent(
        <HealthModal neckActive={neckActive} huriActive={huriActive} handleButtonClick={handleButtonClick} />
      );
    } else if (content === 'Ring') {
      setModalContent(<RingModal />);
    } else if (content === 'Setting') {
      setModalContent(<SettingModal />);
    }
    setShowModal(true);
  };

  useEffect(() => {
    // Modal이 열릴 때마다 상태를 새로고침
    if (showModal) {
      setModalContent(
        <HealthModal neckActive={neckActive} huriActive={huriActive} handleButtonClick={handleButtonClick} />
      );
    }
  }, [neckActive, huriActive, showModal]);
  
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

  const EditButton = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [introText, setIntroText] = useState("");

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleSaveClick = () => {
      setIsEditing(false);
    };

    const handleChange = (e) => {
      setIntroText(e.target.value);
    };

    return (
      <div className="edit-section">
        {isEditing ? (
          <div>
            <input 
              type="text" 
              placeholder="한 줄 소개 작성하기" 
              value={introText} 
              onChange={handleChange} 
            />
            <button onClick={handleSaveClick}>저장</button>
          </div>
        ) : (
          <div className="intro-display">
            <span>{introText || "한 줄 소개 작성하기"}</span>
            <button className="edit-button" onClick={handleEditClick}>편집하기</button>
          </div>
        )}
      </div>
    );
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
            {modalContent}
            <div className="modal-footer">
              <button>더보기</button>
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

      <div className="top">
        <span><img src={memark2} alt="character1" /><img src={memark1} alt="character2" /></span>
        <a href="#">Log out</a>
      </div>
      <div className="second-top">
        <div className="character">
          <img src={character1} alt="character1" />
          <img src={character2} alt="character2" />
        </div>
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
          <div>
            <img src={character1} alt="character1" />
            <img src={character2} alt="character2" />
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

          <img src={ilona} alt="ilona" className='imagecenter'/>
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
          <div className="sub-box"><Timer /></div>
          <div className="sub-box"><GoalProgress/></div>
          <div className="sub-box"><EditButton/></div>
        </div>
      </div>
    </div>
  );
}
