import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodType } from 'zod';

import { createAppError, ERROR_CODE } from './appError.ts';

export function validate(
  schema: ZodType,
  source: 'body' | 'params' | 'query' = 'body',
): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    // Explicit branches avoid dynamic property access (security/detect-object-injection).
    // source is a closed union — every case is handled.
    let incoming: unknown;
    if (source === 'body') incoming = req.body;
    else if (source === 'params') incoming = req.params;
    else incoming = req.query;

    const result = schema.safeParse(incoming);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.') || source,
        message: issue.message,
      }));
      next(createAppError(ERROR_CODE.VALIDATION_ERROR, 'Validation failed', details));
      return;
    }

    // Write parsed (and coerced) data back to the request.
    // Express 5 defines req.query as a prototype getter, so direct assignment
    // throws.
    if (source === 'body') req.body = result.data;
    else if (source === 'params') req.params = result.data as Request['params'];
    else
      Object.defineProperty(req, 'query', {
        value: result.data,
        writable: true,
        configurable: true,
        enumerable: true,
      });

    next();
  };
}
