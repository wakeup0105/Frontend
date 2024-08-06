import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClickContext } from './ClickContext';
import apiClient from './apiClient';

export default function SignNickname() {
  const navigate = useNavigate();
  const { setNickname } = useContext(ClickContext);

  const [localNickname, setLocalNickname] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setLocalNickname(event.target.value);
    setError(false);
  };

  const handleButtonClick = async () => {
    if (localNickname.length < 2 || localNickname.length > 30) {
      setError(true);
      setErrorMessage('닉네임은 2자 이상 30자 이하로 입력해주세요.');
    } else {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setErrorMessage('액세스 토큰이 없습니다. 다시 로그인 해주세요.');
          navigate('/login');
          return;
        }

        console.log('Access Token for setting nickname:', accessToken); // 토큰 확인용 로그

        const response = await apiClient.patch('/api/member-info/set-nickname', 
          { nickname: localNickname },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );

        console.log('Response:', response.data); // 응답 확인용 로그

        setNickname(localNickname);
        alert(response.data); // 서버 응답을 alert로 표시
        navigate('/profile', { state: { nickname: localNickname } });
      } catch (error) {
        console.error('Error setting nickname:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data); // 응답 데이터 로그
          if (error.response.status === 403) {
            setErrorMessage('인증에 실패했습니다. 다시 로그인 해주세요.');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/');
          } else {
            setError(true);
            setErrorMessage('닉네임 설정에 실패했습니다. 다시 시도해주세요.');
          }
        } else {
          console.error('No response received:', error.request); // 요청이 전송되었지만 응답이 없는 경우
          console.error('Request setup error:', error.message); // 요청 설정 오류
          setError(true);
          setErrorMessage('서버와의 통신에 실패했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  return (
    <div className="page">
      <div className="titleWrap">
        이로나가 되신걸 축하드려요!
      </div>
      <div style={{ paddingLeft: 15, paddingTop: 10, fontSize: 15 }}>
        일오나에서 사용하실 닉네임을 입력해주세요.
      </div>
      <br />
      <div className="contentWrap">
        <div className="inputWrap">
          <input className="input"
            placeholder='닉네임(2-30자까지 입력)'
            value={localNickname}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ fontSize: 14, marginLeft: 10, color: error ? 'red' : 'black', marginTop: 5 }}>
          {errorMessage || `${localNickname.length}/30`}
        </div>
      </div>
      <br />
      <div>
        <button className='bottomButton' onClick={handleButtonClick}>
          다음
        </button>
      </div>
    </div>
  );
}
