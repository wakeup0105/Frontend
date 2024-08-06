import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClickContext } from './ClickContext';

export default function Unsignup() {
  const navigate = useNavigate();
  const { setNickname } = useContext(ClickContext);

  const [localNickname, setLocalNickname] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setLocalNickname(event.target.value);
    setError(false); // 입력이 변경될 때마다 오류 상태를 초기화합니다.
  };

  const handleButtonClick = () => {
    if (localNickname.length < 2 || localNickname.length > 30) {
      setError(true); // 입력 조건에 맞지 않으면 오류 상태를 설정합니다.
    } else {
      setNickname(localNickname);
      navigate('/profile', { state: { nickname: localNickname } });
    }
  };

  return (
    <div className="page">
      {/* title Wrap */}
      <div className="titleWrap">
        이로나가 되신걸 축하드려요!
      </div>
      <div style={{ paddingLeft: 15, paddingTop: 10, fontSize: 15 }}>
        일오나에서 사용하실 닉네임을 입력해주세요.
      </div>
      <br />
      {/* content Wrap - 닉네임 입력 */}
      <div className="contentWrap">
        <div className="inputWrap">
          <input className="input"
            placeholder='닉네임(2-30자까지 입력)'
            value={localNickname}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ fontSize: 14, marginLeft: 10, color: error ? 'red' : 'black', marginTop: 5 }}>
          {localNickname.length}/30
        </div>
        {/* 중복인 경우 화면에 띄워주는 알고리즘 */}
      </div>
      <br />
      <div>
        <button className='bottomButton' onClick={handleButtonClick}>
          로그인
        </button>
      </div>
    </div>
  );
}
