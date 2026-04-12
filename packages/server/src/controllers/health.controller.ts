import type { Request, Response } from 'express';

import { asyncHandler } from '../lib/asyncHandler.ts';
import * as healthService from '../services/health.service.ts';

export const checkHealth = asyncHandler(async (_req: Request, res: Response) => {
  const data = await healthService.getHealthData();
  res.json(data);
});
