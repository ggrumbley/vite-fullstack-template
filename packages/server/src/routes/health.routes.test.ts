import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

import { app } from '../app.ts';

vi.mock('../services/health.service.ts');

import * as healthService from '../services/health.service.ts';

const mockHealthData = {
  status: 'ok',
  proxy: 'working',
  uptime: 42,
  message: 'Greetings from the Express backend!',
};

describe('GET /api/health', () => {
  it('returns 200 with health data', async () => {
    vi.mocked(healthService.getHealthData).mockResolvedValue(mockHealthData);

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok', proxy: 'working' });
  });

  it('returns 500 when health service throws', async () => {
    vi.mocked(healthService.getHealthData).mockRejectedValue(new Error('Service unavailable'));

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({ status: 'error', message: 'Service unavailable' });
  });
});
