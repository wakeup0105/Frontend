import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient';
import '../index.css';
import axios from 'axios';

export default function Signup() {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [isEmailOrPhoneValid, setIsEmailOrPhoneValid] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useNavigate(); // useNavigate 훅 추가

    useEffect(() => {
        const termsModal = document.getElementById('termsModal');
        const privacyModal = document.getElementById('privacyModal');

        const termsText = document.getElementById('terms-of-service');
        const privacyText = document.getElementById('privacy-policy');

        const openModal = (modal) => {
            if (modal) {
                modal.style.display = 'block';
                setTimeout(() => modal.classList.add('fade-in'), 10);
            }
        };

        const closeModal = (modal) => {
            if (modal) {
                modal.classList.remove('fade-in');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 500);
            }
        };

        if (termsText) {
            termsText.addEventListener('click', () => openModal(termsModal));
        }

        if (privacyText) {
            privacyText.addEventListener('click', () => openModal(privacyModal));
        }

        const handleWindowClick = (event) => {
            if (event.target === termsModal) {
                closeModal(termsModal);
            }
            if (event.target === privacyModal) {
                closeModal(privacyModal);
            }
        };

        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('click', handleWindowClick);
            if (termsText) {
                termsText.removeEventListener('click', () => openModal(termsModal));
            }
            if (privacyText) {
                privacyText.removeEventListener('click', () => openModal(privacyModal));
            }
        };
    }, []);

    const handleSendVerification = async () => {
        try {
            console.log('Sending verification to:', emailOrPhone);
            const response = await apiClient.post('/api/member/send-verification', 
            {
                email: emailOrPhone
            });
            console.log('Response:', response.data);
            setMessage(response.data.message);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        } catch (error) {
            console.error('Error sending verification:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                const errorMessage = error.response.data.message || '알 수 없는 오류가 발생했습니다.';
                setMessage(`서버 오류: ${errorMessage}`);
            } else if (error.request) {
                console.error('No response received:', error.request);
                setMessage('서버로부터 응답을 받지 못했습니다. 서버가 실행 중인지 확인하세요.');
            } else {
                console.error('Error in setting up the request:', error.message);
                setMessage('요청 설정 중 오류가 발생했습니다.');
            }
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
    };

    const handleSignup = async () => {
        if (!isEmailOrPhoneValid || !isPasswordValid || !isConfirmPasswordValid || !emailOrPhone || !verificationCode || !password || !confirmPassword) {
            setMessage('모든 필드를 올바르게 입력해주세요.');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
            return;
        }

        if (password !== confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
            return;
        }

        try {
            console.log('Signing up with:', { emailOrPhone, verificationCode, password, confirmPassword });
            const response = await axios.post('http://15.165.207.222:8080/api/member/signup', {
            email: emailOrPhone,
            password: password,
            checkPassword: confirmPassword,
            verificationCode: verificationCode
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            console.log('Signup Response:', response.data); // 응답 로그 추가
            const { access_token, refresh_token, token_type, expires_in, refresh_expires_in } = response.data;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            setMessage('회원가입이 성공적으로 완료되었습니다.');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                navigate('/'); // 회원가입 성공 시 /main으로 이동
            }, 1000);
            // 추가 로직: 회원가입 후 리디렉션 또는 추가 작업
        } catch (error) {
            console.error('Error signing up:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                const errorMessage = error.response.data.message || '알 수 없는 오류가 발생했습니다.';
                setMessage(`서버 오류: ${errorMessage}`);
            } else if (error.request) {
                console.error('No response received:', error.request);
                setMessage('서버로부터 응답을 받지 못했습니다. 서버가 실행 중인지 확인하세요.');
            } else {
                console.error('Error in setting up the request:', error.message);
                setMessage('요청 설정 중 오류가 발생했습니다.');
            }
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('fade-in');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        }
    };

    const validateEmailOrPhone = (input) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\d{11}$/;
        return emailRegex.test(input) || phoneRegex.test(input);
    };

    const validatePassword = (password) => {
        return password.length >= 4 && /[a-zA-Z]/.test(password) && /\d/.test(password);
    };

    const handleEmailOrPhoneChange = (e) => {
        const inputValue = e.target.value;
        setEmailOrPhone(inputValue);
        setIsEmailOrPhoneValid(validateEmailOrPhone(inputValue));
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        setIsPasswordValid(validatePassword(passwordValue));
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        setIsConfirmPasswordValid(confirmPasswordValue === password);
    };

    return (
        <div className="page">
            <div className="titleWrap">
                일오나의 회원이 되어주세요!
            </div>
            <br/>
            <div className='rule'>
                <span>● 본 서비스 </span>
                <span id="terms-of-service" className="find">이용약관</span>
                <span>과 </span>
                <span id="privacy-policy" className="find">개인정보처리방침</span>
                <span>에 대해 동의합니다.</span>
            </div>

            <div id="termsModal" className="signup-modal">
                <div className="signup-modal-content">
                    <h2>이용약관</h2>
                    <hr/>
                    <div className="modal-text">
                        <p>제 1 조 (목적)</p>
                        {/* 이용약관 내용 */}
                    </div>
                    <button className="agree-button" onClick={() => closeModal(document.getElementById('termsModal'))}>위 내용에 모두 동의합니다</button>
                </div>
            </div>

            <div id="privacyModal" className="signup-modal">
                <div className="signup-modal-content">
                    <h2>개인정보처리방침</h2>
                    <hr/>
                    <div className="modal-text">
                        <p>제 1 조 (개인정보의 처리 목적)</p>
                        {/* 개인정보처리방침 내용 */}
                    </div>
                    <button className="agree-button" onClick={() => closeModal(document.getElementById('privacyModal'))}>위 내용에 모두 동의합니다</button>
                </div>
            </div>

            <div className="contentWrap">
                <div className="inputWrap">
                    <input
                        className={`input ${isEmailOrPhoneValid ? '' : 'invalid'}`}
                        placeholder="이메일 혹은 전화번호"
                        value={emailOrPhone}
                        onChange={handleEmailOrPhoneChange}
                    />
                    <button
                        className="verify"
                        onClick={handleSendVerification}
                        disabled={!isEmailOrPhoneValid}
                    >
                    </button>
                </div>

                <div className="contentWrap">
                    <div className="inputWrap">
                        <input className="input" placeholder='인증번호' value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                    </div>
                </div>
                <div className="contentWrap">
                    <div className="inputWrap">
                        <input
                            className={`input ${isPasswordValid ? '' : 'invalid'}`}
                            placeholder='비밀번호(영문과 숫자를 포함해 4자리 이상)'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                </div>
                <div className="contentWrap">
                    <div className="inputWrap">
                        <input
                            className={`input ${isConfirmPasswordValid ? '' : 'invalid'}`}
                            placeholder='비밀번호 다시 입력'
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                </div>

                <br />
                <div className='bottom'>
                    <div className="dummy-line"></div>
                    <div>
                        <br />
                        <button
                            className='bottomButton'
                            onClick={handleSignup}
                            disabled={!isEmailOrPhoneValid || !isPasswordValid || !isConfirmPasswordValid || !emailOrPhone || !verificationCode || !password || !confirmPassword}
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
            <div className={`message ${showMessage ? 'show' : ''}`}>
                {message}
            </div>
        </div>
    );
}
