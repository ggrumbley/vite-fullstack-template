import { db } from '../db/db.ts';
import { posts } from '../db/schema/posts.ts';

export const createPost = async (data: {
  title: string;
  content: string;
  userId: number;
}) => {
  const result = await db.insert(posts).values(data).returning();
  return result[0];
};
