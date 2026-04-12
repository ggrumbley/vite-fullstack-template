import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { app } from '../app.ts';
import { createAppError, ERROR_CODE } from '../lib/appError.ts';

vi.mock('../services/user.service.ts');

import * as userService from '../services/user.service.ts';

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
    expect(res.body).toMatchObject({ error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
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

  it('returns 409 when service throws', async () => {
    vi.mocked(userService.createUser).mockRejectedValue(
      createAppError(ERROR_CODE.CONFLICT, 'Email already exists'),
    );

    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Alice', email: 'duplicate@example.com', age: 30 });

    expect(res.status).toBe(409);
    expect(res.body).toMatchObject({ error: { code: 'CONFLICT', message: 'Email already exists' } });
  });
});
