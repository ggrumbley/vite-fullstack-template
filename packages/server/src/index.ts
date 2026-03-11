import express from 'express';
import healthRoutes from './routes/health.routes.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Mount routes
app.use('/api', healthRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
