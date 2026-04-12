import type { ErrorRequestHandler } from 'express';

import { ERROR_CODE } from '../lib/appError.ts';
import { logger } from '../lib/logger.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const isKnown = typeof err.statusCode === 'number';
  const status = isKnown ? (err.statusCode as number) : 500;
  const code = isKnown ? (err.code as string) : ERROR_CODE.INTERNAL;
  const message = isKnown ? (err.message as string) : 'Internal server error';

  logger.error({ err, status, code, path: req.path, method: req.method }, message);

  res.status(status).json({ error: { code, message } });
};
