import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient';
import '../index.css';

export default function Main() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await apiClient.post('/api/member/login', { email, password });
            const { token_type, access_token, refresh_token } = response.data;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            console.log('Access Token:', access_token); // 토큰 확인용 로그

            // 닉네임 정보가 있는지 확인
            const infoResponse = await apiClient.get('/api/member-info/info', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            const { nickname, tag, introduction } = infoResponse.data;

            if (nickname.startsWith('사용자')) {
                // 닉네임이 '사용자'로 시작하면 닉네임 설정 페이지로 이동
                navigate('/signnickname');
            } else {
                // 닉네임 정보가 있으면 바로 프로필로 이동
                navigate('/signprofile', { state: { nickname, tag, introduction } });
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('계정 정보가 올바르지 않습니다.');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
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
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
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
