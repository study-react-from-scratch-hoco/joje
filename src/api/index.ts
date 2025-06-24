import { User, Post } from '../types';

// 사용자 정보를 가져오는 함수
export const fetchUserData = async (userId: number): Promise<User> => {
  // 실제로는 API 호출을 하겠지만, 예제를 위해 가짜 데이터를 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: "John Doe",
        email: "john@example.com"
      });
    }, 1000);
  });
};

// 사용자의 게시물을 가져오는 함수
export const fetchUserPosts = async (userId: number): Promise<Post[]> => {
  // 실제로는 API 호출을 하겠지만, 예제를 위해 가짜 데이터를 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          userId: userId,
          title: "First Post",
          content: "This is my first post!"
        },
        {
          id: 2,
          userId: userId,
          title: "Second Post",
          content: "This is another post!"
        }
      ]);
    }, 1000);
  });
};

// 사용자 정보와 게시물을 모두 가져오는 함수
export const fetchUserWithPosts = async (userId: number) => {
  const user = await fetchUserData(userId); //1. 먼저 유저의 정보를 가져옴
  const posts = await fetchUserPosts(userId); //2. 그 다음 유저의 게시물을 가져옴
  return { ...user, posts }; //3. 두 데이터를 합쳐서 반환
}; 