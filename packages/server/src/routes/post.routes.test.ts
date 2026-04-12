import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { app } from '../app.ts';
import { createAppError, ERROR_CODE } from '../lib/appError.ts';

vi.mock('../services/post.service.ts');

import * as postService from '../services/post.service.ts';

const mockPost = {
  id: 1,
  title: 'Test Post',
  content: 'Test content',
  userId: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockPostWithAuthor = {
  id: 1,
  title: 'Test Post',
  content: 'Test content',
  author: 'Alice',
  createdAt: new Date().toISOString(),
};

beforeEach(() => vi.resetAllMocks());

describe('GET /api/posts', () => {
  it('returns 200 with list of posts', async () => {
    vi.mocked(postService.getAllPosts).mockResolvedValue([mockPostWithAuthor]);

    const res = await request(app).get('/api/posts');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toMatchObject({ title: 'Test Post', author: 'Alice' });
  });

  it('returns 500 when service throws', async () => {
    vi.mocked(postService.getAllPosts).mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/api/posts');

    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
  });
});

describe('GET /api/posts/:id', () => {
  it('returns 200 with the post', async () => {
    vi.mocked(postService.getPostById).mockResolvedValue(mockPost);

    const res = await request(app).get('/api/posts/1');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, title: 'Test Post' });
  });

  it('returns 404 when post does not exist', async () => {
    vi.mocked(postService.getPostById).mockRejectedValue(
      createAppError(ERROR_CODE.NOT_FOUND, 'Post not found'),
    );

    const res = await request(app).get('/api/posts/999');

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: { code: 'NOT_FOUND', message: 'Post not found' } });
  });
});

describe('POST /api/posts', () => {
  it('returns 201 with the created post', async () => {
    vi.mocked(postService.createPost).mockResolvedValue(mockPost);

    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Test Post', content: 'Test content', userId: 1 });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Test Post' });
  });

  it('returns 422 when service throws', async () => {
    vi.mocked(postService.createPost).mockRejectedValue(
      createAppError(ERROR_CODE.VALIDATION_ERROR, 'Validation failed'),
    );

    const res = await request(app)
      .post('/api/posts')
      .send({ title: '', content: '', userId: 1 });

    expect(res.status).toBe(422);
    expect(res.body).toMatchObject({ error: { code: 'VALIDATION_ERROR', message: 'Validation failed' } });
  });
});

describe('PATCH /api/posts/:id', () => {
  it('returns 200 with the updated post', async () => {
    const updated = { ...mockPost, title: 'Updated Title' };
    vi.mocked(postService.updatePost).mockResolvedValue(updated);

    const res = await request(app).patch('/api/posts/1').send({ title: 'Updated Title' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ title: 'Updated Title' });
  });

  it('returns 404 when post does not exist', async () => {
    vi.mocked(postService.updatePost).mockRejectedValue(
      createAppError(ERROR_CODE.NOT_FOUND, 'Post not found'),
    );

    const res = await request(app).patch('/api/posts/999').send({ title: 'Updated Title' });

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: { code: 'NOT_FOUND', message: 'Post not found' } });
  });
});

describe('DELETE /api/posts/:id', () => {
  it('returns 200 with the deleted post', async () => {
    vi.mocked(postService.deletePost).mockResolvedValue(mockPost);

    const res = await request(app).delete('/api/posts/1');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ message: 'Post deleted' });
  });

  it('returns 404 when post does not exist', async () => {
    vi.mocked(postService.deletePost).mockRejectedValue(
      createAppError(ERROR_CODE.NOT_FOUND, 'Post not found'),
    );

    const res = await request(app).delete('/api/posts/999');

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: { code: 'NOT_FOUND', message: 'Post not found' } });
  });
});
