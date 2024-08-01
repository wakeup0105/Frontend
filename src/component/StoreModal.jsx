import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import background from '../image/background.png';
import ilona1 from '../image/ilona.png';
import ilona2 from '../image/ilona2.png';
import ilona3 from '../image/ilona3.png';
import ironaIcon from '../image/ironaicon.png'; // Import the icon
import eyeIcon from '../image/눈.png';
import mouthIcon from '../image/입.png';
import hairIcon from '../image/헤어.png';
import clothesIcon from '../image/옷.png';
import { ClickContext } from './ClickContext';

const getIlonaImage = (clickCount) => {
  if (clickCount >= 2) return ilona3;
  if (clickCount >= 1) return ilona2;
  return ilona1;
};

const Store = () => {
  const { clickCount, nickname } = useContext(ClickContext);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('눈');

  const handleGoHome = () => {
    navigate('/profile');
  };

  const categories = [
    { name: '눈', icon: eyeIcon },
    { name: '입', icon: mouthIcon },
    { name: '헤어', icon: hairIcon },
    { name: '옷', icon: clothesIcon },
  ];

  return (
    <div className="store-container" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <div className="store-header">
        <button className="home-button" onClick={handleGoHome}>
          홈으로
        </button>
      </div>
      <div className="store-nickname-container">
        <img src={ironaIcon} alt="irona icon" className='store-icon'/>
        <div className="store-nickname-box">
          <p>{nickname}의 상점</p>
        </div>
      </div>
      <div className="store-left-half">
        <div className="store-image-container">
          <img src={getIlonaImage(clickCount)} alt="ilona" className='store-imagecenter'/>
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
            {[...Array(3)].map((_, rowIndex) => (
              <div key={rowIndex} className="store-row">
                {[...Array(2)].map((_, colIndex) => (
                  <button key={colIndex} className="store-section">
                    {activeCategory} 아이템 {rowIndex * 2 + colIndex + 1}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
