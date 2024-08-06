import React, { useState, useEffect, useContext } from 'react';
import apiClient from './apiClient';
import { UserContext } from './UserContext';

const EditButton = () => {
  const { user, setUser } = useContext(UserContext); // Use UserContext to get user data
  const [isEditing, setIsEditing] = useState(false);
  const [introText, setIntroText] = useState(user ? user.introduction : ""); // Initialize with user's introduction
  const [message, setMessage] = useState(""); // State to store the response message

  useEffect(() => {
    // Initialize introText with user introduction
    if (user && user.introduction) {
      setIntroText(user.introduction);
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const accessToken = user.access_token;
      const response = await apiClient.patch('/api/member-info/set-introduction', 
        { introduction: introText },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setMessage(response.data);
      // Update the introduction in UserContext
      setUser(prevUser => ({ ...prevUser, introduction: introText }));
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
    </div>
  );
};

export default EditButton;
