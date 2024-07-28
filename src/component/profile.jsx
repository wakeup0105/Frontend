import React from 'react';
import '../index.css';
import main from '../image/main.png';
import health from '../image/health.png';
import ring1 from '../image/ring1.png';
import setting from '../image/setting.png';
import jam from '../image/jam.png';
import character1 from '../image/character1.png';
import character2 from '../image/character2.png';
import memark1 from '../image/15memark.png';
import memark2 from '../image/15memark2.png';
import activebutton from '../image/activebutton.png';
import nonactivebutton from '../image/noactivebutton.png';
import ilona from '../image/ilona.png';
import enter from '../image/enter.png';
import chat from '../image/chat.png';
import store from '../image/cashstore.png';
import userinformation from '../image/userinformation.png';


export default function Profile() {
  const LeftPanel = () => {
    return (
      <div className="left-panel">
        <div className="character">
          <img src="/path-to-your-image.png" alt="Character" />
          <div className="character-info">
            <span>이로나</span>
            <div className="health-bar">
              <div className="health" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button>목</button>
          <button disabled>허리</button>
        </div>
      </div>
    );
  };

  const RightPanel = () => {
    return (
      <div className="right-panel">
        <Timer />
        <GoalProgress />
      </div>
    );
  };

  const Timer = () => {
    return (
      <div className="timer">
        <div className="work-timer">
          <h2>WORK</h2>
          <div className="time">00:20</div>
        </div>
        <div className="audio-player">
          <span>재활의학과 교수...</span>
          <div className="controls">
            <button>Play</button>
            <button>Pause</button>
          </div>
        </div>
      </div>
    );
  };

  const GoalProgress = () => {
    return (
      <div className="goal-progress">
        <div className="stress-level">어제 보다 5회 더 스트레칭했어요!</div>
        <div className="progress-bar">
          <div className="progress" style={{ width: '60%' }}></div>
        </div>
        <div className="goal">목표에 60% 달성했어요 (30/50회)</div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="top">
        <span><img src={memark2} alt="character1" /><img src={memark1} alt="character2" /></span>
        <a href="#">Log out</a>
      </div>
      <div className="second-top">
        <div className="character">
          <img src={character1} alt="character1" />
          <img src={character2} alt="character2" />
        </div>
        <div className="icon">
          <button className="icon-button">
            <img src={jam} alt="jam" />
          </button>
          <button className="icon-button">
            <img src={health} alt="health" />
          </button>
          <button className="icon-button">
            <img src={ring1} alt="ring1" />
          </button>
          <button className="icon-button">
            <img src={setting} alt="setting" />
          </button>
        </div>
      </div>
      <div className="Main-Layout">
        <div class="Left-Box">
          <div>
            <img src={character1} alt="character1" />
            <img src={character2} alt="character2" />
          </div>  
        <div className="icon">
          <button className="icon-button">
            <img src={activebutton} alt="neck" />
          </button>
          <button className="icon-button">
            <img src={nonactivebutton} alt="huri" />
          </button>
        </div>
          <img src={ilona} alt="ilona" className='imagecenter'/>
              <div className="icon">
                <button className="icon-button">
                  <img src={enter} alt="enter" />
                </button>
                <button className="icon-button">
                  <img src={chat} alt="chat" />
                </button>
                <button className="icon-button">
                  <img src={store} alt="store" />
                </button>
                <button className="icon-button">
                  <img src={userinformation} alt="userinformation" className='icon-image'/>
                </button>
              </div>
        </div>
        <div class="Right-Box">2</div>
      </div>
    </div>
  );
}
