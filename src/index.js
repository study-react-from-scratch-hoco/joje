import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

//
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //`React.StrictMode`: 개발 시 잠재적 문제 감지
  //`BrowserRouter`: 클라이언트 사이드 라우팅 설정
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
); 