import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { Articles } from './Pages/Articles';

export default function App() {
  return (
    <div>
      <h1>SSR 예제</h1>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/articles">게시글</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </div>
  );
} 