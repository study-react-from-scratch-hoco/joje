import React, { Suspense } from 'react';
import styled from 'styled-components';
import { UserWithPosts } from '../types';
import { fetchUserWithPosts } from '../api';
import { ClientOnly } from '../components/ClientOnly';
import { useWindowSize } from '../hooks/useWindowSize';

const Title = styled.h1`
  color: green;
  font-size: 3rem;
`;

const PostCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
`;

// 전역 객체 타입 확장
declare global {
  interface Window {
    __INITIAL_DATA__?: {
      userWithPosts: UserWithPosts;
    };
  }
}

// 데이터를 가져오는 비동기 함수
async function fetchHomeData() {
  // 실제로는 API 호출 등을 수행
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { title: 'Welcome Home', content: 'This is streaming SSR example' };
}

// 데이터를 사용하는 컴포넌트
function HomeContent() {
  const data = use(fetchHomeData());
  
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

// React 18의 use 훅을 임시로 구현
interface PromiseWithStatus<T> extends Promise<T> {
  status?: 'pending' | 'fulfilled' | 'rejected';
  value?: T;
  reason?: any;
}

function use<T>(promise: PromiseWithStatus<T>): T {
  if (promise.status === 'fulfilled') {
    return promise.value as T;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    throw promise;
  }
}

const WindowSizeDisplay = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      <h2>브라우저 크기:</h2>
      <p>너비: {width}px</p>
      <p>높이: {height}px</p>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <h1>홈페이지</h1>
      <ClientOnly fallback={<div>브라우저 크기 측정 중...</div>}>
        <WindowSizeDisplay />
      </ClientOnly>
    </div>
  );
} 