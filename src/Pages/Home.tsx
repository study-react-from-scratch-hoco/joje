import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: green;
  font-size: 3rem;
`;

interface User {
  id: number;
  name: string;
  email: string;
}

// 서버와 클라이언트 모두에서 사용할 데이터 페칭 함수
export const fetchUserData = async (): Promise<User> => {
  // 실제로는 API 호출을 하겠지만, 예제를 위해 가짜 데이터를 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "John Doe",
        email: "john@example.com"
      });
    }, 1000);
  });
};

// 전역 객체 타입 확장
declare global {
  interface Window {
    __INITIAL_DATA__?: {
      userData: User;
    };
  }
}

export const Home = () => {
  // 서버에서 전달받은 초기 데이터가 있으면 사용
  const initialData = typeof window !== 'undefined' ? window.__INITIAL_DATA__?.userData : null;
  const [user, setUser] = useState<User | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    // 초기 데이터가 없을 때만 데이터를 가져옴
    if (!initialData) {
      fetchUserData()
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch user:', error);
          setLoading(false);
        });
    }
  }, [initialData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Title>Home</Title>
      {user && (
        <div>
          <h2>User Info:</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}; 