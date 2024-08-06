import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient'; // 이 파일은 전에 설명한 Axios 설정 파일입니다.
import '../index.css'; // 추가된 CSS를 포함하도록 import

export default function Main() {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await apiClient.post('/api/member/login', { emailOrPhone, password }); // LoginRequestDTO
            const { accessToken, refreshToken, nickname, level } = response.data; // JwtTokenResponseDTO
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/profile', { state: { nickname, level } });
        } catch (error) {
            console.error('Login error:', error);
            setMessage('계정 정보가 올바르지 않습니다.');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000); // 3초 후에 메시지 숨기기
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const handleFindAccount = () => {
        navigate('/signfind');
    };

    const handleCreateAccount = () => {
        navigate('/signup');
    };

    const handleUnsignAccessAccount = () => {
        navigate('/unsignup');
    };

    return (
        <div className="page">
            <div className="titleWrap">
                같이 일오나 볼래요?
            </div>
            <br />
            <div className="account">
                <span className="nologinaccess" onClick={handleUnsignAccessAccount}>로그인 없이 참여할래요</span>
            </div>
            
            <div className="contentWrap">
                <div className="inputWrap">
                    <input 
                        className="input" 
                        placeholder='이메일 혹은 전화번호' 
                        value={emailOrPhone} 
                        onChange={(e) => setEmailOrPhone(e.target.value)} 
                        onKeyPress={handleKeyPress} 
                    />
                </div>
                <div className="inputWrap">
                    <input 
                        type="password" 
                        className="input" 
                        placeholder='비밀번호' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        onKeyPress={handleKeyPress} 
                    />
                </div>
                <br />

                <div className="account">
                    <span className="generate" onClick={handleCreateAccount}>계정생성</span>                
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                    <span className="find" onClick={handleFindAccount}>계정찾기</span>
                </div>

                <div>
                    <ul className="social-icons">
                        <li className="social-icon">
                            <button onClick={() => window.location.href = 'https://google.com'}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span className="fa fa-google"></span>
                            </button>
                        </li>
                        <li className="social-icon">
                            <button onClick={() => window.location.href = 'https://facebook.com'}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span className="fa fa-facebook"></span>
                            </button>
                        </li>
                        <li className="social-icon">
                            <button onClick={() => window.location.href = 'https://apple.com'}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span className="fa fa-apple"></span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <button className='bottomButton' onClick={handleLogin}>
                로그인
            </button>
            <div className={`message ${showMessage ? 'show' : ''}`}>
                {message}
            </div>
        </div>
    );
}
