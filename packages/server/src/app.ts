import express from 'express';
import { pinoHttp } from 'pino-http';

import { checkHealth } from './controllers/health.controller.ts';
import { logger } from './lib/logger.ts';
import { errorMiddleware } from './middleware/error.middleware.ts';
import postRoutes from './routes/post.routes.ts';
import userRoutes from './routes/user.routes.ts';

export const app = express();

app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.get('/api/health', checkHealth);

app.use(errorMiddleware);
