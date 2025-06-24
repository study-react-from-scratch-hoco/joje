import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Articles } from './Pages/Articles';
import { About } from './Pages/About';
import './style.css';

export default function App() {
  return (
    <>
      <h1>SSR 예제</h1>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">정보</Link>
        </li>
        <li>
          <Link to="/articles">기사</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </>
  );
}
