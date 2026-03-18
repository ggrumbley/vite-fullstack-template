import type { Request, Response } from 'express';

import { handler } from '../../lib/handler.ts';
import * as healthService from './health.service.ts';

export const checkHealth = handler(async (_req: Request, res: Response) => {
  const data = await healthService.getHealthData();
  res.json(data);
});
