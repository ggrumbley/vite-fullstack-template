import { eq } from 'drizzle-orm';

import { db } from '../db.ts';
import { type SelectUser, users } from '../schema/users.ts';

export async function deleteUser(id: SelectUser['id']) {
  await db.delete(users).where(eq(users.id, id));
}
