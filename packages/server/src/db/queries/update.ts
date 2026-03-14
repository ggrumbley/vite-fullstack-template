import { eq } from 'drizzle-orm';
import { db } from '../db.ts';
import { type SelectPost, posts } from '../schema/posts.ts';

export async function updatePost(
  id: SelectPost['id'],
  data: Partial<Omit<SelectPost, 'id'>>,
) {
  await db.update(posts).set(data).where(eq(posts.id, id));
}
