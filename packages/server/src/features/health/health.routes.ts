import { Router } from 'express';

import { checkHealth } from './health.controller.ts';

const router = Router();

router.get('/health', checkHealth);

export default router;
