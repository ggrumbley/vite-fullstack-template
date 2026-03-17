import { asc, between, count, eq, getTableColumns,sql } from 'drizzle-orm';

import { db } from '../db.ts';
import { posts } from '../schema/posts.ts';
import { type SelectUser, users } from '../schema/users.ts';

export async function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db.select().from(users).where(eq(users.id, id));
}

export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5,
): Promise<
  Array<{
    postsCount: number;
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db
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
}

export async function getPostsForLast24Hours(
  page = 1,
  pageSize = 5,
): Promise<
  Array<{
    id: number;
    title: string;
  }>
> {
  return db
    .select({
      id: posts.id,
      title: posts.title,
    })
    .from(posts)
    .where(between(posts.createdAt, sql`now() - interval '1 day'`, sql`now()`))
    .orderBy(asc(posts.title), asc(posts.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
