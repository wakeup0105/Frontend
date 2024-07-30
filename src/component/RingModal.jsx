import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

const notificationsData = [
  { id: 1, from: '관리자', message: '축하합니다! 레벨 50 보상이 도착했습니다~', time: '9분전' },
  { id: 2, from: '정민', message: '예베베베 베베베베 베베베베...', time: '9분전' },
  { id: 3, from: '정민', message: '정민님이 초대장을 보냈습니다.', time: '9분전' },
  { id: 4, from: '관리자', message: '새로운 업데이트가 있습니다.', time: '10분전' },
  { id: 5, from: '정민', message: '잠시 후 회의가 있습니다.', time: '11분전' }
];

export default function RingModal() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollUp = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollDown = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, notifications.length - 3));
  };

  useEffect(() => {
    // 서버로부터 알림 데이터를 가져오는 함수
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

  return (
    <div className="notification-modal">
      <div className="scroll-buttons">
        <button className="scroll-up" onClick={scrollUp}>▲</button>
      </div>
      <div className="notification-content">
        {notifications.slice(currentIndex, currentIndex + 3).map(notification => (
          <div className="notification-item" key={notification.id}>
            <div className="notification-from">FROM: {notification.from}</div>
            <div className="notification-message">{notification.message}</div>
            <div className="notification-time">{notification.time}</div>
            <button className="notification-close" onClick={() => removeNotification(notification.id)}>X</button>
          </div>
        ))}
      </div>
      <div className="scroll-buttons">
        <button className="scroll-down" onClick={scrollDown}>▼</button>
      </div>
      <button className="clear-all-button" onClick={clearAllNotifications}>모든 알림 지우기</button>
    </div>
  );
}
