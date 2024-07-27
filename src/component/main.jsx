import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();
  
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
        <div className = "page">
            {/*title Wrap*/}
            <div className = "titleWrap">
                같이 일오나 볼래요?
            </div>
            <br/>
            <div className = "account">
                <span className = "nologinaccess"  onClick={handleUnsignAccessAccount}>로그인 없이 참여할래요</span>
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
                <span className="generate" onClick={handleCreateAccount}>계정생성</span>                
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span className="find"  onClick={handleFindAccount}>계정찾기</span>
            </div>

            <div>
            <ul> 
                <li>
                <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span class="fa fa-google"></span>
                </a> 
                </li>
                <li>
                <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span class="fa fa-facebook"></span>
                </a> 
                </li>
                <li>
                <a href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span class="fa fa-apple"></span>
                </a> 
                </li>
            </ul>  
            </div> 

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