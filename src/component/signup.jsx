import React, { useEffect } from 'react';
import '../index.css';

export default function Signup() {
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

    const handleCloseTermsModal = () => {
        const termsModal = document.getElementById('termsModal');
        closeModal(termsModal);
    };

    const handleClosePrivacyModal = () => {
        const privacyModal = document.getElementById('privacyModal');
        closeModal(privacyModal);
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('fade-in');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        }
    };

    return (
        <div className="page"> 
            {/*title Wrap*/}
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

            {/* 이용약관 모달 */}
            <div id="termsModal" className="signup-modal">
                <div className="signup-modal-content">
                    <h2>이용약관</h2>
                    <hr/>
                    <div className="modal-text">
                        <p>제 1 조 (목적)</p>
                        <p>이 약관은 회사가 제공하는 모든 서비스(이하 "서비스"라 합니다)의 이용조건 및 절차, 이용자와 회사의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>

                        <p>제 2 조 (정의)</p>
                        <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                        <ul className="modal-list">
                            <li>"서비스"라 함은 회사가 제공하는 모든 온라인 서비스를 말합니다.</li>
                            <li>"이용자"라 함은 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                            <li>"회원"이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 지속적으로 이용할 수 있는 자를 말합니다.</li>
                            <li>"비회원"이라 함은 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
                        </ul>

                        <p>제 3 조 (약관의 명시와 개정)</p>
                        <p>회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</p>
                        <p>회사는 약관의 규제 등에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</p>

                        <p>제 4 조 (서비스의 제공 및 변경)</p>
                        <p>회사는 이용자에게 아래와 같은 서비스를 제공합니다.</p>
                        <ul className="modal-list">
                            <li>뉴스 정보 서비스</li>
                            <li>각종 데이터베이스 서비스</li>
                            <li>기타 회사가 자체 개발하거나 다른 회사와의 협력 계약 등을 통해 이용자에게 제공할 일체의 서비스</li>
                        </ul>
                        <p>회사는 서비스의 내용이 변경되는 경우, 변경된 서비스의 내용 및 제공일자를 제7조에서 정한 방법으로 이용자에게 통지합니다.</p>

                        {/* 추가 내용 작성 */}
                    </div>
                    <button className="agree-button" onClick={handleCloseTermsModal}>위 내용에 모두 동의합니다</button>
                </div>
            </div>

            {/*개인정보처리방침 모달*/}
            <div id="privacyModal" className="signup-modal">
                <div className="signup-modal-content">
                    <h2>개인정보처리방침</h2>
                    <hr/>
                    <div className="modal-text">
                        <p>제 1 조 (개인정보의 처리 목적)</p>
                        <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.</p>
                        <ul className="modal-list">
                            <li>서비스 제공: 콘텐츠 제공, 맞춤 서비스 제공 등을 목적으로 개인정보를 처리합니다.</li>
                            <li>회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인 식별, 부정 이용 방지 등을 목적으로 개인정보를 처리합니다.</li>
                        </ul>

                        <p>제 2 조 (개인정보의 처리 및 보유 기간)</p>
                        <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>

                        <p>제 3 조 (개인정보의 제3자 제공)</p>
                        <p>회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>

                        <p>제 4 조 (개인정보처리의 위탁)</p>
                        <p>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
                        <ul className="modal-list">
                            <li>위탁받는 자 (수탁자): [위탁업체명]</li>
                            <li>위탁하는 업무의 내용: [위탁업무내용]</li>
                        </ul>
                        <p>회사는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>

                        {/* 추가 내용 작성 */}
                    </div>
                    <button className="agree-button" onClick={handleClosePrivacyModal}>위 내용에 모두 동의합니다</button>
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
