import React, { useState } from 'react';
import '../CreateRoomModal.css';

const CreateRoomModal = ({ onClose, onCreate }) => {
  const [roomTitle, setRoomTitle] = useState('');

  const handleCreate = () => {
    if (roomTitle.trim()) {
      onCreate(roomTitle); // 방 제목을 상위 컴포넌트로 전달
    }
  };

  return (
    <div className="create-room-modal-overlay" onClick={onClose}>
      <div className="create-room-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="create-room-modal-close" onClick={onClose}>X</button>
        <h2>방 만들기</h2>
        <input
          type="text"
          placeholder="방 제목을 입력하세요"
          value={roomTitle}
          onChange={(e) => setRoomTitle(e.target.value)}
          className="room-title-input"
        />
        <button className="modal-button" onClick={handleCreate}>방 생성하기</button>
      </div>
    </div>
  );
};

export default CreateRoomModal;
