import { db } from '../db.ts';
import { type InsertUser, users } from '../schema/users.ts';
import { type InsertPost, posts } from '../schema/posts.ts';

export async function createUser(data: InsertUser) {
  await db.insert(users).values(data);
}

export async function createPost(data: InsertPost) {
  await db.insert(posts).values(data);
}
