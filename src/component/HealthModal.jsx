import React, { useEffect } from 'react';
import activeneckbutton from '../image/neckandhuributton/목컬러.png';
import noactiveneckbutton from '../image/neckandhuributton/목흑백.png';
import activehuributton from '../image/neckandhuributton/허리컬러.png';
import noactivehuributton from '../image/neckandhuributton/허리흑백.png';

// 예제 이미지를 가져옵니다. 실제로는 올바른 경로와 이미지를 사용하세요.
import neckImage from '../image/alone.png';
import huriImage from '../image/chat.png';

const HealthModal = ({ neckActive, huriActive, handleButtonClick }) => {
  useEffect(() => {
    console.log('Neck Active:', neckActive);
    console.log('Huri Active:', huriActive);
  }, [neckActive, huriActive]);

  const neckLinks = [
    { title: '거북목 스트레칭', url: 'https://example.com/neck1', image: neckImage },
    { title: '목 통증 완화 운동', url: 'https://example.com/neck2', image: neckImage },
    { title: '목 건강 관리 팁', url: 'https://example.com/neck3', image: neckImage }
  ];

  const huriLinks = [
    { title: '허리 통증 완화 스트레칭', url: 'https://example.com/huri1', image: huriImage },
    { title: '허리 강화 운동', url: 'https://example.com/huri2', image: huriImage },
    { title: '허리 건강 유지 비결', url: 'https://example.com/huri3', image: huriImage }
  ];

  const renderLinks = () => {
    const links = neckActive ? neckLinks : huriLinks;
    return links.map((link, index) => (
      <div className="card" key={index}>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <img src={link.image} alt={link.title} className="card-image" />
        </a>
        <p>{link.title}</p>
        <a href={link.url} target="_blank" rel="noopener noreferrer">자세히 보기</a>
      </div>
    ));
  };

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
          {renderLinks()}
        </div>
      </div>
    </div>
  );
};

export default HealthModal;
