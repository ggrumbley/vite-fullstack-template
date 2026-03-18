import { asc, count, eq, getTableColumns } from 'drizzle-orm';

import { db } from '../../db/db.ts';
import { posts } from '../../db/schema/posts.ts';
import { users } from '../../db/schema/users.ts';

export const getUsersWithPostCount = async (page: number, pageSize: number) => {
  return await db
    .select({
      ...getTableColumns(users),
      postsCount: count(posts.id),
    })
    .from(users)
    .leftJoin(posts, eq(users.id, posts.userId))
    .groupBy(users.id)
    .orderBy(asc(users.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
};

export const createUser = async (data: { name: string; email: string; age: number }) => {
  const result = await db.insert(users).values(data).returning();
  return result[0];
};

export const deleteUser = async (id: number) => {
  return await db.delete(users).where(eq(users.id, id)).returning();
};
