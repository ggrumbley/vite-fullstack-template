import type { Request, Response } from 'express';

import * as healthService from './health.service.ts';

export const checkHealth = async (_req: Request, res: Response) => {
  try {
    const data = await healthService.getHealthData();
    res.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ status: 'error', message });
  }
};
