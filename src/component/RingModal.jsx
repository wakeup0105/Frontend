import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const notificationsData = [
  { id: 1, from: '관리자', message: '축하합니다! 레벨 50 보상이 도착했습니다~', time: '9분전', details: '레벨 50 보상: 1000 포인트' },
  { id: 2, from: '정민', message: '예베베베 베베베베 베베베베...', time: '9분전', details: '예베베베: 정민의 상태 메시지' },
  { id: 3, from: '정민', message: '정민님이 초대장을 보냈습니다.', time: '9분전', details: '초대장: 회의 참여 요청' },
  { id: 4, from: '관리자', message: '새로운 업데이트가 있습니다.', time: '10분전', details: '업데이트 내용: 버그 수정 및 성능 향상' },
  { id: 5, from: '정민', message: '잠시 후 회의가 있습니다.', time: '11분전', details: '회의 일정: 오늘 오후 3시' }
];

export default function RingModal({ onClose }) {
  const [notifications, setNotifications] = useState(notificationsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notificationDetails, setNotificationDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const scrollUp = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollDown = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, notifications.length - 3));
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('서버_알림_API_URL'); // 실제 API URL로 변경하세요
        setNotifications(response.data);
      } catch (error) {
        console.error('알림 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchNotifications();
  }, []);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const showNotificationDetails = (notification) => {
    setNotificationDetails(notification);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setNotificationDetails(null);
  };

  return (
    <div className="notification-modal">
      <div className="scroll-buttons">
        <button className="scroll-up" onClick={scrollUp}>▲</button>
      </div>
      <div className="notification-content">
        {notifications.slice(currentIndex, currentIndex + 3).map(notification => (
          <div className="notification-item" key={notification.id} onClick={() => showNotificationDetails(notification)}>
            <div className="notification-from">FROM: {notification.from}</div>
            <div className="notification-message">{notification.message}</div>
            <div className="notification-time">{notification.time}</div>
            <button className="notification-close" onClick={(e) => { e.stopPropagation(); removeNotification(notification.id); }}>X</button>
          </div>
        ))}
      </div>
      <div className="scroll-buttons">
        <button className="scroll-down" onClick={scrollDown}>▼</button>
      </div>
      <button className="clear-all-button" onClick={clearAllNotifications}>모든 알림 지우기</button>
      <div className="modal-footer">
        <button onClick={onClose}>닫기</button>
      </div>
      
      {showDetailsModal && (
        <div className="details-modal">
          <div className="details-content">
            <h2>상세 정보</h2>
            <p><strong>FROM:</strong> {notificationDetails.from}</p>
            <p><strong>Message:</strong> {notificationDetails.message}</p>
            <p><strong>Details:</strong> {notificationDetails.details}</p>
            <button onClick={closeDetailsModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
