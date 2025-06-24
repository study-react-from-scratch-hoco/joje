import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './style.css';

// 6. 서버에서 받은 HTML이 브라우저에 그려진 후
// 7. JavaScript가 실행되면서 이벤트 핸들러 연결(hydration)
hydrateRoot(
  document.getElementById('root')!,  // 서버에서 채워준 HTML
  // 브라우저의 라우팅 처리를 위한 컴포넌트
  <BrowserRouter> 
    <App />
  </BrowserRouter>
); 