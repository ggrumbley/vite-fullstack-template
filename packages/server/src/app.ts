import express from 'express';

import { checkHealth } from './features/health/health.controller.ts';
import postRoutes from './features/posts/posts.routes.ts';
import userRoutes from './features/users/users.routes.ts';
import { errorMiddleware } from './middleware/error.middleware.ts';

export const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.get('/api/health', checkHealth);

app.use(errorMiddleware);
