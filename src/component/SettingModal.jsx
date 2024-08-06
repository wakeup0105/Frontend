import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SettingModal = ({onClose}) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    memberCode: ''
  });

  const [bgVolume, setBgVolume] = useState(50);
  const [effectVolume, setEffectVolume] = useState(50);
  const [alertVolume, setAlertVolume] = useState(50);
  const [isPersonalAlertBot, setIsPersonalAlertBot] = useState(false);
  const [status, setStatus] = useState('온라인');
  const [activeModal, setActiveModal] = useState('setting'); // 활성화된 모달을 추적하는 상태 추가

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/user/info'); // 실제 API URL로 변경하세요
        setUserInfo(response.data);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleBgVolumeChange = (e) => {
    setBgVolume(e.target.value);
  };

  const handleEffectVolumeChange = (e) => {
    setEffectVolume(e.target.value);
  };

  const handleAlertVolumeChange = (e) => {
    setAlertVolume(e.target.value);
  };

  const handlePersonalAlertBotToggle = () => {
    setIsPersonalAlertBot(!isPersonalAlertBot);
  };

  const handleSettingButtonClick = () => {
    setActiveModal('setting');
  };

  const handleFeatureButtonClick = () => {
    setActiveModal('feature');
  };

  return (
    <div className="modal-container">
      <div className="modal-buttons">
        <button className={`modal-button ${activeModal === 'setting' ? 'active' : ''}`} onClick={handleSettingButtonClick}>
          나의 정보 관리
        </button>
        <button className={`modal-button ${activeModal === 'feature' ? 'active' : ''}`} onClick={handleFeatureButtonClick}>
          기능 설정
        </button>
      </div>

      <div
        className={`setting-modal ${activeModal === 'setting' ? 'active' : 'inactive'}`}
      >
        <div className="setting-modal-header">
          <h2>나의 정보 관리</h2>
        </div>
        <div className="setting-modal-body">
          <div className="setting-info-item">
            <div className="setting-info-label">이메일</div>
            <div className="setting-info-value">{userInfo.email}</div>
          </div>
          <div className="setting-info-item">
            <div className="setting-info-label">전화번호</div>
            <div className="setting-info-value">{userInfo.phoneNumber}</div>
          </div>
          <div className="setting-info-item">
            <div className="setting-info-label">비밀번호</div>
            <div className="setting-info-value"><a href="#">비밀번호 변경</a></div>
          </div>
          <div className="setting-info-item">
            <div className="setting-info-label">회원코드</div>
            <div className="setting-info-value">{userInfo.memberCode}</div>
          </div>
        </div>
        <div className="setting-modal-footer">
          <button className="setting-logout">회원 탈퇴</button>
          <Link to="/" className="setting-logout">로그아웃</Link> {/* Link로 변경 */}        </div>
      </div>

      <div
        className={`feature-modal ${activeModal === 'feature' ? 'active' : 'inactive'}`}
      >
        <div className="feature-modal-header">
          <h2>기능 설정</h2>
        </div>
        <div className="feature-modal-body">
          <div className="feature-info-item">
            <div className="feature-info-label">배경음 음량</div>
            <input type="range" min="0" max="100" value={bgVolume} onChange={handleBgVolumeChange} />
          </div>
          <div className="feature-info-item">
            <div className="feature-info-label">효과음 음량</div>
            <input type="range" min="0" max="100" value={effectVolume} onChange={handleEffectVolumeChange} />
          </div>
          <div className="feature-info-item">
            <div className="feature-info-label">알람</div>
            <input type="range" min="0" max="100" value={alertVolume} onChange={handleAlertVolumeChange} />
          </div>
          <div className="feature-info-item">
            <div className="feature-info-label">개인 알람 봇</div>
            <input type="checkbox" checked={isPersonalAlertBot} onChange={handlePersonalAlertBotToggle} />
          </div>
          <div className="feature-info-item">
            <div className="feature-info-label">상태</div>
            <span>{status}</span>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button onClick={onClose}>닫기</button> {/* 닫기 버튼 추가 */}
      </div>
    </div>
  );
};

export default SettingModal;
