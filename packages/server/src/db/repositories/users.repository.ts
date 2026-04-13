import { query } from '../index.ts';
import type { CreateUserInput, User, UserWithPostCount } from '../types.ts';

export async function getUsersWithPostCount(
  page: number,
  pageSize: number,
): Promise<UserWithPostCount[]> {
  const offset = (page - 1) * pageSize;
  const { rows } = await query<UserWithPostCount>(
    `
    SELECT
      u.id,
      u.name,
      u.age,
      u.email,
      COUNT(p.id)::int AS "postsCount"
    FROM users u
    LEFT JOIN posts p ON u.id = p.user_id
    GROUP BY u.id
    ORDER BY u.id ASC
    LIMIT $1 OFFSET $2
  `,
    [pageSize, offset],
  );
  return rows;
}

export async function createUser(data: CreateUserInput): Promise<User> {
  const { rows } = await query<User>(
    `
    INSERT INTO users (name, email, age)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, age
  `,
    [data.name, data.email, data.age],
  );
  return rows[0];
}

export async function deleteUser(id: number): Promise<User | undefined> {
  const { rows } = await query<User>(
    `
    DELETE FROM users WHERE id = $1
    RETURNING id, name, email, age
  `,
    [id],
  );
  return rows[0];
}
