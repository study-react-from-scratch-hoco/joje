import React, { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// 동적 임포트를 사용하여 컴포넌트를 지연 로딩
const Home = React.lazy(() => import('./Pages/Home'));
const About = React.lazy(() => import('./Pages/About'));
const Articles = React.lazy(() => import('./Pages/Articles'));

// 로딩 중 표시할 컴포넌트
const Loading = () => <div>Loading...</div>;

export default function App() {
  return (
    <div>
      <h1>SSR Example</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/articles">Articles</Link></li>
        </ul>
      </nav>
      
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </Suspense>
    </div>
  );
} 