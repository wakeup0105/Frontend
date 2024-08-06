import React from 'react';
import '../MyRoomModal.css'; // 경로를 확인하세요

const MyRoom = ({ roomTitle, onClose }) => {
  return (
    <div className="my-room-modal-overlay" onClick={onClose}>
      <div className="my-room-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="my-room-modal-close" onClick={onClose}>X</button>
        <h2>방 제목</h2>
        <p className="room-title-display">{roomTitle}</p>
      </div>
    </div>
  );
};

export default MyRoom;
