import { query } from '../index.ts';
import type { CreatePostInput, Post, PostWithAuthor, UpdatePostInput } from '../types.ts';

export async function getAllPosts(): Promise<PostWithAuthor[]> {
  const { rows } = await query<PostWithAuthor>(`
    SELECT
      p.id,
      p.title,
      p.content,
      u.name        AS author,
      p.created_at  AS "createdAt"
    FROM posts p
    LEFT JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `);
  return rows;
}

export async function getPostById(id: number): Promise<Post | undefined> {
  const { rows } = await query<Post>(
    `
    SELECT
      id,
      title,
      content,
      user_id     AS "userId",
      created_at  AS "createdAt",
      updated_at  AS "updatedAt"
    FROM posts
    WHERE id = $1
  `,
    [id],
  );
  return rows[0];
}

export async function createPost(data: CreatePostInput): Promise<Post> {
  const { rows } = await query<Post>(
    `
    INSERT INTO posts (title, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING
      id,
      title,
      content,
      user_id    AS "userId",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
  `,
    [data.title, data.content, data.userId],
  );
  return rows[0];
}

export async function updatePost(id: number, data: UpdatePostInput): Promise<Post | undefined> {
  const { rows } = await query<Post>(
    `
    UPDATE posts
    SET
      title      = COALESCE($1, title),
      content    = COALESCE($2, content),
      updated_at = NOW()
    WHERE id = $3
    RETURNING
      id,
      title,
      content,
      user_id    AS "userId",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
  `,
    [data.title ?? null, data.content ?? null, id],
  );
  return rows[0];
}

export async function deletePost(id: number): Promise<Post | undefined> {
  const { rows } = await query<Post>(
    `
    DELETE FROM posts
    WHERE id = $1
    RETURNING
      id,
      title,
      content,
      user_id    AS "userId",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
  `,
    [id],
  );
  return rows[0];
}
