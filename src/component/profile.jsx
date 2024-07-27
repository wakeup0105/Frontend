import React from 'react';
import '../index.css';
import { useLocation } from 'react-router-dom';
import ilonaImage from '../image/ilona.png'; 
import alone from '../image/alone.png';
import enter from '../image/enter.png';
import chat from '../image/chat.png';
import shop from '../image/shop.png';
import jam from '../image/jam.png';
import bag from '../image/bag 2.jpg';
import ring from '../image/ring 2.jpg';
import setting from '../image/setting.jpg';
import levelbar from '../image/levelbar.PNG';

export default function Profile() {
    const location = useLocation();
    const nickname = location.state?.nickname || '닉네임 없음';
    return (
        <div className="profile-page">
            <div className="top-section">
                <div className="top-left">
                    <img src={levelbar} alt="levelbar" />
                    <div className="nickname-container">
                        {nickname}
                        <div className="nickname-tooltip">{nickname}</div> {/* 툴팁 추가 */}
                    </div>
                </div>
                <div className="top-right">
                    <div className="icons">
                        <button className="icon-button jam-button"><img src={jam} alt="jam" /></button>
                        <button className="icon-button"><img src={bag} alt="bag" /></button>
                        <button className="icon-button"><img src={ring} alt="ring" /></button>
                        <button className="icon-button"><img src={setting} alt="setting" /></button>
                    </div>
                </div>
            </div>

            <div className="center">
                <img src={ilonaImage} alt="Ilona" className="center-image" />
            </div>

            <div className="bottom-buttons">
                <button className="button"><img src={enter} alt="Enter" /></button>
                <button className="button"><img src={alone} alt="Alone" /></button>
                <button className="button small"><img src={chat} alt="Chat" /></button>
                <button className="button small"><img src={shop} alt="Shop" /></button>
            </div>
        </div>
    );
}
