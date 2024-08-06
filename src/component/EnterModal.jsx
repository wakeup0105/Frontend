import React, { useState } from 'react';
import '../EnterModal.css';
import CreateRoomModal from './CreateRoomModal'; // CreateRoomModal 컴포넌트를 올바르게 가져오기
import MyRoom from './MyRoomModal'; // MyRoom 컴포넌트를 올바르게 가져오기

const EnterModal = ({ onClose }) => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showMyRoomModal, setShowMyRoomModal] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState('');

  const handleRoomSearchClick = () => {
    setShowCodeInput(true);
  };

  const handleCreateRoomClick = () => {
    setShowCreateRoomModal(true);
  };

  const handleCreateRoom = (roomTitle) => {
    setNewRoomTitle(roomTitle); // 새 방 제목 저장
    setShowCreateRoomModal(false); // CreateRoomModal 닫기
    setShowMyRoomModal(true); // MyRoom 모달 열기
  };

  const handleCloseMyRoomModal = () => {
    setShowMyRoomModal(false);
  };

  return (
    <>
      <div className="enter-modal-overlay" onClick={onClose}>
        <div className="enter-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="enter-modal-close" onClick={onClose}>X</button>
          <h2 className='entertitle'>입장하기</h2>
          <br/>
          <div className="button-container">
            <button className="modal-button" onClick={handleCreateRoomClick}>방만들기</button>
            <button className="modal-button" onClick={handleRoomSearchClick}>방찾기</button>
          </div>
          {showCodeInput && (
            <div className="code-input-container">
              <input type="text" placeholder="코드를 입력하세요" className="code-input" />
              <button className="modal-button">확인</button>
            </div>
          )}
          {/* 방 목록 부분 삭제 */}
          {showCreateRoomModal && (
            <CreateRoomModal
              onClose={() => setShowCreateRoomModal(false)}
              onCreate={handleCreateRoom}
            />
          )}
        </div>
      </div>
      {showMyRoomModal && (
        <MyRoom
          roomTitle={newRoomTitle}
          onClose={handleCloseMyRoomModal}
        />
      )}
    </>
  );
};

export default EnterModal;
