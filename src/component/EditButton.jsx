// EditButton.jsx
import React, { useState, useEffect } from 'react';
import apiClient from './apiClient'; // Make sure you import your apiClient

const EditButton = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [introText, setIntroText] = useState("");
  const [message, setMessage] = useState(""); // State to store the response message

  useEffect(() => {
    // 컴포넌트가 마운트될 때 localStorage에서 introText를 불러옵니다.
    const storedIntroText = localStorage.getItem('introText');
    if (storedIntroText) {
      setIntroText(storedIntroText);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await apiClient.patch('/api/member-info/introduction', 
        { introduction: introText },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setMessage(response.data);
      // localStorage에 introText를 저장합니다.
      localStorage.setItem('introText', introText);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update introduction', error);
      setMessage('Failed to update introduction');
    }
  };

  const handleChange = (e) => {
    setIntroText(e.target.value);
  };

  return (
    <div className="edit-section">
      {isEditing ? (
        <div>
          <input 
            type="text" 
            placeholder="한 줄 소개 작성하기!" 
            value={introText} 
            onChange={handleChange} 
          />
          <button onClick={handleSaveClick}>저장</button>
        </div>
      ) : (
        <div className="intro-display">
          <span>{introText || "한 줄 소개 작성하기"}</span>
          <button className="edit-button" onClick={handleEditClick}>편집하기</button>
        </div>
      )}
      {message && <div className="introduction-message">{message}</div>}
    </div>
  );
};

export default EditButton;
