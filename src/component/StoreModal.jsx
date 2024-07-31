import React, { useContext } from 'react';
import '../index.css';
import background from '../image/background.png';
import ilona1 from '../image/ilona.png';
import ilona2 from '../image/ilona2.png';
import ilona3 from '../image/ilona3.png';
import { ClickContext } from './ClickContext';

const getIlonaImage = (clickCount) => {
  if (clickCount >= 2) return ilona3;
  if (clickCount >= 1) return ilona2;
  return ilona1;
};

const Store = () => {
  const { clickCount, nickname, level } = useContext(ClickContext);

  return (
    <div className="store-container" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <div className="store-left-half">
        <img src={getIlonaImage(clickCount)} alt="ilona" className='store-imagecenter'/>
      </div>
      <div className="store-right-half">
        {/* 여기에 상점 관련 요소들을 추가하세요 */}
      </div>
    </div>
  );
};

export default Store;
