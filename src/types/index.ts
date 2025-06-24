export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
}

export interface UserWithPosts extends User {
  posts: Post[];
} 