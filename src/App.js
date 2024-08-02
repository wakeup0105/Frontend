import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Login from './component/login';
import Signup from './component/signup';
import Signfind from './component/signfind';
import Unsignup from './component/unsignup';
import Main from './component/main';
import Profile from './component/profile';
<<<<<<< HEAD
import Store from './component/StoreModal'; // Store 컴포넌트를 추가
import Chat from './component/Chat/Chatapp';
=======
>>>>>>> 5fbd94b88e5fb58a3372a4f6d1db7ba00507799d
import { ClickProvider } from './component/ClickContext'; // ClickProvider 추가

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signfind" element={<Signfind />} />
          <Route path="/unsignup" element={<Unsignup />} />
          <Route path="/profile" element={<Profile />} />
<<<<<<< HEAD
          <Route path="/store" element={<Store />} /> {/* Store 경로 추가 */}
          <Route path="/chat" element={<Chat />} /> {/*Chat 경로 추가*/}
=======
>>>>>>> 5fbd94b88e5fb58a3372a4f6d1db7ba00507799d
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <ClickProvider>
      <BrowserRouter>
        <div className="App">
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </ClickProvider>
  );
}

export default App;
