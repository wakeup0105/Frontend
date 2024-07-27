import React, { useEffect } from 'react';
import '../index.css';

export default function Signup() {
/* 이용약관, 개인정보처리방침 modal창 구현 */
    useEffect(() => {
        const termsModal = document.getElementById('termsModal');
        const privacyModal = document.getElementById('privacyModal');
        const closeButtons = document.querySelectorAll('.close-button');

        const termsText = document.getElementById('terms-of-service');
        const privacyText = document.getElementById('privacy-policy');

        if (termsText) {
            termsText.addEventListener('click', () => {
                termsModal.style.display = 'block';
                termsModal.classList.add('fade-in');
            });
        }

        if (privacyText) {
            privacyText.addEventListener('click', () => {
                privacyModal.style.display = 'block';
                privacyModal.classList.add('fade-in');
            });
        }

        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                modal.classList.remove('fade-in');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 500);
            });
        });

        const handleWindowClick = (event) => {
            if (event.target === termsModal) {
                termsModal.classList.remove('fade-in');
                setTimeout(() => {
                    termsModal.style.display = 'none';
                }, 500);
            }
            if (event.target === privacyModal) {
                privacyModal.classList.remove('fade-in');
                setTimeout(() => {
                    privacyModal.style.display = 'none';
                }, 500);
            }
        };

        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    return (
        <div className="page"> 
            {/*title Wrap*/}
            <div className="titleWrap">
                일오나의 회원이 되어주세요!
            </div>
            <br/>
            <div className='rule'>
                <span>● 본 서비스 </span>
                <span id="terms-of-service" class="find">이용약관</span>
                <span>과 </span>
                <span id="privacy-policy" class="find">개인정보처리방침</span>
                <span>에 대해 동의합니다.</span>
            </div>

            {/* 이용약관 모달 */}
            <div id="termsModal" className="modal">
                <div className="modal-content">
                    <span className="close-button">x</span>
                    <h2>이용약관</h2>
                    <hr/>
                    <p>여기에 이용약관 내용을 작성합니다.</p>
                </div>
            </div>

            {/*개인정보처리방침 모달*/}
            <div id="privacyModal" className="modal">
                <div className="modal-content">
                    <span className="close-button">x</span>
                    <h2>개인정보처리방침</h2>
                    <hr/>
                    <p>여기에 개인정보처리방침 내용을 작성합니다.</p>
                </div>
            </div>

            <div className="contentWrap">
                {/*content Wrap - 이메일 입력 */}
                <div className="inputWrap">
                    <input className="input" placeholder="이메일 혹은 전화번호" />
                    <button className="verify"></button>
                </div>

                {/*content Wrap - 인증 번호 입력 */}
                <div className="contentWrap">
                    <div className="inputWrap">
                        <input className="input" placeholder='인증번호'/>
                    </div>
                </div>
                {/*content Wrap - 비밀번호 입력 */}
                <div className="contentWrap">
                    <div className="inputWrap">
                        <input className="input" placeholder='비밀번호(영문과 숫자를 포함해 4자리 이상)'/>
                    </div>
                </div>
                {/*content Wrap - 비밀번호 다시 입력 */}
                <div className="contentWrap">
                    <div className="inputWrap">
                        <input className="input" placeholder='비밀번호 다시 입력'/>
                    </div>
                </div>

                <br/>
                <div className='bottom'>
                    <div className="dummy-line"></div>
                    
                    <div>
                        <br/>
                        <button className='bottomButton'>
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
