import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/login'; // Login 컴포넌트가 있는 경로를 정확히 지정하세요.
import Signup from './component/signup';
import Signfind from './component/signfind';
import Unsignup from './component/unsignup';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signfind" element={<Signfind />} />
          <Route path="/unsignup" element={<Unsignup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
