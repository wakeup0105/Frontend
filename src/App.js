import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Signup from './component/signup';
import Signfind from './component/signfind';
import Unsignup from './component/unsignup';
import Main from './component/main';
import Profile from './component/profile';
import Store from './component/StoreModal';
import Chat from './component/Chat/Chatapp';
import { ClickProvider } from './component/ClickContext';
import SignNickname from './component/SignNickname';
import { UserProvider } from './component/UserContext'; // Import UserProvider

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <Routes location={location}>
                    <Route path="/" element={<Main />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signfind" element={<Signfind />} />
                    <Route path="/unsignup" element={<Unsignup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/signnickname" element={<SignNickname />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}

function App() {
    return (
        <UserProvider>
            <ClickProvider>
                <BrowserRouter>
                    <div className="App">
                        <AnimatedRoutes />
                    </div>
                </BrowserRouter>
            </ClickProvider>
        </UserProvider>
    );
}

export default App;
