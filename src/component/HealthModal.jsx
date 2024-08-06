import React, { useEffect, useState } from 'react';
import activeneckbutton from '../image/neckandhuributton/목컬러.png';
import noactiveneckbutton from '../image/neckandhuributton/목흑백.png';
import activehuributton from '../image/neckandhuributton/허리컬러.png';
import noactivehuributton from '../image/neckandhuributton/허리흑백.png';

import neckImage1 from '../image/거북목.jpg';
import neckImage2 from '../image/거북목2.jpg';
import neckImage3 from '../image/거북목3.jpg';
import huriImage1 from '../image/허리1.jpg';
import huriImage2 from '../image/허리2.jpg';
import huriImage3 from '../image/허리3.jpg';

import neckmoreinfo from '../image/moreInfoImage.png';

const HealthModal = ({ neckActive, huriActive, handleButtonClick, onClose }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [moreInfoImage, setMoreInfoImage] = useState(null);

  useEffect(() => {
    console.log('Neck Active:', neckActive);
    console.log('Huri Active:', huriActive);
  }, [neckActive, huriActive]);

  const neckLinks = [
    { title: '거북목 스트레칭', url: 'http://www.hitnews.co.kr/news/articleView.html?idxno=51221', image: neckImage1 },
    { title: '목 통증 완화 운동', url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5972', image: neckImage2 },
    { title: '목 건강 관리 팁', url: 'https://www.korea.kr/news/interviewView.do?newsId=148841222#interview', image: neckImage3 }
  ];

  const huriLinks = [
    { title: '허리 통증 완화 스트레칭', url: 'https://webzine.comwel.or.kr/vol92/sub2-4.html', image: huriImage1 },
    { title: '허리 강화 운동', url: 'https://www.sportsmed.or.kr/board/view.html?num=905&start=70&code=sportsdoctor&key=&keyword=', image: huriImage2 },
    { title: '허리 건강 유지 비결', url: 'https://www.korea.kr/news/issueQAView.do?newsId=148813069', image: huriImage3 }
  ];

  const renderLinks = () => {
    const links = neckActive ? neckLinks : huriLinks;
    return links.map((link, index) => (
      <div className="card" key={index}>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <img src={link.image} alt={link.title} className="card-image" />
        </a>
        <p>{link.title}</p>
      </div>
    ));
  };

  const handleMoreInfoClick = () => {
    setMoreInfoImage(neckActive ? neckmoreinfo : huriImage1);
    setShowMoreInfo(true);
  };

  const closeMoreInfo = () => {
    setShowMoreInfo(false);
    setMoreInfoImage(null);
  };

  return (
    <div className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <h2>이로나님 이 스트레칭은 어때요?</h2>
      </div>
      <div className="modal-header">
        <button className="icon-button" onClick={() => handleButtonClick('neck')} disabled={neckActive}>
          <img src={neckActive ? activeneckbutton : noactiveneckbutton} alt="neck" />
        </button>
        <button className="icon-button" onClick={() => handleButtonClick('huri')} disabled={huriActive}>
          <img src={huriActive ? activehuributton : noactivehuributton} alt="huri" />
        </button>
      </div>
      <div className="modal-body">
        <div className="card-container">
          {renderLinks()}
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={handleMoreInfoClick}>더보기</button>
        <button onClick={onClose}>닫기</button>
      </div>
      {showMoreInfo && (
        <div className="more-info-overlay" onClick={closeMoreInfo}>
          <div className="more-info-content" onClick={(e) => e.stopPropagation()}>
            <img src={moreInfoImage} alt="More Info" />
            <button onClick={closeMoreInfo}>닫기</button>
          </div>
        </div>
      )}
    </div>
  </div>

  );
};

export default HealthModal;
