import React, { useState } from 'react';
import apiClient from './apiClient';
import '../index.css';

export default function Signfind() {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSendVerification = async () => {
        try {
            const response = await apiClient.post('/api/member/send-verification', { emailOrPhone });
            console.log('Verification code sent:', response.data);
            setMessage('인증번호가 발송되었습니다.');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        } catch (error) {
            console.error('Error sending verification code:', error);
            setMessage('인증번호 발송에 실패했습니다.');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
    };

    const handleFindAccount = async () => {
        try {
            const response = await apiClient.post('/api/member/find-account', { emailOrPhone, verificationCode });
            const { password } = response.data; // 비밀번호를 응답에서 받아옴
            setPassword(password);
            setMessage('계정을 찾았습니다.');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        } catch (error) {
            console.error('Error finding account:', error);
            if (error.response && error.response.status === 404) {
                setMessage('가입된 정보가 없습니다.');
            } else {
                setMessage('계정 찾기에 실패했습니다.');
            }
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const isFormValid = emailOrPhone && verificationCode;

    return (
        <div className="page">
            <div className='titleWrap'>
                계정찾기
            </div>
            <div style={{ paddingLeft: 15, paddingTop: 10, fontSize: 15 }}>
                잃어버린 계정을 찾습니다.
            </div>

            <div className="contentWrap">
                <div className="inputWrap">
                    <input
                        className={`input ${!emailOrPhone ? 'invalid' : ''}`}
                        placeholder="이메일 혹은 전화번호"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                    <button
                        className="verify"
                        onClick={handleSendVerification}
                        disabled={!emailOrPhone}
                    >
                    </button>
                </div>

                <div className="contentWrap">
                    <div className="inputWrap">
                        <input
                            className={`input ${!verificationCode ? 'invalid' : ''}`}
                            placeholder='인증번호'
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <br />
                    <button
                        className='bottomButton'
                        onClick={handleFindAccount}
                        disabled={!isFormValid}
                    >
                        다음
                    </button>
                </div>

                {password && (
                    <div className="passwordWrap">
                        <div>
                            <span>비밀번호: </span>
                            <span>{showPassword ? password : '********'}</span>
                        </div>
                        <button onClick={toggleShowPassword}>
                            {showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                        </button>
                    </div>
                )}

                <div className={`message ${showMessage ? 'show' : ''}`}>
                    {message}
                </div>
            </div>
        </div>
    );
}
