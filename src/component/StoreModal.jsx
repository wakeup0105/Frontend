import React, { useContext } from 'react';
import '../index.css';
import background from '../image/background.png';
import ilona1 from '../image/ilona.png';
import ilona2 from '../image/ilona2.png';
import ilona3 from '../image/ilona3.png';
import ironaIcon from '../image/ironaicon.png'; // Import the icon
import { ClickContext } from './ClickContext';

const getIlonaImage = (clickCount) => {
  if (clickCount >= 2) return ilona3;
  if (clickCount >= 1) return ilona2;
  return ilona1;
};

const Store = () => {
  const { clickCount, nickname, cxp, level, timerState } = useContext(ClickContext);

  return (
    <div className="store-container" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <div className="store-left-half">
        <div className="store-image-container">
          <img src={getIlonaImage(clickCount)} alt="ilona" className='store-imagecenter'/>
          <div className="store-nickname-container">
            <img src={ironaIcon} alt="irona icon" className='store-icon'/>
            <div className="store-nickname-box">
              <p>{nickname}의 상점</p>
            </div>
          </div>
        </div>
      </div>
      <div className="store-right-half">
        {/* Add other store-related elements here */}
      </div>
    </div>
  );
};

export default Store;
