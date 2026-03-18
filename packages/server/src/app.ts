import express from 'express';

import { checkHealth } from './controllers/health.controller.ts';
import postRoutes from './routes/post.routes.ts';
import userRoutes from './routes/user.routes.ts';

export const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.get('/api/health', checkHealth);
