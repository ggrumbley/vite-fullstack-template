import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/user.routes.ts';
import postRoutes from './routes/post.routes.ts';
import { checkHealth } from './controllers/health.controller.ts';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Single utility routes can also live here
app.get('/api/health', checkHealth);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
