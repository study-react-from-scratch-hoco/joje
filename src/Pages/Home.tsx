import React, { useState } from 'react';
import styled from 'styled-components';
import { UserWithPosts } from '../types';
import { fetchUserWithPosts } from '../api';

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

export const Home = () => {
  // 서버에서 전달받은 초기 데이터가 있으면 사용
  const initialData = typeof window !== 'undefined' ? window.__INITIAL_DATA__?.userWithPosts : null;
  const [userData, setUserData] = useState<UserWithPosts | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  React.useEffect(() => {
    // 초기 데이터가 없을 때만 데이터를 가져옴
    if (!initialData) {
      fetchUserWithPosts(1)  // userId 1을 가진 사용자의 데이터를 가져옴
        .then(data => {
          setUserData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch user data:', error);
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
      {userData && (
        <div>
          <h2>User Info:</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          
          <h3>User Posts:</h3>
          {userData.posts.map(post => (
            <PostCard key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </PostCard>
          ))}
        </div>
      )}
    </div>
  );
}; 