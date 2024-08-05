import React, { useEffect, useState } from 'react';
import '../JamModal.css';
import jamImage1 from '../image/jam3.png';
import jamImage2 from '../image/jam2.png';
import jamImage3 from '../image/jam1.png';

const JamModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('purchase');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // 애니메이션 시간과 일치하도록 설정
  };

  const jamItems = [
    { image: jamImage1, price: '500 - $5', link: '/payment/100' },
    { image: jamImage2, price: '1000 - $9', link: '/payment/200' },
    { image: jamImage3, price: '2000 - $25', link: '/payment/500' },
  ];

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className={`jam-modal-overlay ${isVisible ? 'show' : ''}`} onClick={handleClose}>
      <div className="jam-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="jam-modal-title">잼 구매하기</h2>
        <div className="button-container">
          <button
            className={`action-button ${activeButton === 'purchase' ? 'active' : ''}`}
            onClick={() => handleButtonClick('purchase')}
            disabled={activeButton === 'factory'}
          >
            잼 구매
          </button>
          <button
            className={`action-button ${activeButton === 'factory' ? 'active' : ''}`}
            onClick={() => handleButtonClick('factory')}
            disabled={activeButton === 'purchase'}
          >
            잼 공장
          </button>
        </div>
        {activeButton === 'purchase' && (
          <div className="jam-card-container">
            {jamItems.map((item, index) => (
              <div
                className="jam-card"
                key={index}
                onClick={() => window.location.href = item.link}
              >
                <div className="jam-card-content">
                  <img src={item.image} alt={`Jam ${index + 1}`} className="jam-card-image" />
                  <p className="jam-card-price">{item.price}</p>
                </div>
                <div className="jam-card-buy">구매하기</div>
              </div>
            ))}
          </div>
        )}
        {activeButton === 'factory' && (
          <div className="factory-content">
            <h3>잼 공장 관리</h3>
            <p>여기서 잼 공장에 관련된 내용을 관리할 수 있습니다.</p>
            {/* 공장 관련 컨텐츠 추가 */}
          </div>
        )}
      </div>
    </div>
  );
};

export default JamModal;
