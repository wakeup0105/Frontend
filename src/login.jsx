import React from 'react'

export default function Login(){
    return (
        <div className = "page">
            {/*title Wrap*/}
            <div className = "titleWrap">
                같이 일오나 볼래요?
            </div>
            <br/>
            <div className = "nologinaccess">
                로그인 없이 참여할래요
            </div>
            {/*content Wrap - 이메일 입력 */}
            <div className = "contentWrap">
                <div className = "inputWrap">
                    <input className="input" placeholder='이메일 혹은 전화번호'/>
                </div>
        
            <div className = "contentWrap">
                <div className="inputWrap">
                    <input type="password" className="input" placeholder='비밀번호'/>
                </div>
            </div>

            <br/>

            <div className = "account">
                <span className="find">계정찾기</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span className="generate">계정생성</span>
            </div>

            <br></br>
            <div class="dummy-line"></div>
            
            <div>
                <br/>
                <button className='bottomButton'>
                    로그인
                </button>
            </div>
            
            </div>
        </div>
    
    )
}