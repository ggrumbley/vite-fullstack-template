import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { app } from '../../app.ts';

vi.mock('./users.service.ts');

import * as userService from './users.service.ts';

const mockUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
};

const mockUserWithPostCount = {
  ...mockUser,
  postsCount: 3,
};

beforeEach(() => vi.resetAllMocks());

describe('GET /api/users', () => {
  it('returns 200 with list of users', async () => {
    vi.mocked(userService.getUsersWithPostCount).mockResolvedValue([mockUserWithPostCount]);

    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toMatchObject({ name: 'Alice', postsCount: 3 });
  });

  it('passes page and limit query params to service', async () => {
    vi.mocked(userService.getUsersWithPostCount).mockResolvedValue([]);

    await request(app).get('/api/users?page=2&limit=5');

    expect(userService.getUsersWithPostCount).toHaveBeenCalledWith(2, 5);
  });

  it('defaults to page 1 and limit 10', async () => {
    vi.mocked(userService.getUsersWithPostCount).mockResolvedValue([]);

    await request(app).get('/api/users');

    expect(userService.getUsersWithPostCount).toHaveBeenCalledWith(1, 10);
  });

  it('returns 500 when service throws', async () => {
    vi.mocked(userService.getUsersWithPostCount).mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/api/users');

    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ error: 'DB error' });
  });
});

describe('POST /api/users', () => {
  it('returns 201 with the created user', async () => {
    vi.mocked(userService.createUser).mockResolvedValue(mockUser);

    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com', age: 30 });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'Alice', email: 'alice@example.com' });
  });

  it('returns 422 when body fails validation', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'not-an-email', age: 30 });

    expect(res.status).toBe(422);
    expect(res.body).toHaveProperty('errors');
  });

  it('returns 500 when service throws', async () => {
    vi.mocked(userService.createUser).mockRejectedValue(new Error('Email already exists'));

    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'alice@example.com', age: 30 });

    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ error: 'Email already exists' });
  });
});
