import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    return (
        <div className = "page"> 
            {/*title Wrap*/}
            <div className = "titleWrap">
                일오나의 회원이 되어주세요!
            </div>
            <br/>
            <div className='rule'>
                <span>● 본 서비스 </span>
                <span>이용약관</span>
                <span>과 </span>
                <span>개인정보처리방침</span>
                <span>에 대해 동의합니다.</span>
            </div>
            
            <div className = "contentWrap">
                {/*content Wrap - 이메일 입력 */}
                <div className = "inputWrap">
                    <input className="input" placeholder='이메일 혹은 전화번호'/>
                </div>
                {/*content Wrap - 인증 번호 입력 */}
                <div className = "contentWrap">
                    <div className = "inputWrap">
                            <input className="input" placeholder='인증번호'/>
                    </div>
                </div>
                {/*content Wrap - 비밀번호 입력 */}
                <div className = "contentWrap">
                    <div className = "inputWrap">
                            <input className="input" placeholder='비밀번호(영문과 숫자를 포함해 4자리 이상)'/>
                    </div>
                </div>
                {/*content Wrap - 비밀번호 다시 입력 */}
                <div className = "contentWrap">
                    <div className = "inputWrap">
                            <input className="input" placeholder='비밀번호 다시 입력'/>
                    </div>
                </div>

                <br/>
                <div class="dummy-line"></div>
                
                <div>
                    <br/>
                    <button className='bottomButton'>
                        회원가입
                    </button>
                </div>
            
            </div>
        </div>
    
    )
}