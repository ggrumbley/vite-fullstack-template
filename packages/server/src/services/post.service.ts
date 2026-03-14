import { eq, desc } from 'drizzle-orm';
import { db } from '../db/db.ts';
import { posts } from '../db/schema/posts.ts';
import { users } from '../db/schema/users.ts';

export const createPost = async (data: {
  title: string;
  content: string;
  userId: number;
}) => {
  const result = await db.insert(posts).values(data).returning();
  return result[0];
};

export const getAllPosts = async () => {
  // Joining with users to show who wrote the post
  return await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      author: users.name,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .orderBy(desc(posts.createdAt));
};

export const getPostById = async (id: number) => {
  const result = await db.select().from(posts).where(eq(posts.id, id));
  return result[0] || null;
};

export const updatePost = async (
  id: number,
  data: Partial<{ title: string; content: string }>,
) => {
  const result = await db
    .update(posts)
    .set(data)
    .where(eq(posts.id, id))
    .returning();
  return result[0];
};

export const deletePost = async (id: number) => {
  const result = await db.delete(posts).where(eq(posts.id, id)).returning();
  return result[0];
};
