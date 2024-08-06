import React, { useContext, useState, useEffect } from 'react';
import { ClickContext } from './ClickContext';
import '../index.css';
import background from '../image/background.png';
import ilona1 from '../image/ilona.png';
import ilona2 from '../image/ilona2.png';
import ilona3 from '../image/ilona3.png';
import ironaIcon from '../image/ironaicon.png';
import eyeIcon from '../image/눈.png';
import mouthIcon from '../image/입.png';
import hairIcon from '../image/헤어.png';
import clothesIcon from '../image/옷.png';
import 기본눈 from '../image/기본눈.png';
import 기본입 from '../image/기본입.png';

const images = {
  '눈': [
    require('../image/store/눈1.png'),
    require('../image/store/눈3.png'),
    require('../image/store/눈1.png'),
    require('../image/store/눈6.png'),
    require('../image/store/눈1.png'),
    require('../image/store/눈3.png'),
  ],
  '입': [
    require('../image/store/입1.png'),
    require('../image/store/입2.png'),
    require('../image/store/입3.png'),
    require('../image/store/입4.png'),
    require('../image/store/입5.png'),
    require('../image/store/입6.png'),
  ],
  '헤어': [
    require('../image/store/헤어1.png'),
    require('../image/store/헤어2.png'),
    require('../image/store/헤어3.png'),
    require('../image/store/헤어4.png'),
    require('../image/store/헤어5.png'),
    require('../image/store/헤어6.png'),
  ],
  '옷': [
    require('../image/store/옷1.png'),
    require('../image/store/옷2.png'),
    require('../image/store/옷3.png'),
    require('../image/store/옷4.png'),
    require('../image/store/옷5.png'),
    require('../image/store/옷6.png'),
  ],
};

const getIlonaImage = (clickCount) => {
  if (clickCount >= 2) return ilona3;
  if (clickCount >= 1) return ilona2;
  return ilona1;
};

const getEyePosition = (clickCount) => {
  switch (clickCount) {
    case 0:
      return { top: '290px', left: '560px' }; 
    case 1:
      return { top: '70px', left: '530px' }; 
    case 2:
      return { top: '90px', left: '320px' }; 
    default:
      return { top: '280px', left: '330px'};
  }
};

const getMouthPosition = (clickCount) => {
  switch (clickCount) {
    case 0:
      return { top: '340px', left: '600px' }; 
    case 1:
      return { top: '150px', left: '570px' }; 
    case 2:
      return { top: '150px', left: '350px' }; 
    default:
      return { top: '320px', left: '370px'};
  }
};

const StoreModal = ({ onClose, selectedEye, selectedMouth, setSelectedEye, setSelectedMouth }) => {
  const { clickCount, nickname } = useContext(ClickContext);
  const [activeCategory, setActiveCategory] = useState('눈');
  const [fadeType, setFadeType] = useState('in');

  useEffect(() => {
    setFadeType('in');
  }, []);

  const handleClose = () => {
    setFadeType('out');
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleEyeClick = (image) => {
    if (activeCategory === '눈') {
      setSelectedEye(image);
    } else if (activeCategory === '입') {
      setSelectedMouth(image);
    }
  };

  const categories = [
    { name: '눈', icon: eyeIcon },
    { name: '입', icon: mouthIcon },
    { name: '헤어', icon: hairIcon },
    { name: '옷', icon: clothesIcon },
  ];

  const eyePosition = getEyePosition(clickCount);
  const mouthPosition = getMouthPosition(clickCount);

  return (
    <div className={`store-modal-overlay fade-${fadeType}`}>
      <div className="store-modal-content store-container" style={{ backgroundImage: `url(${background})` }}>
        <div className="store-header">
          <button className="home-button" onClick={handleClose}>
            상점 나가기
          </button>
        </div>
        <div className="store-nickname-container">
          <img src={ironaIcon} alt="irona icon" className="store-icon" />
          <div className="store-nickname-box">
            <p>일오나 상점</p>
          </div>
        </div>
        <div className="store-left-half">
          <div className="store-image-container">
            <img src={getIlonaImage(clickCount)} alt="ilona" className="store-imagecenter" />
            <img src={selectedEye || 기본눈} alt="기본 눈" style={{ position: 'absolute', ...eyePosition }} />
            <img src={selectedMouth || 기본입} alt="기본 입" style={{ position: 'absolute', ...mouthPosition }} />
          </div>
        </div>
        <div className="store-right-half">
          <div className="store-sidebar">
            {categories.map(category => (
              <button
                key={category.name}
                className={`category-button ${activeCategory === category.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.name)}
              >
                <img src={category.icon} alt={`${category.name} 아이콘`} className="category-icon" />
                {category.name}
              </button>
            ))}
          </div>
          <div className="store-layout">
            <div className="store-search-container">
              <input type="text" className="store-search-input" placeholder="검색..." />
            </div>
            <div className="store-content">
              {images[activeCategory].map((image, index) => (
                <div key={index} className="store-item">
                  <button className="store-section" onClick={() => handleEyeClick(image)}>
                    <img src={image} alt={`${activeCategory} 아이템 ${index + 1}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreModal;
