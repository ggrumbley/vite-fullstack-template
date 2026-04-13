// ── Posts ────────────────────────────────────────────────────────────
export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostWithAuthor {
  id: number;
  title: string;
  content: string;
  author: string | null;
  createdAt: Date;
}

export type CreatePostInput = Pick<Post, 'title' | 'content' | 'userId'>;
export type UpdatePostInput = Partial<Pick<Post, 'title' | 'content'>>;

// ── Users ────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

export interface UserWithPostCount extends User {
  postsCount: number;
}

export type CreateUserInput = Pick<User, 'name' | 'email' | 'age'>;
