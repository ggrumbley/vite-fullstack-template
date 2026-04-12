import 'dotenv/config';

import { app } from './app.ts';
import { logger } from './lib/logger.ts';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
