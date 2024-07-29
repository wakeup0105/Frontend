// HealthModal.js
import React from 'react';
import activeneckbutton from '../image/neckandhuributton/목컬러.png';
import noactiveneckbutton from '../image/neckandhuributton/목흑백.png';
import activehuributton from '../image/neckandhuributton/허리컬러.png';
import noactivehuributton from '../image/neckandhuributton/허리흑백.png';

const HealthModal = ({ neckActive, huriActive, handleButtonClick }) => {
  return (
    <div>
      <div className="modal-header">
        <h2>이로나님 이 스트레칭은 어때요?</h2>
      </div>
      <div className="modal-header">
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
      <div className="modal-body">
        <div className="card-container">
          <div className="card">
            <p>재활의학과 교수가 보장하는 초간단 거북목 스트레칭</p>
            <p>소요시간: 15분</p>
            <p>난이도: 상</p>
          </div>
          <div className="card">
            <p>재활의학과 교수가 보장하는 초간단 거북목 스트레칭</p>
            <p>소요시간: 15분</p>
            <p>난이도: 중</p>
          </div>
          <div className="card">
            <p>재활의학과 교수가 보장하는 초간단 거북목 스트레칭</p>
            <p>소요시간: 15분</p>
            <p>난이도: 하</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthModal;