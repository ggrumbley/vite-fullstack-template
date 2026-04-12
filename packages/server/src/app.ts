import express from 'express';
import { pinoHttp } from 'pino-http';

import healthRouter from './features/health/health.routes.ts';
import postsRouter from './features/posts/posts.routes.ts';
import usersRouter from './features/users/users.routes.ts';
import { logger } from './lib/logger.ts';
import { errorMiddleware } from './middleware/error.middleware.ts';

export const app = express();

app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/health', healthRouter);

app.use(errorMiddleware);
