import React from 'react'

//계정찾기
export default function Signfind()
{
    return (
        <div className="page">
            <div className='titleWrap'>
                계정찾기
            </div>
            <div style={{paddingLeft:15, paddingTop:10, fontSize:15}}>
                잃어버린 계정을 찾습니다.
            </div>

            <div className = "contentWrap">
                {/*content Wrap - 이메일 입력 */}
                <div className="inputWrap">
                    <input className="input" placeholder="이메일 혹은 전화번호" />
                    <button className="verify"></button>
                </div>
                {/*content Wrap - 인증 번호 입력 */}
                <div className = "contentWrap">
                    <div className = "inputWrap">
                            <input className="input" placeholder='인증번호'/>
                    </div>
                </div>
                
                <div>
                    <br/>
                    <button className='bottomButton'>
                        다음
                    </button>
                </div>

            </div>

        </div>
        
    
    )
}
